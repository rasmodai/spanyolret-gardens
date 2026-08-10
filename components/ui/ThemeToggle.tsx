'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

/* DESIGN.md defined a full dark palette with measured contrast ratios that
 * nothing in the code used — spec that reads as implemented and is not. This
 * makes it real.
 *
 * The system preference is the default (handled in globals.css by the media
 * query). This only writes `data-theme` when the visitor overrides it, and the
 * attribute selector is specific enough to win in both directions.
 */

const STORAGE_KEY = 'spanyolret-theme';

export default function ThemeToggle({ locale = 'en' }: { locale?: 'en' | 'hu' }) {
    const [theme, setTheme] = useState<Theme | null>(null);

    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
        const system: Theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setTheme(stored ?? system);
    }, []);

    const toggle = () => {
        const next: Theme = theme === 'dark' ? 'light' : 'dark';
        setTheme(next);
        document.documentElement.setAttribute('data-theme', next);
        window.localStorage.setItem(STORAGE_KEY, next);
    };

    // Render nothing until the effect has resolved, so the button label never
    // disagrees with what the visitor is actually looking at.
    if (theme === null) return null;

    const label =
        theme === 'dark'
            ? locale === 'hu'
                ? 'Világos'
                : 'Light'
            : locale === 'hu'
              ? 'Sötét'
              : 'Dark';

    return (
        <button
            type="button"
            onClick={toggle}
            aria-pressed={theme === 'dark'}
            className="tab-link border-transparent hover:!text-ink"
        >
            {label}
        </button>
    );
}
