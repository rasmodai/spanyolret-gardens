/**
 * Mixpanel and cookie consent: no token in the code, nothing starts without the
 * visitor's "Accept", the site tag is right, and a refusal stops everything.
 * Usage: npm test (or tsx scripts/test-tracking.ts). No network, no build needed.
 */
import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

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

// 1. No Mixpanel token in the repository (it is public) ---------------------------

console.log('no token in the source');
const SKIP = new Set(['node_modules', '.next', '.git', '.worktrees', '.vercel', 'public']);
function walk(directory: string): string[] {
    return readdirSync(directory).flatMap((entry) => {
        if (SKIP.has(entry)) return [];
        const path = join(directory, entry);
        return statSync(path).isDirectory() ? walk(path) : /\.(tsx?|jsx?|mjs|cjs|json|md|css)$|^\.env\.example$/.test(entry) && !/(package-lock|tsconfig\.tsbuildinfo)/.test(entry) ? [path] : [];
    });
}
// A Mixpanel project token is 32 hexadecimal characters.
const TOKEN_SHAPE = /(?<![0-9a-zA-Z])[0-9a-fA-F]{32}(?![0-9a-zA-Z])/;
const files = walk(root);
assert('source files were scanned', files.length > 40, `${files.length}`);
for (const path of files) {
    const hit = readFileSync(path, 'utf8').match(TOKEN_SHAPE);
    assert(`${path.slice(root.length + 1)}: no 32-character hexadecimal token`, !hit, hit ? `found "${hit[0].slice(0, 6)}…"` : '');
}
assert('the token is read from the environment', /process\.env\.NEXT_PUBLIC_MIXPANEL_TOKEN/.test(read('lib/mixpanel.ts')));
assert('the EU host is read from the environment', /process\.env\.NEXT_PUBLIC_MIXPANEL_API_HOST/.test(read('lib/mixpanel.ts')));
assert('.env.example documents the token and the EU host, empty', /^NEXT_PUBLIC_MIXPANEL_TOKEN=$/m.test(read('.env.example')) && /api-eu\.mixpanel\.com/.test(read('.env.example')) && /^NEXT_PUBLIC_MIXPANEL_API_HOST=$/m.test(read('.env.example')));

// 2. How the code is wired --------------------------------------------------------

console.log('wiring');
const mixpanelSource = read('lib/mixpanel.ts');
assert("init only after consent: readConsent() !== 'accepted' returns before init", mixpanelSource.indexOf("readConsent() !== 'accepted'") !== -1 && mixpanelSource.indexOf("readConsent() !== 'accepted'") < mixpanelSource.indexOf('mixpanel.init('));
assert("site is 'spanyolret-gardens'", /register\(\{\s*site:\s*'spanyolret-gardens'/.test(mixpanelSource));
assert('persistence is localStorage', /persistence:\s*'localStorage'/.test(mixpanelSource));
assert('no global window.mixpanel snippet left', !/window\.mixpanel/.test(mixpanelSource) && !/cdn\.mxpnl\.com/.test(files.map((path) => readFileSync(path, 'utf8')).join('\n')));
assert('the tracker attaches nothing before consent', /if \(consent !== 'accepted'\) return;/.test(read('components/MixpanelTracker.tsx')));
const manager = read('components/consent/ConsentManager.tsx');
assert('a refusal stops Mixpanel and revokes the Pixel', /choice === 'refused'[\s\S]*stopTracking\(\)[\s\S]*fbq\('consent', 'revoke'\)/.test(manager));
assert('the Pixel loads only once cookies are accepted', /pixelId && consent === 'accepted'/.test(manager));
assert('the consent choice has its own storage key, versioned', /STORAGE_KEY = 'spanyolret-consent-v\d+'/.test(read('lib/consent.ts')));

// 3. Behaviour, with a fake Mixpanel and a fake browser ---------------------------

console.log('behaviour');
type Call = [string, ...unknown[]];
const calls: Call[] = [];
let failInit = false;
const fake = {
    init: (...args: unknown[]) => {
        if (failInit) throw new Error('blocked');
        calls.push(['init', ...args]);
    },
    register: (...args: unknown[]) => void calls.push(['register', ...args]),
    register_once: (...args: unknown[]) => void calls.push(['register_once', ...args]),
    track: (...args: unknown[]) => void calls.push(['track', ...args]),
    has_opted_out_tracking: () => false,
    opt_in_tracking: () => void calls.push(['opt_in_tracking']),
    opt_out_tracking: () => void calls.push(['opt_out_tracking']),
    reset: () => void calls.push(['reset']),
};
// eslint-disable-next-line @typescript-eslint/no-require-imports
const mixpanelPath = require.resolve('mixpanel-browser');
require.cache[mixpanelPath] = { id: mixpanelPath, filename: mixpanelPath, loaded: true, exports: { __esModule: true, default: fake } } as unknown as NodeJS.Module;

const storage = new Map<string, string>();
const consentKey = /STORAGE_KEY = '([^']+)'/.exec(read('lib/consent.ts'))![1];
Object.assign(globalThis, {
    window: {
        localStorage: { getItem: (key: string) => storage.get(key) ?? null, setItem: (key: string, value: string) => void storage.set(key, value) },
        location: { pathname: '/hu', search: '' },
        dispatchEvent: () => true,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
    },
    document: { referrer: '' },
});
const warn = console.warn;
console.warn = () => undefined;

const FAKE_TOKEN = 'test-token-not-a-real-one';
const fresh = () => {
    delete require.cache[require.resolve('../lib/mixpanel')];
    delete require.cache[require.resolve('../lib/consent')];
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('../lib/mixpanel') as typeof import('../lib/mixpanel');
};
const count = (name: string) => calls.filter((call) => call[0] === name).length;
const reset = () => {
    calls.length = 0;
    storage.clear();
    failInit = false;
};

delete process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
delete process.env.NEXT_PUBLIC_MIXPANEL_API_HOST;

reset();
storage.set(consentKey, 'accepted');
fresh().track('Page Viewed');
assert('no token: no call at all, no error', calls.length === 0);

process.env.NEXT_PUBLIC_MIXPANEL_TOKEN = FAKE_TOKEN;
process.env.NEXT_PUBLIC_MIXPANEL_API_HOST = 'https://api-eu.mixpanel.com';

reset();
fresh().track('Page Viewed');
assert('token but no choice yet: no call', calls.length === 0);

reset();
storage.set(consentKey, 'refused');
fresh().track('Page Viewed');
assert('cookies refused: no call', calls.length === 0);

reset();
storage.set(consentKey, 'accepted');
{
    const mp = fresh();
    mp.track('Page Viewed', { page: '/hu' });
    mp.track('Section Viewed', { section: 'hero' });
    const init = calls.find((call) => call[0] === 'init');
    assert('cookies accepted: init once, with the token from the environment', count('init') === 1 && init?.[1] === FAKE_TOKEN);
    const options = (init?.[2] ?? {}) as Record<string, unknown>;
    assert('init: localStorage persistence, EU host, no automatic page view', options.persistence === 'localStorage' && options.api_host === 'https://api-eu.mixpanel.com' && options.track_pageview === false);
    const register = calls.find((call) => call[0] === 'register')?.[1] as Record<string, unknown> | undefined;
    assert("registered: site 'spanyolret-gardens' and the page language", register?.site === 'spanyolret-gardens' && register?.language === 'hu');
    assert('both events reach Mixpanel', count('track') === 2);
    calls.length = 0;
    mp.stopTracking();
    assert('withdrawing consent opts out and forgets the device', count('opt_out_tracking') === 1 && count('reset') === 1);
}

reset();
storage.set(consentKey, 'accepted');
failInit = true;
{
    const mp = fresh();
    let threw = false;
    try {
        mp.track('Page Viewed');
        mp.track('Page Viewed');
    } catch {
        threw = true;
    }
    assert('Mixpanel blocked by the browser: no error, no retry', !threw && count('track') === 0);
}

reset();
delete process.env.NEXT_PUBLIC_MIXPANEL_API_HOST;
storage.set(consentKey, 'accepted');
fresh().track('Page Viewed');
assert('no EU host set: init still runs, without api_host', !('api_host' in ((calls.find((call) => call[0] === 'init')?.[2] ?? {}) as object)));

console.warn = warn;
console.log(`\n${fail === 0 ? 'ALL GREEN' : 'FAILURES'}: ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
