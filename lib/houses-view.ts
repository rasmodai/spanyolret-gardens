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
    /** Accessible name of the row's "plan and details" button. */
    openAria: string;
    /** The sheet's facts, already formatted, in reading order. No price among them. */
    facts: { label: string; value: string }[];
    ribbon: { area: string; percent: number; percentLabel: string; ariaLabel: string; gardenWord: string };
}

/** The six houses, smallest garden first: the bars read as one rising column. */
export function houseRows(locale: Locale): HouseRow[] {
    const { houses } = getCopy(locale);
    const { sheet } = houses;
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
                openAria: fill(sheet.openAria, { id: unit.id }),
                facts: [
                    { label: sheet.facts.interior, value: formatArea(unit.totalInternal, locale) },
                    { label: sheet.facts.groundFloor, value: formatArea(unit.groundFloor, locale) },
                    { label: sheet.facts.firstFloor, value: formatArea(unit.firstFloor, locale) },
                    { label: sheet.facts.terrace, value: formatArea(unit.terraceArea, locale) },
                    { label: sheet.facts.garden, value: area },
                    { label: sheet.facts.rooms, value: String(unit.rooms) },
                    {
                        label: sheet.facts.parking,
                        value: fill(unit.parkingSpaces === 1 ? sheet.parking.one : sheet.parking.other, { count: unit.parkingSpaces }),
                    },
                ],
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
