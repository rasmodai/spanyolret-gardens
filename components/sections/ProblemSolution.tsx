'use client';

import { problems, solutions } from '@/lib/data';

/* Was: two four-column grids of icons in coloured circles — red circles for
 * the problems, green for the solutions — joined by "There's a better way."
 * between two decorative rules. Icon-in-circle grids are banned, the default
 * red/green palette is not in this system, and that transition line is the
 * exact register PRD §7.0 rules out.
 *
 * The content is inherently a comparison, so it is set as one: the week you
 * have now against the same week here, paired row by row. No transition
 * sentence needed — the layout is the argument.
 */
export default function ProblemSolution() {
    const pairs = problems.map((problem, i) => ({ problem, solution: solutions[i] }));

    return (
        <section id="problem-solution" className="section-padding border-t border-line bg-paper">
            <div className="section-container">
                <div className="eyebrow">Why people move</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
                    <h2 className="display-l text-ink">
                        Nobody plans to raise two children in seventy square metres.
                    </h2>
                    <p className="lede self-end">
                        You moved here for the work and it went well. Then the second child arrived, the
                        home office became the corner of the bedroom, and you started parking three
                        streets away.
                    </p>
                </div>

                <div className="mt-14">
                    <div className="hidden grid-cols-2 gap-x-16 border-b border-line pb-3 md:grid">
                        <p className="caption">Your week now</p>
                        <p className="caption !text-lawn">The same week here</p>
                    </div>

                    <dl>
                        {pairs.map(({ problem, solution }) => (
                            <div
                                key={problem.title}
                                className="grid gap-x-16 gap-y-6 border-b border-line py-7 md:grid-cols-2"
                            >
                                <div>
                                    <dt className="font-display text-lg leading-snug text-ink-soft">
                                        {problem.title}
                                    </dt>
                                    <dd className="mt-2 max-w-[42ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                                        {problem.description}
                                    </dd>
                                </div>

                                {solution && (
                                    <div className="border-l border-line pl-6 md:border-l-0 md:pl-0">
                                        <dt className="font-display text-lg leading-snug text-ink">
                                            {solution.title}
                                        </dt>
                                        <dd className="mt-2 max-w-[42ch] text-[0.9375rem] leading-relaxed text-ink-soft">
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
