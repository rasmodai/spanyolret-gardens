'use client';

import { useState } from 'react';
import { useConsent } from '@/lib/consent';
import { track } from '@/lib/mixpanel';

const COPY = {
    en: {
        show: 'Show the map',
        note: 'The map is served by Google Maps, which may set its own cookies. It loads only when you click, or if you accepted cookies.',
    },
    hu: {
        show: 'Térkép megjelenítése',
        note: 'A térképet a Google Térkép szolgáltatja, amely saját sütiket helyezhet el. Csak kattintásra töltődik be, vagy ha elfogadtad a sütiket.',
    },
};

/* Google Maps sets its own cookies, so the iframe loads only after accepted
 * cookies or a click. Until then, a plain hairline grid (decorative, not a map). */
export default function MapEmbed({ src, title, locale }: { src: string; title: string; locale: 'en' | 'hu' }) {
    const consent = useConsent();
    const [clicked, setClicked] = useState(false);
    const text = COPY[locale];

    if (clicked || consent === 'accepted') {
        return (
            <iframe
                src={src}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title={title}
                className="h-full w-full"
            />
        );
    }
    return (
        <div
            className="flex h-full w-full flex-col items-center justify-center gap-5 px-6 text-center"
            style={{
                backgroundColor: 'var(--paper-deep)',
                backgroundImage: 'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
            }}
        >
            <svg aria-hidden="true" viewBox="0 0 24 32" width="26" height="34" fill="none">
                <path d="M12 31s10-11.2 10-19A10 10 0 0 0 2 12c0 7.8 10 19 10 19Z" fill="var(--lawn)" />
                <circle cx="12" cy="12" r="3.6" fill="var(--paper)" />
            </svg>
            <button
                type="button"
                className="btn btn-ghost bg-paper"
                onClick={() => {
                    setClicked(true);
                    track('Map Shown', { language: locale });
                }}
            >
                {text.show}
            </button>
            <p className="max-w-[44ch] text-xs leading-relaxed text-ink-soft">{text.note}</p>
        </div>
    );
}
