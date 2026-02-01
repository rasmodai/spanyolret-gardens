'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { units } from '@/lib/data';
import { formatArea, getStatusStyles, getStatusLabel } from '@/lib/utils';
import Button from '@/components/ui/Button';

type Building = 'all' | 'A' | 'B';
type FloorPlanView = 'site' | 'A' | 'B';
type Floor = 'ground' | 'first';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut' as const
        }
    }
};

export default function FloorPlans() {
    const [activeBuilding, setActiveBuilding] = useState<Building>('all');
    const [floorPlanView, setFloorPlanView] = useState<FloorPlanView>('site');
    const [activeFloor, setActiveFloor] = useState<Floor>('ground');

    const filteredUnits = activeBuilding === 'all'
        ? units
        : units.filter(unit => unit.building === activeBuilding);

    const scrollToForm = () => {
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    const getFloorPlanImage = () => {
        if (floorPlanView === 'site') {
            return '/assets/floorplans/site-plan.jpg';
        }
        if (floorPlanView === 'A') {
            return activeFloor === 'ground'
                ? '/assets/floorplans/a-ground-floor.webp'
                : '/assets/floorplans/a-first-floor.webp';
        }
        return activeFloor === 'ground'
            ? '/assets/floorplans/b-ground-floor.webp'
            : '/assets/floorplans/b-first-floor.webp';
    };

    const getFloorPlanTitle = () => {
        if (floorPlanView === 'site') return 'Complete Site Layout';
        const floorLabel = activeFloor === 'ground' ? 'Ground Floor' : 'First Floor';
        return `Building ${floorPlanView} - ${floorLabel}`;
    };

    return (
        <section id="floor-plans" className="section-padding bg-white relative overflow-hidden">
            {/* Premium ambient background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Noise texture overlay */}
                <div className="absolute inset-0 noise-overlay opacity-[0.01]" />

                {/* Floating gradient orbs */}
                <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl animate-[breathe_10s_ease-in-out_infinite]" />
                <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl animate-[breathe_12s_ease-in-out_infinite_2s]" />
            </div>

            <div className="section-container relative z-10">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <span className="section-badge mb-4">
                        FLOOR PLANS
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-anthracite mb-4">
                        Choose Your Perfect Unit
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        6 unique homes, one exceptional standard. Compare layouts and find your ideal match.
                    </p>
                </div>

                {/* Interactive Floor Plan Viewer */}
                <div className="mb-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 md:p-8">
                    {/* Floor Plan View Selector */}
                    <div className="flex flex-wrap justify-center gap-3 mb-6">
                        {(['site', 'A', 'B'] as FloorPlanView[]).map((view) => (
                            <button
                                key={view}
                                onClick={() => setFloorPlanView(view)}
                                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${floorPlanView === view
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {view === 'site' ? '📍 Site Plan' : `🏠 Building ${view}`}
                            </button>
                        ))}
                    </div>

                    {/* Floor Selector (for Building views) */}
                    {floorPlanView !== 'site' && (
                        <div className="flex justify-center gap-2 mb-6">
                            {(['ground', 'first'] as Floor[]).map((floor) => (
                                <button
                                    key={floor}
                                    onClick={() => setActiveFloor(floor)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeFloor === floor
                                        ? 'bg-secondary text-white'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    {floor === 'ground' ? 'Ground Floor' : '1st Floor'}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Floor Plan Title */}
                    <h3 className="text-xl font-bold text-anthracite text-center mb-4">
                        {getFloorPlanTitle()}
                    </h3>

                    {/* Floor Plan Image - Mobile optimized */}
                    <div className="relative w-full bg-white rounded-2xl overflow-hidden shadow-lg">
                        <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full">
                            <Image
                                src={getFloorPlanImage()}
                                alt={getFloorPlanTitle()}
                                fill
                                className="object-contain p-2 sm:p-4"
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                                priority
                            />
                        </div>
                        {/* Pinch to zoom hint on mobile */}
                        <div className="sm:hidden text-center py-2 text-xs text-gray-400">
                            Pinch to zoom
                        </div>
                    </div>

                    {/* Floor Plan Legend */}
                    <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-600">
                        {floorPlanView === 'site' ? (
                            <>
                                <span className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-blue-500 rounded"></span>
                                    Building A (Units A1-A3)
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-green-500 rounded"></span>
                                    Building B (Units B1-B3)
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-gray-400 rounded"></span>
                                    Parking Area
                                </span>
                            </>
                        ) : (
                            <>
                                <span>Click on a unit card below to see detailed specifications</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Building Selector */}
                <div className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
                    {(['all', 'A', 'B'] as Building[]).map((building) => (
                        <button
                            key={building}
                            onClick={() => setActiveBuilding(building)}
                            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${activeBuilding === building
                                ? 'bg-primary text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {building === 'all' ? 'All Units' : `Building ${building}`}
                        </button>
                    ))}
                </div>

                {/* Units Grid - Mobile optimized */}
                <motion.div
                    key={activeBuilding} // Re-animate when filter changes
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10"
                >
                    {filteredUnits.map((unit) => (
                        <motion.div
                            key={unit.id}
                            variants={itemVariants}
                            className={`bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1 flex flex-col relative ${unit.status === 'sold' ? 'opacity-75' : ''
                                }`}
                        >
                            {/* Diagonal SOLD Banner for sold units */}
                            {unit.status === 'sold' && (
                                <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-3xl">
                                    <div className="absolute top-[30px] -right-[60px] w-[200px] transform rotate-45 bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white text-center py-2 font-bold text-sm tracking-wider shadow-lg">
                                        SOLD
                                    </div>
                                </div>
                            )}

                            {/* Highlight Badge - Fixed height container for alignment */}
                            <div className="h-10 flex items-center justify-center">
                                {unit.highlight ? (
                                    <div className={`w-full text-white text-center py-2 text-sm font-medium ${unit.status === 'sold'
                                        ? 'bg-gradient-to-r from-gray-400 to-gray-500'
                                        : 'bg-gradient-to-r from-secondary to-green-500'
                                        }`}>
                                        {unit.highlight}
                                    </div>
                                ) : (
                                    <div className="w-full h-full"></div>
                                )}
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                {/* Unit Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className={`text-2xl font-bold ${unit.status === 'sold' ? 'text-gray-400' : 'text-anthracite'}`}>
                                            Unit {unit.id}
                                        </h3>
                                        <span className="text-sm text-gray-500">Building {unit.building}</span>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(unit.status)}`}>
                                        {getStatusLabel(unit.status)}
                                    </span>
                                </div>

                                {/* Unit Details */}
                                <div className="space-y-3 mb-6 flex-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Internal Area</span>
                                        <span className={`font-semibold ${unit.status === 'sold' ? 'text-gray-400' : 'text-anthracite'}`}>
                                            {formatArea(unit.totalInternal)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Garden</span>
                                        <span className={`font-semibold ${unit.status === 'sold' ? 'text-gray-400' : 'text-secondary'}`}>
                                            {formatArea(unit.gardenArea)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Terrace</span>
                                        <span className="font-medium">{formatArea(unit.terraceArea)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Rooms</span>
                                        <span className="font-medium">{unit.rooms} rooms</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Bathrooms</span>
                                        <span className="font-medium">{unit.bathrooms}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Parking</span>
                                        <span className="font-medium">{unit.parkingSpaces} space</span>
                                    </div>
                                </div>

                                {/* CTA */}
                                {unit.status === 'available' ? (
                                    <Button
                                        variant="primary"
                                        className="w-full"
                                        onClick={scrollToForm}
                                    >
                                        Request Details
                                    </Button>
                                ) : (
                                    <div className="w-full py-3 text-center text-gray-400 font-medium bg-gray-100 rounded-xl line-through">
                                        No Longer Available
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Comparison Table - Mobile optimized */}
                <div className="bg-gradient-to-br from-facade to-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg">
                    <h3 className="text-xl font-bold text-anthracite mb-4 sm:mb-6">Quick Comparison</h3>

                    {/* Mobile: Card view */}
                    <div className="sm:hidden space-y-3">
                        {units.map((unit) => (
                            <div key={unit.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-anthracite">Unit {unit.id}</span>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyles(unit.status)}`}>
                                        {getStatusLabel(unit.status)}
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-sm">
                                    <div>
                                        <span className="text-gray-500 block text-xs">Internal</span>
                                        <span className="font-medium">{formatArea(unit.totalInternal)}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 block text-xs">Garden</span>
                                        <span className="font-medium text-secondary">{formatArea(unit.gardenArea)}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 block text-xs">Rooms</span>
                                        <span className="font-medium">{unit.rooms}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop: Table view */}
                    <div className="hidden sm:block overflow-x-auto">
                        <table className="w-full min-w-[400px]">
                            <thead>
                                <tr className="border-b border-gray-300">
                                    <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-600">Unit</th>
                                    <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-600">Internal</th>
                                    <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-600">Garden</th>
                                    <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-600">Rooms</th>
                                    <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-600">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {units.map((unit) => (
                                    <tr key={unit.id} className="border-b border-gray-200 hover:bg-white/50 transition-colors">
                                        <td className="py-3 px-3 md:px-4 font-medium">{unit.id}</td>
                                        <td className="py-3 px-3 md:px-4">{formatArea(unit.totalInternal)}</td>
                                        <td className="py-3 px-3 md:px-4 text-secondary font-medium">{formatArea(unit.gardenArea)}</td>
                                        <td className="py-3 px-3 md:px-4">{unit.rooms}</td>
                                        <td className="py-3 px-3 md:px-4">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyles(unit.status)}`}>
                                                {getStatusLabel(unit.status)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 mt-4">
                        All units include 6.60 m² terrace and 1 parking space. Contact us for details.
                    </p>
                </div>
            </div>
        </section>
    );
}

