'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { scrollToElement } from '@/lib/utils';
import ThemeToggle from '@/components/ui/ThemeToggle';

/* Mirror of components/sections/Navbar.tsx. Paper bar, one hairline, no glass,
 * no radius, no elevation. DESIGN.md → Duplicated component trees. */

const navLinks = [
    { label: 'Áttekintés', href: '#property-overview' },
    { label: 'Galéria', href: '#gallery' },
    { label: 'A hat kert', href: '#floor-plans' },
    { label: 'Lokáció', href: '#location' },
];

export default function NavbarHu() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > window.innerHeight * 0.7);

            for (const section of navLinks.map((l) => l.href.slice(1)).reverse()) {
                const el = document.getElementById(section);
                if (el && el.getBoundingClientRect().top <= 150) {
                    setActiveSection(section);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            aria-label="Szakasznavigáció"
            className={`fixed inset-x-0 top-0 z-50 border-b border-line bg-paper transition-[opacity,transform] duration-medium ease-enter ${
                isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'
            }`}
        >
            <div className="section-container flex items-center justify-between gap-6 py-3">
                <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="-my-2 flex min-h-[44px] items-center gap-3 py-2"
                    aria-label="Vissza a tetejére"
                >
                    <Image
                        src="/espatrick-bau-logo.png"
                        alt="S-Patrik Bau"
                        width={120}
                        height={36}
                        className="h-7 w-auto object-contain"
                    />
                </button>

                <div className="hidden items-center gap-7 md:flex">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.slice(1);
                        return (
                            <button
                                key={link.href}
                                type="button"
                                onClick={() => scrollToElement(link.href.slice(1))}
                                className={`tab-link wrap-compound ${
                                    isActive
                                        ? 'border-clay !text-ink'
                                        : 'border-transparent hover:!text-ink'
                                }`}
                            >
                                {link.label}
                            </button>
                        );
                    })}
                </div>

                <div className="flex items-center gap-6">
                    <ThemeToggle locale="hu" />
                    <button
                        type="button"
                        onClick={() => scrollToElement('lead-form')}
                        className="btn btn-primary !px-5 !py-2.5 !text-sm"
                    >
                        Időpontot kérek
                    </button>
                </div>
            </div>
        </nav>
    );
}
