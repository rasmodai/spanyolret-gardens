import { getCopy } from './copy';
import { largestGarden, units, availableUnits } from './data';
import { fill, formatArea, type Locale } from './format';

/* What the browser receives about each house: display strings and one number
 * for the garden ribbon. Server-only (it imports lib/data.ts); a 'use client'
 * file only ever gets the plain objects it returns, as props. */
export interface HouseRow {
    id: string;
    available: boolean;
    status: string;
    /** "117.45 m² inside · 5 rooms · 6.60 m² terrace" */
    summary: string;
    highlight: string | null;
    ribbon: { area: string; percent: number; percentLabel: string; ariaLabel: string; gardenWord: string };
}

/** The six houses, smallest garden first: the bars read as one rising column. */
export function houseRows(locale: Locale): HouseRow[] {
    const { houses } = getCopy(locale);
    return [...units]
        .sort((a, b) => a.gardenArea - b.gardenArea)
        .map((unit) => {
            const percent = Math.max(0, Math.min(100, (unit.gardenArea / largestGarden) * 100));
            const area = formatArea(unit.gardenArea, locale);
            return {
                id: unit.id,
                available: unit.status === 'available',
                status: houses.statuses[unit.status],
                summary: fill(houses.summary, {
                    interior: formatArea(unit.totalInternal, locale),
                    rooms: unit.rooms,
                    terrace: formatArea(unit.terraceArea, locale),
                }),
                highlight: unit.highlight ? houses.highlights[unit.highlight] : null,
                ribbon: {
                    area,
                    percent,
                    percentLabel: fill(houses.ribbon.ofLargest, { percent: Math.round(percent) }),
                    ariaLabel: fill(houses.ribbon.aria, { area, percent: Math.round(percent) }),
                    gardenWord: houses.ribbon.garden,
                },
            };
        });
}

/** The options of the "which house?" question: the houses still available. */
export function houseOptions(locale: Locale): { value: string; label: string }[] {
    const { form } = getCopy(locale);
    return availableUnits.map((unit) => ({
        value: unit.id,
        label: fill(form.unitOption, { id: unit.id, garden: formatArea(unit.gardenArea, locale) }),
    }));
}
