'use client';

import Image from 'next/image';
import { useReveal } from '@/lib/useReveal';

/* Mirror of components/sections/Gallery.tsx. */

const SHOTS = [
    {
        src: '/assets/renders/Garden at Midday.webp',
        alt: 'Kerti homlokzat a terasszal és a gyeppel, délben',
        caption: 'A terasz egyenesen a fűre nyílik. 6,60 m², porcelán burkolattal.',
        span: 'md:col-span-2 md:row-span-2',
    },
    {
        src: '/assets/renders/Children running.webp',
        alt: 'Gyerekek szaladnak a saját kert gyepén',
        caption: 'Körben kerítve. A konyhából az egész kert belátható.',
        span: '',
    },
    {
        src: '/assets/renders/Family BBQ.webp',
        alt: 'Család a teraszon ebédel',
        caption: 'Szombat. Ezért költöznek el az emberek a belvárosból.',
        span: '',
    },
    {
        src: '/assets/renders/Aerial (1).webp',
        alt: 'Légi felvétel a két épületről és a hat kertről',
        caption: 'Két épület, háromszor. Minden kert más méretű.',
        span: 'md:col-span-2',
    },
];

export default function GalleryHu() {
    return (
        <section id="gallery" className="section-padding border-t border-line bg-paper">
            <div className="section-container">
                <div className="eyebrow">A helyszín</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l wrap-compound text-ink">
                        Így néz ki itt egy szombat.
                    </h2>
                    <p className="lede wrap-compound self-end">
                        Ezek látványtervek, nem fényképek — az épületek 2026 szeptemberében készülnek el.
                        A rajtuk szereplő méretek a tervekben szereplő méretek.
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
                                className="wrap-compound absolute inset-x-0 bottom-0 p-4 text-[0.8125rem] leading-snug text-onmedia"
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
