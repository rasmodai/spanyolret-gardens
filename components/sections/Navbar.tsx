'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { scrollToElement } from '@/lib/utils';
import ThemeToggle from '@/components/ui/ThemeToggle';

/* Was a floating dark-glass capsule: rounded-2xl, backdrop-blur(20px), a
 * hardcoded navy background, shadow-2xl and a hover:scale CTA. Frosted glass
 * does not exist in this project (DESIGN.md → Anti-Patterns).
 *
 * Now: a paper bar that sits flush to the top edge with a single hairline
 * under it. No radius, no elevation, no blur. It still only appears after the
 * poster has done its job.
 */

const navLinks = [
    { label: 'Overview', href: '#property-overview' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'The six gardens', href: '#floor-plans' },
    { label: 'Location', href: '#location' },
];

export default function Navbar() {
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
            aria-label="Section navigation"
            className={`fixed inset-x-0 top-0 z-50 border-b border-line bg-paper transition-[opacity,transform] duration-medium ease-enter ${
                isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'
            }`}
        >
            <div className="section-container flex items-center justify-between gap-6 py-3">
                <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="-my-2 flex min-h-[44px] items-center gap-3 py-2"
                    aria-label="Back to top"
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
                                className={`tab-link ${
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
                    <ThemeToggle />
                    <button
                        type="button"
                        onClick={() => scrollToElement('lead-form')}
                        className="btn btn-primary !px-5 !py-2.5 !text-sm"
                    >
                        Book a viewing
                    </button>
                </div>
            </div>
        </nav>
    );
}
