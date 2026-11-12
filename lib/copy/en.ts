import { formatArea, formatAreaRange, formatDate, formatPrice, formatYearMonth } from '../format';
import { joinIds, shared } from './shared';
import type { Copy } from './types';

/* English. Figures come from lib/data.ts and lib/project-config.ts through
 * lib/format.ts; this file holds the sentences. */

const keys = shared.handover ? formatYearMonth(shared.handover, 'en') : null;
const depositBy = formatDate(shared.giftDepositBy, 'en');
const interior = formatAreaRange(shared.interiorRange.min, shared.interiorRange.max);
const garden = formatAreaRange(shared.gardenRange.min, shared.gardenRange.max);
const gardenFrom = Math.round(shared.gardenRange.min);
const gardenTo = Math.round(shared.gardenRange.max);
const terrace = formatArea(shared.terraceArea, 'en');
const parkingPrice = formatPrice(shared.parkingSpacePriceHuf, 'en');
const twoSpaces = joinIds(shared.parkingTwo, 'and');
const oneSpace = joinIds(shared.parkingOne, 'and');
const projects = `${shared.developer.projectsFinished}`;

const priceQualifier = shared.giftOn
    ? `Turnkey — landscaping and one parking space included, on a reservation deposit received by ${depositBy}`
    : 'Turnkey — landscaping and one parking space included';

const parkingIncluded =
    `Outdoor parking: two spaces with ${twoSpaces}, one with ${oneSpace}` +
    (shared.giftOn ? ` (one free on a deposit by ${depositBy})` : '');

const parkingAnswer =
    `${twoSpaces} come with two outdoor parking spaces, ${oneSpace} with one, at ${parkingPrice} each in the price. ` +
    (shared.giftOn ? `On a reservation deposit received by ${depositBy}, one space is free. ` : '') +
    'Remote-controlled gate for secure entry. No more street parking struggles.';

export const en: Copy = {
    /* No price in the description: the anchor may not appear without its
     * qualifier (deposit deadline included), which does not fit in the ~160
     * characters a search result shows (DESIGN.md → Pricing Display Rule). */
    meta: {
        title: `Spanyolrét Gardens | Townhouses with ${garden} private gardens | Budapest XI.`,
        description: `Six new-build townhouses in Budapest’s XI. District. Five rooms, ${interior} inside, and a private garden of ${gardenFrom} to ${gardenTo} m² — not a balcony.${keys ? ` Keys ${keys}.` : ''}`,
        ogTitle: 'A real garden. Not a balcony. | Spanyolrét Gardens',
        ogDescription: `Six townhouses in Budapest XI. Private gardens from ${gardenFrom} to ${gardenTo} m². Turnkey, landscaping and outdoor parking included.${keys ? ` Keys ${keys}.` : ''}`,
        ogLocale: 'en_US',
    },

    nav: {
        ariaLabel: 'Section navigation',
        backToTop: 'Back to top',
        links: [
            { id: 'why-here', label: 'Overview' },
            { id: 'gallery', label: 'Gallery' },
            { id: 'floor-plans', label: 'The six gardens' },
            { id: 'location', label: 'Location' },
        ],
        cta: 'Book a viewing',
        themeDark: 'Dark',
        themeLight: 'Light',
    },

    hero: {
        place: keys ? `Budapest XI. · ${keys}` : 'Budapest XI.',
        titleFirst: 'A real garden.',
        titleSecond: 'Not a balcony.',
        lede: `Six townhouses in Budapest’s XI. District, in two buildings of three. Five rooms over two floors, and a garden that runs from ${gardenFrom} to ${gardenTo} m².`,
        facts: [
            { value: `${shared.houseCount}`, label: 'Townhouses' },
            { value: interior, label: 'Inside' },
            { value: garden, label: 'Private garden' },
            ...(keys ? [{ value: keys, label: 'Keys' }] : []),
        ],
        ctaPrimary: 'Book a viewing',
        ctaSecondary: 'See the six gardens',
    },

    /* The one public figure. It never appears without its qualifier: a bare
     * number invites comparison against competitors' shell prices
     * (DESIGN.md → Pricing Display Rule). */
    price: {
        anchor: `From ${formatPrice(shared.anchorHuf, 'en')}`,
        qualifier: priceQualifier,
    },

    whyHere: {
        eyebrow: 'Why here',
        title: 'Nobody plans to raise two children in seventy square metres.',
        lede: 'You moved here for the work and it went well. Then the second child arrived, the home office became the corner of the bedroom, and you started parking three streets away.',
        nowLabel: 'Your week now',
        cards: [
            {
                shot: 'dusk',
                now: 'The office is the corner of the bedroom',
                title: `${Math.round(shared.interiorRange.min)} m², five rooms, two floors`,
                text: 'A room to work in with a door that shuts. A pantry, a utility room, a walk-in wardrobe.',
                meta: null,
            },
            {
                shot: 'lawn',
                now: 'A balcony is not outside',
                title: `Between ${gardenFrom} and ${gardenTo} m² of garden`,
                text: 'Hand-sown grass, fenced, with a door from the living room. You can see all of it from the terrace.',
                meta: null,
            },
            {
                shot: 'walk',
                now: 'Twenty minutes looking for a space',
                title: 'Parking behind a gate you open from the car',
                text: 'You arrive, the gate opens, you park.',
                meta: `Two outdoor spaces come with ${twoSpaces}, one with ${oneSpace}.`,
            },
            {
                shot: 'wine',
                now: '€18,000 a year, and none of it is yours',
                title: 'The payment goes into something you own',
                text: 'At €1,500 a month you have paid for a good part of a house. Someone else owns it. We are not going to forecast the Budapest market for you. But the money stops leaving.',
                meta: null,
            },
        ],
    },

    gallery: {
        eyebrow: 'The place',
        title: 'What a Saturday looks like here.',
        lede: keys
            ? `These are architectural renders, not photographs — the buildings are finished in ${keys}. The dimensions in them are the dimensions in the plans.`
            : 'These are architectural renders, not photographs. The dimensions in them are the dimensions in the plans.',
        shots: [
            {
                key: 'midday',
                alt: 'Rear elevation with the terrace and lawn, midday',
                caption: `The terrace opens straight onto the grass. ${terrace}, porcelain tiles.`,
            },
            {
                key: 'children',
                alt: 'Children running on the lawn of a private garden',
                caption: 'Fenced on all sides. You can see the whole garden from the kitchen.',
            },
            {
                key: 'barbecue',
                alt: 'A family eating outdoors on the terrace',
                caption: 'Saturday. The reason people move out of the seventh district.',
            },
            {
                key: 'aerial',
                alt: 'Aerial view of the two buildings and the six garden plots',
                caption: 'Two buildings of three. Every garden is a different size.',
            },
            {
                key: 'dusk',
                alt: 'The two buildings at dusk, windows lit, seen from the garden',
                caption: 'The two buildings at dusk.',
            },
            {
                key: 'wine',
                alt: 'A couple drinking wine on the terrace in the evening, the lit living room behind',
                caption: 'An evening on the terrace.',
            },
            {
                key: 'path',
                alt: 'A family of four walking on the paved path in front of the house',
                caption: 'On the garden path.',
            },
            {
                key: 'walk',
                alt: 'A family of four on the garden path, near the façade',
                caption: 'A walk in the garden.',
            },
            {
                key: 'lawn',
                alt: 'Two children running across the lawn, the house behind',
                caption: 'Children on the lawn.',
            },
        ],
        ui: {
            region: 'Gallery, scroll sideways',
            hint: 'Drag, scroll or use the arrows · click to enlarge',
            previousImage: 'Previous image',
            nextImage: 'Next image',
            enlarge: 'Enlarge: {alt}',
            viewer: 'Image viewer',
            close: 'Close',
            previous: 'Previous',
            next: 'Next',
        },
    },

    houses: {
        eyebrow: 'The six gardens',
        title: 'Same house six times. The garden is what changes.',
        lede: `Five rooms over two floors, two bathrooms and a ${terrace} terrace in every one. On the four still available, the garden runs from ${formatArea(shared.gardenRange.min, 'en')} to ${formatArea(shared.gardenRange.max, 'en')}, drawn to scale below.`,
        columnHouse: 'Unit',
        columnGarden: 'Private garden, to scale',
        summary: '{interior} inside · {rooms} rooms · {terrace} terrace',
        priceOnRequest: 'Price on request',
        sheet: {
            open: 'Plan and details',
            openAria: 'Open the plan and details of house {id}',
            close: 'Close',
            previous: 'Previous',
            next: 'Next',
            zoomIn: 'Zoom in',
            zoomOut: 'Zoom out',
            facts: {
                interior: 'Interior',
                groundFloor: 'Ground floor',
                firstFloor: 'First floor',
                terrace: 'Terrace',
                garden: 'Private garden',
                rooms: 'Rooms',
                parking: 'Parking',
            },
            parking: { one: '{count} space', other: '{count} spaces' },
            askMessage: 'Ask about house {id}',
            askCallBack: 'Ask for a call back about house {id}',
            callNow: 'Call us',
            callRevealed: 'tap to call',
        },
        statuses: { available: 'Available', reserved: 'Reserved', sold: 'Sold' },
        highlights: {
            largestInterior: 'Largest interior',
            smallestGarden: 'Smallest garden',
            largestGarden: 'Largest garden',
        },
        note: 'B1 is visibly the smallest and we have left it that way. A bar you can trust when it is unflattering is a bar you can trust on A2.',
        ribbon: {
            garden: 'garden',
            ofLargest: '{percent}% of the largest',
            aria: '{area} garden, {percent} percent of the largest garden',
        },
        plans: {
            sitePlan: 'Site plan',
            sitePlanAlt: 'Site plan: two buildings of three houses, each with its own garden plot',
            soldChip: 'sold',
            siteHint: 'hover or tap a plot',
            house: 'House {id}',
            groundFloor: 'Ground floor',
            firstFloor: 'First floor',
            siteCaption: '{architect} · scale 1:250',
            planCaption: 'redrawn to scale from the building-permit drawings, net areas as stated on them',
            roomNames: {
                entrance: 'Entrance', shower: 'Shower', living: 'Living room', bedroom: 'Bedroom', kitchenDining: 'Kitchen-dining',
                pantry: 'Pantry', stairs: 'Stairs', hallway: 'Landing', wc: 'WC', wardrobe: 'Wardrobe', utility: 'Utility',
                bathroom: 'Bathroom', terrace: 'Terrace',
            },
        },
    },

    pricing: {
        eyebrow: 'Pricing',
        title: 'What the price covers, and what it does not.',
        lede: 'You get keys, not a shell. The gardens differ by nearly twice between units, so the figure for the one you want comes from us directly.',
        includedTitle: 'In the price',
        included: [
            'Turnkey delivery (move-in ready)',
            parkingIncluded,
            `${terrace} terrace with porcelain tiles`,
            'Full landscaping (grass, paths, fencing)',
            'All electrical and plumbing fixtures',
            'LEGRAND switches and sockets',
            'Underfloor heating system',
            'Fan-coil cooling units',
        ],
        extrasTitle: 'Priced on top',
        extras: [
            { item: 'Additional parking space', price: parkingPrice },
            { item: 'Ceiling heating-cooling upgrade', price: 'Quote on request' },
            { item: 'Roller shutters (motorized)', price: 'Quote on request' },
            { item: 'Solar panel installation', price: 'Quote on request' },
            { item: 'Garden irrigation system', price: 'Quote on request' },
        ],
        extrasNote:
            'Optional extras are priced separately and listed below. We put them here rather than at contract stage, because finding out later is how people end up feeling sold to.',
        cta: 'Ask us the price',
        scheduleNote:
            'Payment schedule and financing are set out in the reservation documents. We will walk you through both before you commit to anything.',
    },

    location: {
        eyebrow: 'Where it is',
        title: 'Twenty minutes from the centre. None of the noise.',
        lede: 'Spanyolrét is not central and we are not going to pretend otherwise. What you get for those extra fifteen minutes is a street where nothing happens.',
        mapTitle: 'Spanyolrét Gardens location on Google Maps',
        mapShow: 'Show the map',
        mapNote: 'The map is served by Google Maps, which may set its own cookies. It loads only when you click, or if you accepted cookies.',
        district: 'XI. District (Újbuda)',
        mapLink: 'Open in Google Maps →',
        gettingAround: 'Getting around',
        transport: [
            { name: 'Kelenföld M4 Metro', time: '6-8 min by bus' },
            { name: 'Bus lines 40, 40B, 88, 88A', time: '10 min walk' },
            { name: 'City center', time: '15-20 min drive' },
            { name: 'Budapest Airport', time: '35 min drive' },
        ],
        nearbyTitle: 'What is nearby',
        nearby: [
            { category: 'Schools', items: ['British International School (15 min)', 'American International School (20 min)', 'Local Hungarian schools (5-10 min)'] },
            { category: 'Shopping', items: ['Etele Plaza (10 min)', 'IKEA Budaörs (15 min)', 'Local shops (5 min walk)'] },
            { category: 'Healthcare', items: ['Szent Imre Hospital (10 min)', 'Private clinics nearby'] },
            { category: 'Recreation', items: ['Normafa hiking (15 min)', 'Bikás Park (10 min)', 'Danube riverfront (20 min)'] },
        ],
        streetTitle: 'The street itself',
        street: [
            'Quiet residential streets',
            'Very little through traffic',
            'Houses people have lived in for twenty years',
            'Green surroundings',
            'No other new development on the street',
        ],
        note: 'The part you cannot check on a map is what the street sounds like at nine in the evening. Come and hear it before you decide anything.',
    },

    developer: {
        eyebrow: 'The builder',
        title: 'The people who will actually build it.',
        lede: `S-Patrik Bau has been building in Budapest since ${shared.developer.since} and has finished more than ${projects} projects. Ask us for addresses — several are a short drive from Spanyolrét, and standing in front of a building somebody has lived in for six years tells you more than anything on this page.`,
        architect: 'Architect on record: {name}',
        stats: [
            { value: `${shared.developer.since}`, label: 'Building since' },
            { value: `${projects}+`, label: 'Projects finished' },
            { value: `${shared.yearsBuilding}`, label: 'Years building' },
        ],
        promises: [
            'The full technical specification, in writing, before you commit to anything',
            'Structural warranty as required by Hungarian law, plus manufacturer warranties',
            'Every chargeable extra listed up front, not discovered at contract stage',
            'Construction updates as the build progresses',
            'One English-speaking contact who stays with you throughout',
            'Addresses of finished projects, so you can go and look at the workmanship',
        ],
    },

    specs: {
        eyebrow: 'Specification',
        title: 'What is written in the technical description.',
        lede: 'Every line below is in the contract documentation. We publish it because naming a brand in writing is a claim you can hold us to, and a specification is a better answer than a promise.',
        highlights: [
            {
                key: 'walls',
                figure: '30 cm',
                label: 'External and party walls',
                items: [
                    'Wienerberger Porotherm outside, Silka sound-insulating brick between',
                    'Thermal insulation: 12cm STO system',
                    'Roof: Flat, green roof ready, 20-26cm EPS insulation',
                ],
            },
            {
                key: 'climate',
                figure: 'No gas',
                label: 'Heat pump, underfloor heating',
                items: [
                    'Heat pump: Westen Auriga with hot water storage',
                    'Fan-coil cooling on each floor, SIEMENS/HONEYWELL thermostat per floor',
                    'Protective conduit runs to the roof. The solar panels themselves are a chargeable extra, not included in the price.',
                ],
            },
            {
                key: 'glazing',
                figure: 'Triple-glazed',
                label: 'Glazing, 6-chamber profile',
                items: [
                    'VEKA 82 / Aluplast Neo window profile, Roto NX hardware',
                    'Entrance door: MABISZ certified, 4-8 point locking',
                    'Shading: Roller shutter preparation included',
                ],
            },
            {
                key: 'electrical',
                figure: '4–10',
                label: 'Sockets per room',
                items: [
                    'Fittings: LEGRAND Valena series',
                    'TV/Internet: Connection in every room',
                    'Motion sensor preparation for the alarm, twilight-controlled outdoor lighting',
                ],
            },
            {
                key: 'finishes',
                figure: '3',
                label: 'Paint colors included',
                items: [
                    'Premium laminate flooring in the living areas, ceramic tiles in the wet rooms',
                    'Terrace: Porcelain stoneware tiles (max 60×60cm)',
                    'You choose the finishes while it is still being built',
                ],
            },
            {
                key: 'garden',
                figure: '10–15 cm',
                label: 'Topsoil, hand-sown grass',
                items: [
                    'Fence: Galvanized (street), wire mesh (plots)',
                    'Gate: Remote-controlled vehicle access',
                    'Irrigation: Optional preparation',
                ],
            },
        ],
        fullToggle: 'Read the full specification ({count} lines)',
        included: 'Included',
        categories: [
            {
                id: 'structure',
                title: 'Building Structure',
                items: [
                    'Foundation: Strip foundation + 15cm reinforced concrete slab',
                    'External walls: 30cm Wienerberger Porotherm (30% heat savings)',
                    'Party walls: 30cm Silka sound-insulating brick',
                    'Thermal insulation: 12cm STO system',
                    'Roof: Flat, green roof ready, 20-26cm EPS insulation',
                ],
            },
            {
                id: 'climate',
                title: 'Heating & Cooling',
                items: [
                    'Heat pump: Westen Auriga with hot water storage',
                    'Distribution: Underfloor heating throughout',
                    'Cooling: Fan-coil units on each floor',
                    'Control: SIEMENS/HONEYWELL smart thermostats per floor',
                    'Optional: Ceiling heating-cooling upgrade',
                ],
            },
            {
                id: 'windows',
                title: 'Windows & Doors',
                items: [
                    'Window profile: 6-chamber VEKA 82 / Aluplast Neo',
                    'Glazing: Triple-glazed',
                    'Hardware: Roto NX',
                    'Entrance door: MABISZ certified, 4-8 point locking',
                    'Shading: Roller shutter preparation included',
                ],
            },
            {
                id: 'electrical',
                title: 'Electrical & Smart Home',
                items: [
                    'Fittings: LEGRAND Valena series',
                    'Sockets: 4-10 per room (see detailed specs)',
                    'TV/Internet: Connection in every room',
                    'Alarm: Motion sensor preparation in each room',
                    'Outdoor lighting: Twilight-controlled',
                ],
            },
            {
                id: 'finishes',
                title: 'Finishes & Materials',
                items: [
                    'Living areas: Premium laminate flooring',
                    'Wet rooms: Ceramic tiles (up to 8,000 Ft/m² allowance)',
                    'Walls: 2 layers plaster + 2-3 layers paint (3 colors included)',
                    'Terrace: Porcelain stoneware tiles (max 60×60cm)',
                    'Facade: Rubbed textured plaster',
                ],
            },
            {
                id: 'outdoor',
                title: 'Outdoor & Landscaping',
                items: [
                    'Gardens: 10-15cm topsoil, hand-sown grass',
                    'Paths: KK-BETON London grey paving',
                    'Fence: Galvanized (street), wire mesh (plots)',
                    'Gate: Remote-controlled vehicle access',
                    'Irrigation: Optional preparation',
                ],
            },
        ],
        note: 'Ask us for the full document, and for addresses of buildings we finished five or six years ago. Standing in front of one tells you more than anything on this page.',
    },

    process: {
        eyebrow: 'How it works',
        title: 'From this page to your keys.',
        lede: 'Six steps. You can stop at any of them until the reservation documents: nothing here commits you to anything before that, and we will walk you through those before you sign.',
        steps: [
            { title: 'Schedule a Consultation', text: 'Book a call to discuss your needs and answer your questions. Available in English.', duration: '30 minutes' },
            { title: 'Visit the Site', text: 'Tour the construction site, see the neighborhood, and visualize your future home.', duration: '1 hour' },
            { title: 'Choose Your Unit', text: 'Select from available units. Discuss customization options for finishes.', duration: 'Your pace' },
            { title: 'Reserve with Deposit', text: 'Secure your unit with a reservation deposit. We provide a bilingual contract.', duration: '1-2 weeks' },
            { title: 'Finalize Purchase', text: 'Complete the purchase agreement with the notary. We guide you through every step.', duration: '2-4 weeks' },
            {
                title: keys ? `Move In (${keys})` : 'Move In',
                text: 'Receive your keys to a turnkey, move-in ready home.',
                duration: 'Delivery day',
            },
        ],
        reassuranceTitle: 'Buying property in Hungary as a foreigner is manageable. Making it so is our job.',
        reassurance: [
            'English-speaking dedicated contact',
            'Bilingual contracts and documentation',
            'Recommended English-speaking lawyers and notaries',
            'Regular construction progress updates',
            'Transparent communication throughout',
        ],
        cta: 'Book a viewing',
    },

    faq: {
        eyebrow: 'Questions',
        title: 'The questions people actually ask.',
        lede: 'If yours is not here, ask it on the form below and you will get a straight answer, including the ones where the answer is “we do not know yet”.',
        groups: [
            {
                title: 'Purchase Process',
                items: [
                    {
                        q: 'Can foreigners buy property in Hungary?',
                        a: 'Yes. EU citizens can buy freely. Non-EU citizens need a permit from the local government office, which we help you obtain. The process typically takes 2-4 weeks and has a very high approval rate.',
                    },
                    {
                        q: 'What is the payment schedule?',
                        a: 'Typically: 10% reservation deposit, followed by stage payments during construction, with the final payment at handover. Exact terms are discussed during consultation and can be tailored to your situation.',
                    },
                    {
                        q: 'What happens if construction is delayed?',
                        a: `S-Patrik Bau has finished more than ${projects} projects since ${shared.developer.since}. ${keys ? `Keys are due in ${keys}, and the contract` : 'The contract'} sets out what happens in case of delay, protecting your interests.`,
                    },
                ],
            },
            {
                title: 'The Property',
                items: [
                    {
                        q: 'Can I customize the finishes?',
                        a: 'Yes! Before construction reaches the finishing stage, you can select your tile designs, flooring colors, paint colors (up to 3 included), and other finishing options from our approved selections.',
                    },
                    {
                        q: 'What is included in the price?',
                        a: 'All units are delivered turnkey: complete with flooring, bathroom fixtures, kitchen preparation, lighting fixtures, heating/cooling systems, and landscaped garden. You receive a move-in ready home.',
                    },
                    {
                        q: 'Are there ongoing monthly costs?',
                        a: 'As a freehold townhouse owner, you’ll have minimal common charges (shared driveway maintenance, bin collection area). No monthly management fees like apartments. Utility costs are your own.',
                    },
                    {
                        q: 'What warranty is provided?',
                        a: 'Full structural warranty as required by Hungarian law, plus manufacturer warranties on all installed systems (heat pump, windows, etc.). S-Patrik Bau provides comprehensive after-sales support.',
                    },
                ],
            },
            {
                title: 'Location & Lifestyle',
                items: [
                    {
                        q: 'How far is it from the city center?',
                        a: 'Approximately 20-25 minutes by car or public transport. Kelenföld M4 Metro station is 6-8 minutes by bus, then direct to the center. You get space and quiet while staying connected.',
                    },
                    {
                        q: 'Are there international schools nearby?',
                        a: 'Yes. British International School is ~15 minutes, American International School ~20 minutes. Several quality local Hungarian schools are within 5-10 minutes.',
                    },
                    {
                        q: 'Is the area safe for families?',
                        a: 'Very safe. Spanyolrét is an established residential neighborhood with low crime rates. It’s known for being quiet, family-friendly, and having good community spirit.',
                    },
                    { q: 'What about parking and cars?', a: parkingAnswer },
                ],
            },
            {
                title: 'Technical',
                items: [
                    {
                        q: 'How energy efficient are the homes?',
                        a: 'Very efficient. Heat pump heating/cooling (no gas), 30cm insulated walls, triple-glazed windows, underfloor heating distribution. Expect significantly lower utility bills than older properties.',
                    },
                    {
                        q: 'Can I install solar panels?',
                        a: 'Yes, all units are solar-ready with protective piping already installed. Installation can be arranged during construction or after handover.',
                    },
                    {
                        q: 'What about air conditioning?',
                        a: 'Fan-coil cooling units are included on each floor. Optional ceiling heating-cooling upgrade eliminates the need for external AC units entirely.',
                    },
                    {
                        q: 'Is the garden irrigated?',
                        a: 'Irrigation preparation is available as an optional upgrade. The garden is delivered with topsoil and hand-sown grass.',
                    },
                ],
            },
        ],
    },

    leadForm: {
        eyebrow: 'Book a viewing',
        title: 'Come and stand in the garden.',
        ledeMessaging: 'Answer a few short questions. Bring the children to the visit.',
        ledeNoMessaging:
            'Bring the children. They will tell you more about 300 m² of grass than we can. One visit, and no follow-up unless you ask for it.',
        replyText: 'Within the hour during Budapest office hours. Otherwise first thing tomorrow.',
        facts: [
            { title: 'In English', text: 'The whole purchase runs in English. No Hungarian required at any point.' },
            {
                title: 'What we do with this',
                text: 'We contact you about Spanyolrét Gardens. We do not pass it to anyone else, and one email from you removes it.',
            },
        ],
        replyTodayMessaging: 'A reply today',
        replyTodayCall: 'A call today',
    },

    form: {
        unit: 'Which house interests you?',
        unitAny: 'Not sure yet',
        unitOption: '{id} · garden {garden}',
        priority: 'What matters most to you?',
        priorities: { outdoor: 'A private garden', space: 'Space and layout', location: 'The location', price: 'The price' },
        timeline: 'When are you looking to move?',
        timelinePlaceholder: 'Choose',
        timelineOptions: [
            { value: 'immediately', label: 'As soon as possible' },
            { value: '3-6-months', label: 'Within 3–6 months' },
            { value: '6-12-months', label: 'Within 6–12 months' },
            { value: '12-plus-months', label: 'In more than 12 months' },
        ],
        firstName: 'First name',
        phone: 'Phone',
        email: 'Email (optional)',
        consent: 'I agree to be contacted about my enquiry.',
        privacyLink: 'Privacy policy',
        choose: 'Send it with',
        opening: 'Opening your messages…',
        whatsapp: 'WhatsApp',
        sms: 'SMS',
        note: 'Your answers are also saved, so that we can call you back if the message does not reach us.',
        callBack: 'I would rather be called back',
        submit: 'Book a viewing',
        sending: 'Sending…',
        failure: 'Something went wrong and your request was not sent. Please try again.',
        rateLimited: 'Too many requests have been sent from your connection. Please try again in an hour.',
        errors: {
            firstName: 'Please enter your first name',
            phone: 'Please enter your phone number',
            consent: 'We need your agreement in order to contact you',
        },
        message: {
            intro: 'Hello, my name is {name} and I am interested in Spanyolrét Gardens.',
            unit: 'House: {unit}',
            anyUnit: 'I have not chosen a house yet.',
            priority: 'What matters most to me: {priority}',
            timeline: 'Moving: {timeline}',
            close: 'Could we arrange a visit?',
        },
        thankYouPath: '/thank-you',
    },

    footer: {
        ariaLabel: 'Footer',
        tagline: `Six townhouses with private gardens of ${gardenFrom} to ${gardenTo} m², in Budapest’s XI. District.${keys ? ` Keys ${keys}.` : ''}`,
        cta: 'Book a viewing',
        onThisPage: 'On this page',
        links: [
            { id: 'why-here', label: 'Overview' },
            { id: 'floor-plans', label: 'The six gardens' },
            { id: 'specs', label: 'Specification' },
            { id: 'location', label: 'Location' },
            { id: 'faq', label: 'Questions' },
        ],
        contact: 'Contact',
        address: 'Address',
        email: 'Email',
        phone: 'Phone',
        legalLine: '{name} · Tax {tax} · Reg {registration}',
        architect: 'Architect: {name}',
        privacy: 'Privacy policy',
        cookieSettings: 'Cookie settings',
    },

    ctaBands: {
        afterHouses: {
            title: 'Which house is yours?',
            text: 'Ask for the price of any house, without obligation.',
            primary: 'Ask for the price',
            message: 'Write to us',
        },
        afterSpecs: {
            title: 'Another question?',
            text: 'Ask it by message, or leave your number and we call you back.',
            primary: 'Call me back',
            message: 'Write to us',
        },
    },
    stickyBar: { ariaLabel: 'Quick actions', viewing: 'Book a viewing', message: 'Message', call: 'Call' },
    thankYou: {
        metaTitle: 'Thank you | Spanyolrét Gardens',
        title: 'Thank you.',
        text: 'We have your request.',
        next: ['We call you back within 24 hours on the number you gave, to arrange your viewing.'],
        brochureLead: 'In the meantime, download our brochure.',
        brochureButton: 'Download the brochure',
        faster: 'Would you rather write now?',
        message: 'Hello, I have just sent the form on the Spanyolrét Gardens website.',
        back: 'Back to the homepage',
        backHref: '/',
    },
};
