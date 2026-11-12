'use client';

import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import CallReveal from '@/components/sections/CallReveal';
import FloorPlanSvg from '@/components/FloorPlanSvg';
import type { FloorPlan, RoomKind } from '@/lib/floorplans';
import { fill } from '@/lib/format';
import type { HouseRow } from '@/lib/houses-view';
import type { HouseSheetCopy } from '@/lib/copy/types';
import { track } from '@/lib/mixpanel';

export interface HouseSheetLabels extends HouseSheetCopy {
    /** The plan drawings' words (copy.houses.plans). `house` takes `{id}`. */
    plans: {
        house: string;
        groundFloor: string;
        firstFloor: string;
        planCaption: string;
        roomNames: Record<RoomKind, string>;
    };
}

type Floor = 'ground' | 'upper';

/* What the sheet shows, apart from the dialog frame: the plan, the facts and
 * the ways to ask. Separate from the dialog so it can be rendered on its own
 * (the dialog portal does not exist on the server). Nothing here knows a price:
 * `row` carries display strings and no price (lib/houses-view.ts). */
export function HouseSheetBody({
    row,
    labels,
    locale,
    drawings,
    messaging,
    phone,
    previous,
    next,
    onNavigate,
    onAsk,
}: {
    row: HouseRow;
    labels: HouseSheetLabels;
    locale: 'en' | 'hu';
    /** The drawings, once loaded (they load with the first opened sheet). */
    drawings: Record<string, FloorPlan> | null;
    /** A messaging number is set: the first button opens the message form. */
    messaging: boolean;
    /** A number a buyer may call. Null: no call button. */
    phone: string | null;
    previous: string | null;
    next: string | null;
    onNavigate: (id: string) => void;
    onAsk: (id: string) => void;
}) {
    const [floor, setFloor] = useState<Floor>('ground');
    const [zoom, setZoom] = useState(1);
    const floorName = floor === 'ground' ? labels.plans.groundFloor : labels.plans.firstFloor;
    const title = `${fill(labels.plans.house, { id: row.id })} — ${floorName}`;
    const plan = drawings?.[`${row.id}-${floor}`];
    const tab = (active: boolean) => `tab-link ${active ? 'border-clay !text-ink' : 'border-transparent hover:!text-ink'}`;

    return (
        <div className="grid flex-1 overflow-y-auto md:grid-cols-[3fr_2fr]">
            <div className="border-b border-line p-5 md:border-b-0 md:border-r md:p-8">
                <div className="flex flex-wrap items-center gap-x-6">
                    {(['ground', 'upper'] as Floor[]).map((id) => (
                        <button key={id} type="button" aria-pressed={floor === id} onClick={() => setFloor(id)} className={tab(floor === id)}>
                            {id === 'ground' ? labels.plans.groundFloor : labels.plans.firstFloor}
                        </button>
                    ))}
                </div>
                <div className="mt-3 overflow-auto border border-line bg-paper">
                    <div className="p-3 transition-[width] duration-short sm:p-5" style={{ width: `${zoom * 100}%` }}>
                        {plan ? (
                            <FloorPlanSvg
                                key={`${row.id}-${floor}`}
                                plan={plan}
                                locale={locale}
                                title={title}
                                roomNames={labels.plans.roomNames}
                                className={`mx-auto block h-auto w-full ${zoom === 1 ? 'max-h-[60dvh]' : ''}`}
                            />
                        ) : (
                            <div className="aspect-[4/3] w-full" />
                        )}
                    </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        className="btn btn-ghost !min-h-[44px] !min-w-[44px] !px-0"
                        aria-label={labels.zoomOut}
                        disabled={zoom <= 1}
                        onClick={() => setZoom((value) => Math.max(1, value - 0.5))}
                    >
                        −
                    </button>
                    <button
                        type="button"
                        className="btn btn-ghost !min-h-[44px] !min-w-[44px] !px-0"
                        aria-label={labels.zoomIn}
                        disabled={zoom >= 3}
                        onClick={() => {
                            setZoom((value) => Math.min(3, value + 0.5));
                            track('Floor Plan Zoomed', { house: row.id });
                        }}
                    >
                        +
                    </button>
                </div>
                <p className="caption wrap-compound mt-2">{labels.plans.planCaption}</p>
            </div>

            <div className="flex flex-col p-5 md:p-8">
                {row.highlight && <p className="caption mb-4">{row.highlight}</p>}
                <dl className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {row.facts.map((fact) => (
                        <div key={fact.label}>
                            <dt className="caption">{fact.label}</dt>
                            <dd className="measure font-display text-[1.375rem] leading-tight">{fact.value}</dd>
                        </div>
                    ))}
                </dl>

                <div className="mt-auto space-y-3 pt-6">
                    {row.available && (
                        <button type="button" className="btn btn-primary w-full" onClick={() => onAsk(row.id)}>
                            {fill(messaging ? labels.askMessage : labels.askCallBack, { id: row.id })}
                        </button>
                    )}
                    {row.available && (
                        <CallReveal phone={phone} label={labels.callNow} revealedLabel={labels.callRevealed} house={row.id} className="btn btn-ghost w-full" />
                    )}
                    <div className="flex justify-between">
                        <button type="button" className="btn-quiet" disabled={!previous} onClick={() => previous && onNavigate(previous)}>
                            {previous ? `← ${labels.previous}: ${previous}` : ''}
                        </button>
                        <button type="button" className="btn-quiet" disabled={!next} onClick={() => next && onNavigate(next)}>
                            {next ? `${labels.next}: ${next} →` : ''}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* The sheet of one house: a centred dialog on wide screens, a full-height panel
 * on phones. Built on the Radix primitive (focus trap, Escape, scroll lock),
 * restyled to DESIGN.md: square corners, no shadow, one filled button. Sold
 * houses open too, with their plan, and no way to ask. */
export default function HouseSheet({
    rows,
    openId,
    onOpenChange,
    labels,
    locale,
    messaging,
    phone,
    onAsk,
}: {
    rows: HouseRow[];
    openId: string | null;
    onOpenChange: (id: string | null) => void;
    labels: HouseSheetLabels;
    locale: 'en' | 'hu';
    messaging: boolean;
    phone: string | null;
    onAsk: (id: string) => void;
}) {
    const index = rows.findIndex((row) => row.id === openId);
    const row = index >= 0 ? rows[index] : null;

    // The drawings load with the first opened sheet, not with the page.
    const [drawings, setDrawings] = useState<Record<string, FloorPlan> | null>(null);
    useEffect(() => {
        if (!openId || drawings) return;
        let live = true;
        import('@/lib/floorplans').then((module) => live && setDrawings(module.floorPlans));
        return () => {
            live = false;
        };
    }, [openId, drawings]);

    useEffect(() => {
        if (!row) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight' && index < rows.length - 1) onOpenChange(rows[index + 1].id);
            if (event.key === 'ArrowLeft' && index > 0) onOpenChange(rows[index - 1].id);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [row, index, rows, onOpenChange]);

    return (
        <Dialog.Root open={!!row} onOpenChange={(open) => !open && onOpenChange(null)}>
            <Dialog.Portal>
                <Dialog.Overlay className="dialog-overlay fixed inset-0 z-[70] bg-[rgb(20_18_16/0.6)]" />
                <Dialog.Content
                    className="dialog-panel fixed inset-x-0 bottom-0 z-[71] flex h-[92dvh] flex-col border-t border-line bg-paper text-ink outline-none md:inset-auto md:left-1/2 md:top-1/2 md:h-auto md:max-h-[90dvh] md:w-[min(1100px,calc(100vw-4rem))] md:-translate-x-1/2 md:-translate-y-1/2 md:border"
                    aria-describedby={undefined}
                >
                    {row && (
                        <>
                            <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 md:px-8">
                                <div>
                                    <Dialog.Title className="font-display text-[2.25rem] leading-none">{row.id}</Dialog.Title>
                                    <p className="mt-2 flex flex-wrap items-center gap-3">
                                        <span
                                            className={
                                                row.available
                                                    ? 'caption'
                                                    : 'inline-block bg-ink-soft px-3 py-1 text-base font-semibold uppercase tracking-[0.12em] text-paper'
                                            }
                                        >
                                            {row.status}
                                        </span>
                                    </p>
                                </div>
                                <Dialog.Close className="tab-link min-w-[44px] justify-center" aria-label={labels.close}>
                                    <span aria-hidden="true" className="text-2xl leading-none">×</span>
                                </Dialog.Close>
                            </header>
                            <HouseSheetBody
                                key={row.id}
                                row={row}
                                labels={labels}
                                locale={locale}
                                drawings={drawings}
                                messaging={messaging}
                                phone={phone}
                                previous={index > 0 ? rows[index - 1].id : null}
                                next={index < rows.length - 1 ? rows[index + 1].id : null}
                                onNavigate={onOpenChange}
                                onAsk={onAsk}
                            />
                        </>
                    )}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
