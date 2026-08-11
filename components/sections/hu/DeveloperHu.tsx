'use client';

import Image from 'next/image';
import { developerStatsHu, qualityPromisesHu } from '@/lib/data-hu';

/* Mirror of components/sections/Developer.tsx. */
export default function DeveloperHu() {
    return (
        <section id="developer" className="section-padding border-t border-line band-deep">
            <div className="section-container">
                <div className="eyebrow">A kivitelező</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l wrap-compound text-ink">
                        Akik ténylegesen megépítik.
                    </h2>
                    <div className="self-end">
                        <p className="lede wrap-compound">
                            Az S-Patrik Bau 2012 óta épít Budapesten, és több mint ötven projektet adott át.
                            Kérd el a címeket — több is autóval pár percre van Spanyolréttől, és ha megállsz
                            egy épület előtt, amiben hat éve laknak, többet megtudsz, mint bármiből ezen az oldalon.
                        </p>
                        <p className="mt-4 text-sm text-ink-soft">Tervező: JRT Stúdió Kft.</p>
                    </div>
                </div>

                <dl className="mt-12 grid grid-cols-2 border-t border-line lg:grid-cols-4">
                    {developerStatsHu.map((stat) => (
                        <div
                            key={stat.label}
                            className="border-b border-r border-line px-4 py-6 last:border-r-0 sm:px-5"
                        >
                            <dd className="measure text-2xl text-ink">{stat.value}</dd>
                            <dt className="caption wrap-compound mt-2">{stat.label}</dt>
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
                        {qualityPromisesHu.map((promise) => (
                            <li
                                key={promise}
                                className="wrap-compound border-b border-line py-3 text-[0.9375rem] text-ink-soft first:border-t first:border-line md:first:border-t-0 md:first:pt-0"
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
