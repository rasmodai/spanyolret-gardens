# Spanyolrét Gardens — Complete PRD
## Landing Page & Sales System Product Requirements Document

> **Project:** Premium Townhouse Development Landing Page  
> **Client:** S-Patrik Bau Kft.  
> **Location:** 1110 Budapest, Spanyolréti út, hrsz: 1318/7  
> **Units:** 6 Townhouses (2 buildings × 3 units)  
> **Delivery:** September 2026  
> **Last Updated:** December 2025  
> **Version:** 2.0 (Corrected from architectural plans)

---

# TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [Project Data](#2-project-data)
3. [Technical Specifications](#3-technical-specifications)
4. [Target Audience](#4-target-audience)
5. [Landing Page Structure](#5-landing-page-structure)
6. [Section Specifications](#6-section-specifications)
7. [Copy Bank](#7-copy-bank)
8. [Visual Assets](#8-visual-assets)
9. [Lead Capture & Sales Process](#9-lead-capture--sales-process)
10. [Technical Requirements](#10-technical-requirements)
11. [SEO & Analytics](#11-seo--analytics)
12. [Implementation Checklist](#12-implementation-checklist)

---

# 1. EXECUTIVE SUMMARY

## 1.1 Project Overview

Spanyolrét Gardens is a premium residential development consisting of **6 townhouse units** across **2 buildings** in Budapest's XI. District. The landing page must convert high-intent expat families into qualified leads for site visits and ultimately property reservations.

## 1.2 Business Objectives

| Objective | Target | Timeframe |
|-----------|--------|-----------|
| Generate qualified leads | 50+ | First 90 days |
| Site visits booked | 20+ | First 90 days |
| Reservations secured | 4-6 | First 120 days |
| All units sold | 6/6 | Before delivery |

## 1.3 Key Success Metrics

```yaml
conversion_targets:
  landing_page_to_lead: 25%  # Target
  lead_to_call_connected: 60%
  call_to_site_visit: 40%
  site_visit_to_reservation: 30%

speed_targets:
  first_contact: "< 5 minutes"
  presentation_scheduled: "< 72 hours"
  site_visit_scheduled: "< 7 days"
```

## 1.4 Unique Selling Proposition

**"The only new-build townhouses with private gardens in Spanyolrét — designed for families who want Budapest convenience with suburban space."**

Key differentiators:
- 100-316 m² private gardens (largest private outdoor spaces in the area)
- Modern heat pump system (no gas dependency, low running costs)
- Premium European construction materials
- Customizable floor plans before construction completion
- Developer with 50+ completed projects since 2012

---

# 2. PROJECT DATA

## 2.1 Quick Reference

```yaml
project:
  name: "Spanyolrét Gardens"
  type: "2×3 Apartment Building (6 townhouses)"
  configuration: "Freestanding, articulated mass, ground floor + 1 story"
  
location:
  address: "1110 Budapest, Spanyolréti út"
  plot_number: "hrsz: 1318/7"
  district: "XI. (Újbuda)"
  neighborhood: "Spanyolrét"
  
developer:
  name: "S-Patrik Bau Kft."
  established: 2012
  completed_projects: "50+"
  
architect:
  name: "JRT Stúdió Kft."
  
timeline:
  construction_start: "Q1 2025"
  delivery: "September 2026"
  
pricing:
  # Updated 2026-08-08. Supersedes the former 195,000,000-225,000,000 HUF range.
  public_anchor_huf: "From 240,000,000 HUF"
  public_anchor_basis: "Turnkey delivery, full landscaping and 1 parking space included"
  per_unit_pricing: "On request only — never published"
  first_parking_space: "Included in the anchor"
  optional_extras: "Chargeable on top — see §6.11. Never described as included."
```

> **PRICING POLICY — read before writing any price anywhere.**
> One figure is public: **from 240,000,000 HUF**, and it never appears without its qualifier — *turnkey, landscaping and one parking space included*. **Do not write "everything included."** The optional extras in §6.11 (second parking space, solar, irrigation, motorised shutters, ceiling heating-cooling) are chargeable on top, so a blanket claim would be misleading — and a buyer who finds a cost after the fact is a buyer who walks. **Per-unit prices are never published**; on the site each unit reads "Price on request" / "Ár kérésre". See `DESIGN.md → Pricing Display Rule`.

## 2.2 Unit Data (CORRECTED from Architectural Plans)

Areas below are taken from the architectural plans and are the source of truth for every surface shown on the site.

### Building A (West Side)

| Unit | Internal Area | Ground Floor | First Floor | Terrace | Garden | Price |
|------|---------------|--------------|-------------|---------|--------|-------|
| A1 | 117.45 m² | 58.17 m² | 59.28 m² | 6.60 m² | 201.79 m² | On request |
| A2 | 120.27 m² | 59.70 m² | 60.57 m² | 6.60 m² | 147.19 m² | On request |
| A3 | 117.94 m² | 58.50 m² | 59.44 m² | 6.60 m² | 260.01 m² | On request |

### Building B (East Side)

| Unit | Internal Area | Ground Floor | First Floor | Terrace | Garden | Price |
|------|---------------|--------------|-------------|---------|--------|-------|
| B1 | 117.38 m² | 58.11 m² | 59.27 m² | 6.60 m² | 185.65 m² | On request |
| B2 | 117.42 m² | 58.04 m² | 59.38 m² | 6.60 m² | 102.12 m² | On request |
| B3 | 117.33 m² | 57.95 m² | 59.38 m² | 6.60 m² | 316.84 m² | On request |

> **Superseded per-unit figures, kept for traceability — DO NOT PUBLISH AND DO NOT REUSE.**
> The previous version of this document listed A1 195,000,000 · A2 205,000,000 · A3 215,000,000 · B1 205,000,000 · B2 195,000,000 · B3 225,000,000 HUF. These predate the 240,000,000 HUF turnkey anchor and have **not** been restated against it. Do not derive a range, a per-m² figure, or a "from" price from them. If per-unit figures are needed for the internal sales sheet, request the current ones from the developer.

### TypeScript Data Model

```typescript
interface Unit {
  id: string;
  building: 'A' | 'B';
  position: 1 | 2 | 3;
  totalInternal: number;
  groundFloor: number;
  firstFloor: number;
  terraceArea: number;
  gardenArea: number;
  gardenSize: 'small' | 'medium' | 'large' | 'xlarge';
  // NO price / priceEur fields. Per-unit prices are never published, and anything
  // in this shape reaches the client bundle where it stays readable in devtools.
  // The single public figure ("from 240,000,000 HUF — turnkey, landscaping and
  // one parking space included") is a page-level string, not unit data.
  status: 'available' | 'reserved' | 'sold';
  rooms: number;
  bathrooms: number;
  parkingSpaces: number;
}

const units: Unit[] = [
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
    parkingSpaces: 1
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
    status: 'available',
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
    status: 'available',
    rooms: 5,
    bathrooms: 2,
    parkingSpaces: 1
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
    parkingSpaces: 1
  }
];
```

## 2.3 Room Layout (Each Unit)

### Ground Floor (~58 m²)

| Room (Hungarian) | Room (English) | Area | Flooring |
|------------------|----------------|------|----------|
| Előszoba | Entrance Hall | 3.60 m² | Ceramic tile |
| Zuhanyzó | Shower Room | 4.05-4.66 m² | Ceramic tile |
| Nappali | Living Room | 20.79 m² | Laminate |
| Konyha-Étkező | Kitchen-Dining | 10.80 m² | Ceramic tile |
| Kamra | Pantry | 1.29 m² | Ceramic tile |
| Szoba | Room/Office | 11.34 m² | Laminate |
| Terasz | Terrace | 6.60 m² | Porcelain tile |

### First Floor (~59 m²)

| Room (Hungarian) | Room (English) | Area | Flooring |
|------------------|----------------|------|----------|
| Lépcső | Staircase | 4.60 m² | Ceramic tile |
| Közlekedő | Corridor | 6.82 m² | Laminate |
| Gardrób | Walk-in Wardrobe | 2.72 m² | Laminate |
| Szoba 1 | Bedroom 1 (Master) | 10.55 m² | Laminate |
| Szoba 2 | Bedroom 2 | 10.55 m² | Laminate |
| Szoba 3 | Bedroom 3 | 9.45 m² | Laminate |
| Fürdőszoba | Main Bathroom | 6.30 m² | Ceramic tile |
| Házt. Helyiség | Utility Room | 2.48 m² | Ceramic tile |
| WC | Toilet | 1.60 m² | Ceramic tile |

### Room Configuration Summary

```yaml
total_rooms: 5
  - living_room: 1 (open plan with kitchen)
  - bedrooms: 3
  - home_office: 1 (ground floor, can be converted)

bathrooms: 2
  - ground_floor: Shower room (4 m²)
  - first_floor: Full bathroom (6.3 m²) + separate WC (1.6 m²)

storage:
  - walk_in_wardrobe: 2.72 m²
  - pantry: 1.29 m²
  - utility_room: 2.48 m²

outdoor:
  - terrace: 6.60 m² (porcelain tiles)
  - garden: 102-317 m² (varies by unit)
```

---

# 3. TECHNICAL SPECIFICATIONS

## 3.1 Building Structure

### Foundation & Walls

| Element | Specification |
|---------|---------------|
| Foundation | Strip foundation + 15cm waterproof monolithic reinforced concrete slab |
| External Walls | 30cm Wienerberger Porotherm brick (30% heat loss reduction) + reinforced concrete pillars |
| Thermal Insulation | 12cm STO thermal insulation system (or equivalent) |
| Party Walls | 30cm Silka sound-insulating brick |
| Partition Walls | 10cm Wienerberger partition brick |
| Wall Thickness | ~42cm total (exterior) |

### Floors & Roof

| Element | Specification |
|---------|---------------|
| Floor Slabs | SW 200 type monolithic prefabricated reinforced concrete flat slab |
| Stairs | Modern lightweight gypsum concrete |
| Roof Type | FLAT roof with 1.5% drainage slope |
| Roof Insulation | 20-26cm EPS-100 cut-to-slope walkable insulation |
| Waterproofing | 1.5mm Rhenofol PVC membrane |
| Construction | Green roof ready |

### Sound Insulation

| Element | Specification |
|---------|---------------|
| Floor | 3-8cm PS sound-insulating panels |
| Perimeter | 0.5cm Polifoam insulation along walls |

## 3.2 Doors & Windows

### Windows

| Feature | Specification |
|---------|---------------|
| Profile | 6-chamber VEKA 82 or Aluplast Neo |
| Hardware | Roto NX |
| Glazing | Triple-glazed (3-layer) |
| Exterior Finish | Colored ALUX DB film (anthracite/dark grey) |
| Interior Finish | White |

### Window Sills

| Location | Specification |
|----------|---------------|
| External | 2cm thick granite porcelain, WHITE |
| Internal | 2cm thick granite porcelain, WHITE |

### Doors

| Type | Specification |
|------|---------------|
| Building Entrance | Reinforced structure with door closer |
| Apartment Entrance | 4-8 point locking metal security door, MABISZ certified, up to 200,000 HUF value |
| Interior Doors | CPL foil decorative design, 80,000 HUF/piece net |

### Shading

| Feature | Specification |
|---------|---------------|
| Preparation | Hidden roller shutter boxes for all facade openings (except bathrooms) |
| Installation | Electrical installation included |
| Shutters | Guide rail + slats available as optional upgrade |

### French Balconies

| Feature | Specification |
|---------|---------------|
| Type | Glass safety railing on upper floor windows |
| Material | Grey double safety glass |
| Style | Minimal frame |

## 3.3 Mechanical Systems

### Heating & Cooling

| System | Specification |
|--------|---------------|
| Primary | Westen Auriga heat pump with hot water storage |
| Distribution | Underfloor heating throughout |
| Cooling | One high fan-coil unit per floor (ground + first) included |
| Optional | Ceiling heating-cooling system (eliminates need for AC units) |
| Control | SIEMENS or HONEYWELL digital programmable weekly thermostat (per floor) |
| Piping | WAVIN 5-layer aluminum-plastic heating pipe with bronze cast press fittings |

### Plumbing

| Feature | Specification |
|---------|---------------|
| Water Meter | Cold water meter located within apartment |
| Washing Machine | 1 connection with chrome cover plate, water + drainage + siphon |
| Outdoor Tap | 1 in common area, optional within private gardens |

### Renewable Energy

| Feature | Specification |
|---------|---------------|
| Solar Ready | Protective piping installed for rooftop solar panel system |
| Installation | Available as separate quotation |

## 3.4 Electrical Installation

### Power

| Feature | Specification |
|---------|---------------|
| Supply | 1×32A per apartment |
| Fuse Box | Located in apartment with RCD (FI relay) |
| Wiring | Copper cables 1.5mm² and 2.5mm² in protective conduits |
| Heat Pump Tariff | Optional (EON market price) |

### Fixtures (LEGRAND Valena)

| Room | Sockets | Lights | Other |
|------|---------|--------|-------|
| Living Room | 8 (2 single, 2 double) | 1 chandelier | 1 TV, 1 Internet, thermostat |
| Bedrooms | 4 each (2 single, 1 double) | 1 chandelier | 1 TV, 1 Internet |
| Kitchen-Dining | 10 (outlet strip) | 1 chandelier, 1 wall light | Electric oven connection |
| Bathroom | 2 | 1 ceiling, 1 mirror light | - |
| Hallway | 1 | 1 ceiling, 1 wall light | - |
| Terrace | 1 waterproof | 1 fixture | - |
| Pantry/Utility | 1 each | 1 each | - |

### Security & Communication

| System | Specification |
|--------|---------------|
| Alarm | 1 motion sensor conduit per room, 1 control panel (ground floor) |
| Intercom | At fence, analog unit in apartment |
| Phone/TV/Internet | Network connection in each room |
| Outdoor Lighting | At gate, garden path, building entrance (twilight switch) |

### Ventilation

| Feature | Specification |
|---------|---------------|
| Bathrooms | Extractor fan with delay automation in windowless rooms |
| Kitchen | Exhaust preparation (wall penetration) |

## 3.5 Coverings & Finishes

### Floor Coverings

| Area | Material | Budget |
|------|----------|--------|
| Living Areas | Laminate flooring | 6,000 Ft/m² net |
| Wet Rooms | Ceramic tile | 8,000 Ft/m² net |
| Kitchen | Ceramic tile | 8,000 Ft/m² net |
| Terrace | Porcelain stoneware (max 60×60cm) | 8,000 Ft/m² net |
| Skirting (laminate) | Matching | 350 Ft/lm net |

### Wall Finishes

| Area | Specification |
|------|---------------|
| Interior Walls | 2 layers plastering + 2-3 layers dispersion paint |
| Colors | White or pastel (up to 3 colors per apartment included) |
| Extra Colors | 800 HUF/m² + customer provides paint |
| Wet Rooms | Tiles up to 2.0m height (8,000 Ft/m² net) |
| Kitchen | 60cm tile strip between cabinets |

### Exterior Finishes

| Element | Specification |
|---------|---------------|
| Facade | Rubbed textured colored plaster |
| Plinth | Micro-grained plinth plaster (REVCO or equivalent) |
| Rainwater | Silver or anthracite powder-coated aluminum gutters and downpipes |

## 3.6 Landscaping & Site

### Gardens

| Feature | Specification |
|---------|---------------|
| Soil | 10-15cm topsoil |
| Grass | Hand-sown |
| Irrigation | Optional preparation available |

### Paths & Surfaces

| Area | Material |
|------|----------|
| Garden Paths | KK-BETON 10×20cm "LONDON" type decorative paving |
| Building Perimeter | Gravel or washed pebble strip with curbstone |
| Common Areas | Modular KAVICSBETON London grey 10×20cm paving |

### Fencing

| Location | Specification |
|----------|---------------|
| Street Front | Galvanized fence with remote-controlled vehicle gate |
| Rear & Sides | Plastic-coated wire mesh on steel posts |
| Plot Separation | Plastic-coated wire mesh, 1.5m high |

### Other Elements

| Element | Specification |
|---------|---------------|
| Mailbox | Wall-mounted stainless steel |
| Bin Storage | Covered construction |
| Outdoor Tap | 1 in common area by waste storage |

## 3.7 Sanitary Fittings (Per Apartment)

| Item | Specification | Value |
|------|---------------|-------|
| Sink Faucets | Customer choice | 20,000 Ft net |
| Toilets | 2× wall-hung, Geberit Basic concealed cistern | 40,000 Ft net |
| Bathtub | White acrylic straight design with legs | 90,000 Ft net |
| Bathtub Faucet | With shower set | 20,000 Ft net |
| Shower | Tray with glass door | 100,000 Ft net |
| Bidet | Optional (separate quotation) | - |

---

# 4. TARGET AUDIENCE

## 4.1 Primary Persona: The Expat Family

```yaml
persona:
  name: "The International Family"
  tagline: "Growing family, outgrowing their apartment"

demographics:
  age_range: [32, 48]
  family_status: "Married with 1-3 children"
  children_ages: [2, 14]
  nationalities:
    - "Western European (UK, Germany, Netherlands, France)"
    - "North American (USA, Canada)"
    - "Australian/New Zealand"
    - "Scandinavian"
  income: "€150,000+ household or €200,000+ savings"
  languages: "English primary, limited Hungarian"

current_situation:
  housing: "Rented apartment in central Budapest"
  size: "60-80 m², no private outdoor space"
  rent: "€1,200-1,800/month"
  location: "Districts V, VI, VII, or XIII"
  pain_level: "HIGH - actively seeking alternatives"

professional:
  types:
    - "Remote workers (tech, consulting)"
    - "Regional executives at multinationals"
    - "Business owners"
    - "Freelancers/Consultants"
  work_style: "Hybrid or fully remote"
  office_need: "Dedicated home office space essential"

timeline:
  hungary_commitment: "5+ years minimum"
  purchase_readiness: "3-9 months"
  move_preference: "Before next school year"

psychographics:
  values:
    - "Quality over quantity"
    - "Children's wellbeing"
    - "Work-life balance"
    - "Energy efficiency and sustainability"
    - "Community and safety"
  concerns:
    - "Hungarian construction quality"
    - "Foreign property purchase process"
    - "Language barriers"
    - "Finding trustworthy partners"
```

## 4.2 Pain Points (Use in Copy)

### Primary Pain Points

| ID | Pain Point | Emotional Trigger | Use In |
|----|------------|-------------------|--------|
| `cramped` | "Our apartment felt fine before kids. Now we're stepping over toys, fighting for bathroom time, and have nowhere to work from home properly." | Frustration, Overwhelm | Hero, Problem section |
| `no-garden` | "The kids spend too much time on screens. They need somewhere safe to play outside. A balcony isn't enough." | Guilt, Worry | Benefits, Garden focus |
| `parking` | "We circle the block for 20+ minutes every evening. Sometimes we park 3 streets away. With kids and groceries, it's exhausting." | Exhaustion, Anger | Features list |
| `rent-waste` | "We're paying €1,500/month to a landlord. That's €18,000/year building someone else's wealth." | Anxiety, Regret | Financial section |
| `quality-fear` | "We've heard horror stories about Hungarian construction. Shoddy workmanship, corners cut, problems appearing after moving in." | Fear, Distrust | Developer trust section |
| `process-complexity` | "Buying property in Hungary as a foreigner seems incredibly complicated. Who can we actually trust to guide us?" | Overwhelm, Vulnerability | FAQ, Trust elements |

### Secondary Pain Points

| ID | Pain Point | Emotional Trigger |
|----|------------|-------------------|
| `noise` | "The neighbors upstairs sound like they're training elephants. Paper-thin walls." | Irritation |
| `no-storage` | "We have stuff in three different storage units across the city." | Chaos |
| `landlord` | "Our landlord wants to sell. We might have to move for the fourth time in six years." | Instability |
| `commute-school` | "The kids' school run involves two tram changes and 45 minutes each way." | Time poverty |

## 4.3 Desired Outcomes (Use in Copy)

### Primary Outcomes

| ID | Outcome | Visual/Proof | Use In |
|----|---------|--------------|--------|
| `space` | "Every child has their own room. I have a proper home office. We have storage for everything." | Floor plan, Interior renders | Benefits, Floor plans |
| `garden` | "Saturday morning coffee on the terrace. Kids playing on the grass. Summer barbecues with friends." | Garden lifestyle images | Hero, Gallery, Benefits |
| `parking` | "Drive home, press the remote, park. Done. Every single day." | Parking area image | Features |
| `ownership` | "This is OURS. Building equity in a growing market. A real home for our family." | Keys handover imagery | Emotional appeal |
| `quality` | "Modern construction, low energy bills, no unexpected repairs. It just works." | Technical specs, Brand logos | Developer section |
| `community` | "Neighbors we actually want to know. Kids playing together. A real neighborhood." | Site plan, Lifestyle imagery | Community messaging |

### Secondary Outcomes

| ID | Outcome | Description |
|----|---------|-------------|
| `customize` | "We can choose finishes before it's built. Make it truly ours." | Customization options |
| `future-proof` | "Solar-ready, heat pump, efficient. Ready for the next 20 years." | Tech specs |
| `peaceful` | "Quiet neighborhood. No club noise. No tourist crowds." | Location benefits |

## 4.4 Objections (Prepare Responses)

Responses rewritten 2026-08-08. The old set argued; these concede first, then answer. Conceding the true part of an objection is what makes the answer credible — and this buyer can tell the difference.

| Objection | Response | Where to Address |
|-----------|----------|------------------|
| "That is a lot of money" | "It is. What we would say is that your rent is already about €18,000 a year and it buys you 70 m² and no garden. We are not going to tell you that makes the decision for you — but it is the number worth putting next to ours." | Pricing section, FAQ |
| "September 2026 is far away" | "It is nearly a year. That is long enough to sell a property, arrange financing without rushing it, and choose your own finishes — which you cannot do once a house is finished. If you need to move sooner, we would rather tell you now than in six months." | Timeline section, FAQ |
| "XI. District isn't central" | "It is not. It is six to eight minutes to Kelenföld M4 and about twenty to the centre. You are trading roughly fifteen minutes for a garden your children can be in without you watching the road." | Location section |
| "Only 6 units — what if they are all taken?" | "Then they are taken and we will tell you straight away. There is no phase two on this plot. We would rather you knew that than found out after a viewing." | Availability, FAQ |
| "How do we know the quality will be good?" | "You do not, from a website. So: 30 cm Silka party walls between the houses, 30 cm Wienerberger Porotherm outside, LEGRAND Valena fittings, a Westen Auriga heat pump, and the full specification in writing. Then ask us for addresses of buildings we finished five or six years ago and go and look at them." | Developer section |
| "We do not speak Hungarian and the purchase process looks complicated" | "It is manageable, and it is our job to make it so. The whole process runs in English, and we will tell you at the start which steps need a Hungarian lawyer and a tax number — not halfway through." | FAQ, Process section |

---

# 5. LANDING PAGE STRUCTURE

## 5.1 Page Architecture

```typescript
interface PageSection {
  id: string;
  component: string;
  priority: 'P0' | 'P1' | 'P2';
  aboveTheFold: boolean;
  estimatedHeight: string;
  purpose: string;
}

const pageStructure: PageSection[] = [
  {
    id: 'hero',
    component: 'HeroSection',
    priority: 'P0',
    aboveTheFold: true,
    estimatedHeight: '100vh',
    purpose: 'Hook attention, communicate core value prop, capture emails'
  },
  {
    id: 'trust-bar',
    component: 'TrustBar',
    priority: 'P0',
    aboveTheFold: true,
    estimatedHeight: '80px',
    purpose: 'Instant credibility (developer stats, brand logos)'
  },
  {
    id: 'problem-solution',
    component: 'ProblemSolution',
    priority: 'P0',
    aboveTheFold: false,
    estimatedHeight: '600px',
    purpose: 'Empathy — show you understand their pain'
  },
  {
    id: 'property-overview',
    component: 'PropertyOverview',
    priority: 'P0',
    aboveTheFold: false,
    estimatedHeight: '500px',
    purpose: 'Key facts and figures at a glance'
  },
  {
    id: 'gallery',
    component: 'ImageGallery',
    priority: 'P0',
    aboveTheFold: false,
    estimatedHeight: '700px',
    purpose: 'Visual proof — show the lifestyle'
  },
  {
    id: 'benefits',
    component: 'BenefitsGrid',
    priority: 'P0',
    aboveTheFold: false,
    estimatedHeight: '800px',
    purpose: 'Feature-benefit mapping with icons'
  },
  {
    id: 'floor-plans',
    component: 'FloorPlanViewer',
    priority: 'P0',
    aboveTheFold: false,
    estimatedHeight: '900px',
    purpose: 'Interactive unit comparison'
  },
  {
    id: 'location',
    component: 'LocationSection',
    priority: 'P0',
    aboveTheFold: false,
    estimatedHeight: '600px',
    purpose: 'Map, transport, neighborhood benefits'
  },
  {
    id: 'developer',
    component: 'DeveloperTrust',
    priority: 'P0',
    aboveTheFold: false,
    estimatedHeight: '500px',
    purpose: 'Credibility, track record, quality assurance'
  },
  {
    id: 'specifications',
    component: 'TechSpecs',
    priority: 'P1',
    aboveTheFold: false,
    estimatedHeight: '600px',
    purpose: 'Detailed technical information for serious buyers'
  },
  {
    id: 'pricing',
    component: 'PricingTable',
    priority: 'P0',
    aboveTheFold: false,
    estimatedHeight: '500px',
    purpose: 'Transparent pricing, unit comparison'
  },
  {
    id: 'process',
    component: 'PurchaseProcess',
    priority: 'P1',
    aboveTheFold: false,
    estimatedHeight: '400px',
    purpose: 'Demystify the buying process'
  },
  {
    id: 'faq',
    component: 'FAQAccordion',
    priority: 'P1',
    aboveTheFold: false,
    estimatedHeight: '600px',
    purpose: 'Handle remaining objections'
  },
  {
    id: 'lead-form',
    component: 'LeadCaptureForm',
    priority: 'P0',
    aboveTheFold: false,
    estimatedHeight: '500px',
    purpose: 'Primary conversion point'
  },
  {
    id: 'footer',
    component: 'Footer',
    priority: 'P0',
    aboveTheFold: false,
    estimatedHeight: '300px',
    purpose: 'Contact, legal, secondary navigation'
  }
];
```

## 5.2 Mobile vs Desktop Considerations

```yaml
mobile_first: true

breakpoints:
  mobile: "< 768px"
  tablet: "768px - 1024px"
  desktop: "> 1024px"

mobile_priorities:
  - "Hero must load in < 3 seconds on 4G"
  - "CTA button always visible (sticky on scroll)"
  - "Gallery uses swipe carousel"
  - "Floor plans zoomable/pinchable"
  - "Form fields large enough for thumb input"

desktop_enhancements:
  - "Hero video background option"
  - "Side-by-side unit comparisons"
  - "Hover states on gallery"
  - "Sticky navigation after scroll"
```

---

# 6. SECTION SPECIFICATIONS

## 6.1 Hero Section

### Requirements

```typescript
interface HeroSectionProps {
  backgroundImage: string;      // Full-width exterior render
  backgroundVideo?: string;     // Optional video (desktop only)
  headline: string;
  subheadline: string;
  ctaPrimary: {
    text: string;
    action: 'scroll-to-form' | 'open-modal';
  };
  ctaSecondary?: {
    text: string;
    action: string;
  };
  trustBadges?: string[];       // "6 units" | "102–317 m² garden" | "September 2026"
}
```

### Content Variants (A/B Test)

Rewritten 2026-08-08. The former variants leaned on "Awaits" and "Finally", and variant B quoted a garden range of 150–300 m² that does not match the architectural plans (the real range is 102.12–316.84 m²). See `§7.1` for the full rationale.

```typescript
const headlineVariants = {
  // A is the control. It names the one thing no competitor in the area can claim.
  A: "A real garden. Not a balcony.",
  // B leads with the number, for traffic that already knows the category.
  B: "317 m² of garden. Six houses. One of them is yours.",
  // C names the buyer's own sentence back to them.
  C: "Your apartment was fine before the children.",
  // D is the plain-spoken variant for retargeting, where trust matters more than hook.
  D: "Six townhouses in Budapest XI. Gardens from 102 to 317 m²."
};
```

**Subheadline:**

```
"Five rooms across two floors, a private garden, and a parking space behind 
a gate you open from the car. Twenty minutes from the centre of Budapest. 
Keys September 2026."
```

**Primary CTA:** "Book a viewing"
**Secondary CTA:** "See the six gardens"

### Visual Requirements

- Background: Hero exterior render (HERO-01) showing family in garden
- Overlay: Subtle dark gradient for text readability
- Mobile: Static image (no video)
- Desktop: Option for subtle video loop (drone fly-around)

## 6.2 Trust Bar

### Content

```typescript
const trustBarItems = [
  { icon: 'building', value: '50+', label: 'Completed Projects' },
  { icon: 'calendar', value: '13', label: 'Years Experience' },
  // ⚠️ UNVERIFIED — "100% On-Time Delivery" appears nowhere in the verified data
  // sections of this document; it originates in copy. On a €500k purchase this is
  // a claim with legal weight. Get written confirmation from S-Patrik Bau or cut it.
  { icon: 'shield', value: '100%', label: 'On-Time Delivery' },
  { icon: 'award', value: 'Premium', label: 'Materials' }
];

const brandLogos = [
  'wienerberger',
  'legrand',
  'veka',
  'siemens'
];
```

### Visual Requirements

- Background: Light grey or white
- Height: 80px desktop, 60px mobile
- Logos: Grayscale, hover for color

## 6.3 Problem-Solution Section

### Content Structure

```typescript
interface ProblemSolutionContent {
  sectionTitle: string;
  problems: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  transitionText: string;
  solutions: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

// Rewritten 2026-08-08. Was "Sound Familiar?" — a rhetorical question the reader
// can answer "no" to and leave. Titles now state the situation. Note that the
// icon field is retained in the data shape, but DESIGN.md bans icons in coloured
// circles: render these as numbered rows or plain text, not as an icon grid.
const content: ProblemSolutionContent = {
  sectionTitle: "Nobody plans to raise two children in seventy square metres.",
  problems: [
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
      icon: 'car-circle-xmark',
      title: 'Twenty minutes looking for a space',
      description: 'Then three streets to walk, with the shopping and both children.'
    },
    {
      icon: 'money-bill-wave',
      title: '€18,000 a year, and none of it is yours',
      description: 'At €1,500 a month you have paid for a good part of a house. Someone else owns it.'
    }
  ],
  transitionText: "Here is what the same week looks like in Spanyolrét.",
  solutions: [
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
  ]
};
```

## 6.4 Property Overview

### Content

```typescript
const propertyOverview = {
  title: "Spanyolrét Gardens at a Glance",
  stats: [
    { value: '6', label: 'Exclusive Townhouses', icon: 'home' },
    { value: '117m²', label: 'Internal Living Space', icon: 'expand' },
    { value: '102-317m²', label: 'Private Gardens', icon: 'tree' },
    { value: '5', label: 'Rooms per Unit', icon: 'door-open' },
    { value: '2', label: 'Full Bathrooms', icon: 'bath' },
    { value: 'Sept 2026', label: 'Turnkey Delivery', icon: 'calendar-check' }
  ],
  ctaText: "See All Units",
  ctaAction: "scroll-to-floor-plans"
};
```

## 6.5 Image Gallery

### Requirements

```typescript
interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'exterior' | 'interior' | 'garden' | 'lifestyle' | 'location';
  featured: boolean;
}

const galleryImages: GalleryImage[] = [
  { id: 'hero-ext', src: '/images/hero-exterior.jpg', alt: 'Spanyolrét Gardens exterior view', category: 'exterior', featured: true },
  { id: 'garden-life', src: '/images/garden-lifestyle.jpg', alt: 'Family enjoying private garden', category: 'lifestyle', featured: true },
  { id: 'aerial', src: '/images/aerial-site.jpg', alt: 'Aerial view of development', category: 'exterior', featured: false },
  { id: 'living', src: '/images/living-room.jpg', alt: 'Open plan living room', category: 'interior', featured: true },
  { id: 'kitchen', src: '/images/kitchen.jpg', alt: 'Modern kitchen', category: 'interior', featured: false },
  { id: 'bedroom', src: '/images/master-bedroom.jpg', alt: 'Master bedroom', category: 'interior', featured: false },
  { id: 'terrace', src: '/images/terrace.jpg', alt: 'Private terrace', category: 'garden', featured: false },
  { id: 'evening', src: '/images/evening-exterior.jpg', alt: 'Evening atmosphere', category: 'exterior', featured: true }
];
```

### Gallery Features

- Lightbox with zoom on click
- Filter by category
- Swipe on mobile
- Lazy loading
- Alt text for SEO

## 6.6 Benefits Grid

### Content

```typescript
const benefits = [
  {
    icon: 'heat',
    title: 'Heat Pump System',
    // ⚠️ "Energy class A" is UNVERIFIED — it appears only here, never in §3
    // Technical Specifications. Get the energy certificate before publishing a class.
    description: 'No gas bill, because there is no gas. A Westen Auriga heat pump runs the underfloor heating in winter and the cooling in summer.',
    highlight: 'Save €1,000+/year'
  },
  {
    icon: 'soundproof',
    title: '30cm Sound Insulation',
    description: 'Silka sound-insulating brick between units. You won\'t hear your neighbors.',
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
```

## 6.7 Floor Plans Section

### Requirements

```typescript
interface FloorPlanViewerProps {
  units: Unit[];
  defaultView: 'comparison' | 'single';
  features: {
    zoomable: boolean;
    downloadable: boolean;
    interactive: boolean;  // Click rooms for details
  };
}

// Floor plan images needed:
const floorPlanAssets = {
  groundFloor: '/plans/ground-floor.svg',
  firstFloor: '/plans/first-floor.svg',
  sitePlan: '/plans/site-plan.svg',
  unitComparison: '/plans/unit-comparison.svg'
};
```

### Comparison Table (within section)

```typescript
// Sorted smallest garden to largest, so the to-scale garden ribbon
// (DESIGN.md → Signature Patterns) reads as a rising line.
const unitComparison = {
  headers: ['Unit', 'Internal', 'Garden', 'Price', 'Status'],
  rows: [
    ['B2', '117.42 m²', '102.12 m²', 'On request', 'Available'],
    ['A2', '120.27 m²', '147.19 m²', 'On request', 'Available'],
    ['B1', '117.38 m²', '185.65 m²', 'On request', 'Available'],
    ['A1', '117.45 m²', '201.79 m²', 'On request', 'Available'],
    ['A3', '117.94 m²', '260.01 m²', 'On request', 'Available'],
    ['B3', '117.33 m²', '316.84 m²', 'On request', 'Available']
  ],
  note: 'Every unit has the same 6.60 m² terrace and one parking space. The garden is what changes — by more than three times between B2 and B3.'
};
```

## 6.8 Location Section

### Content

```typescript
const locationContent = {
  // Rewritten 2026-08-08. Was "Perfectly Positioned" / "The best of both worlds"
  // — both banned in §7.0. The replacement concedes the trade-off, which is what
  // makes the rest of the section believable.
  title: "Twenty minutes from the centre. None of the noise.",
  subtitle: "Spanyolrét is not central and we are not going to pretend otherwise. What you get for those extra fifteen minutes is a street where nothing happens.",
  address: "1110 Budapest, Spanyolréti út",
  mapCenter: { lat: 47.4584, lng: 19.0234 },
  
  transportLinks: [
    { icon: 'metro', name: 'Kelenföld M4 Metro', time: '6-8 min by bus' },
    { icon: 'bus', name: 'Bus lines 40, 40B, 88, 88A', time: '10 min walk' },
    { icon: 'car', name: 'City center', time: '15-20 min drive' },
    { icon: 'plane', name: 'Budapest Airport', time: '35 min drive' }
  ],
  
  nearbyAmenities: [
    { category: 'Schools', items: ['British International School (15 min)', 'American International School (20 min)', 'Local Hungarian schools (5-10 min)'] },
    { category: 'Shopping', items: ['Etele Plaza (10 min)', 'IKEA Budaörs (15 min)', 'Local shops (5 min walk)'] },
    { category: 'Healthcare', items: ['Szent Imre Hospital (10 min)', 'Private clinics nearby'] },
    { category: 'Recreation', items: ['Normafa hiking (15 min)', 'Bikás Park (10 min)', 'Danube riverfront (20 min)'] }
  ],
  
  neighborhoodHighlights: [
    'Quiet residential streets',
    'Low traffic area',
    'Established family neighborhood',
    'Green surroundings',
    'No competing new developments'
  ]
};
```

## 6.9 Developer Trust Section

### Content

```typescript
const developerContent = {
  title: "The people who will actually build it",
  subtitle: "S-Patrik Bau has been building in Budapest since 2012. Fifty-plus finished projects you can go and look at.",

  logo: '/images/s-patrik-bau-logo.svg',

  stats: [
    { value: '2012', label: 'Building since' },
    { value: '50+', label: 'Projects finished' },
    // ⚠️ UNVERIFIED, see §6.2 — confirm in writing with S-Patrik Bau or cut.
    { value: '100%', label: 'Delivered on time' },
    // Derive from the founding year at render time. Do NOT hardcode: the previous
    // version said "13", written in Dec 2025, and was already wrong by Aug 2026.
    { value: `${new Date().getFullYear() - 2012}`, label: 'Years building' }
  ],
  
  description: `S-Patrik Bau has been developing premium residential properties 
  in Budapest since 2012. With over 50 completed projects, we've built our 
  reputation on quality construction, premium materials, and on-time delivery. 
  Every Spanyolrét Gardens home is built with the same attention to detail 
  that has made us one of Budapest's most trusted developers.`,
  
  qualityPromises: [
    { icon: 'check', text: 'Premium European materials (Wienerberger, LEGRAND, VEKA)' },
    { icon: 'check', text: 'Full construction warranty' },
    { icon: 'check', text: 'Transparent pricing — no hidden costs' },
    { icon: 'check', text: 'Regular construction updates' },
    { icon: 'check', text: 'Dedicated English-speaking contact' }
  ],
  
  cta: {
    text: 'View Our Portfolio',
    link: '/portfolio'  // or external link
  }
};
```

## 6.10 Technical Specifications Section

### Content (Accordion or Tabs)

```typescript
const specsCategories = [
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
```

## 6.11 Pricing Section

### Content

```typescript
const pricingContent = {
  title: "What the price covers, and what it does not.",
  subtitle: "From 240,000,000 HUF: the house finished, the garden landscaped, one parking space. You get keys, not a shell. The gardens differ by more than three times between units, so the figure for the one you want comes from us directly.",

  // Order is deliberate: smallest garden to largest, so the ribbon reads as a
  // rising line. No "Best Value" badge — that is a judgement, not a fact, and
  // without published prices it is meaningless.
  units: [
    {
      id: 'B2',
      building: 'B',
      highlight: null,
      internal: '117.42 m²',
      garden: '102.12 m²',
      price: 'On request',
      features: ['5 rooms', '2 bathrooms', '1 parking space']
    },
    {
      id: 'A2',
      building: 'A',
      highlight: 'Largest interior',
      internal: '120.27 m²',
      garden: '147.19 m²',
      price: 'On request',
      features: ['5 rooms', '2 bathrooms', '1 parking space']
    },
    {
      id: 'B1',
      building: 'B',
      highlight: null,
      internal: '117.38 m²',
      garden: '185.65 m²',
      price: 'On request',
      features: ['5 rooms', '2 bathrooms', '1 parking space']
    },
    {
      id: 'A1',
      building: 'A',
      highlight: null,
      internal: '117.45 m²',
      garden: '201.79 m²',
      price: 'On request',
      features: ['5 rooms', '2 bathrooms', '1 parking space']
    },
    {
      id: 'A3',
      building: 'A',
      highlight: null,
      internal: '117.94 m²',
      garden: '260.01 m²',
      price: 'On request',
      features: ['5 rooms', '2 bathrooms', '1 parking space']
    },
    {
      id: 'B3',
      building: 'B',
      highlight: 'Largest garden',
      internal: '117.33 m²',
      garden: '316.84 m²',
      price: 'On request',
      features: ['5 rooms', '2 bathrooms', '1 parking space']
    }
  ],

  includedInPrice: [
    'Turnkey delivery — you get keys, not a shell',
    '1 dedicated parking space behind a remote-controlled gate',
    '6.6 m² terrace, porcelain tiles',
    'Landscaping done: hand-sown grass, paths, fencing',
    'Underfloor heating throughout, fan-coil cooling',
    'LEGRAND Valena switches and sockets',
    'All electrical and plumbing fixtures fitted'
  ],

  // CONFIRMED 2026-08-08: these are chargeable on top of the 240,000,000 HUF
  // anchor. That is why the anchor qualifier names what it covers instead of
  // claiming "everything included".
  optionalExtrasHeading: "Priced on top",
  optionalExtrasNote: "None of the below is in the 240,000,000 HUF figure. We list them here rather than at contract stage, because finding out later is how people end up feeling sold to.",
  optionalExtras: [
    { item: 'A second parking space', price: '4,000,000 HUF' },
    { item: 'Ceiling heating and cooling instead of underfloor', price: 'Quote on request' },
    { item: 'Motorised roller shutters', price: 'Quote on request' },
    { item: 'Solar panels', price: 'Quote on request' },
    { item: 'Garden irrigation (the pipework is already prepared)', price: 'Quote on request' }
  ],

  paymentNote: 'Payment schedule and financing are set out in the reservation documents. We will walk you through both before you commit to anything.'
};
```

## 6.12 Purchase Process Section

### Content

```typescript
const processSteps = [
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
    icon: 'file-signature'
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

const processReassurance = {
  title: 'We Guide You Through Every Step',
  points: [
    'English-speaking dedicated contact',
    'Bilingual contracts and documentation',
    'Recommended English-speaking lawyers and notaries',
    'Regular construction progress updates',
    'Transparent communication throughout'
  ]
};
```

## 6.13 FAQ Section

### Content

```typescript
const faqs = [
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
        // ⚠️ Was: "S-Patrik Bau has a 100% on-time delivery track record over 50+
        // projects." That figure is unverified (see §6.2) — do not restore it
        // without written confirmation from the developer.
        a: 'The contract sets out what happens if delivery slips, and those provisions are there to protect you, not us — read that clause before you sign anything. S-Patrik Bau has finished more than fifty projects since 2012; ask us for addresses and completion dates and check them yourself.'
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
        a: 'As a freehold townhouse owner, you'll have minimal common charges (shared driveway maintenance, bin collection area). No monthly management fees like apartments. Utility costs are your own.'
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
        a: 'Very safe. Spanyolrét is an established residential neighborhood with low crime rates. It's known for being quiet, family-friendly, and having good community spirit.'
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
```

## 6.14 Lead Capture Form

### Requirements

```typescript
interface LeadFormFields {
  // Required
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Optional but valuable
  currentLocation?: string;
  timeline?: 'immediately' | '3-6 months' | '6-12 months' | '12+ months';
  budget?: string;
  preferredUnit?: 'any' | 'smallest-garden' | 'largest-garden' | 'largest-interior';
  
  // Consent
  marketingConsent: boolean;
  privacyConsent: boolean;
}

const formContent = {
  title: "Come and stand in the garden",
  subtitle: "Bring the children. They will tell you more about 300 m² of grass than we can.",

  submitButton: "Book a viewing",

  afterSubmit: {
    // The old copy said "within 24 hours" while §1.3 sets first_contact at
    // < 5 minutes. Promising a day when you intend to call in minutes throws
    // away the one moment the buyer is paying attention. This wording is honest
    // in both cases and still beats the category by a wide margin.
    title: "We have it. Expect a call today.",
    message: "If you sent this during Budapest office hours, it will be within the hour. Outside them, first thing tomorrow. It will be a person, in English, and they will have your details in front of them.",
    cta: {
      text: "The full specification, while you wait",
      link: "/brochure.pdf"
    }
  },

  // ⚠️ "Your information is secure" is a claim about infrastructure, not a
  // privacy notice, and it is the kind of sentence that invites scrutiny it
  // cannot survive. Say what you do with the data instead.
  privacyNote: "We use this to contact you about Spanyolrét Gardens. We do not pass it to anyone else, and one email from you removes it."
};
```

### Form Validation

```typescript
const validation = {
  firstName: { required: true, minLength: 2 },
  lastName: { required: true, minLength: 2 },
  email: { required: true, pattern: 'email' },
  phone: { required: true, pattern: 'phone' },
  privacyConsent: { required: true }
};
```

## 6.15 Footer

### Content

```typescript
const footerContent = {
  contact: {
    title: 'Contact',
    phone: '+36 XX XXX XXXX',
    email: 'info@spanyolretgardens.hu',
    address: '1110 Budapest, Spanyolréti út'
  },
  
  developer: {
    title: 'Developer',
    name: 'S-Patrik Bau Kft.',
    registration: 'Company Reg: XX-XX-XXXXXX',
    website: 'www.s-patrikbau.hu'
  },
  
  legal: {
    links: [
      { text: 'Privacy Policy', href: '/privacy' },
      { text: 'Terms of Use', href: '/terms' },
      { text: 'Cookie Policy', href: '/cookies' }
    ]
  },
  
  social: {
    facebook: 'https://facebook.com/...',
    instagram: 'https://instagram.com/...',
    linkedin: 'https://linkedin.com/...'
  },
  
  copyright: '© 2025 S-Patrik Bau Kft. All rights reserved.'
};
```

---

# 7. COPY BANK

> **Rewritten 2026-08-08.** The previous version of this section is superseded in full. It leaned on category clichés ("Awaits", "The Best of Both Worlds", "Quality You Can Count On", "Stop Renting. Start Living.", "we don't just build homes — we build trust"), and it contained a garden range that contradicts the architectural plans. Every string below is written against `DESIGN.md`.

## 7.0 Voice

Read this before writing any new string. The rules are not stylistic preference; each one comes from something specific about this buyer.

**Who is reading.** A Western European or North American parent, 32–48, who has lived in Budapest a few years, works remotely or runs a regional office, and is currently paying €1,200–1,800 a month to a landlord for 60–80 m² with no outdoor space. They have two convictions in tension: the family needs to get out of that apartment, and Hungarian construction cannot be trusted. They are marketed at constantly and they are good at spotting it.

**The one thing they should remember:** a real garden, not a balcony.

Six rules:

1. **Numbers instead of adjectives.** "316.84 m²" does the work "generous" cannot. Every adjective in this document should be asked to justify itself against a number.
2. **Name the objection before they do.** A buyer afraid of shoddy building is disarmed by you raising it first. Copy that only sells is copy that sounds like it has something to hide.
3. **No verbs of longing.** No "awaits", "dream", "deserve", "imagine". They are not aspiring to a home; they are solving a problem in their actual week.
4. **Short sentences. Concrete nouns. Present tense.** "You open the gate from the car" — not "residents benefit from convenient automated access".
5. **Every claim traceable.** If a buyer asks "how do you know that?", there is an answer that is not "it's marketing". No superlatives that cannot be checked: no "most sought-after", no "unparalleled", no "the finest".
6. **No manufactured urgency.** Six units is real scarcity. Say the number. Anything beyond that reads as a tactic to exactly this reader and costs more trust than it buys attention.

**Banned constructions**, because they are the tells:
`X awaits` · `Stop X. Start Y.` · `we don't just X — we Y` · `The best of both worlds` · `Everything you need, nothing you don't` · `Finally:` · `Built for X` / `Designed for Y` · `The home your family deserves` · `Don't miss out` · `Sound familiar?` · exclamation marks in body copy.

## 7.1 Headlines

### Hero Headlines

```typescript
const heroHeadlines = [
  // Control. Names the single thing no competitor in Spanyolrét can claim, and
  // it is the buyer's own complaint from §4.2 turned around.
  "A real garden. Not a balcony.",

  // For traffic that already knows the category and wants the number.
  "317 m² of garden. Six houses. One of them is yours.",

  // Their sentence, said back to them. Highest empathy, lowest hype.
  "Your apartment was fine before the children.",

  // Plain-spoken variant for retargeting, where credibility beats hook.
  "Six townhouses in Budapest XI. Gardens from 102 to 317 m².",

  // For the quality-anxious segment. Leads with the fear, not the feature.
  "Ask us what is behind the walls. We wrote it down.",

  // Seasonal / delivery-led.
  "Keys in September 2026. Grass already sown."
];
```

The last one is only true if the landscaping schedule supports it — the spec commits to hand-sown grass, but confirm timing before using it.

### Section Headlines

```typescript
// First option in each array is the recommended one.
const sectionHeadlines = {
  problemSolution: [
    "Nobody plans to raise two children in seventy square metres.",
    "The screens are winning because there is nowhere else to go.",
    "You have counted what the rent adds up to."
  ],
  propertyOverview: [
    "Two buildings. Six houses. Six different gardens.",
    "What you are actually buying",
    "The whole thing, in numbers"
  ],
  benefits: [
    "The parts you only notice after you move in",
    "Built for a Tuesday, not for a viewing",
    "No gas. No street parking. No shared walls you can hear through."
  ],
  floorPlans: [
    "Same house six times. The garden is what changes.",
    "Where everyone ends up standing",
    "Five rooms, two floors, and a door to the grass"
  ],
  location: [
    "Twenty minutes from the centre. None of the noise.",
    "Spanyolrét is the part of the XI. locals keep to themselves",
    "Close enough to commute. Far enough to hear nothing."
  ],
  developer: [
    "The people who will actually build it",
    "Fifty finished projects you can go and look at",
    "Building in Budapest since 2012"
  ],
  pricing: [
    "One price. Nothing bolted on afterwards.",
    "What it costs, and what that includes",
    "The figure, and where it comes from"
  ],
  process: [
    "From this page to your keys",
    "What happens after you get in touch",
    "Four steps, and you can stop at any of them"
  ],
  faq: [
    "The questions people actually ask",
    "The awkward ones first",
    "What you are probably wondering"
  ],
  leadForm: [
    "Come and stand in the garden",
    "Book a viewing",
    "Ask us anything, including the price"
  ]
};
```

Notes on the recommended options:

- **problemSolution** — states the situation instead of asking "Sound Familiar?". A rhetorical question invites the reader to answer "no" and leave.
- **benefits** — "Built for a Tuesday, not for a viewing" is the one deliberately writerly line in the set. It earns its place because it inverts the whole category: everyone else optimises for the showing.
- **floorPlans** — "Same house six times" sounds like a weakness and is actually the strongest sentence on the page. It tells the buyer the only real decision is the garden, which is exactly where this development wins.
- **faq** — "The awkward ones first" is only usable if the FAQ genuinely opens with the hard questions (construction quality, foreign purchase, delay risk). If it opens with parking, use option one.
- **leadForm** — "Come and stand in the garden" converts because it describes a physical act, not a form submission.

## 7.2 Subheadlines

```typescript
const subheadlines = {
  hero: "Five rooms across two floors, a private garden, and a parking space behind a gate you open from the car. Twenty minutes from the centre of Budapest. Keys September 2026.",

  problemSolution: "You moved here for the work and it went well. Then the second child arrived, the home office became the corner of the bedroom, and you started parking three streets away.",

  benefits: "Thirty-centimetre party walls. No gas connection. A gate you open from the driver's seat. The things you stop thinking about once they are simply true.",

  location: "Six to eight minutes to the Kelenföld M4 by bus, then you are in the centre. Come home and the street is quiet.",
  
  developer: "S-Patrik Bau has been building in Budapest since 2012, with more than fifty finished projects. Ask us for addresses and go and look at them.",

  pricing: "From 240,000,000 HUF: the house finished, the garden landscaped, one parking space. Extras are priced separately and listed below, not buried in a contract.",

  leadForm: "One visit, no follow-up unless you ask for it. Bring the children, they will tell you more about the garden than we can."
};
```

## 7.3 Body Copy

### About the Development (Long)

```
Spanyolrét Gardens is six townhouses on one plot in the XI. District, in two 
buildings of three. Each house is the same: five rooms over two floors, 117 to 
120 m² inside, two bathrooms, a 6.6 m² terrace, one parking space.

What is not the same is the garden. They run from 102 m² to 316.84 m² — the 
largest is more than three times the smallest, which is why choosing a unit 
here is really choosing how much grass you want.

S-Patrik Bau has been building in Budapest since 2012 and has finished more 
than fifty projects. The walls between the houses are 30 cm of Silka 
sound-insulating brick, which is why you will not hear your neighbours; the 
outside walls are 30 cm Wienerberger Porotherm. There is no gas 
connection; a Westen Auriga heat pump runs underfloor heating in winter and 
cooling in summer. The switches are LEGRAND Valena. We are listing brands 
because you asked the question everyone in Hungary asks first, and a 
specification is a better answer than a promise.

Keys in September 2026. Six houses, and once they are gone there is no phase two.
```

### About the Location (Medium)

```
Spanyolrét is a quiet pocket of the XI. District. Tree-lined streets, houses 
that people have lived in for twenty years, and very little reason for anyone 
to drive through it.

The Kelenföld M4 station is six to eight minutes away by bus, and from there 
the centre is a short ride. International schools, shopping and green space 
are all within reach. That is the part you can check on a map.

The part you cannot check on a map is what the street sounds like at nine in 
the evening. Come and hear it before you decide anything.
```

> The previous version opened with "one of Budapest's most sought-after family neighborhoods" and then said "few outsiders discover" two lines later. Both cannot be true, and the first is not checkable. Removed.

### About the Developer (Short)

```
S-Patrik Bau has been building in Budapest since 2012 and has finished more 
than fifty projects. Ask us for addresses — several are a short drive from 
Spanyolrét, and standing in front of a building somebody has lived in for 
six years tells you more than anything on this page.
```

> Removed "we don't just build homes — we build trust" (the tell) and the "100% on-time delivery record" (unverified, see §6.2). The replacement makes a checkable offer instead of a claim, which is stronger for a buyer whose stated fear is construction quality.

## 7.4 Call-to-Action Copy

### Primary CTAs

```typescript
// Every primary CTA names a physical act or a specific thing received.
// "Request more information" is what a form does, not what a person wants.
const primaryCTAs = [
  "Book a viewing",          // recommended default, both locales
  "Come and see it",
  "Ask us the price",        // pairs with the price-on-request policy
  "Send me the floor plans",
  "Walk the plot with us"
];
```

### Secondary CTAs

```typescript
const secondaryCTAs = [
  "See the six gardens",     // recommended — points at the differentiator
  "Look at the floor plans",
  "Read the specification",  // for the quality-anxious segment
  "Where it is",
  "The awkward questions"     // links to FAQ
];
```

### Urgency CTAs

```typescript
// DELETED 2026-08-08. `DESIGN.md → Anti-Patterns` bans manufactured urgency,
// and this buyer reads it as a tactic. Six units is genuine scarcity: state the
// number in body copy and let it work on its own.
//
// Removed: "Only 6 Units — Reserve Yours Today", "Limited Availability —
// Schedule Now", "Don't Miss Out — Book a Viewing".
//
// If scarcity must be expressed in a CTA, the honest form is a fact, not a push:
const scarcityFacts = [
  "Four of six still available",   // only if kept accurate in real time
  "Six houses. No phase two."
];
```

## 7.5 Email Subject Lines (for follow-up sequences)

```typescript
const emailSubjects = {
  confirmation: [
    "Your Spanyolrét Gardens inquiry received",
    "Thank you for your interest in Spanyolrét Gardens"
  ],
  followUp1: [
    "Your floor plans for Spanyolrét Gardens",
    "[Name], here are the floor plans you requested"
  ],
  followUp2: [
    "A question about your family's needs",
    "Can I ask you something, [Name]?"
  ],
  viewingReminder: [
    "Looking forward to meeting you [Day]",
    "Your viewing at Spanyolrét Gardens — [Date]"
  ],
  nurture: [
    "Why families are choosing Spanyolrét Gardens",
    "The hidden cost of renting in Budapest",
    "What €500K buys you in Budapest (comparison)"
  ]
};
```

## 7.6 Social Proof Copy

### Testimonials — do not ship placeholders

```typescript
// DELETED 2026-08-08. The previous entries were invented quotes attributed to
// "The [Family Name]" and "[Name]". `DESIGN.md → Anti-Patterns` bans invented
// testimonials outright, and a placeholder quote is the single fastest way to
// lose a buyer who is already worried about being sold to.
//
// Nothing ships in this slot until a real buyer has given written permission,
// with their real name. Until then the section does not exist — an empty page
// is not a problem, a fabricated quote is.
const testimonials: Testimonial[] = [];
```

**The stronger substitute, available today.** This development has not sold a unit yet, so it has no buyers to quote. It does have fifty-plus finished projects. Social proof that is true right now:

- Addresses of completed S-Patrik Bau buildings near Spanyolrét, so a buyer can go and look at six-year-old workmanship themselves. Verifiable, and far more persuasive to this reader than a quote.
- The specification itself, published in full. Naming Wienerberger and LEGRAND Valena in writing is a claim the developer can be held to.
- The architect on record: JRT Stúdió Kft.

Offer the drive-past, not the quote. It costs nothing and it answers the actual objection.

---

# 8. VISUAL ASSETS

## 8.1 Required Images

### Exterior Renders

| ID | Description | Priority | Dimensions |
|----|-------------|----------|------------|
| EXT-01 | Hero front view with family | P0 | 1920×1080 (16:9) |
| EXT-02 | Building A front, clean architectural | P0 | 1920×1080 |
| EXT-03 | Building B front | P1 | 1920×1080 |
| EXT-04 | Aerial site view (both buildings) | P0 | 1920×1080 |
| EXT-05 | Garden rear view with lifestyle | P0 | 1920×1080 |
| EXT-06 | Evening/dusk atmosphere shot | P1 | 1920×1080 |
| EXT-07 | Street approach view | P2 | 1920×1080 |

### Interior Renders (When Ready)

| ID | Description | Priority | Dimensions |
|----|-------------|----------|------------|
| INT-01 | Open plan living-kitchen | P0 | 1920×1080 |
| INT-02 | Kitchen detail | P1 | 1920×1080 |
| INT-03 | Master bedroom | P1 | 1920×1080 |
| INT-04 | Children's bedroom | P2 | 1920×1080 |
| INT-05 | Bathroom | P2 | 1920×1080 |
| INT-06 | Home office | P1 | 1920×1080 |

### Lifestyle Renders

| ID | Description | Priority | Dimensions |
|----|-------------|----------|------------|
| LIFE-01 | Family BBQ in garden | P0 | 1920×1080 |
| LIFE-02 | Morning coffee on terrace | P1 | 1920×1080 |
| LIFE-03 | Kids playing on lawn | P1 | 1920×1080 |
| LIFE-04 | Couple evening on terrace | P2 | 1920×1080 |

### Floor Plans

| ID | Description | Format |
|----|-------------|--------|
| FP-01 | Ground floor plan | SVG + PNG |
| FP-02 | First floor plan | SVG + PNG |
| FP-03 | Site plan (all units) | SVG + PNG |
| FP-04 | Unit comparison diagram | SVG + PNG |

### Other Assets

| ID | Description | Format |
|----|-------------|--------|
| LOGO-01 | S-Patrik Bau logo | SVG |
| LOGO-02 | Spanyolrét Gardens logo | SVG |
| BRAND-01 | Wienerberger logo | SVG/PNG |
| BRAND-02 | LEGRAND logo | SVG/PNG |
| BRAND-03 | VEKA logo | SVG/PNG |
| BRAND-04 | SIEMENS logo | SVG/PNG |
| MAP-01 | Location map | Interactive (Google Maps embed) |
| ICON-SET | Custom icon set | SVG |

## 8.2 Image Specifications

```yaml
hero_images:
  format: "WebP with JPEG fallback"
  dimensions: "1920×1080 (desktop), 1080×1920 (mobile)"
  max_file_size: "200KB optimized"
  quality: "85%"

gallery_images:
  format: "WebP with JPEG fallback"
  dimensions: "1600×900"
  thumbnails: "400×225"
  max_file_size: "150KB optimized"

floor_plans:
  format: "SVG (interactive), PNG (download)"
  dimensions: "Scalable, min 2000px wide for PNG"
  
logos:
  format: "SVG"
  variations: "Color, White, Black"
```

## 8.3 Visual Style Guide (for renders)

### Color Palette

```yaml
architecture:
  facade: "#F5F5F0 (warm white)"
  window_frames: "#383E42 (anthracite grey)"
  wood_cladding: "#8B7355 to #B8956B (natural oak)"
  roof_edge: "#4A4D4F (dark grey)"
  terrace_tiles: "#A69F95 (warm grey)"

landscaping:
  grass: "#4A7C23 (healthy green)"
  paths: "#6B6B6B (London grey)"
  hedges: "#2D5016 (deep green)"

sky:
  day: "#87CEEB (summer blue)"
  golden_hour: "#FFD700 gradient to #87CEEB"
  dusk: "#1B3B6F to #2C3E50"
```

### Photography Style

```yaml
lighting:
  preferred: "Golden hour (4-5pm summer)"
  alternative: "Soft overcast for details"
  interior: "Natural daylight through windows"

mood:
  overall: "Warm, inviting, aspirational but attainable"
  family: "Authentic moments, not staged catalog poses"
  architecture: "Clean, premium, European contemporary"

people:
  family_composition: "Father (37), Mother (34), Daughter (8), Son (5)"
  style: "European casual, no logos, natural poses"
  activities: "BBQ, playing, relaxing, coffee on terrace"
```

---

# 9. LEAD CAPTURE & SALES PROCESS

## 9.1 Lead Form Strategy

### Form Fields (Tiered)

```typescript
// Minimum (for maximum conversion)
const minimalForm = {
  fields: ['firstName', 'email', 'phone'],
  conversionTarget: '30%+'
};

// Standard (recommended)
const standardForm = {
  fields: ['firstName', 'lastName', 'email', 'phone', 'timeline'],
  conversionTarget: '20-25%'
};

// Qualified (for serious buyers)
const qualifiedForm = {
  fields: ['firstName', 'lastName', 'email', 'phone', 'timeline', 'budget', 'currentSituation'],
  conversionTarget: '15-20%'
};
```

### Lead Scoring

```typescript
interface LeadScore {
  timeline: {
    'immediately': 30,
    '3-6 months': 25,
    '6-12 months': 15,
    '12+ months': 5
  };
  budget: {
    'matches': 25,
    'close': 15,
    'unclear': 10,
    'too_low': 0
  };
  engagement: {
    'downloaded_brochure': 10,
    'viewed_floor_plans': 10,
    'spent_5min_on_site': 5,
    'returned_visitor': 15
  };
}

// Lead temperature thresholds
const leadTemperature = {
  hot: 60,      // ≥60 points: Immediate priority
  warm: 35,     // 35-59 points: Active nurture
  cold: 0       // <35 points: Long-term nurture
};
```

## 9.2 Lead Response Protocol

### Speed to Lead

```yaml
response_targets:
  form_submission: "< 5 minutes (business hours)"
  after_hours: "< 30 minutes automated, human within 12 hours"
  
first_contact:
  method: "Phone call (preferred) or WhatsApp"
  fallback: "Email if no phone answer after 2 attempts"
  
tone: "Consultative, helpful, no pressure"
```

### First Contact Script

```markdown
## Phone Script (First Contact)

"Hi [Name], this is [Agent] from Spanyolrét Gardens. You recently 
requested information about our townhouses. Is now a good time to chat 
for a few minutes?

[If yes]
Great! I'd love to learn a bit about what you're looking for, and I can 
answer any questions you have. 

First — what prompted you to look at Spanyolrét Gardens? Are you 
currently renting or do you own somewhere?

[Listen, take notes, build rapport]

Based on what you've told me, I think a site visit would be really 
valuable. You can see the construction progress, get a feel for the 
neighborhood, and we can walk through the floor plans in detail. 

How does [specific day/time] work for you?

[If not now]
No problem! When would be a better time for a quick 10-minute call? 
I want to make sure we can answer all your questions properly."
```

## 9.3 Sales Funnel Stages

```typescript
const funnelStages = [
  {
    stage: 1,
    name: 'Lead Captured',
    trigger: 'Form submission',
    actions: ['Auto-email confirmation', 'Add to CRM', 'Assign to sales'],
    target_conversion: '100%'
  },
  {
    stage: 2,
    name: 'First Contact',
    trigger: 'Phone/WhatsApp contact made',
    actions: ['Qualify interest', 'Answer questions', 'Book consultation'],
    target_conversion: '60%'
  },
  {
    stage: 3,
    name: 'Consultation Booked',
    trigger: 'Calendar appointment confirmed',
    actions: ['Send calendar invite', 'Reminder sequence', 'Prepare materials'],
    target_conversion: '50%'
  },
  {
    stage: 4,
    name: 'Site Visit Completed',
    trigger: 'In-person meeting at site',
    actions: ['Tour site', 'Review units', 'Discuss customization'],
    target_conversion: '40%'
  },
  {
    stage: 5,
    name: 'Reservation',
    trigger: 'Deposit paid, unit reserved',
    actions: ['Contract preparation', 'Legal process initiation'],
    target_conversion: '30%'
  },
  {
    stage: 6,
    name: 'Sale Complete',
    trigger: 'Full contract signed with notary',
    actions: ['Construction updates', 'Customization finalization'],
    target_conversion: '95%'
  }
];
```

## 9.4 Qualification Questions

### Discovery Call Questions

```typescript
const qualificationQuestions = [
  {
    category: 'Situation',
    questions: [
      "Are you currently renting or do you own?",
      "How long have you been in Budapest?",
      "What's your current living situation like?",
      "How many people in your household?"
    ]
  },
  {
    category: 'Motivation',
    questions: [
      "What prompted you to start looking at properties?",
      "What would an ideal home look like for your family?",
      "How important is having a garden/outdoor space?",
      "What do you like/dislike about your current place?"
    ]
  },
  {
    category: 'Timeline',
    questions: [
      "When would you ideally like to move?",
      "Are you flexible on timing?",
      "Is September 2026 a realistic timeline for you?",
      "Any major life events coming up (school year, job change)?"
    ]
  },
  {
    category: 'Budget',
    questions: [
      "Have you set a budget for your property search?",
      "Will you be financing or purchasing outright?",
      "Have you spoken with a mortgage broker?",
      "Are you aware of the full costs involved (taxes, notary, etc.)?"
    ]
  },
  {
    category: 'Decision',
    questions: [
      "Who else is involved in this decision?",
      "What would make you say 'yes' to a property?",
      "What are your biggest concerns about buying in Hungary?",
      "Have you looked at other properties? What did you think?"
    ]
  }
];
```

---

# 10. TECHNICAL REQUIREMENTS

## 10.1 Technology Stack

```yaml
frontend:
  framework: "Next.js 14"
  language: "TypeScript"
  styling: "Tailwind CSS"
  animations: "Framer Motion"
  forms: "React Hook Form + Zod validation"
  
hosting:
  platform: "Vercel (recommended)"
  cdn: "Vercel Edge Network"
  domain: "spanyolretgardens.hu / spanyolretgardens.com"
  ssl: "Auto (Let's Encrypt)"

analytics:
  primary: "Google Analytics 4"
  heatmaps: "Hotjar or Microsoft Clarity"
  tracking: "Facebook Pixel, Google Ads conversion"

crm_integration:
  options: ["HubSpot", "Pipedrive", "Custom webhook"]
  
performance:
  target_lcp: "< 2.5s"
  target_fid: "< 100ms"
  target_cls: "< 0.1"
  lighthouse_score: "> 90"
```

## 10.2 Page Requirements

```yaml
responsive:
  breakpoints:
    mobile: "< 768px"
    tablet: "768px - 1024px"
    desktop: "> 1024px"
  mobile_first: true

accessibility:
  target: "WCAG 2.1 AA"
  requirements:
    - "Alt text on all images"
    - "Keyboard navigable"
    - "Color contrast ratio 4.5:1+"
    - "Focus indicators visible"
    - "Screen reader compatible"

i18n:
  primary: "English"
  secondary: "Hungarian"
  implementation: "next-intl or similar"
  url_structure: "/en/... and /hu/..."

seo:
  meta_tags: "Full OpenGraph and Twitter Cards"
  structured_data: "JSON-LD for RealEstateAgent, Product"
  sitemap: "Auto-generated"
  robots: "Index, follow (production)"
```

## 10.3 Form Integration

```typescript
// Form submission handler
interface FormSubmission {
  endpoint: '/api/lead';
  method: 'POST';
  payload: LeadFormFields;
  
  integrations: {
    crm: {
      platform: 'HubSpot' | 'Pipedrive' | 'Webhook';
      createContact: true;
      createDeal: true;
    };
    email: {
      provider: 'SendGrid' | 'Mailgun' | 'Resend';
      confirmationTemplate: 'lead-confirmation';
      notificationTo: 'sales@spanyolretgardens.hu';
    };
    analytics: {
      trackConversion: true;
      eventName: 'lead_form_submission';
    };
  };
  
  response: {
    success: { redirect: '/thank-you' | 'show-confirmation' };
    error: { showMessage: true; retry: true };
  };
}
```

---

# 11. SEO & ANALYTICS

## 11.1 SEO Strategy

### Target Keywords

```yaml
primary_keywords:
  - "new build townhouse Budapest"
  - "townhouse with garden Budapest"
  - "family home Budapest"
  - "expat property Budapest"
  - "property for sale XI district"

secondary_keywords:
  - "Spanyolrét property"
  - "Budapest new development"
  - "buy house Budapest foreigner"
  - "premium property Budapest"
  - "townhouse Hungary"

long_tail_keywords:
  - "new build townhouse with garden Budapest expat"
  - "family home for sale Budapest XI district"
  - "buy property in Budapest as foreigner"
  - "modern townhouse development Budapest 2026"
```

### On-Page SEO

```yaml
# Rewritten 2026-08-08. The old description quoted "From €480K", now superseded
# by the turnkey anchor, and led with "exclusive" — a word that costs a
# character and says nothing. Lead with the garden, because that is the search
# intent nobody else in the district can satisfy.
title_tag: "Spanyolrét Gardens | Townhouses with 102–317 m² private gardens | Budapest XI."
meta_description: "Six new-build townhouses in Budapest's XI. District. Five rooms, 117 m² inside, and a private garden of 102 to 317 m² — not a balcony. Turnkey from 240M HUF, landscaping and parking included. Keys September 2026."

h1: "A real garden. Not a balcony."

# The h1 must match the hero headline shipped in production. If A/B testing
# changes the hero (see §6.1), change this too — a page whose h1 disagrees with
# its own headline is a ranking and a trust problem.

url_structure:
  home: "/"
  units: "/units"
  location: "/location"
  developer: "/about"
  contact: "/contact"
  faq: "/faq"
  privacy: "/privacy"
```

### Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Spanyolrét Gardens",
  "description": "Premium new-build townhouses with private gardens in Budapest XI district",
  "url": "https://spanyolretgardens.hu",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Spanyolréti út",
    "addressLocality": "Budapest",
    "postalCode": "1110",
    "addressCountry": "HU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "47.4584",
    "longitude": "19.0234"
  },
  "makesOffer": {
    "@type": "Offer",
    "itemOffered": {
      "@type": "House",
      "name": "Spanyolrét Gardens Townhouse",
      "numberOfRooms": 5,
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": 117,
        "unitCode": "MTK"
      }
    },
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "HUF",
      "minPrice": "240000000",
      "valueAddedTaxIncluded": true,
      "description": "From 240,000,000 HUF: turnkey delivery, full landscaping and one parking space included. Optional extras are priced separately. Per-unit pricing on request."
    }
  }
}
```

> **Structured data publishes prices even when the page does not.** The former block declared `price: 195000000` with a `195M–225M` range — Google surfaces those figures in rich results, so leaving them here would have leaked exactly what the pricing policy forbids while the visible page said "on request". Only `minPrice` is declared now, set to the public anchor. Do not add `maxPrice` or per-unit `Offer` entries.

## 11.2 Analytics Setup

### Conversion Tracking

```typescript
const conversionEvents = [
  {
    name: 'lead_form_submission',
    trigger: 'Form successfully submitted',
    value: 100,
    platforms: ['GA4', 'Facebook Pixel', 'Google Ads']
  },
  {
    name: 'brochure_download',
    trigger: 'PDF download clicked',
    value: 25,
    platforms: ['GA4', 'Facebook Pixel']
  },
  {
    name: 'phone_click',
    trigger: 'Click-to-call on mobile',
    value: 50,
    platforms: ['GA4', 'Google Ads']
  },
  {
    name: 'email_click',
    trigger: 'Email link clicked',
    value: 30,
    platforms: ['GA4']
  },
  {
    name: 'floor_plan_view',
    trigger: 'Floor plan section viewed for 10s+',
    value: 15,
    platforms: ['GA4']
  },
  {
    name: 'gallery_engagement',
    trigger: '3+ gallery images viewed',
    value: 10,
    platforms: ['GA4']
  }
];
```

### Custom Dimensions

```typescript
const customDimensions = {
  user_language: 'en | hu',
  traffic_source: 'organic | paid | social | direct | referral',
  device_category: 'mobile | tablet | desktop',
  preferred_unit: 'A1 | A2 | A3 | B1 | B2 | B3 | not_selected',
  stated_timeline: 'immediate | 3-6m | 6-12m | 12m+',
  returning_visitor: 'true | false'
};
```

---

# 12. IMPLEMENTATION CHECKLIST

## 12.1 Phase 1: Foundation (Week 1-2)

```yaml
setup:
  - [ ] Domain registration and DNS setup
  - [ ] Next.js project initialization
  - [ ] Tailwind CSS configuration
  - [ ] Git repository setup
  - [ ] Vercel deployment pipeline
  - [ ] Development/staging/production environments

design_system:
  - [ ] Color palette implementation
  - [ ] Typography scale
  - [ ] Spacing system
  - [ ] Component library foundation
  - [ ] Responsive breakpoints

content:
  - [ ] Copy finalized for all sections
  - [ ] Placeholder images in place
  - [ ] Floor plan SVGs prepared
  - [ ] Logo and brand assets
```

## 12.2 Phase 2: Core Pages (Week 2-3)

```yaml
hero_section:
  - [ ] Background image optimization
  - [ ] Responsive headline/subheadline
  - [ ] CTA buttons functional
  - [ ] Mobile layout tested

main_sections:
  - [ ] Trust bar with logos
  - [ ] Problem/solution section
  - [ ] Property overview
  - [ ] Image gallery with lightbox
  - [ ] Benefits grid
  - [ ] Floor plan viewer

secondary_sections:
  - [ ] Location map integration
  - [ ] Developer trust section
  - [ ] Technical specifications
  - [ ] Pricing table
  - [ ] Purchase process
  - [ ] FAQ accordion
  - [ ] Footer
```

## 12.3 Phase 3: Functionality (Week 3-4)

```yaml
lead_capture:
  - [ ] Form component built
  - [ ] Validation implemented
  - [ ] API endpoint created
  - [ ] CRM integration
  - [ ] Email notifications
  - [ ] Thank you page/modal
  - [ ] Error handling

analytics:
  - [ ] GA4 setup
  - [ ] Conversion tracking
  - [ ] Facebook Pixel
  - [ ] Custom events
  - [ ] Testing verified

performance:
  - [ ] Image optimization
  - [ ] Lazy loading
  - [ ] Code splitting
  - [ ] Lighthouse audit
  - [ ] Mobile performance
```

## 12.4 Phase 4: Polish & Launch (Week 4-5)

```yaml
testing:
  - [ ] Cross-browser testing
  - [ ] Mobile device testing
  - [ ] Form submission testing
  - [ ] Analytics verification
  - [ ] Load testing
  - [ ] Accessibility audit

seo:
  - [ ] Meta tags all pages
  - [ ] Structured data
  - [ ] Sitemap generated
  - [ ] Robots.txt
  - [ ] OpenGraph images

launch:
  - [ ] Final content review
  - [ ] Client approval
  - [ ] DNS switch to production
  - [ ] SSL verification
  - [ ] Monitoring setup
  - [ ] Backup procedures
```

## 12.5 Post-Launch

```yaml
week_1:
  - [ ] Monitor analytics daily
  - [ ] Check form submissions
  - [ ] Fix any bugs
  - [ ] Gather initial feedback

ongoing:
  - [ ] A/B testing headlines
  - [ ] Conversion optimization
  - [ ] Content updates
  - [ ] Monthly performance review
  - [ ] Update unit availability status
```

---

# APPENDIX

## A. File Structure

```
/spanyolret-gardens
├── /app
│   ├── /[locale]
│   │   ├── page.tsx           # Landing page
│   │   ├── /units
│   │   ├── /location
│   │   ├── /about
│   │   ├── /contact
│   │   ├── /thank-you
│   │   └── layout.tsx
│   ├── /api
│   │   └── /lead
│   │       └── route.ts       # Form submission handler
│   └── layout.tsx
├── /components
│   ├── /sections
│   │   ├── Hero.tsx
│   │   ├── TrustBar.tsx
│   │   ├── ProblemSolution.tsx
│   │   ├── PropertyOverview.tsx
│   │   ├── Gallery.tsx
│   │   ├── Benefits.tsx
│   │   ├── FloorPlans.tsx
│   │   ├── Location.tsx
│   │   ├── Developer.tsx
│   │   ├── Specs.tsx
│   │   ├── Pricing.tsx
│   │   ├── Process.tsx
│   │   ├── FAQ.tsx
│   │   ├── LeadForm.tsx
│   │   └── Footer.tsx
│   └── /ui
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       └── ...
├── /lib
│   ├── data.ts               # Unit data, content
│   ├── utils.ts
│   └── analytics.ts
├── /public
│   ├── /images
│   ├── /plans
│   └── /fonts
├── /styles
│   └── globals.css
├── tailwind.config.ts
├── next.config.js
└── package.json
```

## B. Environment Variables

```env
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXX

# CRM
HUBSPOT_API_KEY=xxx
PIPEDRIVE_API_KEY=xxx

# Email
SENDGRID_API_KEY=xxx
EMAIL_FROM=noreply@spanyolretgardens.hu
EMAIL_SALES=sales@spanyolretgardens.hu

# Maps
NEXT_PUBLIC_GOOGLE_MAPS_KEY=xxx
```

## C. Contact Information

```yaml
project_contact:
  sales_email: "sales@spanyolretgardens.hu"
  sales_phone: "+36 XX XXX XXXX"
  
developer_contact:
  company: "S-Patrik Bau Kft."
  website: "www.s-patrikbau.hu"
```

---

**Document Version:** 2.0  
**Last Updated:** December 2025  
**Author:** Synphos Studio  
**Client:** S-Patrik Bau Kft.

---

*This PRD contains all information necessary to build the Spanyolrét Gardens landing page. For questions or clarifications, contact the project lead.*
