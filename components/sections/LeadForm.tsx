import LeadFormCore from '@/components/LeadFormCore';
import LeadChoice from '@/components/sections/LeadChoice';
import type { Copy } from '@/lib/copy/types';
import type { Locale } from '@/lib/format';
import { projectConfig, whatsappDigits } from '@/lib/project-config';

/* Book a viewing. Two choices first (call the builder, or ask for
 * information, which unfolds the form: components/sections/LeadChoice.tsx), then
 * a WhatsApp or SMS message to Brenda, already written, or a call back. See
 * components/LeadFormCore.tsx. */
export default function LeadForm({
    copy,
    locale,
    unitOptions,
}: {
    copy: Copy;
    locale: Locale;
    unitOptions: { value: string; label: string }[];
}) {
    const { leadForm } = copy;

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
                            <LeadChoice copy={copy.form.choice} phone={projectConfig.callNumber ?? projectConfig.contactPhone} messaging={!!whatsappDigits} lang={locale}>
                                <LeadFormCore
                                    copy={copy.form}
                                    lang={locale}
                                    unitOptions={unitOptions}
                                    whatsappDigits={whatsappDigits}
                                    privacyHref={projectConfig.privacyPath[locale]}
                                />
                            </LeadChoice>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
