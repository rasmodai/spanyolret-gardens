import type { HighlightKey } from '../data';
import type { Priority } from '../lead/types';

/* Every word the landing page shows, one tree per language. A section never
 * contains text: it receives a `Copy` (or a slice of it). en.ts and hu.ts both
 * satisfy this type, and scripts/test-copy.ts checks they have the same keys.
 *
 * Out of this tree on purpose: the privacy page (lib/privacy-copy.ts) and the
 * cookie banner (lib/consent-copy.ts). */

export interface TextBlock {
    title: string;
    text: string;
}

export interface LabelledValue {
    value: string;
    label: string;
}

export interface MessageCopy {
    intro: string;
    unit: string;
    anyUnit: string;
    priority: string;
    timeline: string;
    close: string;
}

/** The two choices that open the contact section. */
export interface FormChoiceCopy {
    prompt: string;
    callTitle: string;
    /** After the number: who answers. */
    callWho: string;
    infoTitle: string;
    /** Under the information choice: with a messaging number, and without (call back). */
    infoDetailMessaging: string;
    infoDetailCall: string;
}

export interface FormCopy {
    choice: FormChoiceCopy;
    unit: string;
    unitAny: string;
    /** `{id}` and `{garden}` are replaced. */
    unitOption: string;
    priority: string;
    priorities: Partial<Record<Priority, string>>;
    timeline: string;
    timelinePlaceholder: string;
    timelineOptions: { value: string; label: string }[];
    firstName: string;
    phone: string;
    email: string;
    consent: string;
    privacyLink: string;
    choose: string;
    opening: string;
    whatsapp: string;
    sms: string;
    note: string;
    callBack: string;
    submit: string;
    sending: string;
    failure: string;
    rateLimited: string;
    errors: { firstName: string; phone: string; consent: string };
    message: MessageCopy;
    thankYouPath: string;
}

/** The sheet of one house (dialog): plan, facts, and the ways to ask. Nothing about price. */
export interface HouseSheetCopy {
    /** The row's button that opens the sheet. */
    open: string;
    /** `{id}` is replaced: the accessible name of that button. */
    openAria: string;
    close: string;
    previous: string;
    next: string;
    zoomIn: string;
    zoomOut: string;
    facts: {
        interior: string;
        groundFloor: string;
        firstFloor: string;
        terrace: string;
        garden: string;
        rooms: string;
        parking: string;
    };
    /** `{count}` is replaced. */
    parking: { one: string; other: string };
    /** `{id}` is replaced. The first button: opens the message (or, without a messaging number, the call-back request). */
    askMessage: string;
    askCallBack: string;
    /** The button that shows the number, and what follows the number once it is shown. Only rendered when a call number exists. */
    callNow: string;
    callRevealed: string;
}

/** The nine renders, in gallery order. */
export type GalleryShotKey =
    | 'midday' | 'children' | 'barbecue' | 'aerial' | 'dusk' | 'wine' | 'path' | 'walk' | 'lawn';

export type SpecIconKey = 'walls' | 'climate' | 'glazing' | 'electrical' | 'finishes' | 'garden';

export interface BandCopy {
    title: string;
    text: string;
    /** Goes to the form. */
    primary: string;
    /** Opens the message (only when a messaging number is set). */
    message: string;
}

export interface Copy {
    /** Search and sharing: the page title and description, and the Open Graph card. */
    meta: {
        title: string;
        description: string;
        ogTitle: string;
        ogDescription: string;
        ogLocale: string;
    };
    nav: {
        ariaLabel: string;
        backToTop: string;
        links: { id: string; label: string }[];
        cta: string;
        themeDark: string;
        themeLight: string;
    };
    hero: {
        place: string;
        titleFirst: string;
        titleSecond: string;
        lede: string;
        facts: LabelledValue[];
        ctaPrimary: string;
        ctaSecondary: string;
    };
    /** The one public price, and its qualifier: they never travel apart. */
    price: { anchor: string; qualifier: string };
    /** The "why here" section: the buyer's week now against the same week here, four illustrated cards. */
    whyHere: {
        eyebrow: string;
        title: string;
        lede: string;
        /** The small label before each card's "now" line. */
        nowLabel: string;
        cards: {
            /** Which render the card shows (its alt text is that shot's, in `gallery.shots`). */
            shot: GalleryShotKey;
            /** What the buyer's week is now. */
            now: string;
            title: string;
            text: string;
            /** A line of fine print under the text, or null. */
            meta: string | null;
        }[];
    };
    gallery: {
        eyebrow: string;
        title: string;
        lede: string;
        shots: { key: GalleryShotKey; alt: string; caption: string }[];
        ui: {
            /** The scrollable strip, for screen readers. */
            region: string;
            hint: string;
            previousImage: string;
            nextImage: string;
            /** `{alt}` is replaced: the accessible name of a picture's button. */
            enlarge: string;
            viewer: string;
            close: string;
            previous: string;
            next: string;
        };
    };
    houses: {
        eyebrow: string;
        title: string;
        lede: string;
        columnHouse: string;
        columnGarden: string;
        /** `{interior}`, `{rooms}` and `{terrace}` are replaced. */
        summary: string;
        priceOnRequest: string;
        sheet: HouseSheetCopy;
        statuses: { available: string; reserved: string; sold: string };
        highlights: Record<HighlightKey, string>;
        note: string;
        ribbon: {
            garden: string;
            /** `{percent}` is replaced. */
            ofLargest: string;
            /** `{area}` and `{percent}` are replaced. */
            aria: string;
        };
        plans: {
            sitePlan: string;
            /** What the site plan shows, for screen readers. */
            sitePlanAlt: string;
            /** The word on the chip of a sold plot, after the house id. */
            soldChip: string;
            /** What to do with the plan: follows the caption. */
            siteHint: string;
            /** `{id}` is replaced. */
            house: string;
            groundFloor: string;
            firstFloor: string;
            /** `{architect}` is replaced. */
            siteCaption: string;
            planCaption: string;
            roomNames: Record<
                | 'entrance' | 'shower' | 'living' | 'bedroom' | 'kitchenDining' | 'pantry' | 'stairs'
                | 'hallway' | 'wc' | 'wardrobe' | 'utility' | 'bathroom' | 'terrace',
                string
            >;
        };
    };
    pricing: {
        eyebrow: string;
        title: string;
        lede: string;
        includedTitle: string;
        included: string[];
        extrasTitle: string;
        extras: { item: string; price: string }[];
        extrasNote: string;
        cta: string;
        scheduleNote: string;
    };
    location: {
        eyebrow: string;
        title: string;
        lede: string;
        mapTitle: string;
        mapShow: string;
        mapNote: string;
        district: string;
        mapLink: string;
        gettingAround: string;
        transport: { name: string; time: string }[];
        nearbyTitle: string;
        nearby: { category: string; items: string[] }[];
        streetTitle: string;
        street: string[];
        note: string;
    };
    developer: {
        eyebrow: string;
        title: string;
        lede: string;
        /** `{name}` is replaced. */
        architect: string;
        stats: LabelledValue[];
        promises: string[];
    };
    specs: {
        eyebrow: string;
        title: string;
        lede: string;
        /** Six blocks: an icon, a key figure and three lines each. The full list stays below. */
        highlights: { key: SpecIconKey; figure: string; label: string; items: string[] }[];
        /** `{count}` is replaced by the number of lines of the full specification. */
        fullToggle: string;
        /** Label of a line that has no "term: value" form. */
        included: string;
        categories: { id: string; title: string; items: string[] }[];
        note: string;
    };
    process: {
        eyebrow: string;
        title: string;
        lede: string;
        steps: { title: string; text: string; duration: string }[];
        reassuranceTitle: string;
        reassurance: string[];
        cta: string;
    };
    faq: {
        eyebrow: string;
        title: string;
        lede: string;
        groups: { title: string; items: { q: string; a: string }[] }[];
    };
    leadForm: {
        eyebrow: string;
        title: string;
        ledeMessaging: string;
        ledeNoMessaging: string;
        /** The first line's title depends on whether a messaging number is set. */
        replyTodayMessaging: string;
        replyTodayCall: string;
        replyText: string;
        facts: { title: string; text: string }[];
    };
    form: FormCopy;
    footer: {
        ariaLabel: string;
        tagline: string;
        cta: string;
        onThisPage: string;
        links: { id: string; label: string }[];
        contact: string;
        address: string;
        email: string;
        phone: string;
        /** `{name}`, `{tax}` and `{registration}` are replaced. */
        legalLine: string;
        /** `{name}` is replaced. */
        architect: string;
        privacy: string;
        cookieSettings: string;
    };
    /** Two short bands that bring the visitor back to the form between long sections. */
    ctaBands: { afterHouses: BandCopy; afterSpecs: BandCopy };
    stickyBar: { ariaLabel: string; viewing: string; message: string; call: string };
    /** What the visitor sees after the call-back form. */
    thankYou: {
        metaTitle: string;
        title: string;
        text: string;
        next: string[];
        brochureLead: string;
        brochureButton: string;
        faster: string;
        /** The message that WhatsApp / SMS open already written. */
        message: string;
        back: string;
        backHref: string;
    };
}
