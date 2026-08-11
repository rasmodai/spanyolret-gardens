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
    // No price fields. Per-unit prices are never published, and anything in this
    // shape ships in the client bundle where devtools can read it.
    // See DESIGN.md → Pricing Display Rule.
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
        status: 'available',
        rooms: 5,
        bathrooms: 2,
        parkingSpaces: 1,
        highlight: 'Largest interior'
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
        status: 'sold',
        rooms: 5,
        bathrooms: 2,
        parkingSpaces: 1,
        highlight: 'Smallest garden'
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
        status: 'available',
        rooms: 5,
        bathrooms: 2,
        parkingSpaces: 1,
        highlight: 'Largest garden'
    }
];

// ============================================
// TRUST BAR DATA
// ============================================

export const trustBarItems = [
    { icon: 'building', value: '50+', label: 'Projects finished' },
    // Derived, not hardcoded. The previous '13' was written in Dec 2025 and was
    // already wrong by Aug 2026.
    { icon: 'calendar', value: `${new Date().getFullYear() - 2012}`, label: 'Years building' },
    // ⚠️ UNVERIFIED — "100% on-time delivery" appears nowhere in the technical
    // spec; it originates in marketing copy. On a HUF 240M purchase this is a
    // claim with legal weight. Confirm in writing with S-Patrik Bau or cut it.
    { icon: 'shield', value: '100%', label: 'Delivered on time' },
    { icon: 'award', value: '30 cm', label: 'Party walls' }
];

// Only brands the technical specification actually commits to. BOSCH was on
// this wall and appears nowhere in the spec — removed. VEKA and SIEMENS are
// listed in the spec as options ("VEKA 82 or Aluplast Neo", "SIEMENS or
// HONEYWELL"), so they are named in the spec section rather than shown as
// settled commitments here. See DESIGN.md → Credibility slop.
export const brandLogos = ['Wienerberger', 'LEGRAND', 'Silka'];

// ============================================
// PROBLEM-SOLUTION CONTENT
// ============================================

export const problems = [
    {
        icon: 'compress',
        title: 'The office is the corner of the bedroom',
        description: 'Someone is always on a call. Someone else is always being asked to be quiet.'
    },
    {
        icon: 'tree-slash',
        title: 'A balcony is not outside',
        description: 'You cannot send a five-year-old out to a balcony and get on with your morning.'
    },
    {
        icon: 'car-xmark',
        title: 'Twenty minutes looking for a space',
        description: 'Then three streets to walk, with the shopping and both children.'
    },
    {
        icon: 'money',
        title: '€18,000 a year, and none of it is yours',
        description: 'At €1,500 a month you have paid for a good part of a house. Someone else owns it.'
    }
];

export const solutions = [
    {
        icon: 'expand',
        title: '117 m², five rooms, two floors',
        description: 'A room to work in with a door that shuts. A pantry, a utility room, a walk-in wardrobe.'
    },
    {
        icon: 'tree',
        title: 'Between 102 and 316.84 m² of garden',
        description: 'Hand-sown grass, fenced, with a door from the living room. You can see all of it from the terrace.'
    },
    {
        icon: 'car',
        title: 'One space, behind a gate you open from the car',
        description: 'You arrive, the gate opens, you park. That is the whole of it, every day.'
    },
    {
        icon: 'piggy-bank',
        title: 'The payment goes into something you own',
        description: 'We are not going to forecast the Budapest market for you. But the money stops leaving.'
    }
];

// ============================================
// PROPERTY OVERVIEW
// ============================================

export const propertyStats = [
    { value: '6', label: 'Townhouses', icon: 'home' },
    { value: '117–120 m²', label: 'Inside', icon: 'expand' },
    { value: '102–317 m²', label: 'Private garden', icon: 'tree' },
    { value: '5', label: 'Rooms', icon: 'door' },
    { value: '6.60 m²', label: 'Terrace', icon: 'door' },
    { value: 'September 2026', label: 'Keys', icon: 'calendar-check' }
];

/* The one public figure. It never appears without `anchorQualifier` — a bare
 * number invites comparison against competitors' shell prices and loses it.
 * Per-unit prices are never published. See DESIGN.md → Pricing Display Rule. */
export const pricing = {
    anchor: 'From 240,000,000 HUF',
    anchorQualifier: 'Turnkey — landscaping and one parking space included',
    perUnit: 'Price on request',
    extrasNote:
        'Optional extras are priced separately and listed below. We put them here rather than at contract stage, because finding out later is how people end up feeling sold to.'
};

// ============================================
// BENEFITS
// ============================================

export const benefits = [
    {
        icon: 'heat',
        title: 'No gas bill, because there is no gas',
        // "Energy class A" and "Save €1,000+/year" removed: neither appears in
        // the technical specification. Get the energy certificate and the actual
        // running-cost figures before either goes back.
        description: 'A Westen Auriga heat pump runs the underfloor heating in winter and the cooling in summer.',
        highlight: 'No gas connection'
    },
    {
        icon: 'soundproof',
        title: '30 cm of brick between you and next door',
        description: 'Silka sound-insulating block on the party walls. It is the reason you will not hear them.',
        highlight: '30 cm'
    },
    {
        icon: 'solar',
        title: 'The pipework for solar is already in',
        description: 'Protective conduit runs to the roof. The panels themselves are a chargeable extra, not included.',
        highlight: 'Conduit installed'
    },
    {
        icon: 'smart',
        title: 'A thermostat per floor',
        description: 'Programmable weekly, SIEMENS or HONEYWELL. Upstairs and downstairs do not have to agree.',
        highlight: 'Per floor'
    },
    {
        icon: 'secure',
        title: 'MABISZ-certified entrance door',
        description: 'Four to eight point locking, alarm wiring prepared in every room, and a gate you open from the car.',
        highlight: 'Certified'
    },
    {
        icon: 'customize',
        title: 'Choose the finishes while it is still being built',
        description: 'Tiles, flooring, paint. This is the one thing you cannot do when you buy a house that is already finished.',
        highlight: 'Until completion'
    },
    {
        icon: 'quality',
        title: 'The specification, in writing',
        description: 'Wienerberger Porotherm outside, Silka between, LEGRAND Valena fittings, triple glazing. Named brands are a claim we can be held to.',
        highlight: 'Named, not implied'
    },
    {
        icon: 'garden',
        title: 'The garden is the whole point',
        description: 'From 102.12 to 316.84 m². Hand-sown grass, 10–15 cm of topsoil, irrigation pipework prepared.',
        highlight: 'Up to 316.84 m²'
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
    'Very little through traffic',
    'Houses people have lived in for twenty years',
    'Green surroundings',
    'No other new development on the street'
];

// ============================================
// DEVELOPER
// ============================================

export const developerStats = [
    { value: '2012', label: 'Building since' },
    { value: '50+', label: 'Projects finished' },
    // ⚠️ UNVERIFIED — see trustBarItems. Confirm in writing or cut.
    { value: '100%', label: 'Delivered on time' },
    { value: `${new Date().getFullYear() - 2012}`, label: 'Years building' }
];

export const qualityPromises = [
    'The full technical specification, in writing, before you commit to anything',
    'Structural warranty as required by Hungarian law, plus manufacturer warranties',
    // Was "Transparent pricing — no hidden costs", which no longer holds now that
    // extras are chargeable. This version is the honest form of the same promise.
    'Every chargeable extra listed up front, not discovered at contract stage',
    'Construction updates as the build progresses',
    'One English-speaking contact who stays with you throughout',
    'Addresses of finished projects, so you can go and look at the workmanship'
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
