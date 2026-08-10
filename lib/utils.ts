export type Locale = 'en' | 'hu';

// Simple classname merger (like tailwind-merge but lighter)
export function cn(...inputs: (string | undefined | null | false)[]): string {
    return inputs.filter(Boolean).join(' ');
}

/* Formatting — one convention per locale, never mixed.
 *
 *            English                Hungarian
 * thousands  240,000,000            240 000 000  (non-breaking space)
 * decimal    117.45 m²              117,45 m²
 * currency   HUF                    Ft, postfix
 * date       September 2026         2026. szeptember
 *
 * The previous helpers formatted with Intl('hu-HU') and then appended the
 * string ' HUF', producing Hungarian grouping with an English currency code —
 * correct in neither locale. They were also unused, so they are gone rather
 * than fixed: an unused formatter that quietly does the wrong thing is worse
 * than no formatter.
 *
 * There is deliberately NO per-unit price formatter. Per-unit prices are never
 * published (DESIGN.md → Pricing Display Rule); the single public figure is a
 * page-level string that lives in lib/data.ts and lib/data-hu.ts.
 */

const INTL_LOCALE: Record<Locale, string> = { en: 'en-GB', hu: 'hu-HU' };

/** Area with the locale's decimal separator. Trailing ",00" / ".00" dropped. */
export function formatArea(area: number, locale: Locale = 'en'): string {
    const formatted = new Intl.NumberFormat(INTL_LOCALE[locale], {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(area);
    return `${formatted} m²`;
}

/** Whole-number area range, e.g. "102–317 m²". En dash, not a hyphen. */
export function formatAreaRange(min: number, max: number, locale: Locale = 'en'): string {
    const nf = new Intl.NumberFormat(INTL_LOCALE[locale], { maximumFractionDigits: 0 });
    return `${nf.format(min)}–${nf.format(max)} m²`;
}

export type UnitStatus = 'available' | 'reserved' | 'sold';

/* Status colours come from the design tokens. The previous version returned
 * `bg-green-100 text-green-800` and friends — Tailwind defaults that exist
 * nowhere in DESIGN.md. */
export function getStatusStyles(status: UnitStatus): string {
    const styles: Record<UnitStatus, string> = {
        available: 'text-lawn border-lawn',
        reserved: 'text-warn border-warn',
        sold: 'text-ink-soft border-ink-soft',
    };
    return styles[status];
}

/* Labels are localised. The previous version returned hardcoded English from a
 * helper shared by both locales, so "Available" leaked onto the Hungarian page. */
const STATUS_LABELS: Record<Locale, Record<UnitStatus, string>> = {
    en: { available: 'Available', reserved: 'Reserved', sold: 'Sold' },
    hu: { available: 'Szabad', reserved: 'Foglalt', sold: 'Elkelt' },
};

export function getStatusLabel(status: UnitStatus, locale: Locale = 'en'): string {
    return STATUS_LABELS[locale][status];
}

/* Garden ribbon (DESIGN.md → Signature Patterns). Width is always derived from
 * the data, scaled against the largest garden in the development. Never
 * hardcode a percentage: if a unit's area changes, the bars must follow. */
export function gardenRibbonWidth(gardenArea: number, largestGarden: number): number {
    if (largestGarden <= 0) return 0;
    return Math.max(0, Math.min(100, (gardenArea / largestGarden) * 100));
}

export function scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        element.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    }
}
