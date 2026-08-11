'use client';

import { uiTextsHu } from '@/lib/data-hu';
import { scrollToElement } from '@/lib/utils';
import HeroMedia from '@/components/ui/HeroMedia';

/* Mirror of components/sections/Hero.tsx. DESIGN.md → Duplicated component
 * trees: every change lands in both, or the two locales drift apart.
 *
 * lang="hu" is set on the wrapper in app/hu/layout.tsx, which is what lets the
 * browser hyphenate compounds like "Kulcsrakész" and makes screen readers use
 * Hungarian phonetics.
 */
export default function HeroHu() {
    const t = uiTextsHu.hero;

    return (
        <section
            id="hero"
            className="relative flex min-h-[38rem] items-end overflow-hidden bg-frame md:min-h-[44rem]"
        >
            <HeroMedia
                poster="/assets/renders/hero-poster.webp"
                src="/assets/renders/hero.mp4"
            />

            {/* One scrim. Not four. */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'linear-gradient(to top, rgba(22,25,27,.92) 0%, rgba(22,25,27,.86) 30%, rgba(22,25,27,.58) 55%, rgba(22,25,27,.18) 78%, rgba(22,25,27,0) 100%)',
                }}
            />

            <div className="absolute inset-x-0 top-0 border-b border-onmedia/20">
                <div className="section-container flex items-center justify-between py-4 text-onmedia">
                    <span className="whitespace-nowrap font-display text-base tracking-tight">Spanyolrét Gardens</span>
                    <span className="caption hidden !text-onmedia/70 sm:inline">{t.location}</span>
                </div>
            </div>

            <div className="section-container relative pb-10 pt-32 text-onmedia md:pb-14">
                <div className="max-w-[48rem]">
                    <h1 className="display-xl wrap-compound animate-rise">
                        {t.headline}
                        <br />
                        {t.headlineSecond}
                    </h1>

                    <p className="wrap-compound mt-5 max-w-[46ch] text-[1.0625rem] text-onmedia/80 md:text-lg">
                        {t.subheadline}
                    </p>

                    <dl className="mt-7 grid grid-cols-2 border-t border-onmedia/25 sm:grid-cols-4">
                        {t.stats.map((s) => (
                            <div key={s.label} className="border-r border-onmedia/15 py-3.5 pr-5 last:border-r-0">
                                <dd className="measure whitespace-nowrap text-lg md:text-xl">{s.value}</dd>
                                <dt className="caption mt-1 !text-onmedia/60">{s.label}</dt>
                            </div>
                        ))}
                    </dl>

                    <div className="mt-7">
                        <p className="measure text-2xl md:text-3xl">{t.priceValue}</p>
                        <p className="caption wrap-compound mt-1.5 !text-onmedia/70">{t.priceQualifier}</p>
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3.5">
                        <button
                            type="button"
                            onClick={() => scrollToElement('lead-form')}
                            className="btn btn-primary"
                        >
                            {t.ctaPrimary}
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollToElement('floor-plans')}
                            className="btn btn-ghost-inv"
                        >
                            {t.ctaSecondary}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
