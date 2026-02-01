'use client';

import React from 'react';
import InteractiveSelectorHu from '@/components/ui/InteractiveSelectorHu';

const GalleryHu = () => {
    return (
        <section id="gallery" className="relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 noise-overlay opacity-[0.02]" />
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-[breathe_12s_ease-in-out_infinite]" />
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tl from-accent/15 to-transparent rounded-full blur-3xl animate-[breathe_10s_ease-in-out_infinite_2s]" />
            </div>

            <InteractiveSelectorHu />
        </section>
    );
};

export default GalleryHu;
