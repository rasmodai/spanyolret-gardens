// Simple classname merger (like tailwind-merge but lighter)
export function cn(...inputs: (string | undefined | null | false)[]): string {
    return inputs.filter(Boolean).join(' ');
}

/* Formatting (prices, areas, dates) is in lib/format.ts: one convention per
 * language, never mixed. Per-house prices are never formatted anywhere
 * (DESIGN.md → Pricing Display Rule). */

export function scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        element.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    }
}
