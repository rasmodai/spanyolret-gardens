'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckIcon } from '@/components/ui/Icons';
import { developerStats, qualityPromises } from '@/lib/data';

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
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut' as const
        }
    }
};

export default function Developer() {
    return (
        <section id="developer" className="section-padding bg-anthracite text-white relative overflow-hidden">
            {/* Premium ambient background for dark section */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Noise texture overlay */}
                <div className="absolute inset-0 noise-overlay opacity-[0.04]" />

                {/* Floating gradient orbs */}
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl animate-[breathe_12s_ease-in-out_infinite]" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl animate-[breathe_10s_ease-in-out_infinite_2s]" />
                <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-br from-primary/8 to-transparent rounded-full blur-3xl animate-[breathe_8s_ease-in-out_infinite_1s]" />

                {/* Architectural accent lines */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
                <div className="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-secondary/15 to-transparent" />
                <div className="absolute bottom-1/4 right-0 w-1/3 h-px bg-gradient-to-l from-secondary/15 to-transparent" />
            </div>

            <div className="section-container relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="grid lg:grid-cols-2 gap-12 items-center"
                >
                    {/* Content */}
                    <motion.div variants={itemVariants}>
                        {/* Logo */}
                        <div className="mb-6">
                            <div className="inline-block bg-white rounded-xl px-4 py-2">
                                <Image
                                    src="/espatrick-bau-logo.png"
                                    alt="S-Patrik Bau"
                                    width={180}
                                    height={54}
                                    className="h-10 md:h-14 w-auto object-contain"
                                />
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
                            Built by S-Patrik Bau
                        </h2>
                        <p className="text-xl text-white/70 mb-6">
                            13 Years of Premium Construction in Budapest
                        </p>

                        <p className="text-white/80 mb-8 leading-relaxed">
                            S-Patrik Bau has been developing premium residential properties in Budapest since 2012.
                            With over 50 completed projects, we've built our reputation on quality construction,
                            premium materials, and on-time delivery. Every Spanyolrét Gardens home is built with
                            the same attention to detail that has made us one of Budapest's most trusted developers.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                            {developerStats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-secondary">{stat.value}</div>
                                    <div className="text-sm text-white/60">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Quality Promises */}
                        <div className="bg-white/5 rounded-2xl p-6">
                            <h3 className="font-bold text-lg mb-4">Our Promise to You</h3>
                            <ul className="space-y-3">
                                {qualityPromises.map((promise, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                                            <CheckIcon size={14} className="text-white" />
                                        </div>
                                        <span className="text-white/80">{promise}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Image/Visual Placeholder */}
                    <motion.div variants={itemVariants} className="relative">
                        <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 aspect-square flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-6xl mb-4">🏗️</div>
                                <h3 className="text-xl font-bold mb-2">Developer Portfolio</h3>
                                <p className="text-white/60 mb-4">
                                    Showcase of completed projects and construction quality
                                </p>
                                <div className="inline-block px-4 py-2 bg-yellow-400 text-yellow-900 rounded-lg text-sm font-medium">
                                    📷 Portfolio Image Placeholder
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-4 -right-4 bg-secondary text-white px-6 py-3 rounded-xl shadow-lg">
                            <div className="text-2xl font-bold">50+</div>
                            <div className="text-sm">Projects</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
