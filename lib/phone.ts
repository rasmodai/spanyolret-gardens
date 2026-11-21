/**
 * Is this a real phone number? Shared by the form and the lead route.
 * Accepted, spaces, dashes, dots, slashes and brackets aside:
 * - a Hungarian number with +36, 0036, 06 or no prefix: a mobile (20, 30, 31,
 *   50 or 70 followed by 7 digits) or a landline (Budapest 1 + 7 digits, other
 *   areas 2 digits + 6 digits);
 * - a foreign number written with + or 00: 8 to 15 digits (E.164).
 * Rejected: anything shorter, letters, or one digit repeated ("111111111").
 */
// A landline area code is never a mobile prefix, so "30 123456" (a mobile one
// digit short) is not taken for a landline.
const HU_NATIONAL = /^(?:(?:20|30|31|50|70)\d{7}|1\d{7}|(?!20|30|31|50|70)[2-9]\d{7})$/;

export function isValidPhone(input: string): boolean {
    const compact = input.trim().replace(/[\s\-().\/]/g, '');
    if (!/^(?:\+|00)?\d+$/.test(compact)) return false;
    if (/^(\d)\1+$/.test(compact.replace(/^(?:\+|00)/, ''))) return false;

    let national: string;
    if (compact.startsWith('+36')) national = compact.slice(3);
    else if (compact.startsWith('0036')) national = compact.slice(4);
    else if (compact.startsWith('06')) national = compact.slice(2);
    else if (compact.startsWith('+') || compact.startsWith('00')) {
        const digits = compact.replace(/^(?:\+|00)/, '');
        return digits.length >= 8 && digits.length <= 15 && !digits.startsWith('0');
    } else national = compact;

    return HU_NATIONAL.test(national);
}
