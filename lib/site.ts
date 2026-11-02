/* Site-wide settings that are facts, each with its source. */

/** Brenda answers buyers for the S-Patrik Bau projects (sales playbook, March
 * 2026: "Brenda from Spanyolrét Gardens"); her WhatsApp number was validated
 * by Rémi for City Gate on 31/10/2026. Null hides the WhatsApp / SMS choice
 * and the form falls back to a call-back request. */
export const whatsappNumber: string | null = '+36 70 370 1479';
export const whatsappDigits = whatsappNumber ? whatsappNumber.replace(/\D/g, '') : null;

/** The Meta Pixel already used by this site. Loaded only after "Accept". */
export const metaPixelId = '886458420654697';

/** Data controller. Same company as City Gate Residences: S-Patrik Bau Kft.
 * Seat: public company registers (31/10/2026); e-mail: Brenda, 31/10/2026;
 * company number: this site's footer. */
export const privacyController = {
    name: 'S-Patrik Bau Kft.',
    address: '2120 Dunakeszi, Karolina utca 6.',
    email: 'info@spatrikbau.com',
    registrationNumber: '13-09-220814',
} as const;

export const privacyPath = { en: '/privacy', hu: '/hu/adatvedelem' } as const;

/** Date of this version of the privacy text. */
export const privacyPolicyDate = { en: '2 November 2026', hu: '2026. november 2.' } as const;
