'use client';

import GardenRibbon from '@/components/ui/GardenRibbon';
import type { HouseRow } from '@/lib/houses-view';

/* The six houses as rows on a shared left edge, smallest garden first, so the
 * six bars read as one rising column. The rows arrive as display strings
 * (lib/houses-view.ts): no price, and nothing from lib/data.ts, ever reaches
 * the browser. Each row opens the house's sheet (HouseSheet) and, while the
 * house is available, takes the visitor to the form. */
export default function HouseRows({
    houses,
    columnHouse,
    columnGarden,
    priceOnRequest,
    openLabel,
    onOpen,
    onAsk,
}: {
    houses: HouseRow[];
    columnHouse: string;
    columnGarden: string;
    priceOnRequest: string;
    /** The button that opens the sheet of the house. */
    openLabel: string;
    onOpen: (id: string) => void;
    /** The house is still available: take the visitor to the form with it chosen. */
    onAsk: (id: string) => void;
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
                            <span className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                                <button
                                    type="button"
                                    aria-label={house.openAria}
                                    onClick={() => onOpen(house.id)}
                                    className="btn-quiet text-[0.9375rem]"
                                >
                                    {openLabel}
                                </button>
                                {/* A sold house has no request button: its sheet and plan stay open to read. */}
                                {house.available && (
                                    <button type="button" onClick={() => onAsk(house.id)} className="btn-quiet text-[0.9375rem] text-lawn">
                                        {priceOnRequest}
                                    </button>
                                )}
                            </span>
                        </div>

                        <GardenRibbon {...house.ribbon} muted={!house.available} />

                        {house.highlight && <p className="caption mt-2">{house.highlight}</p>}
                    </div>
                </article>
            ))}
        </>
    );
}
