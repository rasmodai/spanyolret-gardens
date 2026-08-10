'use client';

import { specsCategoriesHu } from '@/lib/data-hu';

/* Mirror of components/sections/Specs.tsx. Everything visible at once — no
 * tabs, because hiding four fifths of the evidence is the opposite of what
 * this section is for. */
export default function SpecsHu() {
    return (
        <section id="specs" className="section-padding band-frame">
            <div className="section-container">
                <div className="caption mb-6 flex items-center gap-4 !text-[color:var(--on-frame-soft)]">
                    Műszaki leírás
                    <span className="h-px flex-1 bg-onmedia/20" />
                </div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l wrap-compound text-onmedia">
                        Ami a műszaki leírásban szerepel.
                    </h2>
                    <p className="wrap-compound max-w-[52ch] self-end text-[1.0625rem] leading-relaxed text-[color:var(--on-frame-soft)]">
                        Az alábbi minden sora benne van a szerződéses dokumentációban. Azért tesszük közzé,
                        mert egy írásban megnevezett márka olyan állítás, amin számon kérhetsz minket — és
                        egy műszaki leírás jobb válasz, mint egy ígéret.
                    </p>
                </div>

                <div className="mt-14 grid gap-x-14 gap-y-12 md:grid-cols-2">
                    {specsCategoriesHu.map((category, i) => (
                        <section key={category.id} aria-labelledby={`spec-hu-${category.id}`}>
                            <div className="flex items-baseline gap-3 border-b border-onmedia/25 pb-3">
                                <span className="measure text-sm text-[color:var(--on-frame-soft)]">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3
                                    id={`spec-hu-${category.id}`}
                                    className="wrap-compound font-display text-xl text-onmedia"
                                >
                                    {category.title}
                                </h3>
                            </div>

                            <dl className="mt-1">
                                {category.items.map((item) => {
                                    const [term, ...rest] = item.split(':');
                                    const value = rest.join(':').trim();
                                    return (
                                        <div
                                            key={item}
                                            className="grid gap-x-4 border-b border-onmedia/10 py-3 sm:grid-cols-[minmax(0,11rem)_1fr]"
                                        >
                                            <dt className="caption wrap-compound !text-[color:var(--on-frame-soft)]">
                                                {value ? term : 'Tartalmazza'}
                                            </dt>
                                            <dd className="measure wrap-compound text-[0.9375rem] text-onmedia">
                                                {value || term}
                                            </dd>
                                        </div>
                                    );
                                })}
                            </dl>
                        </section>
                    ))}
                </div>

                <p className="mt-12 max-w-[60ch] text-sm text-[color:var(--on-frame-soft)]">
                    Kérd el a teljes dokumentumot, és kérd el öt-hat éve átadott épületeink címét is.
                    Ha egy előtt megállsz, többet megtudsz, mint bármiből ezen az oldalon.
                </p>
            </div>
        </section>
    );
}
