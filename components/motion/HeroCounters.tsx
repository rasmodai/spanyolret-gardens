'use client';

import { useEffect } from 'react';

/* The key figures of the hero (`data-count` in the markup) count up to their
 * value, once. The markup is the final state: without JS, with reduced motion
 * or in a hidden tab, the figures are simply there. Renders nothing. */
export default function HeroCounters() {
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (document.visibilityState !== 'visible') return;
        const numbers = Array.from(document.querySelectorAll<HTMLElement>('#hero [data-count]'));
        if (!numbers.length) return;

        const finals = numbers.map((element) => parseInt(element.textContent ?? '0', 10));
        const froms = numbers.map((element) => parseInt(element.dataset.from ?? '0', 10));
        numbers.forEach((element) => {
            // Same width from start to end: nothing around the figure moves.
            element.style.display = 'inline-block';
            element.style.minWidth = `${element.textContent?.length ?? 1}ch`;
            element.style.textAlign = 'right';
            element.textContent = String(parseInt(element.dataset.from ?? '0', 10));
        });

        let frameId = 0;
        let start: number | null = null;
        const duration = 1100;
        const step = (timestamp: number) => {
            if (start === null) start = timestamp;
            const progress = Math.min(1, (timestamp - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            numbers.forEach((element, i) => {
                element.textContent = String(Math.round(froms[i] + (finals[i] - froms[i]) * eased));
            });
            if (progress < 1) frameId = requestAnimationFrame(step);
        };
        const begin = window.setTimeout(() => {
            frameId = requestAnimationFrame(step);
        }, 600);
        // Safety net: whatever happens, the final figures are there at 2.4 s.
        const settle = () => numbers.forEach((element, i) => (element.textContent = String(finals[i])));
        const done = window.setTimeout(settle, 2400);

        return () => {
            window.clearTimeout(begin);
            window.clearTimeout(done);
            cancelAnimationFrame(frameId);
            settle();
        };
    }, []);

    return null;
}
