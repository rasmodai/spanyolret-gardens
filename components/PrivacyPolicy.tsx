import ConsentSettingsButton from '@/components/consent/ConsentSettingsButton';
import { privacyCopy } from '@/lib/privacy-copy';
import { privacyController as controller, privacyPolicyDate } from '@/lib/site';

export default function PrivacyPolicy({ locale }: { locale: 'en' | 'hu' }) {
    const t = privacyCopy[locale];
    return (
        <main className="min-h-screen bg-paper text-ink">
            <article className="section-container max-w-[46rem] pb-16 pt-10 md:pt-16">
                <a href={t.backHref} className="font-display text-2xl text-ink">Spanyolrét Gardens</a>
                <h1 className="display-l mt-10 text-ink">{t.title}</h1>
                <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-soft">{t.intro}</p>

                <section className="mt-10">
                    <h2 className="caption border-b border-line pb-3">{t.controllerTitle}</h2>
                    <dl className="mt-3 space-y-2">
                        <div><dt className="text-sm text-ink-soft">{t.labels.name}</dt><dd>{controller.name}</dd></div>
                        <div><dt className="text-sm text-ink-soft">{t.labels.address}</dt><dd>{controller.address}</dd></div>
                        <div><dt className="text-sm text-ink-soft">{t.labels.registration}</dt><dd className="measure">{controller.registrationNumber}</dd></div>
                        <div>
                            <dt className="text-sm text-ink-soft">{t.labels.email}</dt>
                            <dd><a href={`mailto:${controller.email}`} className="underline">{controller.email}</a></dd>
                        </div>
                    </dl>
                    <p className="mt-3 leading-relaxed">{t.onBehalf}</p>
                </section>

                {t.sections.map((section) => (
                    <section key={section.title} className="mt-10">
                        <h2 className="caption border-b border-line pb-3">{section.title}</h2>
                        {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-3 leading-relaxed">{paragraph}</p>)}
                        {section.items && (
                            <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
                                {section.items.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                        )}
                    </section>
                ))}

                <section className="mt-10">
                    <h2 className="caption border-b border-line pb-3">{t.retentionTitle}</h2>
                    <p className="mt-3 leading-relaxed">{t.retention}</p>
                </section>

                <section className="mt-10">
                    <h2 className="caption border-b border-line pb-3">{t.rightsTitle}</h2>
                    <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
                        {t.rights.map((right) => <li key={right}>{right}</li>)}
                    </ul>
                    <p className="mt-3 leading-relaxed">
                        {t.rightsContact} <a href={`mailto:${controller.email}`} className="underline">{controller.email}</a>
                    </p>
                    <p className="mt-3 leading-relaxed">{t.complaint}</p>
                </section>

                <p className="mt-10 text-sm text-ink-soft">{t.updated} {privacyPolicyDate[locale]}</p>
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                    <a href={t.backHref} className="btn-quiet">{t.back}</a>
                    <ConsentSettingsButton label={t.cookieSettings} />
                </div>
            </article>
        </main>
    );
}
