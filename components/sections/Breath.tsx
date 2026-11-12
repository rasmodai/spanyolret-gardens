import Image from 'next/image';
import type { Copy, GalleryShotKey } from '@/lib/copy/types';
import { renders } from '@/lib/renders';

/* A render over the full width of the page, between two sections, with a light
 * parallax (PageMotion moves `.band-img`). Its words are the gallery's: the
 * same picture says the same thing everywhere. `tone` is the background of the
 * caption, the one of the section above. */
export default function Breath({
    copy,
    shot,
    tone = 'paper',
}: {
    copy: Copy;
    shot: GalleryShotKey;
    tone?: 'paper' | 'deep';
}) {
    const render = renders[shot];
    const words = copy.gallery.shots.find((item) => item.key === shot);
    if (!words) return null;

    return (
        <div className={tone === 'deep' ? 'band-deep' : 'bg-paper'}>
            <figure>
                <div className="band">
                    <Image
                        src={render.src}
                        alt={words.alt}
                        width={render.width}
                        height={render.height}
                        sizes="100vw"
                        className="band-img"
                    />
                </div>
                <figcaption className="section-container pt-3.5">
                    <span className="caption block">{words.caption}</span>
                </figcaption>
            </figure>
        </div>
    );
}
