'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import Input, { Select, Checkbox } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { CheckCircleIcon } from '@/components/ui/Icons';
import { uiTextsHu } from '@/lib/data-hu';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    preferredContact: string;
    timeline: string;
    message: string;
    marketingConsent: boolean;
}

export default function LeadFormHu() {
    const t = uiTextsHu.leadForm;
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        preferredContact: 'email',
        timeline: '',
        message: '',
        marketingConsent: false
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');

        try {
            const res = await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    lang: 'hu',
                }),
            });

            if (!res.ok) throw new Error('Submission failed');

            setIsSubmitted(true);
        } catch {
            setSubmitError('Hiba tortent. Kerjuk, probald ujra.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field: keyof FormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    if (isSubmitted) {
        return (
            <section id="lead-form" className="section-padding bg-gradient-to-b from-facade to-white">
                <div className="section-container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-xl mx-auto text-center py-16"
                    >
                        <div className="w-20 h-20 bg-gradient-to-br from-secondary to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircleIcon size={40} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-display font-bold text-anthracite mb-4">
                            {t.thankYou}
                        </h2>
                        <p className="text-gray-600 text-lg">
                            {t.thankYouMessage}
                        </p>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id="lead-form" className="section-padding bg-gradient-to-b from-facade to-white relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 noise-overlay opacity-[0.015]" />
                <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="section-container relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="section-badge mb-4">{t.badge}</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-anthracite mb-4">
                            {t.title}
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            {t.subtitle}
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <Input
                                    label={t.firstName}
                                    value={formData.firstName}
                                    onChange={(e) => handleChange('firstName', e.target.value)}
                                    required
                                />
                                <Input
                                    label={t.lastName}
                                    value={formData.lastName}
                                    onChange={(e) => handleChange('lastName', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <Input
                                    label={t.email}
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    required
                                />
                                <Input
                                    label={t.phone}
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <Select
                                    label={t.preferredContact}
                                    value={formData.preferredContact}
                                    onChange={(e) => handleChange('preferredContact', e.target.value)}
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
                                    options={[
                                        { value: 'asap', label: t.timelineAsap },
                                        { value: '6months', label: t.timeline6months },
                                        { value: '12months', label: t.timeline12months },
                                        { value: 'exploring', label: t.timelineJustLooking }
                                    ]}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t.message}
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 outline-none resize-none"
                                    placeholder={t.messagePlaceholder}
                                    value={formData.message}
                                    onChange={(e) => handleChange('message', e.target.value)}
                                />
                            </div>

                            <Checkbox
                                label={t.consent}
                                checked={formData.marketingConsent}
                                onChange={(e) => handleChange('marketingConsent', e.target.checked)}
                            />

                            {submitError && (
                                <p className="text-red-600 text-sm text-center">{submitError}</p>
                            )}

                            <div className="pt-4">
                                <Button type="submit" variant="primary" className="w-full md:w-auto" disabled={isSubmitting}>
                                    {isSubmitting ? 'Kuldese...' : t.submit}
                                </Button>
                            </div>

                            <p className="text-xs text-gray-500 text-center pt-4">
                                {t.privacy}
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
