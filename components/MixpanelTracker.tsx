'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { track, registerSuperProperties, setUserPropertiesOnce, timeEvent } from '@/lib/mixpanel';

// ─── Sections to observe for visibility tracking ───
const SECTION_IDS = [
    'hero', 'trust-bar', 'problem-solution', 'property-overview',
    'gallery', 'benefits', 'floor-plans', 'location',
    'developer', 'specs', 'process', 'faq', 'lead-form', 'footer'
];

// ─── Scroll depth thresholds ───
const SCROLL_THRESHOLDS = [25, 50, 75, 90, 100];

export default function MixpanelTracker() {
    const pathname = usePathname();
    const scrollMilestones = useRef(new Set<number>());
    const sectionsViewed = useRef(new Set<string>());
    const sessionStart = useRef(Date.now());
    const maxScrollDepth = useRef(0);
    const engagementInterval = useRef<NodeJS.Timeout | null>(null);
    const isHungarian = pathname.startsWith('/hu');

    // ─── UTM & Referrer tracking on mount ───
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const utmProps: Record<string, string> = {};
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(key => {
            const val = params.get(key);
            if (val) utmProps[key] = val;
        });

        // Also capture fbclid, gclid
        const fbclid = params.get('fbclid');
        const gclid = params.get('gclid');
        if (fbclid) utmProps.fbclid = fbclid;
        if (gclid) utmProps.gclid = gclid;

        if (Object.keys(utmProps).length > 0) {
            registerSuperProperties(utmProps);
        }

        // Set first-touch properties
        const landing = {
            $initial_referrer: document.referrer || '$direct',
            first_landing_page: window.location.pathname,
            language: isHungarian ? 'hu' : 'en',
        };
        setUserPropertiesOnce(landing);
        registerSuperProperties({ language: isHungarian ? 'hu' : 'en' });

        // Track page-level engagement time
        timeEvent('Page Engagement');

        // Device info
        track('Session Started', {
            screen_width: window.screen.width,
            screen_height: window.screen.height,
            viewport_width: window.innerWidth,
            viewport_height: window.innerHeight,
            device_pixel_ratio: window.devicePixelRatio,
            user_agent: navigator.userAgent,
            referrer: document.referrer || '$direct',
            landing_page: window.location.pathname,
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ─── Track engagement time on unload ───
    useEffect(() => {
        const handleUnload = () => {
            const duration = Math.round((Date.now() - sessionStart.current) / 1000);
            track('Page Engagement', {
                duration_seconds: duration,
                max_scroll_depth: maxScrollDepth.current,
                sections_viewed: Array.from(sectionsViewed.current),
                sections_viewed_count: sectionsViewed.current.size,
                page: pathname,
            });
        };

        window.addEventListener('beforeunload', handleUnload);
        return () => window.removeEventListener('beforeunload', handleUnload);
    }, [pathname]);

    // ─── Periodic engagement ping (every 30s) ───
    useEffect(() => {
        engagementInterval.current = setInterval(() => {
            const duration = Math.round((Date.now() - sessionStart.current) / 1000);
            track('Engagement Ping', {
                duration_seconds: duration,
                max_scroll_depth: maxScrollDepth.current,
                page: pathname,
            });
        }, 30_000);

        return () => {
            if (engagementInterval.current) clearInterval(engagementInterval.current);
        };
    }, [pathname]);

    // ─── Scroll depth tracking ───
    useEffect(() => {
        scrollMilestones.current.clear();

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight <= 0) return;
            const pct = Math.round((scrollTop / docHeight) * 100);

            if (pct > maxScrollDepth.current) {
                maxScrollDepth.current = pct;
            }

            for (const threshold of SCROLL_THRESHOLDS) {
                if (pct >= threshold && !scrollMilestones.current.has(threshold)) {
                    scrollMilestones.current.add(threshold);
                    track('Scroll Depth', {
                        depth_percent: threshold,
                        page: pathname,
                    });
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    // ─── Section visibility via IntersectionObserver ───
    useEffect(() => {
        sectionsViewed.current.clear();
        const timers: Record<string, number> = {};

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.id;
                    if (entry.isIntersecting) {
                        timers[id] = Date.now();
                        if (!sectionsViewed.current.has(id)) {
                            sectionsViewed.current.add(id);
                            track('Section Viewed', {
                                section: id,
                                page: pathname,
                            });
                        }
                    } else if (timers[id]) {
                        const duration = Math.round((Date.now() - timers[id]) / 1000);
                        if (duration >= 2) {
                            track('Section Time Spent', {
                                section: id,
                                duration_seconds: duration,
                                page: pathname,
                            });
                        }
                        delete timers[id];
                    }
                });
            },
            { threshold: 0.3 }
        );

        SECTION_IDS.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [pathname]);

    // ─── Video tracking ───
    useEffect(() => {
        const videos = document.querySelectorAll('video');
        const tracked = new Map<HTMLVideoElement, { played25: boolean; played50: boolean; played75: boolean; completed: boolean }>();

        const handlePlay = (e: Event) => {
            const v = e.target as HTMLVideoElement;
            track('Video Play', { video_src: v.currentSrc, page: pathname });
        };
        const handlePause = (e: Event) => {
            const v = e.target as HTMLVideoElement;
            if (!v.ended) {
                track('Video Pause', {
                    video_src: v.currentSrc,
                    current_time: Math.round(v.currentTime),
                    duration: Math.round(v.duration),
                    percent_watched: Math.round((v.currentTime / v.duration) * 100),
                    page: pathname,
                });
            }
        };
        const handleTimeUpdate = (e: Event) => {
            const v = e.target as HTMLVideoElement;
            if (!v.duration) return;
            const pct = (v.currentTime / v.duration) * 100;
            let state = tracked.get(v);
            if (!state) { state = { played25: false, played50: false, played75: false, completed: false }; tracked.set(v, state); }

            if (pct >= 25 && !state.played25) { state.played25 = true; track('Video Progress', { milestone: 25, video_src: v.currentSrc, page: pathname }); }
            if (pct >= 50 && !state.played50) { state.played50 = true; track('Video Progress', { milestone: 50, video_src: v.currentSrc, page: pathname }); }
            if (pct >= 75 && !state.played75) { state.played75 = true; track('Video Progress', { milestone: 75, video_src: v.currentSrc, page: pathname }); }
        };
        const handleEnded = (e: Event) => {
            const v = e.target as HTMLVideoElement;
            track('Video Completed', { video_src: v.currentSrc, page: pathname });
        };

        videos.forEach((v) => {
            v.addEventListener('play', handlePlay);
            v.addEventListener('pause', handlePause);
            v.addEventListener('timeupdate', handleTimeUpdate);
            v.addEventListener('ended', handleEnded);
        });

        return () => {
            videos.forEach((v) => {
                v.removeEventListener('play', handlePlay);
                v.removeEventListener('pause', handlePause);
                v.removeEventListener('timeupdate', handleTimeUpdate);
                v.removeEventListener('ended', handleEnded);
            });
        };
    }, [pathname]);

    // ─── Click tracking via event delegation ───
    const handleClick = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;

        // Walk up the DOM to find the nearest meaningful element
        const el = target.closest('a, button, [role="button"]') as HTMLElement | null;
        if (!el) return;

        // Button / CTA click
        if (el.tagName === 'BUTTON' || el.getAttribute('role') === 'button') {
            const text = el.textContent?.trim().slice(0, 80) || '';
            const type = el.getAttribute('type') || 'button';
            const section = el.closest('section')?.id || 'unknown';

            // Skip form submit buttons — tracked separately
            if (type === 'submit') return;

            track('Button Click', {
                button_text: text,
                button_type: type,
                section,
                page: pathname,
            });
        }

        // Link click
        if (el.tagName === 'A') {
            const anchor = el as HTMLAnchorElement;
            const href = anchor.getAttribute('href') || '';
            const text = anchor.textContent?.trim().slice(0, 80) || '';
            const section = anchor.closest('section')?.id || 'unknown';
            const isExternal = anchor.hostname !== window.location.hostname;
            const isDownload = anchor.hasAttribute('download');
            const isAnchor = href.startsWith('#');

            if (isDownload) {
                track('Download Click', {
                    file_url: href,
                    link_text: text,
                    section,
                    page: pathname,
                });
            } else if (isExternal) {
                track('External Link Click', {
                    destination_url: href,
                    link_text: text,
                    section,
                    page: pathname,
                });
            } else if (isAnchor) {
                track('Navigation Click', {
                    target_section: href.replace('#', ''),
                    link_text: text,
                    source_section: section,
                    page: pathname,
                });
            } else {
                track('Internal Link Click', {
                    destination: href,
                    link_text: text,
                    section,
                    page: pathname,
                });
            }
        }
    }, [pathname]);

    useEffect(() => {
        document.addEventListener('click', handleClick, true);
        return () => document.removeEventListener('click', handleClick, true);
    }, [handleClick]);

    // ─── FAQ accordion tracking ───
    useEffect(() => {
        const faqSection = document.getElementById('faq');
        if (!faqSection) return;

        const handleFaqClick = (e: Event) => {
            const target = e.target as HTMLElement;
            const button = target.closest('button');
            if (!button) return;

            // FAQ question toggle — the button contains the question text
            const questionEl = button.querySelector('span, h3, p');
            const question = questionEl?.textContent?.trim().slice(0, 100) || button.textContent?.trim().slice(0, 100) || '';
            if (question) {
                track('FAQ Toggle', {
                    question,
                    page: pathname,
                });
            }
        };

        faqSection.addEventListener('click', handleFaqClick);
        return () => faqSection.removeEventListener('click', handleFaqClick);
    }, [pathname]);

    // ─── Floor plan / unit interactions ───
    useEffect(() => {
        const floorSection = document.getElementById('floor-plans');
        if (!floorSection) return;

        const handleFloorClick = (e: Event) => {
            const target = e.target as HTMLElement;
            const button = target.closest('button');
            if (!button) return;
            const text = button.textContent?.trim() || '';

            // Tab/filter buttons
            if (text.includes('Site Plan') || text.includes('Building') || text.includes('Helyszínrajz') || text.includes('Épület')) {
                track('Floor Plan View Changed', { view: text, page: pathname });
            }
            if (text.includes('Ground Floor') || text.includes('1st Floor') || text.includes('Földszint') || text.includes('Emelet')) {
                track('Floor Selected', { floor: text, page: pathname });
            }
            if (text.includes('All Units') || text.includes('Összes')) {
                track('Unit Filter Changed', { filter: text, page: pathname });
            }
            if (text.includes('Request Details') || text.includes('Részletek')) {
                track('Unit Details Requested', { button_text: text, page: pathname });
            }
        };

        floorSection.addEventListener('click', handleFloorClick);
        return () => floorSection.removeEventListener('click', handleFloorClick);
    }, [pathname]);

    // ─── Specs tab tracking ───
    useEffect(() => {
        const specsSection = document.getElementById('specs');
        if (!specsSection) return;

        const handleSpecsClick = (e: Event) => {
            const target = e.target as HTMLElement;
            const button = target.closest('button');
            if (!button) return;
            const text = button.textContent?.trim() || '';
            if (text) {
                track('Specs Category Viewed', { category: text, page: pathname });
            }
        };

        specsSection.addEventListener('click', handleSpecsClick);
        return () => specsSection.removeEventListener('click', handleSpecsClick);
    }, [pathname]);

    // ─── Gallery interaction tracking ───
    useEffect(() => {
        const gallerySection = document.getElementById('gallery');
        if (!gallerySection) return;

        const handleGalleryClick = (e: Event) => {
            const target = e.target as HTMLElement;
            const card = target.closest('[class*="cursor-pointer"]') as HTMLElement | null;
            if (!card) return;

            const heading = card.querySelector('h3, h4, span');
            const label = heading?.textContent?.trim() || '';
            if (label) {
                track('Gallery Option Selected', { option: label, page: pathname });
            }
        };

        gallerySection.addEventListener('click', handleGalleryClick);
        return () => gallerySection.removeEventListener('click', handleGalleryClick);
    }, [pathname]);

    // ─── Exit intent (desktop only) ───
    useEffect(() => {
        let fired = false;
        const handleMouseLeave = (e: MouseEvent) => {
            if (fired) return;
            if (e.clientY <= 0) {
                fired = true;
                track('Exit Intent', {
                    time_on_page_seconds: Math.round((Date.now() - sessionStart.current) / 1000),
                    max_scroll_depth: maxScrollDepth.current,
                    sections_viewed: Array.from(sectionsViewed.current),
                    page: pathname,
                });
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [pathname]);

    // ─── Tab visibility (did they switch tabs?) ───
    useEffect(() => {
        const handleVisibility = () => {
            if (document.hidden) {
                track('Tab Hidden', {
                    time_on_page_seconds: Math.round((Date.now() - sessionStart.current) / 1000),
                    page: pathname,
                });
            } else {
                track('Tab Visible', { page: pathname });
            }
        };

        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, [pathname]);

    return null;
}
