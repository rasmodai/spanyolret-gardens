'use client';

import { motion } from 'framer-motion';
import { benefitsHu, uiTextsHu } from '@/lib/data-hu';
import {
    HeatIcon, SoundproofIcon, SolarIcon, SmartIcon,
    SecureIcon, CustomizeIcon, QualityIcon, GardenIcon
} from '@/components/ui/Icons';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }
};

export default function BenefitsHu() {
    const t = uiTextsHu.benefits;

    const getIcon = (iconName: string) => {
        const icons: Record<string, React.ReactNode> = {
            heat: <HeatIcon size={28} />,
            soundproof: <SoundproofIcon size={28} />,
            solar: <SolarIcon size={28} />,
            smart: <SmartIcon size={28} />,
            secure: <SecureIcon size={28} />,
            customize: <CustomizeIcon size={28} />,
            quality: <QualityIcon size={28} />,
            garden: <GardenIcon size={28} />
        };
        return icons[iconName] || null;
    };

    return (
        <section id="benefits" className="section-padding bg-white relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 noise-overlay opacity-[0.01]" />
                <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl animate-[breathe_10s_ease-in-out_infinite]" />
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-secondary/5 to-transparent rounded-full blur-3xl animate-[breathe_12s_ease-in-out_infinite_2s]" />
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

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {benefitsHu.map((benefit, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mb-4 text-primary group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                                {getIcon(benefit.icon)}
                            </div>

                            <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded-full mb-3">
                                {benefit.highlight}
                            </span>

                            <h3 className="text-lg font-bold text-anthracite mb-2">{benefit.title}</h3>
                            <p className="text-gray-600 text-sm">{benefit.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
