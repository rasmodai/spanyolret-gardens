'use client';

import { WienerbergerLogo, LegrandLogo } from '@/components/ui/BrandLogos';
import { trustBarItems } from '@/lib/data';

/* Was: four stat tiles with icons in rounded squares, animated by framer-motion
 * variants with staggerChildren — which left the numbers at opacity 0 whenever
 * the observer did not fire. Content must never depend on an animation running.
 *
 * The logo wall is down to the two brands the technical specification actually
 * commits to. BOSCH was on it and appears nowhere in the spec; VEKA and SIEMENS
 * are spec'd as "or" alternatives, so they are named in the specification
 * section instead of shown here as settled. DESIGN.md → Credibility slop.
 */
export default function TrustBar() {
    return (
        <section className="border-y border-line bg-paper py-10">
            <div className="section-container">
                <dl className="grid grid-cols-2 border-b border-line md:grid-cols-4">
                    {trustBarItems.map((item) => (
                        <div
                            key={item.label}
                            className="border-r border-line px-4 py-5 last:border-r-0 sm:px-5"
                        >
                            <dd className="measure text-xl text-ink md:text-2xl">{item.value}</dd>
                            <dt className="caption mt-1.5">{item.label}</dt>
                        </div>
                    ))}
                </dl>

                <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4">
                    <p className="caption">Named in the specification</p>
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
