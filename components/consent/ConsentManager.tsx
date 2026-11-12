'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { OPEN_SETTINGS_EVENT, useConsent, writeConsent, type ConsentChoice } from '@/lib/consent';
import { stopTracking, track } from '@/lib/mixpanel';
import { consentCopy } from '@/lib/consent-copy';
import { projectConfig } from '@/lib/project-config';

/* The cookie banner, and the only place the Meta Pixel is loaded: after
 * "Accept", never before. Mixpanel reads the same choice (lib/mixpanel.ts).
 * Both answers carry the same weight, and the site works the same either way. */
export default function ConsentManager({ pixelId }: { pixelId: string | null }) {
    const pathname = usePathname() ?? '/';
    const locale = pathname === '/hu' || pathname.startsWith('/hu/') ? 'hu' : 'en';
    const text = consentCopy[locale];
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
        if (choice === 'refused') {
            stopTracking();
            if (typeof window.fbq === 'function') window.fbq('consent', 'revoke');
        } else {
            if (typeof window.fbq === 'function') window.fbq('consent', 'grant');
            // Only the acceptance can be counted: a refusal sends nothing.
            track('Consent Accepted', { from: settingsOpen ? 'settings' : 'banner' });
        }
    };

    const showBanner = consent === 'unset' || (settingsOpen && consent !== 'pending');

    return (
        <>
            {pixelId && consent === 'accepted' && (
                <Script id="meta-pixel" strategy="afterInteractive">
                    {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`}
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
                            <a href={projectConfig.privacyPath[locale]} className="underline">{text.privacyLink}</a>
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
