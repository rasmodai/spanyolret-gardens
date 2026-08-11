'use client';

import { benefits } from '@/lib/data';

/* Was: a four-column grid of gradient icons over three blurred orbs on
 * breathe loops, everything centred, each item ending in a pill badge.
 * That is the canonical AI-slop feature grid (DESIGN.md → Anti-Patterns).
 *
 * Now: a numbered list. Each item is a row with its index in mono, a serif
 * heading and a line of plain text. The "highlight" becomes a measured value
 * in the left column rather than a coloured pill — which is what it always
 * was: a number pretending to be a badge.
 */
export default function Benefits() {
    return (
        <section id="benefits" className="section-padding border-t border-line band-deep">
            <div className="section-container">
                <div className="eyebrow">What you get</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l text-ink">
                        The parts you only notice after you move in.
                    </h2>
                    <p className="lede self-end">
                        Thirty-centimetre party walls. No gas connection. A gate you open from the
                        driver&rsquo;s seat. The things you stop thinking about once they are simply true.
                    </p>
                </div>

                <ol className="mt-12 border-t border-line">
                    {benefits.map((benefit, i) => (
                        <li
                            key={benefit.title}
                            className="grid gap-x-6 gap-y-2 border-b border-line py-6 md:grid-cols-[3rem_1fr_minmax(0,22rem)] md:items-baseline"
                        >
                            <span className="measure text-sm text-ink-soft">
                                {String(i + 1).padStart(2, '0')}
                            </span>

                            <h3 className="font-display text-xl leading-snug text-ink">
                                {benefit.title}
                            </h3>

                            <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
                                {benefit.description}
                                {benefit.highlight && (
                                    <span className="measure ml-2 whitespace-nowrap text-ink">
                                        {benefit.highlight}
                                    </span>
                                )}
                            </p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
