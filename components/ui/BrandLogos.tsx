// Authentic Brand Logo SVGs
// Based on official brand identities

interface LogoProps {
    className?: string;
    height?: number;
}

// Wienerberger - Premium brick manufacturer
export function WienerbergerLogo({ className = '', height = 36 }: LogoProps) {
    return (
        <svg className={className} height={height} viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
            {/* Three red bricks icon */}
            <rect x="0" y="10" width="14" height="30" rx="1" fill="#E30613" />
            <rect x="17" y="10" width="14" height="30" rx="1" fill="#E30613" />
            <rect x="34" y="10" width="14" height="30" rx="1" fill="#E30613" />
            {/* Wordmark */}
            <text x="55" y="34" fontFamily="Arial, Helvetica, sans-serif" fontSize="22" fontWeight="700" fill="#1a1a1a" letterSpacing="-0.5">
                Wienerberger
            </text>
        </svg>
    );
}

// LEGRAND - Electrical systems (official blue color #003DA5)
export function LegrandLogo({ className = '', height = 36 }: LogoProps) {
    return (
        <svg className={className} height={height} viewBox="0 0 140 50" xmlns="http://www.w3.org/2000/svg">
            {/* Red square mark */}
            <rect x="0" y="10" width="30" height="30" fill="#E4002B" />
            {/* Wordmark */}
            <text x="38" y="34" fontFamily="Arial, Helvetica, sans-serif" fontSize="24" fontWeight="700" fill="#1a1a1a" letterSpacing="1">
                Legrand
            </text>
        </svg>
    );
}

// VEKA - Window systems (official blue #004B87)
export function VekaLogo({ className = '', height = 36 }: LogoProps) {
    return (
        <svg className={className} height={height} viewBox="0 0 120 50" xmlns="http://www.w3.org/2000/svg">
            {/* V shape */}
            <path d="M0 12 L18 40 L36 12 L28 12 L18 30 L8 12 Z" fill="#004B87" />
            {/* VEKA text */}
            <text x="42" y="34" fontFamily="Arial, Helvetica, sans-serif" fontSize="26" fontWeight="700" fill="#004B87" letterSpacing="2">
                EKA
            </text>
        </svg>
    );
}

// SIEMENS - Smart home technology (official teal #009999)
export function SiemensLogo({ className = '', height = 36 }: LogoProps) {
    return (
        <svg className={className} height={height} viewBox="0 0 160 50" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="35" fontFamily="Arial, Helvetica, sans-serif" fontSize="28" fontWeight="700" fill="#009999" letterSpacing="2">
                SIEMENS
            </text>
        </svg>
    );
}

// Bosch - Heat pumps (official red #E20015)
export function BoschLogo({ className = '', height = 36 }: LogoProps) {
    return (
        <svg className={className} height={height} viewBox="0 0 130 50" xmlns="http://www.w3.org/2000/svg">
            {/* Bosch spark plug icon simplified */}
            <circle cx="15" cy="25" r="13" fill="none" stroke="#E20015" strokeWidth="3" />
            <circle cx="15" cy="25" r="6" fill="#E20015" />
            {/* Wordmark */}
            <text x="35" y="34" fontFamily="Arial, Helvetica, sans-serif" fontSize="26" fontWeight="700" fill="#1a1a1a" letterSpacing="1">
                BOSCH
            </text>
        </svg>
    );
}

// Roto - Window hardware (official red #C41E3A)
export function RotoLogo({ className = '', height = 36 }: LogoProps) {
    return (
        <svg className={className} height={height} viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
            {/* Roto circle */}
            <circle cx="18" cy="25" r="15" fill="none" stroke="#C41E3A" strokeWidth="4" />
            <text x="40" y="34" fontFamily="Arial, Helvetica, sans-serif" fontSize="24" fontWeight="700" fill="#C41E3A">
                Roto
            </text>
        </svg>
    );
}

export const brandLogosData = [
    { id: 'wienerberger', name: 'Wienerberger', Component: WienerbergerLogo },
    { id: 'legrand', name: 'Legrand', Component: LegrandLogo },
    { id: 'veka', name: 'VEKA', Component: VekaLogo },
    { id: 'siemens', name: 'SIEMENS', Component: SiemensLogo },
    { id: 'bosch', name: 'BOSCH', Component: BoschLogo },
];
