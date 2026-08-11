# Design System — Spanyolrét Gardens

> Source of truth for every visual decision on this project.
> Created 2026-08-08 by `/design-consultation`. Do not deviate without explicit approval.

## Product Context

- **What this is:** Sales landing page for Spanyolrét Gardens, a 6-unit new-build townhouse development in Budapest District XI (S-Patrik Bau Kft., delivery September 2026). The page converts high-intent visitors into booked site visits.
- **Who it's for:** Western expat families, 32–48, one to three children, currently renting 60–80 m² in central Budapest. English-first, limited Hungarian. Their blocking fear is Hungarian construction quality; their unmet need is private outdoor space.
- **Space/industry:** Premium residential development. Direct visual peers: [Cordia](https://en.cordia.hu/) (volume developer portal), [Dorottya Residences](https://dorottyaresidences.hu/en/home/) (heritage-luxury), [MyBudapestHome](https://www.mybudapesthome.com/new-built) (expat agency portal).
- **Project type:** Marketing site, bilingual (EN + HU), Next.js 14 App Router + Tailwind.

## The Memorable Thing

**A real garden. Not a balcony.**

Private gardens of 102–317 m² are the only genuinely rare thing in this offer, and they answer the strongest pain point in the PRD ("The kids need somewhere safe to play outside. A balcony isn't enough."). Every design decision below serves that one idea. If a decision does not serve it, it does not belong.

## Aesthetic Direction

- **Direction:** Architectural editorial — the page reads as a well-made property document, not a sales page.
- **Decoration level:** Intentional. Paper-toned surfaces, 1px hairlines, real drawings and renders as the only texture. No glass, no gradients, no glow, no shadow.
- **Mood:** Measured and warm. Confident enough to state dimensions plainly, warm enough that a family can picture Saturday morning on the terrace.
- **The thesis:** The buyer's blocking objection is construction quality. A site that looks like a competent architectural document *is itself* evidence of competence. The medium carries the trust signal — so the page must never look like a brochure or a SaaS landing page.

### Category positioning

| Peer | Their visual language | Why we do not copy it |
|------|----------------------|-----------------------|
| Cordia | Orange/grey, search-first, dense card catalogue | Reads as inventory. We have six units, not a catalogue. |
| Dorottya Residences | Serif caps + gold + black band, hotel register | Reads as investment and prestige. Cold, and no family appears in it. |
| MyBudapestHome | Navy + terracotta, listing grid, agent stock photo | Reads as broker, not builder. |
| **This site (before)** | Gradients, glassmorphism, blurred orbs | Borrows credibility from tech, not from building. Worst fit of the four. |

Nobody in this category speaks the language of architecture itself. That is the opening.

## Typography

Three voices, three jobs. The serif carries warmth and permanence, the grotesque carries reading, the mono carries measurement — and the mono is what answers the construction-quality fear.

- **Display/Hero:** **Fraunces** (variable, 300–800, `opsz` axis only) — warm old-style serif with real presence at large sizes. Weight 600; the wonk axis is not shipped, so the wobble is off by default. Chosen because it reads domestic and permanent without falling into the gold-luxury register of the category.
- **Body:** **Instrument Sans** (400/500/600) — neutral grotesque, clean at 17px. Chosen partly because it is *not* Inter: the previous system used Inter + Outfit, the default pairing of every AI-generated landing page.
- **UI/Labels:** Same as body (Instrument Sans 500).
- **Data/Measurements:** **IBM Plex Mono** (400/500) with `font-variant-numeric: tabular-nums`. Every measured quantity uses it — areas, prices, wall thicknesses, dates. Never a sentence.
- **Code:** IBM Plex Mono.

  *Substituted 2026-08-08.* This section originally specified Geist Mono, which is absent from Next 14.2.15's `next/font/google` list — using it would have meant either a new dependency or a `<link>` to Google's CDN, giving up self-hosting and the layout-shift guarantee. IBM Plex Mono ships `latin-ext` (re-checked, per the rule below), is drawn as a technical/engineering face rather than a coding face, and self-hosts through `next/font`. Loaded in `app/layout.tsx`, not via a stylesheet link.

### Hungarian coverage (verified, not assumed)

All three families serve the Google Fonts `latin-ext` subset (`U+0100–02BA`), which contains **ő** (U+0151) and **ű** (U+0171). Verified against the Google Fonts CSS API on 2026-08-08. Any future font substitution **must** be re-checked against `latin-ext` before use — the HU locale breaks silently otherwise.

### Loading

All three are self-hosted through `next/font/google` in `app/layout.tsx` — no CDN request, no layout shift, and the `latin-ext` subset is requested explicitly:

```ts
const display = Fraunces({ subsets: ['latin', 'latin-ext'], axes: ['opsz'], variable: '--font-display' });
const body    = Instrument_Sans({ subsets: ['latin', 'latin-ext'], variable: '--font-body' });
const mono    = IBM_Plex_Mono({ subsets: ['latin', 'latin-ext'], weight: ['400', '500'], variable: '--font-mono' });
```

Only `opsz` is requested. `SOFT` and `WONK` were originally shipped and then pinned to 0 in `globals.css` — which is Fraunces' own default — so both axes were pure download weight for no visual difference. Font transfer dropped from 300 kB to 201 kB.

### Scale

| Token | Family | Size | Line height | Tracking | Usage |
|-------|--------|------|-------------|----------|-------|
| `display-xl` | Fraunces 600 | `clamp(44px, 7vw, 76px)` | 1.02 single-line / **1.12 two-line** | -0.025em | Hero headline only |
| `display-l` | Fraunces 600 | `clamp(30px, 4vw, 44px)` | 1.06 single-line / **1.12 two-line** | -0.02em | Section headings |
| `h3` | Fraunces 600 | 22px | 1.25 | -0.015em | Unit names, sub-headings |
| `body-l` | Instrument Sans 400 | 19px | 1.55 | 0 | Lede paragraphs |
| `body` | Instrument Sans 400 | 17px | 1.60 | 0 | Running text |
| `small` | Instrument Sans 400 | 15px | 1.50 | 0 | Notes, fine print |
| `caption` | IBM Plex Mono 400 | 12px | 1.40 | 0.12em, uppercase | Labels, eyebrows |
| `measure` | IBM Plex Mono 400/500 | inherits | 1.70 | 0 | Any number with a unit |

Set `opsz` explicitly at display sizes (96–120) so Fraunces uses its display cut rather than the text cut.

### Two-line headlines need 1.12, in both languages

Measured in Fraunces 600 at 52px: the descender of `gyereknek` reaches 12.75px below the baseline, and the ascent of `Hőszivattyús` reaches 36.56px above it. At `line-height: 1.02` the line box is 53.04px, leaving **3.73px of ink clearance** between the two lines. At 1.12 it is 9.97px.

This is **not** a Hungarian problem, and it would be wrong to fix it only on the HU routes. The ascent of the English `Not a balcony` is **38.64px** — *taller* than the Hungarian, because the `b` and `l` ascenders exceed the ő double acute. Tight leading on a two-line mixed-case headline crowds in both locales equally.

**Rule:** 1.02 is for single-line headlines only. Any headline that wraps to two or more lines uses 1.12. Applies to EN and HU alike.

## Color

- **Approach:** Restrained. Neutrals do the work; exactly one accent, used rarely and meaningfully.
- **Where it comes from:** The building. Facade render, anthracite window frames, sand infill panels, concrete pavers, lawn. Nothing invented.
- **The green is not a brand color — it is the grass.** It is the product. That is the entire justification for using green in a category where green usually means generic "eco".

### Light (default)

| Token | Hex | Role |
|-------|-----|------|
| `--paper` | `#F6F4EF` | Page background. The facade render. |
| `--paper-deep` | `#EBE7DF` | Alternating bands, inset surfaces. |
| `--ink` | `#23262A` | Primary text. |
| `--ink-soft` | `#6B6E70` | Secondary text, labels. |
| `--frame` | `#383E42` | Dark bands, footer, technical sections. The window frames. |
| `--lawn` | `#3F6B2E` | **The only accent.** Gardens, primary CTA, key figures. |
| `--clay` | `#B08968` | Hairlines, small marks, hover underlines. **Never text.** |
| `--line` | `rgba(35,38,42,.14)` | Default rule. |
| `--line-strong` | `rgba(35,38,42,.28)` | Input underline, button border. |

### Dark

Surfaces are redesigned, not inverted. Accents lighten so they hold on a dark ground.

| Token | Hex | Note |
|-------|-----|------|
| `--paper` | `#1C1F22` | |
| `--paper-deep` | `#24282B` | |
| `--ink` | `#EDEAE3` | Warm off-white, never pure `#FFF` |
| `--ink-soft` | `#B4B8BA` | 5.43 on `--frame` — verified |
| `--frame` | `#121416` | |
| `--lawn` | `#8FBB78` | Lightened; `#3F6B2E` fails on dark |
| `--clay` | `#C9A382` | 4.67 on `#383E42` — AA |

On the `--frame` band in light mode: muted text is `#B4B8BA` (5.43, AA) and the accent for **small** text is `--clay` `#C9A382` (4.67, AA). The lighter lawn `#7FA86A` measures 3.98 — large text and graphics only.

### Semantic

Verified against `--paper` `#F6F4EF` (light) and `#1C1F22` (dark). All pass WCAG AA.

| Role | Light | Ratio | Dark | Ratio |
|------|-------|-------|------|-------|
| success | `#3F6B2E` | 5.70 | `#8FBB78` | 7.53 |
| warning | `#8A6A1F` | 4.59 | `#D4B15E` | 8.08 |
| error | `#8C3A2E` | 6.92 | `#E0866F` | 6.16 |
| info | `#35566B` | 7.09 | `#8FB4CC` | 7.54 |

### Verified contrast — core pairs

| Pair | Ratio | Level |
|------|-------|-------|
| `ink` on `paper` | 13.82 | AAA |
| `ink` on `paper-deep` | 12.32 | AAA |
| `ink-soft` on `paper` | 4.67 | AA |
| `lawn` on `paper` | 5.70 | AA |
| `lawn` on `paper-deep` | 5.08 | AA |
| `frame` on `paper` | 9.87 | AAA |
| white on `lawn` | 6.26 | AA |
| white on `frame` | 10.85 | AAA |
| **`clay` on `paper`** | **2.88** | **Fails — decorative only** |

Ratios computed, not estimated. `--clay` is the one token that fails as text; that is why it is restricted to hairlines and marks.

### Retired

`#1B3B6F` (navy), `#4A7C23` (brand green), `#87CEEB` (sky), `#FFD700` (gold), `#1B3B6F→#4A7C23` text gradients. The navy is the single most common color in this category and it fights the warm facades in every render.

**These are retired as UI tokens only.** `PRD §8.3 Visual Style Guide` uses `#87CEEB`, `#FFD700` and `#1B3B6F` as a *render brief* — sky at day, golden hour and dusk. That palette is a direction for image production and stays valid. Do not delete it while cleaning up the UI tokens; the two lists have different jobs and the navy leaked from one into the other, which is how it ended up as a brand color in the first place.

## Spacing

- **Base unit:** 8px.
- **Density:** Spacious. Generous whitespace is what makes the page read expensive; the previous system filled space with decoration instead.
- **Scale:** `2xs` 4 · `xs` 8 · `sm` 16 · `md` 24 · `lg` 32 · `xl` 48 · `2xl` 64 · `3xl` 96 · `4xl` 128
- **Section rhythm:** 96px vertical padding on desktop, 56px below 640px.
- **Gutter:** 24px.

## Layout

- **Approach:** Hybrid. Asymmetric editorial for narrative sections; strict grid for anything with numbers in it (unit comparison, technical specs, floor plans).
- **Grid:** 12 columns desktop · 6 tablet · 4 mobile.
- **Max content width:** 1180px. Imagery goes full-bleed and breaks the container.
- **Border radius: `0` everywhere.** No exceptions, including buttons, inputs, cards, and images. The architecture is flat-roofed and rectilinear; bubbly corners contradict the subject and are the loudest AI-slop tell in the previous system.
- **Elevation: none.** No `box-shadow` anywhere. Depth comes from full-bleed imagery against paper, and from 1px hairlines. If something needs to feel separated, use a rule or a background band.
- **First viewport is a poster, not a document.** One image, one headline set low-left, one primary action. Never a centered stack of badge + headline + price + two buttons + four stat pills.

## Motion

- **Approach:** Minimal-functional. Motion exists to aid comprehension, never to decorate.
- **Easing:** enter `cubic-bezier(0.22, 0.61, 0.36, 1)` · exit `ease-in` · move `ease-in-out`
- **Duration:** micro 80ms · short 140ms · medium 260ms · long 420ms
- **Scroll entrance:** opacity 0→1 plus `translateY(12px)`, 420ms, once. Never staggered beyond two steps.
- **Hover:** color and border only, 140ms. No lift, no scale, no shadow bloom.
- **Signature motion (the one exception):** garden ribbons animate their width from 0 to their true proportion on first scroll-in, 600ms. It is the only animation in the system that carries information.
- **Retired:** `animate-ping`, `animate-pulse`, `animate-float`, `animate-breathe`, `animate-shimmer`, `hover-lift`, `hover-glow`, `ambient-glow`, `btn-magnetic`.
- Respect `prefers-reduced-motion: reduce` — disable all entrance and ribbon animation, keep final states.

### Material motion, not decorative motion

Added 2026-08-08. The distinction that makes this compatible with a minimal system: motion that behaves like a physical thing reinforces "document, not brochure". Motion that draws attention to itself fights it.

| Device | What it is | Why it is not decoration |
|--------|-----------|--------------------------|
| `reveal-mask` | Photographs uncover left to right, 720ms | A print being pulled out from under a sheet. Replaces the fade every other site uses. |
| `reveal-unroll` | Drawings unroll from the bottom, 900ms | A plan being unrolled on a table. Slower, because a drawing rewards being read. |
| `plan-swap` | The plan wipes in on every tab change, 520ms | The sheet is being changed, not the pixels. |
| `scale-sticky` | The ribbon scale header stays while the six bars scroll | Without it you lose the reference the bars are measured against halfway down — the one thing the ribbon exists to provide. |

**The hard rule, learned on this project: motion must never gate content.** Every element's base state is visible; `useReveal()` only ever *adds* a class. The previous system had 28 elements sitting at `opacity: 0` waiting for an IntersectionObserver that did not always fire, which rendered whole sections blank on anchor navigation. Verified after the rebuild: 0 elements start hidden, 0 are clipped before the observer runs.

`lib/useReveal.ts` returns early under `prefers-reduced-motion: reduce` rather than merely shortening the duration — a clip-path wipe is exactly the kind of motion that causes vestibular discomfort, and the content is already in its final state.

## Localization — EN + HU

The site ships in two languages and neither is a translation afterthought. English is the primary buying language (the persona is an expat family with limited Hungarian); Hungarian is what makes the developer credible locally. **Design both, always. A layout that was only checked in English is not finished.**

### Hungarian string length swings both ways

The received wisdom — "localized text expands, leave 30% headroom" — is wrong for Hungarian. It is agglutinative, so it collapses phrases into single compound words as often as it stretches them. Measured in Instrument Sans 17px against real UI strings from this project:

| English | Hungarian | Δ width |
|---------|-----------|---------|
| Underfloor heating | Padlófűtés | **−43%** |
| Price on request | Ár kérésre | −37% |
| Private garden | Saját kert | −36% |
| Book a viewing | Időpontot kérek | +7% |
| Turnkey delivery | Kulcsrakész átadás | +15% |
| Everything included | Minden költséggel együtt | **+28%** |

**Rule:** every component must survive a ±40% swing in both directions. No fixed widths, no `min-width` tuned to one locale, no button padding calibrated on the long string. A CTA that looks balanced at "Underfloor heating" looks stranded at "Padlófűtés" — check the short case, not just the long one.

Long compound words (`Kulcsrakész`, `Hőszivattyús`) will not break on their own. Set `lang="hu"` on the `<html>` element for the HU routes so the browser can hyphenate, and allow `overflow-wrap: break-word` on headings. The `lang` attribute is also what makes screen readers pronounce Hungarian correctly — it is not optional.

### Number, currency and date conventions

One convention per locale. Never mix them, and never let one locale's formatter run on the other's page.

| | English | Hungarian |
|---|---------|-----------|
| Thousands | `240,000,000` | `240 000 000` (non-breaking space) |
| Decimal | `117.45 m²` | `117,45 m²` |
| Currency | `HUF`, before or after per copy | `Ft`, always postfix |
| Anchor price | `From 240,000,000 HUF` | `240 000 000 Ft-tól` |
| Date | `September 2026` | `2026. szeptember` — the period after the year is mandatory |

### Known defects to fix at implementation time

Found by inspection on 2026-08-08. All of these break the bilingual contract:

- **`lib/utils.ts` → `formatPriceHUF`** formats with `Intl.NumberFormat('hu-HU')` (space grouping) but appends the string `' HUF'`. That produces `240 000 000 HUF` — Hungarian grouping with an English currency code, correct in neither locale. It needs to be locale-aware.
- **`lib/utils.ts` → `formatPriceShort`** hardcodes `'M HUF'` regardless of locale.
- **`lib/utils.ts` → `getStatusLabel` and `getGardenSizeLabel`** return hardcoded English (`Available`, `Reserved`, `Sold`, `Compact garden`…). These are shared by both locales, so English leaks onto the Hungarian page.
- **`lib/utils.ts` → `getStatusStyles`** returns default Tailwind palette classes (`bg-green-100 text-green-800`, `bg-yellow-100`, `bg-red-100`). None of those colors exist in this design system. Replace with tokens.
- **`lib/data-hu.ts`** mixes thousands separators inside the same locale: `4.000.000 Ft` and `8.000 Ft/m²` use periods, while `Intl.NumberFormat('hu-HU')` emits spaces. Pick the space and apply it everywhere.
- **Delivery date disagrees across locales.** EN says `Sept 2026` / `September 2026` (`data.ts:205`, `:458`); HU says `2026. ősz` / `2026 ősz` — autumn, not September (`data-hu.ts:81`, `:334`, `:458`). Two of the three HU occurrences are also missing the mandatory period after the year. Decide which is true, then say the same thing in both languages.

### Duplicated component trees

`components/sections/` and `components/sections/hu/` are parallel copies (`Hero.tsx` / `HeroHu.tsx`, `FAQ.tsx` / `FAQHu.tsx`, and so on). Every token change, every anti-pattern removal, and every spacing fix has to land **twice**. When reviewing a change, check both trees before calling it done — a design system applied to only one locale is worse than none, because the two pages drift apart.

## Signature Patterns

### 1. The garden ribbon

Every unit displays its garden as a filled bar proportional to its real area, scaled against the largest garden in the development (B3, 316.84 m² = 100%).

| Unit | Garden | Width |
|------|--------|-------|
| A1 | 201.79 m² | 63.7% |
| A2 | 147.19 m² | 46.5% |
| A3 | 260.01 m² | 82.1% |
| B1 | 185.65 m² | 58.6% |
| B2 | 102.12 m² | 32.2% |
| B3 | 316.84 m² | 100% |

Source of truth for these areas is `lib/data.ts`. If unit data changes, the ribbon widths recompute — never hardcode a width that is not derived from the data.

**The cost of this pattern, stated openly:** it makes B2 visibly the smallest garden. That is accepted — the ribbon's whole value is that it is honest, and a visitor who can see B2 is smallest will trust the number on B3. Do not quietly rescale the bars to flatten the difference; that destroys the credibility the pattern buys. Since no per-unit price is shown (see Pricing Display Rule), the ribbon is a qualifying tool for the sales conversation, not a price justification.

### 2. Measured quantities in mono

Areas, prices, wall thicknesses, dates, room counts — all Geist Mono with tabular figures. This is the "evidence" register, and it is the direct visual answer to the construction-quality objection. Never apply it to a sentence.

### 3. Sharp everything

Zero radius, zero shadow, 1px hairlines. This is what makes the page look unlike every peer in the category, and it speaks the language of the building itself.

## Component Rules

- **Buttons:** One filled button per screen, and it carries `--lawn`. Everything else is a bordered ghost or a quiet underline. Padding 15px/26px, weight 600, radius 0.
- **Inputs:** Bottom rule only, no box. `--line-strong` at rest, `--lawn` on focus. Focus is always visible — never remove the outline without replacing it.
- **Cards:** A card is a hairline rule and a background band, not an elevated rounded surface.
- **Images:** Square corners, no border. Full-bleed wherever the layout allows.
- **Icons:** Sparingly, and never inside a colored circle. Prefer a number or a word.

## Anti-Patterns (do not reintroduce)

These were present in the previous system and are banned:

| Pattern | Was at | Why it is banned |
|---------|--------|------------------|
| Blurred animated orbs | `Hero.tsx:41-44` | SaaS vocabulary, unrelated to architecture |
| Gradient-filled headline | `Hero.tsx:82` | Illegible small, dated, destroys the serif |
| Stacked veil + vignette + noise | `Hero.tsx:47-64` | Four layers doing one layer's job |
| Glassmorphism pills | `Hero.tsx:122-137` | Frosted glass does not exist in this project |
| Pulsing availability dot | `Hero.tsx:71-74` | Manufactured urgency; six units is scarcity enough |
| `rounded-3xl` everywhere | `globals.css:77` | Contradicts the architecture |
| `shimmer` / `float` / `breathe` | `globals.css:159-197` | Motion that communicates nothing |
| Navy `#1B3B6F` | `tailwind.config.ts:30` | Category cliché; clashes with the facades |

Also banned generally: purple or violet gradients, three-column icon grids with icons in colored circles, centered-everything layouts, gradient CTA buttons, `system-ui` as a display or body font, and "Built for X" / "Designed for Y" copy patterns.

### Credibility slop — the kind that actually costs a sale

The buyer's blocking objection is trust. Anything that looks like borrowed or manufactured credibility does more damage here than a plain page ever would, because a family spending €500,000 checks.

- **Brand logo walls must come from the technical spec, and an alternative is not a commitment.** `TrustBar.tsx` currently renders Wienerberger, VEKA, SIEMENS, LEGRAND and **BOSCH**. Bosch appears **zero times** in the PRD — remove it. VEKA and SIEMENS appear only as options (`6-chamber VEKA 82 or Aluplast Neo`, `SIEMENS or HONEYWELL thermostat`), so presenting them as settled is an overstatement. Show only what is contractually committed, or label the alternatives honestly.
- **No stock photography of people.** No smiling agents, no generic happy families, no handshake-over-blueprints. The project has its own renders; if a shot does not exist, the answer is to commission it or leave the section without an image.
- **No manufactured urgency.** No countdown timers, no "only 2 left", no pulsing availability dots, no fake recent-activity notifications. Six units is genuine scarcity — stating the number plainly is stronger than dressing it up, and dressing it up reads as a sales tactic to exactly this buyer.
- **No default Tailwind palette classes.** `bg-green-100`, `text-red-800`, `bg-yellow-100` and friends are not in this system. Every color comes from a token. (`getStatusStyles` in `lib/utils.ts` currently violates this.)
- **No emoji anywhere in the UI**, including in FAQ answers and form confirmations.
- **No testimonials with generic avatars or invented names.** A real named buyer with permission, or nothing.
- **No unverifiable superlatives.** "The most exclusive", "unparalleled quality", "the finest". Every claim on this site should be traceable to the technical spec or to a fact the developer can produce on request.

### The house test

Before shipping any section, ask: *would this element survive a buyer asking "how do you know that?"* If the answer involves the word "well, it's just marketing", it does not ship.

## Pricing Display Rule

Decided 2026-08-08. This overrides the unit prices currently sitting in `lib/data.ts`, `lib/data-hu.ts`, and the PRD's 195–225M range. Those figures are stale.

**One number appears on the site, and only one:**

> **From 240,000,000 HUF — turnkey, landscaping and one parking space included.**
> HU: **240 000 000 Ft-tól — kulcsrakész átadás, teljes kertépítés és 1 saját parkolóhely az árban.**

*(The Hungarian is composed from strings already written by a native speaker in `lib/data-hu.ts` — `Kulcsrakész átadás`, `Teljes kertépítés`, `1 saját parkolóhely`. Have a native speaker confirm the assembled sentence before it ships.)*

- **The qualifier names what is included. It never claims everything is.** Optional extras — a second parking space, solar, irrigation, motorised shutters, the ceiling heating-cooling upgrade — are chargeable on top, so "everything included" would be misleading. Corrected 2026-08-08.
- **The number never appears alone**, in either locale. If a layout has no room for the qualifier, the layout is wrong, not the rule — a bare "from 240,000,000 HUF" invites a comparison against competitors' shell prices and loses it.
- **Where the extras are listed, say plainly that they are on top.** "Optional extras are priced separately" / "A választható extrák külön díjazásúak." Never bury it in a footnote: the buyer who discovers a cost after the fact is the buyer who walks.
- **No per-unit prices anywhere.** Not in the unit comparison, not in the floor plans, not in cards, not in tooltips. Each unit shows **Price on request** / **Ár kérésre**, which is also the CTA hook into the lead form.
- **This is a positioning decision, not a formatting one.** A high turnkey anchor plus price-on-request qualifies the buyer into a conversation instead of letting them self-disqualify on a number. Do not "helpfully" reintroduce a price range, a per-m² figure, or a "from 195M" line.

### Implementation consequence — read before touching the code

Per-unit prices live in `lib/data.ts` and `lib/data-hu.ts`, which are imported by client components (`Pricing.tsx`, `FloorPlans.tsx`, `Card.tsx`, `PriceDisplay.tsx`). **Removing them from the rendered output is not enough** — they ship in the JavaScript bundle and stay readable by anyone who opens devtools. The `price` and `priceEur` fields must come out of the client-side data entirely, not just out of the JSX.

Stale `220M` strings, full list as of 2026-08-08 — the Hungarian side has three, not one:

| File | Line | String |
|------|------|--------|
| `lib/data.ts` | 203 | `'220M HUF'`, label `Starting Price` |
| `lib/data-hu.ts` | 79 | `'220M Ft'`, label `Induló ár` |
| `lib/data-hu.ts` | 451 | `'220 millió Ft-tól'` |
| `lib/data-hu.ts` | 484 | `'Már 220 millió Ft-tól.'` |
| `components/sections/Hero.tsx` | 99 | `220 Million HUF` |
| `components/sections/Pricing.tsx` | 60 | `Starting from` |
| `components/sections/FloorPlans.tsx` | 92 | `Starting from 220 million HUF.` |

`HeroHu.tsx:80` is only a `{/* Starting Price */}` comment marker — the Hungarian hero reads its figure from `data-hu.ts:451`.

### Typographic treatment

The anchor is the one figure allowed at display scale. Set it in Geist Mono with tabular figures, at `h3` size or larger, with the inclusive qualifier in `caption` directly beneath it. It never sits inside a badge, a pill, or a colored container.

## Voice

Typography and colour are defined here. **The words are defined in `Spanyolret_Gardens_Complete_PRD.md → §7.0 Voice`,** and that section is as binding as this file. Read it before writing any user-facing string, in either language.

The short version, because it drives layout decisions too: numbers instead of adjectives, name the objection before the buyer does, no verbs of longing, short sentences, every claim traceable, no manufactured urgency. A design system that specifies a mono font for measured quantities only works if the copy actually contains measured quantities — the two decisions hold each other up.

## Migration status

Applied to the codebase 2026-08-08 over three passes.

**Foundation.** Tokens in `tailwind.config.ts`, `globals.css` rewritten from 470 lines to the system above, Fraunces / Instrument Sans / IBM Plex Mono self-hosted through `next/font`, `lang="hu"` scoped in `app/hu/layout.tsx`, locale-aware formatters in `lib/utils.ts`, copy in both data files, both heroes, the garden ribbon, the pricing anchor, the availability badge, the brand wall.

**Every section, both locales.** Navbar, TrustBar, ProblemSolution, PropertyOverview, Gallery, Benefits, FloorPlans, Pricing, Location, Developer, Specs, Process, FAQ, LeadForm, Footer. All on the grid-and-hairline rhythm: no centred stacks, no icons in circles, no pill badges, no tabs hiding evidence.

**Removed entirely.** `InteractiveSelector`, `InteractiveSelectorHu`, `demo.tsx` and the `react-icons` dependency they pulled in. `@studio-freight/lenis` — installed, never imported, pure bundle weight. 17 decorative orb and noise divs.

**Colour tokens are CSS variables, not literals.** `paper: 'rgb(var(--paper-rgb) / <alpha-value>)'` and so on. With hex literals in the Tailwind config, `bg-paper` compiled to a fixed colour and only the hand-written rules flipped in dark mode — a half-applied dark mode, which is worse than none. The RGB-triplet form is what keeps `border-paper/20` working.

**`onmedia` never flips.** Text and rules laid over photography or the anthracite band use `text-onmedia`, not `text-paper`. `--frame` is dark in both themes and a photo is a photo in both, so using the page-background token there inverted the hero headline to near-black on a bright drone shot.

**Accessibility.** Every control in `components/ui/Input.tsx` now ties label to field with `useId`, marks failures with `aria-invalid`, points at the message with `aria-describedby`, and announces it with `role="alert"`. Before this, not one input on the page had an associated label. Caption-styled controls get a 44px hit area via `.tab-link` — the label looks 12px tall, the target underneath is finger-sized.

**Deprecated aliases** (`primary`, `secondary`, `accent`, `facade`, `anthracite`) remain in the Tailwind config for the last stragglers. Replace as you touch each file, then delete the block.

### Hero media, and the biggest performance decision on the site

`components/ui/HeroMedia.tsx`. Measured on a production build, the hero video was **3,788 kB of a 4,479 kB page** — 85% of everything, downloaded on every visit including the phone at nine in the evening, which is exactly when this buyer browses.

- The **poster is always rendered** and is what the server sends, so it is the LCP candidate and first paint never waits on video.
- The **video mounts only above 900px**, only after hydration, and only when `prefers-reduced-motion` is not set and `Save-Data` is off. Verified: on a 375px viewport the `.mp4` is never requested.
- `preload="none"` — the poster does the work.

**The source video carried a `Veo` watermark** in the bottom-right, baked in by the generator, on both the shipped file and the 24 MB "original". Removed by cropping `1760×990` from the top-left (16:9 exact, so no distortion) and rescaling to 1920×1080, rather than by `delogo` — a crop leaves no smear. Verified clean at four timestamps across the clip. The file was also renamed from `Hero Spanyloret.mp4` to `hero.mp4`: the old name had a space (URL-encoded on every request) and a typo.

The poster is now generated from the cleaned video's own first frame, so it matches what plays instead of being an unrelated still.

**Fraunces ships only the `opsz` axis.** `SOFT` and `WONK` were requested and then immediately pinned to 0 in CSS — which is Fraunces' own default — so both axes were pure download weight.

### Measured

| | Before | After |
|---|---|---|
| `/` page weight | 17.4 kB | 9.97 kB |
| `/hu` page weight | 21.5 kB | 17.5 kB |
| First Load JS | 282 kB | 235 kB |
| Document height | 44,539 px | 16,025 px |
| Elements hidden at load | 28 | 0 |
| Unlabelled form controls | 9 | 0 |
| Tap targets under 40px (mobile) | 17 | 2 |
| Hero video weight on mobile | 3,788 kB | 0 kB (never requested) |
| Font transfer | 300 kB | 201 kB |
| CLS | — | 0 |
| Watermarked assets | 1 | 0 |

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-08-08 | Initial design system created | `/design-consultation`, grounded in the PRD, the project renders, and visual research on Cordia, Dorottya Residences and MyBudapestHome |
| 2026-08-08 | Memorable thing: the private garden | Only genuinely rare differentiator (102–317 m²); answers the strongest pain point in the PRD |
| 2026-08-08 | Retired navy `#1B3B6F` as primary | Category cliché and it clashes with the warm facades in every render |
| 2026-08-08 | Fraunces / Instrument Sans / Geist Mono | Escapes the Inter + Outfit default; `latin-ext` coverage verified for Hungarian ő and ű |
| 2026-08-08 | Radius 0, zero shadow | The architecture is rectilinear; bubbly corners were the loudest slop signal in the previous system |
| 2026-08-08 | Garden ribbon drawn to scale | Makes the memorable thing measurable instead of asserted |
| 2026-08-08 | Single anchor price: 240,000,000 HUF, turnkey | Set by the client. Covers turnkey delivery, landscaping and one parking space — the qualifier is mandatory wherever the number appears |
| 2026-08-08 | Corrected: "everything included" → the precise qualifier | Optional extras are chargeable on top, so the blanket claim was misleading. The qualifier now names what is covered and the extras list says plainly that it is not |
| 2026-08-08 | No per-unit prices anywhere; "Price on request" | Qualifies the buyer into a conversation instead of letting them self-disqualify on a number. Supersedes the 195–225M range in the PRD and in `lib/data.ts` |
| 2026-08-08 | Two-line headlines use line-height 1.12, both locales | Measured 3.73px ink clearance at 1.02 vs 9.97px at 1.12. English ascent (38.64px) is taller than Hungarian (36.56px), so this is a leading problem, not a diacritics problem |
| 2026-08-08 | Components must survive ±40% string-length swing | Measured on real strings: Hungarian ranges from −43% to +28% against English. "Leave room for expansion" is the wrong rule — it also contracts hard |
| 2026-08-08 | Remove BOSCH from the brand wall | Appears zero times in the PRD. VEKA and SIEMENS appear only as "or" alternatives and must not be shown as commitments |
| 2026-08-08 | PRD aligned to the 240M anchor; §7 Copy Bank rewritten | Prices, dates, meta description and JSON-LD all carried the stale 195–225M range. Copy voice now lives in PRD §7.0 and is binding alongside this file |
| 2026-08-08 | Veo watermark removed by crop, not delogo | A crop leaves no smear. 1760×990 from the top-left is 16:9 exact, so the rescale does not distort |
| 2026-08-08 | Video is desktop-only | 85% of page weight, on a page whose buyer browses on a phone in the evening. The poster carries mobile |
| 2026-08-08 | Material motion layer added | Mask reveals, plan unroll, sticky ribbon scale. Motion that behaves like matter reinforces the document thesis; motion that decorates fights it |
| 2026-08-08 | Motion may never gate content | 28 elements were stuck at opacity 0 behind an observer that did not always fire. Base state is now always visible; the animation class is only ever added |
| 2026-08-08 | Dark mode implemented, Lenis removed | The dark palette was specified with measured ratios and used by nothing — spec that reads as implemented. Lenis was installed and never imported |
| 2026-08-08 | Geist Mono → IBM Plex Mono | Geist Mono is absent from Next 14.2.15's font list; IBM Plex Mono self-hosts through `next/font`, ships `latin-ext`, and reads as a technical face rather than a coding one |
| 2026-08-08 | Deprecated colour aliases during migration | ~500 references across 41 files in two locales. Remapping beats a flag day; the alias block is deleted once the last file is converted |
| 2026-08-08 | Retired colours apply to UI tokens only | `PRD §8.3` legitimately uses the sky blues and gold as a render brief. Conflating the two lists is how navy became a brand colour |

