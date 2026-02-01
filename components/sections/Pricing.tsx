'use client';

import { motion } from 'framer-motion';
import { includedInPrice, optionalExtras } from '@/lib/data';
import { CheckIcon } from '@/components/ui/Icons';
import PriceDisplay from '@/components/ui/PriceDisplay';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut' as const
        }
    }
};

export default function Pricing() {
    const scrollToForm = () => {
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="pricing" className="section-padding bg-gradient-to-b from-white via-facade/30 to-facade relative overflow-hidden">
            {/* Premium ambient background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Noise texture overlay */}
                <div className="absolute inset-0 noise-overlay opacity-[0.015]" />

                {/* Floating gradient orbs with animation */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/8 to-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl animate-[breathe_10s_ease-in-out_infinite]" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/8 to-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl animate-[breathe_12s_ease-in-out_infinite_2s]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-golden/3 to-transparent rounded-full blur-3xl" />

                {/* Decorative accent lines */}
                <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/8 to-transparent" />
                <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/8 to-transparent" />
            </div>

            <div className="section-container relative z-10">
                {/* Section Header - Premium styling with starting price */}
                <div className="text-center mb-16">
                    <span className="section-badge mb-4">
                        YOUR INVESTMENT
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-anthracite mb-6">
                        Starting from
                    </h2>
                    <div className="flex justify-center mb-6">
                        <PriceDisplay
                            amount={200000000}
                            size="hero"
                            align="center"
                            animate={true}
                            className="drop-shadow-sm"
                        />
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Premium 5-room townhouses with private gardens. Contact us for detailed pricing and availability.
                    </p>

                    {/* CTA Button */}
                    <button
                        onClick={scrollToForm}
                        className="mt-8 px-10 py-4 bg-gradient-to-r from-secondary to-green-500 text-white font-semibold rounded-xl shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        Request Detailed Pricing
                    </button>
                </div>

                {/* What's Included - Premium styling */}
                <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg border border-gray-100/50"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-xl flex items-center justify-center">
                                <CheckIcon size={24} className="text-secondary" />
                            </div>
                            <h3 className="text-2xl font-bold text-anthracite">Included in Price</h3>
                        </div>
                        <ul className="space-y-4">
                            {includedInPrice.map((item, index) => (
                                <li key={index} className="flex items-center gap-4">
                                    <div className="w-6 h-6 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-full flex items-center justify-center flex-shrink-0">
                                        <CheckIcon size={14} className="text-secondary" />
                                    </div>
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg border border-gray-100/50"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center">
                                <span className="text-accent text-xl font-bold">+</span>
                            </div>
                            <h3 className="text-2xl font-bold text-anthracite">Optional Extras</h3>
                        </div>
                        <ul className="space-y-4">
                            {optionalExtras.map((extra, index) => (
                                <li key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                                    <span className="text-gray-700">{extra.item}</span>
                                    <span className="text-sm font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full">
                                        {extra.price}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm text-gray-500 mt-6 pt-4 border-t border-gray-100">
                            Payment schedule and financing options discussed during consultation
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
