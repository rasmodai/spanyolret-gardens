import ScrollButton from '@/components/ui/ScrollButton';
import type { Copy } from '@/lib/copy/types';

/* The section that replaced three contradictory numbers in this repo: 195M in
 * the unit data, 220M in the hero, 200M here. One figure now, and it never
 * appears without its qualifier. DESIGN.md → Pricing Display Rule.
 *
 * The two lists are deliberately given equal weight. "What it covers" next to
 * "what it does not" is the whole argument of this section — burying the
 * chargeable extras below the fold, or in a contract, is how buyers end up
 * feeling sold to.
 */
export default function Pricing({ copy }: { copy: Copy }) {
    const { pricing, price } = copy;

    return (
        <section id="pricing" className="section-padding border-t border-line band-deep">
            <div className="section-container">
                <div className="eyebrow">{pricing.eyebrow}</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l text-ink">{pricing.title}</h2>
                    <div className="self-end">
                        <p className="measure text-3xl text-ink md:text-4xl">{price.anchor}</p>
                        <p className="caption mt-2">{price.qualifier}</p>
                        <p className="lede mt-5">{pricing.lede}</p>
                    </div>
                </div>

                <div className="mt-14 grid gap-x-16 gap-y-10 lg:grid-cols-2">
                    <div>
                        <h3 className="caption border-b border-line pb-3">{pricing.includedTitle}</h3>
                        <ul>
                            {pricing.included.map((item) => (
                                <li
                                    key={item}
                                    className="border-b border-line py-3.5 text-[0.9375rem] leading-relaxed text-ink"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="caption border-b border-line pb-3">{pricing.extrasTitle}</h3>
                        <dl>
                            {pricing.extras.map((extra) => (
                                <div
                                    key={extra.item}
                                    className="flex items-baseline justify-between gap-6 border-b border-line py-3.5"
                                >
                                    <dt className="text-[0.9375rem] leading-relaxed text-ink-soft">
                                        {extra.item}
                                    </dt>
                                    <dd className="measure shrink-0 text-sm text-ink">{extra.price}</dd>
                                </div>
                            ))}
                        </dl>
                        <p className="mt-5 max-w-[46ch] text-sm text-ink-soft">{pricing.extrasNote}</p>
                    </div>
                </div>

                <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-8">
                    <ScrollButton target="lead-form" className="btn btn-primary">
                        {pricing.cta}
                    </ScrollButton>
                    <p className="max-w-[52ch] text-sm text-ink-soft">{pricing.scheduleNote}</p>
                </div>
            </div>
        </section>
    );
}
