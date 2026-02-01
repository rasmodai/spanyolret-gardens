'use client';

import { motion } from 'framer-motion';
import { MetroIcon, BusIcon, CarIcon, PlaneIcon, CheckIcon } from '@/components/ui/Icons';
import { transportLinksHu, nearbyAmenitiesHu, neighborhoodHighlightsHu, uiTextsHu } from '@/lib/data-hu';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }
};

export default function LocationHu() {
    const t = uiTextsHu.location;

    const getTransportIcon = (iconName: string) => {
        const icons: Record<string, React.ReactNode> = {
            metro: <MetroIcon size={24} />,
            bus: <BusIcon size={24} />,
            car: <CarIcon size={24} />,
            plane: <PlaneIcon size={24} />
        };
        return icons[iconName] || null;
    };

    return (
        <section id="location" className="section-padding bg-gradient-to-b from-facade to-white relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 noise-overlay opacity-[0.015]" />
                <div className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-br from-primary/6 to-transparent rounded-full blur-3xl animate-[breathe_9s_ease-in-out_infinite]" />
            </div>

            <div className="section-container relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="section-badge mb-4">{t.badge}</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-anthracite mb-4">
                        {t.title}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-10">
                    {/* Map */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="order-2 lg:order-1"
                    >
                        <div className="rounded-2xl overflow-hidden shadow-xl h-[450px]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2697.1234567890123!2d19.0123456!3d47.4567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741ddc7e0c8f4b7%3A0x1234567890abcdef!2sSpanyolr%C3%A9ti%20%C3%BAt%2C%20Budapest%2C%20Hungary!5e0!3m2!1shu!2shu!4v1702900000000!5m2!1shu!2shu"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Spanyolrét Gardens helyszín"
                                className="w-full h-full"
                            />
                        </div>
                        <div className="mt-4 text-center">
                            <a
                                href="https://www.google.com/maps/search/Spanyolréti+út,+Budapest+1116"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                {t.openInMaps}
                            </a>
                        </div>
                    </motion.div>

                    {/* Details */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="order-1 lg:order-2 space-y-8"
                    >
                        {/* Address */}
                        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <h3 className="text-xl font-bold text-anthracite mb-2">{t.address}</h3>
                            <p className="text-gray-600">Spanyolréti út, 1116 Budapest</p>
                            <p className="text-gray-500 text-sm">XI. kerület (Újbuda)</p>
                        </motion.div>

                        {/* Transport */}
                        <motion.div variants={itemVariants}>
                            <h3 className="text-xl font-bold text-anthracite mb-4">{t.gettingAround}</h3>
                            <div className="space-y-3">
                                {transportLinksHu.map((link, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center text-primary">
                                            {getTransportIcon(link.icon)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-anthracite">{link.name}</div>
                                            <div className="text-sm text-gray-500">{link.time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Neighborhood */}
                        <motion.div variants={itemVariants}>
                            <h3 className="text-xl font-bold text-anthracite mb-4">{t.neighborhood}</h3>
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100/50">
                                <ul className="space-y-3">
                                    {neighborhoodHighlightsHu.map((highlight, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <CheckIcon size={20} className="text-secondary flex-shrink-0" />
                                            <span className="text-gray-700">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Amenities */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="mt-14"
                >
                    <motion.h3 variants={itemVariants} className="text-xl font-bold text-anthracite mb-6 text-center">
                        {t.nearbyAmenities}
                    </motion.h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {nearbyAmenitiesHu.map((amenity, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-shadow"
                            >
                                <h4 className="font-bold text-primary mb-3">{amenity.category}</h4>
                                <ul className="space-y-2">
                                    {amenity.items.map((item, itemIndex) => (
                                        <li key={itemIndex} className="text-sm text-gray-600 flex items-start gap-2">
                                            <span className="text-secondary mt-1">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
