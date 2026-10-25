# Shop Class

A learning workshop built for the Stewart boys and their interests. It runs in a web browser, including on Chromebooks, with projects and progress saved in that browser.

## Current baseline

370 lesson entries across ten workshops:

| Workshop | Entries |
| --- | ---: |
| Electronics | 24 |
| Circuit Lab, including logic, soldering, computer, robotics and transistors | 77 |
| Game Lab | 20 |
| Auto Mechanics, including Engine Lab | 49 |
| Faith & Trail, including Knot Lab | 41 |
| Coding, including Python and Web Lab | 71 |
| Writing Desk | 16 |
| Money Lab | 4 |
| Trail Detective | 35 |
| Bicycle Workshop | 24 |

The build includes ten photographic workshop covers, 53 progress badges, a personal project shelf, four saved game slots and four saved web-page slots per learner, and export/restore of browser-local progress.

## Run the app

The complete app is `index.html`. It embeds its fonts, images and code, so there is no application build or runtime package download.

Serve the repository as a static website, or run a local static server:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser. The current private preview is [Shop Class Workbench](https://shop-class-workbench.wellswan517.chatgpt.site).

## Development and checks

`main` contains the saved baseline. Continue development on `development` or a feature branch, then review changes before merging to `main`.

```sh
npm ci
npm test
```

The Node checks cover lesson routing, saved-project ownership, badges, knot steps and resume, Python reference solutions and execution limits, fresh-profile sandbox entry, and the actual serialized game/Python worker code. They are not browser or device tests. Chromebook and iPhone acceptance testing remains to be completed.

The optional development packages are used only for tests; learners do not download them.

## Learning environments

- **Circuit Lab:** a simplified educational simulation, with analog, digital and soldering missions.
- **Engine Lab:** interactive crank, piston and valve models, assembly and diagnosis activities.
- **Game Lab:** block or JavaScript projects, executed in a worker inside a sandboxed frame.
- **Web Lab:** HTML/CSS/JavaScript projects with sandboxed previews.
- **Python Lab:** 17 hands-on challenges and a free playground. Its bundled beginner interpreter supports core syntax and selected `math`/`random` features. It is not a complete CPython installation or a general package environment. Code runs in an isolated worker with a Stop button and execution limits.
- **Knot Lab:** 20 lessons, four step-by-step knot sequences and illustrated scenarios. App exercises support practice with real rope and leader instruction; they do not certify Trail Life advancement or qualify a learner for life-safety rope work.

## Progress and backups

Progress is stored under `shopclass.v1` in browser storage. It is not yet connected to Systems Seven or Firebase, and it does not automatically synchronize between devices. Export a backup before moving to a different browser, device or website address, then restore it there.

Keep progress backups and personal learner data out of this repository.

## Artwork

Optimized cover originals are in `artwork/`; the same images are embedded in `index.html`. `artwork/ASSET_NOTES.json` records the generation prompts and asset mapping. Interactive technical diagrams are rendered in code.


### Computer and robotics labs

Open Circuit Lab for two new lab entries and 13 guided missions: seven SC-8 computer missions and six rover missions. Both include a sandbox. The computer supports byte switches, a latch, assembly, 256 bytes of RAM, clock stepping, flags, a carry breakdown, and output history. The rover supports differential wheel controls, distance/line sensors, feedback rule presets, command blocks, and a small parsed route language.

SC-8 is an original educational architecture, not a 6502 emulator or a transistor-level computer. Rover commands are not Python. The rover model uses ideal motion and a single front distance ray; it does not model tire slip, motor electronics, or sensor noise. Programs and controller settings are saved per learner; reopening resets the experiment. Backups include these saved programs.

`extensions/computer-robotics.js` and `.css` mirror the code embedded in the standalone HTML. After editing those sources, run `node scripts/sync-discovery.cjs`, then `npm test`. Keep the marked extension block when merging transistor and motor-control lessons. The integration hooks add the cpu8/robot views, lesson routing, delegated actions and inputs.


### Transistors and motor control

Eight guided Transistor Lab lessons (xt1–xt8) cover NPN leads, LED switching, faults, motor switching, flyback protection, PWM, H-bridge direction and a final repair challenge. Open Circuit Lab and choose Transistors & motors. The lessons include diagrams, experiment requirements, quizzes, per-learner saved steps, and the Transistor tamer badge. Completed lessons reopen from the start; unfinished work resumes. Finish/replay cannot award repeated XP.

Claude supplied the initial lessons. The merged version retains the newer computer/robotics guides, adds ownership and resume handling, corrects reversed-component drawings, and blocks short-circuit requests in the H-bridge teaching interlock. A fixed gain is used for conceptual experiments; it does not guarantee saturation in a real transistor or establish a GPIO current budget. Current rating alone does not establish thermal suitability. Spike heights and PWM speed are illustrative.

Editable sources are `extensions/transistor-motor.js` and `.css`; `node scripts/sync-discovery.cjs` embeds both extensions before `npm test`. The transistor tests traverse all eight lessons through their UI actions and check models, ownership, resume, and replay behavior.

Technical review references: [onsemi P2N2222A datasheet](https://www.onsemi.com/download/data-sheet/pdf/p2n2222a-d.pdf) (saturation test currents versus ordinary gain); [TI inductive-load application report](https://www.ti.com/lit/an/slvaes9a/slvaes9a.pdf) (inductive-load discharge).

Older single-object and numbered-object game/page studios are converted into four-slot arrays on startup and restore. The original is retained under each profile’s legacyStudios field; XP and completions are unchanged. Full-document navigation tests exercise actual delegated DOM clicks with these saved-state shapes.


## October 24 additions (v0.5.0)

- Fourteen Python Lab 2 challenges (pl18–pl31), bringing Python practice to 31 challenges.
- Know your parts: component identification, resistor color bands, and transistor lead identification.
- Badge celebration dialog, collapsible course units and a course Continue button.
- Auto Mechanics: four fuel-system lessons (fuel1–fuel4) covering carburetors, choke/rich/lean, gasoline injection and crank/no-start diagnosis.
- Auto Mechanics: Shop Detective Case 01 (nc1), an interactive no-crank diagnosis with a DC meter, schematic, evidence notebook, repair and verification.
- Optional Systems Seven Time Pass scaffolding. It is OFF by default and is not a configured integration. Signed passes and parent origins require setup.

The standalone export retains the saved-project compatibility repair from v0.4.1. Run `node scripts/sync-discovery.cjs` after editing extension sources, then `npm test`.

Validation uses Node, DOM/canvas mocks and serialized Python/game workers. Browser/device visual testing remains outstanding.

## Interactive carburetor (v0.6.0)

Auto Mechanics now includes **Inside the carburetor: cutaway** (`cb1`), positioned after the carburetor foundation lesson. It offers six guided discoveries: venturi, throttle airflow, cold-start choke, opening choke after warm-up, float/inlet-needle operation, and comparing a clear main jet with a restriction.

The moving SVG cutaway includes the upstream choke, downstream throttle, vented float bowl, main jet/nozzle and separate idle passage. Controls update without rebuilding the active slider. Drafts/resume belong to the captured learner; completion earns 25 XP once. The optional Time Pass remains disabled.

This is a qualitative model. Flow indicators are relative comparisons, not measured units, calibrated air/fuel ratios, RPM or a prediction of a real engine. Fuel use and refilling are separate demonstration actions. No real gasoline-handling procedure is taught.

Editable source: `extensions/carburetor.js` and `.css`. `npm test` includes a full-document delegated-control traversal of all six discoveries, slider stability, model relationships, progress ownership, resume, replay XP and embedded source consistency. The SVG has also been rendered and visually inspected. Actual browser/device layout testing remains outstanding.



## Writing Desk and Spelling Quest (v0.7.0)

The seventh workshop adds eight guided writing templates (stories, friendly/formal letters, thank-you notes, trail journals, outing reports, how-to guides and book/Bible reports) plus a blank page. The offline checker offers spelling suggestions, explanations, names/custom words and guided corrections. Corrected words feed each learner’s Spelling Quest with sentence context.

Spelling Quest has a mixed Daily Quest and five game choices: Spell it, Fix it, Missing letters, Scramble and Campfire. Without browser speech support, Spell it uses look-and-remember practice. Writing and spelling data stay inside each profile in `shopclass.v1` and travel with existing backups. They are saved locally, not sent to a server. The checker is a learning aid and may miss errors or flag unfamiliar names.

A template earns 25 XP on its first finished piece, then 5 XP for a new finished piece of the same type. A blank page earns 10 XP. Finishing the same document again earns no additional XP. Spelling rounds earn 10 XP, capped at 30 per day; repeated correct practice does not advance a word more than once per day. Three new writing/spelling badges plus two workshop badges bring the collection to 42. Previously earned progress is preserved.

Editable sources: `extensions/writing-desk.js` and `.css`. Run `node scripts/sync-discovery.cjs` after edits. Dictionary rebuild utilities from the supplied package are retained in `tools/`; they require the source dictionary/frequency data described in `WRITING-DESK-HANDOFF.md`, and are not runtime dependencies.

Writing saves immediately on input; delayed UI refresh is tied to its owner and document. Opening new writing never truncates older work. Automated tests cover typing/correction, captured practice words, all game choices, per-profile saves and resume, template/replay XP, daily limits, badges, large document collections and backup restore. Browser/device layout, printing and speech output still require manual acceptance testing. A Chromium download was unavailable in this environment. The hosted preview has not been updated by this merge.


## Fuel Injection Lab and Shop Detective Case 02 (v0.8.0)

Auto Mechanics now includes `inj1`, **Fuel Injection Lab: pulse & spray**. Six guided discoveries cover pulse width, needle opening/closing, port versus direct injection, RPM versus events per second, a command with no fuel supply, and a restricted nozzle with the same command. Sliders update the diagram, command bar and readouts without replacing the active input.

The model commands one event per cylinder per four-stroke cycle. Fuel values are relative per-event/per-second estimates with a fixed illustrative opening delay, not calibrated flow, fuel trims or AFR. The timing bar is an ECU ON/OFF command, not a measured voltage trace. Each injection type uses its own normalized pressure reference; identical percentages do not mean identical real pressures or injectors.

`nc2`, **Shop Detective: Cranks, Won’t Start**, presents a fictional port-injected engine with one open pump-ground-return wire. Learners collect scan, spark, compression/timing, tank, pressure and paired meter evidence. A pump feed measured against battery negative does not prove voltage exists across the motor. Diagnosis precedes key-off inspection/repair, followed by new pressure, powered-ground and running-scan evidence before completion. The initial schematic hides the wire condition until inspection.

Case readings and specifications are fictional training values, not limits for a particular vehicle. The simplified circuit has a conventional relay and connected DC motor, with ideal good wires and fixed cranking/running voltages. Prime timing, retained pressure, PWM modules, battery depletion, intermittent faults and real gasoline handling are outside the model.

Both activities award 25 XP on first completion and zero on replay. Drafts, controls and notebook evidence stay with the captured learner; reopening releases the held pulse/START control. Existing progress backups carry these drafts. Editable files: `extensions/fuel-injection.js`/`.css` and `extensions/crank-no-start.js`/`.css`.

Technical references: [Bosch port injection](https://www.bosch-mobility.com/en/solutions/powertrain/gasoline/gasoline-port-fuel-injection/), [Bosch direct injection](https://www.bosch-mobility.com/en/solutions/powertrain/gasoline/gasoline-direct-injection/), [Snap-on injector commands and movement](https://www.snapon.com/EN/US/Diagnostics/News-Center/Technical-Focus-Archive/Fuel-Injector-Current-and-Voltage-Tests), and [Delphi fuel-pump electrical diagnosis](https://www.delphiautoparts.com/resource-center/article/how-to-perform-a-voltage-drop-test).

## Additional writing and Money Lab (v0.8.0)

The newer supplied package adds writing templates wt9–wt16: editorial, news article, persuasive essay, speech, poem, biography, interview and devotion journal. Section checks now stop at numbered headings and Q/A headings. Poetry checks count lines/words; a parent reviews rhymes, haiku syllables and acrostic form. The eight earlier templates, checker, Spelling Quest and immediate owner-bound writing saves remain.

Money Lab adds four missions: Campout cook, Gas money for the trip, Family groceries, and First month on your own. They compare package/unit prices, seats/cargo/fuel costs, recurring monthly income/expenses, saving and a surprise bill. Mission drafts and best stars are saved per learner with guarded first-completion XP. Rechecking a monthly plan keeps the same surprise; it cannot reroll for an easier result. A completed mission can be replayed for better stars without more XP.

The price book retains the supplied package’s values and dated source notes as practice inputs. They have not been independently verified as current local prices or offers. Price overrides affect all learners on one device under `shopclass.prices.v1`, separately from progress backups; zero-price donated items are supported, zero wage and invalid prices are rejected. Edits invalidate an old result overlay and recalculate the plan. Check current costs/terms for real purchases.

Serving targets are simplified budget-puzzle units, not complete nutrition plans. The monthly scenario uses a fixed 16% pay deduction, allocated prepaid-phone costs, and already-covered startup deposits. It omits many real expenses and is not a personal tax or financial plan. [BLS average-price guidance](https://www.bls.gov/cpi/factsheets/average-prices.htm) and [CFPB emergency-fund guidance](https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/) are linked in the price book. Original package notes are retained in `MONEY-LAB-IMPORT.md`.

The v0.8.0 total was **302 entries, eight workshops and 45 badges**. The original six photographic workshop covers are retained; Writing Desk and Money Lab use embedded SVG illustrations.

`npm test` includes all original checks plus full delegated injection/no-start traversals, repair/verification/replay gates, restored progress, 16 writing templates, all four budget solutions, price edits/reset, monthly surprise stability and owner isolation. SVG diagrams were rendered and visually inspected. Additional real Chromium 153 checks completed both fuel activities with native controls at 1366×768 and 390×844 viewports, and exercised Money Lab, price edits and writing saves with no script errors or horizontal overflow. The new desktop labs use the full available width. Actual hardware, Safari/ChromeOS-specific behavior, speech output and printing remain to be checked. The hosted preview has not been updated. Optional browser tests: `npm run test:browser` with Playwright/Chromium installed for development; `PLAYWRIGHT_MODULE_PATH` and `SHOP_CLASS_CHROMIUM` may point to existing installations.


## Trail Detective, new spelling games and workshop art (v0.9.0)

The new `detect` workshop contains 35 original cases (`td1`–`td35`). Read the story and Word of the Day, select the sentence containing the clue, then answer the question. Missed clue selections and answers affect stars; best stars are permanent. Rank grows from Rookie to Master Detective. Sharp eye requires five known cases solved with three stars. Each case gives 25 XP once and zero on replay. Unfinished phase, hints and mistakes save per learner under `drafts['td:tdN']` and resume through the existing Continue action and backups.

The merge corrects overconfident explanations in four cases. Oil color alone does not establish when oil was changed; track shape and claw marks need corroboration; a photograph of open water replaces a temperature-only claim about pond ice; floating eggs raise a freshness question but do not establish an exact lay date or safety. Primary references appear with the relevant solutions. The puzzles teach observation within stated facts, not forensic certainty from one clue. The incoming package notes are retained in `NEW-WORKSHOPS-IMPORT.md` as history.

Spelling Quest adds Say it (unscored word study), Letter, Secret code and Code maker, for ten menu choices. Say it and Code maker give no XP. Letter and Secret code share the existing daily scored-round limit. Letter practice does not add letters to the misspelled-word bank; muted/unavailable speech reveals the target letter. Code maker supports Caesar keys 1–25, typing spaces, decoding and clipboard copy. Clipboard success is reported only on success and is ignored after a profile/view change. These simple ciphers are word games, not secure messaging.

Writing Desk, Money Lab and Trail Detective now use newly generated photographic covers consistent with the earlier workshop art. The same covers appear on the home cards, featured workshop and the three course pages. Scoped cover styles keep the images full width instead of shrinking them into a corner of a card. All nine covers are embedded in `index.html`; no image-host requests are required. The new optimized assets are `artwork/writing-desk.webp`, `artwork/money-lab.webp` and `artwork/trail-detective.webp`. Exact prompts, paths and generation method are in `artwork/ASSET_NOTES.json`. They were made with the built-in ImageGen tool and optimized for the app.

Editable sources: `extensions/trail-detective.js`/`.css`, the updated `writing-desk.js`/`.css`, and `workshop-covers.js`/`.css`. Run the sync script after source edits. Current total: **337 entries, nine workshops, 48 badges**. Existing fuel labs, both Shop Detective cases, Money Lab corrections, saved-project migration, runner isolation, writing templates and earned progress remain.

New tests exercise all 35 selectable clues/answers, keyboard clue selection, first/replay XP, best stars/ranks/badges, profile switching/resume/restore, all four added spelling/code modes, muted Letter fallback, code shifts, asynchronous clipboard ownership, nine distinct image assets and three course headers. Real Chromium checks at 1366×768 and 390×844 verify loaded images, native detective/word-game controls and no page errors or horizontal overflow. Actual speech output, printing and physical-device/Safari testing remain open. Hosting is unchanged.

## Bicycle Workshop (v0.10.0)

24 entries bring the total to 361 lessons, ten workshops and 52 badges. Includes gear-ratio, indexing and travel-limit controls; five brake schematics (side-pull, center-pull, V-brake, disc and coaster); tire-pressure constraint practice; ordered tube-patch rehearsals; maintenance, pedal retention, wheels, bearings, fit, tools, restoration and two diagnosis cases. Front derailleur and cantilever details are explained in lessons; schematics are illustrative, not installation or force predictions.

The pressure example uses a fictional 40–65 psi tire and 55 psi rim limit. It does not calculate a real bicycle setting. Real pressure and component adjustments require tire/wheel/component instructions. Improvised donor-tube patches are presented as a supervised practical repair with adhesive-compatibility and leak checks, not as equivalent to a matched commercial vulcanizing patch.

My Bicycle stores each learner’s bike information and dated service entries in `p.bicycle`; unfinished lessons use owner-bound `drafts['bike:'+id]` and the existing resume/backup mechanism. Completion awards 25 XP once per lesson. The generated cover is `artwork/bicycle.webp`, with exact prompt and method in `artwork/ASSET_NOTES.json`.

Editable sources: `extensions/bicycle.js`, `extensions/bicycle.css`. Run the sync script, `npm test`, and optionally `npm run test:browser`. The live v0.9.1 Word Machine speech code is preserved; the unpublished v0.9.2 experiment is excluded. The earlier Sites preview and main remain unchanged.

## Game Lab heroes and Robot Builder (v0.11.0)

Game Lab now offers person, puppy, dinosaur, robot and kitten heroes. Choose above a game or in Studio Customize; blocks/fill controls and typed `player.look` support the same choices. A program can override the starting choice. Per-learner `p.gmLook` supplies a default while each studio slot retains its own `cfg.look`. The current detailed person drawing and sandboxed game execution are preserved. Robot appearance is captured in `player.robot` from the owner’s saved design, so rendering a saved game never reads another learner’s robot. Collision radius and mission goals are unchanged.

Robot Builder is in Circuit Lab: nine design-rule missions (rbb1–rbb9), live SVG, parts, up to three sensors, color/name, save and explanatory pass/fail feedback. Stats and mission results are illustrative, not measured engineering performance or executable autonomous control. Battery capacity/load determine real runtime; stored solar energy can work at night, but the model’s small solar pack is undersized for its night mission. Camera missions assume suitable programming and lighting. Material explanations distinguish magnetic steel from all steels.

`p.robot` stores the explicitly saved design; `p.drafts.rbb` stores unfinished work with existing resume and backup support. Save/input/actions check the active owner. Successful missions award 25 XP once; replay gives none. Total: 370 lesson entries, ten workshops and 53 badges. All Bicycle Workshop and confirmed v0.9.1 sound behavior remains.

Editable additions: extensions/robot-builder.js/.css. Core game changes remain in canonical index.html. Run sync-discovery, npm test and optional npm run test:browser. Import details: ROBOT-BUILDER-IMPORT.md.
