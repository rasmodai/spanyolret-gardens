import { createHash } from 'crypto';

/* Per-IP limit on lead submissions, kept in a Redis that speaks the Upstash REST
 * protocol (Upstash free tier, or a Vercel KV / Upstash integration). No paid
 * service is required, and nothing is required at all:
 *   - store not configured  -> 'disabled', every request goes through;
 *   - store down or erroring -> 'error', the request goes through too. A real
 *     lead is never lost because the anti-abuse store is unavailable.
 * Only a salted SHA-256 of the IP is stored, for the length of the window. */

export type RateLimitResult = 'allowed' | 'limited' | 'disabled' | 'error';

function positiveInt(raw: string | undefined, fallback: number): number {
    const value = Number(raw);
    return Number.isInteger(value) && value > 0 ? value : fallback;
}

export function rateLimitSettings() {
    const env = process.env;
    // Our own names first, then the names set by the Upstash / KV integrations.
    const url = env.RATE_LIMIT_REDIS_REST_URL || env.KV_REST_API_URL || env.UPSTASH_REDIS_REST_URL || '';
    const token = env.RATE_LIMIT_REDIS_REST_TOKEN || env.KV_REST_API_TOKEN || env.UPSTASH_REDIS_REST_TOKEN || '';
    return {
        url: url.replace(/\/+$/, ''),
        token,
        max: positiveInt(process.env.LEAD_RATE_LIMIT_MAX, 5),
        windowSeconds: positiveInt(process.env.LEAD_RATE_LIMIT_WINDOW_SECONDS, 3600),
    };
}

export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
    const { url, token, max, windowSeconds } = rateLimitSettings();
    if (!url || !token) return 'disabled';
    if (!ip) return 'allowed';

    const salt = process.env.RATE_LIMIT_SALT || 'spanyolret-gardens';
    const key = `lead-rl:${createHash('sha256').update(`${salt}:${ip}`).digest('hex')}`;

    try {
        // SET NX EX opens the window once; INCR keeps the expiry already set.
        const response = await fetch(`${url}/pipeline`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify([
                ['SET', key, '0', 'EX', String(windowSeconds), 'NX'],
                ['INCR', key],
            ]),
            signal: AbortSignal.timeout(2000),
        });
        if (!response.ok) {
            console.error(`Rate limit store: ${response.status}`);
            return 'error';
        }
        const results = (await response.json()) as { result?: unknown; error?: string }[];
        const count = Number(results?.[1]?.result);
        if (!Number.isFinite(count)) {
            console.error('Rate limit store: unexpected answer');
            return 'error';
        }
        return count > max ? 'limited' : 'allowed';
    } catch (error) {
        console.error('Rate limit store unreachable:', error);
        return 'error';
    }
}
