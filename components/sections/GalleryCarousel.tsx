'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { Copy } from '@/lib/copy/types';
import { fill } from '@/lib/format';
import { track } from '@/lib/mixpanel';

export interface CarouselShot {
    key: string;
    src: string;
    width: number;
    height: number;
    alt: string;
    caption: string;
}

const pad = (n: number) => (n < 10 ? `0${n}` : String(n));

/* The nine renders in a strip you can drag, scroll, step with the arrows or the
 * keyboard (the strip is focusable), with a progress bar; a click opens a
 * full-screen viewer (a native <dialog>: focus, Escape and the inert page come
 * with it). Everything is in the markup: without JS the strip still scrolls. */
export default function GalleryCarousel({
    eyebrow,
    title,
    lede,
    ui,
    shots,
}: {
    eyebrow: string;
    title: string;
    lede: string;
    ui: Copy['gallery']['ui'];
    shots: CarouselShot[];
}) {
    const trackRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const progRef = useRef<HTMLElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(0);

    // Arrows, progress bar and mouse drag.
    useEffect(() => {
        const strip = trackRef.current;
        const bar = barRef.current;
        const thumb = progRef.current;
        if (!strip || !bar || !thumb) return;

        const update = () => {
            const visible = strip.clientWidth;
            const total = strip.scrollWidth;
            const width = bar.clientWidth;
            const thumbWidth = Math.max((width * visible) / Math.max(total, 1), 32);
            const max = Math.max(total - visible, 1);
            thumb.style.width = `${thumbWidth}px`;
            thumb.style.transform = `translateX(${((strip.scrollLeft / max) * (width - thumbWidth)).toFixed(1)}px)`;
        };
        strip.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        update();

        let down = false;
        let moved = false;
        let startX = 0;
        let startLeft = 0;
        const onDown = (event: PointerEvent) => {
            if (event.pointerType !== 'mouse' || event.button !== 0) return;
            down = true;
            moved = false;
            startX = event.clientX;
            startLeft = strip.scrollLeft;
        };
        const onMove = (event: PointerEvent) => {
            if (!down) return;
            const dx = event.clientX - startX;
            if (Math.abs(dx) > 5) {
                moved = true;
                strip.classList.add('drag');
            }
            if (moved) strip.scrollLeft = startLeft - dx;
        };
        const onUp = () => {
            if (!down) return;
            down = false;
            strip.classList.remove('drag');
        };
        // A drag that ends over a picture must not open it.
        const onClickCapture = (event: MouseEvent) => {
            if (!moved) return;
            event.preventDefault();
            event.stopPropagation();
            moved = false;
        };
        strip.addEventListener('pointerdown', onDown);
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
        strip.addEventListener('click', onClickCapture, true);

        return () => {
            strip.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
            strip.removeEventListener('pointerdown', onDown);
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            strip.removeEventListener('click', onClickCapture, true);
        };
    }, []);

    const go = (direction: number) => {
        const strip = trackRef.current;
        const slide = strip?.querySelector('figure');
        if (!strip || !slide) return;
        const gap = window.innerWidth >= 640 ? 24 : 16;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        strip.scrollBy({ left: direction * (slide.getBoundingClientRect().width + gap), behavior: reduced ? 'auto' : 'smooth' });
    };

    const show = (index: number) => setCurrent((index + shots.length) % shots.length);
    const openViewer = (index: number) => {
        setCurrent(index);
        setOpen(true);
        track('Gallery Image Opened', { image: shots[index].key });
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (typeof dialog.showModal === 'function') dialog.showModal();
        else dialog.setAttribute('open', '');
        document.documentElement.style.overflow = 'hidden';
    };
    const closeViewer = () => {
        const dialog = dialogRef.current;
        if (dialog?.close) dialog.close();
        else dialog?.removeAttribute('open');
    };
    const onClosed = () => {
        setOpen(false);
        document.documentElement.style.removeProperty('overflow');
    };
    // Leaving the page with the viewer open must not leave the scroll locked.
    useEffect(
        () => () => {
            document.documentElement.style.removeProperty('overflow');
        },
        []
    );

    const shot = shots[current];

    return (
        <>
            <div className="section-container">
                <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-12" data-reveal>
                    <div className="max-w-[760px]">
                        <div className="caption mb-3.5">{eyebrow}</div>
                        <h2 className="display-l text-ink">{title}</h2>
                        <p className="lede mt-4">{lede}</p>
                    </div>
                    <div className="flex gap-2">
                        <button type="button" className="gal-arrow" aria-label={ui.previousImage} onClick={() => go(-1)}>
                            <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                <path d="M12 4l-6 6 6 6" />
                            </svg>
                        </button>
                        <button type="button" className="gal-arrow" aria-label={ui.nextImage} onClick={() => go(1)}>
                            <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                <path d="M8 4l6 6-6 6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div ref={trackRef} className="gal-track" tabIndex={0} role="region" aria-label={ui.region}>
                {shots.map((item, i) => (
                    <figure key={item.key} className="gal-slide">
                        <button type="button" aria-label={fill(ui.enlarge, { alt: item.alt })} onClick={() => openViewer(i)}>
                            <Image
                                src={item.src}
                                alt={item.alt}
                                width={item.width}
                                height={item.height}
                                sizes="(max-width: 640px) 82vw, 680px"
                                draggable={false}
                            />
                        </button>
                        <figcaption className="grid max-w-[60ch] grid-cols-[auto_1fr] gap-x-4 gap-y-1 pt-3 text-[0.9375rem] leading-snug text-ink-soft">
                            <span className="caption pt-[3px]">{pad(i + 1)}</span>
                            <span>{item.caption}</span>
                        </figcaption>
                    </figure>
                ))}
            </div>

            <div className="section-container">
                <div ref={barRef} className="gal-prog" aria-hidden="true">
                    <i ref={progRef} />
                </div>
                <p className="caption mt-3.5">{ui.hint}</p>
            </div>

            <dialog
                ref={dialogRef}
                className="lb"
                aria-label={ui.viewer}
                onClose={onClosed}
                onKeyDown={(event) => {
                    if (event.key === 'ArrowLeft') show(current - 1);
                    if (event.key === 'ArrowRight') show(current + 1);
                }}
            >
                <div className="lb-in">
                    <div className="flex min-h-12 items-center justify-between gap-3">
                        <span className="caption !text-[rgb(246_244_239_/_0.7)]">
                            {pad(current + 1)} / {pad(shots.length)}
                        </span>
                        <button type="button" className="lb-btn" onClick={closeViewer}>
                            {ui.close}
                        </button>
                    </div>
                    <div className="lb-photo-box">
                        {open && (
                            <Image
                                key={shot.key}
                                src={shot.src}
                                alt={shot.alt}
                                width={shot.width}
                                height={shot.height}
                                sizes="(max-width: 1600px) 100vw, 1600px"
                            />
                        )}
                    </div>
                    <p className="min-h-[3em] max-w-[70ch] text-[0.9375rem] text-[rgb(246_244_239_/_0.82)]">{shot.caption}</p>
                    <div className="mt-2.5 flex gap-2">
                        <button type="button" className="lb-btn" onClick={() => show(current - 1)}>
                            {ui.previous}
                        </button>
                        <button type="button" className="lb-btn" onClick={() => show(current + 1)}>
                            {ui.next}
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}
