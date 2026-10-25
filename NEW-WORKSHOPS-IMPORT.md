# Historical Claude package notes

Merged into v0.9.0 on top of current v0.8.0, keeping its writing, money and fuel-system fixes. The runtime contains 35 Trail Detective cases even though the supplied introduction says 10. Incoming price and test assertions below are the package author’s notes; current behavior and validation are in CLAUDE-HANDOFF.md. The merge adds detective persistence/phase/XP guards, new photographic art, and corrections to four clue explanations.

# Writing Desk, Spelling Quest, Money Lab and Trail Detective (on top of v0.5.0, commit c51ba99)

Adds two workshops: **Writing Desk** (16 templates, an offline kid-friendly spell checker, and Spelling Quest) and **Money Lab** (4 budget missions with real fall-2026 prices). Also **Trail Detective** (10 original solve-it-yourself mysteries). Order in the standalone HTML: writing-desk.js, writing-templates-2.js, money-lab.js, trail-detective.js, placed just before the Time Pass block. The CSS files go before the first `</style>`.

## Hooks in index.html (one-line edits)
- render switch: `case "wd":h=vWd();break;` `case "sq":h=vSq();break;` `case "mn":h=vMn();break;` `case "mnp":h=vMnBook();break;` `case "td":h=vTd();break;`
- back list: add `v.s==="wd"||v.s==="sq"||v.s==="mn"||v.s==="mnp"||v.s==="td"`
- lesson dispatch: `else if(lk==="wd"){wdNew(id)}`, `else if(lk==="mn"){mnOpen(id)}`, `else if(lk==="td"){tdOpen(id)}`
- default click route, at the start: `(a.indexOf("td")===0&&tdClick(a,id))||(a.indexOf("mn")===0&&mnClick(a,id))||(a.indexOf("wd")===0&&wdClick(a,id,el))||(a.indexOf("sq")===0&&sqClick(a,id,el))||`

## Writing Desk
- Templates wt1-wt16: adventure story, friendly letter, thank-you note, formal letter, trail journal, outing report, how-to guide, book or Bible story report, newspaper editorial, news article, persuasive essay, speech, poem, biography, interview, devotion journal. Each has a guide and a live checklist.
- Spell checker: Hunspell en_US plus a word-frequency filter (48,743 words, 2,280 names). Profanity is removed. It knows common kid misspellings, gives "why" tips, checks confusable words (their/there, your/you're, its/it's, then/than, to/too, should of...), capitals, a/an, doubled words and end punctuation. Rebuild the dictionary with the tools/ scripts.
- Spelling Quest: each word a boy fixes is saved with its sentence. Review uses a 0/1/3/7-day schedule, and a word is mastered after box 4. Modes: quest, spell (speech), fix, missing letters, scramble, campfire (hangman), plus three modes from the classic handheld spelling toy: Say it (study mode: shows the word, spells it aloud, no score, no XP), Letter (hear a letter and press it; the letter is shown if there is no speech or after a miss), Secret code (crack a Caesar-shifted quest word, key 1-3 by level, with a plain/code alphabet strip). Code maker writes and reads coded messages with keys 1-25. 10 XP per round, up to 30 XP a day.
- Profile data: `p.docs`, `p.mywords`, `p.sq`, `p.wdBig`, `p.sqQuiet`.

## Money Lab
- mn1 Campout cook ($70, 6 Trailmen), mn2 Gas money (convoy puzzle, 180 miles; cheapest is the 12-passenger van), mn3 Family groceries ($45, family of 4, 3 days), mn4 First month on your own ($15/hr example wage, 16% tax estimate, Bloomsburg rent, PA insurance, gas, phone, internet, giving, savings, a surprise expense).
- Stars: 1 = needs met within budget; 2 = variety (or saved 10% for mn4, or under $75 for mn2); 3 = 10% of the budget left (or covered the surprise from savings, or the cheapest convoy). `p.mnStars`; XP through awardLab on the first completion.
- Price book (`MNP`): every price has a source and date. Overrides are stored per device in `localStorage['shopclass.prices.v1']`; the Price book screen edits them.

## Trail Detective
- td1-td35, all original (no characters, places or plots from published series). Cast: Walter "Dictionary" Dunn (read the dictionary twice), partner Molly Kincaid, his dad Hank Dunn (mechanic, Dunn's Garage), rival Duke Sharpe and the Sharks; town: Hollow Creek. Each case opens with a Word of the Day tied to the clue (`word: [word, pronunciation, part of speech, definition]`).
- Flow: read, tap the sentence with the clue (`clue` substring), answer the multiple choice, see the solution. Stars: 3 minus one for a missed clue tap and one for a missed answer. `p.tdStars`; XP through awardLab on the first solve; ranks from Rookie to Chief Detective; badge "Sharp eye" (5 three-star cases).
- Clues (1-10): fresh mud after rain, sunset direction, unmelted ice, February 30, a warm ticking engine, candle burn rate, noon shadows, flash-to-thunder time, snow covering tracks, a dog that did not bark.
- Clues (11-35): new moon, deeper footprints when carrying weight, dry shoes on a dewy field, trip odometer, black motor oil, a rusty nail, a too-big bean plant, a postmark, a coin marked B.C., penguins at the North Pole, gold is not magnetic, an empty rain gauge, dry ashes, a matching misspelling, making change, April apples, hiking pace, cat tracks without claw marks, fireflies in December, wet paint, Thanksgiving is a Thursday, ice in a warm week, no Book of Hezekiah, the penny tire-tread test, old eggs float.
- Ranks: Rookie, Junior Detective (1), Detective (5), Senior Detective (12), Chief Detective (25), Master Detective (35).

## Price sources (checked Oct 24 2026)
- Bureau of Labor Statistics Average Price Data, Sep 2026: ground beef, chicken, eggs, bacon, beans, bread (per-lb x 1.25 for a 20 oz loaf), spaghetti, rice, bananas, potatoes, oranges, strawberries, tomatoes, romaine, milk, cheeses, chips, ice cream; Northeast electricity $0.266/kWh.
- Walmart.com product pages, Oct 2026: Ball Park hot dogs $5.74, GV buns $1.58, GV peanut butter 40 oz $4.18, GV pancake mix $2.18 (3-pack $6.54), Frosted Flakes family $4.48, GV mac & cheese $0.64 (12-pack $7.68), GV pasta sauce $2.14 (8-pack $17.12), GV water 24 pk $3.97, GV syrup $2.22 (3-pack $7.08), GV marshmallows $1.28, Honey Maid grahams $4.77, Hershey's 6 pk $5.97, Coleman propane 16 oz $5.47, Kingsford 16 lb $10.92, GV plates 100 ct $5.58.
- Estimate only: firewood bundle $8.
- Gas: PA regular $4.477 (AAA data via OilPriceAPI, 10/22/2026). Rent: Bloomsburg 1BR $1,047, 2BR $1,124 (Rentometer, 10/24/2026). Insurance: PA minimum $119/mo, full $248/mo (Experian, 10/13/2026). Phone: Mint Mobile 12-month 5GB $15, unlimited $30. Internet: Spectrum Internet Advantage $30 (TheSeniorList, 9/18/2026). PA minimum wage $7.25.

## Tested (headless Chromium)
Full letter flow, the editorial checklist, all Spelling Quest modes, all four Money Lab missions to 3 stars, price overrides and reset. The existing smoke, spotter, badge popup, unit folding, transistor, 31 Python solutions and Time Pass checks still pass. Not tested: real devices, speech output, printing.
