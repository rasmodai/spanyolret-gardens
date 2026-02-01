'use client';

import { motion } from 'framer-motion';
import { BuildingIcon, CalendarIcon, ShieldIcon, AwardIcon } from '@/components/ui/Icons';
import { WienerbergerLogo, LegrandLogo, VekaLogo, SiemensLogo, BoschLogo } from '@/components/ui/BrandLogos';
import { trustBarItemsHu } from '@/lib/data-hu';

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

const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 0.7,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: 'easeOut' as const
        }
    }
};

export default function TrustBarHu() {
    const getIcon = (iconName: string) => {
        const icons: Record<string, React.ReactNode> = {
            building: <BuildingIcon size={28} />,
            calendar: <CalendarIcon size={28} />,
            shield: <ShieldIcon size={28} />,
            award: <AwardIcon size={28} />
        };
        return icons[iconName] || null;
    };

    return (
        <section className="py-12 md:py-16 bg-gradient-to-b from-white via-white to-facade relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 noise-overlay opacity-[0.02]" />
            </div>

            <div className="section-container relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12"
                >
                    {trustBarItemsHu.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="text-center group"
                        >
                            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 group-hover:scale-110">
                                {getIcon(item.icon)}
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-anthracite mb-1 font-display">
                                {item.value}
                            </div>
                            <div className="text-sm text-gray-500 font-medium">
                                {item.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="border-t border-gray-200 pt-10"
                >
                    <motion.p variants={itemVariants} className="text-center text-sm text-gray-400 mb-6 uppercase tracking-widest">
                        Prémium partnerek
                    </motion.p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                        {[WienerbergerLogo, LegrandLogo, VekaLogo, SiemensLogo, BoschLogo].map((Logo, index) => (
                            <motion.div
                                key={index}
                                variants={logoVariants}
                                className="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                            >
                                <Logo className="h-8 md:h-10 w-auto" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
