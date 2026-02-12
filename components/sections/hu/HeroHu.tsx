'use client';

import { uiTextsHu } from '@/lib/data-hu';

export default function HeroHu() {
    const t = uiTextsHu.hero;

    const scrollToForm = () => {
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToFloorPlans = () => {
        document.getElementById('floor-plans')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover scale-[1.03] origin-center"
                    poster="/assets/renders/Garden at Midday.webp"
                >
                    <source src="/assets/renders/Hero Spanyloret.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay z-10 pointer-events-none"></div>
            </div>

            {/* Ambient Gradient Orbs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse opacity-40" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[120px] animate-pulse opacity-50" style={{ animationDelay: '2s' }} />
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-primary/20" />

            {/* Vignette */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)'
                }}
            />

            {/* Content */}
            <div className="relative z-10 section-container text-center text-white">
                <div className="max-w-5xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/20 shadow-lg animate-fade-in">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                        </span>
                        <span className="text-sm font-medium tracking-wide">{t.badge}</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-6 leading-[1.1] animate-slide-up">
                        <span className="block">{t.headline}</span>
                        <span className="block mt-2">
                            <span className="bg-gradient-to-r from-secondary via-green-400 to-secondary bg-clip-text text-transparent">
                                {t.headlineHighlight}
                            </span>
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl lg:text-2xl text-white/80 mb-6 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        {t.subheadline}
                    </p>

                    {/* Starting Price */}
                    <div className="mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <span className="inline-block bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-secondary/30 shadow-lg">
                            <span className="text-white/60 text-sm uppercase tracking-wider">{t.priceLabel}</span>
                            <span className="block text-3xl md:text-4xl font-bold bg-gradient-to-r from-secondary via-green-400 to-secondary bg-clip-text text-transparent">
                                {t.priceValue}
                            </span>
                        </span>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <button
                            onClick={scrollToForm}
                            className="group relative px-8 py-4 bg-gradient-to-r from-secondary to-green-500 text-white font-semibold rounded-xl overflow-hidden shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <span className="relative z-10">{t.ctaPrimary}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                        <button
                            onClick={scrollToFloorPlans}
                            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            {t.ctaSecondary}
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                        {t.stats.map((badge, index) => (
                            <div
                                key={index}
                                className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10 hover:bg-white/15 transition-all duration-300"
                            >
                                <div className="text-2xl md:text-3xl font-bold">{badge.value}</div>
                                <div className="text-xs text-white/60 uppercase tracking-wider">{badge.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                <div className="flex flex-col items-center gap-2 text-white/50">
                    <span className="text-xs uppercase tracking-widest">Görgess</span>
                    <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
                        <div className="w-1.5 h-2.5 bg-white/50 rounded-full animate-bounce" />
                    </div>
                </div>
            </div>
        </section>
    );
}
