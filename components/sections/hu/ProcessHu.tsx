'use client';

import { processStepsHu, processReassuranceHu } from '@/lib/data-hu';
import { scrollToElement } from '@/lib/utils';

/* Mirror of components/sections/Process.tsx. */
export default function ProcessHu() {
    return (
        <section id="process" className="section-padding border-t border-line bg-paper">
            <div className="section-container">
                <div className="eyebrow">Hogyan zajlik</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l wrap-compound text-ink">
                        Ettől az oldaltól a kulcsokig.
                    </h2>
                    <p className="lede wrap-compound self-end">
                        Négy lépés, és bármelyiknél megállhatsz. Semmi nem kötelez semmire a foglalási
                        dokumentumokig — azokat pedig aláírás előtt végigvesszük veled.
                    </p>
                </div>

                <ol className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
                    {processStepsHu.map((step) => (
                        <li
                            key={step.step}
                            className="border-b border-r border-line px-0 py-7 pr-6 last:border-r-0 lg:border-b-0"
                        >
                            <div className="flex items-baseline gap-3">
                                <span className="measure text-sm text-lawn">
                                    {String(step.step).padStart(2, '0')}
                                </span>
                                {step.duration && <span className="caption">{step.duration}</span>}
                            </div>

                            <h3 className="wrap-compound mt-3 font-display text-xl leading-snug text-ink">
                                {step.title}
                            </h3>
                            <p className="wrap-compound mt-2 max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                                {step.description}
                            </p>
                        </li>
                    ))}
                </ol>

                <div className="mt-14 grid gap-8 border-t border-line pt-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h3 className="wrap-compound font-display text-2xl leading-snug text-ink">
                        Külföldiként ingatlant venni Magyarországon kezelhető. Hogy az is legyen, az a mi dolgunk.
                    </h3>
                    <ul className="space-y-0 self-start">
                        {processReassuranceHu.map((item) => (
                            <li
                                key={item}
                                className="wrap-compound border-b border-line py-3 text-[0.9375rem] text-ink-soft first:border-t first:border-line md:first:border-t-0 md:first:pt-0"
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
                        Időpontot kérek
                    </button>
                </div>
            </div>
        </section>
    );
}
