'use client';

import { transportLinksHu, nearbyAmenitiesHu, neighborhoodHighlightsHu, uiTextsHu } from '@/lib/data-hu';

/* Mirror of components/sections/Location.tsx.
 *
 * ⚠️ A Google Maps beágyazás URL-je helykitöltő koordinátákat tartalmaz
 * (`!1d2697.1234567890123`, `0x1234567890abcdef`). Élesítés előtt valódi
 * beágyazást kell generálni a Spanyolréti útra, különben a térkép máshová
 * mutat — és pont az az egy ellenőrizhető állítás lesz hibás az oldalon.
 */
export default function LocationHu() {
    const t = uiTextsHu.location;

    return (
        <section id="location" className="section-padding border-t border-line bg-paper">
            <div className="section-container">
                <div className="eyebrow">{t.badge}</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l wrap-compound text-ink">{t.title}</h2>
                    <p className="lede wrap-compound self-end">{t.subtitle}</p>
                </div>

                <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
                    <div>
                        <div className="h-[22rem] overflow-hidden border border-line lg:h-[26rem]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2697.1234567890123!2d19.0123456!3d47.4567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741ddc7e0c8f4b7%3A0x1234567890abcdef!2sSpanyolr%C3%A9ti%20%C3%BAt%2C%20Budapest%2C%20Hungary!5e0!3m2!1shu!2shu!4v1702900000000!5m2!1shu!2shu"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Spanyolrét Gardens elhelyezkedése a Google Térképen"
                                className="h-full w-full"
                            />
                        </div>

                        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                            <p className="measure text-[0.9375rem] text-ink">
                                Spanyolréti út, 1116 Budapest
                                <span className="ml-3 text-ink-soft">XI. kerület (Újbuda)</span>
                            </p>
                            <a
                                href="https://www.google.com/maps/search/Spanyolréti+út,+Budapest+1116"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-quiet text-[0.9375rem]"
                            >
                                Megnyitás a Google Térképen →
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="caption border-b border-line pb-3">{t.gettingAround}</h3>
                        <dl className="mb-10">
                            {transportLinksHu.map((link) => (
                                <div
                                    key={link.name}
                                    className="flex items-baseline justify-between gap-6 border-b border-line py-3.5"
                                >
                                    <dt className="wrap-compound text-[0.9375rem] text-ink">{link.name}</dt>
                                    <dd className="measure shrink-0 text-sm text-ink-soft">{link.time}</dd>
                                </div>
                            ))}
                        </dl>

                        <h3 className="caption border-b border-line pb-3">A környéken</h3>
                        <dl className="mb-10">
                            {nearbyAmenitiesHu.map((group) => (
                                <div key={group.category} className="border-b border-line py-3.5">
                                    <dt className="caption wrap-compound">{group.category}</dt>
                                    <dd className="wrap-compound mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                                        {group.items.join(' · ')}
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        <h3 className="caption border-b border-line pb-3">Maga az utca</h3>
                        <ul>
                            {neighborhoodHighlightsHu.map((highlight) => (
                                <li
                                    key={highlight}
                                    className="wrap-compound border-b border-line py-3 text-[0.9375rem] text-ink-soft"
                                >
                                    {highlight}
                                </li>
                            ))}
                        </ul>

                        <p className="wrap-compound mt-6 max-w-[46ch] text-sm text-ink-soft">
                            Amit a térképen nem tudsz ellenőrizni: hogy hogyan hangzik az utca este kilenckor.
                            Gyere el és hallgasd meg, mielőtt bármit eldöntesz.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
