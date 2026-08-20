'use client';

import Image from 'next/image';
import { scrollToElement } from '@/lib/utils';
import { siteAddress } from '@/lib/data-hu';

/* Mirror of components/sections/Footer.tsx.
 *
 * ⚠️ A telefonszám és az e-mail helykitöltőnek tűnik (+36 1 234 5678).
 * Élesítés előtt ellenőrizni kell az S-Patrik Bau-val: egy nem működő szám a
 * kapcsolat blokkban lerombolja mindazt, amit az oldal többi része felépít.
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
    { href: 'property-overview', label: 'Áttekintés' },
    { href: 'floor-plans', label: 'A hat kert' },
    { href: 'specs', label: 'Műszaki leírás' },
    { href: 'location', label: 'Lokáció' },
    { href: 'faq', label: 'Kérdések' },
];

export default function FooterHu() {
    return (
        <footer className="band-frame">
            <div className="section-container py-16">
                <div className="grid gap-10 border-b border-onmedia/20 pb-12 md:grid-cols-[1.2fr_1fr_1fr]">
                    <div>
                        <p className="font-display text-2xl text-onmedia">Spanyolrét Gardens</p>
                        <p className="wrap-compound mt-3 max-w-[34ch] text-[0.9375rem] leading-relaxed text-[color:var(--on-frame-soft)]">
                            Hat sorház 102–317 m² saját kerttel, Budapest XI. kerületében.
                            Kulcsátadás 2026 szeptemberében.
                        </p>
                        <button
                            type="button"
                            onClick={() => scrollToElement('lead-form')}
                            className="btn btn-ghost-inv mt-6"
                        >
                            Időpontot kérek
                        </button>
                    </div>

                    <nav aria-label="Lábléc">
                        <p className="caption !text-[color:var(--on-frame-soft)]">Az oldalon</p>
                        <ul className="mt-4">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <button
                                        type="button"
                                        onClick={() => scrollToElement(link.href)}
                                        className="wrap-compound inline-flex min-h-[44px] items-center border-b border-transparent text-[0.9375rem] text-onmedia transition-colors duration-short hover:border-clay"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <p className="caption !text-[color:var(--on-frame-soft)]">Kapcsolat</p>
                        <dl className="mt-4 space-y-3 text-[0.9375rem]">
                            <div>
                                <dt className="sr-only">Cím</dt>
                                <dd className="text-onmedia">{companyDetails.address}</dd>
                            </div>
                            <div>
                                <dt className="sr-only">E-mail</dt>
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
                                <dt className="sr-only">Telefon</dt>
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
                            {companyDetails.name} · Adószám {companyDetails.taxNumber} · Cégjegyzékszám{' '}
                            {companyDetails.registrationNumber}
                        </p>
                    </div>
                    <p className="caption !text-[color:var(--on-frame-soft)]">
                        Tervező: JRT Stúdió Kft.
                    </p>
                </div>
            </div>
        </footer>
    );
}
