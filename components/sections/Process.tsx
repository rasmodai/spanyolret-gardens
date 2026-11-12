import ScrollButton from '@/components/ui/ScrollButton';
import type { Copy } from '@/lib/copy/types';

/* Was: a step timeline with numbers in gradient circles and connecting arcs.
 * Icons in coloured circles are banned (DESIGN.md → Anti-Patterns), and the
 * connector arcs were decoration standing in for structure.
 *
 * Now the structure is the structure: a numbered grid where the step number is
 * a mono figure and the duration sits beside it as data. The reassurance list
 * becomes a plain column rather than tick-in-a-circle rows.
 */
export default function Process({ copy }: { copy: Copy }) {
    const { process } = copy;

    return (
        <section id="process" className="section-padding border-t border-line bg-paper">
            <div className="section-container">
                <div className="eyebrow">{process.eyebrow}</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l text-ink">{process.title}</h2>
                    <p className="lede self-end">{process.lede}</p>
                </div>

                <ol className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
                    {process.steps.map((step, index) => (
                        <li
                            key={step.title}
                            className="border-b border-r border-line px-0 py-7 pr-6 last:border-r-0 lg:border-b-0"
                        >
                            <div className="flex items-baseline gap-3">
                                <span className="measure text-sm text-lawn">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                {step.duration && (
                                    <span className="caption">{step.duration}</span>
                                )}
                            </div>

                            <h3 className="mt-3 font-display text-xl leading-snug text-ink">
                                {step.title}
                            </h3>
                            <p className="mt-2 max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                                {step.text}
                            </p>
                        </li>
                    ))}
                </ol>

                <div className="mt-14 grid gap-8 border-t border-line pt-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h3 className="font-display text-2xl leading-snug text-ink">{process.reassuranceTitle}</h3>
                    <ul className="space-y-0 self-start">
                        {process.reassurance.map((item) => (
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
                    <ScrollButton target="lead-form" className="btn btn-primary">
                        {process.cta}
                    </ScrollButton>
                </div>
            </div>
        </section>
    );
}
