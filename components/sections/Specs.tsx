'use client';

import { specsCategories } from '@/lib/data';

/* This is the section that answers "how do we know the quality will be good?",
 * so it is the one that most needs to look like a document rather than a
 * brochure. DESIGN.md → The thesis.
 *
 * Was: a tabbed interface, five rounded-[2rem] cards with shadow-xl, an icon
 * in a rounded square per category, and a subtitle that read "Premium
 * specifications for lasting quality" — a sentence that says nothing next to
 * the actual numbers it was sitting above.
 *
 * Now: everything visible at once on the anthracite band, set as a
 * specification sheet. No tabs, because hiding four fifths of your evidence
 * behind a tab is the opposite of what this section is for.
 */
export default function Specs() {
    return (
        <section id="specs" className="section-padding band-frame">
            <div className="section-container">
                <div className="caption mb-6 flex items-center gap-4 !text-[color:var(--on-frame-soft)]">
                    Specification
                    <span className="h-px flex-1 bg-onmedia/20" />
                </div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l text-onmedia">What is written in the technical description.</h2>
                    <p className="max-w-[52ch] self-end text-[1.0625rem] leading-relaxed text-[color:var(--on-frame-soft)]">
                        Every line below is in the contract documentation. We publish it because naming a
                        brand in writing is a claim you can hold us to, and a specification is a better
                        answer than a promise.
                    </p>
                </div>

                <div className="mt-14 grid gap-x-14 gap-y-12 md:grid-cols-2">
                    {specsCategories.map((category, i) => (
                        <section key={category.id} aria-labelledby={`spec-${category.id}`}>
                            <div className="flex items-baseline gap-3 border-b border-onmedia/25 pb-3">
                                <span className="measure text-sm text-[color:var(--on-frame-soft)]">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3
                                    id={`spec-${category.id}`}
                                    className="font-display text-xl text-onmedia"
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
                                            <dt className="caption !text-[color:var(--on-frame-soft)]">
                                                {value ? term : 'Included'}
                                            </dt>
                                            <dd className="measure text-[0.9375rem] text-onmedia">
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
                    Ask us for the full document, and for addresses of buildings we finished five or six
                    years ago. Standing in front of one tells you more than anything on this page.
                </p>
            </div>
        </section>
    );
}
