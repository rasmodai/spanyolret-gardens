'use client';

import LeadFormCore, { type LeadFormCopy } from '@/components/LeadFormCore';
import { units } from '@/lib/data';
import { privacyPath, whatsappDigits } from '@/lib/site';
import { formatArea } from '@/lib/utils';

const copy: LeadFormCopy = {
    unit: 'Melyik sorház érdekel?',
    unitAny: 'Még nem tudom',
    priority: 'Mi a legfontosabb számodra?',
    priorities: { outdoor: 'A saját kert', space: 'Az alapterület és az elosztás', location: 'Az elhelyezkedés', price: 'Az ár' },
    timeline: 'Mikor szeretnél költözni?',
    timelinePlaceholder: 'Válassz',
    timelineOptions: [
        { value: 'immediately', label: 'Minél előbb' },
        { value: '3-6-months', label: '3–6 hónapon belül' },
        { value: '6-12-months', label: '6–12 hónapon belül' },
        { value: '12-plus-months', label: 'Több mint 12 hónap múlva' },
    ],
    firstName: 'Keresztnév',
    phone: 'Telefonszám',
    email: 'E-mail (nem kötelező)',
    consent: 'Hozzájárulok, hogy az érdeklődésemmel kapcsolatban felvegyék velem a kapcsolatot.',
    privacyLink: 'Adatkezelési tájékoztató',
    privacyHref: privacyPath.hu,
    choose: 'Küldés ezzel:',
    opening: 'Az üzenet megnyitása…',
    whatsapp: 'WhatsApp',
    sms: 'SMS',
    note: 'A válaszaidat is rögzítjük, hogy visszahívhassunk, ha az üzenet nem érkezne meg hozzánk.',
    callBack: 'Inkább visszahívást kérek',
    submit: 'Időpontot kérek',
    sending: 'Küldés…',
    failure: 'Hiba történt, a kérésedet nem sikerült elküldeni. Kérjük, próbáld újra.',
    rateLimited: 'Az internetkapcsolatodról túl sok kérés érkezett. Kérjük, egy óra múlva próbáld újra.',
    errors: {
        firstName: 'Kérjük, add meg a keresztneved',
        phone: 'Kérjük, add meg a telefonszámod',
        consent: 'A kapcsolatfelvételhez szükségünk van a hozzájárulásodra',
    },
    message: {
        intro: 'Jó napot! {name} vagyok, a Spanyolrét Gardens sorházai iránt érdeklődöm.',
        unit: 'Sorház: {unit}',
        anyUnit: 'Még nem választottam sorházat.',
        priority: 'Számomra a legfontosabb: {priority}',
        timeline: 'Tervezett költözés: {timeline}',
        close: 'Mikor tudnánk egy látogatást egyeztetni?',
    },
    thankYouPath: '/hu/koszonjuk',
};

const unitOptions = units
    .filter((unit) => unit.status === 'available')
    .map((unit) => ({ value: unit.id, label: `${unit.id} · ${formatArea(unit.gardenArea, 'hu')} kert` }));

/* Időpontfoglalás. Első választás: előre megírt WhatsApp- vagy SMS-üzenet
 * Brendának; második: visszahívás. Lásd components/LeadFormCore.tsx. */
export default function LeadFormHu() {
    return (
        <section id="lead-form" className="section-padding band-frame">
            <div className="section-container">
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                    <div className="text-onmedia">
                        <div className="caption mb-6 flex items-center gap-4 !text-[color:var(--on-frame-soft)]">
                            Időpontfoglalás
                            <span className="h-px flex-1 bg-onmedia/20" />
                        </div>

                        <h2 className="display-l wrap-compound text-onmedia">Gyere el, állj be a kertbe.</h2>
                        <p className="wrap-compound mt-5 max-w-[46ch] text-[1.0625rem] leading-relaxed text-[color:var(--on-frame-soft)]">
                            {whatsappDigits
                                ? 'Válaszolj három rövid kérdésre, majd válaszd a WhatsAppot vagy az SMS-t: az üzenet előre megírva nyílik meg, csak el kell küldened. A látogatásra hozd a gyerekeket is.'
                                : 'Hozd a gyerekeket. Ők többet mondanak majd 300 m² fűről, mint mi. Egy látogatás, és nincs utánkövetés, hacsak nem kéred.'}
                        </p>

                        <dl className="mt-9 border-t border-onmedia/20">
                            <div className="border-b border-onmedia/15 py-4">
                                <dt className="measure text-[0.9375rem] text-onmedia">{whatsappDigits ? 'Még ma válaszolunk' : 'Még ma hívunk'}</dt>
                                <dd className="wrap-compound mt-1 text-sm text-[color:var(--on-frame-soft)]">
                                    Budapesti munkaidőben egy órán belül. Azon kívül másnap reggel elsőként.
                                </dd>
                            </div>
                            <div className="border-b border-onmedia/15 py-4">
                                <dt className="measure text-[0.9375rem] text-onmedia">Magyarul és angolul</dt>
                                <dd className="wrap-compound mt-1 text-sm text-[color:var(--on-frame-soft)]">
                                    A teljes vásárlási folyamat mehet angolul is, ha az kényelmesebb.
                                </dd>
                            </div>
                            <div className="border-b border-onmedia/15 py-4">
                                <dt className="measure text-[0.9375rem] text-onmedia">Mit kezdünk az adataiddal</dt>
                                <dd className="wrap-compound mt-1 text-sm text-[color:var(--on-frame-soft)]">
                                    A Spanyolrét Gardensszel kapcsolatban keresünk meg. Nem adjuk tovább senkinek,
                                    és egyetlen e-mailedre töröljük.
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <div className="bg-paper p-6 text-ink md:p-8">
                        <LeadFormCore copy={copy} lang="hu" unitOptions={unitOptions} />
                    </div>
                </div>
            </div>
        </section>
    );
}
