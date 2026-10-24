# Shop Class v0.6.0 — current handoff

Use `StewartJM-dev/Shop-Class`, branch `development`, as the source of truth. Read AGENTS.md first. This update builds on development commit `32b58b82bc350a06acc2717cd2a1b92d538e9196`; the commit containing this handoff is the new baseline. Do not start from an older attached HTML file.

## Included in this merge

280 lesson entries, 37 badges, six workshops. Existing progress IDs and `shopclass.v1` storage are preserved.

- Uploaded additions: 14 Python Lab 2 challenges (pl18–pl31), bringing practical Python challenges to 31. Includes strings/slices, list helpers/filtering, running totals, leap years, times tables, patterns, default arguments, primes, word counts, a secret signal and sorting.
- Three visual component drills: sp1–sp3 (spot parts, resistor bands, transistor leads).
- Badge celebration dialog and reduced-motion support; collapsible units and Start/Continue navigation.
- Optional Systems Seven Time Pass scaffolding. OFF by default. No configured signing key, parent origins or live Systems Seven connection. Do not claim the integration is complete or enable it without setup.
- Auto Mechanics: fuel1–fuel4 — float-bowl carburetors, choke/rich/lean, gasoline port/direct injection, and crank/no-start diagnosis. These use the existing explanation/quiz format; they are not carburetor or injection simulators.
- Auto Mechanics: nc1 — Shop Detective Case 01: No Crank. Virtual DC meter with two selectable probes, simplified conventional starter-control schematic, evidence notebook, diagnosis, key-off repair and cranking verification. One fault: an open control fuse. 25 XP first completion; no duplicate award. No real vehicle-specific circuit or battery sag is modeled.

## Fixes retained or made while combining

- Restored the development saved-studio migration that was missing from the upload, including backup restore and defensive Maker badge checks. Preserve legacy originals and earned progress.
- Fixed workshop-cover insertion after the new Continue button changed path markup.
- Disabled Time Pass setup now skips initialization entirely.
- Kept the computer/robotics/transistor lessons, learner-runner isolation, owner-bound saves, project shelves and distinct embedded artwork.

## Source and validation

`index.html` is the standalone application. Editable extensions live in `extensions/`, including shop-detective.js/.css and fuel-foundations.js. Run `node scripts/sync-discovery.cjs` after extension edits; run `npm ci` and `npm test` before pushing. Version is 0.6.0.

Checks cover all 279 routes; all 31 Python reference solutions through direct and serialized worker paths; existing game, electronics, computer/robotics and transistor behavior; fresh-profile delegated navigation; legacy studio migration; owner isolation; covers; unit folding/Continue; and no-crank evidence/repair/verification/XP guards. These are Node/DOM/canvas/worker checks. Actual browser and device visual testing remains outstanding. Time Pass enabled behavior is not comprehensively tested.

## v0.6.0 carburetor addition

`cb1` adds an interactive cutaway under Auto Mechanics, after `fuel1`. Six observations cover venturi, throttle, cold-start choke, warm-up, float/inlet needle and restricted main jet. Editable source is `extensions/carburetor.js`/.css; sync script embeds both. Choke is upstream of the venturi; throttle downstream; an idle path is modeled separately. Meter values are relative, not calibrated AFR, RPM or measured flow. Float refill/use is explicitly stepped.

Controls update SVG/stats in place, preserving the active range input. Drafts and resume use captured owner IDs, with one-time 25 XP. Tests traverse real delegated DOM clicks/input events, every challenge gate, slider stability, flow relationships, resume across profiles and replay. Rendered SVG visually inspected; actual browser/device layout still needs testing. Totals: 280 entries, 37 badges.

## Suggested next work

Extend the carburetor with diagnostic cases, then build interactive injection lessons showing pulse width and port versus direct injection. Follow with crank/no-start fuel cases. Avoid turning one clue (such as improvement with choke or pump noise) into proof of one failed part.

Stay on development or a feature branch; do not change visibility or hosting audience. No new deployment or main-branch promotion is included in this update.
