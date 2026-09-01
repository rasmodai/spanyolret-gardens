/**
 * Was the lead captured?
 *
 * Its own module, and tested, because getting it wrong fails silently: a lead
 * that reached no channel but returns 200 shows the visitor a thank-you screen
 * and leaves no other trace of them anywhere.
 *
 * The rule widened when the OS became the system of record — it used to be
 * "the sheet or the email", it is now "the OS, or the sheet, or the email".
 * Strictly harder to lose a lead than before, which is the only acceptable
 * direction for a change to this path.
 */
export function wasCaptured(channels: { os: boolean; sheet: boolean; email: boolean }): boolean {
  return channels.os || channels.sheet || channels.email;
}
