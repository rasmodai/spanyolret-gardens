'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface FloatingBadgeProps {
    availableUnits?: number;
    totalUnits?: number;
}

export default function FloatingBadge({ availableUnits = 4, totalUnits = 6 }: FloatingBadgeProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isPulsing, setIsPulsing] = useState(true);

    useEffect(() => {
        // Show badge after a short delay
        const timer = setTimeout(() => setIsVisible(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    const scrollToFloorPlans = () => {
        document.getElementById('floor-plans')?.scrollIntoView({ behavior: 'smooth' });
        setIsPulsing(false);
    };

    if (!isVisible) return null;

    return (
        <motion.button
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onClick={scrollToFloorPlans}
            className="fixed bottom-6 right-6 z-40 group"
        >
            <div className="relative">
                {/* Pulse ring animation */}
                {isPulsing && (
                    <div className="absolute inset-0 rounded-2xl bg-secondary/40 animate-ping" />
                )}

                {/* Main badge */}
                <div
                    className="relative flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border border-white/10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-secondary/30"
                    style={{
                        background: 'linear-gradient(135deg, rgba(27, 59, 111, 0.95), rgba(10, 22, 40, 0.98))',
                        backdropFilter: 'blur(20px)',
                    }}
                >
                    {/* Icon */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-green-500 shadow-lg shadow-secondary/30">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </div>

                    {/* Text content */}
                    <div className="text-left">
                        <div className="text-xs text-white/60 font-medium uppercase tracking-wider">
                            Limited Availability
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold text-white">{availableUnits}</span>
                            <span className="text-sm text-white/70">of {totalUnits} units remaining</span>
                        </div>
                    </div>

                    {/* Arrow indicator */}
                    <div className="ml-2 text-white/40 group-hover:text-white/70 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </motion.button>
    );
}
