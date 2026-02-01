import { type ClassValue, clsx } from 'clsx';

// Simple classname merger (like tailwind-merge but lighter)
export function cn(...inputs: (string | undefined | null | false)[]): string {
    return inputs.filter(Boolean).join(' ');
}

// Format price in HUF
export function formatPriceHUF(price: number): string {
    return new Intl.NumberFormat('hu-HU').format(price) + ' HUF';
}

// Format price in EUR
export function formatPriceEUR(price: number): string {
    return '~€' + new Intl.NumberFormat('en-US').format(price);
}

// Format price shorthand (e.g., 195M HUF)
export function formatPriceShort(price: number): string {
    return (price / 1000000).toFixed(0) + 'M HUF';
}

// Format area in m²
export function formatArea(area: number): string {
    return area.toFixed(2).replace('.00', '') + ' m²';
}

// Format area range
export function formatAreaRange(min: number, max: number): string {
    return `${min.toFixed(0)}-${max.toFixed(0)}m²`;
}

// Scroll to element
export function scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Get garden size label
export function getGardenSizeLabel(size: 'small' | 'medium' | 'large' | 'xlarge'): string {
    const labels = {
        small: 'Compact garden',
        medium: 'Medium garden',
        large: 'Large garden',
        xlarge: 'XL garden'
    };
    return labels[size];
}

// Get status styles
export function getStatusStyles(status: 'available' | 'reserved' | 'sold'): string {
    const styles = {
        available: 'bg-green-100 text-green-800',
        reserved: 'bg-yellow-100 text-yellow-800',
        sold: 'bg-red-100 text-red-800'
    };
    return styles[status];
}

// Get status label
export function getStatusLabel(status: 'available' | 'reserved' | 'sold'): string {
    const labels = {
        available: 'Available',
        reserved: 'Reserved',
        sold: 'Sold'
    };
    return labels[status];
}
