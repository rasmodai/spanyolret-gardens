'use client';

import { useEffect } from 'react';

/* The scroll motion of the page, in one place: soft appearance of the blocks
 * marked `data-reveal`, the parallax of the full-width bands, the line of the
 * process timeline. CSS + IntersectionObserver + requestAnimationFrame, no
 * library. It renders nothing.
 *
 * The rule of this project (DESIGN.md → Motion): motion never gates content.
 * The server renders the final state of everything. Here, and only once an
 * observer is known to run, the blocks that are below the fold get a start
 * state (`.pre`); they lose it when they come into view, or after 1.5 s at the
 * latest if they are on screen and the observer did not fire, or before
 * printing. With prefers-reduced-motion, in a hidden tab or without
 * IntersectionObserver, nothing here runs and everything stays visible. */

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function PageMotion() {
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (!('IntersectionObserver' in window) || document.visibilityState !== 'visible') return;

        const cleanups: (() => void)[] = [];
        const all = <T extends Element>(selector: string) => Array.from(document.querySelectorAll<T>(selector));
        const frame = (callback: () => void) => {
            let pending = false;
            return () => {
                if (pending) return;
                pending = true;
                requestAnimationFrame(() => {
                    pending = false;
                    callback();
                });
            };
        };

        // ---- Blocks that appear as they come into view ------------------------
        const reveal = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    reveal.unobserve(entry.target);
                    entry.target.classList.add('in');
                    entry.target.classList.remove('pre');
                }
            },
            { rootMargin: '0px 0px -6% 0px' }
        );
        const viewport = window.innerHeight;
        for (const element of all<HTMLElement>('[data-reveal]')) {
            if (element.getBoundingClientRect().top > viewport) {
                element.classList.add('pre');
                reveal.observe(element);
            }
        }
        const release = () => {
            for (const element of all('.pre')) {
                element.classList.remove('pre');
                element.classList.add('in');
            }
        };
        const safety = window.setInterval(() => {
            let waiting = 0;
            for (const element of all('.pre')) {
                const box = element.getBoundingClientRect();
                if (box.top < window.innerHeight && box.bottom > 0) {
                    element.classList.remove('pre');
                    element.classList.add('in');
                } else waiting += 1;
            }
            if (!waiting) window.clearInterval(safety);
        }, 1500);
        window.addEventListener('beforeprint', release);
        cleanups.push(() => {
            reveal.disconnect();
            window.clearInterval(safety);
            window.removeEventListener('beforeprint', release);
            release();
        });

        // ---- Process timeline: the line draws as the section scrolls in -------
        const timeline = document.querySelector<HTMLElement>('[data-timeline]');
        if (timeline) {
            const steps = Array.from(timeline.querySelectorAll<HTMLElement>('[data-step]'));
            const update = () => {
                const box = timeline.getBoundingClientRect();
                const progress = clamp((window.innerHeight * 0.8 - box.top) / Math.max(box.height, 1), 0, 1);
                const last = Math.max(steps.length - 1, 1);
                steps.forEach((step, i) => {
                    step.style.setProperty('--sp', clamp(progress * last - i, 0, 1).toFixed(3));
                    step.classList.toggle('on', progress >= i / last - 0.001);
                });
            };
            const onScroll = frame(update);
            timeline.classList.add('armed');
            update();
            window.addEventListener('scroll', onScroll, { passive: true });
            window.addEventListener('resize', onScroll);
            const full = () => {
                timeline.classList.remove('armed');
                steps.forEach((step) => step.style.removeProperty('--sp'));
            };
            window.addEventListener('beforeprint', full);
            cleanups.push(() => {
                window.removeEventListener('scroll', onScroll);
                window.removeEventListener('resize', onScroll);
                window.removeEventListener('beforeprint', full);
                full();
            });
        }

        // ---- Full-width bands: the picture moves a little against the frame ---
        const pictures = all<HTMLElement>('.band-img');
        if (pictures.length) {
            const update = () => {
                const height = window.innerHeight;
                for (const picture of pictures) {
                    const box = (picture.parentElement as HTMLElement).getBoundingClientRect();
                    if (box.bottom < -50 || box.top > height + 50) continue;
                    const progress = (height - box.top) / (height + box.height);
                    picture.style.setProperty('--py', `${((0.5 - progress) * 2 * box.height * 0.1).toFixed(1)}px`);
                }
            };
            const onScroll = frame(update);
            update();
            window.addEventListener('scroll', onScroll, { passive: true });
            window.addEventListener('resize', onScroll);
            cleanups.push(() => {
                window.removeEventListener('scroll', onScroll);
                window.removeEventListener('resize', onScroll);
                pictures.forEach((picture) => picture.style.removeProperty('--py'));
            });
        }

        return () => cleanups.forEach((cleanup) => cleanup());
    }, []);

    return null;
}
