import type { ChannelResult, Lead } from './types';

/* Appends the lead to the CRM sheet, through the OAuth2 refresh-token flow.
 * Same 17 columns as the sheet template: #, Date, First Name, Last Name, Email,
 * Phone, Pref. Contact, Source, Timeline, Stage, Preferred Unit, Lead Score,
 * Next Action, Next Action Date, Last Contact, Notes, Mkt Consent.
 * The sheet and its tab come from GOOGLE_SHEET_ID / GOOGLE_SHEET_TAB: this repo
 * is public, so no identifier of the CRM is written here. */

const TIMELINE_LABELS: Record<string, string> = {
    immediately: 'Immediately',
    '3-6-months': '3–6 months',
    '6-12-months': '6–12 months',
    '12-plus-months': '12+ months',
};

const CONTACT_LABELS: Record<string, string> = {
    email: 'Email',
    phone: 'Phone',
    whatsapp: 'WhatsApp',
};

async function getAccessToken(clientId: string, clientSecret: string, refreshToken: string): Promise<string> {
    const res = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
        }),
    });
    if (!res.ok) throw new Error(`Google token refresh: ${res.status}`);
    const data = await res.json();
    return data.access_token;
}

async function getNextLeadNumber(sheetId: string, tab: string, accessToken: string): Promise<number> {
    const range = encodeURIComponent(`${tab}!A:A`);
    const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) return 1;
    const data = await res.json();
    const values: string[][] = data.values || [];
    // The first two rows are the title and the header: skip them, find the highest lead number.
    let max = 0;
    for (let i = 2; i < values.length; i += 1) {
        const num = parseInt(values[i]?.[0], 10);
        if (!Number.isNaN(num) && num > max) max = num;
    }
    return max + 1;
}

export async function appendLeadToSheet(lead: Lead): Promise<ChannelResult> {
    const sheetId = process.env.GOOGLE_SHEET_ID;
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
    if (!sheetId || !clientId || !clientSecret || !refreshToken) {
        console.warn('Google Sheet not configured: channel skipped');
        return 'skipped';
    }
    const tab = process.env.GOOGLE_SHEET_TAB || 'Leads';

    try {
        const accessToken = await getAccessToken(clientId, clientSecret, refreshToken);
        const leadNumber = await getNextLeadNumber(sheetId, tab, accessToken);
        const preferredContact =
            lead.source === 'whatsapp' ? 'WhatsApp' : lead.source === 'sms' ? 'SMS' : CONTACT_LABELS[lead.preferredContact.toLowerCase()] ?? lead.preferredContact;
        const row = [
            leadNumber,
            new Date().toISOString().split('T')[0],
            lead.firstName,
            lead.lastName,
            lead.email,
            lead.phone,
            preferredContact,
            lead.utm.source ? `Website · ${lead.utm.source}${lead.utm.campaign ? ` / ${lead.utm.campaign}` : ''}` : 'Website',
            TIMELINE_LABELS[lead.timeline] ?? '',
            'Lead Captured',
            lead.preferredUnit,
            '',
            'First contact',
            '',
            '',
            [lead.priority && `Matters most: ${lead.priority}`, lead.message].filter(Boolean).join(' · '),
            lead.marketingConsent ? 'Yes' : 'No',
        ];

        // RAW, not USER_ENTERED: a visitor's "=IMPORTXML(...)" must stay text.
        const range = encodeURIComponent(`${tab}!A:Q`);
        const res = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
            {
                method: 'POST',
                headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ values: [row] }),
            }
        );
        if (!res.ok) {
            console.error(`Google Sheets append: ${res.status}`);
            return 'failed';
        }
        console.log(`Lead #${leadNumber} added to CRM`);
        return 'ok';
    } catch (error) {
        console.error('Google Sheets error:', error);
        return 'failed';
    }
}
