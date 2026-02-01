'use client';

import { motion } from 'framer-motion';
import { BuildingIcon, CalendarIcon, ShieldIcon, AwardIcon } from '@/components/ui/Icons';
import { WienerbergerLogo, LegrandLogo, VekaLogo, SiemensLogo, BoschLogo } from '@/components/ui/BrandLogos';
import { trustBarItems } from '@/lib/data';

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

export default function TrustBar() {
    const getIcon = (iconName: string) => {
        const icons: Record<string, React.ReactNode> = {
            building: <BuildingIcon size={28} />,
            calendar: <CalendarIcon size={28} />,
            shield: <ShieldIcon size={28} />,
            award: <AwardIcon size={28} />
        };
        return icons[iconName] || null;
    };

    const brandLogos = [
        { id: 'wienerberger', Component: WienerbergerLogo },
        { id: 'veka', Component: VekaLogo },
        { id: 'siemens', Component: SiemensLogo },
        { id: 'legrand', Component: LegrandLogo },
        { id: 'bosch', Component: BoschLogo },
    ];

    return (
        <section className="bg-white py-12 border-y border-gray-100/50 relative overflow-hidden">
            {/* Subtle ambient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white pointer-events-none" />

            <div className="section-container relative z-10">
                {/* Stats - Premium styling with stagger */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12"
                >
                    {trustBarItems.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="flex items-center justify-center gap-4 group"
                        >
                            <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-sm ambient-glow">
                                {getIcon(item.icon)}
                            </div>
                            <div>
                                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent tabular-nums">
                                    {item.value}
                                </div>
                                <div className="text-xs md:text-sm text-gray-500 font-medium tracking-wide">
                                    {item.label}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Brand Logos - Premium styling with stagger */}
                <div className="border-t border-gray-100 pt-10">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center text-sm text-gray-400 mb-10 uppercase tracking-widest font-medium"
                    >
                        Built with Premium European Materials
                    </motion.p>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.08, delayChildren: 0.3 }
                            }
                        }}
                        className="flex flex-wrap justify-center items-center gap-10 md:gap-16 lg:gap-24"
                    >
                        {brandLogos.map(({ id, Component }) => (
                            <motion.div
                                key={id}
                                variants={logoVariants}
                                whileHover={{ opacity: 1, scale: 1.08 }}
                                className="transition-all duration-300 cursor-pointer"
                            >
                                <Component height={34} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

