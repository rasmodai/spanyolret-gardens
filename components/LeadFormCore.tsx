'use client';

import { FormEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input, { Checkbox, Select } from '@/components/ui/Input';
import { readConsent } from '@/lib/consent';
import type { FormCopy } from '@/lib/copy/types';
import { buildMessage, messageAppUrl, OPEN_MESSAGE_EVENT, type MessageChannel } from '@/lib/lead/message';
import { track } from '@/lib/mixpanel';

type Channel = MessageChannel | 'form';

function cookie(name: string): string {
    return document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1] || '';
}

/* The short form (V2, 16/11/2026): a first name and a phone, and, if the
 * visitor wants, a house, a budget band and an e-mail. The main button asks for
 * a call back and thanks the visitor only once the lead is captured. Under it,
 * two quieter ways in: WhatsApp or SMS to Brenda opens with the message already
 * written (the lead is sent to the CRM first, so it is kept even if the visitor
 * never presses send; the app opens in any case), and a plain call link to the
 * builder. */
export default function LeadFormCore({
    copy,
    lang,
    unitOptions,
    whatsappDigits,
    privacyHref,
    callNumber,
    callLabel,
}: {
    copy: FormCopy;
    lang: 'en' | 'hu';
    unitOptions: { value: string; label: string }[];
    /** Digits of the WhatsApp / SMS number; null: the form only asks for a call back. */
    whatsappDigits: string | null;
    privacyHref: string;
    /** The builder's number (callNumber); null removes the call link. */
    callNumber: string | null;
    /** The link's text, the number included. */
    callLabel: string | null;
}) {
    const router = useRouter();
    const [form, setForm] = useState({ unit: '', budget: '', firstName: '', phone: '', email: '', consent: false });
    const [website, setWebsite] = useState('');
    const [errors, setErrors] = useState<Partial<Record<'firstName' | 'phone' | 'consent', string>>>({});
    const [sending, setSending] = useState<Channel | null>(null);
    const [failure, setFailure] = useState<string | null>(null);
    const started = useRef(false);
    const root = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const onOpen = (event: Event) => {
            const unit = (event as CustomEvent<string | undefined>).detail;
            if (typeof unit === 'string') setForm((previous) => ({ ...previous, unit }));
            track('WhatsApp Opened', { language: lang, from: typeof unit === 'string' ? `house-${unit}` : 'shortcut' });
            requestAnimationFrame(() => root.current?.closest('section')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
        };
        window.addEventListener(OPEN_MESSAGE_EVENT, onOpen);
        return () => window.removeEventListener(OPEN_MESSAGE_EVENT, onOpen);
    }, [lang]);

    const change = <K extends keyof typeof form>(field: K, value: (typeof form)[K]) => {
        setForm((previous) => ({ ...previous, [field]: value }));
        setErrors((previous) => ({ ...previous, [field]: undefined }));
        if (!started.current) {
            started.current = true;
            track('Form Started', { language: lang });
        }
    };

    const submit = async (event: FormEvent | SyntheticEvent, channel: Channel) => {
        event.preventDefault();
        const next: typeof errors = {};
        if (!form.firstName.trim()) next.firstName = copy.errors.firstName;
        if (!form.phone.trim()) next.phone = copy.errors.phone;
        if (!form.consent) next.consent = copy.errors.consent;
        setErrors(next);
        if (Object.keys(next).length > 0) {
            track('Form Validation Failed', { language: lang });
            return;
        }
        setSending(channel);
        setFailure(null);
        const eventId = crypto.randomUUID();
        const body = JSON.stringify({
            website,
            source: channel,
            firstName: form.firstName,
            phone: form.phone,
            email: form.email,
            preferredUnit: form.unit,
            budget: form.budget,
            privacyConsent: form.consent,
            marketingConsent: false,
            adConsent: readConsent() === 'accepted',
            lang,
            eventId,
            sourceUrl: window.location.href,
            fbp: cookie('_fbp'),
            fbc: cookie('_fbc'),
        });
        // Deduplicated with the server-side event through eventId.
        const pixelLead = () => {
            if (typeof window.fbq === 'function') window.fbq('track', 'Lead', {}, { eventID: eventId });
        };

        if (channel !== 'form' && whatsappDigits) {
            try {
                await fetch('/api/lead', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    keepalive: true,
                    signal: AbortSignal.timeout(4000),
                    body,
                });
            } catch {
                // The app still opens: the message reaches us anyway.
            }
            pixelLead();
            track('Message Prepared', { channel, language: lang, preferred_unit: form.unit, budget: form.budget });
            const text = buildMessage(copy.message, {
                name: form.firstName.trim(),
                unit: form.unit,
                priority: '',
                timeline: '',
            });
            // Same tab: a window opened after an await is blocked on iOS.
            window.location.assign(messageAppUrl(channel, whatsappDigits, text));
            setSending(null);
            return;
        }

        try {
            const response = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
            if (response.status === 429) {
                track('Form Rate Limited', { language: lang });
                setFailure(copy.rateLimited);
                setSending(null);
                return;
            }
            if (!response.ok) throw new Error('Submission failed');
            pixelLead();
            track('Lead Submitted', { language: lang, preferred_unit: form.unit, budget: form.budget });
            router.push(copy.thankYouPath);
        } catch {
            track('Form Submit Failed', { language: lang });
            setFailure(copy.failure);
            setSending(null);
        }
    };

    return (
        <form ref={root} onSubmit={(event) => submit(event, 'form')} noValidate className="space-y-6">
            <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
            />
            <div className="grid gap-6 md:grid-cols-2">
                <Input label={copy.firstName} required autoComplete="given-name" value={form.firstName} onChange={(e) => change('firstName', e.target.value)} error={errors.firstName} />
                <Input label={copy.phone} type="tel" required autoComplete="tel" placeholder="+36" value={form.phone} onChange={(e) => change('phone', e.target.value)} error={errors.phone} />
            </div>
 <Select label={copy.unit} placeholder={copy.unitAny} options={unitOptions} value={form.unit} onChange={(e) => change('unit', e.target.value)} />
            <Select label={copy.budget} placeholder={copy.budgetPlaceholder} options={copy.budgetOptions} value={form.budget} onChange={(e) => change('budget', e.target.value)} />
            <Input label={copy.email} type="email" autoComplete="email" value={form.email} onChange={(e) => change('email', e.target.value)} />
            <div>
                <Checkbox label={`${copy.consent} *`} checked={form.consent} onChange={(e) => change('consent', (e.target as HTMLInputElement).checked)} error={errors.consent} />
                <a href={privacyHref} className="ml-[1.875rem] mt-1 inline-block text-sm text-ink-soft underline">{copy.privacyLink}</a>
            </div>

            {failure && <p role="alert" className="text-sm text-bad">{failure}</p>}

            <button type="submit" disabled={sending !== null} className="btn btn-primary w-full">
                {sending === 'form' ? copy.sending : copy.submit}
            </button>

            {whatsappDigits && (
                <fieldset disabled={sending !== null} className="space-y-3">
                    <legend className="field-label">{sending && sending !== 'form' ? copy.opening : copy.choose}</legend>
                    <div className="grid grid-cols-2 gap-3">
                        <button type="button" onClick={(event) => submit(event, 'whatsapp')} className="btn btn-ghost">{copy.whatsapp}</button>
                        <button type="button" onClick={(event) => submit(event, 'sms')} className="btn btn-ghost">{copy.sms}</button>
                    </div>
                    <p className="text-sm text-ink-soft">{copy.note}</p>
                </fieldset>
            )}

            {callNumber && callLabel && (
                <a
                    href={`tel:${callNumber.replace(/\s/g, '')}`}
                    className="btn-quiet inline-block"
                    onClick={() => track('House Enquiry Clicked', { house: 'any', channel: 'phone' })}
                >
                    {callLabel}
                </a>
            )}
        </form>
    );
}
