import type { ChannelResult, Lead } from './types';

const TIMEOUT_MS = 5000;

/**
 * Posts a lead to the buyer pipeline of Synphos OS (Postgres, see the OS pull
 * request "buyer leads pipeline"). Skipped unless URL, token and client name are
 * all set. Do not configure it before that OS change is deployed.
 */
export async function postLeadToOs(lead: Lead): Promise<ChannelResult> {
    const url = process.env.SYNPHOS_OS_URL;
    const token = process.env.SYNPHOS_OS_LEADS_TOKEN;
    const client = process.env.SYNPHOS_OS_CLIENT;
    if (!url || !token || !client) {
        console.warn('Synphos OS not configured: channel skipped');
        return 'skipped';
    }

    try {
        const response = await fetch(`${url.replace(/\/+$/, '')}/api/os/leads`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            // Empty optional fields are left out, as before: the OS validates what it receives.
            body: JSON.stringify({
                client,
                source: lead.source,
                priority: lead.priority || undefined,
                firstName: lead.firstName,
                lastName: lead.lastName || undefined,
                email: lead.email || undefined,
                phone: lead.phone || undefined,
                lang: lead.lang,
                preferredUnit: lead.preferredUnit || undefined,
                timeline: lead.timeline || undefined,
                message: lead.message || undefined,
                marketingConsent: lead.marketingConsent,
                // The API refuses any lead without the privacy box ticked.
                contactConsent: lead.contactConsent,
                sourceUrl: lead.sourceUrl || undefined,
                utm: lead.utm,
            }),
            signal: AbortSignal.timeout(TIMEOUT_MS),
        });
        if (!response.ok) {
            console.error(`Synphos OS lead ingest: ${response.status}`);
            return 'failed';
        }
        return 'ok';
    } catch (error) {
        console.error('Synphos OS lead ingest failed:', error);
        return 'failed';
    }
}
