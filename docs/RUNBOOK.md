# Spanyolrét Gardens: runbook

For Katalin (maintenance). When this file and the code disagree, the code wins; when this file and `CLAUDE.md` disagree, `CLAUDE.md` wins. Written 12/11/2026 for the revamp branch; check the production state before relying on a "today" below.

## 1. What this is

A bilingual landing page (EN at `/`, HU at `/hu`) selling 6 townhouses (A1 to B3) at Törökbálinti út, 1112 Budapest, for S-Patrik Bau Kft. Visitors leave a phone number or an e-mail, or open WhatsApp; Brenda answers them.

- **Production:** https://spanyolret-gardens.vercel.app. Vercel deploys `main` on every merge.
- **Repo:** `rasmodai/spanyolret-gardens`, **public**. Never put a secret, a sheet id, a recipient address, a token or a per-house price in a commit, a pull request or a comment.
- **Stack:** Next.js 16, React 19, Tailwind 3, TypeScript. No database.
- **Indexing:** closed unless `ALLOW_INDEXING=true` is set on Production (section 3.6).

## 2. Making a change

1. `git pull` on `main`, then a branch: `git switch -c <type>/<short-name>`.
2. Edit. Any text: both languages. Any fact: a written source in a comment (`lib/data.ts`, `lib/project-config.ts`).
3. All three must pass:
   ```bash
   npx tsc --noEmit
   npm test
   npm run build
   ```
4. Run it if the change is visible: `npm run dev`, then http://localhost:3000 and http://localhost:3000/hu (375 px and 1280 px wide). Without `.env.local` the site runs; only the forms refuse to send, which is expected.
5. Open a pull request. Rémi merges; the merge deploys to production.
6. After the deploy: open the production page and check the change, EN and HU (section 6).

Never push to `main`. Never put a secret in the repo. If a test fails, read it before changing it: most tests protect a fact on purpose (sections 3.1, 3.3 and 3.4 name the ones you are expected to change).

## 3. Everyday tasks

### 3.1 Mark a house as sold

1. `lib/data.ts`: set the house's `status` to `'sold'`. Everything derived follows: the house row loses its request button, the garden range and the counts of available houses, the house choice in the forms, the parking lines.
2. Tests that state today's reality will fail, on purpose. Update them to the new reality, nothing more: `scripts/test-copy.ts` ("A3 and B2 sold, four available", the sentence-structure counts, the smallest and largest available garden, the list of houses in the form), `scripts/test-lead.ts` (the table of the six houses), `scripts/test-sales.ts` (counts of "price on request" buttons).
3. Check the prose that names numbers in words ("four houses", "the smallest garden is B1") in `lib/copy/en.ts` and `lib/copy/hu.ts`, EN and HU. If the house sold is B3, the anchor price (`anchorPrice` in `lib/project-config.ts`) is B3's price: **stop and ask Rémi**, the "from" figure must change.
4. Source: Brenda, in writing. Never mark a house sold on hearsay.

### 3.2 Change the anchor price

`lib/project-config.ts` → `anchorPrice`: `withGiftHuf` (offer open) and `withoutGiftHuf` (offer closed). It is the lowest price among the houses still available, from the developer's price list. The tests in `scripts/test-copy.ts` ("EN anchor", "HU anchor") compare it with the expected figures: change them in the same commit. One number only, always with its qualifier; never a price per house.

### 3.3 Withdraw the free parking space after 1 December 2026

The offer ends with the reservation deposits received by 1 December 2026. From 2 December, `npm test` fails (message: "the parking offer is still open…"), so the site cannot ship a false offer by accident.

1. Ask Brenda whether the offer is extended or replaced. If she gives new terms in writing, change `depositBy` (and the copy if the terms differ). Otherwise:
2. `lib/project-config.ts`: `parkingGift.enabled` → `false`. The anchor becomes `withoutGiftHuf` (220 616 000 HUF) and the qualifier, the hero, the FAQ and the parking line lose the offer.
3. `npm test` again. The tests that name the deadline only run while the offer is enabled.
4. Merge. After the deploy, check that the page no longer mentions the offer, EN and HU.

### 3.4 Put the call number when Brenda gives it

`lib/project-config.ts` → `callNumber`: the number as Brenda writes it (`'+36 …'`). Until it is set (`null`) there is no "call now" button anywhere. Once set: the house sheet shows it for available houses (never for a sold one) and the mobile bar gets a Call button. Ask Brenda which number: it may be the same as City Gate's or not. `scripts/test-copy.ts` has an assertion "no call number yet": update it. Do not guess a number.

### 3.5 Edit a text (EN or HU)

All wording is in `lib/copy/en.ts` and `lib/copy/hu.ts`; the shape is in `lib/copy/types.ts`. Change both files, same commit. Rules:
- Hungarian addresses the reader formally (Ön). `scripts/tutoiement.ts` runs inside `npm test` and fails on informal forms.
- Figures and dates come from `lib/format.ts`, never typed: EN `216,616,000 HUF`, `117.45 m²`, `April 2027`; HU `216 616 000 Ft`, `117,45 m²`, `2027. április` (period after the year).
- Hungarian text goes to Brenda for proofreading before it goes live.
- Forbidden: "100 % on time" / "100 % határidőre", any brand name that is not in the technical specification (BOSCH in particular), a price per house, an invented number, a countdown, "only N left".

### 3.6 Open the site to search engines

Do not do this without Rémi. It is a Vercel setting, not a code change: add `ALLOW_INDEXING=true` on **Production only**, then trigger a new build (it is read at build time). Check afterwards: no `noindex` in the page source, no `X-Robots-Tag: noindex` header on `/` and `/hu`, `/sitemap.xml` lists the two home pages (needs `NEXT_PUBLIC_SITE_URL`). The brochure PDF stays noindex.

## 4. Where leads arrive

```
Visitor fills a form (EN or HU)
  └─ POST /api/lead  (app/api/lead/route.ts)
       ├─ origin check → 403 if the request is from another site
       ├─ rate limit per IP → 429 (only if a Redis is configured)
       ├─ honeypot field "website" → silently accepted, nothing stored
       ├─ needs first name + phone or e-mail + consent → 400 otherwise
       └─ in parallel, each channel independent:
            ├─ Synphos OS   → buyers pipeline of Synphos OS
            ├─ Google Sheet → tab "Leads" of the CRM sheet
            ├─ E-mail       → Resend, to LEAD_EMAIL_TO
            └─ Meta CAPI    → server-side Lead event, only if the visitor accepted cookies
```

- **Capture rule:** the visitor sees the thank-you page only if at least one of OS, Sheet or e-mail succeeded. If none did: **503**, an error on the form, and a log line.
- **Source of a lead** (`source`): `form` (call-back request), `whatsapp` or `sms` (the lead is saved, then WhatsApp or SMS opens on the visitor's phone towards Brenda's number with a pre-written message).
- **Where Brenda reads them:** the e-mail, the Google Sheet (rows appended to columns A to Q) and the buyers pipeline of Synphos OS. Resend leaves no trace in Gmail: `LEAD_EMAIL_TO` must contain Rémi's address too.
- Production does not have `META_CONVERSIONS_API_TOKEN` or the `RATE_LIMIT_*` variables (state of 12/11/2026): the Conversions API and the per-IP limit are therefore inactive.

## 5. A form answers 503

Vercel → project → Logs, filter on `/api/lead`.

- `Lead not captured: os=… sheet=… email=…` → every channel failed or was skipped; the three values say which state each is in. **A channel variable is missing or wrong.** The variables: e-mail `RESEND_API_KEY`, `LEAD_EMAIL_FROM`, `LEAD_EMAIL_TO`; Sheet `GOOGLE_SHEET_ID`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`; OS `SYNPHOS_OS_URL`, `SYNPHOS_OS_LEADS_TOKEN`, `SYNPHOS_OS_CLIENT`.
- `… not configured: channel skipped` → names the channel whose variable is missing.
- A channel in `failed` (not `skipped`) → the variable exists but the service refused it: expired token, sender domain not verified in Resend, sheet not shared with the account.

Fix the variable on Vercel (Rémi, or you if he asked you to), then trigger a new deployment and submit one test lead in a private window with a first name `Test` and `?utm_source=test` in the URL. Tell Rémi which test rows to clean up. Never delete rows yourself.

Other codes: 403 = wrong `NEXT_PUBLIC_SITE_URL` or a bot; 400 = missing first name, contact or consent; 429 = rate limit.

## 6. Checks after a deployment

On the production URL, EN and HU:
1. `/` and `/hu` answer 200; `lang="hu"` on `/hu`.
2. The change you made is visible and says the same thing in both languages.
3. The price line shows one figure with its qualifier, no price on any house, "Price on request" / "Ár kérésre" on the available houses and none on the sold ones.
4. The house sheet opens (plan, no price); a sold house has no request button.
5. The cookie banner appears on a first visit; refusing sends nothing (browser network tab: no call to Mixpanel or Meta).
6. Indexing is as intended: closed → `X-Robots-Tag: noindex, nofollow` and a `noindex` robots meta; open → neither.
7. Vercel → Logs: no new error on `/api/lead`.

If you changed a `NEXT_PUBLIC_*` variable or `ALLOW_INDEXING`, the deployment must be a **new build**: they are read at build time.

## 7. Who to ask

| Topic | Person |
|---|---|
| Code, Vercel, variables, anything irreversible, indexing | Rémi |
| Buyers, house facts, prices, availability, Hungarian wording, parking offer, call number | Brenda |
