'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MailIcon, MapMarkerIcon } from '@/components/ui/Icons';
import { uiTextsHu } from '@/lib/data-hu';

const companyDetails = {
    name: 'S-Patrik Bau Kft.',
    email: 'info@spatrikbau.com',
    phone: '+36 1 234 5678',
    address: 'Spanyolréti út, 1116 Budapest',
    taxNumber: '24304559213',
    registrationNumber: '13 09 220814',
    website: 'spatrikbau.com'
};

const quickLinks = [
    { href: '#property-overview', label: 'Áttekintés' },
    { href: '#floor-plans', label: 'Alaprajzok' },
    { href: '#location', label: 'Lokáció' },
    { href: '#faq', label: 'GYIK' },
    { href: '#lead-form', label: 'Kapcsolat' },
];

export default function FooterHu() {
    const t = uiTextsHu.footer;

    return (
        <footer className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] via-anthracite to-[#1a1f2e]" />

            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 section-container pt-20 pb-12">
                {/* Brand */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex justify-center mb-6">
                        <div className="bg-white rounded-xl px-5 py-3">
                            <Image
                                src="/espatrick-bau-logo.png"
                                alt="S-Patrik Bau"
                                width={200}
                                height={60}
                                className="h-12 md:h-16 w-auto object-contain"
                            />
                        </div>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
                        Spanyolrét <span className="bg-gradient-to-r from-secondary via-green-400 to-secondary bg-clip-text text-transparent">Gardens</span>
                    </h2>
                    <p className="text-lg text-white/50 max-w-md mx-auto">
                        {t.tagline}
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-6">{t.contact}</h3>
                        <div className="space-y-4">
                            <a
                                href={`mailto:${companyDetails.email}`}
                                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                    <MailIcon size={18} />
                                </div>
                                <span>{companyDetails.email}</span>
                            </a>
                            <div className="flex items-center gap-3 text-white/70">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                    <MapMarkerIcon size={18} />
                                </div>
                                <span>{companyDetails.address}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-6">{t.quickLinks}</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-white/70 hover:text-white transition-colors link-underline inline-block pb-0.5"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Developer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h3 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-6">{t.developer}</h3>
                        <p className="text-white font-medium mb-4">{companyDetails.name}</p>
                        <div className="space-y-2 text-sm">
                            <div className="text-white/50">
                                <span className="text-white/30">Adószám: </span>
                                <span className="tabular-nums">{companyDetails.taxNumber}</span>
                            </div>
                            <div className="text-white/50">
                                <span className="text-white/30">Cégj.sz.: </span>
                                <span className="tabular-nums">{companyDetails.registrationNumber}</span>
                            </div>
                        </div>
                        <a
                            href={`https://${companyDetails.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-4 text-secondary hover:text-secondary/80 transition-colors"
                        >
                            {companyDetails.website} →
                        </a>
                    </motion.div>

                    {/* Social */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h3 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-6">{t.connect}</h3>
                        <div className="flex gap-3 mb-8">
                            {['Facebook', 'Instagram', 'LinkedIn'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110 group"
                                    aria-label={social}
                                >
                                    {social === 'Facebook' && (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white/60 group-hover:text-white transition-colors">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                        </svg>
                                    )}
                                    {social === 'Instagram' && (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60 group-hover:text-white transition-colors">
                                            <rect x="2" y="2" width="20" height="20" rx="5" />
                                            <circle cx="12" cy="12" r="4" />
                                            <circle cx="18" cy="6" r="1.5" fill="currentColor" />
                                        </svg>
                                    )}
                                    {social === 'LinkedIn' && (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white/60 group-hover:text-white transition-colors">
                                            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
                                        </svg>
                                    )}
                                </a>
                            ))}
                        </div>

                        {/* Trust Badge */}
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-green-500 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-white text-sm font-medium">{t.verifiedDeveloper}</div>
                                    <div className="text-white/40 text-xs">{t.licensedInsured}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-white/40">
                            {t.copyright}
                        </div>
                        <div className="flex gap-6 text-sm">
                            <a href="#" className="text-white/40 hover:text-white/70 transition-colors link-underline">
                                {t.privacy}
                            </a>
                            <a href="#" className="text-white/40 hover:text-white/70 transition-colors link-underline">
                                {t.cookies}
                            </a>
                            <a href="#" className="text-white/40 hover:text-white/70 transition-colors link-underline">
                                {t.terms}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
