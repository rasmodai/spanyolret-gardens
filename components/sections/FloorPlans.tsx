'use client';

import { OPEN_MESSAGE_EVENT } from '@/lib/lead-message';
import { units } from '@/lib/data';
import { formatArea, getStatusLabel } from '@/lib/utils';
import GardenRibbon from '@/components/ui/GardenRibbon';
import PlanViewer from '@/components/PlanViewer';

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

    const sortedUnits = [...units].sort((a, b) => a.gardenArea - b.gardenArea);

    return (
        <section id="floor-plans" className="section-padding border-t border-line bg-paper">
            <div className="section-container">
                <div className="eyebrow">The six gardens</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l text-ink">Same house six times. The garden is what changes.</h2>
                    <p className="lede self-end">
                        Five rooms, two floors and a 6.60 m² terrace in every one of them. On the four still available, the garden runs
                        from 102.12 m² to 201.79 m² — nearly twice the difference, drawn to scale
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
                                            // Opens the form with this house chosen (the form scrolls itself into view).
                                            onClick={() => window.dispatchEvent(new CustomEvent(OPEN_MESSAGE_EVENT, { detail: unit.status === 'available' ? unit.id : undefined }))}
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
                        B1 is visibly the smallest and we have left it that way. A bar you can trust when
                        it is unflattering is a bar you can trust on A2.
                    </p>
                </div>

                {/* ---- The drawings --------------------------------------- */}
                <PlanViewer
                    locale="en"
                    copy={{
                        sitePlan: 'Site plan',
                        house: (id) => `House ${id}`,
                        groundFloor: 'Ground floor',
                        firstFloor: 'First floor',
                        siteCaption: 'JRT Stúdió Kft. · scale 1:250',
                        planCaption: 'redrawn to scale from the building-permit drawings, net areas as stated on them',
                    }}
                />
            </div>
        </section>
    );
}
