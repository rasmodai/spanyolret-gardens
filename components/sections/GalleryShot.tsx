'use client';

import Image from 'next/image';
import { useReveal } from '@/lib/useReveal';

/* One picture and its caption. The only client part of the gallery: it needs
 * the reveal observer, nothing else does. */
export default function GalleryShot({
    src,
    alt,
    caption,
    span,
}: {
    src: string;
    alt: string;
    caption: string;
    span: string;
}) {
    const ref = useReveal<HTMLElement>(0.15);

    return (
        <figure ref={ref} className={`reveal-mask group relative overflow-hidden ${span}`}>
            <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
            <figcaption
                className="absolute inset-x-0 bottom-0 p-4 text-[0.8125rem] leading-snug text-onmedia"
                style={{
                    background:
                        'linear-gradient(to top, rgba(22,25,27,.88) 0%, rgba(22,25,27,.55) 60%, rgba(22,25,27,0) 100%)',
                }}
            >
                {caption}
            </figcaption>
        </figure>
    );
}
