'use client';

import {
    transportLinksHu,
    nearbyAmenitiesHu,
    neighborhoodHighlightsHu,
    uiTextsHu,
    siteAddress,
    mapEmbedSrc,
    mapLinkHref,
} from '@/lib/data-hu';

/* Mirror of components/sections/Location.tsx.
 *
 * A térkép korábban kézzel írt `pb=` blokk volt: a koordinátái
 * (47.4584, 19.0234) a kelenföldi 4-es metró járműtelepre esnek, innen 3,2
 * km-re, a hely azonosítója pedig szó szerint `0x1234567890abcdef` volt. A cím,
 * a jelölő és a hivatkozás mostantól mind a lib/data.ts `siteAddress`
 * konstansából jön, így az oldal egyetlen ellenőrizhető állítása egyetlen
 * helyen romolhat el.
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
                                src={mapEmbedSrc}
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
                                {siteAddress.full}
                                <span className="ml-3 text-ink-soft">XI. kerület (Újbuda)</span>
                            </p>
                            <a
                                href={mapLinkHref}
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
