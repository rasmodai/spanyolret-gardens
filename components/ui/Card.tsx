import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    elevated?: boolean;
    hover?: boolean;
    padding?: 'sm' | 'md' | 'lg';
}

export default function Card({
    children,
    className = '',
    elevated = false,
    hover = true,
    padding = 'md'
}: CardProps) {
    const baseStyles = 'bg-white rounded-2xl transition-all duration-300';

    const shadowStyles = elevated
        ? 'shadow-xl border border-gray-100'
        : 'shadow-lg';

    const hoverStyles = hover ? 'hover:shadow-xl hover:-translate-y-1' : '';

    const paddingStyles = {
        sm: 'p-4',
        md: 'p-6 md:p-8',
        lg: 'p-8 md:p-10'
    };

    return (
        <div className={`${baseStyles} ${shadowStyles} ${hoverStyles} ${paddingStyles[padding]} ${className}`}>
            {children}
        </div>
    );
}

// Variant for feature cards with icon
interface FeatureCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    highlight?: string;
}

export function FeatureCard({ icon, title, description, highlight }: FeatureCardProps) {
    return (
        <Card className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-anthracite mb-2">{title}</h3>
            <p className="text-gray-600 mb-3">{description}</p>
            {highlight && (
                <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-sm font-medium rounded-full">
                    {highlight}
                </span>
            )}
        </Card>
    );
}

// Variant for stat cards
interface StatCardProps {
    value: string;
    label: string;
    icon?: ReactNode;
}

export function StatCard({ value, label, icon }: StatCardProps) {
    return (
        <div className="text-center p-6">
            {icon && (
                <div className="w-12 h-12 mx-auto mb-3 text-primary">
                    {icon}
                </div>
            )}
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{value}</div>
            <div className="text-gray-600 text-sm">{label}</div>
        </div>
    );
}

// Variant for unit/pricing cards
interface UnitCardProps {
    unitId: string;
    internal: string;
    garden: string;
    price: string;
    priceEur: string;
    status: 'available' | 'reserved' | 'sold';
    highlight?: string;
    features: string[];
    onClick?: () => void;
}

export function UnitCard({
    unitId,
    internal,
    garden,
    price,
    priceEur,
    status,
    highlight,
    features,
    onClick
}: UnitCardProps) {
    const statusColors = {
        available: 'bg-green-100 text-green-800',
        reserved: 'bg-yellow-100 text-yellow-800',
        sold: 'bg-red-100 text-red-800'
    };

    return (
        <Card className="relative" hover={status === 'available'}>
            {highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-secondary text-white text-sm font-medium rounded-full">
                    {highlight}
                </div>
            )}

            <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-anthracite">Unit {unitId}</h3>
                <span className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
            </div>

            <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-500">Internal:</span>
                    <span className="font-medium">{internal}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Garden:</span>
                    <span className="font-medium">{garden}</span>
                </div>
            </div>

            <div className="border-t pt-4 mb-4">
                <div className="text-2xl font-bold text-primary">{price}</div>
                <div className="text-sm text-gray-500">{priceEur}</div>
            </div>

            <ul className="space-y-1 mb-4 text-sm text-gray-600">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                    </li>
                ))}
            </ul>

            {status === 'available' && onClick && (
                <button
                    onClick={onClick}
                    className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                    Inquire About This Unit
                </button>
            )}
        </Card>
    );
}
