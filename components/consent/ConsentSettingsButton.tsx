'use client';

import { openConsentSettings } from '@/lib/consent';

/* Lets a visitor change their cookie choice at any time, from every page. */
export default function ConsentSettingsButton({ label, className }: { label: string; className?: string }) {
    return (
        <button type="button" onClick={openConsentSettings} className={className ?? 'btn-quiet'}>
            {label}
        </button>
    );
}
