import GalleryCarousel from '@/components/sections/GalleryCarousel';
import type { Copy } from '@/lib/copy/types';
import { renders } from '@/lib/renders';

/* Was: an accordion selector wrapped in three blurred orbs on breathe loops,
 * with captions like "Evening Romance — sunset views with your favorite wine"
 * and "Magical evenings in your private sanctuary". PRD §7.0 bans that register
 * outright, and the accordion hid four of five images behind an interaction.
 *
 * Then: a grid of four. Now: all nine renders in a horizontal carousel (drag,
 * arrows, keyboard, progress bar) and a full-screen viewer on click.
 *
 * The images are renders and the caption says so — a buyer who works that out
 * for themselves stops trusting everything else on the page. */
export default function Gallery({ copy }: { copy: Copy }) {
    const { gallery } = copy;

    return (
        <section id="gallery" className="section-padding border-t border-line bg-paper-deep">
            <GalleryCarousel
                eyebrow={gallery.eyebrow}
                title={gallery.title}
                lede={gallery.lede}
                ui={gallery.ui}
                shots={gallery.shots.map((shot) => ({ ...shot, ...renders[shot.key] }))}
            />
        </section>
    );
}
