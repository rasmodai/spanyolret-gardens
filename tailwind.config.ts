import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Architecture Palette
                facade: '#F5F5F0',
                anthracite: '#383E42',
                oak: {
                    light: '#B8956B',
                    DEFAULT: '#8B7355',
                },
                roofEdge: '#4A4D4F',
                terrace: '#A69F95',
                // Landscaping
                grass: '#4A7C23',
                path: '#6B6B6B',
                hedge: '#2D5016',
                // Sky
                skyBlue: '#87CEEB',
                golden: '#FFD700',
                dusk: '#1B3B6F',
                // Brand
                primary: '#1B3B6F',
                secondary: '#4A7C23',
                accent: '#B8956B',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-gradient': 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6))',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.6s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
