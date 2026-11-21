import { getCopy } from './copy';
import { largestGarden, units, availableUnits } from './data';
import { fill, formatArea, formatPrice, type Locale } from './format';
import { projectConfig } from './project-config';

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
    /** The house's price, display strings; null for a sold house or when `showUnitPrices` is off. */
    price: { list: string; offer: string | null; condition: string | null } | null;
    /** The sheet's facts, already formatted, in reading order. */
    facts: { label: string; value: string }[];
    ribbon: { area: string; percent: number; percentLabel: string; ariaLabel: string; gardenWord: string };
}

function priceOf(unit: (typeof units)[number], locale: Locale): HouseRow['price'] {
    if (!projectConfig.showUnitPrices || !unit.prices) return null;
    const offer = projectConfig.parkingGift.enabled;
    return {
        list: formatPrice(unit.prices.listHuf, locale),
        offer: offer ? formatPrice(unit.prices.offerHuf, locale) : null,
        condition: offer ? getCopy(locale).houses.price.condition : null,
    };
}

/** "4 of 6 still available": derived from the data, never typed. */
export function availability(locale: Locale): { available: number; total: number; sold: string[]; line: string } {
    const copy = getCopy(locale).availability;
    const sold = units.filter((unit) => unit.status === 'sold').map((unit) => unit.id);
    return {
        available: availableUnits.length,
        total: units.length,
        sold,
        line: fill(copy.line, { available: availableUnits.length, total: units.length, sold: sold.join(locale === 'hu' ? ' és ' : ' and ') }),
    };
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
                price: priceOf(unit, locale),
                highlight: unit.highlight ? houses.highlights[unit.highlight] : null,
                openAria: fill(sheet.openAria, { id: unit.id }),
                facts: [
                    ...(priceOf(unit, locale)
                        ? [
                              { label: houses.price.list, value: priceOf(unit, locale)!.list },
                              ...(priceOf(unit, locale)!.offer ? [{ label: houses.price.offer, value: priceOf(unit, locale)!.offer! }] : []),
                          ]
                        : []),
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
