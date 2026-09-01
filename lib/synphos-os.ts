/**
 * Posts a lead to Synphos OS, which is the system of record.
 *
 * Returns a boolean rather than throwing: the caller treats every channel as
 * independent, so this one failing must not take the request down with it.
 * Errors are logged, never propagated.
 *
 * The token is read from the environment and never appears in this repository
 * — which is PUBLIC. It lives in the Vercel project's environment variables
 * and nowhere else.
 */
const DEFAULT_OS_URL = "https://synphos-os.vercel.app";
const TIMEOUT_MS = 5000;

export type OsLead = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  lang?: string;
  preferredContact?: string;
  preferredUnit?: string;
  timeline?: string;
  marketingConsent?: boolean;
  sourceUrl?: string;
};

export async function postLeadToOs(lead: OsLead): Promise<boolean> {
  const token = process.env.SYNPHOS_OS_LEADS_TOKEN;
  if (!token) {
    console.warn('SYNPHOS_OS_LEADS_TOKEN not set — skipping the OS channel');
    return false;
  }
  const base = (process.env.SYNPHOS_OS_URL || DEFAULT_OS_URL).replace(/\/+$/, '');

  try {
    const response = await fetch(`${base}/api/os/leads`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(TIMEOUT_MS),
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
