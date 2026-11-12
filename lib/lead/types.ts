export type ChannelResult = 'ok' | 'failed' | 'skipped';

export type LeadSource = 'form' | 'whatsapp' | 'sms';

/** What matters most to a buyer, asked in the lead form. Same keys as the Synphos OS buyer pipeline accepts. */
export const PRIORITIES = ['outdoor', 'space', 'location', 'price', 'investment'] as const;
export type Priority = (typeof PRIORITIES)[number];

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
