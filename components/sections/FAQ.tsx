'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@/components/ui/Icons';
import { faqs } from '@/lib/data';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut' as const
        }
    }
};

export default function FAQ() {
    const [openQuestion, setOpenQuestion] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState(faqs[0].category);

    const toggleQuestion = (id: string) => {
        setOpenQuestion(openQuestion === id ? null : id);
    };

    const currentFaqs = faqs.find(f => f.category === activeCategory)?.questions || [];

    return (
        <section id="faq" className="section-padding bg-white relative overflow-hidden">
            {/* Premium ambient background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Noise texture overlay */}
                <div className="absolute inset-0 noise-overlay opacity-[0.01]" />

                {/* Subtle floating gradient orbs */}
                <div className="absolute top-20 -right-20 w-80 h-80 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl animate-[breathe_10s_ease-in-out_infinite]" />
                <div className="absolute -bottom-20 left-10 w-72 h-72 bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl animate-[breathe_12s_ease-in-out_infinite_2s]" />

                {/* Decorative accent */}
                <div className="absolute top-1/2 left-0 w-1 h-32 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
            </div>

            <div className="section-container relative z-10">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-anthracite mb-4"
                    >
                        Questions? We Have Answers.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        Everything you need to know about buying at Spanyolrét Gardens.
                    </motion.p>
                </div>

                {/* Category Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-3 mb-10"
                >
                    {faqs.map((category) => (
                        <button
                            key={category.category}
                            onClick={() => {
                                setActiveCategory(category.category);
                                setOpenQuestion(null);
                            }}
                            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${activeCategory === category.category
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {category.category}
                        </button>
                    ))}
                </motion.div>

                {/* FAQ Accordion */}
                <div className="max-w-3xl mx-auto space-y-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, transition: { duration: 0.2 } }}
                            variants={containerVariants}
                            className="space-y-4"
                        >
                            {currentFaqs.map((item, index) => {
                                const questionId = `${activeCategory}-${index}`;
                                return (
                                    <motion.div
                                        key={questionId}
                                        variants={itemVariants}
                                        className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                                    >
                                        {/* Question */}
                                        <button
                                            onClick={() => toggleQuestion(questionId)}
                                            className="w-full flex items-center justify-between p-5 bg-white hover:bg-gray-50 transition-colors text-left gap-4"
                                        >
                                            <span className="font-medium text-anthracite">{item.q}</span>
                                            <ChevronDownIcon
                                                size={20}
                                                className={`text-gray-400 transition-transform duration-300 flex-shrink-0 ${openQuestion === questionId ? 'rotate-180' : ''
                                                    }`}
                                            />
                                        </button>

                                        {/* Answer */}
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ${openQuestion === questionId ? 'max-h-96' : 'max-h-0'
                                                }`}
                                        >
                                            <div className="p-5 pt-0 bg-gray-50">
                                                <p className="text-gray-600 leading-relaxed">{item.a}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Additional Help CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-center mt-10"
                >
                    <p className="text-gray-600 mb-4">Still have questions? We're here to help.</p>
                    <button
                        onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transform hover:-translate-y-0.5 duration-300"
                    >
                        Get in Touch
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
