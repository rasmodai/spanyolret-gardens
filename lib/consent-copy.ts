/* The cookie banner's text, EN and HU. Kept apart from the component so the tests
 * can read it (same keys in both languages, Hungarian in "Ön"). */

export interface ConsentCopy {
    ariaLabel: string;
    text: string;
    accept: string;
    refuse: string;
    privacyLink: string;
}

export const consentCopy: { en: ConsentCopy; hu: ConsentCopy } = {
    en: {
        ariaLabel: 'Cookie choice',
        text: 'With your agreement, this site uses the Meta Pixel (to measure our advertising) and Mixpanel (visit statistics, without your name, email or phone), and shows the Google Maps map directly. These store cookies or similar data in your browser, and if you then send the form, Meta also receives a hashed (unreadable) form of your contact details to count it. If you refuse, nothing is loaded or sent and the site works exactly the same.',
        accept: 'Accept',
        refuse: 'Refuse',
        privacyLink: 'Privacy policy',
    },
    hu: {
        ariaLabel: 'Sütik kezelése',
        text: 'Hozzájárulása esetén az oldal a Meta Pixelt (hirdetéseink méréséhez) és a Mixpanelt (látogatási statisztikához, név, e-mail-cím és telefonszám nélkül) használja, a térképet pedig közvetlenül a Google Térképről jeleníti meg. Ezek sütiket vagy hasonló azonosítókat tárolnak a böngészőjében, és ha ezután elküldi az űrlapot, a Meta az elérhetőségeinek hash (olvashatatlan) formáját is megkapja a méréshez. Ha elutasítja, semmi sem töltődik be és semmit sem küldünk el, az oldal pedig ugyanúgy működik.',
        accept: 'Elfogadom',
        refuse: 'Elutasítom',
        privacyLink: 'Adatkezelési tájékoztató',
    },
};
