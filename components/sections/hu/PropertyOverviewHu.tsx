'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { propertyStatsHu, uiTextsHu } from '@/lib/data-hu';
import { HomeIcon, ExpandIcon, TreeIcon, DoorIcon, BathIcon, CalendarCheckIcon } from '@/components/ui/Icons';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }
};

export default function PropertyOverviewHu() {
    const t = uiTextsHu.propertyOverview;

    const getIcon = (iconName: string) => {
        const icons: Record<string, React.ReactNode> = {
            home: <HomeIcon size={28} />,
            expand: <ExpandIcon size={28} />,
            tree: <TreeIcon size={28} />,
            door: <DoorIcon size={28} />,
            bath: <BathIcon size={28} />,
            'calendar-check': <CalendarCheckIcon size={28} />
        };
        return icons[iconName] || null;
    };

    return (
        <section id="property-overview" className="section-padding bg-facade relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 noise-overlay opacity-[0.02]" />
                <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl animate-[breathe_10s_ease-in-out_infinite]" />
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl animate-[breathe_12s_ease-in-out_infinite_2s]" />
            </div>

            <div className="section-container relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.span variants={itemVariants} className="section-badge mb-4">
                            {t.badge}
                        </motion.span>
                        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-anthracite mb-4">
                            {t.title}
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-8">
                            {t.subtitle}
                        </motion.p>

                        <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {propertyStatsHu.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow"
                                >
                                    <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mb-3 text-primary">
                                        {getIcon(stat.icon)}
                                    </div>
                                    <div className="text-2xl font-bold text-anthracite">{stat.value}</div>
                                    <div className="text-sm text-gray-500">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="relative"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="/assets/renders/Aerial (1).webp"
                                alt="Spanyolrét Gardens légi felvétel"
                                width={800}
                                height={600}
                                className="w-full h-auto"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>

                        <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-green-500 rounded-xl flex items-center justify-center">
                                    <CalendarCheckIcon size={24} className="text-white" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Átadás</div>
                                    <div className="font-bold text-anthracite">2026. ősz</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
