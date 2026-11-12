/**
 * Lead chain and data checks. Usage: npm test
 * No network: fetch is replaced, and no real variable is needed or read.
 */
import { readFileSync } from 'fs';
import { join } from 'path';
import * as data from '../lib/data';
import { en } from '../lib/copy/en';
import { hu } from '../lib/copy/hu';
import { privacyCopy } from '../lib/privacy-copy';
import { validPixelId } from '../lib/lead/meta-capi';
import { wasCaptured } from '../lib/lead/types';
import { utmFromUrl } from '../lib/lead/utm';
import { POST } from '../app/api/lead/route';

let pass = 0;
let fail = 0;
function assert(name: string, condition: boolean, detail = '') {
    if (condition) pass += 1;
    else {
        fail += 1;
        console.log(`  FAIL ${name} ${detail}`);
    }
}

const CHANNEL_VARS = [
    'NEXT_PUBLIC_SITE_URL',
    'RESEND_API_KEY', 'LEAD_EMAIL_FROM', 'LEAD_EMAIL_TO', 'GOOGLE_SHEET_ID', 'GOOGLE_SHEET_TAB', 'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET', 'GOOGLE_REFRESH_TOKEN', 'SYNPHOS_OS_URL', 'SYNPHOS_OS_LEADS_TOKEN', 'SYNPHOS_OS_CLIENT',
    'NEXT_PUBLIC_META_PIXEL_ID', 'META_CONVERSIONS_API_TOKEN',
    'RATE_LIMIT_REDIS_REST_URL', 'RATE_LIMIT_REDIS_REST_TOKEN', 'KV_REST_API_URL', 'KV_REST_API_TOKEN', 'UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN',
    'LEAD_RATE_LIMIT_MAX', 'LEAD_RATE_LIMIT_WINDOW_SECONDS', 'RATE_LIMIT_SALT',
];
const clearEnv = () => CHANNEL_VARS.forEach((name) => delete process.env[name]);
const setSheetEnv = () => {
    process.env.GOOGLE_SHEET_ID = 'sheet-test';
    process.env.GOOGLE_CLIENT_ID = 'id';
    process.env.GOOGLE_CLIENT_SECRET = 'secret';
    process.env.GOOGLE_REFRESH_TOKEN = 'refresh';
};
const sheetOk = (url: string) =>
    new Response(JSON.stringify(url.includes('oauth2') ? { access_token: 't' } : { values: [] }), { status: 200 });

const validBody = {
    firstName: 'Teszt', lastName: 'Elek', email: 'teszt@example.com', phone: '+36 1',
    privacyConsent: true, marketingConsent: false, preferredUnit: 'A1', timeline: '3-6-months', lang: 'hu',
};
const post = (body: unknown, ip = '203.0.113.7', headers: Record<string, string> = {}) =>
    POST(new Request('http://localhost/api/lead', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'x-forwarded-for': ip, ...headers },
    }));

async function main() {
    console.log('capture rule');
    assert('one channel is enough', wasCaptured({ os: 'skipped', sheet: 'failed', email: 'ok' }));
    assert('nothing ok is not captured', !wasCaptured({ os: 'skipped', sheet: 'failed', email: 'skipped' }));
    assert('all failed is not captured', !wasCaptured({ os: 'failed', sheet: 'failed', email: 'failed' }));

    console.log('the six houses, against lib/data.ts as of 12/11/2026');
    // id, internal m², ground, first, terrace, garden, garden size, status, parking
    const houses: [string, number, number, number, number, number, string, string, number][] = [
        ['A1', 117.45, 58.17, 59.28, 6.6, 185.65, 'large', 'available', 2],
        ['A2', 120.27, 59.7, 60.57, 6.6, 201.79, 'large', 'available', 2],
        ['A3', 117.94, 58.5, 59.44, 6.6, 260.01, 'xlarge', 'sold', 1],
        ['B1', 117.38, 58.11, 59.27, 6.6, 102.12, 'small', 'available', 2],
        ['B2', 117.33, 57.95, 59.38, 6.6, 316.84, 'xlarge', 'sold', 1],
        ['B3', 117.42, 58.04, 59.38, 6.6, 147.19, 'medium', 'available', 1],
    ];
    assert('6 houses', data.units.length === 6);
    for (const [id, internal, ground, first, terrace, garden, size, status, parking] of houses) {
        const unit = data.units.find((candidate) => candidate.id === id);
        assert(`${id} matches`, !!unit
            && unit.totalInternal === internal && unit.groundFloor === ground && unit.firstFloor === first
            && unit.terraceArea === terrace && unit.gardenArea === garden && unit.gardenSize === size
            && unit.status === status && unit.parkingSpaces === parking && unit.rooms === 5 && unit.bathrooms === 2,
            JSON.stringify(unit));
    }
    assert('A3 and B2 sold, the other four available',
        data.units.filter((unit) => unit.status === 'sold').map((unit) => unit.id).join() === 'A3,B2'
        && data.units.filter((unit) => unit.status === 'available').length === 4);

    console.log('what must not be published');
    const source = readFileSync(join(__dirname, '../lib/data.ts'), 'utf8');
    const unitType = source.match(/export interface Unit \{[\s\S]*?\n\}/)?.[0] ?? '';
    const unitFields = unitType.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
    assert('Unit type found', unitFields.includes('totalInternal'));
    assert('no price field in the Unit type', !/price|huf|\bar\b|prix/i.test(unitFields), unitFields);
    assert('no price key on any unit at runtime', data.units.every((unit) => !Object.keys(unit).some((key) => /price|huf/i.test(key))));
    const everything = JSON.stringify(data) + JSON.stringify(en) + JSON.stringify(hu) + JSON.stringify(privacyCopy);
    assert('no "100 %" claim', !/100 ?%/.test(everything));
    assert('no BOSCH', !/bosch/i.test(everything));
    assert('no 242 050 000 anchor', !/242[ ,. ]?050[ ,. ]?000/.test(everything));
    assert('single price anchor is the 216 616 000 one',
        en.price.anchor === 'From 216,616,000\u00a0HUF' && /216[\s\u00a0]616[\s\u00a0]000[\s\u00a0]Ft-tól/.test(hu.price.anchor));
    assert('per-house price is not published', en.houses.priceOnRequest === 'Price on request' && hu.houses.priceOnRequest === 'Ár kérésre');

    console.log('lead route, nothing configured');
    clearEnv();
    const realFetch = globalThis.fetch;
    const realError = console.error;
    const realWarn = console.warn;
    const realLog = console.log;
    const errors: string[] = [];
    const warnings: string[] = [];
    console.error = (...args: unknown[]) => { errors.push(args.map(String).join(' ')); };
    console.warn = (...args: unknown[]) => { warnings.push(args.map(String).join(' ')); };
    console.log = (...args: unknown[]) => { if (/^\s*(FAIL|\w[\w ,.()%'"-]*$)/.test(String(args[0])) && !String(args[0]).startsWith('Lead #')) realLog(...args); };
    let calls: string[] = [];
    globalThis.fetch = (async (input: RequestInfo | URL) => {
        calls.push(String(input));
        return new Response('{}', { status: 200 });
    }) as typeof fetch;

    let response = await post(validBody);
    assert('no channel configured refuses rather than loses the lead', response.status === 503);
    assert('no outgoing call', calls.length === 0, calls.join(','));
    assert('log says which channel was skipped',
        ['Synphos OS not configured: channel skipped', 'Google Sheet not configured: channel skipped', 'Lead email not configured: channel skipped']
            .every((line) => warnings.includes(line)), warnings.join(' | '));
    assert('log says the lead was not captured', errors.includes('Lead not captured: os=skipped sheet=skipped email=skipped'), errors.join(' | '));

    console.log('lead route, validation');
    response = await post({ ...validBody, privacyConsent: false });
    assert('consent required', response.status === 400);
    const noConsent = { ...validBody } as Record<string, unknown>;
    delete noConsent.privacyConsent;
    response = await post(noConsent);
    assert('consent missing is refused too', response.status === 400);
    response = await post({ ...validBody, email: 'nope' });
    assert('bad email refused', response.status === 400);
    response = await post({ ...validBody, phone: '', email: '' });
    assert('a phone or an email is needed', response.status === 400);
    response = await post({ ...validBody, firstName: '  ' });
    assert('first name required', response.status === 400);
    response = await POST(new Request('http://localhost/api/lead', { method: 'POST', body: 'not json' }));
    assert('invalid JSON refused', response.status === 400);
    response = await post('just a string');
    assert('non-object body refused', response.status === 400);

    console.log('lead route, honeypot');
    setSheetEnv();
    calls = [];
    globalThis.fetch = (async (input: RequestInfo | URL) => {
        calls.push(String(input));
        return sheetOk(String(input));
    }) as typeof fetch;
    response = await post({ ...validBody, website: 'http://spam.example' });
    assert('honeypot answers as usual', response.status === 200);
    assert('honeypot captures nothing', calls.length === 0, calls.join(','));

    console.log('lead route, origin check');
    process.env.NEXT_PUBLIC_SITE_URL = 'https://site.example.test';
    assert('another origin refused', (await post(validBody, '203.0.113.7', { origin: 'https://evil.example' })).status === 403);
    assert('no origin refused once the site is configured', (await post(validBody)).status === 403);
    assert('our origin accepted', (await post(validBody, '203.0.113.7', { origin: 'https://site.example.test' })).status === 200);
    delete process.env.NEXT_PUBLIC_SITE_URL;
    assert('no site configured: no origin check', (await post(validBody)).status === 200);

    console.log('lead route, Sheet only');
    calls = [];
    let sheetRow: unknown[] = [];
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
        calls.push(String(input));
        if (String(input).includes(':append')) sheetRow = (JSON.parse(String(init?.body)) as { values: unknown[][] }).values[0];
        return sheetOk(String(input));
    }) as typeof fetch;
    response = await post({ ...validBody, priority: 'outdoor', message: '=IMPORTXML("x")', sourceUrl: 'https://site.example.test/?utm_source=meta&utm_campaign=garden&evil=1' });
    assert('one channel configured succeeds', response.status === 200);
    assert('sheet id from the environment', calls.some((url) => url.includes('/spreadsheets/sheet-test/')));
    assert('default tab is Leads', calls.some((url) => url.includes(encodeURIComponent('Leads!A:Q'))));
    assert('raw input, no formula injection', calls.some((url) => url.includes('valueInputOption=RAW')));
    assert('other channels skipped', !calls.some((url) => /facebook|resend|api\/os/.test(url)));
    assert('17 columns', sheetRow.length === 17, String(sheetRow.length));
    assert('campaign in the Source column', sheetRow[7] === 'Website · meta / garden', String(sheetRow[7]));
    assert('priority and message in the Notes column', sheetRow[15] === 'Matters most: outdoor · =IMPORTXML("x")', String(sheetRow[15]));
    process.env.GOOGLE_SHEET_TAB = 'Prospects';
    calls = [];
    await post(validBody);
    assert('tab from the environment', calls.some((url) => url.includes(encodeURIComponent('Prospects!A:Q'))));
    delete process.env.GOOGLE_SHEET_TAB;

    console.log('lead route, a failing channel does not sink the others');
    process.env.SYNPHOS_OS_URL = 'https://os.example.test/';
    process.env.SYNPHOS_OS_LEADS_TOKEN = 'token';
    process.env.SYNPHOS_OS_CLIENT = 'client-from-env';
    let osBody: Record<string, unknown> = {};
    let osUrl = '';
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = String(input);
        if (url.includes('/api/os/leads')) {
            osUrl = url;
            osBody = JSON.parse(String(init?.body));
            return new Response('{}', { status: 502 });
        }
        return sheetOk(url);
    }) as typeof fetch;
    response = await post({ ...validBody, priority: 'price', sourceUrl: 'https://site.example.test/?utm_source=meta&utm_medium=cpc' });
    assert('OS down, Sheet up: still captured', response.status === 200);
    assert('OS url normalised', osUrl === 'https://os.example.test/api/os/leads', osUrl);
    assert('client name from the environment', osBody.client === 'client-from-env');
    assert('OS fields', osBody.source === 'form' && osBody.priority === 'price' && osBody.contactConsent === true
        && osBody.marketingConsent === false && osBody.lang === 'hu' && osBody.preferredUnit === 'A1', JSON.stringify(osBody));
    assert('utm read server-side from the page url', JSON.stringify(osBody.utm) === JSON.stringify({ source: 'meta', medium: 'cpc' }), JSON.stringify(osBody.utm));
    process.env.SYNPHOS_OS_CLIENT = '';
    calls = [];
    await post(validBody);
    assert('OS without a client name is skipped', !calls.some((url) => url.includes('/api/os/leads')));
    process.env.SYNPHOS_OS_CLIENT = 'client-from-env';

    console.log('lead route, only the OS (Sheet and email absent)');
    for (const name of ['GOOGLE_SHEET_ID', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REFRESH_TOKEN']) delete process.env[name];
    globalThis.fetch = (async () => new Response('{}', { status: 200 })) as typeof fetch;
    assert('OS alone captures', (await post(validBody)).status === 200);
    globalThis.fetch = (async () => new Response('{}', { status: 500 })) as typeof fetch;
    assert('OS alone failing is an error, not a thank-you', (await post(validBody)).status === 503);
    setSheetEnv();

    console.log('lead route, validation of what is kept');
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = String(input);
        if (url.includes('/api/os/leads')) {
            osBody = JSON.parse(String(init?.body));
            return new Response('{}', { status: 200 });
        }
        return sheetOk(url);
    }) as typeof fetch;
    response = await post({ ...validBody, preferredUnit: 'Z9' }, '192.0.2.30');
    assert('unknown house is not passed on (the lead is kept)', response.status === 200 && osBody.preferredUnit === undefined, JSON.stringify(osBody));
    for (const id of ['A1', 'A2', 'A3', 'B1', 'B2', 'B3']) {
        await post({ ...validBody, preferredUnit: id }, '192.0.2.31');
        assert(`house ${id} is a known id`, osBody.preferredUnit === id);
    }
    await post({ ...validBody, timeline: 'whenever' }, '192.0.2.32');
    assert('unknown timeline dropped', osBody.timeline === undefined);
    await post({ ...validBody, priority: 'free text' }, '192.0.2.32');
    assert('unknown priority dropped', osBody.priority === undefined);
    await post({ ...validBody, source: 'telegram' }, '192.0.2.32');
    assert('unknown source is treated as the form', osBody.source === 'form', String(osBody.source));
    await post({ ...validBody, source: 'whatsapp' }, '192.0.2.32');
    assert('WhatsApp source kept', osBody.source === 'whatsapp');
    await post({ ...validBody, source: 'sms' }, '192.0.2.32');
    assert('SMS source kept', osBody.source === 'sms');
    await post({ ...validBody, firstName: 'x'.repeat(500), message: 'm'.repeat(5000) }, '192.0.2.32');
    assert('long values are cut', String(osBody.firstName).length === 200 && String(osBody.message).length === 2000);
    await post({ ...validBody, lang: 'fr' }, '192.0.2.32');
    assert('language falls back to English', osBody.lang === 'en');
    response = await post({ ...validBody, email: '', lastName: '' }, '192.0.2.33');
    assert('email and last name are optional', response.status === 200);
    response = await post({ ...validBody, phone: '', email: 'only@example.com' }, '192.0.2.33');
    assert('an email alone is enough', response.status === 200);

    console.log('utm');
    assert('only the five utm keys, cut at 200', JSON.stringify(utmFromUrl(`https://x.test/?utm_source=a&utm_term=${'t'.repeat(300)}&foo=1`)) === JSON.stringify({ source: 'a', term: 't'.repeat(200) }));
    assert('no url, no utm', JSON.stringify(utmFromUrl('')) === '{}');

    console.log('email channel');
    process.env.RESEND_API_KEY = 're_test';
    process.env.LEAD_EMAIL_FROM = 'Sender <sender@example.test>';
    process.env.LEAD_EMAIL_TO = 'a@example.test, b@example.test';
    let mail: { from?: string; to?: string[]; subject?: string; html?: string } = {};
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = String(input);
        if (url.includes('resend.com')) {
            mail = JSON.parse(String(init?.body));
            return new Response(JSON.stringify({ id: 'mail-1' }), { status: 200 });
        }
        return sheetOk(url);
    }) as typeof fetch;
    response = await post({ ...validBody, firstName: '<b>Teszt</b>', lang: 'en' }, '192.0.2.40');
    assert('email sent', response.status === 200 && !!mail.html);
    assert('sender and recipients from the environment', mail.from === 'Sender <sender@example.test>' && mail.to?.join() === 'a@example.test,b@example.test');
    assert('visitor text escaped in the mail', !!mail.html && !mail.html.includes('<b>Teszt</b>') && mail.html.includes('&lt;b&gt;Teszt&lt;/b&gt;'));
    assert('subject and heading kept', mail.subject?.startsWith('Spanyolret Gardens - New Lead:') === true && !!mail.html?.includes('New Lead - Spanyolret Gardens'));
    await post({ ...validBody, lang: 'hu' }, '192.0.2.41');
    assert('Hungarian subject kept', mail.subject?.startsWith('Spanyolret Gardens - Uj erdeklodo:') === true);
    delete process.env.LEAD_EMAIL_TO;
    mail = {};
    await post(validBody, '192.0.2.42');
    assert('no recipient: email skipped', !mail.html);
    for (const name of ['RESEND_API_KEY', 'LEAD_EMAIL_FROM']) delete process.env[name];

    console.log('rate limit');
    clearEnv();
    setSheetEnv();
    calls = [];
    globalThis.fetch = (async (input: RequestInfo | URL) => {
        calls.push(String(input));
        return sheetOk(String(input));
    }) as typeof fetch;
    response = await post(validBody);
    assert('no store configured: limit off, lead goes through', response.status === 200);
    assert('no store configured: no call to a store', !calls.some((url) => url.includes('redis.example.test')));

    process.env.RATE_LIMIT_REDIS_REST_URL = 'https://redis.example.test/';
    process.env.RATE_LIMIT_REDIS_REST_TOKEN = 'rl-token';
    const counts = new Map<string, number>();
    let storeBody = '';
    let storeUrl = '';
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = String(input);
        if (url.startsWith('https://redis.example.test')) {
            storeUrl = url;
            storeBody = String(init?.body);
            const key = (JSON.parse(storeBody) as string[][])[1][1];
            const count = (counts.get(key) ?? 0) + 1;
            counts.set(key, count);
            return new Response(JSON.stringify([{ result: count === 1 ? 'OK' : null }, { result: count }]), { status: 200 });
        }
        return sheetOk(url);
    }) as typeof fetch;
    let statuses: number[] = [];
    for (let i = 0; i < 6; i += 1) statuses.push((await post(validBody, '198.51.100.1')).status);
    assert('5 per IP go through', statuses.slice(0, 5).every((status) => status === 200), statuses.join(','));
    assert('the 6th is refused with 429', statuses[5] === 429, statuses.join(','));
    assert('another IP is not affected', (await post(validBody, '198.51.100.2')).status === 200);
    assert('raw IP never sent to the store', !storeBody.includes('198.51.100'));
    assert('trailing slash in the URL handled', storeUrl === 'https://redis.example.test/pipeline', storeUrl);

    process.env.LEAD_RATE_LIMIT_MAX = '1';
    counts.clear();
    statuses = [(await post(validBody, '198.51.100.3')).status, (await post(validBody, '198.51.100.3')).status];
    assert('limit from the environment', statuses[0] === 200 && statuses[1] === 429, statuses.join(','));
    delete process.env.LEAD_RATE_LIMIT_MAX;

    globalThis.fetch = (async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.startsWith('https://redis.example.test')) return new Response('down', { status: 500 });
        return sheetOk(url);
    }) as typeof fetch;
    response = await post(validBody, '198.51.100.1');
    assert('store down: lead still goes through', response.status === 200);
    globalThis.fetch = (async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.startsWith('https://redis.example.test')) throw new Error('network');
        return sheetOk(url);
    }) as typeof fetch;
    response = await post(validBody, '198.51.100.1');
    assert('store unreachable: lead still goes through', response.status === 200);

    console.log('meta conversions api follows the cookie choice only');
    clearEnv();
    setSheetEnv();
    process.env.NEXT_PUBLIC_META_PIXEL_ID = '123';
    process.env.META_CONVERSIONS_API_TOKEN = 'meta-token';
    let metaCalls = 0;
    let metaUrl = '';
    globalThis.fetch = (async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes('graph.facebook.com')) {
            metaCalls += 1;
            metaUrl = url;
        }
        return sheetOk(url);
    }) as typeof fetch;
    await post({ ...validBody, marketingConsent: true, adConsent: false }, '192.0.2.50');
    assert('news box alone does not send to Meta', metaCalls === 0);
    await post({ ...validBody, marketingConsent: false, adConsent: true }, '192.0.2.51');
    assert('cookie consent sends to Meta', metaCalls === 1);
    assert('pixel id from the environment', metaUrl.includes('/123/events'), metaUrl);
    delete process.env.NEXT_PUBLIC_META_PIXEL_ID;
    await post({ ...validBody, adConsent: true }, '192.0.2.52');
    assert('no pixel id: Meta skipped', metaCalls === 1);
    process.env.NEXT_PUBLIC_META_PIXEL_ID = '123';
    delete process.env.META_CONVERSIONS_API_TOKEN;
    await post({ ...validBody, adConsent: true }, '192.0.2.53');
    assert('no token: Meta skipped', metaCalls === 1);
    clearEnv();
    process.env.NEXT_PUBLIC_META_PIXEL_ID = '123';
    process.env.META_CONVERSIONS_API_TOKEN = 'meta-token';
    globalThis.fetch = (async () => new Response('{}', { status: 200 })) as typeof fetch;
    assert('Meta ok but no capture channel: still refused', (await post({ ...validBody, adConsent: true }, '192.0.2.54')).status === 503);
    clearEnv();

    console.log('pixel id');
    assert('pixel id must be digits', validPixelId("1');alert(1)//") === null && validPixelId('123') === '123');
    assert('no pixel id', validPixelId(undefined) === null && validPixelId('') === null);

    console.log('nothing hardcoded');
    const read = (path: string) => readFileSync(join(__dirname, '..', path), 'utf8');
    const leadSources = ['app/api/lead/route.ts', 'app/layout.tsx', 'lib/project-config.ts', 'components/consent/ConsentManager.tsx',
        'lib/lead/email.ts', 'lib/lead/google-sheets.ts', 'lib/lead/meta-capi.ts', 'lib/lead/synphos-os.ts', 'lib/lead/rate-limit.ts'];
    for (const path of leadSources) {
        const code = read(path);
        assert(`${path}: no e-mail address of the team`, !/@studiosynphos\.com/.test(code));
        assert(`${path}: no spreadsheet id`, !/spreadsheets\/d\/|['"`][A-Za-z0-9_-]{40,}['"`]/.test(code));
        assert(`${path}: no pixel id`, !/\b\d{15,16}\b/.test(code));
    }
    assert('client name not in the code', !/client:\s*['"]spanyolret/.test(read('lib/lead/synphos-os.ts')));

    globalThis.fetch = realFetch;
    console.error = realError;
    console.warn = realWarn;
    console.log = realLog;
    clearEnv();
    console.log(`\n${fail === 0 ? 'ALL GREEN' : 'FAILURES'}: ${pass} passed, ${fail} failed`);
    process.exit(fail === 0 ? 0 : 1);
}

main();
