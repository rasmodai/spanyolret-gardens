'use client';

import { useEffect, useState } from 'react';

/* The hero background, and the single biggest performance decision on the site.
 *
 * Measured on a production build: the video was 3,788 kB of a 4,479 kB page —
 * 85% of everything, downloaded on every visit including the phone in bed at
 * nine in the evening, which is exactly when this buyer browses.
 *
 * So: the poster is always rendered and is what the server sends, which makes
 * it the LCP candidate. The video only mounts on a viewport wide enough to be
 * a desktop, and only after hydration, so it never blocks first paint and
 * never downloads on a phone.
 *
 * It also honours prefers-reduced-motion: a looping background is motion, and
 * someone who has asked for less of it should not get 14 seconds of drone
 * footage on repeat.
 */
export default function HeroMedia({ poster, src }: { poster: string; src: string }) {
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        const wideEnough = window.matchMedia('(min-width: 900px)').matches;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
        if (wideEnough && !reduced && !saveData) setShowVideo(true);
    }, []);

    return (
        <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={poster}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
                fetchPriority="high"
            />
            {showVideo && (
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover"
                    poster={poster}
                >
                    <source src={src} type="video/mp4" />
                </video>
            )}
        </>
    );
}
