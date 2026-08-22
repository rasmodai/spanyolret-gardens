import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { appendLeadToSheet } from '@/lib/google-sheets';

const META_PIXEL_ID = '886458420654697';

function getResend() {
    return new Resend(process.env.RESEND_API_KEY);
}

interface LeadFormBody {
    firstName: string;
    lastName: string;
    email: string;
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
        em: [sha256(body.email)],
        fn: [sha256(body.firstName)],
        ln: [sha256(body.lastName)],
        client_ip_address: ip,
        client_user_agent: userAgent,
    };

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

        if (!body.firstName?.trim() || !body.email?.trim()) {
            return NextResponse.json(
                { error: 'Name and email are required' },
                { status: 400 }
            );
        }

        const isHungarian = body.lang === 'hu';
        const firstName = escapeHtml(body.firstName);
        const lastName = escapeHtml(body.lastName);
        const email = escapeHtml(body.email);
        const phone = body.phone ? escapeHtml(body.phone) : '';
        const timeline = body.timeline ? escapeHtml(body.timeline) : '';
        const preferredUnit = body.preferredUnit ? escapeHtml(body.preferredUnit) : '';
        const preferredContact = body.preferredContact ? escapeHtml(body.preferredContact) : '';
        const message = body.message ? escapeHtml(body.message) : '';

        const subject = isHungarian
            ? `Spanyolret Gardens - Uj erdeklodo: ${firstName} ${lastName}`
            : `Spanyolret Gardens - New Lead: ${firstName} ${lastName}`;

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
                            <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Email</td>
                            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #1a3a2a;">${email}</a></td>
                        </tr>
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
            lastName: body.lastName,
            email: body.email,
            phone: body.phone,
            preferredContact: body.preferredContact,
            timeline: body.timeline,
            preferredUnit: body.preferredUnit,
            message: body.message,
            marketingConsent: body.marketingConsent,
        });

        // Server-side conversion signal — independent of the CRM write above
        // and the email below, so a failure in either does not take this down
        // with it, and vice versa.
        await sendMetaConversionEvent(body, request).catch((e) =>
            console.error('Meta CAPI error:', e)
        );

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
        // since that depends on this response — if neither channel captured
        // the lead. One of the two succeeding is enough to call it captured.
        if (!savedToCrm && emailError) {
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
