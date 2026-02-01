'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import Input, { Select, Checkbox } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { CheckCircleIcon } from '@/components/ui/Icons';

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
    const [isSuccess, setIsSuccess] = useState(false);

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
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);
    };

    const handleChange = (field: keyof FormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    if (isSuccess) {
        return (
            <section id="lead-form" className="section-padding bg-primary text-white">
                <div className="section-container">
                    <div className="max-w-xl mx-auto text-center">
                        <div className="w-20 h-20 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center">
                            <CheckCircleIcon size={40} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                            Thank You!
                        </h2>
                        <p className="text-xl text-white/80 mb-8">
                            We'll contact you within 24 hours to schedule your consultation.
                        </p>
                        <div className="bg-white/10 rounded-xl p-6">
                            <p className="text-white/70 mb-4">In the meantime, download our brochure:</p>
                            <Button variant="accent" size="lg">
                                Download the Brochure
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="lead-form" className="section-padding bg-primary relative overflow-hidden">
            {/* Premium ambient background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Noise texture overlay */}
                <div className="absolute inset-0 noise-overlay opacity-[0.03]" />

                {/* Floating gradient orbs */}
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl animate-[breathe_10s_ease-in-out_infinite]" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-3xl animate-[breathe_12s_ease-in-out_infinite_2s]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-white/5 to-transparent rounded-full blur-3xl" />

                {/* Decorative accent lines */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <div className="section-container relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-10">
                        {/* Left - Copy */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-white"
                        >
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
                                Ready to See Your Future Home?
                            </h2>
                            <p className="text-xl text-white/80 mb-8">
                                Schedule a private consultation with our team. No pressure — just a conversation
                                about whether Spanyolrét Gardens is right for your family.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                                        <span className="text-xl">📞</span>
                                    </div>
                                    <div>
                                        <div className="font-medium">Response within 24 hours</div>
                                        <div className="text-white/60 text-sm">Usually much faster</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                                        <span className="text-xl">🌍</span>
                                    </div>
                                    <div>
                                        <div className="font-medium">English-speaking team</div>
                                        <div className="text-white/60 text-sm">No Hungarian required</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                                        <span className="text-xl">🔒</span>
                                    </div>
                                    <div>
                                        <div className="font-medium">Your data is secure</div>
                                        <div className="text-white/60 text-sm">We never share your information</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right - Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white rounded-2xl p-6 md:p-8 shadow-xl"
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

                                <Button
                                    type="submit"
                                    variant="accent"
                                    size="lg"
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Request a Viewing'}
                                </Button>

                                <p className="text-xs text-gray-500 text-center">
                                    Your information is secure and will only be used to contact you about Spanyolrét Gardens.
                                </p>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section >
    );
}
