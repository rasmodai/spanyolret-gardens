import LeadFormCore from '@/components/LeadFormCore';
import type { Copy } from '@/lib/copy/types';
import type { Locale } from '@/lib/format';
import { fill } from '@/lib/format';
import { projectConfig, whatsappDigits } from '@/lib/project-config';

/* The contact section. One button, one short form (first name, phone, and a
 * budget and a house if the visitor wants to say), like City Gate's V2 of
 * 16/11/2026: the two-step choice added on 13/11 cut the share of visitors
 * leaving a contact there from 7.9 % to 2.7 %. The ways in that are not the
 * form (a message to Brenda, a call to the builder) sit under the button. See
 * components/LeadFormCore.tsx. */
export default function LeadForm({
    copy,
    locale,
    unitOptions,
    availability,
}: {
    copy: Copy;
    locale: Locale;
    unitOptions: { value: string; label: string }[];
    /** "6 houses, 4 available · A3 and B2 sold…" */
    availability: string;
}) {
    const { leadForm } = copy;
    const phone = projectConfig.callNumber;

    return (
        <section id="lead-form" className="section-airy band-frame">
            <div className="section-container relative z-10">
                <div className="mx-auto max-w-4xl">
                    <div className="grid gap-10 lg:grid-cols-2">
                        <div className="text-onmedia" data-reveal>
                            <div className="caption mb-6 flex items-center gap-4 !text-[color:var(--on-frame-soft)]">
                                {leadForm.eyebrow}
                                <span className="h-px flex-1 bg-onmedia/20" />
                            </div>

                            <h2 className="display-l text-onmedia">{leadForm.title}</h2>
                            <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-relaxed text-[color:var(--on-frame-soft)]">
                                {whatsappDigits ? leadForm.ledeMessaging : leadForm.ledeNoMessaging}
                            </p>
                            <p className="caption mt-4 !text-[color:var(--on-frame-soft)]">{availability}</p>

                            <dl className="mt-9 border-t border-onmedia/20">
                                <div className="border-b border-onmedia/15 py-4">
                                    <dt className="measure text-[0.9375rem] text-onmedia">
                                        {whatsappDigits ? leadForm.replyTodayMessaging : leadForm.replyTodayCall}
                                    </dt>
                                    <dd className="mt-1 text-sm text-[color:var(--on-frame-soft)]">{leadForm.replyText}</dd>
                                </div>
                                {leadForm.facts.map((fact) => (
                                    <div key={fact.title} className="border-b border-onmedia/15 py-4">
                                        <dt className="measure text-[0.9375rem] text-onmedia">{fact.title}</dt>
                                        <dd className="mt-1 text-sm text-[color:var(--on-frame-soft)]">{fact.text}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        <div className="bg-paper p-6 text-ink md:p-8" data-reveal="2">
                            <LeadFormCore
                                copy={copy.form}
                                lang={locale}
                                unitOptions={unitOptions}
                                whatsappDigits={whatsappDigits}
                                privacyHref={projectConfig.privacyPath[locale]}
                                callNumber={phone}
                                callLabel={phone ? fill(copy.form.callBuilder, { phone }) : null}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
