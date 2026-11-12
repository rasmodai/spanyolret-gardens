'use client';

import { OPEN_MESSAGE_EVENT } from '@/lib/lead/message';
import { track } from '@/lib/mixpanel';

interface CtaBandProps {
    id: string;
    title: string;
    text: string;
    primary: string;
    message: string;
    /** A messaging number is set: the second button opens the message form. */
    messaging: boolean;
}

/* A short way back to the form, between the long sections. One filled button,
 * the other outlined, as everywhere on the page. */
export default function CtaBand({ id, title, text, primary, message, messaging }: CtaBandProps) {
    return (
        <aside aria-label={title} className="border-y border-line bg-paper-deep">
            <div className="section-container flex flex-col gap-5 py-10 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="font-display text-[1.75rem] leading-tight text-ink">{title}</p>
                    <p className="mt-2 max-w-[56ch] text-ink-soft">{text}</p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-3">
                    <a href="#lead-form" className="btn btn-primary" onClick={() => track('CTA Band', { band: id, action: 'form' })}>
                        {primary}
                    </a>
                    {messaging && (
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={() => {
                                track('CTA Band', { band: id, action: 'message' });
                                window.dispatchEvent(new CustomEvent(OPEN_MESSAGE_EVENT));
                            }}
                        >
                            {message}
                        </button>
                    )}
                </div>
            </div>
        </aside>
    );
}
