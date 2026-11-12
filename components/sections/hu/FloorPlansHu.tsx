'use client';

import { OPEN_MESSAGE_EVENT } from '@/lib/lead/message';
import { units } from '@/lib/data';
import { uiTextsHu } from '@/lib/data-hu';
import { formatArea } from '@/lib/utils';
import GardenRibbon from '@/components/ui/GardenRibbon';
import PlanViewer from '@/components/PlanViewer';

/* Mirror of components/sections/FloorPlans.tsx. The six bars share one left
 * edge and are sorted smallest garden to largest, so they read as a single
 * rising column — which is the only reason to draw them to scale at all. */
export default function FloorPlansHu() {
    const t = uiTextsHu.floorPlans;

    const sortedUnits = [...units].sort((a, b) => a.gardenArea - b.gardenArea);

    const statusLabel = (status: string) =>
        ({ available: t.available, reserved: t.reserved, sold: t.sold } as Record<string, string>)[status] ??
        status;

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
                                            // Opens the form with this house chosen (the form scrolls itself into view).
                                            onClick={() => window.dispatchEvent(new CustomEvent(OPEN_MESSAGE_EVENT, { detail: unit.status === 'available' ? unit.id : undefined }))}
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
                        A B1 láthatóan a legkisebb, és ezt így is hagytuk. Egy sáv, amiben akkor is megbízol,
                        amikor nem hízelgő, az a sáv, amiben az A2-nél is megbízol.
                    </p>
                </div>

                <PlanViewer
                    locale="hu"
                    copy={{
                        sitePlan: t.sitePlan,
                        house: (id) => `${id} ház`,
                        groundFloor: t.groundFloor,
                        firstFloor: t.firstFloor,
                        siteCaption: 'JRT Stúdió Kft. · M 1:250',
                        planCaption: 'méretarányosan újrarajzolva az építési engedélyezési tervről, a rajta szereplő nettó alapterületekkel',
                    }}
                />
            </div>
        </section>
    );
}
