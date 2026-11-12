/* The houses and the address: facts that are not wording. Every sentence is in
 * lib/copy; every figure shown is formatted by lib/format.ts from here. This
 * file is never imported from a 'use client' file: the browser receives
 * lib/houses-view.ts (display strings) instead. */

// ============================================
// UNIT DATA - From PRD Section 2.2
// ============================================

export type HighlightKey = 'largestInterior' | 'smallestGarden' | 'largestGarden';

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
    /** A fact about the house the page may point out. The wording is in lib/copy. */
    highlight?: HighlightKey;
}

/* Units as in the developer's 2026-10 price list, which Brenda confirmed is correct.
 * The list rounds gardens (185, 202, 102, 147); the decimals come from the earlier
 * plans. A3 and B2 are sold, and the list gives no garden for them, so 260.01 and
 * 316.84 are carried over from those plans. */
export const units: Unit[] = [
    {
        id: 'A1',
        building: 'A',
        position: 1,
        totalInternal: 117.45,
        groundFloor: 58.17,
        firstFloor: 59.28,
        terraceArea: 6.60,
        gardenArea: 185.65,
        gardenSize: 'large',
        status: 'available',
        rooms: 5,
        bathrooms: 2,
        parkingSpaces: 2
    },
    {
        id: 'A2',
        building: 'A',
        position: 2,
        totalInternal: 120.27,
        groundFloor: 59.70,
        firstFloor: 60.57,
        terraceArea: 6.60,
        gardenArea: 201.79,
        gardenSize: 'large',
        status: 'available',
        rooms: 5,
        bathrooms: 2,
        parkingSpaces: 2,
        highlight: 'largestInterior'
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
        gardenArea: 102.12,
        gardenSize: 'small',
        status: 'available',
        rooms: 5,
        bathrooms: 2,
        parkingSpaces: 2,
        highlight: 'smallestGarden'
    },
    {
        id: 'B2',
        building: 'B',
        position: 2,
        totalInternal: 117.33,
        groundFloor: 57.95,
        firstFloor: 59.38,
        terraceArea: 6.60,
        gardenArea: 316.84,
        gardenSize: 'xlarge',
        status: 'sold',
        rooms: 5,
        bathrooms: 2,
        parkingSpaces: 1,
        highlight: 'largestGarden'
    },
    {
        id: 'B3',
        building: 'B',
        position: 3,
        totalInternal: 117.42,
        groundFloor: 58.04,
        firstFloor: 59.38,
        terraceArea: 6.60,
        gardenArea: 147.19,
        gardenSize: 'medium',
        status: 'available',
        rooms: 5,
        bathrooms: 2,
        parkingSpaces: 1
    }
];

// ============================================
// DERIVED FACTS - never typed into a sentence
// ============================================

export const availableUnits = units.filter((unit) => unit.status === 'available');

const gardens = availableUnits.map((unit) => unit.gardenArea);
const interiors = units.map((unit) => unit.totalInternal);

/** The gardens of the houses still available (the page says "102 to 202 m²"). */
export const gardenRange = { min: Math.min(...gardens), max: Math.max(...gardens) };

/** Interior area across the six houses. */
export const interiorRange = { min: Math.min(...interiors), max: Math.max(...interiors) };

/** The largest garden of the development, sold houses included: the 100 % of the garden ribbon. */
export const largestGarden = Math.max(...units.map((unit) => unit.gardenArea));

/** Ids of the available houses that come with `spaces` parking spaces. */
export function availableWithParking(spaces: number): string[] {
    return availableUnits.filter((unit) => unit.parkingSpaces === spaces).map((unit) => unit.id);
}

// ============================================
// ADDRESS
// ============================================

/* One address, shared by both locales — a Hungarian street address does not
 * translate, so it belongs here next to `units` rather than being retyped per
 * language. It is a single constant because the site carried three different
 * versions of it: 1110 in this file, 1116 in the four components that print it,
 * and a third location encoded in the map embed.
 *
 * Source: the developer's own price list, `Spanyolret_Gardens_price_list_
 * 2026_09_EN.pdf`, which gives `1112 Budapest, Törökbálinti út · Lot no.
 * 1318/7`. That supersedes the reading we had before.
 *
 * The history is worth keeping, because two of the three earlier versions were
 * wrong and one was only half right. The site shipped `Spanyolréti út, 1116`,
 * a street that returns no result anywhere in Hungary. The PRD said
 * `Spanyolréti út, 1110`. Reading OpenStreetMap we corrected to `Spanyolrét
 * út, 1112` — right postcode, wrong street: Spanyolrét is the neighbourhood,
 * and it does have a street of that name, 550 m from this one. Törökbálinti út
 * is confirmed in OSM at postcode 1112 (Pösingermajor) and Google resolves it
 * to 47.4763, 18.9870.
 *
 * Still not pinned: the plot itself, hrsz 1318/7. The map shows the street and
 * its surroundings, which is what we can actually stand behind.
 */
export const siteAddress = {
    street: 'Törökbálinti út',
    postalCode: '1112',
    city: 'Budapest',
    /** What the page prints. */
    full: 'Törökbálinti út, 1112 Budapest',
    /** What Google is asked to resolve. */
    query: 'Törökbálinti út, 1112 Budapest, Hungary',
} as const;

/* The previous embed was a `pb=` blob holding placeholder coordinates and a
 * placeholder place id (`0x1234567890abcdef`), so the map pointed wherever that
 * resolved to. A `pb` string can only be produced by Google's own embed
 * generator — it cannot be written by hand — so this uses the keyless query
 * form and lets Google geocode the address itself. Zoom 15 shows the street in
 * context without implying a pin on a plot we have not confirmed.
 */
export const mapEmbedSrc =
    `https://maps.google.com/maps?q=${encodeURIComponent(siteAddress.query)}&z=15&output=embed`;

/** Documented Google Maps URL scheme, for the "open in Maps" link. */
export const mapLinkHref =
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteAddress.query)}`;
