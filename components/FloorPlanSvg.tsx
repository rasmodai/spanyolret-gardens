import type { FloorPlan, RoomKind } from '@/lib/floorplans';
import { formatArea } from '@/lib/format';

const PAD = 30;
const BAR = 90;

/* One level of one townhouse, from the permit drawing. Units are centimetres,
 * so the 2 m bar is exact. Colours are tokens: the plan follows the theme. */
export default function FloorPlanSvg({
    plan,
    locale,
    title,
    roomNames,
    className = 'mx-auto block h-auto max-h-[70vh] w-full',
}: {
    plan: FloorPlan;
    locale: 'en' | 'hu';
    title: string;
    roomNames: Record<RoomKind, string>;
    className?: string;
}) {
    const thin = { fill: 'none', vectorEffect: 'non-scaling-stroke' as const, strokeLinecap: 'round' as const };
    return (
        <svg
            viewBox={`${-PAD} ${-PAD} ${plan.width + PAD * 2} ${plan.height + PAD * 2 + BAR}`}
            role="img"
            aria-label={title}
            className={className}
        >
            {plan.terrace && <path d={plan.terrace} fill="rgb(var(--lawn-rgb) / 0.14)" />}
            <path d={plan.kitchen} {...thin} stroke="var(--line-strong)" strokeWidth={1} />
            <path d={plan.sanitary} {...thin} stroke="var(--line-strong)" strokeWidth={1} />
            <path d={plan.stairs} {...thin} stroke="var(--ink-soft)" strokeWidth={0.9} />
            <path d={plan.railing} {...thin} stroke="var(--ink-soft)" strokeWidth={1} />
            <path d={plan.openings} {...thin} stroke="var(--ink-soft)" strokeWidth={1.1} />
            <path d={plan.walls} fill="var(--ink)" fillRule="evenodd" />
            <g textAnchor="middle" style={{ paintOrder: 'stroke', fontVariantNumeric: 'tabular-nums' }} stroke="var(--paper)" strokeWidth={7} strokeLinejoin="round">
                {plan.labels.map((label, i) => (
                    <text key={i} x={label.x} y={label.y + 6}>
                        <tspan fill="var(--ink)" fontSize={24} fontWeight={600}>{roomNames[label.kind]}</tspan>
                        <tspan x={label.x} dy={27} fill="var(--ink-soft)" fontSize={20} className="font-mono">
                            {formatArea(label.m2, locale)}
                        </tspan>
                    </text>
                ))}
            </g>
            <g transform={`translate(0 ${plan.height + 50})`} fill="var(--ink-soft)" fontSize={18} className="font-mono">
                <path d="M0 0H200M0 -7V7M100 -5V5M200 -7V7" stroke="var(--ink-soft)" strokeWidth={1.2} vectorEffect="non-scaling-stroke" fill="none" />
                <rect x={0} y={-3} width={100} height={6} />
                <text x={0} y={30}>0</text>
                <text x={100} y={30} textAnchor="middle">1</text>
                <text x={200} y={30} textAnchor="middle">2 m</text>
            </g>
        </svg>
    );
}
