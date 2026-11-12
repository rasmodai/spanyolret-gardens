/* Geometry of the interactive site plan (public/assets/floorplans/site-plan.jpg,
 * 1400 × 890 in the viewBox below). One polygon and one chip per house; the
 * words (house name, "sold") come from lib/copy and the status from the house
 * rows. No price, nothing from lib/data.ts. */
export const SITE_PLAN_VIEWBOX = '110 195 1180 750';

/** Left and top of the chip, in % of the picture. */
export const SITE_PLAN: Record<string, { points: string; chip: { left: number; top: number } }> = {
    A2: { points: '143,595 345,486 412,598 436,640 436,726 432,795 235,795', chip: { left: 8.9, top: 60.67 } },
    A3: { points: '345,486 640,325 782,490 592,603 588,655 445,668 412,598', chip: { left: 34.75, top: 34.67 } },
    A1: { points: '235,795 432,795 436,726 650,725 652,902 428,902 295,927', chip: { left: 18.64, top: 87.33 } },
    B1: { points: '652,725 878,725 878,903 652,903', chip: { left: 61.02, top: 90.0 } },
    B3: { points: '652,583 805,515 962,515 962,692 652,696', chip: { left: 52.54, top: 54.0 } },
    B2: { points: '982,530 1262,838 1235,868 878,905 878,690 982,690', chip: { left: 82.2, top: 78.0 } },
};
