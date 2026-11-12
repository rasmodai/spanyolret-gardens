import { availableUnits, availableWithParking, gardenRange, interiorRange, siteAddress, units } from '../data';
import { yearsSince } from '../format';
import { projectConfig } from '../project-config';

/* The numbers behind the sentences, derived once and read by both languages.
 * A figure is never typed into a sentence: it is formatted from here
 * (lib/format.ts). The structural counts written as words in the prose (six
 * houses, five rooms, two floors) are checked against the data by
 * scripts/test-copy.ts, so a change of data fails the test until the copy
 * follows. */

const config = projectConfig;
const gift = config.parkingGift;

export const shared = {
    houseCount: units.length,
    availableCount: availableUnits.length,
    rooms: units[0].rooms,
    terraceArea: units[0].terraceArea,
    interiorRange,
    /** The gardens of the houses still available. */
    gardenRange,
    address: siteAddress.full,
    /** Ids of the available houses that come with two spaces, and with one. */
    parkingTwo: availableWithParking(2),
    parkingOne: availableWithParking(1),
    parkingSpacePriceHuf: config.parkingSpacePriceHuf,
    giftOn: gift.enabled,
    giftDepositBy: gift.depositBy,
    handover: config.handoverDate,
    /** The one public price: the "from" figure, which depends on the parking offer. */
    anchorHuf: gift.enabled ? config.anchorPrice.withGiftHuf : config.anchorPrice.withoutGiftHuf,
    yearsBuilding: yearsSince(config.developer.since),
    developer: config.developer,
    architect: config.architect,
    contactEmail: config.contactEmail,
    contactPhone: config.contactPhone,
    messaging: config.whatsappNumber !== null,
    registrationNumber: config.privacyController.registrationNumber,
};

/** "A1, A2 and B1" / "A1, A2 és B1". */
export function joinIds(ids: string[], and: string): string {
    if (ids.length <= 1) return ids.join('');
    return `${ids.slice(0, -1).join(', ')} ${and} ${ids[ids.length - 1]}`;
}
