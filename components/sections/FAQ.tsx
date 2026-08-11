'use client';

import { useState } from 'react';
import { faqs } from '@/lib/data';

/* Was: rounded-2xl cards with shadows, a chevron in a coloured circle, and a
 * gradient category header.
 *
 * Now a plain disclosure list on hairlines. Native <details>/<summary> would
 * be simpler still, but the controlled version keeps the open/close state
 * predictable across categories and lets the marker be typographic.
 *
 * DESIGN.md → §7.0: the awkward questions go first. If this list ever opens
 * with parking rather than construction quality and the foreign-purchase
 * process, the ordering in lib/data.ts is wrong, not this component.
 */
export default function FAQ() {
    const [open, setOpen] = useState<string | null>(null);

    return (
        <section id="faq" className="section-padding border-t border-line bg-paper">
            <div className="section-container">
                <div className="eyebrow">Questions</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l text-ink">The questions people actually ask.</h2>
                    <p className="lede self-end">
                        If yours is not here, ask it on the form below and you will get a straight answer,
                        including the ones where the answer is &ldquo;we do not know yet&rdquo;.
                    </p>
                </div>

                <div className="mt-12 grid gap-x-16 gap-y-10 lg:grid-cols-2">
                    {faqs.map((group) => (
                        <section key={group.category} aria-labelledby={`faq-${group.category}`}>
                            <h3
                                id={`faq-${group.category}`}
                                className="caption border-b border-line pb-3"
                            >
                                {group.category}
                            </h3>

                            <dl>
                                {group.questions.map((item) => {
                                    const id = `${group.category}-${item.q}`;
                                    const isOpen = open === id;
                                    return (
                                        <div key={id} className="border-b border-line">
                                            <dt>
                                                <button
                                                    type="button"
                                                    onClick={() => setOpen(isOpen ? null : id)}
                                                    aria-expanded={isOpen}
                                                    className="flex w-full items-baseline justify-between gap-5 py-4 text-left transition-colors duration-short hover:text-lawn"
                                                >
                                                    <span className="text-[1.0625rem] leading-snug text-ink">
                                                        {item.q}
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        className="measure shrink-0 text-sm text-ink-soft"
                                                    >
                                                        {isOpen ? '−' : '+'}
                                                    </span>
                                                </button>
                                            </dt>
                                            {isOpen && (
                                                <dd className="animate-rise max-w-[62ch] pb-5 pr-8 text-[0.9375rem] leading-relaxed text-ink-soft">
                                                    {item.a}
                                                </dd>
                                            )}
                                        </div>
                                    );
                                })}
                            </dl>
                        </section>
                    ))}
                </div>
            </div>
        </section>
    );
}
