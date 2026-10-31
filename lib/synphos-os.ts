/**
 * Posts a lead to the buyer pipeline of Synphos OS (Postgres; see the
 * "buyer leads pipeline" pull request of rasmodai/synphos-os). Skipped unless
 * SYNPHOS_OS_URL and SYNPHOS_OS_LEADS_TOKEN are both set: configure them only
 * once that OS change is deployed. Returns true only when the OS stored it.
 */
export interface OsLead {
    firstName: string;
    lastName?: string;
    email: string;
    phone?: string;
    lang?: string;
    preferredUnit?: string;
    timeline?: string;
    message?: string;
    marketingConsent?: boolean;
    privacyConsent?: boolean;
    sourceUrl?: string;
}

export async function postLeadToOs(lead: OsLead): Promise<boolean> {
    const url = process.env.SYNPHOS_OS_URL;
    const token = process.env.SYNPHOS_OS_LEADS_TOKEN;
    if (!url || !token) return false;

    let utm: Record<string, string> = {};
    try {
        const params = new URL(lead.sourceUrl || '').searchParams;
        for (const key of ['source', 'medium', 'campaign', 'term', 'content']) {
            const value = params.get(`utm_${key}`);
            if (value) utm[key] = value.slice(0, 200);
        }
    } catch {
        utm = {};
    }

    try {
        const response = await fetch(`${url.replace(/\/+$/, '')}/api/os/leads`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client: 'spanyolret-gardens',
                source: 'form',
                firstName: lead.firstName,
                lastName: lead.lastName,
                email: lead.email,
                phone: lead.phone,
                lang: lead.lang === 'hu' ? 'hu' : 'en',
                preferredUnit: lead.preferredUnit,
                timeline: lead.timeline,
                message: lead.message,
                marketingConsent: lead.marketingConsent === true,
                // Both forms (EN, HU) refuse to submit without the privacy box ticked.
                contactConsent: lead.privacyConsent === true,
                sourceUrl: lead.sourceUrl,
                utm,
            }),
            signal: AbortSignal.timeout(5000),
        });
        if (!response.ok) {
            console.error(`Synphos OS lead ingest: ${response.status}`);
            return false;
        }
        return true;
    } catch (error) {
        console.error('Synphos OS lead ingest failed:', error);
        return false;
    }
}
