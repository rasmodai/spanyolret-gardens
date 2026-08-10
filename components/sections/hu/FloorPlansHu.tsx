'use client';

import { useState } from 'react';
import Image from 'next/image';
import { units } from '@/lib/data';
import { uiTextsHu } from '@/lib/data-hu';
import { formatArea, scrollToElement } from '@/lib/utils';
import GardenRibbon from '@/components/ui/GardenRibbon';
import { useReveal } from '@/lib/useReveal';

type FloorPlanView = 'site' | 'A' | 'B';
type Floor = 'ground' | 'first';

/* Mirror of components/sections/FloorPlans.tsx. The six bars share one left
 * edge and are sorted smallest garden to largest, so they read as a single
 * rising column — which is the only reason to draw them to scale at all. */
export default function FloorPlansHu() {
    const t = uiTextsHu.floorPlans;
    const [floorPlanView, setFloorPlanView] = useState<FloorPlanView>('site');
    const [activeFloor, setActiveFloor] = useState<Floor>('ground');

    const sortedUnits = [...units].sort((a, b) => a.gardenArea - b.gardenArea);
    const planRef = useReveal<HTMLElement>(0.15);

    const statusLabel = (status: string) =>
        ({ available: t.available, reserved: t.reserved, sold: t.sold } as Record<string, string>)[status] ??
        status;

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
            ? t.sitePlan
            : `${floorPlanView} épület — ${activeFloor === 'ground' ? t.groundFloor : t.firstFloor}`;

    return (
        <section id="floor-plans" className="section-padding border-t border-line bg-paper">
            <div className="section-container">
                <div className="eyebrow">{t.badge}</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l wrap-compound text-ink">{t.title}</h2>
                    <p className="lede wrap-compound self-end">{t.subtitle}</p>
                </div>

                <div className="mt-14">
                    <div className="scale-sticky hidden items-baseline gap-6 border-b border-line pb-3 pt-4 md:flex">
                        <span className="caption w-16 shrink-0">Ház</span>
                        <span className="caption flex-1">Saját kert, méretarányosan</span>
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
                                        {statusLabel(unit.status)}
                                    </span>
                                </div>

                                <div>
                                    <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                                        <span className="measure text-sm text-ink-soft">
                                            {formatArea(unit.totalInternal, 'hu')} belső · {unit.rooms} szoba ·{' '}
                                            {formatArea(unit.terraceArea, 'hu')} terasz
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => scrollToElement('lead-form')}
                                            className="btn-quiet text-[0.9375rem] text-lawn"
                                        >
                                            Ár kérésre
                                        </button>
                                    </div>

                                    <GardenRibbon gardenArea={unit.gardenArea} locale="hu" muted={isSold} />
                                </div>
                            </article>
                        );
                    })}

                    <p className="wrap-compound mt-4 max-w-[60ch] text-sm text-ink-soft">
                        A B2 láthatóan a legkisebb, és ezt így is hagytuk. Egy sáv, amiben akkor is megbízol,
                        amikor nem hízelgő, az a sáv, amiben a B3-nál is megbízol.
                    </p>
                </div>

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
                                {view === 'site' ? t.sitePlan : `${view} épület`}
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
                                        {floor === 'ground' ? t.groundFloor : t.firstFloor}
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
                        <figcaption className="caption wrap-compound mt-3">
                            {planTitle} · JRT Stúdió Kft. · M 1:250
                        </figcaption>
                    </figure>
                </div>
            </div>
        </section>
    );
}
