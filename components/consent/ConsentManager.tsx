'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { OPEN_SETTINGS_EVENT, useConsent, writeConsent, type ConsentChoice } from '@/lib/consent';
import { metaPixelId, privacyPath } from '@/lib/site';

const COPY = {
    en: {
        ariaLabel: 'Cookie choice',
        text: 'With your agreement, this site uses the Meta Pixel to measure our advertising, and shows the Google Maps map directly. Both store cookies or similar data in your browser, and if you then send the form, Meta also receives a hashed (unreadable) form of your contact details to count it. If you refuse, nothing is loaded or sent and the site works exactly the same.',
        accept: 'Accept',
        refuse: 'Refuse',
        privacyLink: 'Privacy policy',
    },
    hu: {
        ariaLabel: 'Sütik kezelése',
        text: 'Hozzájárulásod esetén az oldal a Meta Pixelt használja hirdetéseink méréséhez, a térképet pedig közvetlenül a Google Térképről jeleníti meg. Ezek sütiket vagy hasonló azonosítókat tárolnak a böngésződben, és ha ezután elküldöd az űrlapot, a Meta az elérhetőségeid hash (olvashatatlan) formáját is megkapja a méréshez. Ha elutasítod, semmi sem töltődik be és semmit sem küldünk el, az oldal pedig ugyanúgy működik.',
        accept: 'Elfogadom',
        refuse: 'Elutasítom',
        privacyLink: 'Adatkezelési tájékoztató',
    },
};

/* The cookie banner, and the only place the Meta Pixel is loaded: after
 * "Accept", never before. Both answers carry the same weight, and the site
 * works the same either way. */
export default function ConsentManager() {
    const pathname = usePathname() ?? '/';
    const locale = pathname === '/hu' || pathname.startsWith('/hu/') ? 'hu' : 'en';
    const text = COPY[locale];
    const consent = useConsent();
    const [settingsOpen, setSettingsOpen] = useState(false);

    useEffect(() => {
        const open = () => setSettingsOpen(true);
        window.addEventListener(OPEN_SETTINGS_EVENT, open);
        return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
    }, []);

    const choose = (choice: ConsentChoice) => {
        writeConsent(choice);
        setSettingsOpen(false);
        if (typeof window.fbq === 'function') window.fbq('consent', choice === 'accepted' ? 'grant' : 'revoke');
    };

    const showBanner = consent === 'unset' || (settingsOpen && consent !== 'pending');

    return (
        <>
            {consent === 'accepted' && (
                <Script id="meta-pixel" strategy="afterInteractive">
                    {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
                </Script>
            )}

            {showBanner && (
                <section
                    aria-label={text.ariaLabel}
                    lang={locale}
                    className="fixed inset-x-0 bottom-0 z-[60] border-t border-[color:var(--line-strong)] bg-paper text-ink"
                >
                    <div className="section-container flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between md:gap-8">
                        <p className="max-w-[72ch] text-sm leading-relaxed">
                            {text.text}{' '}
                            <a href={privacyPath[locale]} className="underline">{text.privacyLink}</a>
                        </p>
                        <div className="flex shrink-0 gap-3">
                            <button type="button" onClick={() => choose('refused')} className="btn btn-ghost flex-1 md:flex-none">
                                {text.refuse}
                            </button>
                            <button type="button" onClick={() => choose('accepted')} className="btn btn-ghost flex-1 md:flex-none">
                                {text.accept}
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
