import type { Metadata } from 'next';
import Script from 'next/script';
import { Fraunces, Instrument_Sans, IBM_Plex_Mono } from 'next/font/google';
import MixpanelTracker from '@/components/MixpanelTracker';
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

export const metadata: Metadata = {
    title: 'Spanyolrét Gardens | Townhouses with 102–317 m² private gardens | Budapest XI.',
    /* No price here. The anchor may not appear without its qualifier, and since
     * 2026-08-21 that qualifier includes the 30 September deposit deadline —
     * which does not fit a description Google truncates near 160 characters.
     * DESIGN.md: if the layout has no room for the qualifier, the layout is
     * wrong, not the rule. The number lives on the page, where it has room. */
    description:
        "Six new-build townhouses in Budapest's XI. District. Five rooms, 117 m² inside, and a private garden of 102 to 317 m² — not a balcony. Keys September 2026.",
    keywords:
        'new build townhouse Budapest, townhouse with garden Budapest, family home Budapest, expat property Budapest, property for sale XI district',
    openGraph: {
        title: 'A real garden. Not a balcony. | Spanyolrét Gardens',
        description:
            'Six townhouses in Budapest XI. Private gardens from 102 to 317 m². Turnkey, landscaping and one parking space included. Keys September 2026.',
        type: 'website',
        locale: 'en_US',
    },
};

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
                {/* Meta Pixel */}
                <Script id="meta-pixel" strategy="afterInteractive">
                    {`
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '886458420654697');
                        fbq('track', 'PageView');
                    `}
                </Script>
                <noscript>
                    <img
                        height="1"
                        width="1"
                        style={{ display: 'none' }}
                        src="https://www.facebook.com/tr?id=886458420654697&ev=PageView&noscript=1"
                        alt=""
                    />
                </noscript>
                <MixpanelTracker />
                {children}
            </body>
        </html>
    );
}
