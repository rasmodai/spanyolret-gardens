/**
 * The sales pieces: the sheet of each house (no price, no way to ask for a sold
 * house), the two bands, the call button (hidden while there is no call number),
 * the thank-you pages. Usage: npm test (or tsx scripts/test-sales.ts).
 * No network, no build needed; rendered on the server with a fake call number
 * injected here and nowhere else.
 */
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import CallReveal from '../components/sections/CallReveal';
import CtaBand from '../components/sections/CtaBand';
import HouseRows from '../components/sections/HouseRows';
import { HouseSheetBody, type HouseSheetLabels } from '../components/sections/HouseSheet';
import StickyActions from '../components/StickyActions';
import ThankYou from '../components/ThankYou';
import { units } from '../lib/data';
import { en } from '../lib/copy/en';
import { hu } from '../lib/copy/hu';
import { floorPlans } from '../lib/floorplans';
import { houseRows } from '../lib/houses-view';
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
const FAKE_PHONE = '+36 20 000 0000';
const noop = () => {};
const count = (text: string, part: string) => text.split(part).length - 1;
const textOf = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

function labelsOf(locale: 'en' | 'hu'): HouseSheetLabels {
    const { houses } = locale === 'hu' ? hu : en;
    return { ...houses.sheet, plans: { house: houses.plans.house, groundFloor: houses.plans.groundFloor, firstFloor: houses.plans.firstFloor, planCaption: houses.plans.planCaption, roomNames: houses.plans.roomNames } };
}

function sheet(locale: 'en' | 'hu', id: string, options: { messaging?: boolean; phone?: string | null; drawings?: boolean } = {}): string {
    const rows = houseRows(locale);
    const index = rows.findIndex((row) => row.id === id);
    return renderToStaticMarkup(
        h(HouseSheetBody, {
            key: id,
            row: rows[index],
            labels: labelsOf(locale),
            locale,
            drawings: options.drawings ? floorPlans : null,
            messaging: options.messaging ?? true,
            phone: options.phone ?? null,
            previous: index > 0 ? rows[index - 1].id : null,
            next: index < rows.length - 1 ? rows[index + 1].id : null,
            onNavigate: noop,
            onAsk: noop,
        })
    );
}

// 1. The sheet of a house: facts, no price -------------------------------------

console.log('house sheet');
const BIG_NUMBER = /\d{1,3}(?:[,.  ]\d{3}){2,}/;
for (const locale of ['en', 'hu'] as const) {
    const copy = locale === 'hu' ? hu : en;
    const rows = houseRows(locale);
    for (const unit of units) {
        const row = rows.find((candidate) => candidate.id === unit.id)!;
        const html = sheet(locale, unit.id, { drawings: true, phone: FAKE_PHONE });
        const text = textOf(html);
        assert(`${locale} ${unit.id}: the sheet states no price`, !/price|huf|\bft\b|\bár\b|\bárat\b|millió/i.test(text.replace(/\bPrice on request\b/g, '')) && !BIG_NUMBER.test(text), text.slice(0, 80));
        assert(`${locale} ${unit.id}: seven facts, none empty`, row.facts.length === 7 && row.facts.every((fact) => fact.label && fact.value));
        const byLabel = (label: string) => row.facts.find((fact) => fact.label === label)?.value ?? '';
        assert(`${locale} ${unit.id}: interior, floors, terrace and garden come from the data`,
            byLabel(copy.houses.sheet.facts.interior).startsWith((locale === 'hu' ? unit.totalInternal.toFixed(2).replace('.', ',') : unit.totalInternal.toFixed(2)))
            && byLabel(copy.houses.sheet.facts.garden).startsWith(locale === 'hu' ? unit.gardenArea.toFixed(2).replace('.', ',') : unit.gardenArea.toFixed(2))
            && byLabel(copy.houses.sheet.facts.groundFloor).startsWith(locale === 'hu' ? unit.groundFloor.toFixed(2).replace('.', ',') : unit.groundFloor.toFixed(2)));
        assert(`${locale} ${unit.id}: ${unit.rooms} rooms and ${unit.parkingSpaces} parking space(s)`,
            byLabel(copy.houses.sheet.facts.rooms) === String(unit.rooms) && /^\d+/.test(byLabel(copy.houses.sheet.facts.parking)) && byLabel(copy.houses.sheet.facts.parking).startsWith(String(unit.parkingSpaces)));
        assert(`${locale} ${unit.id}: both plans can be drawn (ground and upper)`, Boolean(floorPlans[`${unit.id}-ground`] && floorPlans[`${unit.id}-upper`]) && html.includes('<svg'));
        // Ask buttons: available houses only.
        const ask = copy.houses.sheet.askMessage.replace('{id}', unit.id);
        const askCall = copy.houses.sheet.askCallBack.replace('{id}', unit.id);
        if (unit.status === 'sold') {
            assert(`${locale} ${unit.id} (sold): no request button, no call button`,
                !html.includes(ask) && !html.includes(askCall) && !html.includes('btn-primary') && !html.includes(copy.houses.sheet.callNow) && !html.includes('tel:'), '');
            assert(`${locale} ${unit.id} (sold): the sheet still shows the plan and the status`, html.includes('<svg') && row.status === copy.houses.statuses.sold);
        } else {
            assert(`${locale} ${unit.id} (available): the request button is there`, html.includes(ask));
            assert(`${locale} ${unit.id} (available, no messaging number): the call-back request replaces the message`,
                sheet(locale, unit.id, { messaging: false }).includes(askCall) && !sheet(locale, unit.id, { messaging: false }).includes(ask));
        }
    }
}
const parkingByHouse = Object.fromEntries(units.map((unit) => [unit.id, unit.parkingSpaces]));
assert('parking: two spaces with A1, A2 and B1, one with B3', parkingByHouse.A1 === 2 && parkingByHouse.A2 === 2 && parkingByHouse.B1 === 2 && parkingByHouse.B3 === 1);
assert('the sheet neighbours follow the list: B1 is first (no previous), B2 is last (no next)',
    !sheet('en', 'B1').includes(en.houses.sheet.previous) && sheet('en', 'B1').includes(`${en.houses.sheet.next}: B3`)
    && !sheet('en', 'B2').includes(en.houses.sheet.next) && sheet('en', 'B2').includes(`${en.houses.sheet.previous}: A3`));

// 2. The rows: sold houses have no request button ---------------------------------

console.log('house rows');
for (const locale of ['en', 'hu'] as const) {
    const copy = locale === 'hu' ? hu : en;
    const html = renderToStaticMarkup(
        h(HouseRows, { houses: houseRows(locale), columnHouse: 'x', columnGarden: 'y', priceOnRequest: copy.houses.priceOnRequest, openLabel: copy.houses.sheet.open, onOpen: noop, onAsk: noop })
    );
    assert(`${locale}: six "plan and details" buttons (sold houses included)`, count(html, `>${copy.houses.sheet.open}<`) === 6);
    assert(`${locale}: "${copy.houses.priceOnRequest}" on the four available houses only`, count(html, `>${copy.houses.priceOnRequest}<`) === 4);
}

// 3. The call button: nothing while there is no number ------------------------------

console.log('call number');
assert('callNumber is null today', projectConfig.callNumber === null);
const reveal = (phone: string | null) => renderToStaticMarkup(h(CallReveal, { phone, label: 'Call us', revealedLabel: 'tap to call', house: 'A1', className: 'x' }));
assert('CallReveal renders nothing with a null number', reveal(null) === '');
assert('CallReveal shows its button with a number', reveal(FAKE_PHONE).includes('Call us') && !reveal(FAKE_PHONE).includes('0000'));
for (const locale of ['en', 'hu'] as const) {
    const copy = locale === 'hu' ? hu : en;
    assert(`${locale}: the sheet shows no call button with a null number`, !sheet(locale, 'A1', { phone: null }).includes(copy.houses.sheet.callNow));
    assert(`${locale}: the sheet shows the call button with a number, for an available house`, sheet(locale, 'A1', { phone: FAKE_PHONE }).includes(copy.houses.sheet.callNow));
    assert(`${locale}: the sheet never offers a call for a sold house`, !sheet(locale, 'A3', { phone: FAKE_PHONE }).includes(copy.houses.sheet.callNow));
    const bar = (phone: string | null, messaging = true) => renderToStaticMarkup(h(StickyActions, { copy: copy.stickyBar, messaging, phone }));
    assert(`${locale}: the mobile bar has no call and no tel: link with a null number`, !bar(null).includes('tel:') && !bar(null).includes(`>${copy.stickyBar.call}<`));
    assert(`${locale}: the mobile bar keeps the viewing and the message with a null number`, bar(null).includes(copy.stickyBar.viewing) && bar(null).includes(copy.stickyBar.message));
    assert(`${locale}: the mobile bar gains the call with a number`, bar(FAKE_PHONE).includes('href="tel:+36200000000"') && bar(FAKE_PHONE).includes(`>${copy.stickyBar.call}<`));
    assert(`${locale}: the mobile bar without a messaging number has no message button`, !bar(null, false).includes(`>${copy.stickyBar.message}<`));
}
assert('the page passes callNumber (not a literal) to the bar and the sheets', /phone=\{projectConfig\.callNumber\}/.test(read('components/LandingPage.tsx')) && /phone=\{projectConfig\.callNumber\}/.test(read('components/sections/FloorPlans.tsx')));
assert('no phone number typed in the sales components', ![ 'components/sections/CallReveal.tsx', 'components/sections/HouseSheet.tsx', 'components/sections/HouseExplorer.tsx', 'components/sections/CtaBand.tsx', 'components/StickyActions.tsx'].some((path) => /\+36|\b06 ?\d{2}/.test(read(path))));

// 4. The two bands ------------------------------------------------------------------

console.log('CTA bands');
const landing = read('components/LandingPage.tsx');
assert('two bands on the page: after the houses and after the specs', count(landing, '<CtaBand ') === 2 && /id="after-houses"/.test(landing) && /id="after-specs"/.test(landing));
const order = ['<FloorPlans', '<CtaBand id="after-houses"', '<Pricing', '<Specs', '<CtaBand id="after-specs"', '<Process', '<LeadForm'].map((marker) => landing.indexOf(marker));
assert('the bands sit where they should (houses → band → pricing, specs → band → process)', order.every((position, i) => position > -1 && (i === 0 || position > order[i - 1])));
// A band says nothing new: no figure, nothing about scarcity.
const SCARCITY = /last|only \d|few|limited|hurry|running out|don't miss|utolsó|csak \d|kevés|korlátozott|sietjen|ne maradjon le/i;
for (const [name, copy] of [['en', en], ['hu', hu]] as const) {
    for (const [key, band] of Object.entries(copy.ctaBands)) {
        const all = Object.values(band).join(' ');
        assert(`${name}: band ${key} has four texts, no figure, no scarcity`, Object.values(band).length === 4 && Object.values(band).every(Boolean) && !/\d/.test(all) && !SCARCITY.test(all), all);
    }
}
const band = (messaging: boolean) => renderToStaticMarkup(h(CtaBand, { id: 'x', ...en.ctaBands.afterHouses, messaging }));
assert('a band has its form button always, its message button only with a messaging number', band(true).includes('href="#lead-form"') && band(true).includes(en.ctaBands.afterHouses.message) && band(false).includes('href="#lead-form"') && !band(false).includes(en.ctaBands.afterHouses.message));

// 5. Thank-you pages ------------------------------------------------------------------

console.log('thank-you pages');
for (const locale of ['en', 'hu'] as const) {
    const copy = locale === 'hu' ? hu : en;
    const html = renderToStaticMarkup(h(ThankYou, { locale }));
    assert(`${locale}: the page carries its title, its next step and the way home`, html.includes(copy.thankYou.title) && copy.thankYou.next.every((step) => html.includes(step.replace(/'/g, '&#x27;'))) && html.includes(`href="${copy.thankYou.backHref}"`));
    assert(`${locale}: the brochure link is kept as it was`, html.includes('href="/Spanyolret-gardens.pdf"') && html.includes('download') && existsSync(join(root, 'public/Spanyolret-gardens.pdf')));
    assert(`${locale}: WhatsApp and SMS open the number of the message form`, html.includes('wa.me/36703701479') && html.includes('sms:+36703701479'));
    assert(`${locale}: no leftover of the old design (rounded, shadow, primary background)`, !/rounded|shadow|bg-primary|bg-paper-deep|text-paper\//.test(html));
    assert(`${locale}: the design is the current one (lawn accent, no radius)`, html.includes('border-lawn') && html.includes('btn-primary'));
}
assert('EN and HU thank-you pages have the same shape', en.thankYou.next.length === hu.thankYou.next.length && Object.keys(en.thankYou).join() === Object.keys(hu.thankYou).join());
for (const [path, text] of [...Object.entries(hu.thankYou).flatMap(([key, value]) => (Array.isArray(value) ? value.map((item, i) => [`thankYou.${key}[${i}]`, item]) : [[`thankYou.${key}`, value]])) as [string, string][]]) {
    assert(`hu: ${path} is in "Ön"`, tutoiement(text).length === 0, `${tutoiement(text).join()} in "${text}"`);
}
assert('hu: the rendered thank-you page is in "Ön"', tutoiement(textOf(renderToStaticMarkup(h(ThankYou, { locale: 'hu' })))).length === 0);
assert('the old tutoiement is gone ("töltsd")', !/töltsd/i.test(read('app/hu/koszonjuk/page.tsx') + JSON.stringify(hu)));
assert('both pages stay noindex and use the copy tree', [read('app/thank-you/page.tsx'), read('app/hu/koszonjuk/page.tsx')].every((code) => /index:\s*false/.test(code) && /thankYou\.metaTitle/.test(code) && /<ThankYou locale=/.test(code)));

// 6. Events and dependency --------------------------------------------------------------

console.log('events');
const explorer = read('components/sections/HouseExplorer.tsx') + read('components/sections/HouseSheet.tsx') + read('components/sections/CallReveal.tsx') + read('components/sections/CtaBand.tsx') + read('components/StickyActions.tsx');
for (const event of ['House Plan Opened', 'House Enquiry Clicked', 'Floor Plan Zoomed', 'CTA Band', 'Sticky CTA']) {
    assert(`event "${event}" is sent`, explorer.includes(`track('${event}'`));
}
assert('the sheet is a Radix dialog (focus trap, Escape, scroll lock)', /@radix-ui\/react-dialog/.test(read('components/sections/HouseSheet.tsx')) && /"@radix-ui\/react-dialog"/.test(read('package.json')));
assert('the old plan viewer is gone', !existsSync(join(root, 'components/PlanViewer.tsx')));

console.log(`\n${fail === 0 ? 'ALL GREEN' : 'FAILURES'}: ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
