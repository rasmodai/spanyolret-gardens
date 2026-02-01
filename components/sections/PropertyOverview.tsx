'use client';

'use client';

import { motion } from 'framer-motion';
import {
    IconGradients,
    PremiumHomeIcon,
    PremiumExpandIcon,
    PremiumTreeIcon,
} from '@/components/ui/PremiumIcons';
import { DoorIcon, BathIcon, CalendarCheckIcon } from '@/components/ui/Icons';
import { propertyStats } from '@/lib/data';
import Button from '@/components/ui/Button';

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

export default function PropertyOverview() {
    const getIcon = (iconName: string, premium: boolean = false) => {
        if (premium) {
            const premiumIcons: Record<string, React.ReactNode> = {
                home: <PremiumHomeIcon size={48} />,
                expand: <PremiumExpandIcon size={48} />,
                tree: <PremiumTreeIcon size={48} />,
            };
            return premiumIcons[iconName] || null;
        }
        const icons: Record<string, React.ReactNode> = {
            door: <DoorIcon size={32} className="text-primary" />,
            bath: <BathIcon size={32} className="text-primary" />,
            'calendar-check': <CalendarCheckIcon size={32} className="text-primary" />
        };
        return icons[iconName] || null;
    };

    const scrollToFloorPlans = () => {
        document.getElementById('floor-plans')?.scrollIntoView({ behavior: 'smooth' });
    };

    // Determine which icons should be premium
    const premiumIconNames = ['home', 'expand', 'tree'];

    return (
        <section id="property-overview" className="section-padding bg-gradient-to-b from-white via-facade/50 to-white relative overflow-hidden">
            {/* Gradient definitions for premium icons */}
            <IconGradients />

            {/* Premium ambient background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Noise texture overlay */}
                <div className="absolute inset-0 noise-overlay opacity-[0.015]" />

                {/* Floating gradient orbs with animation */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary/8 to-secondary/5 rounded-full blur-3xl animate-[breathe_8s_ease-in-out_infinite]" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-secondary/8 to-primary/5 rounded-full blur-3xl animate-[breathe_10s_ease-in-out_infinite_1s]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/3 to-transparent rounded-full blur-3xl" />

                {/* Subtle ambient glow */}
                <div className="absolute top-0 left-1/4 w-1/2 h-40 bg-gradient-to-b from-primary/5 to-transparent blur-2xl" />
            </div>

            <div className="section-container relative z-10">
                {/* Section Header - Premium styling */}
                <div className="text-center mb-16">
                    <span className="section-badge mb-4">
                        AT A GLANCE
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-anthracite mb-4">
                        Spanyolrét Gardens
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Everything you need to know about your future home, in one place.
                    </p>
                </div>

                {/* Stats Grid - Premium cards */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-14"
                >
                    {propertyStats.map((stat, index) => {
                        const isPremiumIcon = premiumIconNames.includes(stat.icon);
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="group card-premium text-center relative overflow-hidden"
                            >
                                {/* Hover gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    <div className="mb-4 flex justify-center">
                                        {isPremiumIcon ? (
                                            getIcon(stat.icon, true)
                                        ) : (
                                            <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
                                                {getIcon(stat.icon, false) as React.ReactNode}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs md:text-sm text-gray-500 font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* CTA */}
                <div className="text-center">
                    <button
                        onClick={scrollToFloorPlans}
                        className="group relative px-10 py-4 bg-gradient-to-r from-primary to-primary/90 text-white font-semibold rounded-xl overflow-hidden shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        <span className="relative z-10">See All Units</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                </div>
            </div>
        </section>
    );
}
