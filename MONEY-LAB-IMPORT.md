# Historical supplied package notes

Integrated into v0.8.0 on top of current GitHub v0.7.0, alongside the new injection/no-start activities. Read CLAUDE-HANDOFF.md for current source, validation and limits. The price/source/date and Chromium-test claims below are the supplied package author’s notes, not independent verification by this merge. The merged UI labels prices as practice inputs. This merge adds owner-bound budget drafts/resume, guarded XP, stable surprises, validated price edits and explicit modeling limits.

# Writing Desk, Spelling Quest and Money Lab (on top of v0.5.0, commit c51ba99)

Adds two workshops: **Writing Desk** (16 templates, an offline kid-friendly spell checker, and Spelling Quest) and **Money Lab** (4 budget missions with real fall-2026 prices). Order in the standalone HTML: writing-desk.js, then writing-templates-2.js, then money-lab.js, placed just before the Time Pass block. The CSS files go before the first `</style>`.

## Hooks in index.html (one-line edits)
- render switch: `case "wd":h=vWd();break;` `case "sq":h=vSq();break;` `case "mn":h=vMn();break;` `case "mnp":h=vMnBook();break;`
- back list: add `v.s==="wd"||v.s==="sq"||v.s==="mn"||v.s==="mnp"`
- lesson dispatch: `else if(lk==="wd"){wdNew(id)}` and `else if(lk==="mn"){mnOpen(id)}`
- default click route, at the start: `(a.indexOf("mn")===0&&mnClick(a,id))||(a.indexOf("wd")===0&&wdClick(a,id,el))||(a.indexOf("sq")===0&&sqClick(a,id,el))||`

## Writing Desk
- Templates wt1-wt16: adventure story, friendly letter, thank-you note, formal letter, trail journal, outing report, how-to guide, book or Bible story report, newspaper editorial, news article, persuasive essay, speech, poem, biography, interview, devotion journal. Each has a guide and a live checklist.
- Spell checker: Hunspell en_US plus a word-frequency filter (48,743 words, 2,280 names). Profanity is removed. It knows common kid misspellings, gives "why" tips, checks confusable words (their/there, your/you're, its/it's, then/than, to/too, should of...), capitals, a/an, doubled words and end punctuation. Rebuild the dictionary with the tools/ scripts.
- Spelling Quest: each word a boy fixes is saved with its sentence. Review uses a 0/1/3/7-day schedule, and a word is mastered after box 4. Modes: quest, spell (speech), fix, missing letters, scramble, campfire (hangman). 10 XP per round, up to 30 XP a day.
- Profile data: `p.docs`, `p.mywords`, `p.sq`, `p.wdBig`, `p.sqQuiet`.

## Money Lab
- mn1 Campout cook ($70, 6 Trailmen), mn2 Gas money (convoy puzzle, 180 miles; cheapest is the 12-passenger van), mn3 Family groceries ($45, family of 4, 3 days), mn4 First month on your own ($15/hr example wage, 16% tax estimate, Bloomsburg rent, PA insurance, gas, phone, internet, giving, savings, a surprise expense).
- Stars: 1 = needs met within budget; 2 = variety (or saved 10% for mn4, or under $75 for mn2); 3 = 10% of the budget left (or covered the surprise from savings, or the cheapest convoy). `p.mnStars`; XP through awardLab on the first completion.
- Price book (`MNP`): every price has a source and date. Overrides are stored per device in `localStorage['shopclass.prices.v1']`; the Price book screen edits them.

## Price sources (checked Oct 24 2026)
- Bureau of Labor Statistics Average Price Data, Sep 2026: ground beef, chicken, eggs, bacon, beans, bread (per-lb x 1.25 for a 20 oz loaf), spaghetti, rice, bananas, potatoes, oranges, strawberries, tomatoes, romaine, milk, cheeses, chips, ice cream; Northeast electricity $0.266/kWh.
- Walmart.com product pages, Oct 2026: Ball Park hot dogs $5.74, GV buns $1.58, GV peanut butter 40 oz $4.18, GV pancake mix $2.18 (3-pack $6.54), Frosted Flakes family $4.48, GV mac & cheese $0.64 (12-pack $7.68), GV pasta sauce $2.14 (8-pack $17.12), GV water 24 pk $3.97, GV syrup $2.22 (3-pack $7.08), GV marshmallows $1.28, Honey Maid grahams $4.77, Hershey's 6 pk $5.97, Coleman propane 16 oz $5.47, Kingsford 16 lb $10.92, GV plates 100 ct $5.58.
- Estimate only: firewood bundle $8.
- Gas: PA regular $4.477 (AAA data via OilPriceAPI, 10/22/2026). Rent: Bloomsburg 1BR $1,047, 2BR $1,124 (Rentometer, 10/24/2026). Insurance: PA minimum $119/mo, full $248/mo (Experian, 10/13/2026). Phone: Mint Mobile 12-month 5GB $15, unlimited $30. Internet: Spectrum Internet Advantage $30 (TheSeniorList, 9/18/2026). PA minimum wage $7.25.

## Tested (headless Chromium)
Full letter flow, the editorial checklist, all Spelling Quest modes, all four Money Lab missions to 3 stars, price overrides and reset. The existing smoke, spotter, badge popup, unit folding, transistor, 31 Python solutions and Time Pass checks still pass. Not tested: real devices, speech output, printing.
