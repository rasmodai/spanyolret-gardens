'use client';

import Image from 'next/image';
import { useReveal } from '@/lib/useReveal';

/* Was: an accordion selector wrapped in three blurred orbs on breathe loops,
 * with captions like "Evening Romance — sunset views with your favorite wine"
 * and "Magical evenings in your private sanctuary". PRD §7.0 bans that register
 * outright, and the accordion hid four of five images behind an interaction.
 *
 * Now: an editorial grid. All five visible, captions that say what the picture
 * is instead of how it should make you feel. The images are renders and the
 * caption says so — a buyer who works that out for themselves stops trusting
 * everything else on the page.
 */

const SHOTS = [
    {
        src: '/assets/renders/Garden at Midday.webp',
        alt: 'Rear elevation with the terrace and lawn, midday',
        caption: 'The terrace opens straight onto the grass. 6.60 m², porcelain tiles.',
        span: 'md:col-span-2 md:row-span-2',
    },
    {
        src: '/assets/renders/Children running.webp',
        alt: 'Children running on the lawn of a private garden',
        caption: 'Fenced on all sides. You can see the whole garden from the kitchen.',
        span: '',
    },
    {
        src: '/assets/renders/Family BBQ.webp',
        alt: 'A family eating outdoors on the terrace',
        caption: 'Saturday. The reason people move out of the seventh district.',
        span: '',
    },
    {
        src: '/assets/renders/Aerial (1).webp',
        alt: 'Aerial view of the two buildings and the six garden plots',
        caption: 'Two buildings of three. Every garden is a different size.',
        span: 'md:col-span-2',
    },
];

export default function Gallery() {
    return (
        <section id="gallery" className="section-padding border-t border-line bg-paper">
            <div className="section-container">
                <div className="eyebrow">The place</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l text-ink">What a Saturday looks like here.</h2>
                    <p className="lede self-end">
                        These are architectural renders, not photographs — the buildings are finished in
                        September 2026. The dimensions in them are the dimensions in the plans.
                    </p>
                </div>

                <div className="mt-12 grid auto-rows-[14rem] grid-cols-1 gap-4 md:grid-cols-3">
                    {SHOTS.map((shot) => (
                        <Shot key={shot.src} shot={shot} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function Shot({ shot }: { shot: (typeof SHOTS)[number] }) {
    const ref = useReveal<HTMLElement>(0.15);

    return (
        <figure ref={ref} className={`reveal-mask group relative overflow-hidden ${shot.span}`}>
                            <Image
                                src={shot.src}
                                alt={shot.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                            />
                            <figcaption
                                className="absolute inset-x-0 bottom-0 p-4 text-[0.8125rem] leading-snug text-onmedia"
                                style={{
                                    background:
                                        'linear-gradient(to top, rgba(22,25,27,.88) 0%, rgba(22,25,27,.55) 60%, rgba(22,25,27,0) 100%)',
                                }}
                            >
                                {shot.caption}
                            </figcaption>
        </figure>
    );
}
