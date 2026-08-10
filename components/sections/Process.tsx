'use client';

import { processSteps, processReassurance } from '@/lib/data';
import { scrollToElement } from '@/lib/utils';

/* Was: a step timeline with numbers in gradient circles and connecting arcs.
 * Icons in coloured circles are banned (DESIGN.md → Anti-Patterns), and the
 * connector arcs were decoration standing in for structure.
 *
 * Now the structure is the structure: a numbered grid where the step number is
 * a mono figure and the duration sits beside it as data. The reassurance list
 * becomes a plain column rather than tick-in-a-circle rows.
 */
export default function Process() {
    return (
        <section id="process" className="section-padding border-t border-line bg-paper">
            <div className="section-container">
                <div className="eyebrow">How it works</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l text-ink">From this page to your keys.</h2>
                    <p className="lede self-end">
                        Four steps, and you can stop at any of them. Nothing here commits you to anything
                        until the reservation documents, and we will walk you through those before you sign.
                    </p>
                </div>

                <ol className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
                    {processSteps.map((step) => (
                        <li
                            key={step.step}
                            className="border-b border-r border-line px-0 py-7 pr-6 last:border-r-0 lg:border-b-0"
                        >
                            <div className="flex items-baseline gap-3">
                                <span className="measure text-sm text-lawn">
                                    {String(step.step).padStart(2, '0')}
                                </span>
                                {step.duration && (
                                    <span className="caption">{step.duration}</span>
                                )}
                            </div>

                            <h3 className="mt-3 font-display text-xl leading-snug text-ink">
                                {step.title}
                            </h3>
                            <p className="mt-2 max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                                {step.description}
                            </p>
                        </li>
                    ))}
                </ol>

                <div className="mt-14 grid gap-8 border-t border-line pt-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h3 className="font-display text-2xl leading-snug text-ink">
                        Buying property in Hungary as a foreigner is manageable. Making it so is our job.
                    </h3>
                    <ul className="space-y-0 self-start">
                        {processReassurance.map((item) => (
                            <li
                                key={item}
                                className="border-b border-line py-3 text-[0.9375rem] text-ink-soft first:border-t first:border-line md:first:border-t-0 md:first:pt-0"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-10">
                    <button
                        type="button"
                        onClick={() => scrollToElement('lead-form')}
                        className="btn btn-primary"
                    >
                        Book a viewing
                    </button>
                </div>
            </div>
        </section>
    );
}
