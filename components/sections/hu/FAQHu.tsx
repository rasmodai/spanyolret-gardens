'use client';

import { useState } from 'react';
import { faqsHu } from '@/lib/data-hu';

/* Mirror of components/sections/FAQ.tsx. */
export default function FAQHu() {
    const [open, setOpen] = useState<string | null>(null);

    return (
        <section id="faq" className="section-padding border-t border-line bg-paper">
            <div className="section-container">
                <div className="eyebrow">Kérdések</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l wrap-compound text-ink">
                        Amit valóban meg szoktak kérdezni.
                    </h2>
                    <p className="lede wrap-compound self-end">
                        Ha a tiéd nincs köztük, tedd fel az alábbi űrlapon — egyenes választ kapsz, azokra
                        is, ahol a válasz az, hogy „ezt még nem tudjuk”.
                    </p>
                </div>

                <div className="mt-12 grid gap-x-16 gap-y-10 lg:grid-cols-2">
                    {faqsHu.map((group) => (
                        <section key={group.category} aria-labelledby={`faq-hu-${group.category}`}>
                            <h3
                                id={`faq-hu-${group.category}`}
                                className="caption wrap-compound border-b border-line pb-3"
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
                                                    <span className="wrap-compound text-[1.0625rem] leading-snug text-ink">
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
                                                <dd className="animate-rise wrap-compound max-w-[62ch] pb-5 pr-8 text-[0.9375rem] leading-relaxed text-ink-soft">
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
