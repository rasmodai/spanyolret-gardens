import ScrollButton from '@/components/ui/ScrollButton';
import type { Copy } from '@/lib/copy/types';

/* Was: a step timeline with numbers in gradient circles and connecting arcs.
 * Icons in coloured circles are banned (DESIGN.md → Anti-Patterns), and the
 * connector arcs were decoration standing in for structure.
 *
 * Then a numbered grid; now a timeline whose line is the structure: square
 * dots on a hairline that fills with the accent as the visitor scrolls
 * (vertical on a phone, horizontal from 1040 px). The step number and the
 * duration stay mono figures. The reassurance list is a plain column.
 */
export default function Process({ copy }: { copy: Copy }) {
    const { process } = copy;

    return (
        <section id="process" className="section-padding border-t border-line bg-paper">
            <div className="section-container">
                <div className="eyebrow">{process.eyebrow}</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16" data-reveal>
                    <h2 className="display-l text-ink">{process.title}</h2>
                    <p className="lede self-end">{process.lede}</p>
                </div>

                {/* The line of the timeline draws as the section scrolls in
                  * (PageMotion). Drawn in full without JS or with reduced motion. */}
                <ol className="tl mt-14" data-timeline data-reveal>
                    {process.steps.map((step, index) => (
                        <li key={step.title} className="tl-step" data-step>
                            <span className="tl-dot" aria-hidden="true" />
                            <span className="measure block text-xs tracking-[0.12em] text-ink-soft">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <h3 className="mt-1 font-display text-xl leading-snug text-ink min-[1040px]:text-lg">
                                {step.title}
                            </h3>
                            <p className="mt-1.5 max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                                {step.text}
                            </p>
                            {step.duration && <span className="measure mt-2.5 block text-[0.8125rem] text-ink">{step.duration}</span>}
                        </li>
                    ))}
                </ol>

                <div className="mt-16 grid gap-8 border-t border-line pt-10 md:grid-cols-[1fr_1.1fr] md:gap-16" data-reveal>
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
