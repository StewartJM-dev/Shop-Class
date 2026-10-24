# Shop Class v0.8.0 — current handoff

Source of truth: private `StewartJM-dev/Shop-Class`, branch `development`. This update builds on `e57af3b27ce7a7e429a8f85160b0e50026bd00f8` (v0.7.0). Read AGENTS.md and CHANGELOG.md. Use current GitHub files; the supplied v0.5.0-based packages are historical inputs.

## Current build

302 lesson entries, eight workshops, 45 badges. Workshops: Electronics 24; Circuit Lab 77 (computer/robotics/transistors included); Game Lab 20; Auto Mechanics 49; Faith & Trail 41; Coding 71; Writing Desk 16; Money Lab 4. All previous IDs remain.

Auto Mechanics adds `inj1` (kind/view inj): six interactive fuel-injection discoveries. Change pulse width, step needle movement, compare port/direct placement, vary RPM, remove fuel supply and restrict a nozzle. The timing bar is an ECU command, not a voltage trace. Flow/pressure values are relative teaching estimates with separate normalized system references, not actual calibration, AFR or real engine predictions.

`nc2` (kind/view ns), Shop Detective: Cranks, Won’t Start, is a fictional port-injected one-fault case: an open pump ground-return wire. Nine evidence checks cover scan/spark/mechanical/tank/pressure and battery/feed/return/across-motor readings. Diagnosis gates key-off inspection and repair. Starting alone is insufficient: new pressure, powered-ground and running-scan evidence precede the explanation/award. The initial drawing hides the break until earned inspection. No real gasoline procedures are taught. Case specifications, voltages and pressure are fictional, with ideal good wires and a conventional connected DC motor/relay.

The later supplied ZIP adds templates wt9–wt16 (editorial, news, persuasive essay, speech, poem, biography, interview, devotion). Section checks recognize numbered and Q/A headings. Poetry checks count lines/words; rhyme, syllables and acrostic form need parent review. Existing Writing Desk, offline checker and Spelling Quest are retained.

Money Lab: mn1 Campout cook; mn2 Gas money; mn3 Family groceries; mn4 First month on your own. All support owner-bound draft/resume, permanent best stars and first-completion-only 25 XP. The monthly surprise is fixed for an attempt, not rerolled by repeated checks. Supplied dated prices/source notes are preserved as practice values, not independently verified live quotes. Shared device price edits validate values and clear stale result overlays; progress stars remain. Zero item prices are allowed, zero wage rejected. Meal/month assumptions and prepaid/startup exclusions are explicit in the UI. See MONEY-LAB-IMPORT.md for original reported notes.

## Storage and source

Preserve `shopclass.v1`, lesson IDs and standalone `index.html`. Existing writing, projects, runner isolation, migration and earned progress are retained. New owner-bound draft keys are `inj:inj1`, `ns:nc2`, and `mn:mn1`–`mn:mn4`. Reopening injection/no-start releases held live controls. Money stars use `p.mnStars`. Price overrides use separate device-wide `shopclass.prices.v1`; they are not included in progress backups.

Editable extension JS/CSS and writing-templates-2.js are embedded with markers. Run `node scripts/sync-discovery.cjs`, then `npm test`. Keep all original extensions and hooks when merging another upload. Dictionary rebuild utilities require the source inputs described in the older writing handoff; they are not runtime dependencies.

## Validation and limits

All automated checks pass: 302 lesson routes; all 31 Python references and serialized workers; game isolation; legacy studio migration; original computer/robotics/transistor/knot/no-crank/carburetor behavior; writing corrections, profile saves and daily XP caps; both new fuel activities through complete/replay paths; repair order and fresh post-repair verification; 16 templates; all four 3-star budget solutions; unit/convoy/month math; price edits/reset; stable surprises; owner isolation/resume; backup restore; embedded source consistency.

Fuel SVGs and browser screenshots were rendered and visually inspected. Real Chromium 153 checks (`tests/browser-fuel.cjs`) completed both fuel activities with native controls at 1366×768 and 390×844 viewports; Money Lab plan/prices, writing saves, range focus and no horizontal overflow passed with no page script errors. Scoped width rules prevent older layout CSS from squeezing desktop labs. Actual hardware, Safari/ChromeOS-specific behavior, speech output and printing are still unverified. The optional browser test uses separately installed Playwright/Chromium, with PLAYWRIGHT_MODULE_PATH and SHOP_CLASS_CHROMIUM overrides; they are not learner runtime dependencies.

Time Pass remains OFF and unconfigured. The hosted preview is unchanged. Work on development or a feature branch; no visibility/hosting changes or main promotion are included.
