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
  range_huf: "195,000,000 - 225,000,000 HUF"
  range_eur: "~€480,000 - €555,000"
  additional_parking: "4,000,000 HUF"
```

## 2.2 Unit Data (CORRECTED from Architectural Plans)

### Building A (West Side)

| Unit | Internal Area | Ground Floor | First Floor | Terrace | Garden | Price (HUF) |
|------|---------------|--------------|-------------|---------|--------|-------------|
| A1 | 117.45 m² | 58.17 m² | 59.28 m² | 6.60 m² | 201.79 m² | 195,000,000 |
| A2 | 120.27 m² | 59.70 m² | 60.57 m² | 6.60 m² | 147.19 m² | 205,000,000 |
| A3 | 117.94 m² | 58.50 m² | 59.44 m² | 6.60 m² | 260.01 m² | 215,000,000 |

### Building B (East Side)

| Unit | Internal Area | Ground Floor | First Floor | Terrace | Garden | Price (HUF) |
|------|---------------|--------------|-------------|---------|--------|-------------|
| B1 | 117.38 m² | 58.11 m² | 59.27 m² | 6.60 m² | 185.65 m² | 205,000,000 |
| B2 | 117.42 m² | 58.04 m² | 59.38 m² | 6.60 m² | 102.12 m² | 195,000,000 |
| B3 | 117.33 m² | 57.95 m² | 59.38 m² | 6.60 m² | 316.84 m² | 225,000,000 |

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
  price: number;
  priceEur: number;
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
    price: 215000000,
    priceEur: 530000,
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
    price: 225000000,
    priceEur: 555000,
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

| Objection | Response | Where to Address |
|-----------|----------|------------------|
| "€500K is a lot of money" | "Compare to 10 years of rent (€180K) plus the appreciation in Budapest property. You're building wealth, not paying a landlord." | Pricing section, FAQ |
| "September 2026 is far away" | "This gives you time to sell existing property, arrange financing, and choose your finishes. Plus you lock in today's price." | Timeline section, FAQ |
| "XI. District isn't central" | "6-8 minutes to Kelenföld M4 Metro. 20 minutes to city center. But you get space, quiet, and a garden." | Location section |
| "Only 6 units — what if they're all taken?" | "Exactly. Limited supply in a market with high demand. That's why we recommend scheduling a viewing now." | Urgency elements |
| "How do we know the quality will be good?" | "50+ completed projects since 2012. Premium materials (Wienerberger, LEGRAND). 30cm sound-insulating party walls." | Developer section |

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
  trustBadges?: string[];       // "6 Units" | "From €480K" | "Sept 2026"
}
```

### Content Variants (A/B Test)

**Headline Options:**

```typescript
const headlineVariants = {
  A: "Your Family's Private Garden Awaits in Budapest",
  B: "117m² Townhouse. 150-300m² Garden. Only 6 Units.",
  C: "Finally: Space for Your Growing Family in Budapest",
  D: "New-Build Townhouses with Private Gardens. Delivery September 2026."
};
```

**Subheadline:**

```
"Premium 5-room townhouses in Spanyolrét with gardens up to 317m², 
underfloor heating, and dedicated parking. From 195M HUF."
```

**Primary CTA:** "Schedule a Private Viewing"  
**Secondary CTA:** "Download Floor Plans"

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

const content: ProblemSolutionContent = {
  sectionTitle: "Sound Familiar?",
  problems: [
    {
      icon: 'compress',
      title: 'Outgrowing Your Space',
      description: 'Kids sharing rooms. Work calls from the bedroom. Toys everywhere.'
    },
    {
      icon: 'tree-slash',
      title: 'No Outdoor Space',
      description: 'A balcony isn\'t enough. The kids need grass, fresh air, room to play.'
    },
    {
      icon: 'car-circle-xmark',
      title: 'Parking Nightmares',
      description: 'Circling blocks. Street parking. Carrying groceries three streets.'
    },
    {
      icon: 'money-bill-wave',
      title: 'Rent Going Nowhere',
      description: '€1,500/month to a landlord. €18,000/year not building any equity.'
    }
  ],
  transitionText: "There's a better way.",
  solutions: [
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
      description: 'Own premium property in a growing market. Stop paying someone else\'s mortgage.'
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
    description: 'No gas bills. Westen Auriga heat pump with underfloor heating and cooling. Energy class A.',
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
const unitComparison = {
  headers: ['Unit', 'Internal', 'Garden', 'Price', 'Status'],
  rows: [
    ['A1', '117.45 m²', '201.79 m²', '195M HUF', 'Available'],
    ['A2', '120.27 m²', '147.19 m²', '205M HUF', 'Available'],
    ['A3', '117.94 m²', '260.01 m²', '215M HUF', 'Available'],
    ['B1', '117.38 m²', '185.65 m²', '205M HUF', 'Available'],
    ['B2', '117.42 m²', '102.12 m²', '195M HUF', 'Available'],
    ['B3', '117.33 m²', '316.84 m²', '225M HUF', 'Available']
  ],
  note: 'All units include 6.60 m² terrace and 1 parking space'
};
```

## 6.8 Location Section

### Content

```typescript
const locationContent = {
  title: "Perfectly Positioned",
  subtitle: "The best of both worlds: city access with suburban peace",
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
  title: "Built by S-Patrik Bau",
  subtitle: "13 Years of Premium Construction in Budapest",
  
  logo: '/images/s-patrik-bau-logo.svg',
  
  stats: [
    { value: '2012', label: 'Established' },
    { value: '50+', label: 'Projects Completed' },
    { value: '100%', label: 'On-Time Delivery' },
    { value: '13', label: 'Years Experience' }
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
  title: "Transparent Pricing",
  subtitle: "6 unique units, priced according to size and garden",
  
  units: [
    {
      id: 'B2',
      building: 'B',
      highlight: 'Best Value',
      internal: '117.42 m²',
      garden: '102.12 m²',
      price: '195,000,000 HUF',
      priceEur: '~€480,000',
      features: ['5 rooms', '2 bathrooms', '1 parking', 'Compact garden']
    },
    {
      id: 'A1',
      building: 'A',
      highlight: null,
      internal: '117.45 m²',
      garden: '201.79 m²',
      price: '195,000,000 HUF',
      priceEur: '~€480,000',
      features: ['5 rooms', '2 bathrooms', '1 parking', 'Large garden']
    },
    {
      id: 'A2',
      building: 'A',
      highlight: 'Largest Interior',
      internal: '120.27 m²',
      garden: '147.19 m²',
      price: '205,000,000 HUF',
      priceEur: '~€505,000',
      features: ['5 rooms', '2 bathrooms', '1 parking', 'Extra 3m² inside']
    },
    {
      id: 'B1',
      building: 'B',
      highlight: null,
      internal: '117.38 m²',
      garden: '185.65 m²',
      price: '205,000,000 HUF',
      priceEur: '~€505,000',
      features: ['5 rooms', '2 bathrooms', '1 parking', 'Large garden']
    },
    {
      id: 'A3',
      building: 'A',
      highlight: null,
      internal: '117.94 m²',
      garden: '260.01 m²',
      price: '215,000,000 HUF',
      priceEur: '~€530,000',
      features: ['5 rooms', '2 bathrooms', '1 parking', 'XL garden']
    },
    {
      id: 'B3',
      building: 'B',
      highlight: 'Largest Garden',
      internal: '117.33 m²',
      garden: '316.84 m²',
      price: '225,000,000 HUF',
      priceEur: '~€555,000',
      features: ['5 rooms', '2 bathrooms', '1 parking', '317m² garden!']
    }
  ],
  
  includedInPrice: [
    'Turnkey delivery (move-in ready)',
    '1 dedicated parking space',
    '6.6 m² terrace with porcelain tiles',
    'Full landscaping (grass, paths, fencing)',
    'All electrical and plumbing fixtures',
    'LEGRAND switches and sockets',
    'Underfloor heating system',
    'Fan-coil cooling units'
  ],
  
  optionalExtras: [
    { item: 'Additional parking space', price: '4,000,000 HUF' },
    { item: 'Ceiling heating-cooling upgrade', price: 'Quote on request' },
    { item: 'Roller shutters (motorized)', price: 'Quote on request' },
    { item: 'Solar panel installation', price: 'Quote on request' },
    { item: 'Garden irrigation system', price: 'Quote on request' }
  ],
  
  paymentNote: 'Payment schedule and financing options discussed during consultation'
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
  title: "Ready to See Your Future Home?",
  subtitle: "Schedule a private consultation with our team",
  
  submitButton: "Request a Viewing",
  
  afterSubmit: {
    title: "Thank You!",
    message: "We'll contact you within 24 hours to schedule your consultation.",
    cta: {
      text: "Download the Brochure Now",
      link: "/brochure.pdf"
    }
  },
  
  privacyNote: "Your information is secure and will only be used to contact you about Spanyolrét Gardens."
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

## 7.1 Headlines

### Hero Headlines

```typescript
const heroHeadlines = [
  "Your Family's Private Garden Awaits in Budapest",
  "117m² Townhouse. Up to 317m² Garden. Only 6 Units.",
  "Finally: Space for Your Growing Family in Budapest",
  "New-Build Townhouses with Private Gardens — September 2026",
  "The Home Your Family Deserves. The Garden They'll Love.",
  "Stop Renting. Start Living. Spanyolrét Gardens."
];
```

### Section Headlines

```typescript
const sectionHeadlines = {
  problemSolution: [
    "Sound Familiar?",
    "Outgrowing Your Space?",
    "Ready for More?"
  ],
  propertyOverview: [
    "Spanyolrét Gardens at a Glance",
    "Your Future Home",
    "The Details That Matter"
  ],
  benefits: [
    "Built for Modern Family Life",
    "Premium Features, Thoughtful Design",
    "Everything You Need, Nothing You Don't"
  ],
  floorPlans: [
    "Choose Your Perfect Unit",
    "6 Unique Homes, One Exceptional Standard",
    "Designed for How You Actually Live"
  ],
  location: [
    "Perfectly Positioned",
    "City Access, Suburban Peace",
    "The Best of Both Worlds"
  ],
  developer: [
    "Built by S-Patrik Bau",
    "13 Years of Trust",
    "Quality You Can Count On"
  ],
  pricing: [
    "Transparent Pricing",
    "Your Investment",
    "No Hidden Costs"
  ],
  process: [
    "How It Works",
    "Your Path to Ownership",
    "Simple Steps to Your New Home"
  ],
  faq: [
    "Questions? We Have Answers.",
    "Everything You Need to Know",
    "Let's Clear Things Up"
  ],
  leadForm: [
    "Ready to See Your Future Home?",
    "Take the First Step",
    "Schedule Your Private Viewing"
  ]
};
```

## 7.2 Subheadlines

```typescript
const subheadlines = {
  hero: "Premium 5-room townhouses in Spanyolrét with private gardens up to 317m², underfloor heating, and dedicated parking. From 195M HUF (~€480K).",
  
  problemSolution: "You came to Budapest for opportunity. But somewhere along the way, your apartment started feeling smaller, the parking worse, and the rent—pointless.",
  
  benefits: "Every detail of Spanyolrét Gardens is designed for comfortable, efficient family living.",
  
  location: "The best of both worlds: city access with suburban peace. Connected but quiet.",
  
  developer: "Since 2012, S-Patrik Bau has completed over 50 premium residential projects in Budapest.",
  
  pricing: "Six unique units, transparently priced. Choose the space that fits your family.",
  
  leadForm: "No pressure. Just a conversation about whether Spanyolrét Gardens is right for your family."
};
```

## 7.3 Body Copy

### About the Development (Long)

```
Spanyolrét Gardens is a collection of six exclusive townhouses in one of 
Budapest's most sought-after family neighborhoods. Each home offers 
approximately 117-120 square meters of thoughtfully designed living space 
across two floors, plus private gardens ranging from 102 to 317 square meters.

Built by S-Patrik Bau — developers with over 50 completed projects since 2012 
— these homes combine premium European construction materials with modern 
energy-efficient systems. From the 30cm Wienerberger walls to the Westen 
Auriga heat pump, every element is chosen for quality and longevity.

Whether you're looking for your first family home in Hungary, upgrading from 
a cramped city apartment, or seeking a better quality of life for your 
children, Spanyolrét Gardens offers space, comfort, and peace of mind.

Delivery: September 2026. Only 6 units available.
```

### About the Location (Medium)

```
Spanyolrét is one of those Budapest neighborhoods that locals love but 
few outsiders discover. A quiet pocket of the XI. District, it offers 
tree-lined streets, established family homes, and a genuine community feel.

The Kelenföld M4 Metro station is just 6-8 minutes by bus, putting the city 
center within easy reach. International schools, shopping centers, and 
green spaces are all nearby. Yet when you close your front door, you're in 
a peaceful residential area with none of the noise and chaos of the city.

For families, it's the perfect balance: connected enough for commuting and 
activities, quiet enough for weekend barbecues and children playing in 
the garden.
```

### About the Developer (Short)

```
S-Patrik Bau has been building premium homes in Budapest since 2012. With 
over 50 completed projects and a 100% on-time delivery record, we've earned 
our reputation for quality construction, premium materials, and transparent 
communication. We don't just build homes — we build trust.
```

## 7.4 Call-to-Action Copy

### Primary CTAs

```typescript
const primaryCTAs = [
  "Schedule a Private Viewing",
  "Book Your Consultation",
  "Request More Information",
  "Download the Brochure",
  "Get Floor Plans & Pricing"
];
```

### Secondary CTAs

```typescript
const secondaryCTAs = [
  "View All Units",
  "See the Floor Plans",
  "Explore the Location",
  "Meet the Developer",
  "Read the FAQ"
];
```

### Urgency CTAs

```typescript
const urgencyCTAs = [
  "Only 6 Units — Reserve Yours Today",
  "Limited Availability — Schedule Now",
  "Don't Miss Out — Book a Viewing"
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

### Testimonial Placeholders (Update with real ones)

```typescript
const testimonials = [
  {
    quote: "After three years in a downtown apartment, our kids finally have space to play. The garden was the deciding factor.",
    author: "The [Family Name]",
    origin: "UK → Budapest",
    unit: "Unit A2"
  },
  {
    quote: "S-Patrik Bau made the whole process stress-free. Everything was in English, every question answered quickly.",
    author: "[Name]",
    origin: "Germany → Budapest",
    unit: "Unit B1"
  }
];
```

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
title_tag: "Spanyolrét Gardens | Premium Townhouses with Private Gardens | Budapest"
meta_description: "6 exclusive new-build townhouses in Budapest XI. 117m² living space + up to 317m² private garden. Heat pump, underfloor heating, premium materials. From €480K. Delivery Sept 2026."

h1: "Premium Townhouses with Private Gardens in Budapest"

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
      "price": "195000000",
      "priceCurrency": "HUF",
      "minPrice": "195000000",
      "maxPrice": "225000000"
    }
  }
}
```

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
