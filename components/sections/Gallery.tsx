import GalleryShot from '@/components/sections/GalleryShot';
import type { Copy } from '@/lib/copy/types';

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

/* The picture files and their place in the grid; the words are in lib/copy. */
const SHOT_FILES: Record<Copy['gallery']['shots'][number]['key'], { src: string; span: string }> = {
    midday: { src: '/assets/renders/Garden at Midday.webp', span: 'md:col-span-2 md:row-span-2' },
    children: { src: '/assets/renders/Children running.webp', span: '' },
    barbecue: { src: '/assets/renders/Family BBQ.webp', span: '' },
    aerial: { src: '/assets/renders/Aerial (1).webp', span: 'md:col-span-2' },
};

export default function Gallery({ copy }: { copy: Copy }) {
    const { gallery } = copy;

    return (
        <section id="gallery" className="section-padding border-t border-line bg-paper">
            <div className="section-container">
                <div className="eyebrow">{gallery.eyebrow}</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l text-ink">{gallery.title}</h2>
                    <p className="lede self-end">{gallery.lede}</p>
                </div>

                <div className="mt-12 grid auto-rows-[14rem] grid-cols-1 gap-4 md:grid-cols-3">
                    {gallery.shots.map((shot) => (
                        <GalleryShot key={shot.key} {...SHOT_FILES[shot.key]} alt={shot.alt} caption={shot.caption} />
                    ))}
                </div>
            </div>
        </section>
    );
}
