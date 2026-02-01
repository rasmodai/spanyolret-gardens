'use client';

import React, { useState, useEffect } from 'react';
import { FaHome, FaUsers, FaWineGlass, FaUtensils, FaTree } from 'react-icons/fa';

interface GalleryOption {
    title: string;
    description: string;
    image: string;
    icon: React.ReactNode;
}

const InteractiveSelector = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);

    const options: GalleryOption[] = [
        {
            title: "Garden Living",
            description: "Expansive private gardens for outdoor enjoyment",
            image: "/assets/renders/Garden at Midday.webp",
            icon: <FaTree size={24} className="text-white" />
        },
        {
            title: "Family Moments",
            description: "Safe spaces for children to play and explore",
            image: "/assets/renders/Children running.webp",
            icon: <FaUsers size={24} className="text-white" />
        },
        {
            title: "Al Fresco Dining",
            description: "Perfect terraces for outdoor BBQ gatherings",
            image: "/assets/renders/Family BBQ.webp",
            icon: <FaUtensils size={24} className="text-white" />
        },
        {
            title: "Evening Romance",
            description: "Sunset views with your favorite wine",
            image: "/assets/renders/Couple drinking Wine.webp",
            icon: <FaWineGlass size={24} className="text-white" />
        },
        {
            title: "Lifestyle at Dusk",
            description: "Magical evenings in your private sanctuary",
            image: "/assets/renders/Dinner at Dusk.webp",
            icon: <FaHome size={24} className="text-white" />
        }
    ];

    const handleOptionClick = (index: number) => {
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    };

    useEffect(() => {
        const timers: NodeJS.Timeout[] = [];

        options.forEach((_, i) => {
            const timer = setTimeout(() => {
                setAnimatedOptions(prev => [...prev, i]);
            }, 180 * i);
            timers.push(timer);
        });

        return () => {
            timers.forEach(timer => clearTimeout(timer));
        };
    }, []);

    return (
        <div className="relative flex flex-col items-center justify-center py-12 sm:py-20 bg-gradient-to-b from-[#0a0f1a] via-[#111827] to-[#0a0f1a] font-sans text-white">
            {/* Header Section */}
            <div className="w-full max-w-2xl px-4 sm:px-6 mb-6 sm:mb-8 text-center">
                <span className="inline-block px-3 sm:px-4 py-1.5 mb-3 sm:mb-4 text-xs font-semibold tracking-widest text-accent uppercase bg-accent/10 rounded-full border border-accent/30">
                    Your Future Lifestyle
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-3 sm:mb-4 tracking-tight">
                    Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-oak-light to-accent">Spanyolrét Gardens</span>
                </h2>
                <p className="text-base sm:text-lg text-gray-400 font-medium max-w-xl mx-auto">
                    Discover the lifestyle that awaits in Budapest&apos;s most exclusive new development
                </p>
            </div>

            {/* Mobile: Swipeable Cards */}
            <div className="sm:hidden w-full overflow-x-auto px-4 pb-4 snap-x snap-mandatory scrollbar-hide">
                <div className="flex gap-3" style={{ width: `${options.length * 280 + (options.length - 1) * 12}px` }}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="snap-center flex-shrink-0 w-[280px] h-[380px] rounded-xl overflow-hidden relative"
                            style={{
                                backgroundImage: `url('${option.image}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-accent/90 to-accent/60 border border-accent/40">
                                        {option.icon}
                                    </div>
                                    <h3 className="font-display font-bold text-lg text-white">{option.title}</h3>
                                </div>
                                <p className="text-sm text-gray-300">{option.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile scroll hint */}
            <div className="sm:hidden text-center text-xs text-gray-500 mt-2">
                Swipe to explore
            </div>

            {/* Desktop: Options Container */}
            <div className="hidden sm:flex w-full max-w-[900px] min-w-[320px] h-[450px] mx-4 items-stretch overflow-hidden relative rounded-xl">
                {options.map((option, index) => (
                    <div
                        key={index}
                        className={`
              relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out cursor-pointer
              ${activeIndex === index ? 'z-10' : 'z-1'}
            `}
                        style={{
                            backgroundImage: `url('${option.image}')`,
                            backgroundSize: activeIndex === index ? 'cover' : 'cover',
                            backgroundPosition: 'center',
                            backfaceVisibility: 'hidden',
                            opacity: animatedOptions.includes(index) ? 1 : 0,
                            transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
                            minWidth: '60px',
                            minHeight: '100px',
                            margin: 0,
                            borderRadius: '12px',
                            borderWidth: '2px',
                            borderStyle: 'solid',
                            borderColor: activeIndex === index ? 'rgba(184, 149, 107, 0.8)' : 'rgba(41, 41, 41, 0.5)',
                            backgroundColor: '#18181b',
                            boxShadow: activeIndex === index
                                ? '0 20px 60px rgba(184, 149, 107, 0.25)'
                                : '0 10px 30px rgba(0,0,0,0.30)',
                            flex: activeIndex === index ? '7 1 0%' : '1 1 0%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            position: 'relative',
                            overflow: 'hidden',
                            willChange: 'flex-grow, box-shadow, background-size, background-position',
                            marginLeft: index === 0 ? '0' : '4px',
                            marginRight: index === options.length - 1 ? '0' : '4px',
                        }}
                        onClick={() => handleOptionClick(index)}
                    >
                        {/* Shadow overlay for text readability */}
                        <div
                            className="absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
                            style={{
                                bottom: activeIndex === index ? '0' : '-40px',
                                height: '180px',
                                background: activeIndex === index
                                    ? 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)'
                                    : 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)'
                            }}
                        ></div>

                        {/* Label with icon and info */}
                        <div className="absolute left-0 right-0 bottom-5 flex items-center justify-start h-14 z-2 pointer-events-none px-4 gap-3 w-full">
                            <div
                                className="min-w-[48px] max-w-[48px] h-[48px] flex items-center justify-center rounded-full backdrop-blur-[10px] flex-shrink-0 flex-grow-0 transition-all duration-300"
                                style={{
                                    background: activeIndex === index
                                        ? 'linear-gradient(135deg, rgba(184, 149, 107, 0.9), rgba(139, 115, 85, 0.9))'
                                        : 'rgba(32, 32, 32, 0.85)',
                                    border: activeIndex === index
                                        ? '2px solid rgba(184, 149, 107, 0.6)'
                                        : '2px solid #444',
                                    boxShadow: activeIndex === index
                                        ? '0 4px 12px rgba(184, 149, 107, 0.3)'
                                        : '0 1px 4px rgba(0,0,0,0.18)'
                                }}
                            >
                                {option.icon}
                            </div>
                            <div className="text-white whitespace-pre relative overflow-hidden">
                                <div
                                    className="font-display font-bold text-xl transition-all duration-700 ease-in-out"
                                    style={{
                                        opacity: activeIndex === index ? 1 : 0,
                                        transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                                    }}
                                >
                                    {option.title}
                                </div>
                                <div
                                    className="text-base text-gray-300 transition-all duration-700 ease-in-out"
                                    style={{
                                        opacity: activeIndex === index ? 1 : 0,
                                        transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                                    }}
                                >
                                    {option.description}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation dots - Desktop only */}
            <div className="hidden sm:flex gap-2 mt-8">
                {options.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionClick(index)}
                        className={`
              w-2.5 h-2.5 rounded-full transition-all duration-300
              ${activeIndex === index
                                ? 'bg-accent w-8'
                                : 'bg-gray-600 hover:bg-gray-500'
                            }
            `}
                        aria-label={`View slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default InteractiveSelector;
