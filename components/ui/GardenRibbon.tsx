'use client';

import { useEffect, useRef, useState } from 'react';

/* The signature pattern. DESIGN.md → Signature Patterns → The garden ribbon.
 *
 * Every house shows its garden as a bar proportional to its real area, scaled
 * against the largest garden in the development (B2, sold). A2 is nearly twice
 * B1, and that reads before anyone gets to the number.
 *
 * The browser receives the width already computed and the words already
 * written (lib/houses-view.ts): the scale is derived from the data on the
 * server, never hardcoded, so if a house's area changes every bar moves with
 * it, and nothing from lib/data.ts is shipped to the client.
 *
 * This makes B1 visibly the smallest, and that is accepted. The whole value of
 * the pattern is that it is honest. Do not rescale to flatten the difference.
 *
 * The fill animation is the one piece of motion in the system that carries
 * information rather than decoration, so it survives the ban on entrance
 * animation flourishes — but it still respects prefers-reduced-motion.
 */

export interface GardenRibbonProps {
    area: string;
    percent: number;
    percentLabel: string;
    ariaLabel: string;
    gardenWord: string;
    /** Dim the bar for houses that are no longer available. */
    muted?: boolean;
}

export default function GardenRibbon({ area, percent, percentLabel, ariaLabel, gardenWord, muted = false }: GardenRibbonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [filled, setFilled] = useState(false);

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

    return (
        <div ref={ref}>
            <div className="mb-2 flex items-baseline justify-between gap-3">
                <span className="measure text-sm text-ink">
                    {area} <span className="text-ink-soft">{gardenWord}</span>
                </span>
                <span className="caption">{percentLabel}</span>
            </div>

            <div className="relative h-6 border border-line bg-paper-deep" role="img" aria-label={ariaLabel}>
                <div
                    className={muted ? 'absolute inset-y-0 left-0 bg-ink-soft' : 'absolute inset-y-0 left-0 bg-lawn'}
                    style={{
                        width: filled ? `${percent}%` : '0%',
                        transition: 'width 600ms cubic-bezier(0.22, 0.61, 0.36, 1)',
                    }}
                />
            </div>
        </div>
    );
}
