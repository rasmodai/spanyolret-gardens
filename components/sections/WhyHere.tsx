import ScrollButton from '@/components/ui/ScrollButton';
import { LegrandLogo, WienerbergerLogo } from '@/components/ui/BrandLogos';
import type { Copy } from '@/lib/copy/types';

/* One section where there were four (problem and solution, overview, benefits,
 * trust bar): the buyer's week now against the same week here, the six figures
 * of the development, the things you only notice after moving in, and the
 * brands the specification commits to. Nothing was dropped: the trust bar's
 * figures are in the overview strip, the builder section and the benefits.
 *
 * Content must never depend on an animation running: no reveal state here. */
export default function WhyHere({ copy }: { copy: Copy }) {
    const { whyHere } = copy;
    const { problems, overview, benefits } = whyHere;

    return (
        <section id="why-here" className="section-padding border-t border-line bg-paper">
            <div className="section-container">
                <div className="eyebrow">{whyHere.eyebrow}</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l text-ink">{whyHere.title}</h2>
                    <p className="lede self-end">{whyHere.lede}</p>
                </div>

                {/* ---- The week now, against the week here ---------------- */}
                <div className="mt-14">
                    <div className="hidden grid-cols-2 gap-x-16 border-b border-line pb-3 md:grid">
                        <p className="caption">{problems.columnNow}</p>
                        <p className="caption !text-lawn">{problems.columnHere}</p>
                    </div>

                    <dl>
                        {problems.pairs.map(({ problem, solution }) => (
                            <div key={problem.title} className="grid gap-x-16 gap-y-6 border-b border-line py-7 md:grid-cols-2">
                                <div>
                                    <dt className="font-display text-lg leading-snug text-ink-soft">{problem.title}</dt>
                                    <dd className="mt-2 max-w-[42ch] text-[0.9375rem] leading-relaxed text-ink-soft">{problem.text}</dd>
                                </div>
                                <div className="border-l border-line pl-6 md:border-l-0 md:pl-0">
                                    <dt className="font-display text-lg leading-snug text-ink">{solution.title}</dt>
                                    <dd className="mt-2 max-w-[42ch] text-[0.9375rem] leading-relaxed text-ink-soft">{solution.text}</dd>
                                </div>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* ---- The development in six figures ---------------------- */}
                <div className="mt-16 grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h3 className="font-display text-2xl leading-snug text-ink">{overview.title}</h3>
                    <p className="self-end text-[1.0625rem] leading-relaxed text-ink-soft">{overview.lede}</p>
                </div>

                <dl className="mt-10 grid grid-cols-2 border-t border-line md:grid-cols-3 lg:grid-cols-6">
                    {overview.stats.map((stat) => (
                        <div key={stat.label} className="border-b border-r border-line px-4 py-6 last:border-r-0 sm:px-5">
                            <dd className="measure text-xl text-ink md:text-2xl">{stat.value}</dd>
                            <dt className="caption mt-2">{stat.label}</dt>
                        </div>
                    ))}
                </dl>

                <div className="mt-8">
                    <ScrollButton target="floor-plans" className="btn btn-ghost">
                        {overview.cta}
                    </ScrollButton>
                </div>

                {/* ---- What you only notice after you move in -------------- */}
                <div className="mt-16 grid gap-8 border-t border-line pt-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h3 className="font-display text-2xl leading-snug text-ink">{benefits.title}</h3>
                    <p className="self-end text-[1.0625rem] leading-relaxed text-ink-soft">{benefits.lede}</p>
                </div>

                <ol className="mt-10 border-t border-line">
                    {benefits.items.map((benefit, i) => (
                        <li
                            key={benefit.title}
                            className="grid gap-x-6 gap-y-2 border-b border-line py-6 md:grid-cols-[3rem_1fr_minmax(0,22rem)] md:items-baseline"
                        >
                            <span className="measure text-sm text-ink-soft">{String(i + 1).padStart(2, '0')}</span>
                            <h4 className="font-display text-xl leading-snug text-ink">{benefit.title}</h4>
                            <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
                                {benefit.text}
                                <span className="measure ml-2 whitespace-nowrap text-ink">{benefit.highlight}</span>
                            </p>
                        </li>
                    ))}
                </ol>

                {/* Only the brands the technical specification commits to. VEKA
                  * and SIEMENS are "or" options there, so they are named in the
                  * specification and not shown as settled; BOSCH is nowhere. */}
                <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4">
                    <p className="caption">{whyHere.brandsLabel}</p>
                    <div className="flex items-center gap-8 opacity-70">
                        <WienerbergerLogo className="h-6 w-auto" />
                        <LegrandLogo className="h-6 w-auto" />
                        <span className="measure text-sm text-ink-soft">Silka</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
