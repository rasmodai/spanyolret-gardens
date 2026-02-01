// Premium Icon components with gradient fills and refined styling
// These replace the basic stroke icons for a more luxurious feel

interface PremiumIconProps {
    className?: string;
    size?: number;
}

// Gradient definitions to be used across icons
export function IconGradients() {
    return (
        <svg width="0" height="0" className="absolute">
            <defs>
                <linearGradient id="premium-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#B8956B" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#B8956B" />
                </linearGradient>
                <linearGradient id="premium-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1B3B6F" />
                    <stop offset="100%" stopColor="#2E5A9C" />
                </linearGradient>
                <linearGradient id="premium-green" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2D5016" />
                    <stop offset="100%" stopColor="#4A7C23" />
                </linearGradient>
                <linearGradient id="premium-teal" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0D6B6E" />
                    <stop offset="100%" stopColor="#14A3A8" />
                </linearGradient>
            </defs>
        </svg>
    );
}

// Premium Heat Pump Icon
export function PremiumHeatIcon({ className = '', size = 48 }: PremiumIconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" fill="url(#premium-gold)" opacity="0.15" />
            <circle cx="24" cy="24" r="12" fill="none" stroke="url(#premium-gold)" strokeWidth="2" />
            <path d="M24 16v-4M24 36v-4M16 24h-4M36 24h-4" stroke="url(#premium-gold)" strokeWidth="2" strokeLinecap="round" />
            <path d="M18.34 18.34l-2.83-2.83M32.49 32.49l-2.83-2.83M18.34 29.66l-2.83 2.83M32.49 15.51l-2.83 2.83" stroke="url(#premium-gold)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="24" cy="24" r="4" fill="url(#premium-gold)" />
        </svg>
    );
}

// Premium Sound Insulation Icon
export function PremiumSoundproofIcon({ className = '', size = 48 }: PremiumIconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" fill="url(#premium-blue)" opacity="0.15" />
            <path d="M16 18v12l8-6v12l-8-6" fill="url(#premium-blue)" />
            <path d="M28 20c2 2 2 6 0 8" stroke="url(#premium-blue)" strokeWidth="2" strokeLinecap="round" />
            <path d="M32 17c3 3.5 3 10.5 0 14" stroke="url(#premium-blue)" strokeWidth="2" strokeLinecap="round" />
            <line x1="36" y1="14" x2="42" y2="20" stroke="#E53935" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="36" y1="20" x2="42" y2="14" stroke="#E53935" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    );
}

// Premium Solar Icon
export function PremiumSolarIcon({ className = '', size = 48 }: PremiumIconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" fill="url(#premium-green)" opacity="0.15" />
            <rect x="10" y="16" width="28" height="20" rx="2" fill="none" stroke="url(#premium-green)" strokeWidth="2" />
            <line x1="10" y1="26" x2="38" y2="26" stroke="url(#premium-green)" strokeWidth="2" />
            <line x1="18" y1="16" x2="18" y2="36" stroke="url(#premium-green)" strokeWidth="2" />
            <line x1="28" y1="16" x2="28" y2="36" stroke="url(#premium-green)" strokeWidth="2" />
            <path d="M24 8l2 5h-4l2-5z" fill="url(#premium-gold)" />
            <circle cx="24" cy="6" r="3" fill="url(#premium-gold)" />
        </svg>
    );
}

// Premium Smart Home Icon
export function PremiumSmartIcon({ className = '', size = 48 }: PremiumIconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" fill="url(#premium-teal)" opacity="0.15" />
            <rect x="12" y="10" width="24" height="18" rx="2" fill="none" stroke="url(#premium-teal)" strokeWidth="2" />
            <line x1="18" y1="34" x2="30" y2="34" stroke="url(#premium-teal)" strokeWidth="2" strokeLinecap="round" />
            <line x1="24" y1="28" x2="24" y2="34" stroke="url(#premium-teal)" strokeWidth="2" />
            <circle cx="24" cy="19" r="5" fill="none" stroke="url(#premium-teal)" strokeWidth="2" />
            <path d="M24 16v3l2 1" stroke="url(#premium-teal)" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

// Premium Security Icon
export function PremiumSecureIcon({ className = '', size = 48 }: PremiumIconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" fill="url(#premium-blue)" opacity="0.15" />
            <path d="M24 6l14 6v10c0 10-6 16-14 20-8-4-14-10-14-20V12l14-6z" fill="none" stroke="url(#premium-blue)" strokeWidth="2" />
            <path d="M24 6l14 6v10c0 10-6 16-14 20" fill="url(#premium-blue)" opacity="0.3" />
            <polyline points="18 24 22 28 30 20" fill="none" stroke="url(#premium-green)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// Premium Customize Icon
export function PremiumCustomizeIcon({ className = '', size = 48 }: PremiumIconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" fill="url(#premium-gold)" opacity="0.15" />
            <circle cx="24" cy="24" r="6" fill="none" stroke="url(#premium-gold)" strokeWidth="2" />
            <path d="M24 14v-4M24 38v-4M14 24h-4M38 24h-4" stroke="url(#premium-gold)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="24" cy="10" r="2" fill="url(#premium-gold)" />
            <circle cx="24" cy="38" r="2" fill="url(#premium-gold)" />
            <circle cx="10" cy="24" r="2" fill="url(#premium-gold)" />
            <circle cx="38" cy="24" r="2" fill="url(#premium-gold)" />
        </svg>
    );
}

// Premium Quality Icon
export function PremiumQualityIcon({ className = '', size = 48 }: PremiumIconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" fill="url(#premium-gold)" opacity="0.15" />
            <circle cx="24" cy="18" r="10" fill="none" stroke="url(#premium-gold)" strokeWidth="2" />
            <path d="M18 27l-4 14 10-5 10 5-4-14" fill="url(#premium-gold)" opacity="0.4" stroke="url(#premium-gold)" strokeWidth="2" />
            <text x="24" y="22" textAnchor="middle" fill="url(#premium-gold)" fontSize="10" fontWeight="bold">★</text>
        </svg>
    );
}

// Premium Garden Icon
export function PremiumGardenIcon({ className = '', size = 48 }: PremiumIconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" fill="url(#premium-green)" opacity="0.15" />
            <path d="M24 40v-16" stroke="#8B7355" strokeWidth="3" strokeLinecap="round" />
            <path d="M24 24c-6 0-10-6-10-12 6 0 10 4 10 12z" fill="url(#premium-green)" />
            <path d="M24 24c6 0 10-6 10-12-6 0-10 4-10 12z" fill="url(#premium-green)" opacity="0.7" />
            <path d="M24 20c-4 0-7-4-7-8 4 0 7 3 7 8z" fill="url(#premium-green)" opacity="0.5" />
            <circle cx="12" cy="38" r="3" fill="url(#premium-green)" opacity="0.4" />
            <circle cx="36" cy="38" r="3" fill="url(#premium-green)" opacity="0.4" />
            <circle cx="24" cy="42" r="2" fill="url(#premium-green)" opacity="0.3" />
        </svg>
    );
}

// Premium Home Icon
export function PremiumHomeIcon({ className = '', size = 48 }: PremiumIconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" fill="url(#premium-blue)" opacity="0.15" />
            <path d="M8 22l16-14 16 14" fill="none" stroke="url(#premium-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 20v18h24V20" fill="url(#premium-blue)" opacity="0.2" stroke="url(#premium-blue)" strokeWidth="2" />
            <rect x="20" y="28" width="8" height="10" fill="url(#premium-gold)" rx="1" />
        </svg>
    );
}

// Premium Expand Icon
export function PremiumExpandIcon({ className = '', size = 48 }: PremiumIconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" fill="url(#premium-blue)" opacity="0.15" />
            <path d="M30 10h8v8M10 30v8h8M38 10L28 20M10 38l10-10" stroke="url(#premium-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="18" y="18" width="12" height="12" rx="2" fill="none" stroke="url(#premium-gold)" strokeWidth="2" strokeDasharray="3 2" />
        </svg>
    );
}

// Premium Tree Icon
export function PremiumTreeIcon({ className = '', size = 48 }: PremiumIconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" fill="url(#premium-green)" opacity="0.15" />
            <path d="M24 42v-14" stroke="#8B7355" strokeWidth="4" strokeLinecap="round" />
            <path d="M24 8l-12 18h8l-6 10h20l-6-10h8L24 8z" fill="url(#premium-green)" />
        </svg>
    );
}
