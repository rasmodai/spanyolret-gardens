import Image from 'next/image';
import type { Copy } from '@/lib/copy/types';
import { renders } from '@/lib/renders';

/* One section where there were four (problem and solution, overview, benefits,
 * trust bar), then one wall of text. Now four cards, each a picture and the
 * buyer's week now against the same week here: the facts that were in the
 * benefits list are in the specification blocks (Specs), the figures of the
 * overview are in the hero.
 *
 * Content must never depend on an animation running: the cards are rendered
 * as they are; PageMotion only softens their appearance below the fold. */
export default function WhyHere({ copy }: { copy: Copy }) {
    const { whyHere, gallery } = copy;

    return (
        <section id="why-here" className="section-padding border-t border-line bg-paper">
            <div className="section-container">
                <div className="eyebrow">{whyHere.eyebrow}</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16" data-reveal>
                    <h2 className="display-l text-ink">{whyHere.title}</h2>
                    <p className="lede self-end">{whyHere.lede}</p>
                </div>

                <div className="why-grid mt-12 md:mt-16">
                    {whyHere.cards.map((card, i) => {
                        const render = renders[card.shot];
                        const alt = gallery.shots.find((shot) => shot.key === card.shot)?.alt ?? '';
                        return (
                            <article key={card.title} className="why-card" data-reveal={i % 2 ? '2' : '1'}>
                                <div className="why-photo">
                                    <Image
                                        src={render.src}
                                        alt={alt}
                                        width={render.width}
                                        height={render.height}
                                        sizes="(max-width: 760px) 100vw, 560px"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <p className="mt-[1.125rem] text-[0.9375rem] leading-snug text-ink-soft">
                                    <span className="caption">{whyHere.nowLabel}</span> · {card.now}
                                </p>
                                <h3 className="mt-2 font-display text-[1.375rem] leading-tight text-ink">{card.title}</h3>
                                <p className="mt-2 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-soft">{card.text}</p>
                                {card.meta && <p className="caption mt-3 !text-ink">{card.meta}</p>}
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
