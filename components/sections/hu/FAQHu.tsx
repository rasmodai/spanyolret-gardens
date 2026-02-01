'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@/components/ui/Icons';
import { faqsHu, uiTextsHu } from '@/lib/data-hu';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
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

export default function FAQHu() {
    const [activeCategory, setActiveCategory] = useState(faqsHu[0].category);
    const [openQuestion, setOpenQuestion] = useState<string | null>(null);
    const t = uiTextsHu.faq;

    const currentCategory = faqsHu.find(cat => cat.category === activeCategory);

    return (
        <section id="faq" className="section-padding bg-white relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 noise-overlay opacity-[0.01]" />
                <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl animate-[breathe_10s_ease-in-out_infinite]" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-secondary/5 to-transparent rounded-full blur-3xl animate-[breathe_12s_ease-in-out_infinite_2s]" />
            </div>

            <div className="section-container relative z-10">
                <div className="text-center mb-12">
                    <span className="section-badge mb-4">{t.badge}</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-anthracite mb-4">
                        {t.title}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {t.subtitle}
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {faqsHu.map((cat) => (
                        <button
                            key={cat.category}
                            onClick={() => {
                                setActiveCategory(cat.category);
                                setOpenQuestion(null);
                            }}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat.category
                                ? 'bg-primary text-white shadow-lg'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {cat.category}
                        </button>
                    ))}
                </div>

                {/* Questions */}
                <motion.div
                    key={activeCategory}
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="max-w-3xl mx-auto"
                >
                    {currentCategory?.questions.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="mb-4"
                        >
                            <button
                                onClick={() => setOpenQuestion(openQuestion === item.q ? null : item.q)}
                                className="w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all duration-300 text-left group"
                            >
                                <span className="font-semibold text-anthracite pr-4">{item.q}</span>
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center transition-transform duration-300 ${openQuestion === item.q ? 'rotate-180' : ''
                                    }`}>
                                    <ChevronDownIcon size={18} className="text-gray-500" />
                                </div>
                            </button>
                            <AnimatePresence>
                                {openQuestion === item.q && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-5 pt-2 text-gray-600 leading-relaxed">
                                            {item.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
