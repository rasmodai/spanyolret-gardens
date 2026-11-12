/* The detector of "te" (tutoiement) in Hungarian text, shared by the copy test
 * and the sales test (thank-you pages, house sheets, bands). */
const TE_WORDS = [
    'te', 'tied', 'tiéd', 'tiéd', 'neked', 'veled', 'téged', 'nálad', 'tőled', 'hozzád', 'számodra', 'szerinted', 'érted',
    'légy', 'gyere', 'jöjj', 'nézd', 'kérd', 'hozd', 'tedd', 'vedd', 'add', 'válassz', 'keress', 'írj', 'hívj', 'kérdezz',
    'jelentkezz', 'döntsd', 'képzeld', 'töltsd', 'ismerd', 'fedezd', 'hallgasd', 'próbáld', 'ellenőrizd', 'olvasd',
];
// The possessive of "te" (-d, -id: "az igényeid", "a foglalásod", "kérdésedet") on a word of five letters or more.
const TE_SUFFIX = /^\p{L}{3,}(?:(?:ed|ad|od|öd)(?:et|at|ot|öt|nek|nak|ban|ben|ra|re|ról|ről|hoz|hez|höz|tól|től|ért|val|vel|on|en|ön)?|(?:eid|aid|oid|öid)\p{L}*)$/u;
// The second person singular of a verb that can: "választhatsz", "megbízhatsz", "megtudsz", "beköltözöl".
const TE_VERB = /(?:hatsz|hetsz|^megtudsz|^beköltözöl|^megbízol)$/u;
// Words that end that way without being addressed to "te".
const NOT_TE = new Set(['szabad', 'szabadon', 'terjed', 'negyed', 'egyed', 'szaladnak', 'munkaidőben']);
export function tutoiement(text: string): string[] {
    const words = text.toLocaleLowerCase('hu').match(/\p{L}+/gu) ?? [];
    const hits = words.filter((word) => TE_WORDS.includes(word));
    for (const word of words) if (TE_VERB.test(word) && !hits.includes(word)) hits.push(word);
    for (const word of words) if (TE_SUFFIX.test(word) && !NOT_TE.has(word) && !hits.includes(word)) hits.push(word);
    return hits;
}
