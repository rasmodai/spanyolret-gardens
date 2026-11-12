import { UTM_KEYS, type Utm } from './types';

/** The campaign a visitor arrived from, read server-side from the page URL the
 * form was sent from (the utm_* parameters). Nothing is stored in the browser. */
export function utmFromUrl(sourceUrl: string): Utm {
    const utm: Utm = {};
    try {
        const params = new URL(sourceUrl).searchParams;
        for (const key of UTM_KEYS) {
            const value = params.get(`utm_${key}`);
            if (value) utm[key] = value.slice(0, 200);
        }
    } catch {
        // No usable URL: no campaign.
    }
    return utm;
}
