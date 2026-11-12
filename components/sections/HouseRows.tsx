'use client';

import GardenRibbon from '@/components/ui/GardenRibbon';
import { OPEN_MESSAGE_EVENT } from '@/lib/lead/message';
import type { HouseRow } from '@/lib/houses-view';

/* The six houses as rows on a shared left edge, smallest garden first, so the
 * six bars read as one rising column. The rows arrive as display strings
 * (lib/houses-view.ts): no price, and nothing from lib/data.ts, ever reaches
 * the browser. */
export default function HouseRows({
    houses,
    columnHouse,
    columnGarden,
    priceOnRequest,
}: {
    houses: HouseRow[];
    columnHouse: string;
    columnGarden: string;
    priceOnRequest: string;
}) {
    return (
        <>
            <div className="scale-sticky hidden items-baseline gap-6 border-b border-line pb-3 pt-4 md:flex">
                <span className="caption w-16 shrink-0">{columnHouse}</span>
                <span className="caption flex-1">{columnGarden}</span>
            </div>

            {houses.map((house) => (
                <article
                    key={house.id}
                    className="grid gap-x-6 gap-y-3 border-b border-line py-6 md:grid-cols-[4rem_1fr] md:items-center"
                >
                    <div className="flex items-baseline gap-3 md:block">
                        <h3 className={`font-display text-2xl leading-none ${house.available ? 'text-ink' : 'text-ink-soft'}`}>
                            {house.id}
                        </h3>
                        <span className="caption md:mt-1.5 md:block">{house.status}</span>
                    </div>

                    <div>
                        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                            <span className="measure text-sm text-ink-soft">{house.summary}</span>
                            <button
                                type="button"
                                // Opens the form with this house chosen (the form scrolls itself into view).
                                onClick={() =>
                                    window.dispatchEvent(
                                        new CustomEvent(OPEN_MESSAGE_EVENT, { detail: house.available ? house.id : undefined })
                                    )
                                }
                                className="btn-quiet text-[0.9375rem] text-lawn"
                            >
                                {priceOnRequest}
                            </button>
                        </div>

                        <GardenRibbon {...house.ribbon} muted={!house.available} />

                        {house.highlight && <p className="caption mt-2">{house.highlight}</p>}
                    </div>
                </article>
            ))}
        </>
    );
}
