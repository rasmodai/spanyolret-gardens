'use client';

import { useState } from 'react';
import Image from 'next/image';
import { units } from '@/lib/data';
import { formatArea, getStatusLabel } from '@/lib/utils';
import GardenRibbon from '@/components/ui/GardenRibbon';
import { useReveal } from '@/lib/useReveal';
import { scrollToElement } from '@/lib/utils';

type FloorPlanView = 'site' | 'A' | 'B';
type Floor = 'ground' | 'first';

/* The signature section. DESIGN.md → Signature Patterns → The garden ribbon.
 *
 * The units were previously six rounded-3xl cards in a grid, each with its own
 * shadow, a diagonal SOLD banner and a ribbon inside it. That last part was a
 * design failure of mine: a bar drawn to scale is only worth anything if you
 * can lay it against the others, and putting each in its own card made exactly
 * that impossible.
 *
 * Now they are rows on a shared left edge, sorted smallest garden to largest,
 * so the six bars read as one rising column. That is the whole argument of the
 * development in a single glance: same house six times, and the garden is the
 * decision.
 */
export default function FloorPlans() {
    const [floorPlanView, setFloorPlanView] = useState<FloorPlanView>('site');
    const [activeFloor, setActiveFloor] = useState<Floor>('ground');

    const sortedUnits = [...units].sort((a, b) => a.gardenArea - b.gardenArea);
    const planRef = useReveal<HTMLElement>(0.15);

    const getFloorPlanImage = () => {
        if (floorPlanView === 'site') return '/assets/floorplans/site-plan.jpg';
        if (floorPlanView === 'A') {
            return activeFloor === 'ground'
                ? '/assets/floorplans/a-ground-floor.webp'
                : '/assets/floorplans/a-first-floor.webp';
        }
        return activeFloor === 'ground'
            ? '/assets/floorplans/b-ground-floor.webp'
            : '/assets/floorplans/b-first-floor.webp';
    };

    const planTitle =
        floorPlanView === 'site'
            ? 'Complete site layout'
            : `Building ${floorPlanView} — ${activeFloor === 'ground' ? 'ground floor' : 'first floor'}`;

    return (
        <section id="floor-plans" className="section-padding border-t border-line bg-paper">
            <div className="section-container">
                <div className="eyebrow">The six gardens</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l text-ink">Same house six times. The garden is what changes.</h2>
                    <p className="lede self-end">
                        Five rooms, two floors and a 6.60 m² terrace in every one of them. The garden runs
                        from 102.12 m² to 316.84 m² — more than three times the difference, drawn to scale
                        below.
                    </p>
                </div>

                {/* ---- The comparison ------------------------------------- */}
                <div className="mt-14">
                    <div className="scale-sticky hidden items-baseline gap-6 border-b border-line pb-3 pt-4 md:flex">
                        <span className="caption w-16 shrink-0">Unit</span>
                        <span className="caption flex-1">Private garden, to scale</span>
                    </div>

                    {sortedUnits.map((unit) => {
                        const isSold = unit.status !== 'available';
                        return (
                            <article
                                key={unit.id}
                                className="grid gap-x-6 gap-y-3 border-b border-line py-6 md:grid-cols-[4rem_1fr] md:items-center"
                            >
                                <div className="flex items-baseline gap-3 md:block">
                                    <h3
                                        className={`font-display text-2xl leading-none ${
                                            isSold ? 'text-ink-soft' : 'text-ink'
                                        }`}
                                    >
                                        {unit.id}
                                    </h3>
                                    <span className="caption md:mt-1.5 md:block">
                                        {getStatusLabel(unit.status)}
                                    </span>
                                </div>

                                <div>
                                    <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                                        <span className="measure text-sm text-ink-soft">
                                            {formatArea(unit.totalInternal)} inside · {unit.rooms} rooms ·{' '}
                                            {formatArea(unit.terraceArea)} terrace
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => scrollToElement('lead-form')}
                                            className="btn-quiet text-[0.9375rem] text-lawn"
                                        >
                                            Price on request
                                        </button>
                                    </div>

                                    <GardenRibbon gardenArea={unit.gardenArea} muted={isSold} />

                                    {unit.highlight && (
                                        <p className="caption mt-2">{unit.highlight}</p>
                                    )}
                                </div>
                            </article>
                        );
                    })}

                    <p className="mt-4 max-w-[60ch] text-sm text-ink-soft">
                        B2 is visibly the smallest and we have left it that way. A bar you can trust when
                        it is unflattering is a bar you can trust on B3.
                    </p>
                </div>

                {/* ---- The drawings --------------------------------------- */}
                <div className="mt-16 border-t border-line pt-10">
                    <div className="flex flex-wrap items-center gap-x-8">
                        {(['site', 'A', 'B'] as FloorPlanView[]).map((view) => (
                            <button
                                key={view}
                                type="button"
                                onClick={() => setFloorPlanView(view)}
                                className={`tab-link ${
                                    floorPlanView === view
                                        ? 'border-clay !text-ink'
                                        : 'border-transparent hover:!text-ink'
                                }`}
                            >
                                {view === 'site' ? 'Site plan' : `Building ${view}`}
                            </button>
                        ))}

                        {floorPlanView !== 'site' && (
                            <span className="ml-auto flex items-center gap-6">
                                {(['ground', 'first'] as Floor[]).map((floor) => (
                                    <button
                                        key={floor}
                                        type="button"
                                        onClick={() => setActiveFloor(floor)}
                                        className={`tab-link ${
                                            activeFloor === floor
                                                ? 'border-clay !text-ink'
                                                : 'border-transparent hover:!text-ink'
                                        }`}
                                    >
                                        {floor === 'ground' ? 'Ground floor' : 'First floor'}
                                    </button>
                                ))}
                            </span>
                        )}
                    </div>

                    <figure ref={planRef} className="reveal-unroll mt-4">
                        <div className="relative aspect-[4/3] w-full border border-line bg-paper md:aspect-[16/9]">
                            <Image
                                key={getFloorPlanImage()}
                                src={getFloorPlanImage()}
                                alt={planTitle}
                                fill
                                sizes="(max-width: 768px) 100vw, 1180px"
                                className="plan-swap object-contain p-2 sm:p-4"
                            />
                        </div>
                        <figcaption className="caption mt-3">
                            {planTitle} · JRT Stúdió Kft. · scale 1:250
                        </figcaption>
                    </figure>
                </div>
            </div>
        </section>
    );
}
