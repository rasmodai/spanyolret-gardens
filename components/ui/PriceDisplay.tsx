'use client';

interface PriceDisplayProps {
    amount: number;
    currency?: 'HUF' | 'EUR';
    currencySymbol?: string;
    suffix?: string;
    showFrom?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
    className?: string;
    animate?: boolean;
    align?: 'left' | 'center' | 'right';
}

export default function PriceDisplay({
    amount,
    currency = 'HUF',
    suffix,
    showFrom = true,
    size = 'lg',
    className = '',
    animate = false,
    align = 'left'
}: PriceDisplayProps) {
    // Format number with proper separators
    const formatNumber = (num: number): string => {
        if (num >= 1000000) {
            const millions = num / 1000000;
            return millions.toString();
        }
        return num.toLocaleString('hu-HU');
    };

    const sizeClasses = {
        sm: {
            container: '',
            from: 'text-xs',
            currency: 'text-base',
            amount: 'text-xl font-bold',
            suffix: 'text-base'
        },
        md: {
            container: '',
            from: 'text-sm',
            currency: 'text-lg',
            amount: 'text-2xl font-bold',
            suffix: 'text-lg'
        },
        lg: {
            container: '',
            from: 'text-sm',
            currency: 'text-xl',
            amount: 'text-4xl font-bold',
            suffix: 'text-xl'
        },
        xl: {
            container: '',
            from: 'text-base',
            currency: 'text-2xl',
            amount: 'text-5xl font-bold',
            suffix: 'text-2xl'
        },
        hero: {
            container: '',
            from: 'text-xl md:text-2xl mb-2',
            currency: 'text-3xl md:text-4xl',
            amount: 'text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight',
            suffix: 'text-3xl md:text-4xl'
        }
    };

    const styles = sizeClasses[size];
    const currencySymbols = {
        HUF: 'Ft',
        EUR: '€'
    };

    const alignmentClasses = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end'
    };

    const defaultSuffix = currency === 'HUF' ? 'Million Ft' : '€';
    const displaySuffix = suffix !== undefined ? suffix : defaultSuffix;

    return (
        <div className={`flex flex-col ${align === 'center' ? 'items-center' : 'items-baseline'} ${className}`}>
            <div className={`inline-flex items-baseline gap-2 font-display ${alignmentClasses[align]}`}>
                {showFrom && (
                    <span className={`${styles.from} text-white/80 font-medium tracking-wide uppercase mr-2`}>
                        From
                    </span>
                )}
                <span className={`${styles.amount} bg-gradient-to-r from-accent via-yellow-400 to-accent bg-clip-text text-transparent tabular-nums ${animate ? 'animate-shimmer' : ''}`}>
                    {formatNumber(amount)}
                </span>
                <span className={`${styles.suffix} text-white/90 font-medium`}>
                    {displaySuffix}
                </span>
            </div>
        </div>
    );
}

// Compact version for cards
export function PriceTag({
    price,
    currency = 'HUF',
    label,
    className = '',
    status = 'available',
    showCurrency = true
}: {
    price: number;
    currency?: 'HUF' | 'EUR';
    label?: string;
    className?: string;
    status?: string;
    showCurrency?: boolean;
}) {
    if (status === 'sold') {
        return (
            <div className={`flex flex-col ${className}`}>
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">
                    Price
                </span>
                <span className="text-lg font-bold text-gray-400 line-through">
                    Sold
                </span>
            </div>
        );
    }

    const formatPrice = (p: number) => {
        if (p >= 1000000) {
            return (p / 1000000).toString();
        }
        return p.toLocaleString();
    };

    return (
        <div className={`flex flex-col ${className}`}>
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">
                {label || 'Price'}
            </span>
            <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent tabular-nums">
                    {formatPrice(price)}
                </span>
                {showCurrency && (
                    <span className="text-sm font-semibold text-gray-600">
                        Million Ft
                    </span>
                )}
            </div>
        </div>
    );
}
