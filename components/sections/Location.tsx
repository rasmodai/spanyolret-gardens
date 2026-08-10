'use client';

import { transportLinks, nearbyAmenities, neighborhoodHighlights } from '@/lib/data';

/* Was: a rounded-2xl map with shadow-xl, transport links as icon-in-rounded-
 * square rows, and the neighbourhood list as ticks in circles. Rewritten as a
 * table of distances — which is what this section is, and it lets the reader
 * check the claim instead of being told it.
 *
 * ⚠️ The Google Maps embed URL below carries placeholder coordinates
 * (`!1d2697.1234567890123`, `0x1234567890abcdef`). Generate a real embed for
 * Spanyolréti út 1116 before this ships, or the map points somewhere else and
 * the one checkable fact on the page becomes the one that is wrong.
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
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2697.1234567890123!2d19.0123456!3d47.4567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741ddc7e0c8f4b7%3A0x1234567890abcdef!2sSpanyolr%C3%A9ti%20%C3%BAt%2C%20Budapest%2C%20Hungary!5e0!3m2!1sen!2shu!4v1702900000000!5m2!1sen!2shu"
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
                                Spanyolréti út, 1116 Budapest
                                <span className="ml-3 text-ink-soft">XI. District (Újbuda)</span>
                            </p>
                            <a
                                href="https://www.google.com/maps/search/Spanyolréti+út,+Budapest+1116"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-quiet inline-flex min-h-[44px] items-center text-[0.9375rem]"
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
