'use client';

import { problemsHu, solutionsHu } from '@/lib/data-hu';

/* Mirror of components/sections/ProblemSolution.tsx. */
export default function ProblemSolutionHu() {
    const pairs = problemsHu.map((problem, i) => ({ problem, solution: solutionsHu[i] }));

    return (
        <section id="problem-solution" className="section-padding border-t border-line bg-paper">
            <div className="section-container">
                <div className="eyebrow">Miért költöznek</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l wrap-compound text-ink">
                        Senki nem tervezi, hogy hetven négyzetméteren nevel két gyereket.
                    </h2>
                    <p className="lede wrap-compound self-end">
                        A munka miatt költöztetek ide, és jól alakult. Aztán megszületett a második gyerek,
                        a home office a hálószoba sarka lett, és három utcával arrébb kezdtetek parkolni.
                    </p>
                </div>

                <div className="mt-14">
                    <div className="hidden grid-cols-2 gap-x-16 border-b border-line pb-3 md:grid">
                        <p className="caption">A mostani heted</p>
                        <p className="caption !text-lawn">Ugyanaz a hét itt</p>
                    </div>

                    <dl>
                        {pairs.map(({ problem, solution }) => (
                            <div
                                key={problem.title}
                                className="grid gap-x-16 gap-y-6 border-b border-line py-7 md:grid-cols-2"
                            >
                                <div>
                                    <dt className="wrap-compound font-display text-lg leading-snug text-ink-soft">
                                        {problem.title}
                                    </dt>
                                    <dd className="wrap-compound mt-2 max-w-[42ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                                        {problem.description}
                                    </dd>
                                </div>

                                {solution && (
                                    <div className="border-l border-line pl-6 md:border-l-0 md:pl-0">
                                        <dt className="wrap-compound font-display text-lg leading-snug text-ink">
                                            {solution.title}
                                        </dt>
                                        <dd className="wrap-compound mt-2 max-w-[42ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                                            {solution.description}
                                        </dd>
                                    </div>
                                )}
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}
