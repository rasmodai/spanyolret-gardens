/**
 * Everything on the site that is a fact about the project and is not a house
 * (the houses are in lib/data.ts) lives here, and only here, each value with
 * its source.
 *
 * Rule: an unknown value is `null`, and the page stays correct without it. The
 * line, the row or the section disappears. Nothing ever renders "to be
 * confirmed", and no placeholder figure is ever shown.
 *
 * This file holds no secret and no channel value (those are in the
 * environment, see .env.example): the repository is public.
 */

export interface LocalizedText {
    en: string;
    hu: string;
}

export interface YearMonth {
    year: number;
    /** 1 to 12. */
    month: number;
}

/** The parking offer: one of the parking spaces is free on a reservation deposit. */
export interface ParkingGift {
    /** Master switch. False removes the offer everywhere and moves the anchor price. */
    enabled: boolean;
    /** ISO date: the deposit has to be received by this day. */
    depositBy: string;
    /** What the free space is worth, in HUF. */
    valueHuf: number;
}

export interface AnchorPrice {
    /** The lowest price while the parking offer is open. */
    withGiftHuf: number;
    /** The lowest price once it is closed (the gift is worth `parkingGift.valueHuf`). */
    withoutGiftHuf: number;
}

/** The company that builds and sells. */
export interface Developer {
    name: string;
    website: string;
    /** Year the company started building. "Years building" is derived from it. */
    since: number;
    projectsFinished: number;
    taxNumber: string;
}

/** The legal entity responsible for the personal data collected by the site. */
export interface PrivacyController {
    name: string;
    address: string;
    /** Where people exercise their rights. */
    email: string;
    registrationNumber: string;
}

export interface ProjectConfig {
    /** Keys handed over. Null hides the date everywhere. */
    handoverDate: YearMonth | null;
    parkingGift: ParkingGift;
    anchorPrice: AnchorPrice;
    /** What an additional parking space costs, HUF. */
    parkingSpacePriceHuf: number;
    developer: Developer;
    architect: string;
    contactEmail: string | null;
    contactPhone: string | null;
    /** Number behind the WhatsApp and SMS buttons. Null removes the message form: the form falls back to a call-back request. */
    whatsappNumber: string | null;
    /** Number behind a "call now" button (lot 5). Null: no such button. */
    callNumber: string | null;
    privacyPath: LocalizedText;
    privacyController: PrivacyController;
    /** ISO date of this version of the privacy text. */
    privacyPolicyDate: string;
}

/** Brenda answers buyers for the S-Patrik Bau projects (sales playbook, March
 * 2026: "Brenda from Spanyolrét Gardens"); the number is from her e-mail
 * signature, and its publication was validated by Rémi for City Gate on
 * 31/10/2026. Used for WhatsApp, SMS and the footer. */
const BRENDA_MOBILE = '+36 70 370 1479';

export const projectConfig: ProjectConfig = {
    // Source: the developer's price list (the "2026-10 price list" lib/data.ts
    // is taken from): keys in April 2027. On 02/11/2026 "100% on time" was
    // removed because S-Patrik Bau never confirmed it in writing: the date
    // alone is published, never a promise about it.
    handoverDate: { year: 2027, month: 4 },

    // Source: the same price list. A complimentary parking space (worth
    // 4,000,000 HUF) for a reservation deposit received by 1 December 2026.
    // After that day: set `enabled` to false (or the new terms, once Brenda
    // gives them). `npm test` fails once the deadline has passed with the
    // offer still on, because the site would then state a false offer.
    parkingGift: { enabled: true, depositBy: '2026-12-01', valueHuf: 4_000_000 },

    // Source: the price list. 216,616,000 is B3's promotional price, the lowest
    // of the six and the only figure the site may honestly call "from". Without
    // the gift the lowest is 220,616,000 (the same house, the free space
    // counted at 4,000,000). The only price that is ever published: never a
    // price per house (DESIGN.md → Pricing Display Rule).
    anchorPrice: { withGiftHuf: 216_616_000, withoutGiftHuf: 220_616_000 },

    // Source: the price list ("Additional parking space"), also listed as an
    // optional extra on the site.
    parkingSpacePriceHuf: 4_000_000,

    // Source: the site's own text before 12/11/2026 ("building since 2012",
    // "more than fifty projects"), never contradicted by Brenda; S-Patrik Bau
    // has not confirmed the project count in writing. Tax number: the
    // company's footer on the site since August 2026. Company website: idem.
    developer: {
        name: 'S-Patrik Bau Kft.',
        website: 'spatrikbau.com',
        since: 2012,
        projectsFinished: 50,
        taxNumber: '24304559213',
    },

    // Source: the building-permit drawings the plans are redrawn from.
    architect: 'JRT Stúdió Kft.',

    // Source: Brenda, e-mail of 31/10/2026, 18:34 ("e-mail: info@spatrikbau.com").
    contactEmail: 'info@spatrikbau.com',

    // The buyers' contact in the footer: Brenda's mobile (it was a placeholder
    // until 31/10/2026).
    contactPhone: BRENDA_MOBILE,

    // null removes the message form and both buttons.
    whatsappNumber: BRENDA_MOBILE,

    // Décision de Rémi du 13/11/2026: the same number as City Gate Residences.
    // Behind the choice in the form section, the mobile bar's Call button and
    // the house sheet's call button. Brenda's number (WhatsApp and the footer)
    // is unchanged.
    callNumber: '+36 70 370 1398',

    privacyPath: { en: '/privacy', hu: '/hu/adatvedelem' },

    // Decision of Rémi, 31/10/2026: the controller is S-Patrik Bau Kft., the
    // company of Brenda's father (same as City Gate Residences). Seat: public
    // company registers (31/10/2026); e-mail: Brenda, 31/10/2026; company
    // number: this site's footer.
    privacyController: {
        name: 'S-Patrik Bau Kft.',
        address: '2120 Dunakeszi, Karolina utca 6.',
        email: 'info@spatrikbau.com',
        registrationNumber: '13-09-220814',
    },

    // Date of this version of the privacy text.
    privacyPolicyDate: '2026-11-02',
};

export const whatsappDigits: string | null = projectConfig.whatsappNumber
    ? projectConfig.whatsappNumber.replace(/\D/g, '')
    : null;
