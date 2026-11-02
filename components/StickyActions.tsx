'use client';

import { useEffect, useState } from 'react';
import { OPEN_MESSAGE_EVENT } from '@/lib/lead-message';
import { track } from '@/lib/mixpanel';
import { whatsappDigits } from '@/lib/site';

const COPY = {
    en: { label: 'Quick actions', viewing: 'Book a viewing', message: 'Message' },
    hu: { label: 'Gyors műveletek', viewing: 'Időpontot kérek', message: 'Üzenet' },
};

/* Phones only: two actions within thumb reach, once the hero is past, and out
 * of the way while the form itself is on screen. */
export default function StickyActions({ locale }: { locale: 'en' | 'hu' }) {
    const [visible, setVisible] = useState(false);
    const t = COPY[locale];

    useEffect(() => {
        const update = () => {
            const form = document.getElementById('lead-form')?.getBoundingClientRect();
            const formOnScreen = !!form && form.top < window.innerHeight && form.bottom > 0;
            setVisible(window.scrollY > window.innerHeight * 0.9 && !formOnScreen);
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, []);

    const open = (from: string) => {
        track('Sticky Action', { action: from, language: locale });
        window.dispatchEvent(new CustomEvent(OPEN_MESSAGE_EVENT));
    };

    return (
        <nav
            aria-label={t.label}
            aria-hidden={!visible}
            className={`fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-paper p-2 transition-transform duration-medium md:hidden ${
                visible ? 'translate-y-0' : 'pointer-events-none translate-y-full'
            }`}
        >
            <button type="button" tabIndex={visible ? 0 : -1} onClick={() => open('viewing')} className="btn btn-primary flex-1 !px-3">
                {t.viewing}
            </button>
            {whatsappDigits && (
                <button type="button" tabIndex={visible ? 0 : -1} onClick={() => open('message')} className="btn btn-ghost !px-4">
                    {t.message}
                </button>
            )}
        </nav>
    );
}
