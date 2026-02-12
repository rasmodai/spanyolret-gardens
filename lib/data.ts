// ============================================
// UNIT DATA - From PRD Section 2.2
// ============================================

export interface Unit {
    id: string;
    building: 'A' | 'B';
    position: 1 | 2 | 3;
    totalInternal: number;
    groundFloor: number;
    firstFloor: number;
    terraceArea: number;
    gardenArea: number;
    gardenSize: 'small' | 'medium' | 'large' | 'xlarge';
    price: number;
    priceEur: number;
    status: 'available' | 'reserved' | 'sold';
    rooms: number;
    bathrooms: number;
    parkingSpaces: number;
    highlight?: string;
}

export const units: Unit[] = [
    {
        id: 'A1',
        building: 'A',
        position: 1,
        totalInternal: 117.45,
        groundFloor: 58.17,
        firstFloor: 59.28,
        terraceArea: 6.60,
        gardenArea: 201.79,
        gardenSize: 'large',
        price: 195000000,
        priceEur: 480000,
        status: 'available',
        rooms: 5,
        bathrooms: 2,
        parkingSpaces: 1
    },
    {
        id: 'A2',
        building: 'A',
        position: 2,
        totalInternal: 120.27,
        groundFloor: 59.70,
        firstFloor: 60.57,
        terraceArea: 6.60,
        gardenArea: 147.19,
        gardenSize: 'medium',
        price: 205000000,
        priceEur: 505000,
        status: 'available',
        rooms: 5,
        bathrooms: 2,
        parkingSpaces: 1,
        highlight: 'Largest Interior'
    },
    {
        id: 'A3',
        building: 'A',
        position: 3,
        totalInternal: 117.94,
        groundFloor: 58.50,
        firstFloor: 59.44,
        terraceArea: 6.60,
        gardenArea: 260.01,
        gardenSize: 'xlarge',
        price: 215000000,
        priceEur: 530000,
        status: 'sold',
        rooms: 5,
        bathrooms: 2,
        parkingSpaces: 1
    },
    {
        id: 'B1',
        building: 'B',
        position: 1,
        totalInternal: 117.38,
        groundFloor: 58.11,
        firstFloor: 59.27,
        terraceArea: 6.60,
        gardenArea: 185.65,
        gardenSize: 'large',
        price: 205000000,
        priceEur: 505000,
        status: 'available',
        rooms: 5,
        bathrooms: 2,
        parkingSpaces: 1
    },
    {
        id: 'B2',
        building: 'B',
        position: 2,
        totalInternal: 117.42,
        groundFloor: 58.04,
        firstFloor: 59.38,
        terraceArea: 6.60,
        gardenArea: 102.12,
        gardenSize: 'small',
        price: 195000000,
        priceEur: 480000,
        status: 'sold',
        rooms: 5,
        bathrooms: 2,
        parkingSpaces: 1,
        highlight: 'Best Value'
    },
    {
        id: 'B3',
        building: 'B',
        position: 3,
        totalInternal: 117.33,
        groundFloor: 57.95,
        firstFloor: 59.38,
        terraceArea: 6.60,
        gardenArea: 316.84,
        gardenSize: 'xlarge',
        price: 225000000,
        priceEur: 555000,
        status: 'available',
        rooms: 5,
        bathrooms: 2,
        parkingSpaces: 1,
        highlight: 'Largest Garden'
    }
];

// ============================================
// TRUST BAR DATA
// ============================================

export const trustBarItems = [
    { icon: 'building', value: '50+', label: 'Completed Projects' },
    { icon: 'calendar', value: '13', label: 'Years Experience' },
    { icon: 'shield', value: '100%', label: 'On-Time Delivery' },
    { icon: 'award', value: 'Premium', label: 'Materials' }
];

export const brandLogos = ['Wienerberger', 'LEGRAND', 'VEKA', 'SIEMENS'];

// ============================================
// PROBLEM-SOLUTION CONTENT
// ============================================

export const problems = [
    {
        icon: 'compress',
        title: 'Outgrowing Your Space',
        description: 'Kids sharing rooms. Work calls from the bedroom. Toys everywhere.'
    },
    {
        icon: 'tree-slash',
        title: 'No Outdoor Space',
        description: "A balcony isn't enough. The kids need grass, fresh air, room to play."
    },
    {
        icon: 'car-xmark',
        title: 'Parking Nightmares',
        description: 'Circling blocks. Street parking. Carrying groceries three streets.'
    },
    {
        icon: 'money',
        title: 'Rent Going Nowhere',
        description: "€1,500/month to a landlord. €18,000/year not building any equity."
    }
];

export const solutions = [
    {
        icon: 'expand',
        title: '117m² of Living Space',
        description: '5 rooms across 2 floors. Home office. Storage. Room to breathe.'
    },
    {
        icon: 'tree',
        title: 'Up to 317m² Private Garden',
        description: 'Your own grass. Weekend barbecues. Kids playing safely outside.'
    },
    {
        icon: 'car',
        title: 'Dedicated Parking',
        description: 'Drive home. Press remote. Park. Every single day.'
    },
    {
        icon: 'piggy-bank',
        title: 'Build Real Wealth',
        description: "Own premium property in a growing market. Stop paying someone else's mortgage."
    }
];

// ============================================
// PROPERTY OVERVIEW
// ============================================

export const propertyStats = [
    { value: '6', label: 'Exclusive Townhouses', icon: 'home' },
    { value: '117m²', label: 'Internal Living Space', icon: 'expand' },
    { value: '102-317m²', label: 'Private Gardens', icon: 'tree' },
    { value: '220M HUF', label: 'Starting Price', icon: 'money' },
    { value: '5', label: 'Rooms per Unit', icon: 'door' },
    { value: 'Sept 2026', label: 'Turnkey Delivery', icon: 'calendar-check' }
];

// ============================================
// BENEFITS
// ============================================

export const benefits = [
    {
        icon: 'heat',
        title: 'Heat Pump System',
        description: 'No gas bills. Westen Auriga heat pump with underfloor heating and cooling. Energy class A.',
        highlight: 'Save €1,000+/year'
    },
    {
        icon: 'soundproof',
        title: '30cm Sound Insulation',
        description: "Silka sound-insulating brick between units. You won't hear your neighbors.",
        highlight: 'Peace & quiet'
    },
    {
        icon: 'solar',
        title: 'Solar Ready',
        description: 'Conduits pre-installed for rooftop solar panels. Future-proof your energy.',
        highlight: 'Ready for solar'
    },
    {
        icon: 'smart',
        title: 'Smart Thermostats',
        description: 'SIEMENS programmable thermostats on each floor. Set it and forget it.',
        highlight: 'Zone control'
    },
    {
        icon: 'secure',
        title: 'Security Built-In',
        description: 'MABISZ-certified entrance doors. Alarm preparation in every room. Remote-controlled gate.',
        highlight: 'Family safe'
    },
    {
        icon: 'customize',
        title: 'Customize Before Completion',
        description: 'Choose your tiles, flooring, paint colors. Make it yours before you move in.',
        highlight: 'Your choices'
    },
    {
        icon: 'quality',
        title: 'Premium Materials',
        description: 'Wienerberger brick. LEGRAND electrical. VEKA windows. Triple-glazed throughout.',
        highlight: 'Built to last'
    },
    {
        icon: 'garden',
        title: 'Private Gardens',
        description: 'From 102m² to 317m². Hand-sown grass. Irrigation-ready. Your outdoor living room.',
        highlight: 'Up to 317m²'
    }
];

// ============================================
// LOCATION
// ============================================

export const transportLinks = [
    { icon: 'metro', name: 'Kelenföld M4 Metro', time: '6-8 min by bus' },
    { icon: 'bus', name: 'Bus lines 40, 40B, 88, 88A', time: '10 min walk' },
    { icon: 'car', name: 'City center', time: '15-20 min drive' },
    { icon: 'plane', name: 'Budapest Airport', time: '35 min drive' }
];

export const nearbyAmenities = [
    {
        category: 'Schools',
        items: ['British International School (15 min)', 'American International School (20 min)', 'Local Hungarian schools (5-10 min)']
    },
    {
        category: 'Shopping',
        items: ['Etele Plaza (10 min)', 'IKEA Budaörs (15 min)', 'Local shops (5 min walk)']
    },
    {
        category: 'Healthcare',
        items: ['Szent Imre Hospital (10 min)', 'Private clinics nearby']
    },
    {
        category: 'Recreation',
        items: ['Normafa hiking (15 min)', 'Bikás Park (10 min)', 'Danube riverfront (20 min)']
    }
];

export const neighborhoodHighlights = [
    'Quiet residential streets',
    'Low traffic area',
    'Established family neighborhood',
    'Green surroundings',
    'No competing new developments'
];

// ============================================
// DEVELOPER
// ============================================

export const developerStats = [
    { value: '2012', label: 'Established' },
    { value: '50+', label: 'Projects Completed' },
    { value: '100%', label: 'On-Time Delivery' },
    { value: '13', label: 'Years Experience' }
];

export const qualityPromises = [
    'Premium European materials (Wienerberger, LEGRAND, VEKA)',
    'Full construction warranty',
    'Transparent pricing — no hidden costs',
    'Regular construction updates',
    'Dedicated English-speaking contact'
];

// ============================================
// TECHNICAL SPECIFICATIONS
// ============================================

export const specsCategories = [
    {
        id: 'structure',
        title: 'Building Structure',
        items: [
            'Foundation: Strip foundation + 15cm reinforced concrete slab',
            'External walls: 30cm Wienerberger Porotherm (30% heat savings)',
            'Party walls: 30cm Silka sound-insulating brick',
            'Thermal insulation: 12cm STO system',
            'Roof: Flat, green roof ready, 20-26cm EPS insulation'
        ]
    },
    {
        id: 'climate',
        title: 'Heating & Cooling',
        items: [
            'Heat pump: Westen Auriga with hot water storage',
            'Distribution: Underfloor heating throughout',
            'Cooling: Fan-coil units on each floor',
            'Control: SIEMENS/HONEYWELL smart thermostats per floor',
            'Optional: Ceiling heating-cooling upgrade'
        ]
    },
    {
        id: 'windows',
        title: 'Windows & Doors',
        items: [
            'Window profile: 6-chamber VEKA 82 / Aluplast Neo',
            'Glazing: Triple-glazed',
            'Hardware: Roto NX',
            'Entrance door: MABISZ certified, 4-8 point locking',
            'Shading: Roller shutter preparation included'
        ]
    },
    {
        id: 'electrical',
        title: 'Electrical & Smart Home',
        items: [
            'Fittings: LEGRAND Valena series',
            'Sockets: 4-10 per room (see detailed specs)',
            'TV/Internet: Connection in every room',
            'Alarm: Motion sensor preparation in each room',
            'Outdoor lighting: Twilight-controlled'
        ]
    },
    {
        id: 'finishes',
        title: 'Finishes & Materials',
        items: [
            'Living areas: Premium laminate flooring',
            'Wet rooms: Ceramic tiles (up to 8,000 Ft/m² allowance)',
            'Walls: 2 layers plaster + 2-3 layers paint (3 colors included)',
            'Terrace: Porcelain stoneware tiles (max 60×60cm)',
            'Facade: Rubbed textured plaster'
        ]
    },
    {
        id: 'outdoor',
        title: 'Outdoor & Landscaping',
        items: [
            'Gardens: 10-15cm topsoil, hand-sown grass',
            'Paths: KK-BETON London grey paving',
            'Fence: Galvanized (street), wire mesh (plots)',
            'Gate: Remote-controlled vehicle access',
            'Irrigation: Optional preparation'
        ]
    }
];

// ============================================
// PRICING
// ============================================

export const includedInPrice = [
    'Turnkey delivery (move-in ready)',
    '1 dedicated parking space',
    '6.6 m² terrace with porcelain tiles',
    'Full landscaping (grass, paths, fencing)',
    'All electrical and plumbing fixtures',
    'LEGRAND switches and sockets',
    'Underfloor heating system',
    'Fan-coil cooling units'
];

export const optionalExtras = [
    { item: 'Additional parking space', price: '4,000,000 HUF' },
    { item: 'Ceiling heating-cooling upgrade', price: 'Quote on request' },
    { item: 'Roller shutters (motorized)', price: 'Quote on request' },
    { item: 'Solar panel installation', price: 'Quote on request' },
    { item: 'Garden irrigation system', price: 'Quote on request' }
];

// ============================================
// PURCHASE PROCESS
// ============================================

export const processSteps = [
    {
        step: 1,
        title: 'Schedule a Consultation',
        description: 'Book a call to discuss your needs and answer your questions. Available in English.',
        duration: '30 minutes',
        icon: 'calendar'
    },
    {
        step: 2,
        title: 'Visit the Site',
        description: 'Tour the construction site, see the neighborhood, and visualize your future home.',
        duration: '1 hour',
        icon: 'map-marker'
    },
    {
        step: 3,
        title: 'Choose Your Unit',
        description: 'Select from available units. Discuss customization options for finishes.',
        duration: 'Your pace',
        icon: 'home'
    },
    {
        step: 4,
        title: 'Reserve with Deposit',
        description: 'Secure your unit with a reservation deposit. We provide a bilingual contract.',
        duration: '1-2 weeks',
        icon: 'file'
    },
    {
        step: 5,
        title: 'Finalize Purchase',
        description: 'Complete the purchase agreement with the notary. We guide you through every step.',
        duration: '2-4 weeks',
        icon: 'check-circle'
    },
    {
        step: 6,
        title: 'Move In (September 2026)',
        description: 'Receive your keys to a turnkey, move-in ready home.',
        duration: 'Delivery day',
        icon: 'key'
    }
];

export const processReassurance = [
    'English-speaking dedicated contact',
    'Bilingual contracts and documentation',
    'Recommended English-speaking lawyers and notaries',
    'Regular construction progress updates',
    'Transparent communication throughout'
];

// ============================================
// FAQ
// ============================================

export const faqs = [
    {
        category: 'Purchase Process',
        questions: [
            {
                q: 'Can foreigners buy property in Hungary?',
                a: 'Yes. EU citizens can buy freely. Non-EU citizens need a permit from the local government office, which we help you obtain. The process typically takes 2-4 weeks and has a very high approval rate.'
            },
            {
                q: 'What is the payment schedule?',
                a: 'Typically: 10% reservation deposit, followed by stage payments during construction, with the final payment at handover. Exact terms are discussed during consultation and can be tailored to your situation.'
            },
            {
                q: 'Can I get a mortgage in Hungary as an expat?',
                a: 'Yes, several Hungarian banks offer mortgages to foreign residents with proof of income. We can recommend English-speaking mortgage brokers who specialize in expat clients.'
            },
            {
                q: 'What happens if construction is delayed?',
                a: 'S-Patrik Bau has a 100% on-time delivery track record over 50+ projects. The contract includes provisions for any delays, protecting your interests.'
            }
        ]
    },
    {
        category: 'The Property',
        questions: [
            {
                q: 'Can I customize the finishes?',
                a: 'Yes! Before construction reaches the finishing stage, you can select your tile designs, flooring colors, paint colors (up to 3 included), and other finishing options from our approved selections.'
            },
            {
                q: 'What is included in the price?',
                a: 'All units are delivered turnkey: complete with flooring, bathroom fixtures, kitchen preparation, lighting fixtures, heating/cooling systems, and landscaped garden. You receive a move-in ready home.'
            },
            {
                q: 'Are there ongoing monthly costs?',
                a: "As a freehold townhouse owner, you'll have minimal common charges (shared driveway maintenance, bin collection area). No monthly management fees like apartments. Utility costs are your own."
            },
            {
                q: 'What warranty is provided?',
                a: 'Full structural warranty as required by Hungarian law, plus manufacturer warranties on all installed systems (heat pump, windows, etc.). S-Patrik Bau provides comprehensive after-sales support.'
            }
        ]
    },
    {
        category: 'Location & Lifestyle',
        questions: [
            {
                q: 'How far is it from the city center?',
                a: 'Approximately 20-25 minutes by car or public transport. Kelenföld M4 Metro station is 6-8 minutes by bus, then direct to the center. You get space and quiet while staying connected.'
            },
            {
                q: 'Are there international schools nearby?',
                a: 'Yes. British International School is ~15 minutes, American International School ~20 minutes. Several quality local Hungarian schools are within 5-10 minutes.'
            },
            {
                q: 'Is the area safe for families?',
                a: "Very safe. Spanyolrét is an established residential neighborhood with low crime rates. It's known for being quiet, family-friendly, and having good community spirit."
            },
            {
                q: 'What about parking and cars?',
                a: 'Each unit includes one dedicated parking space. Additional spaces available for 4M HUF. Remote-controlled gate for secure entry. No more street parking struggles.'
            }
        ]
    },
    {
        category: 'Technical',
        questions: [
            {
                q: 'How energy efficient are the homes?',
                a: 'Very efficient. Heat pump heating/cooling (no gas), 30cm insulated walls, triple-glazed windows, underfloor heating distribution. Expect significantly lower utility bills than older properties.'
            },
            {
                q: 'Can I install solar panels?',
                a: 'Yes, all units are solar-ready with protective piping already installed. Installation can be arranged during construction or after handover.'
            },
            {
                q: 'What about air conditioning?',
                a: 'Fan-coil cooling units are included on each floor. Optional ceiling heating-cooling upgrade eliminates the need for external AC units entirely.'
            },
            {
                q: 'Is the garden irrigated?',
                a: 'Irrigation preparation is available as an optional upgrade. The garden is delivered with topsoil and hand-sown grass.'
            }
        ]
    }
];

// ============================================
// GALLERY IMAGES (Placeholders)
// ============================================

export const galleryImages = [
    { id: 'hero-ext', alt: 'Spanyolrét Gardens exterior view', category: 'exterior', featured: true },
    { id: 'garden-life', alt: 'Family enjoying private garden', category: 'lifestyle', featured: true },
    { id: 'aerial', alt: 'Aerial view of development', category: 'exterior', featured: false },
    { id: 'living', alt: 'Open plan living room', category: 'interior', featured: true },
    { id: 'kitchen', alt: 'Modern kitchen', category: 'interior', featured: false },
    { id: 'bedroom', alt: 'Master bedroom', category: 'interior', featured: false },
    { id: 'terrace', alt: 'Private terrace', category: 'garden', featured: false },
    { id: 'evening', alt: 'Evening atmosphere', category: 'exterior', featured: true }
];

// ============================================
// FOOTER
// ============================================

export const footerContent = {
    contact: {
        phone: '+36 XX XXX XXXX',
        email: 'info@spanyolretgardens.hu',
        address: '1110 Budapest, Spanyolréti út'
    },
    developer: {
        name: 'S-Patrik Bau Kft.',
        website: 'www.s-patrikbau.hu'
    },
    legal: [
        { text: 'Privacy Policy', href: '/privacy' },
        { text: 'Terms of Use', href: '/terms' },
        { text: 'Cookie Policy', href: '/cookies' }
    ]
};
