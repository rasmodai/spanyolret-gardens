'use client';

import React from 'react';
import InteractiveSelector from '@/components/ui/InteractiveSelector';

const Gallery = () => {
    return (
        <section id="gallery" className="relative overflow-hidden">
            {/* Premium ambient background effects */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Noise texture overlay */}
                <div className="absolute inset-0 noise-overlay opacity-[0.02]" />

                {/* Floating gradient orbs */}
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-[breathe_12s_ease-in-out_infinite]" />
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tl from-accent/15 to-transparent rounded-full blur-3xl animate-[breathe_10s_ease-in-out_infinite_2s]" />
                <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-br from-secondary/8 to-transparent rounded-full blur-3xl animate-[breathe_8s_ease-in-out_infinite_1s]" />
            </div>

            <InteractiveSelector />
        </section>
    );
};

export default Gallery;
