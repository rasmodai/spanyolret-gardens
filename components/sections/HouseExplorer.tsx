'use client';

import { useState } from 'react';
import Image from 'next/image';
import HouseRows from '@/components/sections/HouseRows';
import HouseSheet, { type HouseSheetLabels } from '@/components/sections/HouseSheet';
import type { HouseRow } from '@/lib/houses-view';
import { OPEN_MESSAGE_EVENT } from '@/lib/lead/message';
import { track } from '@/lib/mixpanel';
import { useReveal } from '@/lib/useReveal';

/* The house list, its sheets and the site plan. The list opens a sheet per
 * house; the sheet's plans are the permit drawings (lib/floorplans.ts), loaded
 * with the first sheet. The site plan stays on the page: it is what you read
 * the six gardens against. */
export default function HouseExplorer({
    houses,
    locale,
    columnHouse,
    columnGarden,
    priceOnRequest,
    note,
    labels,
    sitePlan,
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
    /** Already filled (architect, scale). */
    siteCaption: string;
    messaging: boolean;
    phone: string | null;
}) {
    const [sheetId, setSheetId] = useState<string | null>(null);
    const ref = useReveal<HTMLElement>(0.15);

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

    return (
        <>
            <HouseRows
                houses={houses}
                columnHouse={columnHouse}
                columnGarden={columnGarden}
                priceOnRequest={priceOnRequest}
                openLabel={labels.open}
                onOpen={openSheet}
                onAsk={ask}
            />

            <p className="mt-4 max-w-[60ch] text-sm text-ink-soft">{note}</p>

            <figure ref={ref} className="reveal-unroll mt-16 border-t border-line pt-10">
                <div className="relative aspect-[4/3] w-full border border-line bg-paper md:aspect-[16/9]">
                    <Image src="/assets/floorplans/site-plan.jpg" alt={sitePlan} fill sizes="(max-width: 768px) 100vw, 1180px" className="plan-swap object-contain p-2 sm:p-4" />
                </div>
                <figcaption className="caption wrap-compound mt-3">
                    {sitePlan} · {siteCaption}
                </figcaption>
            </figure>

            <HouseSheet rows={houses} openId={sheetId} onOpenChange={openSheet} labels={labels} locale={locale} messaging={messaging} phone={phone} onAsk={ask} />
        </>
    );
}
