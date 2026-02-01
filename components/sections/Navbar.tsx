'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { label: 'Overview', href: '#property-overview' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Floor Plans', href: '#floor-plans' },
    { label: 'Location', href: '#location' },
];

export default function Navbar() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            // Show navbar after scrolling past hero (100vh)
            const heroHeight = window.innerHeight;
            setIsVisible(window.scrollY > heroHeight * 0.7);

            // Determine active section
            const sections = navLinks.map(link => link.href.slice(1));
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToForm = () => {
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="fixed top-0 left-0 right-0 z-50"
                >
                    <div className="mx-4 mt-4">
                        <div className="max-w-6xl mx-auto">
                            <div
                                className="flex items-center justify-between px-6 py-3 rounded-2xl border border-white/10 shadow-2xl"
                                style={{
                                    background: 'rgba(10, 22, 40, 0.85)',
                                    backdropFilter: 'blur(20px)',
                                    WebkitBackdropFilter: 'blur(20px)',
                                }}
                            >
                                {/* Logo / Brand */}
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="flex items-center gap-3 group"
                                >
                                    <div className="bg-white rounded-lg px-3 py-1.5">
                                        <Image
                                            src="/espatrick-bau-logo.png"
                                            alt="S-Patrik Bau"
                                            width={120}
                                            height={36}
                                            className="h-7 sm:h-8 w-auto object-contain"
                                        />
                                    </div>
                                </button>

                                {/* Navigation Links */}
                                <div className="hidden md:flex items-center gap-1">
                                    {navLinks.map((link) => (
                                        <button
                                            key={link.href}
                                            onClick={() => scrollToSection(link.href)}
                                            className={`
                                                px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative group
                                                ${activeSection === link.href.slice(1)
                                                    ? 'text-white bg-white/10'
                                                    : 'text-white/70 hover:text-white'
                                                }
                                            `}
                                        >
                                            {link.label}
                                            <span className={`absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-secondary to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${activeSection === link.href.slice(1) ? 'scale-x-100' : ''}`} />
                                        </button>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <button
                                    onClick={scrollToForm}
                                    className="px-5 py-2.5 bg-gradient-to-r from-secondary to-green-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40 transition-all duration-300 hover:scale-105 btn-magnetic"
                                >
                                    <span className="hidden sm:inline">Request Viewing</span>
                                    <span className="sm:hidden">Contact</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}
