import { NextResponse } from 'next/server';
import { units } from '@/lib/data';
import { sendLeadEmail } from '@/lib/lead/email';
import { appendLeadToSheet } from '@/lib/lead/google-sheets';
import { sendMetaConversion } from '@/lib/lead/meta-capi';
import { checkRateLimit } from '@/lib/lead/rate-limit';
import { postLeadToOs } from '@/lib/lead/synphos-os';
import { PRIORITIES, wasCaptured, type Lead } from '@/lib/lead/types';
import { utmFromUrl } from '@/lib/lead/utm';

const TIMELINES = ['immediately', '3-6-months', '6-12-months', '12-plus-months'];
const UNIT_IDS = units.map((unit) => unit.id);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, max: number): string {
    return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

/** A browser always sends Origin on this POST. Refuse another site's page, and a
 * caller with no Origin at all, once the site's address is configured. */
function fromOurSite(request: Request): boolean {
    const site = process.env.NEXT_PUBLIC_SITE_URL;
    if (!site) return true;
    const origin = request.headers.get('origin');
    try {
        return !!origin && new URL(origin).host === new URL(site).host;
    } catch {
        return false;
    }
}

function clientIp(request: Request): string {
    return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || '';
}

export async function POST(request: Request) {
    if (!fromOurSite(request)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const ip = clientIp(request);
    // Off when no store is configured; lets the request through if the store fails.
    if ((await checkRateLimit(ip)) === 'limited') {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    let body: Record<string, unknown>;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    if (typeof body !== 'object' || body === null) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Honeypot: hidden from people, filled by bots. Answer as usual, capture nothing.
    if (text(body.website, 200)) {
        return NextResponse.json({ success: true });
    }

    const timeline = text(body.timeline, 40);
    const preferredUnit = text(body.preferredUnit, 10);
    const priority = text(body.priority, 20);
    const sourceUrl = text(body.sourceUrl, 500);
    const lead: Lead = {
        source: body.source === 'whatsapp' || body.source === 'sms' ? body.source : 'form',
        priority: (PRIORITIES as readonly string[]).includes(priority) ? (priority as Lead['priority']) : '',
        utm: utmFromUrl(sourceUrl),
        firstName: text(body.firstName, 200),
        lastName: text(body.lastName, 200),
        email: text(body.email, 200),
        phone: text(body.phone, 50),
        preferredContact: text(body.preferredContact, 50),
        timeline: TIMELINES.includes(timeline) ? timeline : '',
        preferredUnit: UNIT_IDS.includes(preferredUnit) ? preferredUnit : '',
        message: text(body.message, 2000),
        marketingConsent: body.marketingConsent === true,
        // The form calls it privacyConsent: the agreement to be contacted.
        contactConsent: body.privacyConsent === true,
        adConsent: body.adConsent === true,
        lang: body.lang === 'hu' ? 'hu' : 'en',
        sourceUrl,
    };

    // What it takes to answer: a first name, a phone or an email (an email, when
    // given, must be valid), and the agreement to be contacted.
    const complete = !!lead.firstName && !!(lead.phone || lead.email) && (!lead.email || EMAIL_PATTERN.test(lead.email));
    if (!complete || !lead.contactConsent) {
        return NextResponse.json({ error: 'First name, phone or email, and consent are required' }, { status: 400 });
    }

    // Every channel handles its own errors and its own missing configuration,
    // so one being down or absent never takes another with it. All are awaited:
    // a serverless function can freeze right after it responds.
    const [os, sheet, email] = await Promise.all([
        postLeadToOs(lead),
        appendLeadToSheet(lead),
        sendLeadEmail(lead),
        sendMetaConversion(lead, {
            eventId: text(body.eventId, 100),
            fbp: text(body.fbp, 200),
            fbc: text(body.fbc, 500),
            ip,
            userAgent: request.headers.get('user-agent') || '',
        }),
    ]);

    if (!wasCaptured({ os, sheet, email })) {
        // Also stops the browser Pixel, which only fires on a successful response.
        console.error(`Lead not captured: os=${os} sheet=${sheet} email=${email}`);
        return NextResponse.json({ error: 'Failed to submit lead' }, { status: 503 });
    }

    return NextResponse.json({ success: true });
}
