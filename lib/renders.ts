import type { GalleryShotKey } from './copy/types';

/* The nine architectural renders: file and real size (for next/image, so the
 * layout never shifts). Images are served unoptimized (next.config), so these
 * are 1600 px copies of the 5504 px masters (public/assets/renders/1600/),
 * about 1.3 MB for all nine instead of about 13 MB. The words about each one are in lib/copy
 * (gallery.shots); the order of the carousel is the order of the copy. */
export interface Render {
    src: string;
    width: number;
    height: number;
}

export const renders: Record<GalleryShotKey, Render> = {
    midday: { src: '/assets/renders/1600/Garden at Midday.webp', width: 1600, height: 893 },
    children: { src: '/assets/renders/1600/Children running.webp', width: 1600, height: 893 },
    barbecue: { src: '/assets/renders/1600/Family BBQ.webp', width: 1600, height: 893 },
    aerial: { src: '/assets/renders/1600/Aerial (1).webp', width: 1600, height: 1040 },
    dusk: { src: '/assets/renders/1600/Dinner at Dusk.webp', width: 1600, height: 893 },
    wine: { src: '/assets/renders/1600/Couple drinking Wine.webp', width: 1600, height: 893 },
    path: { src: '/assets/renders/1600/Family Walking Out.webp', width: 1600, height: 893 },
    walk: { src: '/assets/renders/1600/Family Walking Out 2.webp', width: 1600, height: 893 },
    lawn: { src: '/assets/renders/1600/Children running 2.webp', width: 1600, height: 893 },
};
