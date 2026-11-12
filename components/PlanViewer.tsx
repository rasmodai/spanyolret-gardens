'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import FloorPlanSvg from '@/components/FloorPlanSvg';
import type { FloorPlan, RoomKind } from '@/lib/floorplans';
import { fill } from '@/lib/format';
import { track } from '@/lib/mixpanel';
import { useReveal } from '@/lib/useReveal';

type View = 'site' | string;
type Floor = 'ground' | 'upper';

export interface PlanViewerCopy {
    sitePlan: string;
    /** `{id}` is replaced. */
    house: string;
    groundFloor: string;
    firstFloor: string;
    /** Already filled (architect, scale). */
    siteCaption: string;
    planCaption: string;
    roomNames: Record<RoomKind, string>;
}

/* The site plan, then each house on its own, floor by floor, redrawn from the
 * permit drawings (lib/floorplans.ts). The drawings load once, after the page. */
export default function PlanViewer({ copy, locale, houseIds }: { copy: PlanViewerCopy; locale: 'en' | 'hu'; houseIds: string[] }) {
    const [view, setView] = useState<View>('site');
    const [floor, setFloor] = useState<Floor>('ground');
    const [plans, setPlans] = useState<Record<string, FloorPlan> | null>(null);
    const ref = useReveal<HTMLElement>(0.15);

    useEffect(() => {
        let live = true;
        import('@/lib/floorplans').then((module) => live && setPlans(module.floorPlans));
        return () => {
            live = false;
        };
    }, []);

    const floorName = floor === 'ground' ? copy.groundFloor : copy.firstFloor;
    const title = view === 'site' ? copy.sitePlan : `${fill(copy.house, { id: view })} — ${floorName}`;
    const plan = view === 'site' ? null : plans?.[`${view}-${floor}`];
    const tab = (active: boolean) => `tab-link ${active ? 'border-clay !text-ink' : 'border-transparent hover:!text-ink'}`;

    return (
        <div className="mt-16 border-t border-line pt-10">
            <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-8">
                {(['site', ...houseIds] as View[]).map((id) => (
                    <button
                        key={id}
                        type="button"
                        aria-pressed={view === id}
                        onClick={() => {
                            if (id !== 'site' && id !== view) track('House Plan Opened', { house: id });
                            setView(id);
                        }}
                        className={tab(view === id)}
                    >
                        {id === 'site' ? copy.sitePlan : id}
                    </button>
                ))}
            </div>
            {view !== 'site' && (
                <div className="mt-2 flex flex-wrap items-center gap-x-6">
                    {(['ground', 'upper'] as Floor[]).map((id) => (
                        <button key={id} type="button" aria-pressed={floor === id} onClick={() => setFloor(id)} className={tab(floor === id)}>
                            {id === 'ground' ? copy.groundFloor : copy.firstFloor}
                        </button>
                    ))}
                </div>
            )}

            <figure ref={ref} className="reveal-unroll mt-4">
                {view === 'site' ? (
                    <div className="relative aspect-[4/3] w-full border border-line bg-paper md:aspect-[16/9]">
                        <Image src="/assets/floorplans/site-plan.jpg" alt={title} fill sizes="(max-width: 768px) 100vw, 1180px" className="plan-swap object-contain p-2 sm:p-4" />
                    </div>
                ) : (
                    <div className="flex min-h-[50vh] items-center border border-line bg-paper p-3 sm:p-6">
                        {plan ? <FloorPlanSvg key={`${view}-${floor}`} plan={plan} locale={locale} title={title} roomNames={copy.roomNames} /> : null}
                    </div>
                )}
                <figcaption className="caption wrap-compound mt-3">
                    {title} · {view === 'site' ? copy.siteCaption : copy.planCaption}
                </figcaption>
            </figure>
        </div>
    );
}
