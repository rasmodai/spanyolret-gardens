'use client';

import { propertyStats } from '@/lib/data';
import { scrollToElement } from '@/lib/utils';

/* Was: six "premium" gradient icons over three blurred orbs animating on an
 * 8s breathe loop, centred, with a gradient CTA. The orbs alone were three
 * 600px blur-3xl circles doing nothing but load work.
 *
 * Now: the numbers as a specification table. Strict grid, hairline dividers,
 * mono values. This is the section where the evidence register starts.
 */
export default function PropertyOverview() {
    return (
        <section id="property-overview" className="section-padding border-t border-line bg-paper">
            <div className="section-container">
                <div className="eyebrow">At a glance</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <div>
                        <h2 className="display-l text-ink">
                            Two buildings. Six houses.
                            <br />
                            Six different gardens.
                        </h2>
                    </div>
                    <p className="lede self-end">
                        Every house here is the same house: five rooms over two floors, two bathrooms,
                        a 6.60 m² terrace, one parking space. The garden is the only thing that changes,
                        and it changes by more than three times.
                    </p>
                </div>

                <dl className="mt-12 grid grid-cols-2 border-t border-line md:grid-cols-3 lg:grid-cols-6">
                    {propertyStats.map((stat) => (
                        <div
                            key={stat.label}
                            className="border-b border-r border-line px-4 py-6 last:border-r-0 sm:px-5"
                        >
                            <dd className="measure text-xl text-ink md:text-2xl">{stat.value}</dd>
                            <dt className="caption mt-2">{stat.label}</dt>
                        </div>
                    ))}
                </dl>

                <div className="mt-10">
                    <button
                        type="button"
                        onClick={() => scrollToElement('floor-plans')}
                        className="btn btn-ghost"
                    >
                        See the six gardens
                    </button>
                </div>
            </div>
        </section>
    );
}
