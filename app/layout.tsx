import type { Metadata } from 'next';
import { Fraunces, Instrument_Sans, IBM_Plex_Mono } from 'next/font/google';
import MixpanelTracker from '@/components/MixpanelTracker';
import ConsentManager from '@/components/consent/ConsentManager';
import { validPixelId } from '@/lib/lead/meta-capi';
import { rootMetadata } from '@/lib/metadata';
import './globals.css';

/* Fonts — see DESIGN.md → Typography.
 *
 * `latin-ext` is not optional: it carries ő (U+0151) and ű (U+0171), and the
 * Hungarian routes break silently without it. Any substitution must be
 * re-checked against that subset before it ships.
 *
 * Fraunces ships only the `opsz` axis. Its wobble (WONK) and softness (SOFT)
 * default to 0, which is what this design wants, so requesting those axes only
 * added download weight.
 */
const display = Fraunces({
    subsets: ['latin', 'latin-ext'],
    // Only `opsz` is shipped. SOFT and WONK were requested and then immediately
    // pinned to 0 in globals.css — which is Fraunces' own default — so the two
    // axes were pure weight. Dropping them changes nothing visually and cuts
    // the largest font file on the page.
    axes: ['opsz'],
    display: 'swap',
    variable: '--font-display',
});

const body = Instrument_Sans({
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
    variable: '--font-body',
});

/* Measured quantities only — areas, prices, wall thicknesses, dates.
 * DESIGN.md specified Geist Mono, which is absent from Next 14.2.15's font
 * list; IBM Plex Mono is self-hosted through next/font, ships latin-ext, and
 * reads as a technical annotation rather than a code editor. */
const mono = IBM_Plex_Mono({
    subsets: ['latin', 'latin-ext'],
    weight: ['400', '500'],
    display: 'swap',
    variable: '--font-mono',
});

/* The Meta Pixel id comes from the environment, never from the code (public
 * repo). The Pixel loads only after cookie consent: see ConsentManager. */
const pixelId = validPixelId(process.env.NEXT_PUBLIC_META_PIXEL_ID);

export const metadata: Metadata = rootMetadata();

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    /* `data-scroll-behavior` is required from Next 16: it no longer neutralises
     * `scroll-behavior: smooth` during route transitions on its own. globals.css
     * sets smooth scrolling on <html> for the in-page anchors, so without this
     * attribute an EN <-> HU navigation would animate its way to the top instead
     * of arriving there. */
    return (
        <html
            lang="en"
            data-scroll-behavior="smooth"
            className={`${display.variable} ${body.variable} ${mono.variable}`}
        >
            <head>
                {/* Applied before first paint. Without this the page renders in
                  * the system theme and then snaps to the stored one on
                  * hydration — a flash on every load for anyone who has set a
                  * preference. */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var t=localStorage.getItem('spanyolret-theme');if(t){document.documentElement.setAttribute('data-theme',t)}}catch(e){}})()`,
                    }}
                />
                {/* Preload poster image */}
                <link
                    rel="preload"
                    href="/assets/renders/hero-poster.webp"
                    as="image"
                />
            </head>
            <body className="antialiased">
                {/* Meta Pixel: loaded by the consent banner, only after "Accept". */}
                <ConsentManager pixelId={pixelId} />
                <MixpanelTracker />
                {children}
            </body>
        </html>
    );
}
