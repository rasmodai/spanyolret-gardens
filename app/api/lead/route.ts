import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { appendLeadToSheet } from '@/lib/google-sheets';
import { postLeadToOs } from '@/lib/synphos-os';
import { checkRateLimit } from '@/lib/rate-limit';
import { PRIORITIES } from '@/lib/lead-message';
import { metaPixelId } from '@/lib/site';

const META_PIXEL_ID = metaPixelId;

function getResend() {
    return new Resend(process.env.RESEND_API_KEY);
}

interface LeadFormBody {
    firstName: string;
    lastName?: string;
    email?: string;
    /** 'whatsapp' / 'sms': the visitor chose to send a pre-written message; 'form': a call back. */
    source?: string;
    priority?: string;
    /** True only when the visitor accepted cookies: gates the Meta Conversions API. */
    adConsent?: boolean;
    /** Honeypot: humans leave it empty. */
    website?: string;
    phone?: string;
    timeline?: string;
    preferredUnit?: string;
    preferredContact?: string;
    message?: string;
    marketingConsent?: boolean;
    privacyConsent?: boolean;
    lang?: 'en' | 'hu';
    eventId?: string;
    sourceUrl?: string;
    fbp?: string;
    fbc?: string;
}

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function sha256(value: string): string {
    return createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

async function sendMetaConversionEvent(body: LeadFormBody, request: Request) {
    const accessToken = process.env.META_CONVERSIONS_API_TOKEN;
    if (!accessToken) {
        console.warn('META_CONVERSIONS_API_TOKEN not set — skipping CAPI event');
        return;
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
        || request.headers.get('x-real-ip')
        || '';
    const userAgent = request.headers.get('user-agent') || '';

    const userData: Record<string, unknown> = {
        fn: [sha256(body.firstName)],
        client_ip_address: ip,
        client_user_agent: userAgent,
    };

    if (body.email) userData.em = [sha256(body.email)];
    if (body.lastName) userData.ln = [sha256(body.lastName)];
    if (body.phone) {
        const normalized = body.phone.replace(/[\s\-()]/g, '');
        userData.ph = [sha256(normalized)];
    }
    if (body.fbp) userData.fbp = body.fbp;
    if (body.fbc) userData.fbc = body.fbc;

    const event = {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.eventId || undefined,
        event_source_url: body.sourceUrl || undefined,
        action_source: 'website',
        user_data: userData,
    };

    try {
        const res = await fetch(
            `https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: [event],
                    access_token: accessToken,
                }),
            }
        );

        if (!res.ok) {
            const err = await res.text();
            console.error('Meta CAPI error:', err);
        }
    } catch (err) {
        console.error('Meta CAPI request failed:', err);
    }
}

export async function POST(request: Request) {
    try {
        const body: LeadFormBody = await request.json();

        // Bots fill every field; a person never sees this one.
        if (body.website) return NextResponse.json({ success: true });

        // First name, a way to answer (phone or email) and the agreement to be
        // contacted: both forms refuse to send without them.
        if (!body.firstName?.trim() || !(body.phone?.trim() || body.email?.trim()) || body.privacyConsent !== true) {
            return NextResponse.json(
                { error: 'First name, phone or email, and consent are required' },
                { status: 400 }
            );
        }

        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || '';
        if ((await checkRateLimit(ip)) === 'limited') {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }

        const source = body.source === 'whatsapp' || body.source === 'sms' ? body.source : 'form';
        const priority = (PRIORITIES as readonly string[]).includes(body.priority ?? '') ? body.priority : undefined;

        const isHungarian = body.lang === 'hu';
        const firstName = escapeHtml(body.firstName);
        const lastName = escapeHtml(body.lastName ?? '');
        const email = escapeHtml(body.email ?? '');
        const phone = body.phone ? escapeHtml(body.phone) : '';
        const timeline = body.timeline ? escapeHtml(body.timeline) : '';
        const preferredUnit = body.preferredUnit ? escapeHtml(body.preferredUnit) : '';
        const preferredContact = body.preferredContact ? escapeHtml(body.preferredContact) : '';
        const message = body.message ? escapeHtml(body.message) : '';

        const channel = source === 'whatsapp' ? ' (WhatsApp)' : source === 'sms' ? ' (SMS)' : '';
        const subject = isHungarian
            ? `Spanyolret Gardens - Uj erdeklodo${channel}: ${firstName} ${lastName}`.trim()
            : `Spanyolret Gardens - New Lead${channel}: ${firstName} ${lastName}`.trim();

        const html = `
            <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                <div style="background: #1a3a2a; padding: 24px 32px; border-radius: 12px 12px 0 0;">
                    <h1 style="color: #fff; margin: 0; font-size: 20px;">
                        ${isHungarian ? 'Uj erdeklodo - Spanyolret Gardens' : 'New Lead - Spanyolret Gardens'}
                    </h1>
                    <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 14px;">
                        ${isHungarian ? 'Magyar urlap' : 'English form'}
                    </p>
                </div>
                <div style="background: #f9fafb; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; font-weight: 600; width: 140px; vertical-align: top;">Name</td>
                            <td style="padding: 8px 0;">${firstName} ${lastName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Channel</td>
                            <td style="padding: 8px 0;">${source === 'form' ? 'Call back requested' : `${source === 'sms' ? 'SMS' : 'WhatsApp'} message opened (check your phone)`}</td>
                        </tr>
                        ${priority ? `
                        <tr>
                            <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Priority</td>
                            <td style="padding: 8px 0;">${priority}</td>
                        </tr>` : ''}
                        ${email ? `
                        <tr>
                            <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Email</td>
                            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #1a3a2a;">${email}</a></td>
                        </tr>` : ''}
                        ${phone ? `
                        <tr>
                            <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Phone</td>
                            <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #1a3a2a;">${phone}</a></td>
                        </tr>` : ''}
                        ${timeline ? `
                        <tr>
                            <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Timeline</td>
                            <td style="padding: 8px 0;">${timeline}</td>
                        </tr>` : ''}
                        ${preferredUnit ? `
                        <tr>
                            <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Preferred Unit</td>
                            <td style="padding: 8px 0;">${preferredUnit}</td>
                        </tr>` : ''}
                        ${preferredContact ? `
                        <tr>
                            <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Preferred Contact</td>
                            <td style="padding: 8px 0;">${preferredContact}</td>
                        </tr>` : ''}
                        ${message ? `
                        <tr>
                            <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Message</td>
                            <td style="padding: 8px 0;">${message}</td>
                        </tr>` : ''}
                        <tr>
                            <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Marketing Consent</td>
                            <td style="padding: 8px 0;">${body.marketingConsent ? 'Yes' : 'No'}</td>
                        </tr>
                        ${body.privacyConsent !== undefined ? `
                        <tr>
                            <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Privacy Consent</td>
                            <td style="padding: 8px 0;">${body.privacyConsent ? 'Yes' : 'No'}</td>
                        </tr>` : ''}
                    </table>
                </div>
            </div>
        `;

        // The CRM row is the only durable record of this lead, so it goes first
        // and is awaited — a serverless function can freeze compute right after
        // it responds, so anything fired-and-forgotten here may never finish.
        const savedToCrm = await appendLeadToSheet({
            firstName: body.firstName,
            lastName: body.lastName ?? '',
            email: body.email ?? '',
            phone: body.phone,
            preferredContact: source === 'form' ? body.preferredContact : source,
            timeline: body.timeline,
            preferredUnit: body.preferredUnit,
            message: body.message,
            marketingConsent: body.marketingConsent,
        });

        // The OS buyer pipeline: a capture channel of its own, independent of the
        // Sheet and the email. Skipped while SYNPHOS_OS_URL / _LEADS_TOKEN are unset.
        const savedToOs = await postLeadToOs({
            source,
            priority,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phone: body.phone,
            lang: body.lang,
            preferredUnit: body.preferredUnit,
            timeline: body.timeline,
            message: body.message,
            marketingConsent: body.marketingConsent,
            privacyConsent: body.privacyConsent,
            sourceUrl: body.sourceUrl,
        });

        // Server-side conversion signal — independent of the CRM write above
        // and the email below, so a failure in either does not take this down
        // with it, and vice versa.
        // Only with the visitor's cookie consent (adConsent), like the Pixel.
        if (body.adConsent === true) {
            await sendMetaConversionEvent(body, request).catch((e) =>
                console.error('Meta CAPI error:', e)
            );
        }

        // Email is a notification, not the record. Its failure must not discard
        // a lead the CRM write above already captured.
        const { error: emailError } = await getResend().emails.send({
            from: 'Spanyolret Gardens <noreply@studiosynphos.com>',
            to: ['brenda@studiosynphos.com', 'remi@studiosynphos.com'],
            subject,
            html,
        });
        if (emailError) console.error('Resend error:', emailError);

        // Only fail the request — which also skips the client-side Pixel fire,
        // since that depends on this response — if no channel captured the
        // lead. The Sheet, the OS or the email succeeding is enough.
        if (!savedToCrm && !savedToOs && emailError) {
            return NextResponse.json(
                { error: 'Failed to submit lead' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Lead form error:', err);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
