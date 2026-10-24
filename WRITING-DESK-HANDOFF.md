# Writing Desk import history — see CLAUDE-HANDOFF.md for v0.8.0

Current build: 16 writing templates, eight workshops, 302 total lesson entries and 45 badges. The original eight-template package and v0.7.0 notes below are historical; later updates preserve the writing-save fixes and add Money Lab.

# Integrated into Shop Class v0.7.0

The original v0.5.0-based package below was merged into GitHub development v0.6.0. Current totals: 288 entries, seven workshops, 42 badges. Writing now saves immediately, delayed refresh checks owner/document, older documents are retained beyond 300, and round-end awards are guarded. See CLAUDE-HANDOFF.md for authoritative current validation and remaining work.

# Writing Desk + Spelling Quest (on top of v0.5.0, commit c51ba99)

Adds a seventh workshop, **Writing Desk**: 8 writing templates, an editor, a kid-friendly offline spell checker, and **Spelling Quest** (the "Word Machine"), whose word list is built from the words each boy actually misspells.

## Files
- `extensions/writing-desk.js`: dictionary data (`WD_DICT`, `WD_PROPER`, `WD_NOSUG`), the spelling engine (`WDEngine`), and the UI (`vWd`, `vWdHome`, `vSq`, click handlers, subject + badge registration). In the standalone HTML it sits just before the Time Pass block.
- `extensions/writing-desk.css`: appended to the main stylesheet (the first `</style>`).
- `tools/wd-expand-hunspell.py`, `tools/wd-build-dictionary.py`: rebuild the dictionary from `/usr/share/hunspell/en_US.dic` + `.aff`, keeping words that also appear in the `pyspellchecker` frequency list (count > 50). Profanity is removed; a few sensitive words are kept valid but never suggested.

## Hooks in index.html (4 one-line edits)
1. render switch: `case "wd":h=vWd();break;` and `case "sq":h=vSq();break;`
2. back handler list: add `v.s==="wd"||v.s==="sq"` (go to `path`)
3. lesson dispatch: `else if(lk==="wd"){wdNew(id)}`
4. default click route: `(a.indexOf("wd")===0&&wdClick(a,id,el))||(a.indexOf("sq")===0&&sqClick(a,id,el))||` at the start

## Storage (inside each profile in `shopclass.v1`; no new keys)
- `p.docs[]`: `{id,tpl,title,text,created,updated,fin,ign}`
- `p.mywords{}`: words the boy marked as spelled right
- `p.sq`: `{words:{key:{w,box,next,miss,right,wrong[],ctx,src,doc}}, mastered[], rounds, xpDay}`
- `p.wdBig`, `p.sqQuiet`: text size and sound preferences

## XP and badges
- Finishing a template the first time: `awardLab(templateId)` (25 XP; 5 for later ones of the same type). Blank page: 10 XP.
- A Spelling Quest round gives 10 XP, up to 30 XP a day.
- New badges: Published writer (finish 3 pieces), Spelling quester (5 rounds), Word smith (master 10 words). The badge list also generates the subject Starter and Master badges automatically.

## Tested
Headless Chromium: the full letter flow (11 issues found, fixed, finished, +25 XP), word capture with the sentence it came from, all five game modes plus the mixed quest, keyboard input, and no page errors. The existing smoke, spotter, badge popup, unit folding/Continue, transistor, all 31 Python solutions and Time Pass tests still pass.
Not tested: real devices, actual speech output, and printing.
