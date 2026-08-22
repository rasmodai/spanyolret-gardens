/**
 * Google Sheets CRM integration.
 * Appends new leads to the Spanyolrét Gardens CRM spreadsheet.
 * Uses OAuth2 refresh token flow — no npm dependencies needed.
 */

const SPREADSHEET_ID = '1GWT0mGRM4DWYwVRBJwtsFP9-NnjtI8fYWJ6jiZXBtLw';
const SHEET_RANGE = 'Leads!A:Q';

interface LeadRow {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  preferredContact?: string;
  timeline?: string;
  preferredUnit?: string;
  message?: string;
  marketingConsent?: boolean;
}

async function getAccessToken(): Promise<string> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Google Sheets credentials not configured');
  }

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

  if (!res.ok) {
    const err = await res.text();
    console.error('Google OAuth token refresh failed:', err);
    throw new Error('Failed to refresh Google access token');
  }

  const data = await res.json();
  return data.access_token;
}

async function getNextLeadNumber(accessToken: string): Promise<number> {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Leads!A:A`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (!res.ok) return 1;

  const data = await res.json();
  const values = data.values || [];
  // Skip header rows (first 2 rows), find highest lead number
  let max = 0;
  for (let i = 2; i < values.length; i++) {
    const num = parseInt(values[i]?.[0], 10);
    if (!isNaN(num) && num > max) max = num;
  }
  return max + 1;
}

function mapTimeline(raw?: string): string {
  if (!raw) return '';
  const map: Record<string, string> = {
    'asap': 'Immediately',
    'immediately': 'Immediately',
    '3-6-months': '3–6 months',
    '3-6 months': '3–6 months',
    '6months': '6–12 months',
    '6-12-months': '6–12 months',
    '6-12 months': '6–12 months',
    '12months': '12+ months',
    '12-plus-months': '12+ months',
    '12+ months': '12+ months',
    'exploring': '',
  };
  return map[raw.toLowerCase()] || raw;
}

function mapUnit(raw?: string): string {
  if (!raw) return '';
  const map: Record<string, string> = {
    'any': 'Any',
    'smallest-garden': 'B2',
    'largest-garden': 'B3',
    'largest-interior': 'A2',
  };
  return map[raw.toLowerCase()] || raw;
}

function mapContact(raw?: string): string {
  if (!raw) return '';
  const map: Record<string, string> = {
    'email': 'Email',
    'phone': 'Phone',
    'whatsapp': 'WhatsApp',
  };
  return map[raw.toLowerCase()] || raw;
}

export async function appendLeadToSheet(lead: LeadRow): Promise<boolean> {
  try {
    const accessToken = await getAccessToken();
    const leadNum = await getNextLeadNumber(accessToken);

    const today = new Date().toISOString().split('T')[0];

    const row = [
      leadNum,                                    // #
      today,                                      // Date
      lead.firstName,                             // First Name
      lead.lastName,                              // Last Name
      lead.email,                                 // Email
      lead.phone || '',                           // Phone
      mapContact(lead.preferredContact),           // Pref. Contact
      'Website',                                  // Source
      mapTimeline(lead.timeline),                  // Timeline
      'Lead Captured',                            // Stage
      mapUnit(lead.preferredUnit),                 // Preferred Unit
      '',                                         // Lead Score
      'First contact',                            // Next Action
      '',                                         // Next Action Date
      '',                                         // Last Contact
      lead.message || '',                         // Notes
      lead.marketingConsent ? 'Yes' : 'No',       // Mkt Consent
    ];

    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_RANGE}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: [row] }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error('Google Sheets append failed:', err);
      return false;
    }

    console.log(`Lead #${leadNum} added to CRM: ${lead.firstName} ${lead.lastName}`);
    return true;
  } catch (err) {
    console.error('Google Sheets CRM error:', err);
    return false;
  }
}
