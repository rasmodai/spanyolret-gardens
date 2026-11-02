'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import FloorPlanSvg from '@/components/FloorPlanSvg';
import type { FloorPlan } from '@/lib/floorplans';
import { useReveal } from '@/lib/useReveal';

const HOUSES = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3'] as const;
type View = 'site' | (typeof HOUSES)[number];
type Floor = 'ground' | 'upper';

export interface PlanViewerCopy {
    sitePlan: string;
    house: (id: string) => string;
    groundFloor: string;
    firstFloor: string;
    siteCaption: string;
    planCaption: string;
}

/* The site plan, then each house on its own, floor by floor, redrawn from the
 * permit drawings (lib/floorplans.ts). The drawings load once, after the page. */
export default function PlanViewer({ copy, locale }: { copy: PlanViewerCopy; locale: 'en' | 'hu' }) {
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
    const title = view === 'site' ? copy.sitePlan : `${copy.house(view)} — ${floorName}`;
    const plan = view === 'site' ? null : plans?.[`${view}-${floor}`];
    const tab = (active: boolean) => `tab-link ${active ? 'border-clay !text-ink' : 'border-transparent hover:!text-ink'}`;

    return (
        <div className="mt-16 border-t border-line pt-10">
            <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-8">
                {(['site', ...HOUSES] as View[]).map((id) => (
                    <button key={id} type="button" aria-pressed={view === id} onClick={() => setView(id)} className={tab(view === id)}>
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
                        {plan ? <FloorPlanSvg key={`${view}-${floor}`} plan={plan} locale={locale} title={title} /> : null}
                    </div>
                )}
                <figcaption className="caption wrap-compound mt-3">
                    {title} · {view === 'site' ? copy.siteCaption : copy.planCaption}
                </figcaption>
            </figure>
        </div>
    );
}
