import HeroCounters from '@/components/motion/HeroCounters';
import HeroMedia from '@/components/ui/HeroMedia';
import ScrollButton from '@/components/ui/ScrollButton';
import type { Copy } from '@/lib/copy/types';

/* The first viewport is a poster, not a document. See DESIGN.md → Layout.
 *
 * What this replaces: a centred stack of glass badge with a pulsing dot,
 * gradient-filled headline, price in a glass pill, two gradient buttons, four
 * glass stat pills and an animated scroll indicator — six things competing for
 * the same attention, over four stacked overlays.
 *
 * Now: one image, one headline low-left, one primary action. The scrim is a
 * single layer and its only job is legibility over a photograph whose
 * brightness we do not control.
 */

/* "117–120 m²": each whole number is wrapped so it can count up to its value
 * (components/motion/HeroCounters.tsx). A year counts up from seven years
 * earlier, not from zero. The text itself is the final state. */
function Figure({ value }: { value: string }) {
    return (
        <>
            {value.split(/(\d+)/).map((part, i) =>
                /^\d+$/.test(part) ? (
                    <span key={i} data-count={part} data-from={Number(part) >= 1000 ? String(Number(part) - 7) : undefined}>
                        {part}
                    </span>
                ) : (
                    part
                )
            )}
        </>
    );
}

export default function Hero({ copy }: { copy: Copy }) {
    const { hero, price } = copy;

    return (
        <section
            id="hero"
            className="relative flex min-h-[38rem] items-end overflow-hidden bg-frame md:min-h-[44rem]"
        >
            <HeroMedia
                poster="/assets/renders/hero-poster.webp"
                src="/assets/renders/hero.mp4"
            />

            {/* One scrim. Not four. Dense under the title, so that it reads over the video. */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'linear-gradient(to top, rgba(18,20,22,.94) 0%, rgba(18,20,22,.88) 28%, rgba(18,20,22,.6) 52%, rgba(18,20,22,.2) 76%, rgba(18,20,22,.12) 100%)',
                }}
            />

            <div className="absolute inset-x-0 top-0 border-b border-onmedia/20">
                <div className="section-container flex items-center justify-between py-4 text-onmedia">
                    <span className="whitespace-nowrap font-display text-base tracking-tight">Spanyolrét Gardens</span>
                    <span className="caption hidden !text-onmedia/70 sm:inline">{hero.place}</span>
                </div>
            </div>

            <div className="section-container relative pb-10 pt-32 text-onmedia md:pb-14">
                <div className="max-w-[48rem]">
                    {/* The two lines rise one after the other, once (CSS only: the
                      * markup is the final state). */}
                    <h1 className="display-xl">
                        <span className="hero-line">
                            <span>{hero.titleFirst}</span>
                        </span>
                        <span className="hero-line">
                            <span style={{ ['--d' as string]: '140ms' }}>{hero.titleSecond}</span>
                        </span>
                    </h1>

                    <p className="hero-in mt-5 max-w-[46ch] text-[1.0625rem] text-onmedia/80 md:text-lg" style={{ ['--d' as string]: '420ms' }}>
                        {hero.lede}
                    </p>

                    <dl className="hero-in mt-7 grid grid-cols-2 border-t border-onmedia/25 sm:grid-cols-4" style={{ ['--d' as string]: '560ms' }}>
                        {hero.facts.map((f) => (
                            <div key={f.label} className="border-r border-onmedia/15 py-3.5 pr-5 last:border-r-0">
                                <dd className="measure whitespace-nowrap text-lg md:text-xl">
                                    <Figure value={f.value} />
                                </dd>
                                <dt className="caption mt-1 !text-onmedia/60">{f.label}</dt>
                            </div>
                        ))}
                    </dl>

                    {/* The one public figure, and it never travels without its
                     * qualifier. DESIGN.md → Pricing Display Rule. */}
                    <div className="hero-in mt-7" style={{ ['--d' as string]: '680ms' }}>
                        <p className="measure text-2xl md:text-3xl">{price.anchor}</p>
                        <p className="caption mt-1.5 !text-onmedia/70">{price.qualifier}</p>
                    </div>

                    <div className="hero-in mt-7 flex flex-wrap gap-3.5" style={{ ['--d' as string]: '780ms' }}>
                        <ScrollButton target="lead-form" className="btn btn-primary">
                            {hero.ctaPrimary}
                        </ScrollButton>
                        <ScrollButton target="floor-plans" className="btn btn-ghost-inv">
                            {hero.ctaSecondary}
                        </ScrollButton>
                    </div>
                </div>
            </div>

            <HeroCounters />
        </section>
    );
}
