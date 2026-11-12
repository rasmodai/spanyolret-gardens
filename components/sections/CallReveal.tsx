'use client';

import { useState } from 'react';
import { track } from '@/lib/mixpanel';

/* A button that shows the number on click, then becomes a tel: link. Rendered
 * only when a call number exists (lib/project-config.ts → callNumber): with
 * `null` it renders nothing at all, so no call button can appear by accident. */
export default function CallReveal({
    phone,
    label,
    revealedLabel,
    house,
    className,
}: {
    phone: string | null;
    label: string;
    revealedLabel: string;
    house: string;
    className: string;
}) {
    const [shown, setShown] = useState(false);
    if (!phone) return null;
    if (shown) {
        return (
            <a href={`tel:${phone.replace(/\s/g, '')}`} className={className}>
                {phone} · {revealedLabel}
            </a>
        );
    }
    return (
        <button
            type="button"
            className={className}
            onClick={() => {
                setShown(true);
                track('House Enquiry Clicked', { house, channel: 'phone' });
            }}
        >
            {label}
        </button>
    );
}
