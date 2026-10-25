# Shop Class v0.9.0 — current handoff

Source of truth: private `StewartJM-dev/Shop-Class`, branch `development`. Builds on `61eac3049423fa456e364287bcd177e77bee316a` (v0.8.0). Read AGENTS.md and CHANGELOG.md. The v0.5.0-based ZIPs are import sources, not the current app.

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
