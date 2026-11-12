import mixpanel from 'mixpanel-browser';
import { readConsent } from './consent';

/* Analytics must never break the page. Every call is a no-op without a token,
 * without the visitor's cookie consent, or after a failed init. Events carry
 * behaviour only, no name, email or phone. */

let state: 'idle' | 'ready' | 'broken' = 'idle';

function ready(): boolean {
    const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
    if (!token || typeof window === 'undefined' || state === 'broken') return false;
    if (readConsent() !== 'accepted') return false;
    try {
        if (state === 'idle') {
            // EU data residency: NEXT_PUBLIC_MIXPANEL_API_HOST=https://api-eu.mixpanel.com
            const apiHost = process.env.NEXT_PUBLIC_MIXPANEL_API_HOST;
            mixpanel.init(token, { persistence: 'localStorage', track_pageview: false, ...(apiHost ? { api_host: apiHost } : {}) });
            mixpanel.register({ site: 'spanyolret-gardens', language: window.location.pathname.startsWith('/hu') ? 'hu' : 'en' });
            // First touch: the campaign that first brought this device, kept on every later event.
            const params = new URLSearchParams(window.location.search);
            const firstTouch: Record<string, string> = { first_referrer: document.referrer || '$direct', first_page: window.location.pathname };
            ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((key) => {
                const value = params.get(key);
                if (value) firstTouch[`first_${key}`] = value;
            });
            mixpanel.register_once(firstTouch);
            state = 'ready';
        }
        // Consent given again after a refusal on the same page.
        if (mixpanel.has_opted_out_tracking()) mixpanel.opt_in_tracking();
        return true;
    } catch (error) {
        console.warn('Mixpanel init failed:', error);
        state = 'broken';
        return false;
    }
}

export function track(event: string, properties?: Record<string, unknown>) {
    if (!ready()) return;
    try {
        mixpanel.track(event, properties);
    } catch (error) {
        console.warn('Mixpanel track failed:', error);
    }
}

/** For events sent while the page closes: the browser delivers them after unload. */
export function trackOnLeave(event: string, properties?: Record<string, unknown>) {
    if (!ready()) return;
    try {
        mixpanel.track(event, properties, { transport: 'sendBeacon' });
    } catch (error) {
        console.warn('Mixpanel track failed:', error);
    }
}

/** Called when the visitor withdraws consent: stop sending and forget the device id. */
export function stopTracking() {
    if (state !== 'ready') return;
    try {
        mixpanel.opt_out_tracking();
        mixpanel.reset();
    } catch (error) {
        console.warn('Mixpanel opt-out failed:', error);
    }
}
