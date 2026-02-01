import type { Metadata } from 'next';
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
                {children}
            </body>
        </html>
    );
}
