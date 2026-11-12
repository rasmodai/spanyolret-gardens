import { createHash } from 'crypto';
import type { ChannelResult, Lead, MetaContext } from './types';

function sha256(value: string): string {
    return createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

/** Pixel IDs are digits. Anything else is treated as not configured. */
export function validPixelId(raw: string | undefined): string | null {
    return raw && /^\d+$/.test(raw) ? raw : null;
}

/** Server-side Lead event of the Meta Conversions API, deduplicated with the
 * browser Pixel through the event id. The Pixel id comes from the same variable
 * as the browser Pixel: NEXT_PUBLIC_META_PIXEL_ID. */
export async function sendMetaConversion(lead: Lead, context: MetaContext): Promise<ChannelResult> {
    // Hashed or not, this is personal data sent to Meta: only when the visitor
    // accepted advertising measurement in the cookie banner. The email-news box
    // is a different consent and never covers this.
    if (!lead.adConsent) return 'skipped';

    const pixelId = validPixelId(process.env.NEXT_PUBLIC_META_PIXEL_ID);
    const accessToken = process.env.META_CONVERSIONS_API_TOKEN;
    if (!pixelId || !accessToken) {
        console.warn('Meta Conversions API not configured: channel skipped');
        return 'skipped';
    }

    const userData: Record<string, unknown> = {
        fn: [sha256(lead.firstName)],
        client_ip_address: context.ip,
        client_user_agent: context.userAgent,
    };
    if (lead.email) userData.em = [sha256(lead.email)];
    if (lead.lastName) userData.ln = [sha256(lead.lastName)];
    if (lead.phone) userData.ph = [sha256(lead.phone.replace(/[\s\-()]/g, ''))];
    if (context.fbp) userData.fbp = context.fbp;
    if (context.fbc) userData.fbc = context.fbc;

    try {
        const res = await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: [
                    {
                        event_name: 'Lead',
                        event_time: Math.floor(Date.now() / 1000),
                        event_id: context.eventId || undefined,
                        event_source_url: lead.sourceUrl || undefined,
                        action_source: 'website',
                        user_data: userData,
                    },
                ],
                access_token: accessToken,
            }),
        });
        if (!res.ok) {
            console.error(`Meta CAPI: ${res.status}`);
            return 'failed';
        }
        return 'ok';
    } catch (error) {
        console.error('Meta CAPI request failed:', error);
        return 'failed';
    }
}
