'use client';

import type { ReactNode } from 'react';
import { scrollToElement } from '@/lib/utils';

/* A button that scrolls to a section of the page. It stays a <button> (and not
 * an anchor) so that the click tracking keeps seeing a CTA. */
export default function ScrollButton({
    target,
    className,
    children,
}: {
    target: string;
    className?: string;
    children: ReactNode;
}) {
    return (
        <button type="button" onClick={() => scrollToElement(target)} className={className}>
            {children}
        </button>
    );
}
