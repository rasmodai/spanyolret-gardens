'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import HouseRows from '@/components/sections/HouseRows';
import HouseSheet, { type HouseSheetLabels } from '@/components/sections/HouseSheet';
import type { HouseRow } from '@/lib/houses-view';
import { OPEN_MESSAGE_EVENT } from '@/lib/lead/message';
import { track } from '@/lib/mixpanel';
import { fill } from '@/lib/format';
import { SITE_PLAN, SITE_PLAN_VIEWBOX } from '@/lib/site-plan';

/* The house list, its sheets and the site plan. The list opens a sheet per
 * house; the sheet's plans are the permit drawings (lib/floorplans.ts), loaded
 * with the first sheet. The site plan stays on the page, next to the list: a
 * plot (or its chip) under the pointer, the finger or the keyboard focus
 * highlights its row, and a row highlights its plot. */
export default function HouseExplorer({
    houses,
    locale,
    columnHouse,
    columnGarden,
    priceOnRequest,
    note,
    labels,
    sitePlan,
    sitePlanAlt,
    siteHint,
    soldChip,
    siteCaption,
    messaging,
    phone,
}: {
    houses: HouseRow[];
    locale: 'en' | 'hu';
    columnHouse: string;
    columnGarden: string;
    priceOnRequest: string;
    note: string;
    labels: HouseSheetLabels;
    sitePlan: string;
    sitePlanAlt: string;
    /** "hover or tap a plot", after the caption. */
    siteHint: string;
    /** "sold", on the chip of a sold house. */
    soldChip: string;
    /** Already filled (architect, scale). */
    siteCaption: string;
    messaging: boolean;
    phone: string | null;
}) {
    const [sheetId, setSheetId] = useState<string | null>(null);
    const [active, setActive] = useState<string | null>(null);

    // A tap elsewhere lets go of the plot a tap had highlighted.
    useEffect(() => {
        const clear = () => setActive(null);
        document.addEventListener('click', clear);
        return () => document.removeEventListener('click', clear);
    }, []);

    const openSheet = (id: string | null) => {
        setSheetId(id);
        if (id) track('House Plan Opened', { house: id });
    };

    // Closes the sheet, then the form scrolls itself into view with this house chosen.
    const ask = (id: string) => {
        track('House Enquiry Clicked', { house: id, channel: messaging ? 'message' : 'form' });
        setSheetId(null);
        window.dispatchEvent(new CustomEvent(OPEN_MESSAGE_EVENT, { detail: id }));
    };

    const plotProps = (id: string) => ({
        'data-house': id,
        onMouseEnter: () => setActive(id),
        onMouseLeave: () => setActive(null),
        onFocus: () => setActive(id),
        onBlur: () => setActive(null),
        onClick: (event: React.MouseEvent) => {
            event.stopPropagation();
            setActive(id);
        },
    });

    return (
        <>
            <div className="grid gap-10 min-[980px]:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] min-[980px]:items-start min-[980px]:gap-14">
                <figure className="order-first min-[980px]:sticky min-[980px]:top-24 min-[980px]:order-none" data-reveal>
                    <div className={`plan ${active ? 'has-on' : ''}`}>
                        <Image
                            src="/assets/floorplans/site-plan.jpg"
                            alt={sitePlanAlt}
                            width={2100}
                            height={1335}
                            sizes="(max-width: 980px) 100vw, 560px"
                        />
                        <svg viewBox={SITE_PLAN_VIEWBOX} preserveAspectRatio="none" aria-hidden="true">
                            {houses.map((house) => (
                                <polygon
                                    key={house.id}
                                    points={SITE_PLAN[house.id]?.points}
                                    className={active === house.id ? 'on' : undefined}
                                    {...plotProps(house.id)}
                                >
                                    <title>{fill(labels.plans.house, { id: house.id })}</title>
                                </polygon>
                            ))}
                        </svg>
                        {houses.map((house) => {
                            const chip = SITE_PLAN[house.id]?.chip;
                            if (!chip) return null;
                            return (
                                <button
                                    key={house.id}
                                    type="button"
                                    className={`plan-chip ${house.available ? '' : 'sold'} ${active === house.id ? 'on' : ''}`}
                                    style={{ left: `${chip.left}%`, top: `${chip.top}%` }}
                                    aria-label={fill(labels.plans.house, { id: house.id })}
                                    {...plotProps(house.id)}
                                >
                                    {house.available ? house.id : `${house.id} · ${soldChip}`}
                                </button>
                            );
                        })}
                    </div>
                    <figcaption className="caption wrap-compound mt-2.5">
                        {siteCaption} · {siteHint}
                    </figcaption>
                </figure>

                <div data-reveal="2">
                    <HouseRows
                        houses={houses}
                        columnHouse={columnHouse}
                        columnGarden={columnGarden}
                        priceOnRequest={priceOnRequest}
                        openLabel={labels.open}
                        onOpen={openSheet}
                        onAsk={ask}
                        activeId={active}
                        onActive={setActive}
                    />

                    <p className="mt-5 max-w-[56ch] text-sm text-ink-soft">{note}</p>
                </div>
            </div>

            <HouseSheet rows={houses} openId={sheetId} onOpenChange={openSheet} labels={labels} locale={locale} messaging={messaging} phone={phone} onAsk={ask} />
        </>
    );
}
