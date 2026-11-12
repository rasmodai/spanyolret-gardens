import { Resend } from 'resend';
import type { ChannelResult, Lead } from './types';

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/** The notification to the sales team. It is a notification, not the record: its
 * failure must not discard a lead another channel already captured. Sender and
 * recipients come from LEAD_EMAIL_FROM / LEAD_EMAIL_TO (repo is public). */
export async function sendLeadEmail(lead: Lead): Promise<ChannelResult> {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.LEAD_EMAIL_FROM;
    const to = (process.env.LEAD_EMAIL_TO || '')
        .split(',')
        .map((address) => address.trim())
        .filter(Boolean);
    if (!apiKey || !from || to.length === 0) {
        console.warn('Lead email not configured: channel skipped');
        return 'skipped';
    }

    const { source, priority } = lead;
    const isHungarian = lead.lang === 'hu';
    const firstName = escapeHtml(lead.firstName);
    const lastName = escapeHtml(lead.lastName);
    const email = escapeHtml(lead.email);
    const phone = escapeHtml(lead.phone);
    const timeline = escapeHtml(lead.timeline);
    const preferredUnit = escapeHtml(lead.preferredUnit);
    const preferredContact = escapeHtml(lead.preferredContact);
    const message = escapeHtml(lead.message);

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
                        <td style="padding: 8px 0;">${lead.marketingConsent ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Privacy Consent</td>
                        <td style="padding: 8px 0;">${lead.contactConsent ? 'Yes' : 'No'}</td>
                    </tr>
                </table>
            </div>
        </div>
    `;

    try {
        const { error } = await new Resend(apiKey).emails.send({ from, to, subject, html });
        if (error) {
            console.error('Resend error:', error);
            return 'failed';
        }
        return 'ok';
    } catch (error) {
        console.error('Resend request failed:', error);
        return 'failed';
    }
}
