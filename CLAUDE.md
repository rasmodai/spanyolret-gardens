
---

## Error Prevention Rules

These rules apply to ALL work in this project. They override default behavior.

### 1. Never Fabricate Information
- **NEVER guess** names, titles, roles, emails, phone numbers, URLs — ASK instead
- **NEVER invent** statistics, revenue figures, dates, or any factual claim
- **NEVER hallucinate** API endpoints, parameters, or response formats — check docs first
- **NEVER fill in** template fields with plausible-sounding fiction
- **NEVER cite** sources without verifying they exist
- If uncertain about ANY factual detail, **stop and ask the user**

### 2. Read Before Acting
- **ALWAYS read** files before editing them — never assume contents
- **ALWAYS check** CLAUDE.md, memory files, and prior instructions before starting work
- **ALWAYS review** git history and existing code before writing new code
- **ALWAYS read** error messages carefully before attempting fixes
- **ALWAYS check** project structure (ls/glob) instead of assuming paths
- **ALWAYS review** what was already said earlier in the conversation

### 3. Stay in Scope
- Do **ONLY** what was asked — nothing more
- **NEVER add** features, refactors, or "improvements" beyond the request
- **NEVER add** comments, docstrings, or type annotations to untouched code
- **NEVER create** abstractions or utilities for one-time operations
- **NEVER build** for hypothetical future requirements
- If the scope feels large, **confirm with the user** before starting

### 4. Ask When Uncertain
- **ASK** instead of assuming intent when a request is ambiguous
- **ASK** who the audience is before creating deliverables
- **ASK** about tone, language, and format when not obvious from context
- **CONFIRM** scope before starting multi-step or large tasks
- **CHECK BACK** mid-task on complex work rather than guessing at decision points
- **FLAG** trade-offs and alternatives instead of silently picking one approach

### 5. Validate Outputs
- **ALWAYS verify** generated files render, compile, or work correctly
- **ALWAYS use** exact numbers when they're available — never approximate
- **ALWAYS double-check** entity references — right company, right person, right project
- **ALWAYS scan** for copy-paste errors, leftover placeholders, and truncated outputs
- **ALWAYS verify** names, especially non-English names with diacritics
- **ALWAYS check** formatting consistency within documents

### 6. Communicate Precisely
- **NEVER summarize** what you just did when the user can see it
- **NEVER add** unsolicited disclaimers, caveats, or "note that..." commentary
- **BE BRIEF** when brevity is needed, detailed when detail is needed
- **MATCH** the register — don't be formal when casual is right, or vice versa
- **NEVER explain** things the user already knows
- **NEVER give** opinions when asked for facts

### 7. Maintain Context
- **NEVER forget** corrections made earlier in the conversation
- **NEVER repeat** the same mistake after being corrected
- **ALWAYS connect** current task to broader project goals
- **ALWAYS remember** constraints the user set (budgets, exclusions, limits)
- **ALWAYS reference** previous deliverables when building on them
- **TRACK** which files were already modified in this session

### 8. Exercise Good Judgment
- **PAUSE to think** when rushing would cause errors
- **NEVER take** destructive actions without confirming
- **FLAG** when something looks wrong in source data
- **CHOOSE** the simple solution over the complex one
- **USE** the right language for the audience (don't default to English)
- **TREAT** risky operations with more care than routine ones

### 9. Write Sound Code
- **NEVER introduce** security vulnerabilities (injection, XSS, exposed secrets)
- **NEVER hardcode** values that should come from config or environment variables
- **NEVER break** existing functionality while adding new features
- **ALWAYS test** edge cases and error paths
- **NEVER use** deprecated APIs or outdated patterns without flagging it
- **ALWAYS create** files in the correct location — verify with ls first

### 10. Follow Good Process
- **SAVE** important context to memory for future sessions
- **UPDATE** plans when approach changes mid-task
- **COMMIT** at natural checkpoints rather than at the end
- **PARALLELIZE** independent work, but keep dependent work sequential
- **CLEAN UP** temp files, debug logs, and test artifacts
- **VERIFY** the final result before declaring done

---

## Design System

Always read DESIGN.md before making any visual or UI decision.
All font choices, colors, spacing, radius, motion, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match DESIGN.md.

Project-specific hard rules from DESIGN.md:
- **Border radius is `0`.** No rounded corners anywhere, including buttons, inputs, cards, and images.
- **No `box-shadow`.** Depth comes from full-bleed imagery and 1px hairlines.
- **One accent only:** `--lawn` `#3F6B2E`. The retired navy `#1B3B6F` must not reappear.
- **Any measured quantity** (m², HUF, cm, dates) is set in Geist Mono with tabular figures.
- **Fonts must serve the `latin-ext` subset** — the HU locale needs `ő` and `ű` and breaks silently otherwise.
- Garden ribbon widths are derived from `lib/data.ts`, never hardcoded.
- **Pricing:** one number only, `242,050,000 HUF` / `242 050 000 Ft`, and it **never appears without its qualifier** — "turnkey, landscaping and one parking space included" / "kulcsrakész átadás, teljes kertépítés és 1 saját parkolóhely az árban". Do **not** write "everything included": the optional extras are chargeable on top. **Never display a per-unit price** — each unit shows "Price on request" / "Ár kérésre". The `price` / `priceEur` fields must not reach the client bundle, and JSON-LD must declare `minPrice` only. The 195–225M range in the PRD and in `lib/data.ts` is stale.

### Bilingual (EN + HU) — non-negotiable

- **Every change lands in both locales.** `components/sections/` and `components/sections/hu/` are parallel trees. A fix applied to one is not done.
- **Components must survive a ±40% string-length swing.** Hungarian measured from −43% (`Padlófűtés` vs `Underfloor heating`) to +28%. No fixed widths, no padding tuned to one locale. Check the *short* case too.
- **Two-line headlines use `line-height: 1.12`** in both languages. 1.02 is single-line only — it leaves 3.73px of ink clearance, and English ascenders are taller than Hungarian ones, so this is not a HU-only fix.
- **Formatting per locale, never mixed:** EN `242,050,000 HUF` / `117.45 m²` / `September 2026`. HU `242 050 000 Ft` / `117,45 m²` / `2026. szeptember` (the period after the year is mandatory).
- `lang="hu"` on the HU routes — required for hyphenation of compound words and for screen readers.

### Anti-slop — the credibility rules

- **No brand logo unless it is committed in the technical spec.** BOSCH is not in the PRD and must not appear. VEKA and SIEMENS are listed as "or" alternatives — do not present them as settled.
- **No stock photography of people.** Project renders only.
- **No manufactured urgency:** no countdowns, no "only N left", no pulsing dots, no fake activity feeds.
- **No default Tailwind palette classes** (`bg-green-100`, `text-red-800`…). Every color from a token.
- **No emoji in the UI. No invented testimonials. No unverifiable superlatives.**
- **The house test:** if a buyer asked "how do you know that?", could you answer without saying "it's just marketing"? If not, it does not ship.
