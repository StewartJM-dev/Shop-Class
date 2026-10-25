# Shop Class v0.11.0 — Robot Builder and Game Lab heroes

Source: public StewartJM-dev/Shop-Class, development; builds on 70a18009e532fe0a932e0b4e935effb2be06968c. Pages publishes development. 370 entries, ten workshops, 53 badges; Circuit Lab now has 86 entries. Main and the earlier Sites preview remain unchanged.

Merged from the latest v0.5.0-based Claude ZIP: robot-builder.js/.css and the small Game Lab patch hunks only. Old standalone HTML, Writing Desk, Money Lab and Trail Detective were not substituted. Preserve Bicycle Workshop and confirmed working v0.9.1 sound.

Heroes: person, puppy, dinosaur, robot, kitten. player.look works in worker programs and block/fill controls. The later detailed gmDraw override is extended (the earlier flat painter alone is insufficient). Per-profile gmLook is the default; cfg.look is saved in each studio slot. player.robot captures the owner’s saved robot for rendering; gmBody never reads another currently selected learner. Existing code may override the picker during setup.

Robot Builder: rbb1–rbb9 under Circuit Lab, kind/view rbb; explicit saved design p.robot; immediate draft p.drafts.rbb; existing resume/backup support. Sensor cap reports rather than silently drops a sensor. Inputs, save and actions check captured owner. First completion 25 XP, replay zero. Stats/challenges are a design-rule model with stated energy/terrain/software/lighting assumptions, not calibrated performance or real autonomous code.

Edit extensions/robot-builder.js/.css and canonical index.html core Game Lab hooks. Run node scripts/sync-discovery.cjs, npm test, and optional npm run test:browser. New tests cover all nine default failures and successful/replay paths, owner/backup/resume, five distinct final canvas drawings, defaults/slots and serialized worker look; browser checks cover phone/Chromebook controls.

Prior release details follow.

# Shop Class v0.10.0 — Bicycle Workshop

Source: public StewartJM-dev/Shop-Class, development. Builds on bce995bdd41b6fb2757926df49526982ad032a85. GitHub Pages publishes development; main and the older Sites preview remain unchanged.

361 entries, ten workshops, 52 badges. Bicycle Workshop adds bike01–bike24, kind/view bike. Includes interactive gear/index/limit controls, five schematic brake types, example tire/rim pressure limits, ordered tube-patch rehearsal, maintenance content and two Bike Detective cases. Front derailleur/cantilever instruction is textual; schematic models do not supply real component settings or calibrated physics.

My Bicycle data: p.bicycle fields and log. Drafts: p.drafts['bike:'+lessonId], captured ownerId; existing resume and backups apply. 25 XP once per known lesson, no replay award. New cover artwork/bicycle.webp is embedded in workshop-covers.js and index.html; exact ImageGen prompt/method in artwork/ASSET_NOTES.json.

Preserve the confirmed working v0.9.1 Word Machine sound code. An unpublished v0.9.2 speech experiment was deliberately excluded after the user confirmed sound working. Keep shopclass.v1, all previous progress IDs and isolated learner runners.

Edit extensions/bicycle.js/.css, then run node scripts/sync-discovery.cjs and npm test. Optional npm run test:browser checks all workshops plus Bicycle at phone/Chromebook viewport sizes. Real bicycle procedures need component manuals and adult supervision. Physical-device speech/printing remain outside automated acceptance.

Previous feature details follow.

<!-- v0.9.1: Word Machine sound fix merged. GitHub Pages publishes development. -->
# Shop Class v0.9.0 — current handoff

Source of truth: public `StewartJM-dev/Shop-Class`, branch `development`. Builds on `61eac3049423fa456e364287bcd177e77bee316a` (v0.8.0). Read AGENTS.md and CHANGELOG.md. The v0.5.0-based ZIPs are import sources, not the current app.

## Current build

337 entries, nine workshops, 48 badges. Electronics 24; Circuit Lab 77; Game Lab 20; Auto Mechanics 49; Faith & Trail 41; Coding 71; Writing Desk 16; Money Lab 4; Trail Detective 35. All earlier progress IDs remain.

Trail Detective (`detect`, kind/view `td`) has 35 cases with a vocabulary word, selectable clue sentence, shuffled answers, explanation, best stars and ranks. Each gives 25 XP once. Unfinished phase/hints/mistakes save under owner-bound `drafts['td:'+caseId]`; resume and backups use the existing app mechanism. Completed cases reopen as replay. Sharp eye counts only recognized three-star case IDs. Keyboard Enter/Space activates clue spans.

Four explanations were corrected: black oil alone does not prove a skipped change; cat-like tracks require corroboration; an observed open-water photo replaces an air-temperature-only ice conclusion; floating eggs do not establish an exact date or food safety. Relevant primary references are linked from solutions. See NEW-WORKSHOPS-IMPORT.md for the original supplied claims and test notes.

Spelling Quest has ten choices: the existing six, plus Say it (unscored study), Letter, Secret code and Code maker. Study/Code maker give no XP; Letter/Secret code use the existing 30-XP/day scored limit. Letters never enter the misspelled-word bank. Muted/unavailable speech reveals a letter. Caesar keys are 1–25; code maker handles spaces. Round/profile guards remain; delayed clipboard UI checks the captured owner/view and reports success only after success.

Writing Desk, Money Lab and Trail Detective have photographic ImageGen covers on home cards, featured content and course headers. New optimized WebPs live in artwork/; all runtime bytes are embedded in `extensions/workshop-covers.js` and `index.html`. `artwork/ASSET_NOTES.json` records exact prompts, paths and built-in generation method. Preserve all nine distinct covers, the full-width styles in workshop-covers.css, and the final workshopArt/vPath overrides when merging.

All v0.8.0 features remain: both interactive carburetor/injection activities, both Shop Detective cases, computer/robotics/transistors, 31 Python programs, 16 writing templates, owner-bound immediate writing saves, four Money Lab missions, stable surprises, validated device-wide practice prices, saved projects/migrations and isolated runners. Supplied prices remain practice values, not verified live quotes.

## Source, storage and verification

Keep standalone index.html and shopclass.v1. Additional detective data is p.tdStars and p.drafts['td:tdN']; other fields/keys are unchanged. Do not overwrite newer modules with an old ZIP. Editable extension markers are synchronized by `node scripts/sync-discovery.cjs`. Run `npm test`; optional `npm run test:browser` requires separately installed Playwright/Chromium or the documented environment-path overrides.

Automated checks pass all 337 routes, earlier lab/worker/ownership tests, 35 detective clue/answer paths, perfect and imperfect replay, rank/badge/unknown-ID guards, profile/resume/restore, four added spelling/code choices, muted fallback, Caesar encoding and delayed clipboard ownership, nine cover assets and three course headers. Real Chromium 153 at 1366×768 and 390×844 passes photographic card/header loads, native clue clicks/keyboard, word/code controls, no page errors and no horizontal overflow; browser screenshots were inspected. Real speech output, printing, physical devices and Safari/ChromeOS-specific behavior remain unverified.

Work on development or a feature branch. Time Pass remains OFF and unconfigured. Hosted preview, main and hosting visibility/audience are unchanged.
