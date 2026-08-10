'use client';

import { propertyStatsHu } from '@/lib/data-hu';
import { scrollToElement } from '@/lib/utils';

/* Mirror of components/sections/PropertyOverview.tsx. */
export default function PropertyOverviewHu() {
    return (
        <section id="property-overview" className="section-padding border-t border-line bg-paper">
            <div className="section-container">
                <div className="eyebrow">Áttekintés</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <div>
                        <h2 className="display-l wrap-compound text-ink">
                            Két épület. Hat ház.
                            <br />
                            Hat különböző kert.
                        </h2>
                    </div>
                    <p className="lede wrap-compound self-end">
                        Itt minden ház ugyanaz a ház: öt szoba két szinten, két fürdőszoba, 6,60 m² terasz,
                        egy parkolóhely. Egyedül a kert változik — és több mint háromszorosan.
                    </p>
                </div>

                <dl className="mt-12 grid grid-cols-2 border-t border-line md:grid-cols-3 lg:grid-cols-6">
                    {propertyStatsHu.map((stat) => (
                        <div
                            key={stat.label}
                            className="border-b border-r border-line px-4 py-6 last:border-r-0 sm:px-5"
                        >
                            <dd className="measure text-xl text-ink md:text-2xl">{stat.value}</dd>
                            <dt className="caption wrap-compound mt-2">{stat.label}</dt>
                        </div>
                    ))}
                </dl>

                <div className="mt-10">
                    <button
                        type="button"
                        onClick={() => scrollToElement('floor-plans')}
                        className="btn btn-ghost"
                    >
                        A hat kert
                    </button>
                </div>
            </div>
        </section>
    );
}
