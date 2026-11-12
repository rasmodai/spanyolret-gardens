import type { GalleryShotKey } from './copy/types';

/* The nine architectural renders: file and real size (for next/image, so the
 * layout never shifts). The words about each one are in lib/copy
 * (gallery.shots); the order of the carousel is the order of the copy. */
export interface Render {
    src: string;
    width: number;
    height: number;
}

export const renders: Record<GalleryShotKey, Render> = {
    midday: { src: '/assets/renders/Garden at Midday.webp', width: 5504, height: 3072 },
    children: { src: '/assets/renders/Children running.webp', width: 5504, height: 3072 },
    barbecue: { src: '/assets/renders/Family BBQ.webp', width: 5504, height: 3072 },
    aerial: { src: '/assets/renders/Aerial (1).webp', width: 5120, height: 3328 },
    dusk: { src: '/assets/renders/Dinner at Dusk.webp', width: 5504, height: 3072 },
    wine: { src: '/assets/renders/Couple drinking Wine.webp', width: 5504, height: 3072 },
    path: { src: '/assets/renders/Family Walking Out.webp', width: 5504, height: 3072 },
    walk: { src: '/assets/renders/Family Walking Out 2.webp', width: 5504, height: 3072 },
    lawn: { src: '/assets/renders/Children running 2.webp', width: 5504, height: 3072 },
};
