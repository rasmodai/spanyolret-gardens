'use client';

import { useEffect, useRef } from 'react';

/* Material motion, not decorative motion. DESIGN.md → Motion.
 *
 * The critical constraint, learned the hard way on this project: motion must
 * never gate content. The previous system had 28 elements sitting at
 * `opacity: 0` waiting for an IntersectionObserver that did not always fire,
 * which rendered the page blank on anchor navigation and on print.
 *
 * So the base state here is *visible*. The animation class is only ever added,
 * never required — if JS fails, if the observer never fires, if the browser is
 * old, the element is simply already there. That is the whole design of this
 * hook and it should not be changed.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.2) {
    const ref = useRef<T>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Respect the setting rather than merely shortening the duration: a
        // clip-path wipe is exactly the kind of motion that triggers vestibular
        // discomfort, and the content is already in its final state.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('reveal-run');
                    observer.disconnect();
                }
            },
            { threshold, rootMargin: '0px 0px -8% 0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return ref;
}
