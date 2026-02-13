import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

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
        const subject = isHungarian
            ? `Spanyolret Gardens - Uj erdeklodo: ${body.firstName} ${body.lastName}`
            : `Spanyolret Gardens - New Lead: ${body.firstName} ${body.lastName}`;

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
                            <td style="padding: 8px 0;">${body.firstName} ${body.lastName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Email</td>
                            <td style="padding: 8px 0;"><a href="mailto:${body.email}" style="color: #1a3a2a;">${body.email}</a></td>
                        </tr>
                        ${body.phone ? `
                        <tr>
                            <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Phone</td>
                            <td style="padding: 8px 0;"><a href="tel:${body.phone}" style="color: #1a3a2a;">${body.phone}</a></td>
                        </tr>` : ''}
                        ${body.timeline ? `
                        <tr>
                            <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Timeline</td>
                            <td style="padding: 8px 0;">${body.timeline}</td>
                        </tr>` : ''}
                        ${body.preferredUnit ? `
                        <tr>
                            <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Preferred Unit</td>
                            <td style="padding: 8px 0;">${body.preferredUnit}</td>
                        </tr>` : ''}
                        ${body.preferredContact ? `
                        <tr>
                            <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Preferred Contact</td>
                            <td style="padding: 8px 0;">${body.preferredContact}</td>
                        </tr>` : ''}
                        ${body.message ? `
                        <tr>
                            <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Message</td>
                            <td style="padding: 8px 0;">${body.message}</td>
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

        const { error } = await resend.emails.send({
            from: 'Spanyolret Gardens <noreply@studiosynphos.com>',
            to: ['brenda@studiosynphos.com', 'remi@studiosynphos.com'],
            subject,
            html,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json(
                { error: 'Failed to send email' },
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
