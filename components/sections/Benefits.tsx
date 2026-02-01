'use client';

'use client';

import { motion } from 'framer-motion';
import {
    IconGradients,
    PremiumHeatIcon,
    PremiumSoundproofIcon,
    PremiumSolarIcon,
    PremiumSmartIcon,
    PremiumSecureIcon,
    PremiumCustomizeIcon,
    PremiumQualityIcon,
    PremiumGardenIcon
} from '@/components/ui/PremiumIcons';
import { benefits } from '@/lib/data';

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

export default function Benefits() {
    const getIcon = (iconName: string) => {
        const icons: Record<string, React.ReactNode> = {
            heat: <PremiumHeatIcon size={56} />,
            soundproof: <PremiumSoundproofIcon size={56} />,
            solar: <PremiumSolarIcon size={56} />,
            smart: <PremiumSmartIcon size={56} />,
            secure: <PremiumSecureIcon size={56} />,
            customize: <PremiumCustomizeIcon size={56} />,
            quality: <PremiumQualityIcon size={56} />,
            garden: <PremiumGardenIcon size={56} />
        };
        return icons[iconName] || null;
    };

    return (
        <section id="benefits" className="section-padding bg-gradient-to-b from-white via-facade/30 to-facade relative overflow-hidden">
            {/* Gradient definitions for icons */}
            <IconGradients />

            {/* Premium ambient background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Noise texture overlay */}
                <div className="absolute inset-0 noise-overlay opacity-[0.02]" />

                {/* Floating gradient orbs with staggered animation */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-[breathe_12s_ease-in-out_infinite]" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-secondary/10 to-primary/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl animate-[breathe_10s_ease-in-out_infinite_2s]" />
                <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-golden/8 to-transparent rounded-full blur-3xl animate-[breathe_8s_ease-in-out_infinite_1s]" />

                {/* Decorative lines */}
                <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
                <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/10 to-transparent" />
            </div>

            <div className="section-container relative z-10">
                {/* Section Header - Premium styling */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4 tracking-wide">
                        PREMIUM FEATURES
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-anthracite mb-4">
                        Built for Modern Family Life
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Every detail of Spanyolrét Gardens is designed for comfortable, efficient family living.
                    </p>
                </div>

                {/* Benefits Grid - Premium card styling */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
                >
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group card-premium text-center relative overflow-hidden"
                        >
                            {/* Hover gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Icon */}
                            <div className="relative z-10 mb-6 inline-block">
                                {getIcon(benefit.icon)}
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-anthracite mb-3 group-hover:text-primary transition-colors duration-300">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                    {benefit.description}
                                </p>
                                <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-secondary/20 to-secondary/10 text-secondary text-sm font-semibold rounded-full">
                                    {benefit.highlight}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
