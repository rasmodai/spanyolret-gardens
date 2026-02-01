'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { specsCategoriesHu, uiTextsHu } from '@/lib/data-hu';

// Premium icons for each category
const categoryIcons: Record<string, React.ReactNode> = {
    structure: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 21h18M3 7v14M21 7v14M6 21V11M18 21V11M10 21v-6h4v6M12 7V3M8 7l4-4 4 4" />
        </svg>
    ),
    climate: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 9a3 3 0 100 6 3 3 0 000-6z" />
            <path d="M12 3v2M12 19v2M5.64 5.64l1.41 1.41M16.95 16.95l1.41 1.41M3 12h2M19 12h2M5.64 18.36l1.41-1.41M16.95 7.05l1.41-1.41" />
        </svg>
    ),
    windows: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="12" y1="3" x2="12" y2="21" />
            <line x1="3" y1="12" x2="21" y2="12" />
        </svg>
    ),
    electrical: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
    ),
    finishes: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
    ),
    outdoor: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22V8M12 8c0-2.5 2-4.5 4-6M12 8c0-2.5-2-4.5-4-6M5 12c-1 0-2 1-2 2.5S5 17 5 17s2-1.5 2-2.5S6 12 5 12zM19 12c1 0 2 1 2 2.5S19 17 19 17s-2-1.5-2-2.5 1-2.5 2-2.5z" />
            <path d="M12 22c-4 0-7-1-7-3s3-3 7-3 7 1 7 3-3 3-7 3z" />
        </svg>
    ),
};

export default function SpecsHu() {
    const [activeCategory, setActiveCategory] = useState<string>(specsCategoriesHu[0].id);
    const t = uiTextsHu.specs;

    return (
        <section id="specs" className="section-padding bg-gradient-to-b from-white via-gray-50 to-facade/20 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl translate-y-1/2" />

            <div className="section-container relative z-10">
                {/* Section Header - Luxurious styling */}
                <div className="text-center mb-16">
                    <span className="section-badge mb-4">
                        {t.badge}
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-anthracite mb-4">
                        {t.title}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {t.subtitle}
                    </p>
                </div>

                {/* Category Navigation - Premium tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {specsCategoriesHu.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`group relative px-6 py-3 rounded-2xl font-medium transition-all duration-500 ${activeCategory === category.id
                                ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25'
                                : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-anthracite border border-gray-100 hover:border-gray-200 hover:shadow-md'
                                }`}
                        >
                            <span className="relative z-10">{category.title}</span>
                            {activeCategory === category.id && (
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-2xl animate-pulse opacity-50" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Active Category Display - Luxurious card */}
                <div className="relative min-h-[600px]">
                    <AnimatePresence mode="wait">
                        {specsCategoriesHu.map((category) => (
                            activeCategory === category.id && (
                                <motion.div
                                    key={category.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="absolute inset-0 w-full"
                                >
                                    <div className="max-w-4xl mx-auto">
                                        {/* Main content card */}
                                        <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 shadow-xl border border-white/50 relative overflow-hidden h-full">
                                            {/* Gradient accent */}
                                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />

                                            {/* Header with icon */}
                                            <div className="flex items-start gap-6 mb-8">
                                                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                                                    {categoryIcons[category.id]}
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl md:text-3xl font-bold text-anthracite mb-2">
                                                        {category.title}
                                                    </h3>
                                                    <p className="text-gray-500">
                                                        Prémium specifikációk a tartós minőségért
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Specifications grid */}
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {category.items.map((item, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.05 + 0.2 }}
                                                        className="group relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
                                                    >
                                                        {/* Number indicator */}
                                                        <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-secondary to-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                                                            {index + 1}
                                                        </div>

                                                        <div className="flex items-start gap-3">
                                                            <div className="w-2 h-2 bg-gradient-to-br from-primary to-primary/60 rounded-full mt-2 flex-shrink-0" />
                                                            <span className="text-gray-700 leading-relaxed group-hover:text-anthracite transition-colors">
                                                                {item}
                                                            </span>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Bottom accent cards */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="grid grid-cols-3 gap-4 mt-6"
                                        >
                                            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-4 text-center backdrop-blur-sm border border-primary/10">
                                                <div className="text-2xl font-bold text-primary mb-1">13+</div>
                                                <div className="text-xs text-gray-600">Év tapasztalat</div>
                                            </div>
                                            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-4 text-center backdrop-blur-sm border border-secondary/10">
                                                <div className="text-2xl font-bold text-secondary mb-1">A+</div>
                                                <div className="text-xs text-gray-600">Energiaosztály</div>
                                            </div>
                                            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-4 text-center backdrop-blur-sm border border-accent/10">
                                                <div className="text-2xl font-bold text-accent mb-1">100%</div>
                                                <div className="text-xs text-gray-600">Minőségi anyagok</div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )
                        ))}
                    </AnimatePresence>
                </div>

                {/* Download CTA - Premium styling */}
                <div className="text-center mt-16">
                    <div className="inline-flex flex-col items-center gap-4 bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-100 shadow-lg">
                        <p className="text-gray-600">Szeretnéd a teljes műszaki dokumentációt?</p>
                        <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-anthracite to-gray-700 text-white rounded-xl font-medium shadow-lg shadow-anthracite/20 hover:shadow-xl hover:shadow-anthracite/30 transition-all duration-300 hover:-translate-y-0.5 group">
                            <svg className="w-5 h-5 group-hover:animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Teljes műszaki leírás letöltése (PDF)
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
