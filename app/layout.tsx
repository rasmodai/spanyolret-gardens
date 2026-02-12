import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
    title: 'Spanyolrét Gardens | Premium Townhouses with Private Gardens | Budapest',
    description: '6 exclusive new-build townhouses in Budapest XI. 117m² living space + up to 317m² private garden. Heat pump, underfloor heating, premium materials. From €480K. Delivery Sept 2026.',
    keywords: 'new build townhouse Budapest, townhouse with garden Budapest, family home Budapest, expat property Budapest, property for sale XI district',
    openGraph: {
        title: 'Spanyolrét Gardens | Premium Townhouses with Private Gardens | Budapest',
        description: '6 exclusive new-build townhouses in Budapest XI. 117m² living space + up to 317m² private garden.',
        type: 'website',
        locale: 'en_US',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                {/* Preload hero video for faster playback */}
                <link
                    rel="preload"
                    href="/assets/renders/Hero Spanyloret.mp4"
                    as="video"
                    type="video/mp4"
                />
                {/* Preload poster image */}
                <link
                    rel="preload"
                    href="/assets/renders/Garden at Midday.webp"
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
                {children}
            </body>
        </html>
    );
}
