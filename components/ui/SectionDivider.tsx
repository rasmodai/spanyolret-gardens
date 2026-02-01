'use client';

interface SectionDividerProps {
    variant?: 'gradient' | 'line' | 'accent' | 'wave';
    className?: string;
}

export default function SectionDivider({ variant = 'gradient', className = '' }: SectionDividerProps) {
    if (variant === 'gradient') {
        return (
            <div className={`relative py-4 overflow-hidden ${className}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>
                {/* Center accent dot */}
                <div className="relative flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-oak-light shadow-lg shadow-accent/20" />
                </div>
            </div>
        );
    }

    if (variant === 'line') {
        return (
            <div className={`py-8 ${className}`}>
                <div className="section-container">
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                </div>
            </div>
        );
    }

    if (variant === 'accent') {
        return (
            <div className={`relative py-12 overflow-hidden ${className}`}>
                {/* Decorative accent line */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary rounded-full opacity-60" />
                </div>
                {/* Side lines */}
                <div className="absolute inset-0 flex items-center">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gray-200 mr-20" />
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gray-200 ml-20" />
                </div>
            </div>
        );
    }

    if (variant === 'wave') {
        return (
            <div className={`relative ${className}`}>
                <svg
                    viewBox="0 0 1440 60"
                    className="w-full h-12 fill-current text-gray-50"
                    preserveAspectRatio="none"
                >
                    <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1350,45 1440,30 L1440,60 L0,60 Z" />
                </svg>
            </div>
        );
    }

    return null;
}
