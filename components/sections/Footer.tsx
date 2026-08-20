'use client';

import Image from 'next/image';
import { scrollToElement } from '@/lib/utils';
import { siteAddress } from '@/lib/data';

/* Was: a dark gradient over two 500px blurred orbs, social icons in rounded
 * squares with hover:scale-110, and a newsletter block. Rewritten as a plain
 * colophon on the anthracite band — which is what a footer on a document is.
 *
 * ⚠️ The phone number and email below look like placeholders (+36 1 234 5678).
 * Verify them with S-Patrik Bau before this goes live: a dead number on the
 * contact block undoes everything the rest of the page is trying to establish.
 */

const companyDetails = {
    name: 'S-Patrik Bau Kft.',
    email: 'info@spatrikbau.com',
    phone: '+36 1 234 5678',
    address: siteAddress.full,
    taxNumber: '24304559213',
    registrationNumber: '13 09 220814',
    website: 'spatrikbau.com',
};

const quickLinks = [
    { href: 'property-overview', label: 'Overview' },
    { href: 'floor-plans', label: 'The six gardens' },
    { href: 'specs', label: 'Specification' },
    { href: 'location', label: 'Location' },
    { href: 'faq', label: 'Questions' },
];

export default function Footer() {
    return (
        <footer className="band-frame">
            <div className="section-container py-16">
                <div className="grid gap-10 border-b border-onmedia/20 pb-12 md:grid-cols-[1.2fr_1fr_1fr]">
                    <div>
                        <p className="font-display text-2xl text-onmedia">Spanyolrét Gardens</p>
                        <p className="mt-3 max-w-[34ch] text-[0.9375rem] leading-relaxed text-[color:var(--on-frame-soft)]">
                            Six townhouses with private gardens of 102 to 317 m², in Budapest&rsquo;s XI.
                            District. Keys September 2026.
                        </p>
                        <button
                            type="button"
                            onClick={() => scrollToElement('lead-form')}
                            className="btn btn-ghost-inv mt-6"
                        >
                            Book a viewing
                        </button>
                    </div>

                    <nav aria-label="Footer">
                        <p className="caption !text-[color:var(--on-frame-soft)]">On this page</p>
                        <ul className="mt-4">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <button
                                        type="button"
                                        onClick={() => scrollToElement(link.href)}
                                        className="inline-flex min-h-[44px] items-center border-b border-transparent text-[0.9375rem] text-onmedia transition-colors duration-short hover:border-clay"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <p className="caption !text-[color:var(--on-frame-soft)]">Contact</p>
                        <dl className="mt-4 space-y-3 text-[0.9375rem]">
                            <div>
                                <dt className="sr-only">Address</dt>
                                <dd className="text-onmedia">{companyDetails.address}</dd>
                            </div>
                            <div>
                                <dt className="sr-only">Email</dt>
                                <dd>
                                    <a
                                        href={`mailto:${companyDetails.email}`}
                                        className="measure border-b border-clay text-onmedia transition-colors duration-short hover:border-paper"
                                    >
                                        {companyDetails.email}
                                    </a>
                                </dd>
                            </div>
                            <div>
                                <dt className="sr-only">Phone</dt>
                                <dd>
                                    <a
                                        href={`tel:${companyDetails.phone.replace(/\s/g, '')}`}
                                        className="measure border-b border-clay text-onmedia transition-colors duration-short hover:border-paper"
                                    >
                                        {companyDetails.phone}
                                    </a>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <div className="flex flex-wrap items-end justify-between gap-6 pt-8">
                    <div>
                        <Image
                            src="/espatrick-bau-logo.png"
                            alt={companyDetails.name}
                            width={140}
                            height={42}
                            className="h-8 w-auto object-contain opacity-80"
                        />
                        <p className="caption mt-4 !text-[color:var(--on-frame-soft)]">
                            {companyDetails.name} · Tax {companyDetails.taxNumber} · Reg{' '}
                            {companyDetails.registrationNumber}
                        </p>
                    </div>
                    <p className="caption !text-[color:var(--on-frame-soft)]">
                        Architect: JRT Stúdió Kft.
                    </p>
                </div>
            </div>
        </footer>
    );
}
