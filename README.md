# Spanyolrét Gardens

Bilingual sales landing page (`/` in English, `/hu` in Hungarian, thank-you pages `/thank-you` and `/hu/koszonjuk`, privacy pages `/privacy` and `/hu/adatvedelem`) for the 6 townhouses of Spanyolrét Gardens, Törökbálinti út, 1112 Budapest, built and sold by S-Patrik Bau Kft. Next.js 16, React 19, Tailwind 3, TypeScript. No database of its own.

Production: https://spanyolret-gardens.vercel.app. Vercel deploys `main` to production on every merge. The repository is **public**: no secret and no channel value (sheet id, recipients, ad ids) may ever be written in the code, a commit or a pull request. Names of variables only.

## Run it

```bash
npm ci
cp .env.example .env.local   # optional: without variables the site runs, only the forms refuse to send
npm run dev                  # http://localhost:3000 and http://localhost:3000/hu
npm test                     # lead chain, copy EN = HU, facts, tracking, SEO guard, sales pieces
npx tsc --noEmit
npm run build
```

Before any delivery: `npx tsc --noEmit`, `npm test` and `npm run build` must all pass.

## Where to change what

| What | Where |
|---|---|
| The six houses: surfaces, gardens, parking, status (available / sold) | `lib/data.ts` |
| Project facts that are not a house: handover date, parking offer, anchor price, developer, contacts, WhatsApp and call numbers, privacy controller | `lib/project-config.ts` (one source comment per value) |
| All wording, EN and HU | `lib/copy/en.ts`, `lib/copy/hu.ts` (shape in `lib/copy/types.ts`, shared derived values in `lib/copy/shared.ts`). Always both. |
| Number, price and date formats | `lib/format.ts` (never format by hand) |
| What the browser receives about the houses (display strings, no price) | `lib/houses-view.ts` |
| Colours, typography, spacing | tokens in `app/globals.css` and `tailwind.config.ts`, rules in `DESIGN.md` |
| Lead channels | `lib/lead/*.ts` and `app/api/lead/route.ts` |

One component tree serves both languages: `components/LandingPage.tsx` receives the locale and the copy. `lib/data.ts` is never imported from a `'use client'` file.

## `lib/project-config.ts`

| Value | Today | What it does |
|---|---|---|
| `handoverDate` | April 2027 | Keys date in the hero and the FAQ, formatted per language. `null`: no date anywhere. |
| `parkingGift` | enabled, `depositBy: '2026-12-01'`, 4 000 000 HUF | The free parking space for a deposit received by that day. `enabled: false` removes the offer everywhere and moves the anchor price. |
| `anchorPrice` | 216 616 000 (offer on) / 220 616 000 (offer off) HUF | The only price published, always with its qualifier. Never a price per house. |
| `parkingSpacePriceHuf` | 4 000 000 HUF | Price of an additional space (optional extras). |
| `callNumber` | City Gate's number (Rémi, 13/11) | Number behind the call choice of the form section, the house sheet's call button (available houses only) and the mobile bar's Call button. `null`: no call choice, the form stays open. |
| `whatsappNumber` | Brenda's mobile | Number behind the WhatsApp and SMS buttons. `null`: the message form falls back to a call-back request. |
| `contactEmail`, `contactPhone` | set | Footer contact block, each only if set. |
| `privacyController`, `privacyPolicyDate` | S-Patrik Bau Kft. | Controller named on the privacy pages. |

**The parking offer ends on 1 December 2026, and `npm test` fails on purpose from 2 December 2026** while `parkingGift.enabled` is still `true`: the site would be stating an offer that no longer exists. Fix: see `docs/RUNBOOK.md`, section 3.3.

## Environment variables

Full commented list: `.env.example` (names only). Set them on Vercel, never in the repo.

| Channel | Variables | If missing |
|---|---|---|
| Site address | `NEXT_PUBLIC_SITE_URL` | Canonical, hreflang and sitemap stay relative; the lead route accepts any origin. Set for Production only. |
| E-mail (Resend) | `RESEND_API_KEY`, `LEAD_EMAIL_FROM`, `LEAD_EMAIL_TO` | Channel skipped |
| Google Sheet | `GOOGLE_SHEET_ID`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN` (`GOOGLE_SHEET_TAB`, default `Leads`) | Channel skipped |
| Synphos OS | `SYNPHOS_OS_URL`, `SYNPHOS_OS_LEADS_TOKEN`, `SYNPHOS_OS_CLIENT` | Channel skipped |
| Meta Pixel | `NEXT_PUBLIC_META_PIXEL_ID` | No script |
| Meta Conversions API | `NEXT_PUBLIC_META_PIXEL_ID`, `META_CONVERSIONS_API_TOKEN` | Channel skipped |
| Mixpanel | `NEXT_PUBLIC_MIXPANEL_TOKEN`, `NEXT_PUBLIC_MIXPANEL_API_HOST` (EU) | Nothing is sent |
| IP rate limit | `RATE_LIMIT_REDIS_REST_URL`, `RATE_LIMIT_REDIS_REST_TOKEN` (or `KV_REST_API_*`), `LEAD_RATE_LIMIT_MAX`, `LEAD_RATE_LIMIT_WINDOW_SECONDS`, `RATE_LIMIT_SALT` | Limit off |
| Indexing | `ALLOW_INDEXING` | `noindex` everywhere |

`NEXT_PUBLIC_*` and `ALLOW_INDEXING` are read **at build time**: redeploy after changing one.

**Capture rule.** The visitor sees the thank-you page only if at least one capture channel (Synphos OS, Google Sheet, e-mail) succeeded. If none did, or none is configured, the route answers **503** and logs `Lead not captured`: a lost lead never gets a thank-you. Meta and Mixpanel never count as capture. The route also checks the origin (403), the rate limit (429), a honeypot field and the required fields (first name, phone or e-mail, consent: 400).

## Deploy

Merge into `main`: Vercel builds and deploys to production. A pull request gets a preview deployment (on another host: that is why `NEXT_PUBLIC_SITE_URL` is Production-only). Variables read at build time must be set **before** the deployment that must use them. Step by step for maintenance: `docs/RUNBOOK.md`.

## Search engines

Noindex by default: page tag, `X-Robots-Tag` header, empty sitemap, no `sitemap` line in `robots.txt`. Only the exact value `ALLOW_INDEXING=true` opens the site (`lib/indexing.ts`, read by `next.config.js`, `app/robots.ts`, `app/sitemap.ts` and `lib/metadata.ts`). It is meant to be set in Production only and left unset on previews, so a preview or a new project is never indexed by accident. `public/Spanyolret-gardens.pdf` (brochure with option prices) is `noindex` whatever the flag says. Canonical and hreflang EN/HU, the share image and the icons are generated by `lib/metadata.ts` and `app/*image*`, `app/icon.png`, `app/apple-icon.png`.

## Tracking and consent

Mixpanel (EU project, `lib/mixpanel.ts`, mounted by `components/MixpanelTracker.tsx`) and the Meta Pixel (`NEXT_PUBLIC_META_PIXEL_ID`) load **only after the visitor accepts** in the cookie banner (`components/consent/ConsentManager.tsx`, state in `lib/consent.ts`, key `spanyolret-consent-v2`). Refusal means no third-party call; the footer link "Cookie settings" / "Süti-beállítások" reopens the choice. The server-side Meta Conversions API event is sent only for a visitor who accepted. Mixpanel receives behaviour events only (never a name, e-mail or phone), each tagged `site: 'spanyolret-gardens'` and the language; event names are those sent by the code: `grep -rn "track(" components lib`.

## Rules in short

Full version in `CLAUDE.md`. Hungarian addresses the reader formally (Ön). No price per house. No "100 % on time", no BOSCH. No fake urgency. Every fact has a written source in `lib/data.ts` or `lib/project-config.ts`; an unknown value is `null` and disappears from the page.
