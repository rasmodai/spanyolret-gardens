'use client';

import Image from 'next/image';
import { developerStats, qualityPromises } from '@/lib/data';

/* Was: a centred card with the logo in a rounded white box, four stat tiles
 * with gradient icons, and the line "we don't just build homes — we build
 * trust" (PRD §7.0 bans that construction outright).
 *
 * The strongest thing this section can do is make a checkable offer rather
 * than a claim: ask for addresses and go and look. That costs nothing and it
 * answers the buyer's actual objection.
 */
export default function Developer() {
    return (
        <section id="developer" className="section-padding border-t border-line band-deep">
            <div className="section-container">
                <div className="eyebrow">The builder</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l text-ink">The people who will actually build it.</h2>
                    <div className="self-end">
                        <p className="lede">
                            S-Patrik Bau has been building in Budapest since 2012 and has finished more than
                            fifty projects. Ask us for addresses — several are a short drive from Spanyolrét,
                            and standing in front of a building somebody has lived in for six years tells you
                            more than anything on this page.
                        </p>
                        <p className="mt-4 text-sm text-ink-soft">
                            Architect on record: JRT Stúdió Kft.
                        </p>
                    </div>
                </div>

                <dl className="mt-12 grid grid-cols-2 border-t border-line lg:grid-cols-4">
                    {developerStats.map((stat) => (
                        <div
                            key={stat.label}
                            className="border-b border-r border-line px-4 py-6 last:border-r-0 sm:px-5"
                        >
                            <dd className="measure text-2xl text-ink">{stat.value}</dd>
                            <dt className="caption mt-2">{stat.label}</dt>
                        </div>
                    ))}
                </dl>

                <div className="mt-12 grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <div>
                        <Image
                            src="/espatrick-bau-logo.png"
                            alt="S-Patrik Bau"
                            width={180}
                            height={54}
                            className="h-10 w-auto object-contain"
                        />
                    </div>

                    <ul>
                        {qualityPromises.map((promise) => (
                            <li
                                key={promise}
                                className="border-b border-line py-3 text-[0.9375rem] text-ink-soft first:border-t first:border-line md:first:border-t-0 md:first:pt-0"
                            >
                                {promise}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
