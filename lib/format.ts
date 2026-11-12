/* One convention per locale, never mixed. Every figure on the site is
 * formatted here, never typed into a sentence.
 *
 *            English            Hungarian
 * price      216,616,000 HUF    216 616 000 Ft   (non-breaking spaces)
 * area       117.45 m²          117,45 m²
 * date       April 2027         2027. április    (the period is mandatory)
 *
 * There is deliberately NO per-house price formatter call anywhere except for
 * the single public anchor: per-house prices are never published
 * (DESIGN.md → Pricing Display Rule).
 */
import type { YearMonth } from './project-config';

export type Locale = 'en' | 'hu';

const NBSP = '\u00a0';

const MONTHS: Record<Locale, string[]> = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    hu: ['január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december'],
};

function group(value: number, separator: string): string {
    return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

/** EN "216,616,000 HUF", HU "216 616 000 Ft". */
export function formatPrice(value: number, locale: Locale): string {
    return locale === 'hu' ? `${group(value, NBSP)}${NBSP}Ft` : `${group(value, ',')}${NBSP}HUF`;
}

/** A measured area, always two decimals: EN "117.45 m²", HU "117,45 m²". */
export function formatArea(value: number, locale: Locale): string {
    const text = value.toFixed(2);
    return `${locale === 'hu' ? text.replace('.', ',') : text}${NBSP}m²`;
}

/** Whole-number range with an en dash: "102–202 m²". */
export function formatAreaRange(min: number, max: number): string {
    return `${Math.round(min)}–${Math.round(max)}${NBSP}m²`;
}

/** EN "April 2027", HU "2027. április". */
export function formatYearMonth(date: YearMonth, locale: Locale): string {
    const month = MONTHS[locale][date.month - 1];
    return locale === 'hu' ? `${date.year}. ${month}` : `${month} ${date.year}`;
}

/** ISO 'YYYY-MM-DD'. EN "1 December 2026", HU "2026. december 1.". */
export function formatDate(iso: string, locale: Locale): string {
    const [year, month, day] = iso.split('-').map(Number);
    const name = MONTHS[locale][month - 1];
    return locale === 'hu' ? `${year}. ${name} ${day}.` : `${day} ${name} ${year}`;
}

/* Hungarian "until" (-ig) on a day of the month. Day numbers are read as
 * ordinals (elsején, másodikán…), so the suffix follows the ordinal word:
 * back-vowel words take -áig, front-vowel words -éig, and the 1st is the
 * special form -jéig ("elsejéig"). */
const HU_UNTIL = [
    '', 'jéig', 'áig', 'áig', 'éig', 'éig', 'áig', 'éig', 'áig', 'éig', 'éig',
    'éig', 'éig', 'áig', 'éig', 'éig', 'áig', 'éig', 'áig', 'éig', 'áig',
    'éig', 'éig', 'áig', 'éig', 'éig', 'áig', 'éig', 'áig', 'éig', 'áig', 'éig',
];

/** HU "2026. december 1-jéig" (no period after the day: the suffix follows it). */
export function formatDateUntilHu(iso: string): string {
    const [year, month, day] = iso.split('-').map(Number);
    return `${year}. ${MONTHS.hu[month - 1]} ${day}-${HU_UNTIL[day]}`;
}

/** The date's calendar year, used for "years building": derived, never typed. */
export function yearsSince(year: number, now: Date = new Date()): number {
    return now.getFullYear() - year;
}

/** Hungarian "in <month> of <year>" (possessive + inessive): "2027 áprilisában". */
const HU_IN_MONTH = [
    'januárjában', 'februárjában', 'márciusában', 'áprilisában', 'májusában', 'júniusában',
    'júliusában', 'augusztusában', 'szeptemberében', 'októberében', 'novemberében', 'decemberében',
];

export function formatYearMonthInHu(date: YearMonth): string {
    return `${date.year} ${HU_IN_MONTH[date.month - 1]}`;
}

/** Replaces `{name}` placeholders in a copy template. */
export function fill(template: string, values: Record<string, string | number>): string {
    return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}
