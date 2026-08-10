import type { Config } from 'tailwindcss';

// Tokens come from DESIGN.md. Do not add a colour here that is not in that file.
// The retired palette (navy #1B3B6F, brand green #4A7C23, sky #87CEEB, gold
// #FFD700) still lives in PRD §8.3 as a *render brief* — that is a different
// list with a different job, and it stays there.
const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                /* Every token points at a CSS variable rather than a literal, so
                 * dark mode actually reaches the Tailwind utilities. With hex
                 * literals here, `bg-paper` compiled to a fixed colour and only
                 * the hand-written CSS rules flipped — a half-applied dark mode,
                 * which is worse than none.
                 *
                 * The `<alpha-value>` placeholder is what keeps the opacity
                 * modifiers working: `border-paper/20` still resolves. That is
                 * why the variables are RGB triplets and not hex.
                 */
                paper: {
                    DEFAULT: 'rgb(var(--paper-rgb) / <alpha-value>)',
                    deep: 'rgb(var(--paper-deep-rgb) / <alpha-value>)',
                },
                ink: {
                    DEFAULT: 'rgb(var(--ink-rgb) / <alpha-value>)',
                    soft: 'rgb(var(--ink-soft-rgb) / <alpha-value>)',
                },
                frame: 'rgb(var(--frame-rgb) / <alpha-value>)',
                lawn: {
                    DEFAULT: 'rgb(var(--lawn-rgb) / <alpha-value>)',
                    deep: 'rgb(var(--lawn-deep-rgb) / <alpha-value>)',
                    inv: '#8FBB78',
                },
                clay: {
                    DEFAULT: 'rgb(var(--clay-rgb) / <alpha-value>)',
                    inv: '#C9A382',
                },
                line: 'var(--line)',
                /* Always light, in both themes. For text and rules laid over
                 * photography or the anthracite band — neither of which becomes
                 * lighter in dark mode, so this token must not flip. */
                onmedia: 'rgb(var(--on-frame-rgb) / <alpha-value>)',

                // Semantic. Verified against #F6F4EF (light) and #1C1F22 (dark).
                ok: { DEFAULT: '#3F6B2E', inv: '#8FBB78' },
                warn: { DEFAULT: '#8A6A1F', inv: '#D4B15E' },
                bad: { DEFAULT: '#8C3A2E', inv: '#E0866F' },
                info: { DEFAULT: '#35566B', inv: '#8FB4CC' },

                /* ---- DEPRECATED ALIASES — migration only -------------------
                 * Remapped onto the real tokens so the remaining references stay
                 * correct. Replace as you touch each file, then delete this.
                 *   primary → frame · secondary → lawn · accent → clay
                 *   facade  → paper · anthracite → ink
                 */
                primary: 'rgb(var(--frame-rgb) / <alpha-value>)',
                secondary: 'rgb(var(--lawn-rgb) / <alpha-value>)',
                accent: 'rgb(var(--clay-rgb) / <alpha-value>)',
                facade: 'rgb(var(--paper-rgb) / <alpha-value>)',
                anthracite: 'rgb(var(--ink-rgb) / <alpha-value>)',
            },
            fontFamily: {
                // Loaded via next/font in app/layout.tsx. All three serve the
                // latin-ext subset — required for Hungarian ő and ű.
                display: ['var(--font-display)', 'Georgia', 'serif'],
                sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
                mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
            },
            borderRadius: {
                // DESIGN.md: radius is 0 everywhere, no exceptions. Tailwind's
                // defaults are overridden rather than extended so that a stray
                // `rounded-xl` in a component fails loudly instead of quietly
                // reintroducing the bubbly look.
                none: '0',
                DEFAULT: '0',
                sm: '0',
                md: '0',
                lg: '0',
                xl: '0',
                '2xl': '0',
                '3xl': '0',
                full: '0',
            },
            boxShadow: {
                // No elevation in this system. Depth comes from full-bleed
                // imagery against paper, and from 1px hairlines.
                none: 'none',
                DEFAULT: 'none',
                sm: 'none',
                md: 'none',
                lg: 'none',
                xl: 'none',
                '2xl': 'none',
                inner: 'none',
            },
            spacing: {
                // 8px base. Section rhythm lives here so it stops being ad hoc.
                section: '6rem',      // 96px desktop
                'section-sm': '3.5rem', // 56px below 640px
            },
            maxWidth: {
                content: '1180px',
            },
            transitionTimingFunction: {
                enter: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
            },
            transitionDuration: {
                micro: '80ms',
                short: '140ms',
                medium: '260ms',
                long: '420ms',
            },
            keyframes: {
                // The only entrance animation in the system.
                rise: {
                    from: { opacity: '0', transform: 'translateY(12px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                rise: 'rise 420ms cubic-bezier(0.22, 0.61, 0.36, 1) both',
            },
        },
    },
    plugins: [],
};

export default config;
