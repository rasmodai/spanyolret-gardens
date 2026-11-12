import SpecIcon from '@/components/ui/SpecIcon';
import type { Copy } from '@/lib/copy/types';
import { fill } from '@/lib/format';

/* This is the section that answers "how do we know the quality will be good?",
 * so it is the one that most needs to look like a document rather than a
 * brochure. DESIGN.md → The thesis.
 *
 * Was: a tabbed interface, five rounded-[2rem] cards with shadow-xl, an icon
 * in a rounded square per category, and a subtitle that read "Premium
 * specifications for lasting quality" — a sentence that says nothing next to
 * the actual numbers it was sitting above.
 *
 * Then: everything visible at once on the anthracite band, set as a
 * specification sheet. No tabs, because hiding four fifths of your evidence
 * behind a tab is the opposite of what this section is for.
 *
 * Now: six blocks (an icon, the figure that matters, three lines) read in ten
 * seconds, and the full list of thirty lines right under them, in a native
 * <details>: folded by default, never hidden behind JavaScript.
 */
export default function Specs({ copy }: { copy: Copy }) {
    const { specs } = copy;
    const lines = specs.categories.reduce((total, category) => total + category.items.length, 0);

    return (
        <section id="specs" className="section-padding band-frame">
            <div className="section-container">
                <div className="caption mb-6 flex items-center gap-4 !text-[color:var(--on-frame-soft)]">
                    {specs.eyebrow}
                    <span className="h-px flex-1 bg-onmedia/20" />
                </div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l text-onmedia">{specs.title}</h2>
                    <p className="max-w-[52ch] self-end text-[1.0625rem] leading-relaxed text-[color:var(--on-frame-soft)]">
                        {specs.lede}
                    </p>
                </div>

                <div className="mt-12 grid border-t border-onmedia/25 md:grid-cols-2 lg:grid-cols-3">
                    {specs.highlights.map((block, i) => (
                        <article
                            key={block.key}
                            className="border-b border-onmedia/15 py-7 pr-6 md:pr-8"
                            data-reveal={i % 2 ? '2' : '1'}
                        >
                            <SpecIcon name={block.key} className="text-[color:var(--lawn-inv)]" />
                            <p className="measure mt-4 text-[clamp(1.75rem,3.4vw,2.25rem)] leading-[1.1] tracking-tight text-onmedia">
                                {block.figure}
                            </p>
                            <p className="caption mt-1.5 !text-[color:var(--on-frame-soft)]">{block.label}</p>
                            <ul className="mt-4 text-[0.9375rem] leading-relaxed text-[color:var(--on-frame-soft)]">
                                {block.items.map((item) => (
                                    <li key={item} className="py-1">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>

                <details className="group mt-10 border-t border-onmedia/25">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-medium text-onmedia [&::-webkit-details-marker]:hidden">
                        {fill(specs.fullToggle, { count: lines })}
                        <span aria-hidden="true" className="measure text-xl text-[color:var(--on-frame-soft)]">
                            <span className="group-open:hidden">+</span>
                            <span className="hidden group-open:inline">−</span>
                        </span>
                    </summary>
                    <div className="grid gap-x-14 gap-y-10 pb-6 pt-4 md:grid-cols-2">
                        {specs.categories.map((category, i) => (
                            <section key={category.id} aria-labelledby={`spec-${category.id}`}>
                                <div className="flex items-baseline gap-3 border-b border-onmedia/25 pb-3">
                                    <span className="measure text-sm text-[color:var(--on-frame-soft)]">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <h3
                                        id={`spec-${category.id}`}
                                        className="font-display text-xl text-onmedia"
                                    >
                                        {category.title}
                                    </h3>
                                </div>

                                <dl className="mt-1">
                                    {category.items.map((item) => {
                                        const [term, ...rest] = item.split(':');
                                        const value = rest.join(':').trim();
                                        return (
                                            <div
                                                key={item}
                                                className="grid gap-x-4 border-b border-onmedia/10 py-3 sm:grid-cols-[minmax(0,11rem)_1fr]"
                                            >
                                                <dt className="caption !text-[color:var(--on-frame-soft)]">
                                                    {value ? term : specs.included}
                                                </dt>
                                                <dd className="measure text-[0.9375rem] text-onmedia">
                                                    {value || term}
                                                </dd>
                                            </div>
                                        );
                                    })}
                                </dl>
                            </section>
                        ))}
                    </div>
                </details>

                <p className="mt-10 max-w-[60ch] text-sm text-[color:var(--on-frame-soft)]">{specs.note}</p>
            </div>
        </section>
    );
}
