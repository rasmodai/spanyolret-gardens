/**
 * Structure of the landing page: the two languages, the facts that must not move,
 * and what the browser is allowed to receive. Usage: npm test (or tsx scripts/test-copy.ts)
 * No network, no build needed.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';
import { availableUnits, siteAddress, units } from '../lib/data';
import { consentCopy } from '../lib/consent-copy';
import { en } from '../lib/copy/en';
import { hu } from '../lib/copy/hu';
import { formatDate, formatPrice } from '../lib/format';
import { houseOptions, houseRows } from '../lib/houses-view';
import { privacyCopy } from '../lib/privacy-copy';
import { projectConfig } from '../lib/project-config';
import { tutoiement } from './tutoiement';

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

/** Every string of a copy tree, with its path. */
function strings(value: unknown, path = ''): [string, string][] {
    if (typeof value === 'string') return [[path, value]];
    if (Array.isArray(value)) return value.flatMap((item, index) => strings(item, `${path}[${index}]`));
    if (value && typeof value === 'object') {
        return Object.entries(value).flatMap(([key, item]) => strings(item, path ? `${path}.${key}` : key));
    }
    return [];
}

// 1. The two languages have the same keys ------------------------------------

console.log('EN and HU share one structure');
// The two FAQs are not translations of each other (the English one answers a
// foreigner, the Hungarian one a local buyer): the number of questions per
// group may differ, the groups themselves may not.
const OWN_LENGTH = /^faq\.groups\[\d+\]\.items$/;
function compare(path: string, a: unknown, b: unknown, problems: string[]) {
    if (typeof a !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
        problems.push(`${path}: different kind`);
        return;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length && !OWN_LENGTH.test(path)) problems.push(`${path}: ${a.length} vs ${b.length} items`);
        for (let i = 0; i < Math.min(a.length, b.length); i += 1) compare(`${path}[${i}]`, a[i], b[i], problems);
        return;
    }
    if (a && b && typeof a === 'object') {
        const left = Object.keys(a as object).sort().join();
        const right = Object.keys(b as object).sort().join();
        if (left !== right) problems.push(`${path}: keys ${left} vs ${right}`);
        for (const key of Object.keys(a as object)) compare(path ? `${path}.${key}` : key, (a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key], problems);
        return;
    }
    if (typeof a === 'string' && (a.trim() === '' || (b as string).trim() === '')) problems.push(`${path}: empty text`);
}
const problems: string[] = [];
compare('', en, hu, problems);
assert('same keys, same list lengths', problems.length === 0, problems.join(' | '));
// The cookie banner and the privacy policy live outside lib/copy: same rule.
for (const [name, tree] of [['cookie banner', consentCopy], ['privacy policy', privacyCopy]] as const) {
    const gaps: string[] = [];
    compare('', tree.en, tree.hu, gaps);
    assert(`${name}: same keys in EN and HU`, gaps.length === 0, gaps.join(' | '));
}
assert('privacy policy: Mixpanel named in both languages (providers, legal basis, cookies)',
    (['en', 'hu'] as const).every((l) => strings(privacyCopy[l]).filter(([, text]) => /Mixpanel/.test(text)).length >= 2)
    && strings(consentCopy.en).concat(strings(consentCopy.hu)).filter(([, text]) => /Mixpanel/.test(text)).length === 2);
assert('FAQ: four groups each', en.faq.groups.length === 4 && hu.faq.groups.length === 4);
assert('spec lists: same lines per category', en.specs.categories.every((category, i) => category.items.length === hu.specs.categories[i].items.length));

const PLACEHOLDER_PATHS = /^(houses\.(summary|ribbon\.(ofLargest|aria)|plans\.(house|siteCaption)|sheet\.(openAria|askMessage|askCallBack|parking\.(one|other)))|developer\.architect|form\.(unitOption|message\.\w+)|footer\.(legalLine|architect))$/;
for (const [name, copy] of [['en', en], ['hu', hu]] as const) {
    for (const [path, text] of strings(copy)) {
        if (/\{\w+\}/.test(text)) assert(`${name}: ${path} has a placeholder only where one is filled`, PLACEHOLDER_PATHS.test(path), text);
        assert(`${name}: ${path} has no leftover`, !/undefined|NaN|\bnull\b|\[object/.test(text), text);
    }
}

// 2. Hungarian is written in "Ön", never "te" ----------------------------------

console.log('Hungarian: no tutoiement');
for (const sample of ['Nézd meg az építkezést', 'az igényeidet', 'számodra', 'Kérd el a címeket', 'Hozd a gyerekeket', 'Válassz', 'töltsd le', 'a foglalásod', 'hogy a kivitelezést magad nézhesd meg', 'választhatsz', 'megtudsz']) {
    assert(`the detector catches "${sample}"`, tutoiement(sample).length > 0);
}
for (const sample of ['Nézze meg az építkezést', 'az igényeit', 'az Ön számára', 'Kérje el a címeket', 'Hozza a gyerekeket', 'Válasszon', 'töltse le', 'a foglalása']) {
    assert(`the detector leaves "${sample}"`, tutoiement(sample).length === 0, tutoiement(sample).join());
}
for (const [path, text] of strings(hu)) {
    const hits = tutoiement(text);
    assert(`hu: ${path} is in "Ön"`, hits.length === 0, `${hits.join()} in "${text}"`);
}
assert('hu: the thank-you pages, the house sheet and the bands are in the scanned tree',
    ['thankYou.', 'houses.sheet.', 'ctaBands.'].every((prefix) => strings(hu).some(([path]) => path.startsWith(prefix))));
for (const [name, tree] of [['cookie banner', consentCopy.hu], ['privacy policy', privacyCopy.hu]] as const) {
    for (const [path, text] of strings(tree)) {
        const hits = tutoiement(text);
        assert(`hu ${name}: ${path} is in "Ön"`, hits.length === 0, `${hits.join()} in "${text}"`);
    }
}

// 3. The facts that must not move -----------------------------------------------

console.log('facts');
assert('six houses A1 to B3', units.map((unit) => unit.id).join() === 'A1,A2,A3,B1,B2,B3');
assert('A3 and B2 sold, four available', units.filter((unit) => unit.status === 'sold').map((unit) => unit.id).join() === 'A3,B2' && availableUnits.length === 4);
assert('the prose says six / five / four (structural counts written as words)',
    units.length === 6 && units.every((unit) => unit.rooms === 5) && availableUnits.length === 4);
assert('one terrace for all houses', new Set(units.map((unit) => unit.terraceArea)).size === 1);
const smallest = [...availableUnits].sort((a, b) => a.gardenArea - b.gardenArea);
assert('B1 is the smallest garden and A2 the largest of the available (the note names them)',
    smallest[0].id === 'B1' && smallest[smallest.length - 1].id === 'A2');
assert('address', siteAddress.full === 'Törökbálinti út, 1112 Budapest');
assert('keys in April 2027', projectConfig.handoverDate?.year === 2027 && projectConfig.handoverDate.month === 4);
assert('WhatsApp number', projectConfig.whatsappNumber === '+36 70 370 1479');
assert('no call number yet', projectConfig.callNumber === null);
assert('the controller is S-Patrik Bau Kft.', projectConfig.privacyController.name === 'S-Patrik Bau Kft.');
assert('parking: gift of 4,000,000 HUF until 1 December 2026',
    projectConfig.parkingGift.valueHuf === 4_000_000 && projectConfig.parkingGift.depositBy === '2026-12-01' && projectConfig.parkingSpacePriceHuf === 4_000_000);
if (projectConfig.parkingGift.enabled) {
    const today = new Date().toISOString().slice(0, 10);
    assert('the parking offer is still open (otherwise set parkingGift.enabled to false in lib/project-config.ts)',
        today <= projectConfig.parkingGift.depositBy, `today ${today}, deposit by ${projectConfig.parkingGift.depositBy}`);
}

const nb = ' ';
const priceEn = `From ${formatPrice(projectConfig.parkingGift.enabled ? 216_616_000 : 220_616_000, 'en')}`;
assert('EN anchor', en.price.anchor === priceEn && (!projectConfig.parkingGift.enabled || en.price.anchor === `From 216,616,000${nb}HUF`));
assert('HU anchor', hu.price.anchor === `${formatPrice(projectConfig.parkingGift.enabled ? 216_616_000 : 220_616_000, 'hu')}-tól`);
if (projectConfig.parkingGift.enabled) {
    assert('the anchor carries its deadline (EN)', en.price.qualifier.includes(formatDate('2026-12-01', 'en')));
    assert('the anchor carries its deadline (HU)', /2026\. december 1-jéig/.test(hu.price.qualifier));
    assert('the parking line carries its deadline', en.pricing.included.some((line) => line.includes('1 December 2026')) && hu.pricing.included.some((line) => /2026\. december 1-jéig/.test(line)));
}
assert('parking per house (EN)', en.pricing.included.some((line) => line.includes('two spaces with A1, A2 and B1, one with B3')));
assert('parking per house (HU)', hu.pricing.included.some((line) => line.includes('az A1, A2 és B1 mellé kettő, a B3 mellé egy')));
assert('keys date on the page', en.hero.facts.some((fact) => fact.value === 'April 2027') && hu.hero.facts.some((fact) => fact.value === '2027. április'));
assert('headline (EN)', en.hero.titleFirst === 'A real garden.' && en.hero.titleSecond === 'Not a balcony.');
assert('headline (HU)', hu.hero.titleFirst === 'Saját kert.' && hu.hero.titleSecond === 'Nem erkély.');
assert('the builder is named', en.developer.lede.includes('S-Patrik Bau') && hu.developer.lede.includes('S-Patrik Bau'));
assert('gardens from 102 to 202 m²', en.hero.lede.includes('102 to 202 m²') && hu.hero.lede.includes('102-től 202 m²-ig'));

const everything = JSON.stringify(en) + JSON.stringify(hu);
assert('no "100 % on time"', !/100 ?%/.test(everything.replace(/100 ?% a/g, '')));
assert('no BOSCH', !/bosch/i.test(everything));
assert('accent #3F6B2E', /--lawn-rgb:\s*63 107 46/.test(read('app/globals.css')));
assert('radius 0', /full:\s*'0'/.test(read('tailwind.config.ts')) && /DEFAULT:\s*'0'/.test(read('tailwind.config.ts')));

// 4. No price per house, anywhere the browser can see ---------------------------

console.log('no price per house');
// Every figure of a million or more in the copy must be the anchor or the price of a parking space.
const BIG_NUMBER = /\d{1,3}(?:[,.  ]\d{3}){2,}/g;
const allowedBig = new Set(
    [216_616_000, 220_616_000, projectConfig.parkingSpacePriceHuf].flatMap((value) => [formatPrice(value, 'en'), formatPrice(value, 'hu')].map((text) => text.replace(/\D/g, '')))
);
for (const [name, copy] of [['en', en], ['hu', hu]] as const) {
    for (const [path, text] of strings(copy)) {
        for (const match of text.match(BIG_NUMBER) ?? []) {
            assert(`${name}: ${path}: "${match}" is the anchor or the parking price`, allowedBig.has(match.replace(/\D/g, '')), text);
        }
    }
}
for (const locale of ['en', 'hu'] as const) {
    const rows = JSON.stringify(houseRows(locale)) + JSON.stringify(houseOptions(locale));
    assert(`${locale}: the house rows carry no price`, !/price|huf|\bft\b|\bár\b/i.test(rows) && !(rows.match(BIG_NUMBER)?.length));
    assert(`${locale}: six rows, smallest garden first`, houseRows(locale).length === 6 && houseRows(locale)[0].id === 'B1');
    assert(`${locale}: only available houses in the form`, houseOptions(locale).map((option) => option.value).join() === 'A1,A2,B1,B3');
}
const built = join(root, '.next/server/app');
for (const file of ['index.html', 'hu.html']) {
    if (!existsSync(join(built, file))) continue;
    const html = readFileSync(join(built, file), 'utf8')
        .replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\+36[\d\s]*\d/g, ' ');
    const found = (html.match(BIG_NUMBER) ?? []).map((match) => match.replace(/\D/g, ''));
    assert(`built ${file}: only the anchor and the parking price`, found.every((digits) => allowedBig.has(digits)), found.join());
}

// 5. The browser never receives lib/data.ts --------------------------------------

console.log('client components');
function walk(directory: string): string[] {
    return readdirSync(directory).flatMap((entry) => {
        const path = join(directory, entry);
        return statSync(path).isDirectory() ? walk(path) : /\.tsx?$/.test(entry) ? [path] : [];
    });
}
const SERVER_ONLY = /^import\s(?!type\b)[^;]*from\s+['"](?:@\/lib|\.\.?\/lib|\.\.?)\/(?:data|houses-view|copy(?:\/(?:en|hu|shared|index))?)['"]/m;
let clientFiles = 0;
for (const directory of ['components', 'app']) {
    for (const path of walk(join(root, directory))) {
        const code = readFileSync(path, 'utf8');
        if (!/^\s*(?:\/\*[\s\S]*?\*\/\s*)?['"]use client['"]/.test(code)) continue;
        clientFiles += 1;
        const relative = path.slice(root.length + 1);
        assert(`${relative} (client) imports neither lib/data, lib/copy nor lib/houses-view`, !SERVER_ONLY.test(code));
        assert(`${relative} (client) knows no per-house price`, !/priceHuf|pricePerUnit/.test(code));
    }
}
assert('client files were found', clientFiles >= 8, `${clientFiles}`);

console.log('removed');
for (const path of ['lib/data-hu.ts', 'lib/site.ts', 'components/sections/hu', 'components/ui/FloatingBadge.tsx']) {
    assert(`${path} is gone`, !existsSync(join(root, path)));
}
assert('no "N of 6 still available" badge text', !/of (six|\d+) still available|szabad a (hat|\d+) házból/i.test(everything));
assert('one landing page for both routes', /LandingPage/.test(read('app/page.tsx')) && /LandingPage/.test(read('app/hu/page.tsx')));

console.log(`\n${fail === 0 ? 'ALL GREEN' : 'FAILURES'}: ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
