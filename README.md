# Shop Class

A learning workshop built for the Stewart boys and their interests. It runs in a web browser, including on Chromebooks, with projects and progress saved in that browser.

## Current baseline

288 lesson entries across seven workshops:

| Workshop | Entries |
| --- | ---: |
| Electronics | 24 |
| Circuit Lab, including logic, soldering, computer, robotics and transistors | 77 |
| Game Lab | 20 |
| Auto Mechanics, including Engine Lab | 47 |
| Faith & Trail, including Knot Lab | 41 |
| Coding, including Python and Web Lab | 71 |
| Writing Desk | 8 |

The build includes six illustrated workshop covers, 42 progress badges, a personal project shelf, four saved game slots and four saved web-page slots per learner, and export/restore of browser-local progress.

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
