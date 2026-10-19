# Shop Class

A learning workshop built for the Stewart boys and their interests. It runs in a web browser, including on Chromebooks, with projects and progress saved in that browser.

## Current baseline

236 lesson entries across six workshops:

| Workshop | Entries |
| --- | ---: |
| Electronics | 24 |
| Circuit Lab, including digital logic and soldering | 53 |
| Game Lab | 20 |
| Auto Mechanics, including Engine Lab | 41 |
| Faith & Trail, including Knot Lab | 41 |
| Coding, including Python and Web Lab | 57 |

The build includes six illustrated workshop covers, 34 progress badges, a personal project shelf, four saved game slots and four saved web-page slots per learner, and export/restore of browser-local progress.

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
