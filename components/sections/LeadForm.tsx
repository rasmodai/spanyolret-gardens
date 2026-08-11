'use client';

import { useState, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Input, { Select, Checkbox } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { track, identify, setUserProperties, timeEvent } from '@/lib/mixpanel';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    timeline: string;
    preferredUnit: string;
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

export default function LeadForm() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        timeline: '',
        preferredUnit: '',
        marketingConsent: false,
        privacyConsent: false
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const formStarted = useRef(false);
    const fieldsInteracted = useRef(new Set<string>());

    const timelineOptions = [
        { value: 'immediately', label: 'As soon as possible' },
        { value: '3-6-months', label: 'Within 3-6 months' },
        { value: '6-12-months', label: 'Within 6-12 months' },
        { value: '12-plus-months', label: '12+ months' }
    ];

    const unitOptions = [
        { value: 'any', label: 'No preference' },
        { value: 'smallest-garden', label: 'Smallest garden (best value)' },
        { value: 'largest-garden', label: 'Largest garden' },
        { value: 'largest-interior', label: 'Largest interior' }
    ];

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }
        if (!formData.privacyConsent) {
            newErrors.privacyConsent = 'You must accept the privacy policy';
        }

        setErrors(newErrors);
        const errorFields = Object.keys(newErrors);
        if (errorFields.length > 0) {
            track('Form Validation Failed', {
                form: 'lead',
                language: 'en',
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
            language: 'en',
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
                    lang: 'en',
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
                language: 'en',
                timeline: formData.timeline,
                preferred_unit: formData.preferredUnit,
                marketing_consent: formData.marketingConsent,
            });
            track('Form Completed', {
                form: 'lead',
                language: 'en',
                timeline: formData.timeline,
                preferred_unit: formData.preferredUnit,
                marketing_consent: formData.marketingConsent,
            });
            track('Lead Submitted', {
                form: 'lead',
                language: 'en',
                timeline: formData.timeline,
                preferred_unit: formData.preferredUnit,
            });

            router.push('/thank-you');
        } catch {
            track('Form Submit Failed', { form: 'lead', language: 'en' });
            setSubmitError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field: keyof FormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
        // Track first interaction with the form
        if (!formStarted.current) {
            formStarted.current = true;
            timeEvent('Form Completed');
            track('Form Started', { form: 'lead', language: 'en' });
        }
        // Track each field interaction once
        if (!fieldsInteracted.current.has(field)) {
            fieldsInteracted.current.add(field);
            track('Form Field Interacted', { form: 'lead', field, language: 'en' });
        }
    };

    return (
        <section id="lead-form" className="section-padding band-frame">
            <div className="section-container relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-10">
                        {/* Left - Copy */}
                        <div className="text-onmedia">
                            <div className="caption mb-6 flex items-center gap-4 !text-[color:var(--on-frame-soft)]">
                                Book a viewing
                                <span className="h-px flex-1 bg-onmedia/20" />
                            </div>

                            <h2 className="display-l text-onmedia">Come and stand in the garden.</h2>
                            <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-relaxed text-[color:var(--on-frame-soft)]">
                                Bring the children. They will tell you more about 300 m&sup2; of grass than we can.
                                One visit, and no follow-up unless you ask for it.
                            </p>

                            {/* Was three emoji in circles. The middle one promised a
                              * response "within 24 hours" while the sales process
                              * targets first contact in under five minutes, and the
                              * third made a claim about infrastructure ("your data is
                              * secure") rather than saying what happens to the data. */}
                            <dl className="mt-9 border-t border-onmedia/20">
                                <div className="border-b border-onmedia/15 py-4">
                                    <dt className="measure text-[0.9375rem] text-onmedia">A call today</dt>
                                    <dd className="mt-1 text-sm text-[color:var(--on-frame-soft)]">
                                        Within the hour during Budapest office hours. Otherwise first thing tomorrow.
                                    </dd>
                                </div>
                                <div className="border-b border-onmedia/15 py-4">
                                    <dt className="measure text-[0.9375rem] text-onmedia">In English</dt>
                                    <dd className="mt-1 text-sm text-[color:var(--on-frame-soft)]">
                                        The whole purchase runs in English. No Hungarian required at any point.
                                    </dd>
                                </div>
                                <div className="border-b border-onmedia/15 py-4">
                                    <dt className="measure text-[0.9375rem] text-onmedia">What we do with this</dt>
                                    <dd className="mt-1 text-sm text-[color:var(--on-frame-soft)]">
                                        We contact you about Spanyolr&eacute;t Gardens. We do not pass it to anyone
                                        else, and one email from you removes it.
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        {/* Right - Form */}
                        <div
                            className="bg-paper p-6 md:p-8"
                        >
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Input
                                        label="First Name"
                                        required
                                        value={formData.firstName}
                                        onChange={(e) => handleChange('firstName', e.target.value)}
                                        error={errors.firstName}
                                        placeholder="John"
                                    />
                                    <Input
                                        label="Last Name"
                                        required
                                        value={formData.lastName}
                                        onChange={(e) => handleChange('lastName', e.target.value)}
                                        error={errors.lastName}
                                        placeholder="Smith"
                                    />
                                </div>

                                <Input
                                    label="Email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    error={errors.email}
                                    placeholder="john.smith@email.com"
                                />

                                <Input
                                    label="Phone"
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    error={errors.phone}
                                    placeholder="+36 XX XXX XXXX"
                                />

                                <Select
                                    label="When are you looking to move?"
                                    options={timelineOptions}
                                    value={formData.timeline}
                                    onChange={(e) => handleChange('timeline', e.target.value)}
                                />

                                <Select
                                    label="Unit preference"
                                    options={unitOptions}
                                    value={formData.preferredUnit}
                                    onChange={(e) => handleChange('preferredUnit', e.target.value)}
                                />

                                <div className="space-y-3 pt-2">
                                    <Checkbox
                                        label="I agree to receive marketing communications about Spanyolrét Gardens"
                                        checked={formData.marketingConsent}
                                        onChange={(e) => handleChange('marketingConsent', (e.target as HTMLInputElement).checked)}
                                    />
                                    <Checkbox
                                        label="I accept the privacy policy and agree to be contacted about my inquiry *"
                                        checked={formData.privacyConsent}
                                        onChange={(e) => handleChange('privacyConsent', (e.target as HTMLInputElement).checked)}
                                        error={errors.privacyConsent}
                                    />
                                </div>

                                {submitError && (
                                    <p role="alert" className="text-sm text-bad">{submitError}</p>
                                )}

                                <Button
                                    type="submit"
                                    variant="accent"
                                    size="lg"
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending…' : 'Book a viewing'}
                                </Button>

                                <p className="text-xs text-ink-soft text-center">
                                    Your information is secure and will only be used to contact you about Spanyolrét Gardens.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}
