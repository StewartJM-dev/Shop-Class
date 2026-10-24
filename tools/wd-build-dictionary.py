import json,math,re
d=json.load(open('raw.json'));fq=d['fq']
lower=[w for w in d['lower'] if "'" not in w and fq.get(w,0)>50]
# Words a boy should see flagged rather than silently accepted.
bad=set("""damn damned damnit dammit hell hells shit shits shitty crap crappy piss pissed pissing bastard bastards bitch bitches bitchy ass asses asshole assholes fuck fucks fucked fucking fucker dick dicks cock cocks pussy whore whores slut sluts tit tits boob boobs boobies sexy porn porno horny screw screwed screwing bloody bollocks wank wanker jerkoff nigger niggers faggot faggots fag fags retard retards retarded douche douchebag cunt cunts twat twats prick pricks arse arses arsehole shithead bullshit horseshit dickhead dickheads motherfucker motherfuckers goddamn goddamned goddam jackass dumbass smartass badass titty titties boner boners dildo dildos cum jizz wtf hooker hookers pimp pimps skank slutty whorehouse""".split())
lower=[w for w in lower if w not in bad]
# Known kid misspellings that some word lists accept anyway.
mis=set("alot thier recieve wierd untill definately becuase freind tommorow tomorow wich alright".split())
lower=[w for w in lower if w not in mis or w=='alright']
lower=[w for w in lower if w not in ('cant','wont')]
extra="""campfire campfires campout campouts campsite campsites carabiner carabiners paracord tarp tarps bivouac lashing lashings bowline hitch hitches taut clove sheepshank troop troops trailman trailmen patrol patrols woodlands navigators adventurers trailhead trailheads backpacking firestarter tinder kindling knot knots compass compasses headlamp headlamps flashlight multitool hatchet hatchets saw saws whittle whittling whittled pocketknife pocketknives totin chit canoe canoes canoeing kayak kayaks kayaking rappel rappelling orienteering geocache geocaching scripture scriptures psalm psalms proverbs gospel gospels disciple disciples apostle apostles pharisee pharisees sabbath hallelujah amen hosanna messiah tabernacle covenant genesis exodus leviticus deuteronomy resistor resistors capacitor capacitors transistor transistors diode diodes breadboard breadboards multimeter multimeters solder soldering soldered arduino python javascript html css website websites emoji emojis online offline email emails app apps smartphone smartphones laptop laptops wifi homeschool homeschooled homeschooling okay ok""".split()
proper=[w for w in d['proper'] if fq.get(w.lower(),0)>400]
properx="""Jesus Christ God Lord Bible Trail Life Noah Moses Abraham Isaac Jacob Joseph David Goliath Daniel Samuel Stephen Timothy Paul Peter John Mary Martha Lazarus Elijah Elisha Jonah Nehemiah Isaiah Jeremiah Ezekiel Ruth Esther Gideon Joshua Caleb Solomon Saul Bethlehem Nazareth Jerusalem Galilee Israel Egypt Pennsylvania America American Americans English Monday Tuesday Wednesday Thursday Friday Saturday Sunday January February March April May June July August September October November December Christmas Easter Thanksgiving Halloween Mr Mrs Ms Dr""".split()
proper=sorted(set(proper)|set(properx))
words={}
for w in lower:words[w]=fq.get(w,0)
for w in extra:words.setdefault(w,3000)
def enc(ws,fqf):
    out=[];prev=''
    for w in sorted(ws):
        n=0
        while n<len(prev) and n<len(w) and prev[n]==w[n] and n<35:n+=1
        b=max(0,min(25,int(math.log2(max(1,fqf(w))))))
        out.append('0123456789abcdefghijklmnopqrstuvwxyz'[n]+chr(65+b)+w[n:])
        prev=w
    return ''.join(out)
# Entries are self-delimiting: prefix char (0-9a-z) + bucket (A-Z) + lowercase suffix.
D=enc(words,lambda w:words[w])
P=enc([p.lower() for p in proper],lambda w:max(fq.get(w,0),3000))
NOSUG=[w for w in 'sex sexy sexual sexually rape raped rapes rapist naked nude nudes nudity porn anal orgy kinky erotic suicide'.split() if w in words]
js='var WD_NOSUG="'+' '.join(NOSUG)+'";\n'+'var WD_DICT="'+D+'";\nvar WD_PROPER="'+P+'";\n'
open('wd_dict.js','w').write(js)
print(len(words),'words',len(proper),'proper',len(js),'bytes')
