import type { SpecIconKey } from '@/lib/copy/types';

/* Six plain line icons for the six specification blocks: square caps, no fill,
 * the colour of the surrounding text (`currentColor`). Decorative. */
const PATHS: Record<SpecIconKey, React.ReactNode> = {
    walls: (
        <>
            <rect x="3" y="5" width="18" height="14" />
            <path d="M3 9.7h18M3 14.3h18M9 5v4.7M15 9.7v4.6M9 14.3V19" />
        </>
    ),
    climate: (
        <path d="M8 3c-1.6 2.2 1.6 3.4 0 5.6s1.6 3.4 0 5.6M13 3c-1.6 2.2 1.6 3.4 0 5.6s1.6 3.4 0 5.6M18 3c-1.6 2.2 1.6 3.4 0 5.6s1.6 3.4 0 5.6M4 19.5h16" />
    ),
    glazing: (
        <>
            <rect x="4" y="3" width="16" height="18" />
            <path d="M12 3v18M4 12h16" />
        </>
    ),
    electrical: <path d="M13 3L5 13.5h6L10 21l8-10.5h-6z" />,
    finishes: (
        <>
            <rect x="4" y="4" width="7" height="7" />
            <rect x="13" y="4" width="7" height="7" />
            <rect x="4" y="13" width="7" height="7" />
            <rect x="13" y="13" width="7" height="7" />
        </>
    ),
    garden: <path d="M12 21v-9M12 12c0-4-3-6-7-6 0 4 3 6 7 6zM12 15c0-3 2.5-5 6-5 0 3-2.5 5-6 5z" />,
};

export default function SpecIcon({ name, className }: { name: SpecIconKey; className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
            aria-hidden="true"
            className={className}
        >
            {PATHS[name]}
        </svg>
    );
}
