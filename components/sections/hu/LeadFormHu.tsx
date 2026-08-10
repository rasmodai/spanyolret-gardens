'use client';

import { useState, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Input, { Select, Checkbox, Textarea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { uiTextsHu } from '@/lib/data-hu';
import { track, identify, setUserProperties, timeEvent } from '@/lib/mixpanel';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    preferredContact: string;
    timeline: string;
    message: string;
    marketingConsent: boolean;
    privacyConsent: boolean;
}

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    privacyConsent?: string;
}

export default function LeadFormHu() {
    const router = useRouter();
    const t = uiTextsHu.leadForm;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});
    const formStarted = useRef(false);
    const fieldsInteracted = useRef(new Set<string>());
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        preferredContact: 'email',
        timeline: '',
        message: '',
        marketingConsent: false,
        privacyConsent: false
    });

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'A keresztnév megadása kötelező';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'A vezetéknév megadása kötelező';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Az e-mail cím megadása kötelező';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Kérjük, adj meg egy érvényes e-mail címet';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'A telefonszám megadása kötelező';
        }
        if (!formData.privacyConsent) {
            newErrors.privacyConsent = 'Az adatvédelmi nyilatkozat elfogadása kötelező';
        }

        setErrors(newErrors);
        const errorFields = Object.keys(newErrors);
        if (errorFields.length > 0) {
            track('Form Validation Failed', {
                form: 'lead',
                language: 'hu',
                error_fields: errorFields,
                error_count: errorFields.length,
            });
        }
        return errorFields.length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        track('Form Submit Attempted', {
            form: 'lead',
            language: 'hu',
            fields_filled: Object.entries(formData).filter(([, v]) => v !== '' && v !== false).map(([k]) => k),
            fields_interacted: Array.from(fieldsInteracted.current),
        });

        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitError('');

        try {
            const eventId = crypto.randomUUID();
            const getCookie = (name: string) =>
                document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1] || '';

            const res = await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    lang: 'hu',
                    eventId,
                    sourceUrl: window.location.href,
                    fbp: getCookie('_fbp'),
                    fbc: getCookie('_fbc'),
                }),
            });

            if (!res.ok) throw new Error('Submission failed');

            // Fire Meta Pixel Lead event (deduplicated with server via eventId)
            if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
                window.fbq('track', 'Lead', {}, { eventID: eventId });
            }

            // Track successful submission in Mixpanel
            identify(formData.email);
            setUserProperties({
                $first_name: formData.firstName,
                $last_name: formData.lastName,
                $email: formData.email,
                $phone: formData.phone,
                language: 'hu',
                timeline: formData.timeline,
                preferred_contact: formData.preferredContact,
                marketing_consent: formData.marketingConsent,
            });
            track('Form Completed', {
                form: 'lead',
                language: 'hu',
                timeline: formData.timeline,
                preferred_contact: formData.preferredContact,
                marketing_consent: formData.marketingConsent,
                has_message: formData.message.trim().length > 0,
            });
            track('Lead Submitted', {
                form: 'lead',
                language: 'hu',
                timeline: formData.timeline,
                preferred_contact: formData.preferredContact,
            });

            router.push('/hu/koszonjuk');
        } catch {
            track('Form Submit Failed', { form: 'lead', language: 'hu' });
            setSubmitError('Hiba történt. Kérjük, próbáld újra.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field: keyof FormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
        if (!formStarted.current) {
            formStarted.current = true;
            timeEvent('Form Completed');
            track('Form Started', { form: 'lead', language: 'hu' });
        }
        if (!fieldsInteracted.current.has(field)) {
            fieldsInteracted.current.add(field);
            track('Form Field Interacted', { form: 'lead', field, language: 'hu' });
        }
    };

    return (
        <section id="lead-form" className="section-padding band-frame">
            <div className="section-container">
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                    <div className="text-onmedia">
                        <div className="caption mb-6 flex items-center gap-4 !text-[color:var(--on-frame-soft)]">
                            Időpontfoglalás
                            <span className="h-px flex-1 bg-onmedia/20" />
                        </div>

                        <h2 className="display-l wrap-compound text-onmedia">Gyere el, állj be a kertbe.</h2>
                        <p className="wrap-compound mt-5 max-w-[46ch] text-[1.0625rem] leading-relaxed text-[color:var(--on-frame-soft)]">
                            Hozd a gyerekeket. Ők többet mondanak majd 300 m² fűről, mint mi.
                            Egy látogatás, és nincs utánkövetés, hacsak nem kéred.
                        </p>

                        <dl className="mt-9 border-t border-onmedia/20">
                            <div className="border-b border-onmedia/15 py-4">
                                <dt className="measure text-[0.9375rem] text-onmedia">Még ma hívunk</dt>
                                <dd className="wrap-compound mt-1 text-sm text-[color:var(--on-frame-soft)]">
                                    Budapesti munkaidőben egy órán belül. Azon kívül másnap reggel elsőként.
                                </dd>
                            </div>
                            <div className="border-b border-onmedia/15 py-4">
                                <dt className="measure text-[0.9375rem] text-onmedia">Magyarul és angolul</dt>
                                <dd className="wrap-compound mt-1 text-sm text-[color:var(--on-frame-soft)]">
                                    A teljes vásárlási folyamat mehet angolul is, ha az kényelmesebb.
                                </dd>
                            </div>
                            <div className="border-b border-onmedia/15 py-4">
                                <dt className="measure text-[0.9375rem] text-onmedia">Mit kezdünk az adataiddal</dt>
                                <dd className="wrap-compound mt-1 text-sm text-[color:var(--on-frame-soft)]">
                                    A Spanyolrét Gardensszel kapcsolatban keresünk meg. Nem adjuk tovább senkinek,
                                    és egyetlen e-mailedre töröljük.
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <div className="bg-paper p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <Input
                                    label={t.firstName}
                                    value={formData.firstName}
                                    onChange={(e) => handleChange('firstName', e.target.value)}
                                    required
                                    error={errors.firstName}
                                />
                                <Input
                                    label={t.lastName}
                                    value={formData.lastName}
                                    onChange={(e) => handleChange('lastName', e.target.value)}
                                    required
                                    error={errors.lastName}
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <Input
                                    label={t.email}
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    required
                                    error={errors.email}
                                />
                                <Input
                                    label={t.phone}
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    required
                                    error={errors.phone}
                                    placeholder="+36 XX XXX XXXX"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <Select
                                    label={t.preferredContact}
                                    value={formData.preferredContact}
                                    onChange={(e) => handleChange('preferredContact', e.target.value)}
                                    placeholder="Válassz az opciók közül"
                                    options={[
                                        { value: 'email', label: t.contactEmail },
                                        { value: 'phone', label: t.contactPhone },
                                        { value: 'whatsapp', label: t.contactWhatsapp }
                                    ]}
                                />
                                <Select
                                    label={t.timeline}
                                    value={formData.timeline}
                                    onChange={(e) => handleChange('timeline', e.target.value)}
                                    placeholder="Válassz az opciók közül"
                                    options={[
                                        { value: 'asap', label: t.timelineAsap },
                                        { value: '6months', label: t.timeline6months },
                                        { value: '12months', label: t.timeline12months },
                                        { value: 'exploring', label: t.timelineJustLooking }
                                    ]}
                                />
                            </div>

                            {/* Was a raw <textarea> with a <label> that had no htmlFor —
                              * the one control on this page a screen reader announced
                              * as unlabelled. Uses the shared component now. */}
                            <Textarea
                                label={t.message}
                                rows={4}
                                placeholder={t.messagePlaceholder}
                                value={formData.message}
                                onChange={(e) => handleChange('message', e.target.value)}
                            />

                            <div className="space-y-3">
                                <Checkbox
                                    label={t.consent}
                                    checked={formData.marketingConsent}
                                    onChange={(e) => handleChange('marketingConsent', e.target.checked)}
                                />
                                <Checkbox
                                    label="Elfogadom az adatvédelmi nyilatkozatot és hozzájárulok, hogy megkeressenek az érdeklődésemmel kapcsolatban *"
                                    checked={formData.privacyConsent}
                                    onChange={(e) => handleChange('privacyConsent', e.target.checked)}
                                    error={errors.privacyConsent}
                                />
                            </div>

                            {submitError && (
                                <p role="alert" className="text-sm text-bad">{submitError}</p>
                            )}

                            <div className="pt-4">
                                <Button type="submit" variant="primary" className="w-full md:w-auto" disabled={isSubmitting}>
                                    {isSubmitting ? 'Küldés…' : t.submit}
                                </Button>
                            </div>

                            <p className="text-xs text-ink-soft text-center pt-4">
                                {t.privacy}
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
