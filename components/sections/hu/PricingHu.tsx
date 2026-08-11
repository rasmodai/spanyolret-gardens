'use client';

import { includedInPriceHu, optionalExtrasHu, uiTextsHu } from '@/lib/data-hu';
import { scrollToElement } from '@/lib/utils';

/* Mirror of components/sections/Pricing.tsx.
 *
 * This component did not exist. Neither locale rendered a pricing section at
 * all — Pricing.tsx was written but never mounted — so the anchor figure, the
 * included list and, most importantly, the "these extras cost extra" list were
 * invisible to every visitor. The honesty rule in DESIGN.md was dead code.
 */
export default function PricingHu() {
    const t = uiTextsHu.hero;

    return (
        <section id="pricing" className="section-padding border-t border-line band-deep">
            <div className="section-container">
                <div className="eyebrow">Árazás</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l wrap-compound text-ink">
                        Mit fedez az ár, és mit nem.
                    </h2>
                    <div className="self-end">
                        <p className="measure text-3xl text-ink md:text-4xl">{t.priceValue}</p>
                        <p className="caption wrap-compound mt-2">{t.priceQualifier}</p>
                        <p className="lede wrap-compound mt-5">
                            Kulcsot kapsz, nem szerkezetkész házat. A kertek több mint háromszorosan
                            különböznek, ezért az adott házra vonatkozó összeget tőlünk kapod meg.
                        </p>
                    </div>
                </div>

                <div className="mt-14 grid gap-x-16 gap-y-10 lg:grid-cols-2">
                    <div>
                        <h3 className="caption border-b border-line pb-3">Az árban</h3>
                        <ul>
                            {includedInPriceHu.map((item) => (
                                <li
                                    key={item}
                                    className="wrap-compound border-b border-line py-3.5 text-[0.9375rem] leading-relaxed text-ink"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="caption border-b border-line pb-3">Külön díjazású</h3>
                        <dl>
                            {optionalExtrasHu.map((extra) => (
                                <div
                                    key={extra.item}
                                    className="flex items-baseline justify-between gap-6 border-b border-line py-3.5"
                                >
                                    <dt className="wrap-compound text-[0.9375rem] leading-relaxed text-ink-soft">
                                        {extra.item}
                                    </dt>
                                    <dd className="measure shrink-0 text-sm text-ink">{extra.price}</dd>
                                </div>
                            ))}
                        </dl>
                        <p className="wrap-compound mt-5 max-w-[46ch] text-sm text-ink-soft">
                            Ezek egyike sincs benne a 240 000 000 Ft-os összegben. Azért itt soroljuk fel,
                            és nem a szerződésnél, mert utólag megtudni pont az, amitől az ember úgy érzi,
                            rásóztak valamit.
                        </p>
                    </div>
                </div>

                <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-8">
                    <button
                        type="button"
                        onClick={() => scrollToElement('lead-form')}
                        className="btn btn-primary"
                    >
                        Kérem az árat
                    </button>
                    <p className="wrap-compound max-w-[52ch] text-sm text-ink-soft">
                        A fizetési ütemezést és a finanszírozást a foglalási dokumentumok rögzítik.
                        Mindkettőt végigvesszük veled, mielőtt bármit aláírsz.
                    </p>
                </div>
            </div>
        </section>
    );
}
