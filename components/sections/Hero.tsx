'use client';

import { pricing } from '@/lib/data';
import { scrollToElement } from '@/lib/utils';
import HeroMedia from '@/components/ui/HeroMedia';

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

const FACTS = [
    { value: '6', label: 'Townhouses' },
    { value: '117–120 m²', label: 'Inside' },
    { value: '102–317 m²', label: 'Private garden' },
    { value: 'September 2026', label: 'Keys' },
];

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative flex min-h-[38rem] items-end overflow-hidden bg-frame md:min-h-[44rem]"
        >
            <HeroMedia
                poster="/assets/renders/hero-poster.webp"
                src="/assets/renders/hero.mp4"
            />

            {/* One scrim. Not four. */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'linear-gradient(to top, rgba(22,25,27,.92) 0%, rgba(22,25,27,.86) 30%, rgba(22,25,27,.58) 55%, rgba(22,25,27,.18) 78%, rgba(22,25,27,0) 100%)',
                }}
            />

            <div className="absolute inset-x-0 top-0 border-b border-onmedia/20">
                <div className="section-container flex items-center justify-between py-4 text-onmedia">
                    <span className="whitespace-nowrap font-display text-base tracking-tight">Spanyolrét Gardens</span>
                    <span className="caption hidden !text-onmedia/70 sm:inline">Budapest XI. · September 2026</span>
                </div>
            </div>

            <div className="section-container relative pb-10 pt-32 text-onmedia md:pb-14">
                <div className="max-w-[48rem]">
                    <h1 className="display-xl animate-rise">
                        A real garden.
                        <br />
                        Not a balcony.
                    </h1>

                    <p className="mt-5 max-w-[46ch] text-[1.0625rem] text-onmedia/80 md:text-lg">
                        Six townhouses in Budapest&rsquo;s XI. District, in two buildings of three.
                        Five rooms over two floors, and a garden that runs from 102 to 317 m².
                    </p>

                    <dl className="mt-7 grid grid-cols-2 border-t border-onmedia/25 sm:grid-cols-4">
                        {FACTS.map((f) => (
                            <div key={f.label} className="border-r border-onmedia/15 py-3.5 pr-5 last:border-r-0">
                                <dd className="measure whitespace-nowrap text-lg md:text-xl">{f.value}</dd>
                                <dt className="caption mt-1 !text-onmedia/60">{f.label}</dt>
                            </div>
                        ))}
                    </dl>

                    {/* The one public figure, and it never travels without its
                     * qualifier. DESIGN.md → Pricing Display Rule. */}
                    <div className="mt-7">
                        <p className="measure text-2xl md:text-3xl">{pricing.anchor}</p>
                        <p className="caption mt-1.5 !text-onmedia/70">{pricing.anchorQualifier}</p>
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3.5">
                        <button
                            type="button"
                            onClick={() => scrollToElement('lead-form')}
                            className="btn btn-primary"
                        >
                            Book a viewing
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollToElement('floor-plans')}
                            className="btn btn-ghost-inv"
                        >
                            See the six gardens
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
