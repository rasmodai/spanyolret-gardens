/**
 * The one decision in the lead route that must never be got wrong: given what
 * each channel did, was the lead captured?
 *
 * It lives in its own module, and is tested, because the failure it guards
 * against is silent. A lead that reaches no channel and still gets a 200 is a
 * lead nobody ever learns about — the visitor sees a thank-you screen, and
 * that is the whole record of them.
 *
 * Usage: npx tsx scripts/test-capture-outcome.ts
 */
import { wasCaptured } from "../lib/capture-outcome";

let pass = 0;
let fail = 0;

function assert(name: string, condition: boolean, detail = "") {
  if (condition) {
    pass += 1;
    console.log(`  ✓ ${name}`);
  } else {
    fail += 1;
    console.log(`  ✗ ${name} ${detail}`);
  }
}

console.log("\n── any one channel succeeding means captured ───────────────────");
{
  assert("OS only", wasCaptured({ os: true, sheet: false, email: false }));
  assert("sheet only", wasCaptured({ os: false, sheet: true, email: false }));
  assert("email only", wasCaptured({ os: false, sheet: false, email: true }));
  assert("all three", wasCaptured({ os: true, sheet: true, email: true }));
}

console.log("\n── only a total failure is a failure ───────────────────────────");
{
  assert("nothing captured → not captured", !wasCaptured({ os: false, sheet: false, email: false }));
}

console.log("\n── the OS failing alone is not a failure ───────────────────────");
{
  // The whole point of keeping the sheet during the transition: the new,
  // unproven path going down must not start losing leads.
  assert("OS down, sheet up → still captured", wasCaptured({ os: false, sheet: true, email: true }));
}

console.log("\n── strictly harder to lose a lead than before ──────────────────");
{
  // Before this change the rule was "sheet or email". Every case that used to
  // count as captured must still count as captured.
  for (const sheet of [true, false]) {
    for (const email of [true, false]) {
      if (!sheet && !email) continue;
      assert(
        `previously-captured case still captured (sheet=${sheet}, email=${email})`,
        wasCaptured({ os: false, sheet, email })
      );
    }
  }
}

console.log(`\n${fail === 0 ? "ALL GREEN" : "FAILURES"} — ${pass} passed, ${fail} failed\n`);
process.exit(fail === 0 ? 0 : 1);
