import { getCopy } from '@/lib/copy';
import type { Locale } from '@/lib/format';
import { projectConfig } from '@/lib/project-config';

/* After the call-back form: what happens next, the brochure, and a faster way
 * in for those who want one. The lead is already captured; the WhatsApp and
 * SMS links only open the visitor's app.
 *
 * The brochure (public/Spanyolret-gardens.pdf) is linked as before: it is not
 * decided yet whether it stays public. */
export default function ThankYou({ locale }: { locale: Locale }) {
    const { thankYou } = getCopy(locale);
    const digits = projectConfig.whatsappNumber?.replace(/\D/g, '') || null;
    const text = encodeURIComponent(thankYou.message);

    return (
        <main className={`flex min-h-screen flex-col bg-paper ${locale === 'hu' ? 'wrap-compound' : ''}`}>
            <div className="section-container flex flex-1 flex-col justify-center py-16">
                <h1 className="display-xl text-ink">{thankYou.title}</h1>
                <p className="lede mt-5">{thankYou.text}</p>
                <ol className="mt-8 max-w-[58ch] space-y-3 border-l-2 border-lawn pl-5 text-ink">
                    {thankYou.next.map((step) => (
                        <li key={step}>{step}</li>
                    ))}
                </ol>
                <div className="mt-8 border-t border-line pt-6">
                    <p className="text-ink-soft">{thankYou.brochureLead}</p>
                    <a href="/Spanyolret-gardens.pdf" download className="btn btn-primary mt-3">
                        {thankYou.brochureButton}
                    </a>
                </div>
                {digits && (
                    <div className="mt-8">
                        <p className="text-ink-soft">{thankYou.faster}</p>
                        <div className="mt-3 flex flex-wrap gap-3">
                            <a href={`https://wa.me/${digits}?text=${text}`} className="btn btn-ghost">WhatsApp</a>
                            <a href={`sms:+${digits}?&body=${text}`} className="btn btn-ghost">SMS</a>
                        </div>
                    </div>
                )}
                <a href={thankYou.backHref} className="btn-quiet mt-8 self-start">{thankYou.back}</a>
            </div>
            <div className="h-16 border-t border-line bg-lawn" aria-hidden="true" />
        </main>
    );
}
