import HouseExplorer from '@/components/sections/HouseExplorer';
import type { Copy } from '@/lib/copy/types';
import { fill, type Locale } from '@/lib/format';
import type { HouseRow } from '@/lib/houses-view';
import { projectConfig } from '@/lib/project-config';

/* The signature section. DESIGN.md → Signature Patterns → The garden ribbon.
 *
 * The houses were previously six rounded-3xl cards in a grid, each with its own
 * shadow, a diagonal SOLD banner and a ribbon inside it. That last part was a
 * design failure: a bar drawn to scale is only worth anything if you can lay it
 * against the others, and putting each in its own card made exactly that
 * impossible.
 *
 * Now they are rows on a shared left edge, sorted smallest garden to largest,
 * so the six bars read as one rising column. That is the whole argument of the
 * development in a single glance: same house six times, and the garden is the
 * decision.
 */
export default function FloorPlans({ copy, locale, houses }: { copy: Copy; locale: Locale; houses: HouseRow[] }) {
    const { houses: text } = copy;
    const { plans } = text;

    return (
        <section id="floor-plans" className="section-padding border-t border-line bg-paper">
            <div className="section-container">
                <div className="eyebrow">{text.eyebrow}</div>

                <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16" data-reveal>
                    <h2 className="display-l text-ink">{text.title}</h2>
                    <p className="lede self-end">{text.lede}</p>
                </div>

                <div className="mt-14">
                    <HouseExplorer
                        houses={houses}
                        locale={locale}
                        columnHouse={text.columnHouse}
                        columnGarden={text.columnGarden}
                        priceOnRequest={text.priceOnRequest}
                        note={text.note}
                        labels={{
                            ...text.sheet,
                            plans: {
                                house: plans.house,
                                groundFloor: plans.groundFloor,
                                firstFloor: plans.firstFloor,
                                planCaption: plans.planCaption,
                                roomNames: plans.roomNames,
                            },
                        }}
                        sitePlan={plans.sitePlan}
                        sitePlanAlt={plans.sitePlanAlt}
                        siteHint={plans.siteHint}
                        soldChip={plans.soldChip}
                        siteCaption={fill(plans.siteCaption, { architect: projectConfig.architect })}
                        messaging={projectConfig.whatsappNumber !== null}
                        phone={projectConfig.callNumber}
                    />
                </div>
            </div>
        </section>
    );
}
