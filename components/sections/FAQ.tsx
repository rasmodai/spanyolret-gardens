'use client';

import { useState } from 'react';
import { track } from '@/lib/mixpanel';

export interface FaqProps {
    eyebrow: string;
    title: string;
    lede: string;
    groups: { title: string; items: { q: string; a: string }[] }[];
}

/* Was: rounded-2xl cards with shadows, a chevron in a coloured circle, and a
 * gradient category header.
 *
 * Now a plain disclosure list on hairlines. Native <details>/<summary> would
 * be simpler still, but the controlled version keeps the open/close state
 * predictable across categories and lets the marker be typographic.
 *
 * DESIGN.md → §7.0: the awkward questions go first. If this list ever opens
 * with parking rather than construction quality and the foreign-purchase
 * process, the ordering in lib/copy is wrong, not this component.
 */
export default function FAQ({ eyebrow, title, lede, groups }: FaqProps) {
    const [open, setOpen] = useState<string | null>(null);

    return (
        <section id="faq" className="section-padding border-t border-line bg-paper">
            <div className="section-container">
                <div className="eyebrow">{eyebrow}</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l text-ink">{title}</h2>
                    <p className="lede self-end">{lede}</p>
                </div>

                <div className="mt-12 grid gap-x-16 gap-y-10 lg:grid-cols-2">
                    {groups.map((group, groupIndex) => (
                        <section key={group.title} aria-labelledby={`faq-${groupIndex}`}>
                            <h3
                                id={`faq-${groupIndex}`}
                                className="caption border-b border-line pb-3"
                            >
                                {group.title}
                            </h3>

                            <dl>
                                {group.items.map((item) => {
                                    const id = `${groupIndex}-${item.q}`;
                                    const isOpen = open === id;
                                    return (
                                        <div key={id} className="border-b border-line">
                                            <dt>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        track('FAQ Toggled', { question: item.q.slice(0, 100) });
                                                        setOpen(isOpen ? null : id);
                                                    }}
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
