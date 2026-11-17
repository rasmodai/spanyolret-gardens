export type ChannelResult = 'ok' | 'failed' | 'skipped';

export type LeadSource = 'form' | 'whatsapp' | 'sms';

/** What matters most to a buyer, asked in the lead form. Same keys as the Synphos OS buyer pipeline accepts. */
export const PRIORITIES = ['outdoor', 'space', 'location', 'price', 'investment'] as const;
export type Priority = (typeof PRIORITIES)[number];

/** The optional budget question of the lead form (HUF; the offer prices run from 216.6 to 228.4 M for the houses still available).
 *  Bands proposed 16/11/2026, to be confirmed by Brenda. */
export const BUDGETS = {
    'under-220': 'Under 220 M HUF',
    '220-230': '220–230 M HUF',
    'over-230': 'Over 230 M HUF',
    loan: 'With a mortgage',
} as const;
export type Budget = keyof typeof BUDGETS;

export const UTM_KEYS = ['source', 'medium', 'campaign', 'term', 'content'] as const;
export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

export interface Lead {
    /** 'form': the call-back request. 'whatsapp' / 'sms': the lead form, then the visitor's choice of app. */
    source: LeadSource;
    priority: Priority | '';
    utm: Utm;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    preferredContact: string;
    timeline: string;
    preferredUnit: string;
    message: string;
    /** Optional budget band; '' when not given. */
    budget: Budget | '';
    marketingConsent: boolean;
    /** The visitor ticked "I agree to be contacted" (sent by the form as `privacyConsent`). */
    contactConsent: boolean;
    /** The visitor accepted cookies (Meta Pixel) in the banner: the only basis for the Conversions API. */
    adConsent: boolean;
    lang: 'en' | 'hu';
    sourceUrl: string;
}

export interface MetaContext {
    eventId: string;
    fbp: string;
    fbc: string;
    ip: string;
    userAgent: string;
}

/**
 * The decision that must never be got wrong. A lead that reaches no capture
 * channel and still gets a 200 is a lead nobody ever learns about.
 * Meta is a conversion signal, not a record, so it does not count here.
 */
export function wasCaptured(results: {
    os: ChannelResult;
    sheet: ChannelResult;
    email: ChannelResult;
}): boolean {
    return results.os === 'ok' || results.sheet === 'ok' || results.email === 'ok';
}
