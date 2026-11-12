'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useConsent } from '@/lib/consent';
import { track, trackOnLeave } from '@/lib/mixpanel';

const SECTION_IDS = ['hero', 'why-here', 'gallery', 'floor-plans', 'pricing', 'location', 'developer', 'specs', 'process', 'faq', 'lead-form', 'footer'];
const SCROLL_THRESHOLDS = [25, 50, 75, 100];

/* Behaviour only. Nothing is attached before cookie consent, and every call is a
 * no-op without a token (lib/mixpanel.ts). */
export default function MixpanelTracker() {
    const pathname = usePathname();
    const consent = useConsent();

    useEffect(() => {
        if (consent !== 'accepted') return;
        const params = new URLSearchParams(window.location.search);
        const campaign: Record<string, string> = {};
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
            const value = params.get(key);
            if (value) campaign[key] = value;
        });
        track('Page Viewed', {
            page: pathname,
            language: pathname.startsWith('/hu') ? 'hu' : 'en',
            referrer: document.referrer || '$direct',
            ...campaign,
        });

        const reached = new Set<number>();
        const onScroll = () => {
            const height = document.documentElement.scrollHeight - window.innerHeight;
            if (height <= 0) return;
            const percent = Math.round((window.scrollY / height) * 100);
            for (const threshold of SCROLL_THRESHOLDS) {
                if (percent >= threshold && !reached.has(threshold)) {
                    reached.add(threshold);
                    track('Scroll Depth', { depth_percent: threshold, page: pathname });
                }
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });

        const seen = new Set<string>();
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting && !seen.has(entry.target.id)) {
                        seen.add(entry.target.id);
                        track('Section Viewed', { section: entry.target.id, page: pathname });
                    }
                }
            },
            { threshold: 0.3 }
        );
        SECTION_IDS.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        const onClick = (event: MouseEvent) => {
            const target = (event.target as HTMLElement).closest('a, summary');
            if (!target) return;
            const label = target.textContent?.trim().slice(0, 100) ?? '';
            if (target.tagName === 'SUMMARY') {
                track('FAQ Toggled', { question: label, page: pathname });
            } else {
                const href = target.getAttribute('href') ?? '';
                const kind = href.startsWith('tel:')
                    ? 'phone'
                    : href.startsWith('mailto:')
                      ? 'email'
                      : /^https?:/.test(href) && !href.startsWith(window.location.origin)
                        ? 'outbound'
                        : target.hasAttribute('hreflang')
                          ? 'language'
                          : href.startsWith('#')
                            ? 'anchor'
                            : 'internal';
                track('Link Clicked', { label, href, kind, page: pathname });
                if (kind === 'phone') track('Phone Clicked', { page: pathname });
                if (target.closest('[data-track="offer"]')) track('Offer Clicked', { offer: 'parking', page: pathname });
            }
        };
        document.addEventListener('click', onClick, true);

        // Time actually spent on the page: counted only while it is visible.
        let visibleSince = document.visibilityState === 'visible' ? Date.now() : 0;
        let engagedMs = 0;
        let sent = false;
        const onVisibility = () => {
            if (document.visibilityState === 'hidden') {
                if (visibleSince) engagedMs += Date.now() - visibleSince;
                visibleSince = 0;
                if (!sent) {
                    sent = true;
                    trackOnLeave('Page Left', { page: pathname, engaged_seconds: Math.round(engagedMs / 1000), max_scroll_percent: Math.max(0, ...reached) });
                }
            } else {
                visibleSince = Date.now();
            }
        };
        document.addEventListener('visibilitychange', onVisibility);

        return () => {
            document.removeEventListener('visibilitychange', onVisibility);
            window.removeEventListener('scroll', onScroll);
            observer.disconnect();
            document.removeEventListener('click', onClick, true);
        };
    }, [pathname, consent]);

    return null;
}
