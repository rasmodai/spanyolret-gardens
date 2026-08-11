'use client';

import { useEffect, useRef, useState } from 'react';
import { units } from '@/lib/data';
import { formatArea, gardenRibbonWidth, type Locale } from '@/lib/utils';

/* The signature pattern. DESIGN.md → Signature Patterns → The garden ribbon.
 *
 * Every unit shows its garden as a bar proportional to its real area, scaled
 * against the largest garden in the development (B3, 316.84 m²). B3 is more
 * than three times B2, and that reads before anyone gets to the number.
 *
 * The scale denominator is derived from the data, never hardcoded: if a unit's
 * area changes, every bar moves with it.
 *
 * This makes B2 visibly the smallest, and that is accepted. The whole value of
 * the pattern is that it is honest — a buyer who can see B2 is smallest will
 * believe the number on B3. Do not rescale to flatten the difference.
 *
 * The fill animation is the one piece of motion in the system that carries
 * information rather than decoration, so it survives the ban on entrance
 * animation flourishes — but it still respects prefers-reduced-motion.
 */

const LARGEST_GARDEN = Math.max(...units.map((u) => u.gardenArea));

interface GardenRibbonProps {
    gardenArea: number;
    locale?: Locale;
    /** Dim the bar for units that are no longer available. */
    muted?: boolean;
    showScale?: boolean;
}

export default function GardenRibbon({
    gardenArea,
    locale = 'en',
    muted = false,
    showScale = false,
}: GardenRibbonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [filled, setFilled] = useState(false);
    const target = gardenRibbonWidth(gardenArea, LARGEST_GARDEN);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setFilled(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setFilled(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.4 }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const label = locale === 'hu' ? 'kert' : 'garden';

    return (
        <div ref={ref}>
            <div className="mb-2 flex items-baseline justify-between gap-3">
                <span className="measure text-sm text-ink">
                    {formatArea(gardenArea, locale)}{' '}
                    <span className="text-ink-soft">{label}</span>
                </span>
                <span className="caption">
                    {Math.round(target)}% {locale === 'hu' ? 'a legnagyobbhoz' : 'of the largest'}
                </span>
            </div>

            <div
                className="relative h-6 border border-line bg-paper-deep"
                role="img"
                aria-label={
                    locale === 'hu'
                        ? `${formatArea(gardenArea, locale)} kert, a legnagyobb kert ${Math.round(target)} százaléka`
                        : `${formatArea(gardenArea, locale)} garden, ${Math.round(target)} percent of the largest garden`
                }
            >
                <div
                    className={muted ? 'absolute inset-y-0 left-0 bg-ink-soft' : 'absolute inset-y-0 left-0 bg-lawn'}
                    style={{
                        width: filled ? `${target}%` : '0%',
                        transition: 'width 600ms cubic-bezier(0.22, 0.61, 0.36, 1)',
                    }}
                />
            </div>

            {showScale && (
                <div className="mt-2 flex justify-between">
                    <span className="caption">0 m²</span>
                    <span className="caption">{formatArea(LARGEST_GARDEN, locale)}</span>
                </div>
            )}
        </div>
    );
}
