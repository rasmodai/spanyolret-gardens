'use client';

import { WienerbergerLogo, LegrandLogo } from '@/components/ui/BrandLogos';
import { trustBarItemsHu } from '@/lib/data-hu';

/* Mirror of components/sections/TrustBar.tsx. */
export default function TrustBarHu() {
    return (
        <section className="border-y border-line bg-paper py-10">
            <div className="section-container">
                <dl className="grid grid-cols-2 border-b border-line md:grid-cols-4">
                    {trustBarItemsHu.map((item) => (
                        <div
                            key={item.label}
                            className="border-r border-line px-4 py-5 last:border-r-0 sm:px-5"
                        >
                            <dd className="measure text-xl text-ink md:text-2xl">{item.value}</dd>
                            <dt className="caption wrap-compound mt-1.5">{item.label}</dt>
                        </div>
                    ))}
                </dl>

                <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4">
                    <p className="caption">A műszaki leírásban megnevezve</p>
                    <div className="flex items-center gap-8 opacity-70">
                        {[WienerbergerLogo, LegrandLogo].map((Logo, i) => (
                            <Logo key={i} className="h-6 w-auto" />
                        ))}
                        <span className="measure text-sm text-ink-soft">Silka</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
