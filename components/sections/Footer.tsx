import Image from 'next/image';
import ConsentSettingsButton from '@/components/consent/ConsentSettingsButton';
import ScrollButton from '@/components/ui/ScrollButton';
import type { Copy } from '@/lib/copy/types';
import { siteAddress } from '@/lib/data';
import { fill, type Locale } from '@/lib/format';
import { projectConfig } from '@/lib/project-config';

/* Was: a dark gradient over two 500px blurred orbs, social icons in rounded
 * squares with hover:scale-110, and a newsletter block. Rewritten as a plain
 * colophon on the anthracite band — which is what a footer on a document is.
 *
 * Every contact line comes from lib/project-config.ts, and a null value removes
 * its line: a dead number or a placeholder in the contact block would undo
 * everything the rest of the page is trying to establish.
 */
export default function Footer({ copy, locale }: { copy: Copy; locale: Locale }) {
    const { footer } = copy;
    const { developer, contactEmail, contactPhone } = projectConfig;

    return (
        <footer id="footer" className="band-frame">
            <div className="section-container py-16">
                <div className="grid gap-10 border-b border-onmedia/20 pb-12 md:grid-cols-[1.2fr_1fr_1fr]">
                    <div>
                        <p className="font-display text-2xl text-onmedia">Spanyolrét Gardens</p>
                        <p className="mt-3 max-w-[34ch] text-[0.9375rem] leading-relaxed text-[color:var(--on-frame-soft)]">
                            {footer.tagline}
                        </p>
                        <ScrollButton target="lead-form" className="btn btn-ghost-inv mt-6">
                            {footer.cta}
                        </ScrollButton>
                    </div>

                    <nav aria-label={footer.ariaLabel}>
                        <p className="caption !text-[color:var(--on-frame-soft)]">{footer.onThisPage}</p>
                        <ul className="mt-4">
                            {footer.links.map((link) => (
                                <li key={link.id}>
                                    <ScrollButton
                                        target={link.id}
                                        className="inline-flex min-h-[44px] items-center border-b border-transparent text-[0.9375rem] text-onmedia transition-colors duration-short hover:border-clay"
                                    >
                                        {link.label}
                                    </ScrollButton>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <p className="caption !text-[color:var(--on-frame-soft)]">{footer.contact}</p>
                        <dl className="mt-4 space-y-3 text-[0.9375rem]">
                            <div>
                                <dt className="sr-only">{footer.address}</dt>
                                <dd className="text-onmedia">{siteAddress.full}</dd>
                            </div>
                            {contactEmail && (
                                <div>
                                    <dt className="sr-only">{footer.email}</dt>
                                    <dd>
                                        <a
                                            href={`mailto:${contactEmail}`}
                                            className="measure border-b border-clay text-onmedia transition-colors duration-short hover:border-paper"
                                        >
                                            {contactEmail}
                                        </a>
                                    </dd>
                                </div>
                            )}
                            {contactPhone && (
                                <div>
                                    <dt className="sr-only">{footer.phone}</dt>
                                    <dd>
                                        <a
                                            href={`tel:${contactPhone.replace(/\s/g, '')}`}
                                            className="measure border-b border-clay text-onmedia transition-colors duration-short hover:border-paper"
                                        >
                                            {contactPhone}
                                        </a>
                                    </dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </div>

                <div className="flex flex-wrap items-end justify-between gap-6 pt-8">
                    <div>
                        <Image
                            src="/espatrick-bau-logo.png"
                            alt={developer.name}
                            width={140}
                            height={42}
                            className="h-8 w-auto object-contain opacity-80"
                        />
                        <p className="caption mt-4 !text-[color:var(--on-frame-soft)]">
                            {fill(footer.legalLine, {
                                name: developer.name,
                                tax: developer.taxNumber,
                                registration: projectConfig.privacyController.registrationNumber,
                            })}
                        </p>
                    </div>
                    <p className="caption !text-[color:var(--on-frame-soft)]">
                        {fill(footer.architect, { name: projectConfig.architect })}
                    </p>
                    <div className="flex w-full flex-wrap gap-x-6 gap-y-1 text-[0.9375rem]">
                        <a href={projectConfig.privacyPath[locale]} className="btn-quiet !text-onmedia">
                            {footer.privacy}
                        </a>
                        <ConsentSettingsButton label={footer.cookieSettings} className="btn-quiet !text-onmedia" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
