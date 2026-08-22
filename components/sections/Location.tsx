'use client';

import {
    transportLinks,
    nearbyAmenities,
    neighborhoodHighlights,
    siteAddress,
    mapEmbedSrc,
    mapLinkHref,
} from '@/lib/data';

/* Was: a rounded-2xl map with shadow-xl, transport links as icon-in-rounded-
 * square rows, and the neighbourhood list as ticks in circles. Rewritten as a
 * table of distances — which is what this section is, and it lets the reader
 * check the claim instead of being told it.
 *
 * Address, pin and link all come from `siteAddress` in lib/data.ts, so the one
 * checkable fact on this page can only be wrong in one place — which it has
 * been, three times. The current value comes from the developer's own 2026-09
 * price list; see the provenance note next to the constant.
 */
export default function Location() {
    return (
        <section id="location" className="section-padding border-t border-line bg-paper">
            <div className="section-container">
                <div className="eyebrow">Where it is</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l text-ink">
                        Twenty minutes from the centre. None of the noise.
                    </h2>
                    <p className="lede self-end">
                        Spanyolrét is not central and we are not going to pretend otherwise. What you get
                        for those extra fifteen minutes is a street where nothing happens.
                    </p>
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
                                title="Spanyolrét Gardens location on Google Maps"
                                className="h-full w-full"
                            />
                        </div>

                        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                            <p className="measure text-[0.9375rem] text-ink">
                                {siteAddress.full}
                                <span className="ml-3 text-ink-soft">XI. District (Újbuda)</span>
                            </p>
                            <a
                                href={mapLinkHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-quiet text-[0.9375rem]"
                            >
                                Open in Google Maps →
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="caption border-b border-line pb-3">Getting around</h3>
                        <dl className="mb-10">
                            {transportLinks.map((link) => (
                                <div
                                    key={link.name}
                                    className="flex items-baseline justify-between gap-6 border-b border-line py-3.5"
                                >
                                    <dt className="text-[0.9375rem] text-ink">{link.name}</dt>
                                    <dd className="measure shrink-0 text-sm text-ink-soft">{link.time}</dd>
                                </div>
                            ))}
                        </dl>

                        <h3 className="caption border-b border-line pb-3">What is nearby</h3>
                        <dl className="mb-10">
                            {nearbyAmenities.map((group) => (
                                <div key={group.category} className="border-b border-line py-3.5">
                                    <dt className="caption">{group.category}</dt>
                                    <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                                        {group.items.join(' · ')}
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        <h3 className="caption border-b border-line pb-3">The street itself</h3>
                        <ul>
                            {neighborhoodHighlights.map((highlight) => (
                                <li
                                    key={highlight}
                                    className="border-b border-line py-3 text-[0.9375rem] text-ink-soft"
                                >
                                    {highlight}
                                </li>
                            ))}
                        </ul>

                        <p className="mt-6 max-w-[46ch] text-sm text-ink-soft">
                            The part you cannot check on a map is what the street sounds like at nine in
                            the evening. Come and hear it before you decide anything.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
