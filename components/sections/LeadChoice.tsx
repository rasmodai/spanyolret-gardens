'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import type { FormChoiceCopy } from '@/lib/copy/types';
import { OPEN_MESSAGE_EVENT } from '@/lib/lead/message';
import { track } from '@/lib/mixpanel';

/* The start of the form section is a choice, not a form: call the builder (a
 * plain tel: link, the number written out for desktop visitors), or ask for
 * information, which unfolds the lead form. The form stays mounted while
 * folded, so nothing typed is lost. The message buttons (a house sheet, the
 * sticky bar's Üzenet, a band's message button) open it directly; the plain
 * #lead-form links land on the choice, by design (Rémi, 13/11). Without
 * JavaScript the form is shown (see the <noscript> rule) and the call link
 * works as it is. */
export default function LeadChoice({
    copy,
    phone,
    messaging,
    lang,
    children,
}: {
    copy: FormChoiceCopy;
    /** The number as written in the config (callNumber); null removes the call choice. */
    phone: string | null;
    /** A messaging number is set: the information choice describes the written message. */
    messaging: boolean;
    lang: 'en' | 'hu';
    /** The existing lead form, unchanged. */
    children: ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const panel = useRef<HTMLDivElement>(null);
    const panelId = useId();

    useEffect(() => {
        const openIt = () => setOpen(true);
        window.addEventListener(OPEN_MESSAGE_EVENT, openIt);
        return () => window.removeEventListener(OPEN_MESSAGE_EVENT, openIt);
    }, []);

    const toggle = () => {
        const next = !open;
        setOpen(next);
        if (!next) return;
        track('Form Choice', { choice: 'info', language: lang });
        // The panel turns visible in the same frame it opens, so it can take focus.
        requestAnimationFrame(() => {
            panel.current?.querySelector<HTMLElement>('select, input:not([tabindex="-1"]), textarea')?.focus();
        });
    };

    const callHref = phone ? `tel:${phone.replace(/\s/g, '')}` : null;

    return (
        <div>
            {callHref && phone && (
                <>
                    <p className="field-label">{copy.prompt}</p>
                    <div className="grid gap-3">
                        <a
                            href={callHref}
                            className="choice-card"
                            onClick={() => track('House Enquiry Clicked', { house: 'any', channel: 'phone' })}
                        >
                            <span className="choice-title">{copy.callTitle}</span>
                            <span className="choice-detail">
                                <span className="choice-number">{phone}</span> · {copy.callWho}
                            </span>
                        </a>
                        <button
                            type="button"
                            className="choice-card js-only"
                            aria-expanded={open}
                            aria-controls={panelId}
                            onClick={toggle}
                        >
                            <span className="choice-title">{copy.infoTitle}</span>
                            <span className="choice-detail">{messaging ? copy.infoDetailMessaging : copy.infoDetailCall}</span>
                        </button>
                    </div>
                </>
            )}
            <div id={panelId} ref={panel} className="lead-panel" data-open={open || !callHref}>
                <div className="lead-panel-inner">
                    <div className={`-mx-1 px-1 pb-1 ${callHref ? 'pt-6' : ''}`}>{children}</div>
                </div>
            </div>
            <noscript>
                <style>{'.lead-panel{grid-template-rows:1fr!important;visibility:visible!important}.js-only{display:none!important}'}</style>
            </noscript>
        </div>
    );
}
