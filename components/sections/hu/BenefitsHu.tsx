'use client';

import { benefitsHu } from '@/lib/data-hu';

/* Mirror of components/sections/Benefits.tsx. */
export default function BenefitsHu() {
    return (
        <section id="benefits" className="section-padding border-t border-line band-deep">
            <div className="section-container">
                <div className="eyebrow">Amit kapsz</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l wrap-compound text-ink">
                        Amit csak beköltözés után veszel észre.
                    </h2>
                    <p className="lede wrap-compound self-end">
                        Harminc centis válaszfalak. Nincs gázbekötés. Kapu, amit a vezetőülésből nyitsz.
                        Azok a dolgok, amikre már nem gondolsz, ha egyszer egyszerűen igazak.
                    </p>
                </div>

                <ol className="mt-12 border-t border-line">
                    {benefitsHu.map((benefit, i) => (
                        <li
                            key={benefit.title}
                            className="grid gap-x-6 gap-y-2 border-b border-line py-6 md:grid-cols-[3rem_1fr_minmax(0,22rem)] md:items-baseline"
                        >
                            <span className="measure text-sm text-ink-soft">
                                {String(i + 1).padStart(2, '0')}
                            </span>

                            <h3 className="wrap-compound font-display text-xl leading-snug text-ink">
                                {benefit.title}
                            </h3>

                            <p className="wrap-compound text-[0.9375rem] leading-relaxed text-ink-soft">
                                {benefit.description}
                                {benefit.highlight && (
                                    <span className="measure ml-2 whitespace-nowrap text-ink">
                                        {benefit.highlight}
                                    </span>
                                )}
                            </p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
