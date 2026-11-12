/**
 * Search and sharing: noindex unless ALLOW_INDEXING=true, canonical and hreflang EN/HU,
 * site address, Open Graph image, icons, brochure header.
 * Usage: npm test (or tsx scripts/test-seo.ts). No network, no build needed.
 */
import { execFileSync } from 'child_process';
import { readFileSync, statSync } from 'fs';
import { join } from 'path';
import { robotsFor } from '../lib/indexing';
import { metadataBaseFor, pageMetadata, privacyMetadata, rootMetadata } from '../lib/metadata';
import { en } from '../lib/copy/en';
import { hu } from '../lib/copy/hu';

let pass = 0;
let fail = 0;
function assert(name: string, condition: boolean, detail = '') {
    if (condition) pass += 1;
    else {
        fail += 1;
        console.log(`  FAIL ${name} ${detail}`);
    }
}

const root = join(__dirname, '..');
const read = (path: string) => readFileSync(join(root, path), 'utf8');
const SITE = 'https://spanyolret-gardens.vercel.app';

// 1. Indexing guard ------------------------------------------------------------

console.log('indexing guard');
assert('ALLOW_INDEXING absent: noindex, nofollow', JSON.stringify(robotsFor(undefined)) === '{"index":false,"follow":false}');
for (const value of ['', 'false', 'TRUE', 'True', '1', 'yes', ' true']) {
    assert(`ALLOW_INDEXING="${value}": still noindex`, robotsFor(value).index === false);
}
assert('ALLOW_INDEXING=true: index, follow', JSON.stringify(robotsFor('true')) === '{"index":true,"follow":true}');

/** What a build with this environment gives: the root rule, robots.txt, the sitemap, the headers. */
function build(allow: string | undefined, siteUrl: string | undefined) {
    const env: NodeJS.ProcessEnv = { ...process.env };
    delete env.ALLOW_INDEXING;
    delete env.NEXT_PUBLIC_SITE_URL;
    if (allow !== undefined) env.ALLOW_INDEXING = allow;
    if (siteUrl !== undefined) env.NEXT_PUBLIC_SITE_URL = siteUrl;
    const code = `
        import { rootMetadata } from './lib/metadata';
        import robots from './app/robots';
        import sitemap from './app/sitemap';
        const headers = require('./next.config.js').headers;
        headers().then((h: unknown) => console.log(JSON.stringify({ root: rootMetadata().robots, robots: robots(), sitemap: sitemap(), headers: h })));
    `;
    return JSON.parse(execFileSync('npx', ['tsx', '-e', code], { cwd: root, env, encoding: 'utf8' }).trim().split('\n').pop() as string);
}
const closed = build(undefined, SITE);
const open = build('true', SITE);
const wrong = build('1', SITE);
const openNoUrl = build('true', undefined);

assert('closed: root robots is noindex', closed.root.index === false && closed.root.follow === false);
assert('closed: every route gets X-Robots-Tag noindex, nofollow', JSON.stringify(closed.headers) === JSON.stringify([{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }]));
assert('closed: sitemap empty', closed.sitemap.length === 0);
assert('closed: robots.txt has no sitemap', closed.robots.sitemap === undefined);
assert('a value other than "true" stays closed', wrong.root.index === false && wrong.sitemap.length === 0 && wrong.headers[0]?.source === '/:path*');
assert('open: root robots is index, follow', open.root.index === true && open.root.follow === true);
assert('open: no global X-Robots-Tag', !open.headers.some((h: { source: string }) => h.source === '/:path*'));
assert('open: the brochure PDF stays noindex', open.headers.some((h: { source: string; headers: { key: string; value: string }[] }) => h.source === '/Spanyolret-gardens.pdf' && h.headers[0].key === 'X-Robots-Tag' && h.headers[0].value === 'noindex, nofollow'));
assert('closed: the brochure PDF is covered too (global rule)', closed.headers[0].source === '/:path*');
assert('open: sitemap lists / and /hu with hreflang', open.sitemap.length === 2 && open.sitemap[0].url === `${SITE}/` && open.sitemap[1].url === `${SITE}/hu` && open.sitemap[0].alternates.languages.hu === `${SITE}/hu`);
assert('open: robots.txt points at the sitemap and keeps the API out', open.robots.sitemap === `${SITE}/sitemap.xml` && open.robots.rules.disallow.includes('/api/'));
assert('open without a site address: no sitemap, no broken URL', openNoUrl.sitemap.length === 0 && openNoUrl.robots.sitemap === undefined);

// 2. Site address, canonical, hreflang -----------------------------------------

console.log('metadata');
assert('metadataBase comes from NEXT_PUBLIC_SITE_URL', metadataBaseFor(SITE)?.href === `${SITE}/`);
assert('metadataBase absent without the variable', metadataBaseFor(undefined) === undefined && rootMetadata(undefined).metadataBase === undefined);
assert('rootMetadata carries metadataBase', new URL(String(rootMetadata(SITE).metadataBase)).origin === SITE);

for (const [locale, path, copy] of [['en', '/', en], ['hu', '/hu', hu]] as const) {
    const meta = pageMetadata(locale);
    const alternates = meta.alternates as { canonical: string; languages: Record<string, string> };
    assert(`${locale}: canonical is ${path}`, alternates.canonical === path);
    assert(`${locale}: hreflang en, hu, x-default`, alternates.languages.en === '/' && alternates.languages.hu === '/hu' && alternates.languages['x-default'] === '/');
    assert(`${locale}: title and description come from lib/copy`, meta.title === copy.meta.title && meta.description === copy.meta.description);
    assert(`${locale}: description fits a search result (<= 175)`, (meta.description as string).length <= 175, `${(meta.description as string).length}`);
    assert(`${locale}: Open Graph title, description, locale, url`, meta.openGraph?.title === copy.meta.ogTitle && meta.openGraph?.description === copy.meta.ogDescription && (meta.openGraph as { locale?: string }).locale === copy.meta.ogLocale && (meta.openGraph as { url?: string }).url === path);
    const ogImages = (meta.openGraph as { images?: { url: string; width: number; height: number }[] }).images ?? [];
    assert(`${locale}: Open Graph image is /opengraph-image.jpg, 1200x630 (a page with its own openGraph does not inherit it)`, ogImages.length === 1 && ogImages[0].url === '/opengraph-image.jpg' && ogImages[0].width === 1200 && ogImages[0].height === 630);
    assert(`${locale}: Twitter image is /twitter-image.jpg`, ((meta.twitter as { images?: { url: string }[] }).images ?? [])[0]?.url === '/twitter-image.jpg');
    assert(`${locale}: Twitter large card`, (meta.twitter as { card?: string }).card === 'summary_large_image');
    assert(`${locale}: no price in title or description (the anchor never travels without its qualifier)`, !/\d{3}[ , ]\d{3}[ , ]\d{3}/.test(`${copy.meta.title} ${copy.meta.description} ${copy.meta.ogDescription}`));
    const privacy = privacyMetadata(locale);
    const privacyAlternates = privacy.alternates as { canonical: string; languages: Record<string, string> };
    assert(`${locale}: privacy canonical and hreflang`, privacyAlternates.canonical === (locale === 'hu' ? '/hu/adatvedelem' : '/privacy') && privacyAlternates.languages.en === '/privacy' && privacyAlternates.languages.hu === '/hu/adatvedelem');
}
assert('English meta is English, Hungarian meta carries a Hungarian marker', /townhouses/i.test(en.meta.title) && /sorház/i.test(hu.meta.title));
assert('Hungarian description has no informal address', !/\b(tied|neked|te |tégy|töltsd|nézd)\b/i.test(hu.meta.description + hu.meta.ogDescription));

// 3. Wiring in the app ---------------------------------------------------------

console.log('wiring');
assert('root layout uses rootMetadata, no title or keywords written in it', /rootMetadata\(\)/.test(read('app/layout.tsx')) && !/title:|keywords:/.test(read('app/layout.tsx')));
assert('Hungarian layout writes no metadata (pages carry it)', !/metadata/.test(read('app/hu/layout.tsx')));
assert("EN home uses pageMetadata('en')", /pageMetadata\('en'\)/.test(read('app/page.tsx')));
assert("HU home uses pageMetadata('hu')", /pageMetadata\('hu'\)/.test(read('app/hu/page.tsx')));
assert('privacy pages use privacyMetadata', /privacyMetadata\('en'\)/.test(read('app/privacy/page.tsx')) && /privacyMetadata\('hu'\)/.test(read('app/hu/adatvedelem/page.tsx')));
for (const path of ['app/thank-you/page.tsx', 'app/hu/koszonjuk/page.tsx']) {
    assert(`${path}: noindex whatever the guard says`, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false\s*\}/.test(read(path)));
}
assert('.env.example documents ALLOW_INDEXING, empty', /^ALLOW_INDEXING=$/m.test(read('.env.example')));
assert('no JSON-LD and no minPrice in the code (none was ever built)', !/application\/ld\+json|minPrice/.test(['app/layout.tsx', 'app/page.tsx', 'app/hu/page.tsx', 'lib/metadata.ts'].map(read).join('')));

// 4. Open Graph image and icons -----------------------------------------------

console.log('image and icons');
function jpegSize(buffer: Buffer): { width: number; height: number } | null {
    let offset = 2;
    while (offset < buffer.length) {
        if (buffer[offset] !== 0xff) return null;
        const marker = buffer[offset + 1];
        const length = buffer.readUInt16BE(offset + 2);
        if (marker >= 0xc0 && marker <= 0xc3) return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
        offset += 2 + length;
    }
    return null;
}
function pngSize(buffer: Buffer): { width: number; height: number } | null {
    return buffer.subarray(1, 4).toString() === 'PNG' ? { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) } : null;
}
for (const path of ['app/opengraph-image.jpg', 'app/twitter-image.jpg']) {
    const buffer = readFileSync(join(root, path));
    const size = jpegSize(buffer);
    assert(`${path}: JPEG 1200x630`, buffer[0] === 0xff && buffer[1] === 0xd8 && size?.width === 1200 && size?.height === 630, JSON.stringify(size));
    assert(`${path}: under 300 KB`, statSync(join(root, path)).size < 300 * 1024, `${statSync(join(root, path)).size}`);
}
const icon = pngSize(readFileSync(join(root, 'app/icon.png')));
const apple = pngSize(readFileSync(join(root, 'app/apple-icon.png')));
assert('app/icon.png is a square PNG', !!icon && icon.width === icon.height && icon.width >= 192, JSON.stringify(icon));
assert('app/apple-icon.png is a 180x180 PNG', apple?.width === 180 && apple?.height === 180, JSON.stringify(apple));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
