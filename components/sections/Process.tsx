'use client';

import { motion } from 'framer-motion';
import {
    CalendarIcon,
    MapMarkerIcon,
    HomeIcon,
    FileIcon,
    CheckCircleIcon,
    KeyIcon,
    CheckIcon
} from '@/components/ui/Icons';
import { processSteps, processReassurance } from '@/lib/data';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut" as const
        }
    }
};

export default function Process() {
    const getIcon = (iconName: string) => {
        const icons: Record<string, React.ReactNode> = {
            calendar: <CalendarIcon size={28} />,
            'map-marker': <MapMarkerIcon size={28} />,
            home: <HomeIcon size={28} />,
            file: <FileIcon size={28} />,
            'check-circle': <CheckCircleIcon size={28} />,
            key: <KeyIcon size={28} />
        };
        return icons[iconName] || null;
    };

    return (
        <section id="process" className="section-padding bg-facade relative overflow-hidden">
            {/* Premium ambient background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Noise texture overlay */}
                <div className="absolute inset-0 noise-overlay opacity-[0.02]" />

                {/* Floating gradient orbs */}
                <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-primary/6 to-transparent rounded-full blur-3xl animate-[breathe_11s_ease-in-out_infinite]" />
                <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-tl from-secondary/6 to-transparent rounded-full blur-3xl animate-[breathe_9s_ease-in-out_infinite_1s]" />

                {/* Vertical timeline glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-px h-1/2 bg-gradient-to-b from-transparent via-primary/15 to-transparent" />
            </div>

            <div className="section-container relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-anthracite mb-4">
                        Your Path to Ownership
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Simple steps to your new home. We guide you through every stage.
                    </p>
                </div>

                {/* Process Steps */}
                <div className="relative max-w-4xl mx-auto mb-12">
                    {/* Connection Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gray-300 md:-translate-x-1/2 hidden md:block" />

                    <div className="space-y-8 md:space-y-12">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, delay: index * 0.1 }}
                                className={`relative flex items-start gap-6 md:gap-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Step Number */}
                                <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold z-10 hidden md:flex shadow-[0_0_0_4px_white]">
                                    {step.step}
                                </div>

                                {/* Content Card */}
                                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                                    <div className="card-premium ml-16 md:ml-0 rounded-2xl">
                                        <div className="flex items-center gap-4 mb-3">
                                            {/* Mobile Step Number */}
                                            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm md:hidden">
                                                {step.step}
                                            </div>
                                            <div className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center text-primary hidden md:flex">
                                                {getIcon(step.icon)}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-anthracite">{step.title}</h3>
                                                <span className="text-sm text-gray-500">{step.duration}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 md:ml-16 leading-relaxed">{step.description}</p>
                                    </div>
                                </div>

                                {/* Spacer for alternating layout */}
                                <div className="hidden md:block flex-1" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Reassurance */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="bg-white rounded-2xl p-8 max-w-2xl mx-auto shadow-lg border border-gray-100"
                >
                    <h3 className="font-bold text-xl text-anthracite mb-4 text-center">
                        We Guide You Through Every Step
                    </h3>
                    <ul className="grid md:grid-cols-2 gap-3">
                        {processReassurance.map((point, index) => (
                            <motion.li key={index} variants={itemVariants} className="flex items-center gap-3">
                                <CheckIcon size={20} className="text-secondary flex-shrink-0" />
                                <span className="text-gray-700">{point}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </section>
    );
}
