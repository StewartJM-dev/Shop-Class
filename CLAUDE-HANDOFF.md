# Shop Class v0.7.0 — current handoff

Source of truth: private `StewartJM-dev/Shop-Class`, branch `development`. This merge builds on `6e2326db20c6cf1e5649e374125817f6b5b78a20` (v0.6.0). Read AGENTS.md and CHANGELOG.md. Use current GitHub files, not an older uploaded standalone file.

## Current build

288 lesson entries, seven workshops, 42 badges. The seventh workshop is Writing Desk: eight writing templates plus blank writing, offline checker, custom words, sentence-context capture and Spelling Quest. The mixed quest and five game choices use each learner’s misspelled words, falling back to starter words. Browser speech is optional; Spell it falls back to look-and-remember.

All v0.6.0 content is retained, including 31 practical Python challenges, parts drills, computer/robotics/transistor activities, saved-project migration and isolated runners, four fuel foundations, Shop Detective: No Crank and the six-discovery carburetor cutaway. Carburetor progress remains per learner with a one-time 25 XP award; its flow values remain illustrative.

## Integration and progress

Preserve standalone `index.html`, lesson IDs and `shopclass.v1`. Writing fields are `docs`, `mywords`, `sq`, `wdBig`, `sqQuiet`, stored in the owning profile and carried by backups. Input saves immediately; delayed refresh checks captured owner/document. No automatic document deletion at 300 entries. Template first finish earns 25 XP, new pieces of the same template 5 XP, blank pages 10 XP; re-finishing the same document earns zero. Quest rounds award 10 XP, capped at 30/day; a word advances at most once/day.

Editable sources live in `extensions/`; Writing Desk source/CSS are included in `scripts/sync-discovery.cjs`. Run `node scripts/sync-discovery.cjs` then `npm test`. Supplied dictionary build tools are retained, but require source Hunspell/frequency inputs; they are not needed to run the app. See WRITING-DESK-HANDOFF.md for the incoming package details.

## Validation and remaining work

All automated Node/DOM/canvas/worker checks pass, including all 288 lesson routes, all 31 Python references, legacy studio migration, carburetor discoveries, writing edits/corrections, all six spelling choices, XP/replay/daily limits, profile isolation/resume, large writing collections, backup restore and extension sync. These are not actual browser/device tests. Chromium installation failed due to unavailable download bytes; layout, printing and actual speech output require manual acceptance testing.

The hosted preview is unchanged. Time Pass remains OFF and unconfigured. Continue on development or a feature branch. Do not change repository visibility or hosting audience.

## Proposed next work (not implemented)

Interactive fuel injection: injector pulse width, port versus direct injection. Then Shop Detective: Cranks, Won’t Start. Diagnose with evidence; pump noise or choke response alone does not prove a failed part.
