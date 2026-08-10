'use client';

import { useEffect, useState } from 'react';
import { units } from '@/lib/data';
import { scrollToElement } from '@/lib/utils';

interface FloatingBadgeProps {
    locale?: 'en' | 'hu';
}

/* Was: a navy gradient pill with a pulsing ring, backdrop blur, a hover scale
 * and the words "Limited Availability" — manufactured urgency, banned by
 * DESIGN.md → Anti-Patterns, and read as a sales tactic by exactly this buyer.
 *
 * The underlying number is genuinely true (two of the six are marked sold in
 * lib/data.ts), so the fact stays and the theatre goes. It is derived from the
 * data rather than passed in as a prop that defaulted to 4 and would have gone
 * stale the moment a unit sold.
 *
 * It only appears once the hero has scrolled past. On a 375px viewport it was
 * otherwise sitting on top of the hero's second CTA — and gating on scroll
 * fixes that at the root rather than hiding the badge on small screens.
 */
export default function FloatingBadge({ locale = 'en' }: FloatingBadgeProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsVisible(window.scrollY > window.innerHeight * 0.9);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const total = units.length;
    const available = units.filter((u) => u.status === 'available').length;

    if (available === 0) return null;

    const label =
        locale === 'hu'
            ? `${available} szabad a ${total} házból`
            : `${available} of ${total} still available`;

    return (
        <button
            type="button"
            onClick={() => scrollToElement('floor-plans')}
            aria-hidden={!isVisible}
            tabIndex={isVisible ? 0 : -1}
            className={`fixed bottom-0 right-0 z-40 border-l border-t border-line bg-paper px-5 py-3 text-left transition-[opacity,transform] duration-medium ease-enter hover:bg-paper-deep ${
                isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
            }`}
        >
            <span className="measure text-[0.9375rem] text-ink">{label}</span>
            <span className="caption ml-3 hidden sm:inline">
                {locale === 'hu' ? 'Alaprajzok' : 'Floor plans'} →
            </span>
        </button>
    );
}
