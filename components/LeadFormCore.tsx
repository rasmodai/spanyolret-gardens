'use client';

import { FormEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input, { Checkbox, Select } from '@/components/ui/Input';
import { readConsent } from '@/lib/consent';
import { buildMessage, messageAppUrl, OPEN_MESSAGE_EVENT, PRIORITIES, type MessageChannel, type MessageCopy, type Priority } from '@/lib/lead-message';
import { track } from '@/lib/mixpanel';
import { whatsappDigits } from '@/lib/site';

export interface LeadFormCopy {
    unit: string;
    unitAny: string;
    priority: string;
    priorities: Partial<Record<Priority, string>>;
    timeline: string;
    timelinePlaceholder: string;
    timelineOptions: { value: string; label: string }[];
    firstName: string;
    phone: string;
    email: string;
    consent: string;
    privacyLink: string;
    privacyHref: string;
    choose: string;
    opening: string;
    whatsapp: string;
    sms: string;
    note: string;
    callBack: string;
    submit: string;
    sending: string;
    failure: string;
    rateLimited: string;
    errors: { firstName: string; phone: string; consent: string };
    message: MessageCopy;
    thankYouPath: string;
}

type Channel = MessageChannel | 'form';

function cookie(name: string): string {
    return document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1] || '';
}

/* Three questions, a first name and a phone. First choice: WhatsApp or SMS
 * opens with the message already written, to Brenda. The lead is sent to the
 * CRM first, so it is kept even if the visitor never presses send; the app
 * opens in any case, since the message itself still reaches us. Second choice:
 * a call back, which thanks the visitor only once the lead is captured. */
export default function LeadFormCore({
    copy,
    lang,
    unitOptions,
}: {
    copy: LeadFormCopy;
    lang: 'en' | 'hu';
    unitOptions: { value: string; label: string }[];
}) {
    const router = useRouter();
    const [form, setForm] = useState({ unit: '', priority: '' as Priority | '', timeline: '', firstName: '', phone: '', email: '', consent: false });
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
            track('Message Form Opened', { language: lang, from: typeof unit === 'string' ? `unit-${unit}` : 'shortcut' });
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
            track('Form Started', { form: 'lead', language: lang });
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
            track('Form Validation Failed', { form: 'lead', language: lang });
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
            priority: form.priority,
            timeline: form.timeline,
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
            track('Message Prepared', { channel, language: lang, preferred_unit: form.unit, priority: form.priority, timeline: form.timeline });
            const text = buildMessage(copy.message, {
                name: form.firstName.trim(),
                unit: form.unit,
                // Mid-sentence in the message: "What matters most to me: the price".
                priority: form.priority ? (copy.priorities[form.priority] ?? '').replace(/^\p{Lu}/u, (c) => c.toLocaleLowerCase(lang)) : '',
                timeline: copy.timelineOptions.find((option) => option.value === form.timeline)?.label ?? '',
            });
            // Same tab: a window opened after an await is blocked on iOS.
            window.location.assign(messageAppUrl(channel, whatsappDigits, text));
            setSending(null);
            return;
        }

        try {
            const response = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
            if (response.status === 429) {
                setFailure(copy.rateLimited);
                setSending(null);
                return;
            }
            if (!response.ok) throw new Error('Submission failed');
            pixelLead();
            track('Lead Submitted', { form: 'lead', language: lang, timeline: form.timeline, preferred_unit: form.unit, priority: form.priority });
            router.push(copy.thankYouPath);
        } catch {
            track('Form Submit Failed', { form: 'lead', language: lang });
            setFailure(copy.failure);
            setSending(null);
        }
    };

    return (
        <form ref={root} onSubmit={(event) => submit(event, whatsappDigits ? 'whatsapp' : 'form')} noValidate className="space-y-6">
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
            <Select label={copy.unit} placeholder={copy.unitAny} options={unitOptions} value={form.unit} onChange={(e) => change('unit', e.target.value)} />
            <fieldset>
                <legend className="field-label">{copy.priority}</legend>
                <div className="flex flex-wrap gap-2">
                    {PRIORITIES.filter((key) => copy.priorities[key]).map((key) => (
                        <button
                            key={key}
                            type="button"
                            aria-pressed={form.priority === key}
                            onClick={() => change('priority', form.priority === key ? '' : key)}
                            className={`min-h-[44px] border px-3 text-[0.9375rem] transition-colors ${
                                form.priority === key
                                    ? 'border-[color:var(--lawn)] bg-[color:var(--lawn)] text-[color:var(--on-lawn)]'
                                    : 'border-[color:var(--line-strong)] text-ink hover:border-[color:var(--ink)]'
                            }`}
                        >
                            {copy.priorities[key]}
                        </button>
                    ))}
                </div>
            </fieldset>
            <Select
                label={copy.timeline}
                placeholder={copy.timelinePlaceholder}
                options={copy.timelineOptions}
                value={form.timeline}
                onChange={(e) => change('timeline', e.target.value)}
            />
            <div className="grid gap-6 md:grid-cols-2">
                <Input label={copy.firstName} required autoComplete="given-name" value={form.firstName} onChange={(e) => change('firstName', e.target.value)} error={errors.firstName} />
                <Input label={copy.phone} type="tel" required autoComplete="tel" placeholder="+36" value={form.phone} onChange={(e) => change('phone', e.target.value)} error={errors.phone} />
            </div>
            <Input label={copy.email} type="email" autoComplete="email" value={form.email} onChange={(e) => change('email', e.target.value)} />
            <div>
                <Checkbox label={`${copy.consent} *`} checked={form.consent} onChange={(e) => change('consent', (e.target as HTMLInputElement).checked)} error={errors.consent} />
                <a href={copy.privacyHref} className="ml-[1.875rem] mt-1 inline-block text-sm text-ink-soft underline">{copy.privacyLink}</a>
            </div>

            {failure && <p role="alert" className="text-sm text-bad">{failure}</p>}

            {whatsappDigits ? (
                <fieldset disabled={sending !== null} className="space-y-3">
                    <legend className="field-label">{sending && sending !== 'form' ? copy.opening : copy.choose}</legend>
                    <div className="grid grid-cols-2 gap-3">
                        <button type="submit" className="btn btn-primary">{copy.whatsapp}</button>
                        <button type="button" onClick={(event) => submit(event, 'sms')} className="btn btn-ghost">{copy.sms}</button>
                    </div>
                    <p className="text-sm text-ink-soft">{copy.note}</p>
                    <button type="button" onClick={(event) => submit(event, 'form')} className="btn-quiet">
                        {sending === 'form' ? copy.sending : copy.callBack}
                    </button>
                </fieldset>
            ) : (
                <button type="submit" disabled={sending !== null} className="btn btn-primary w-full">
                    {sending ? copy.sending : copy.submit}
                </button>
            )}
        </form>
    );
}
