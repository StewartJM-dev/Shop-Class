/* BEGIN TRAIL DETECTIVE */
/* ===== TRAIL DETECTIVE: original solve-it-yourself mysteries ===== */
var TDC={c:"#5F3DC4",cd:"#3B2580"};
/* Each case: story paragraphs; clue = a phrase inside the sentence that gives it away; q = question; o = options (first is right); hint; sol = solution. */
var TDCASES=[
  {
    "id": "td1",
    "title": "The Case of the Missing Pie",
    "word": [
      "alibi",
      "AL-uh-bye",
      "noun",
      "A claim that you were somewhere else when something happened."
    ],
    "story": [
      "Walter Dunn read the whole dictionary, cover to cover, twice. Nobody in Hollow Creek calls him Walter anymore. They call him Dictionary.",
      "Dictionary runs the Dunn Detective Agency out of the back room of his father's garage. The sign on the door says: NO CASE TOO SMALL. ONE DOLLAR PER CASE. FREE IF I'M WRONG.",
      "So far, he has never given anybody their dollar back.",
      "On the spring campout, Patrol 3 woke up to a terrible crime. The cherry pie was gone. Mrs. Kincaid had baked it, and it had been sitting in the food tent when the patrol went to bed at ten o'clock.",
      "Molly Kincaid was not happy. It had been her mother's pie, and Molly was the fastest runner and the best tracker in the troop. Nobody wanted Molly unhappy.",
      "\"Don't look at me,\" said Grant Hubbard. \"I went to bed at ten and slept straight through until breakfast. I never left my tent.\"",
      "Dictionary looked around camp. A thunderstorm had rolled in at midnight and rained hard until two in the morning. Now the path to the food tent was thick, sticky mud.",
      "Grant's boots sat outside his tent door. They were caked with fresh mud up to the laces.",
      "Dictionary took out his notebook. \"Grant,\" he said, \"that's a good alibi. Too bad your boots don't agree with it.\""
    ],
    "clue": "caked with fresh mud",
    "q": "How did Dictionary know Grant was not telling the truth?",
    "o": [
      "His boots were covered in fresh mud, but the mud only formed after midnight",
      "Grant had cherry stains on his hands",
      "Grant was the last one to go to bed",
      "Grant's tent was the closest to the food tent"
    ],
    "hint": "When did the path turn into mud?",
    "sol": "The ground was dry at ten o'clock. It only turned to mud after the storm, between midnight and two. If Grant had stayed in his tent all night, his boots would be clean. Fresh mud means he walked through camp after the rain started. Grant baked Mrs. Kincaid a new pie, with help."
  },
  {
    "id": "td2",
    "title": "The Case of the Backward Sunset",
    "word": [
      "orient",
      "OR-ee-ent",
      "verb",
      "To figure out which way is north, south, east and west."
    ],
    "story": [
      "Duke Sharpe was thirteen, and he was the leader of a gang of older boys called the Sharks. The Sharks met in an old rowboat that had sunk halfway into the mud behind the marina.",
      "Duke had a big grin and a bigger appetite for trouble. Dictionary had spoiled more of Duke's schemes than anyone in Hollow Creek.",
      "On Wednesday evening, somebody let the air out of all the bike tires parked behind the church. Twelve bikes. Forty-eight flat tires.",
      "\"Wasn't me,\" said Duke, leaning against the church fence. \"At sunset I was hiking the Ridge Trail. The trail runs straight east from the parking lot. I walked an hour away from my car.\"",
      "\"Was it a nice evening?\" asked Dictionary.",
      "\"Beautiful,\" said Duke. \"I watched the sun go down right in front of me the whole way. Turned the whole sky orange. You should get out more, Dictionary.\"",
      "Dictionary wrote one word in his notebook. Then he handed Duke a bicycle pump.",
      "\"Duke,\" he said, \"you'd better get started. You have forty-eight tires to fill.\""
    ],
    "clue": "the sun go down right in front of me",
    "q": "What was wrong with Duke's story?",
    "o": [
      "The sun sets in the west, so walking east it would be behind him",
      "The Ridge Trail does not exist",
      "It was cloudy on Wednesday",
      "Bikes are not allowed at church"
    ],
    "hint": "Which direction does the sun set?",
    "sol": "The sun always sets in the west. Duke said he walked east the whole time, so the sunset would have been behind him, not in front of him. Duke never went on that hike. He was busy behind the church."
  },
  {
    "id": "td3",
    "title": "The Case of the Lazy Lemonade",
    "word": [
      "evidence",
      "EV-ih-dence",
      "noun",
      "Something you can see or touch that helps show what is true."
    ],
    "story": [
      "It was the hottest day of July, ninety-seven degrees in the shade. Lily and Ben Ortiz were selling lemonade at the end of their driveway, and business was booming.",
      "Then the money jar disappeared.",
      "Ben ran all the way to the Dunn Detective Agency and slapped a dollar on the desk. \"Eleven dollars and forty cents,\" he panted. \"Gone.\"",
      "Back at the stand, Rocky Sharpe sat on a lawn chair in the full sun. Rocky was Duke Sharpe's little brother, and he had learned everything he knew from Duke.",
      "\"I've been right here the whole time,\" said Rocky. He pointed to a full glass of lemonade on the table beside him. \"I poured that an hour ago, and I've been sipping it slow ever since. Nobody came by. Maybe the wind took the jar.\"",
      "Dictionary picked up the glass. It was cold and wet on the outside, and four big ice cubes clinked inside, still square at the corners.",
      "\"Rocky,\" said Dictionary, \"the wind didn't take the jar. And you didn't sit here for an hour. This glass is all the evidence I need.\""
    ],
    "clue": "four big ice cubes clinked inside, still square at the corners",
    "q": "How did Dictionary know the glass was not poured an hour ago?",
    "o": [
      "Ice would have melted on a 97 degree day in the sun",
      "The glass was a different color",
      "Rocky does not like lemonade",
      "The lemonade was too sour"
    ],
    "hint": "What happens to ice on a hot day?",
    "sol": "On a ninety-seven degree day, in full sun, ice cubes melt in minutes. After an hour they would be gone, or at least small and rounded. Square ice cubes mean the glass was poured just a minute ago. Rocky had been somewhere else, hiding a money jar."
  },
  {
    "id": "td4",
    "title": "The Case of the Counterfeit Check",
    "word": [
      "counterfeit",
      "COUN-ter-fit",
      "adjective",
      "Fake, and made to fool people into thinking it is real."
    ],
    "story": [
      "Mr. Duncan was the oldest man in Hollow Creek and the kindest. He believed everything anybody told him. That worried Dictionary.",
      "On Saturday, Mr. Duncan sold his old aluminum canoe to a man in a shiny green suit. The man paid with a check for three hundred dollars.",
      "\"He was very friendly,\" Mr. Duncan said, showing the check to Dictionary and Molly. \"He even wrote the date on it carefully: February 30th. He said the bank would pay me on Monday.\"",
      "Molly squinted at the check. \"His handwriting is nice,\" she said.",
      "\"His handwriting is the only nice thing about it,\" said Dictionary. He held the check up to the light and read it twice.",
      "\"Mr. Duncan,\" he said, \"call my dad at the garage. Ask him to call the state police. That canoe is on a trailer behind a car somewhere, and that check is counterfeit.\""
    ],
    "clue": "February 30th",
    "q": "What gave the check away as a fake?",
    "o": [
      "February never has 30 days",
      "Checks must be written in pencil",
      "300 dollars is too much for a canoe",
      "Banks are closed in February"
    ],
    "hint": "Count the days in each month.",
    "sol": "February has 28 days, or 29 in a leap year. There is no February 30th. A real buyer would write a real date. The man in the green suit never planned for that check to be paid. The state police found the canoe two towns over."
  },
  {
    "id": "td5",
    "title": "The Case of the Warm Hood",
    "word": [
      "combustion",
      "com-BUS-chun",
      "noun",
      "Burning. A car engine runs on thousands of tiny bursts of burning fuel, which makes a lot of heat."
    ],
    "story": [
      "Hank Dunn, Dictionary's father, ran the best garage in Hollow Creek. He could tell what was wrong with a car by listening to it idle, the way a doctor listens to a heartbeat.",
      "On a frosty November morning, Mrs. Hill's mailbox was found knocked flat. There were tire marks in the frozen grass beside it.",
      "Mr. Dunn and Dictionary walked next door to talk to Buzz Fenton, a sixteen-year-old with a new driver's license and an old blue pickup.",
      "\"My truck hasn't moved since last night,\" said Buzz. \"I parked it at nine and went to bed. Look, it's covered in frost.\"",
      "The windshield was white with frost. But Mr. Dunn laid his hand flat on the hood. It was warm, and from under the truck came a soft tick, tick, tick.",
      "Mr. Dunn looked at Dictionary. Dictionary looked at Mr. Dunn. Neither of them needed to say it.",
      "\"Buzz,\" said Mr. Dunn kindly, \"let's go talk to Mrs. Hill. And then I'll show you how to fix a mailbox post.\""
    ],
    "clue": "It was warm, and from under the truck came a soft tick",
    "q": "How did Mr. Dunn know the truck had just been driven?",
    "o": [
      "A warm hood and a ticking engine mean it was running recently",
      "The tires were flat",
      "The truck was parked crooked",
      "Frost only forms on trucks that have moved"
    ],
    "hint": "What does an engine do after it is turned off?",
    "sol": "Combustion makes an engine very hot. After it is shut off, the hot metal cools and shrinks, and it makes a ticking sound. On a frosty morning, a hood that sat out all night would be ice cold. Warm and ticking means the truck was driven in the last few minutes. The windshield frost just had not melted yet."
  },
  {
    "id": "td6",
    "title": "The Case of the Candle Clock",
    "word": [
      "rate",
      "RAYT",
      "noun",
      "How fast something happens, like one inch per hour or fifty miles per hour."
    ],
    "story": [
      "Every Tuesday night, Troop 12 met in the church basement. Every Tuesday night, Mrs. Abernathy brought two dozen chocolate chip cookies. And every Tuesday night, the cookies lasted exactly as long as the closing prayer.",
      "This Tuesday, they did not last that long. The meeting started at 7:00. By 7:30, the plate was empty.",
      "\"I couldn't have done it,\" said Owen Pruitt. \"I lit the candle in the prayer corner at 6:00, and then I went straight outside to help unload the trailer. I was out there until the meeting started.\"",
      "Dictionary knew those candles. The troop bought them from the hardware store, and they burned down exactly one inch every hour. A new one was 8 inches tall.",
      "At 7:30, Dictionary measured the candle in the prayer corner. It was 7 and three-quarter inches tall.",
      "\"Owen,\" said Dictionary, \"that candle is a clock. And it says you were inside a lot later than 6:00.\""
    ],
    "clue": "It was 7 and three-quarter inches tall",
    "q": "What did the candle prove?",
    "o": [
      "It had only burned a quarter inch, so it was lit about 7:15, not 6:00",
      "The candle was the wrong color",
      "Candles cannot be lit before a meeting",
      "The candle was taller than when it started"
    ],
    "hint": "At one inch per hour, how much should it have burned from 6:00 to 7:30?",
    "sol": "At a rate of one inch per hour, a candle lit at 6:00 would have burned an inch and a half by 7:30, leaving 6 and a half inches. It had only burned a quarter inch, which takes about 15 minutes. So Owen lit it around 7:15, right when the cookies disappeared."
  },
  {
    "id": "td7",
    "title": "The Case of the Noon Photo",
    "word": [
      "zenith",
      "ZEE-nith",
      "noun",
      "The point in the sky straight above your head."
    ],
    "story": [
      "The Hollow Creek Hardware Store held a photo contest every summer. This year the prize was a brand-new pocketknife with eleven tools, including a tiny saw.",
      "Duke Sharpe wanted that knife more than he had ever wanted anything, except maybe a second dessert.",
      "The rules were simple. The photo had to be taken at exactly noon on June 21st, the first day of summer, in Hollow Creek.",
      "Duke turned in a photo of himself standing in Miller's open hay field. His shadow stretched out long behind him, three times as long as he was tall.",
      "\"Taken at noon on the dot,\" Duke told the judges. \"I set an alarm.\"",
      "Dictionary was helping the judges that year. He studied the photo for a long time. Then he handed it back.",
      "\"Nice field, Duke,\" he said. \"But that picture was taken when you were supposed to be eating supper.\""
    ],
    "clue": "three times as long as he was tall",
    "q": "How did Dictionary know?",
    "o": [
      "At noon in summer the sun is high, so shadows are short",
      "You cannot take photos in a field",
      "Shadows only appear in winter",
      "The photo was black and white"
    ],
    "hint": "Where is the sun in the sky at noon in summer?",
    "sol": "At noon on the first day of summer, the sun is nearly as close to the zenith as it ever gets, and shadows are short, shorter than you are tall. A shadow three times your height means the sun is low in the sky, in the early morning or the evening."
  },
  {
    "id": "td8",
    "title": "The Case of the Close Call",
    "word": [
      "interval",
      "IN-ter-vul",
      "noun",
      "The time between two things happening."
    ],
    "story": [
      "Bragging Brad Tolliver had never told a small story in his life. If he caught a fish, it was a whale. If he climbed a tree, it was a mountain.",
      "So when a big oak at Hollow Creek State Park was split down the middle by lightning, and a picnic table under it was smashed, Brad had a story ready.",
      "\"I was standing right next to that tree when it got hit!\" he told a crowd of campers. \"I was trying to save the table. There was a huge flash, then I counted ten seconds, and then the thunder boomed.\"",
      "The campers gasped. The ranger raised an eyebrow. Dictionary wrote \"ten seconds\" in his notebook and underlined it twice.",
      "\"Brad,\" said Dictionary, \"you were never near that tree. And I think the ranger would like to know who really knocked that table over.\""
    ],
    "clue": "I counted ten seconds, and then the thunder boomed",
    "q": "What was wrong with Brad's story?",
    "o": [
      "Thunder from a strike right next to you comes almost instantly, not 10 seconds later",
      "Lightning never hits oak trees",
      "Thunder comes before lightning",
      "You cannot count during a storm"
    ],
    "hint": "Light travels much faster than sound. How long does sound take to go a mile?",
    "sol": "Light reaches you almost instantly, but sound travels about one mile every five seconds. An interval of ten seconds between the flash and the thunder means the lightning struck about two miles away. If Brad had been next to the tree, the boom would have come at the same moment as the flash. Brad had knocked the table over himself, climbing on it, and he made up the lightning story to cover it."
  },
  {
    "id": "td9",
    "title": "The Case of the Snowy Sled",
    "word": [
      "accumulate",
      "uh-KYOO-myoo-late",
      "verb",
      "To pile up little by little, the way snow does."
    ],
    "story": [
      "Hollow Creek got eleven inches of snow overnight. It snowed until 7:00 in the morning, and then the sun came out over a perfect white world.",
      "By 8:00, Mrs. Garcia's brand-new red sled was missing from beside her shed.",
      "\"I saw the thief!\" said Spike Mullins. Spike was one of Duke Sharpe's Sharks. \"At 6:00 this morning I looked out my window and saw a kid in a blue coat carry it off. Probably a kid from the next town.\"",
      "Molly went to look first. She was the best tracker in the troop. Then she waved Dictionary over.",
      "The snow around the shed was smooth and deep, except for one set of sharp, fresh footprints going to the shed and coming back. They were the size of Spike's boots.",
      "\"Spike,\" said Dictionary, \"the snow tells a different story. And snow doesn't lie.\""
    ],
    "clue": "one set of sharp, fresh footprints going to the shed and coming back",
    "q": "Why couldn't the thief have come at 6:00?",
    "o": [
      "Snow fell until 7:00, so tracks from 6:00 would be covered, but these were sharp and fresh",
      "Nobody owns a blue coat",
      "Sleds are too heavy to carry",
      "It was too dark to see at 6:00"
    ],
    "hint": "What happens to footprints when it keeps snowing?",
    "sol": "Snow kept falling and accumulating until 7:00. Any tracks made at 6:00 would have been filled in and blurred by an hour of new snow. Sharp, fresh prints were made after the snow stopped. And the only tracks there matched Spike's boots. The sled turned up behind the Sharks' sunken rowboat."
  },
  {
    "id": "td10",
    "title": "The Case of the Quiet Dog",
    "word": [
      "habit",
      "HAB-it",
      "noun",
      "Something done the same way, every time, almost without thinking."
    ],
    "story": [
      "Mr. Patel's beagle, Biscuit, had one habit. He barked at every stranger who came up the driveway. Mail carriers. Pizza drivers. Even the neighbor's cat, who was not a stranger, but Biscuit did not trust her.",
      "On Sunday afternoon, someone took Mr. Patel's new fishing rod from his open garage. Biscuit was tied up in the yard, right next to the garage, the whole afternoon.",
      "\"Nobody heard a thing,\" said Mrs. Patel. \"It was so peaceful. Not a single bark all day.\"",
      "Three people had been on the street that afternoon: a man selling magazines door to door, a delivery driver from out of town, and Mr. Patel's nephew Luke, who came over every week to walk Biscuit.",
      "Dictionary knelt down and scratched Biscuit behind the ears. Biscuit's tail thumped the grass.",
      "\"Mr. Patel,\" said Dictionary, \"your rod wasn't stolen. It was borrowed. Biscuit told me who borrowed it.\""
    ],
    "clue": "Not a single bark all day",
    "q": "Who took the fishing rod?",
    "o": [
      "Luke, because Biscuit knows him and would not bark",
      "The magazine seller",
      "The delivery driver",
      "The neighbor's cat"
    ],
    "hint": "Who would Biscuit NOT bark at?",
    "sol": "Biscuit's habit was to bark at every stranger. The magazine seller and the delivery driver were strangers, so Biscuit would have barked his head off. A quiet dog means the person was someone Biscuit knew and liked: Luke. He had gone fishing and forgotten to ask. He brought back the rod and two nice trout."
  },
  {
    "id": "td11",
    "title": "The Case of the Moonlit Path",
    "word": [
      "phase",
      "FAYZ",
      "noun",
      "One stage in a pattern that repeats, like the shapes of the moon over a month."
    ],
    "story": [
      "The calendar on the wall of Dunn's Garage showed more than dates. It showed the moon. Mr. Dunn liked to know when the nights would be dark, because dark nights meant more fender-benders.",
      "On Saturday morning, the troop's new camping lantern was missing from the church shed.",
      "\"I saw who took it,\" said Spike Mullins. \"Friday night, around midnight. The full moon was so bright I could see his face plain as day. It was a kid from Millersburg, I'm sure of it.\"",
      "Dictionary walked over to the calendar. Under Friday there was a small black circle. It meant a new moon.",
      "\"Spike,\" said Dictionary, \"there was no moon to see by on Friday. Not a sliver. So how did you see anything at all, unless you were holding the lantern?\""
    ],
    "clue": "The full moon was so bright I could see his face plain as day",
    "q": "What was wrong with Spike's story?",
    "o": [
      "Friday was a new moon, so there was no moonlight at all",
      "The moon is never out at midnight",
      "Lanterns do not work at night",
      "Millersburg is too far away"
    ],
    "hint": "Look at the calendar. What kind of moon was it on Friday?",
    "sol": "During a new moon, the moon is between the earth and the sun, and its dark side faces us. There is no moonlight at all. A full moon and a new moon are two weeks apart. Spike could not have seen anyone by moonlight on Friday. He had the lantern himself."
  },
  {
    "id": "td12",
    "title": "The Case of the Heavy Footprints",
    "word": [
      "impression",
      "im-PRESH-un",
      "noun",
      "A mark pressed into something soft, like a footprint in mud."
    ],
    "story": [
      "After three days of spring rain, the path behind Mr. Duncan's barn was soft as pudding.",
      "On Monday morning, his bag of chicken feed was missing from the barn. It weighed fifty pounds.",
      "\"I walked out to the barn to look at the new chicks,\" said Duke Sharpe, \"and I walked right back. I didn't carry a thing. Ask anyone.\"",
      "Molly crouched by the path. Duke's sneaker prints went to the barn and came back.",
      "\"Look,\" Molly whispered. The prints going to the barn were shallow, barely pressed into the mud. The prints coming back were deep, sunk an inch into the mud, with the heels dug in hard.",
      "Dictionary nodded. \"Duke, those impressions say you came back a lot heavier than you went.\""
    ],
    "clue": "The prints coming back were deep",
    "q": "How did Dictionary know Duke carried something?",
    "o": [
      "His footprints were much deeper on the way back",
      "His footprints were a different size",
      "There were no footprints at all",
      "He was wearing boots instead of sneakers"
    ],
    "hint": "What happens to your footprints when you carry something heavy?",
    "sol": "Footprints sink deeper when you are heavier. Carrying a fifty-pound sack makes every step press harder into soft mud. Shallow prints going out and deep prints coming back mean Duke picked up something heavy at the barn."
  },
  {
    "id": "td13",
    "title": "The Case of the Dewy Lawn",
    "word": [
      "condensation",
      "con-den-SAY-shun",
      "noun",
      "Water that forms on something cool when water in the air turns to drops, like dew on morning grass."
    ],
    "story": [
      "Every morning at sunrise, the grass at Hollow Creek Park is soaked with dew. Walk across it in sneakers and your socks will be wet in ten steps.",
      "On Thursday, somebody painted a shark on the park's new sign during the night.",
      "\"I didn't do it,\" said Rocky Sharpe. \"I got to the park at six this morning to practice soccer. I ran laps across the whole field for an hour. The sign was already painted when I got there.\"",
      "Dictionary looked down at Rocky's white canvas sneakers. They were perfectly dry, with no grass stuck to them, and his socks were bright white.",
      "\"Rocky,\" he said, \"if you ran laps on that field at six this morning, your feet would be soaking wet.\""
    ],
    "clue": "They were perfectly dry, with no grass stuck to them",
    "q": "How did Dictionary know Rocky was not on the field at six?",
    "o": [
      "Morning dew would have soaked his canvas sneakers",
      "The park opens at noon",
      "Rocky does not play soccer",
      "The paint was not dry yet"
    ],
    "hint": "What covers the grass early in the morning?",
    "sol": "On cool nights, water in the air condenses on the grass as dew. At six in the morning, the field would be soaking wet. An hour of running laps would have left Rocky's canvas sneakers wet and covered in grass clippings. Dry, clean shoes mean he arrived later, after the sun dried the grass, or he was never on the field at all."
  },
  {
    "id": "td14",
    "title": "The Case of the Long Drive",
    "word": [
      "odometer",
      "oh-DOM-uh-ter",
      "noun",
      "The meter in a car that counts how many miles it has driven."
    ],
    "story": [
      "Mr. Kowalski's station wagon needed new brakes, so it spent two days at Dunn's Garage.",
      "When the job was done, Mr. Dunn test-drove it around the block. Then he did what he always did: he pressed the button that reset the trip odometer to zero.",
      "Rex Sharpe, Duke's sixteen-year-old cousin, worked for Mr. Kowalski. That afternoon Rex picked up the car to drive it home, two miles across town.",
      "Two hours later, Mr. Kowalski called the garage. \"Rex says he drove straight home,\" he said. \"But it took him two hours, and the gas tank is almost empty.\"",
      "Mr. Dunn and Dictionary drove over. Dictionary leaned in the window and read the dashboard. The trip odometer read 46.2 miles.",
      "\"Rex,\" said Mr. Dunn, \"either you drove straight home twenty-three times, or you took the long way.\""
    ],
    "clue": "The trip odometer read 46.2 miles",
    "q": "How did they know Rex did not drive straight home?",
    "o": [
      "The trip odometer was reset to zero, and now showed 46 miles, not 2",
      "The car was a different color",
      "The brakes squeaked",
      "Rex did not have a license"
    ],
    "hint": "What did Mr. Dunn always do after a test drive?",
    "sol": "Mr. Dunn reset the trip odometer to zero before Rex took the car. Driving straight home would add about 2 miles. 46.2 miles means Rex went for a long joyride, which also explains the empty gas tank."
  },
  {
    "id": "td15",
    "title": "The Case of the Black Oil",
    "word": [
      "viscous",
      "VIS-kus",
      "adjective",
      "Thick and slow to pour, like honey or motor oil."
    ],
    "story": [
      "Duke Sharpe had a new business. He painted a sign that said SHARKS QUICK OIL CHANGE, $20, WE COME TO YOU.",
      "Mrs. Abernathy paid him twenty dollars to change the oil in her car. Duke was under the car for five minutes. Then he wiped his hands on a rag and said, \"All done, fresh oil, good for three thousand miles.\"",
      "That night, Mrs. Abernathy mentioned it to Mr. Dunn at church. \"Five minutes seems fast,\" she said.",
      "On Monday, Mr. Dunn pulled out her dipstick and wiped it on a white rag. Dictionary looked at the rag. The oil was black as coffee and gritty between his fingers.",
      "\"Hold on,\" Mr. Dunn said. \"Dark oil alone cannot tell us when it was changed. The gritty material deserves an inspection, but we need more evidence before blaming anybody.\""
    ],
    "clue": "The oil was black as coffee and gritty",
    "q": "What should they do before deciding whether Duke changed the oil?",
    "o": [
      "Check service evidence and the cause of the grit; dark color alone cannot date an oil change",
      "The car was out of gas",
      "Duke used the wrong kind of rag",
      "Oil changes take exactly one hour"
    ],
    "hint": "Can color alone tell how long oil has been in an engine?",
    "sol": "Oil can darken as it works, sometimes soon after a change. Color alone does not prove that a service was skipped or tell an exact mileage. Grit warrants a professional check for contamination. Mr. Dunn checks the service record and what work was actually performed before reaching a conclusion.",
    "refs": [
      [
        "AMSOIL: why oil turns dark",
        "https://blog.amsoil.com/why-does-motor-oil-turn-black/"
      ]
    ]
  },
  {
    "id": "td16",
    "title": "The Case of the Rusty Nail",
    "word": [
      "oxidize",
      "OX-ih-dize",
      "verb",
      "To slowly combine with oxygen. When iron oxidizes, it turns into orange rust."
    ],
    "story": [
      "Rocky Sharpe wheeled his bike into Dunn's Garage with a flat back tire.",
      "\"I rode over Mr. Patel's driveway this morning, and they're building a new porch,\" Rocky said. \"I picked up this nail from their construction. Mr. Patel should pay for a new tire. Twenty dollars.\"",
      "Mr. Dunn pulled out the nail with pliers. It was covered in thick, flaky orange rust, all the way down to the point.",
      "Dictionary looked at the nail, then at the tire. The rubber around the hole was worn smooth, as if the nail had been riding along in there for a long time.",
      "\"Rocky,\" said Dictionary, \"that nail didn't come from Mr. Patel's porch this morning.\""
    ],
    "clue": "covered in thick, flaky orange rust, all the way down to the point",
    "q": "How did Dictionary know the nail had been in the tire a long time?",
    "o": [
      "A nail takes weeks to get that rusty, so it could not be from this morning",
      "Nails do not go into bike tires",
      "The nail was too short",
      "Mr. Patel uses screws, not nails"
    ],
    "hint": "How long does it take iron to rust?",
    "sol": "New nails from a construction site are shiny steel. Rust forms when iron oxidizes in air and moisture, and thick, flaky rust takes weeks or months. A nail rusted all the way to the point had been stuck in that tire for a long time. Rocky was trying to get a free tire."
  },
  {
    "id": "td17",
    "title": "The Case of the Overnight Beanstalk",
    "word": [
      "germinate",
      "JER-mih-nate",
      "verb",
      "When a seed starts to grow and sends out its first root and sprout."
    ],
    "story": [
      "The Hollow Creek science fair had a new contest: grow a bean plant from a seed. The tallest plant after two weeks would win a ribbon.",
      "On the last day, Duke Sharpe walked in with a bean plant in a paper cup. It stood eight inches tall, with a dozen green leaves.",
      "\"I forgot about the contest until yesterday,\" Duke said, \"so I planted the seed last night. I have a green thumb.\"",
      "Dictionary lifted the cup. Thick white roots had wrapped around and around the bottom of the dirt, and the plant had a dozen full-sized leaves.",
      "\"Duke,\" he said, \"that's a fine plant. But it didn't grow from a seed last night.\""
    ],
    "clue": "a dozen full-sized leaves",
    "q": "How did Dictionary know Duke did not plant it last night?",
    "o": [
      "A bean seed takes days to sprout and weeks to grow that big",
      "Beans only grow in winter",
      "Paper cups kill plants",
      "Bean plants do not have leaves"
    ],
    "hint": "How long does it take a seed to sprout?",
    "sol": "A bean seed needs several days just to germinate and poke up a sprout. Growing eight inches tall, with a dozen leaves and roots wrapped around the cup, takes weeks. Duke bought the plant at the garden center."
  },
  {
    "id": "td18",
    "title": "The Case of the Late Letter",
    "word": [
      "postmark",
      "POST-mark",
      "noun",
      "The stamp the post office puts on mail showing the date and place it was mailed."
    ],
    "story": [
      "The Hollow Creek Gazette held an essay contest every fall. The rule was simple: essays had to be mailed by October 1st.",
      "Duke Sharpe's essay arrived on October 6th. The editor said it was too late.",
      "\"That's not fair!\" Duke said. \"I mailed it on September 28th. The post office must have lost it for a week. I want my essay judged.\"",
      "The editor handed Dictionary the envelope. In the top corner, over the stamp, was a round black postmark. It said HOLLOW CREEK PA, OCT 4.",
      "\"Duke,\" said Dictionary, \"the post office didn't lose your letter. It got there fast. You just mailed it late.\""
    ],
    "clue": "It said HOLLOW CREEK PA, OCT 4",
    "q": "How did Dictionary know when Duke mailed it?",
    "o": [
      "The postmark shows the date it was mailed: October 4th",
      "The stamp was upside down",
      "The envelope was the wrong color",
      "Essays cannot be mailed"
    ],
    "hint": "What does the post office stamp on every letter?",
    "sol": "The post office puts a postmark on every letter on the day it is mailed. Duke's said October 4th, three days after the deadline, and the letter arrived two days later. If he had mailed it on September 28th, the postmark would say so."
  },
  {
    "id": "td19",
    "title": "The Case of the B.C. Coin",
    "word": [
      "chronology",
      "kruh-NOL-uh-jee",
      "noun",
      "The order in which events happened, and how we count the years."
    ],
    "story": [
      "Rex Sharpe showed up at the Hollow Creek flea market with a cigar box and a big smile.",
      "\"Genuine ancient Roman coin,\" he said, holding up a little bronze disc. \"Dug it up myself. Only fifty dollars.\"",
      "Mr. Duncan leaned in to look. He loved history. Around the edge of the coin were Roman letters, and stamped plainly in the center were the words MADE IN 50 B.C.",
      "\"It's two thousand years old,\" said Rex. \"You won't find another one like it.\"",
      "\"I'm sure you won't,\" said Dictionary. \"Mr. Duncan, put your wallet away.\""
    ],
    "clue": "stamped plainly in the center were the words MADE IN 50 B.C.",
    "q": "Why was the coin a fake?",
    "o": [
      "Nobody in 50 B.C. knew Christ would be born, so no coin could say B.C.",
      "Romans did not use coins",
      "Bronze was not invented yet",
      "Coins are never round"
    ],
    "hint": "What does B.C. stand for, and when did people start using it?",
    "sol": "B.C. means Before Christ. People started counting years that way hundreds of years after Jesus was born. In 50 B.C., nobody knew Jesus would be born fifty years later, so no coin made then could ever say B.C. Rex made that coin himself."
  },
  {
    "id": "td20",
    "title": "The Case of the Polar Penguin",
    "word": [
      "hemisphere",
      "HEM-iss-feer",
      "noun",
      "Half of the earth. The Northern Hemisphere is the half above the equator."
    ],
    "story": [
      "Duke Sharpe came back from summer vacation with a stack of photos and a big story.",
      "\"My uncle flew me to the North Pole,\" he told everybody at the swimming pool. \"We camped on the ice for a week. I'm selling these photos for two dollars each. They're rare.\"",
      "He held up a photo. It showed snow, ice, and a long line of black-and-white penguins waddling toward the water.",
      "\"Penguins at the North Pole,\" said Duke. \"Hundreds of them. They follow you around.\"",
      "Molly elbowed Dictionary. Dictionary was already shaking his head."
    ],
    "clue": "a long line of black-and-white penguins waddling toward the water",
    "q": "What was wrong with Duke's photo?",
    "o": [
      "Wild penguins live in the Southern Hemisphere, not at the North Pole",
      "Penguins cannot walk",
      "The North Pole has no snow",
      "Penguins are only brown"
    ],
    "hint": "Where in the world do wild penguins live?",
    "sol": "Wild penguins live only in the Southern Hemisphere, around Antarctica, South America, Africa, Australia and New Zealand. None live in the Arctic. At the North Pole you might see polar bears, but never a penguin. Duke's photo came from a zoo."
  },
  {
    "id": "td21",
    "title": "The Case of the Magnet Treasure",
    "word": [
      "magnetic",
      "mag-NET-ik",
      "adjective",
      "Pulled toward a magnet. Iron and steel are magnetic. Gold, silver and copper are not."
    ],
    "story": [
      "The Sharks had found treasure. At least, that is what Duke Sharpe said.",
      "\"Pirate gold,\" he announced, setting a pile of shiny yellow coins on the picnic table at the park. \"I found it with my treasure magnet. Watch.\"",
      "He held a big horseshoe magnet over the pile. Click, click, click. The gold coins jumped up and stuck to it.",
      "\"Five dollars a coin,\" said Duke. \"Real gold. The magnet proves it.\"",
      "\"It proves something,\" said Dictionary. \"Just not what you think.\""
    ],
    "clue": "The gold coins jumped up and stuck to it",
    "q": "How did the magnet prove the coins were fake?",
    "o": [
      "Gold is not magnetic, so real gold would not stick to a magnet",
      "Magnets only pick up silver",
      "Pirates never had gold",
      "The coins were too small"
    ],
    "hint": "Which metals stick to a magnet?",
    "sol": "Real gold is not magnetic. A magnet will not pick it up. The coins jumped to the magnet because they were made of iron or steel, painted gold. Duke's demonstration proved his coins were fakes."
  },
  {
    "id": "td22",
    "title": "The Case of the Dry Rain Gauge",
    "word": [
      "precipitation",
      "pre-sip-ih-TAY-shun",
      "noun",
      "Water falling from the sky, like rain, snow, sleet or hail."
    ],
    "story": [
      "Dictionary kept a rain gauge on the fence post behind Dunn's Garage. Every evening at six, he wrote down how much rain had fallen and then emptied it.",
      "On Wednesday, Brad Tolliver returned a library book with every page wrinkled and wet.",
      "\"Not my fault,\" said Brad. \"A huge thunderstorm hit me on the way home from school at four o'clock. I got soaked. Total downpour. The library should not charge me.\"",
      "That evening Dictionary checked his notebook. Then he checked the rain gauge. It held not one drop, and the sidewalks were dusty dry all over town.",
      "\"Brad,\" said Dictionary, \"there wasn't any downpour today. So how did that book really get wet?\""
    ],
    "clue": "It held not one drop, and the sidewalks were dusty dry",
    "q": "How did Dictionary know there was no storm?",
    "o": [
      "The rain gauge was empty and the sidewalks were dry",
      "Thunderstorms never happen at four",
      "Library books are waterproof",
      "Brad did not go to school"
    ],
    "hint": "What does a rain gauge measure?",
    "sol": "A rain gauge catches precipitation, so you can measure how much fell. Dictionary empties it every evening at six. If a big storm had hit at four, the gauge would hold water and the sidewalks would be wet. Brad had dropped the book in Hollow Creek while skipping stones."
  },
  {
    "id": "td23",
    "title": "The Case of the Dry Ashes",
    "word": [
      "extinguish",
      "ex-TING-gwish",
      "verb",
      "To put out a fire completely."
    ],
    "story": [
      "Every Trailman learns the rule: drown the fire, stir it, drown it again, and feel it with the back of your hand. If it's too hot to touch, it's too hot to leave.",
      "On the fall campout, Grant Hubbard had the job of putting out the campfire before bed.",
      "\"I poured on two full buckets of water and stirred it until it was cold,\" Grant told the troop leader in the morning. \"Totally out.\"",
      "Dictionary and Molly went to the fire ring. The ashes were dry and gray, light as flour, and when Molly poked them with a stick, orange coals glowed underneath.",
      "\"Grant,\" said Dictionary, \"we need to talk about buckets. And then we need two more of them, right now.\""
    ],
    "clue": "The ashes were dry and gray, light as flour",
    "q": "How did Dictionary know Grant never drowned the fire?",
    "o": [
      "Ashes soaked with two buckets of water would be wet and muddy, not dry and powdery",
      "Coals cannot glow in the morning",
      "Campfires go out by themselves",
      "The fire ring was empty"
    ],
    "hint": "What do ashes look like after you pour water on them?",
    "sol": "A fire that has been drowned with buckets of water leaves wet, soggy, muddy ashes, and the coals go cold and black. Dry, powdery ashes with glowing coals underneath mean no water was ever poured. That is dangerous: hidden coals can start a forest fire hours later. Always drown, stir, and feel."
  },
  {
    "id": "td24",
    "title": "The Case of the Misspelled Note",
    "word": [
      "signature",
      "SIG-nuh-chur",
      "noun",
      "Something that shows who made it, like your name, or a habit only you have."
    ],
    "story": [
      "Somebody slipped a note into Ben Ortiz's backpack. It said: PUT FIVE DOLLARS UNDER THE BLEACHERS BY WENSDAY OR YOUR BIKE GETS IT.",
      "Ben was scared. He hired Dictionary for one dollar, which was all the money he had left.",
      "Three Sharks had been near the bleachers that week: Spike Mullins, Rex Sharpe, and Rocky Sharpe. All three said they had never seen the note.",
      "That afternoon Dictionary walked past the Sharks' car wash. Spike had painted the sign himself, and he was proud of it. It said: SHARKS CAR WASH, WENSDAY ONLY, $5.",
      "\"Ben,\" said Dictionary, \"keep your five dollars. I know who wrote that note.\""
    ],
    "clue": "It said: SHARKS CAR WASH, WENSDAY ONLY, $5",
    "q": "Who wrote the note, and how did Dictionary know?",
    "o": [
      "Spike, because he misspells Wednesday the same way on his sign",
      "Rex, because he is the oldest",
      "Rocky, because he is Duke's brother",
      "Ben wrote it himself"
    ],
    "hint": "Look closely at how one word is spelled on the note and on the sign.",
    "sol": "Wednesday is a tricky word to spell, because the first d is silent. Most people who get it wrong make different mistakes. Spike spelled it W-E-N-S-D-A-Y on his sign, exactly like the note. His spelling mistake was as good as a signature. (Wednesday is in Spelling Quest's starter words for a reason.)"
  },
  {
    "id": "td25",
    "title": "The Case of the Short Change",
    "word": [
      "subtract",
      "sub-TRACT",
      "verb",
      "To take one number away from another, like figuring out change."
    ],
    "story": [
      "Rocky Sharpe stomped into Hollow Creek Hardware and slapped the counter.",
      "\"You cheated me!\" he told the clerk. \"I bought a flashlight for one dollar and seventy-five cents. I paid with a five-dollar bill. You only gave me two dollars and twenty-five cents back. You owe me a dollar!\"",
      "The clerk looked worried. Dictionary, who was buying a bag of nails for his father, stepped over.",
      "\"Rocky, are you sure?\" he asked. \"How do you know how much change you got?\"",
      "\"Because I put all my change right in my pocket, and I haven't spent a penny,\" said Rocky. He pulled it out to prove it: three one-dollar bills and a quarter.",
      "Dictionary smiled at the clerk. \"You don't owe him a thing.\""
    ],
    "clue": "three one-dollar bills and a quarter",
    "q": "How did Rocky prove himself wrong?",
    "o": [
      "He had three dollars and twenty-five cents, which is the right change",
      "He paid with a ten-dollar bill",
      "The flashlight cost one dollar",
      "He did not buy anything"
    ],
    "hint": "Five dollars minus one dollar and seventy-five cents is how much?",
    "sol": "Five dollars minus one dollar and seventy-five cents is three dollars and twenty-five cents. Rocky said he got only two twenty-five, but the change in his own pocket was three dollars and a quarter, exactly right. Rocky was trying to get an extra dollar."
  },
  {
    "id": "td26",
    "title": "The Case of the April Apples",
    "word": [
      "harvest",
      "HAR-vest",
      "noun",
      "The time of year when crops are ripe and picked."
    ],
    "story": [
      "The Hollow Creek spring bake sale had a special prize for the best pie made with homegrown fruit.",
      "On a cool April morning, Duke Sharpe set down an apple pie with a golden crust. \"Homegrown,\" he said. \"I picked these apples off the tree in our backyard this morning. Ripe and crunchy.\"",
      "Dictionary looked out the window at the orchard across the road. The apple trees were covered in pink and white blossoms. Not a single apple hung from any branch.",
      "\"Duke,\" he said, \"it's a beautiful pie. But your tree won't have ripe apples for five more months.\""
    ],
    "clue": "I picked these apples off the tree in our backyard this morning",
    "q": "What was wrong with Duke's claim?",
    "o": [
      "Apple trees only blossom in April; apples ripen in late summer and fall",
      "Apples only grow in stores",
      "Apple pies are not allowed at bake sales",
      "April is too hot for apples"
    ],
    "hint": "What do apple trees look like in April?",
    "sol": "In Pennsylvania, apple trees bloom with flowers in spring, around April and May. The flowers slowly turn into apples over the summer, and the harvest is in late summer and fall. Nobody picks ripe apples off a backyard tree in April. Duke bought them at the store."
  },
  {
    "id": "td27",
    "title": "The Case of the Speedy Hiker",
    "word": [
      "pace",
      "PAYS",
      "noun",
      "How fast you move, like three miles per hour."
    ],
    "story": [
      "The Ridge Loop is the longest trail near Hollow Creek. It is twelve miles of rocks, roots and steep hills. Most hikers take all day.",
      "On Saturday, somebody let the troop's canoes loose from the dock at two o'clock. The canoes drifted all the way across the lake.",
      "\"Wasn't me,\" said Duke Sharpe. \"I started the Ridge Loop at two o'clock and finished the whole twelve miles at three. One hour. I'm fast.\"",
      "Dictionary did some math in his notebook. A good hiker walks about three miles an hour on a flat road. On rocks and hills, it's slower.",
      "\"Duke,\" said Dictionary, \"you'd have to run almost as fast as an Olympic marathon runner, but up and down mountains, for a whole hour. I'll get the paddles.\""
    ],
    "clue": "finished the whole twelve miles at three",
    "q": "Why couldn't Duke's story be true?",
    "o": [
      "Twelve miles of hilly trail in one hour is far faster than anyone can hike",
      "The trail is closed on Saturdays",
      "Duke does not own hiking boots",
      "Canoes cannot drift"
    ],
    "hint": "At three miles an hour, how long would twelve miles take?",
    "sol": "At a good hiking pace of about three miles per hour, twelve miles takes four hours on flat ground, and longer on hills. Doing it in one hour means twelve miles per hour on rocky mountain trails, nearly as fast as Olympic marathon runners run on flat roads. Duke was at the dock."
  },
  {
    "id": "td28",
    "title": "The Case of the Garden Digger",
    "word": [
      "retract",
      "ree-TRACT",
      "verb",
      "To pull something back in, the way a cat pulls its claws in when it walks."
    ],
    "story": [
      "Mrs. Varga's tulip bed was dug up three nights in a row. Holes everywhere. Bulbs scattered.",
      "\"It's that beagle,\" she said, pointing next door. \"Biscuit. I want the Patels to pay for new bulbs.\"",
      "Mr. Patel was upset. Biscuit dug sometimes, but he had been tied up at night. Mr. Patel hired Dictionary.",
      "Dictionary and Molly knelt in the soft dirt. The tracks were round, with four toes and a pad, and there were no claw marks in front of the toes at all.",
      "Molly studied the round tracks. \"They look more like a cat's,\" she said. \"Let's look for another clue before blaming Biscuit.\""
    ],
    "clue": "there were no claw marks in front of the toes at all",
    "q": "Which animal should Molly investigate first, based on the round tracks?",
    "o": [
      "A cat is more likely from the round print shape and absent claw marks",
      "Beagles have five legs",
      "Dogs never dig in gardens",
      "The tracks were too big"
    ],
    "hint": "What is different about how cats and dogs walk?",
    "sol": "The round shape and lack of visible claw marks suggest a cat. Cat claws are usually retracted while walking, but a single missing claw impression is not proof: surface conditions affect tracks. A neighbor's trail camera later confirms an orange cat digging there. Molly combines clues instead of blaming a pet from one detail.",
    "refs": [
      [
        "National Park Service: carnivore tracks",
        "https://www.nps.gov/mora/planyourvisit/upload/Carnivore-Tracks-12-20-21_508.pdf"
      ]
    ]
  },
  {
    "id": "td29",
    "title": "The Case of the December Fireflies",
    "word": [
      "nocturnal",
      "nok-TUR-nul",
      "adjective",
      "Active at night. Fireflies, owls and raccoons are nocturnal."
    ],
    "story": [
      "On a snowy December night, the angel was stolen from the top of the Hollow Creek town Christmas tree.",
      "Rex Sharpe was seen near the town square at seven. But Rex had a story.",
      "\"I wasn't anywhere near the tree,\" he said. \"I was down by the creek all evening, catching fireflies in a jar. There were hundreds of them blinking over the water. Prettiest thing you ever saw.\"",
      "Dictionary looked out the window. Snow was falling on the creek, and the thermometer on the garage read twenty-two degrees.",
      "\"Rex,\" said Dictionary, \"those fireflies won't be back until June. And neither will your story.\""
    ],
    "clue": "I was down by the creek all evening, catching fireflies in a jar",
    "q": "What was wrong with Rex's story?",
    "o": [
      "Fireflies only come out on warm summer nights, not in December",
      "Fireflies only come out in the daytime",
      "Creeks freeze solid in summer",
      "Jars are not allowed near the creek"
    ],
    "hint": "When do you see fireflies in Pennsylvania?",
    "sol": "Fireflies are nocturnal beetles that flash on warm summer evenings, mostly in June and July in Pennsylvania. In winter they are tiny larvae hiding underground. On a snowy, twenty-two degree December night there are no fireflies blinking anywhere. Rex returned the angel."
  },
  {
    "id": "td30",
    "title": "The Case of the Wet Paint",
    "word": [
      "tacky",
      "TAK-ee",
      "adjective",
      "Still a little sticky, like paint that is almost dry."
    ],
    "story": [
      "On Friday afternoon, Mr. Duncan painted his picket fence bright white. He hung a sign on it: WET PAINT, KEEP OFF.",
      "On Saturday morning, the fence had a handprint on it, and his garden gnome was missing from behind the fence.",
      "\"Wasn't me,\" said Spike Mullins, who was walking by with his hands in his pockets. \"I haven't been near that fence all weekend.\"",
      "\"Then show me your hands,\" said Dictionary.",
      "Spike pulled his hands out. His right palm was smeared with white paint, still tacky at the edges."
    ],
    "clue": "His right palm was smeared with white paint",
    "q": "How did Dictionary catch Spike?",
    "o": [
      "He had fresh white paint on his palm, the same as the fence",
      "He was wearing gloves",
      "He was walking too fast",
      "He had grass on his shoes"
    ],
    "hint": "What color was the fence, and when was it painted?",
    "sol": "Mr. Duncan's fence was painted white on Friday, and fresh paint stays sticky for a while. Spike's palm had tacky white paint on it, and the fence had a handprint. Spike had climbed the fence to get the gnome. He returned it and repainted the fence himself."
  },
  {
    "id": "td31",
    "title": "The Case of the Thanksgiving Friday",
    "word": [
      "tradition",
      "truh-DISH-un",
      "noun",
      "Something done the same way, year after year, like Thanksgiving on a Thursday."
    ],
    "story": [
      "Somebody let the air out of the giant inflatable turkey on the Hollow Creek town square over the Thanksgiving holiday.",
      "Brad Tolliver had been seen nearby, but he said he was out of town.",
      "\"No way,\" said Brad. \"We drove to my grandma's in Ohio on Thanksgiving Day, Friday the 27th. We ate turkey, watched football, and drove home Sunday.\"",
      "Dictionary flipped back through his notebook to November. Then he closed it.",
      "\"Brad,\" he said, \"that's a nice story. But Thanksgiving has never once been on a Friday.\""
    ],
    "clue": "We drove to my grandma's in Ohio on Thanksgiving Day, Friday the 27th",
    "q": "What was wrong with Brad's story?",
    "o": [
      "Thanksgiving in America is always on a Thursday",
      "Thanksgiving is in July",
      "Ohio does not have Thanksgiving",
      "Grandmas do not cook turkey"
    ],
    "hint": "What day of the week is Thanksgiving?",
    "sol": "By law, Thanksgiving in the United States is the fourth Thursday of November. It is always a Thursday, never a Friday. Brad mixed up his dates because he was making it up. He was in Hollow Creek all weekend."
  },
  {
    "id": "td32",
    "title": "The Case of the Ice Fishing Fib",
    "word": [
      "freezing point",
      "FREE-zing point",
      "noun",
      "The temperature where water turns to ice: 32 degrees Fahrenheit."
    ],
    "story": [
      "It had been the warmest week of February anyone could remember. Every day the thermometer at Dunn's Garage hit sixty degrees. Kids rode bikes in T-shirts.",
      "On Saturday, Mr. Patel's new tackle box went missing from his porch.",
      "\"Don't blame me,\" said Duke Sharpe. \"I was out ice fishing on Miller's Pond all day yesterday. I stood right out in the middle on the ice. Caught three perch.\"",
      "Molly had photographed the pond on Friday afternoon, the same time Duke claimed he was fishing. The pond was entirely open water, with no ice from shore to shore.",
      "\"Duke,\" said Dictionary, \"Molly's photograph does not show any ice to stand on. Your account needs explaining.\""
    ],
    "clue": "The pond was entirely open water",
    "q": "Why couldn't Duke have been ice fishing?",
    "o": [
      "A photograph from the claimed time shows open water across the pond",
      "Ice fishing is only done at night",
      "Perch do not live in ponds",
      "Miller's Pond is too small"
    ],
    "hint": "What did Molly observe directly, at the time in Duke's account?",
    "sol": "Air temperature alone cannot establish ice thickness or safety. The useful contradiction here is Molly's photograph: the pond was completely open water at the time Duke says he was standing on its ice. Never use a story, a warm or cold day, or appearance alone to decide whether real ice is safe.",
    "refs": [
      [
        "Minnesota DNR: ice safety",
        "https://www.dnr.state.mn.us/safety/ice/index.html"
      ]
    ]
  },
  {
    "id": "td33",
    "title": "The Case of the Book That Isn't There",
    "word": [
      "canon",
      "KAN-un",
      "noun",
      "The official list of books that belong together, like the 66 books of the Bible."
    ],
    "story": [
      "The church Bible memory contest had a grand prize: a leather Bible with your name stamped in gold.",
      "Duke Sharpe had never entered before, but this year he stood up with a big grin.",
      "\"My verse,\" said Duke, \"is from the Book of Hezekiah, chapter 3, verse 5.\" Then he recited a long verse about a king and a battle, very loudly.",
      "Pastor Gray smiled patiently. Dictionary opened the table of contents in the front of his Bible and ran his finger down all sixty-six books, from Genesis to Revelation.",
      "\"Duke,\" said Dictionary gently, \"Hezekiah was a real king. But you won't find his book anywhere in here.\""
    ],
    "clue": "is from the Book of Hezekiah, chapter 3, verse 5",
    "q": "What was wrong with Duke's verse?",
    "o": [
      "There is no Book of Hezekiah in the Bible",
      "Hezekiah was not a real person",
      "The Bible has no chapter 3",
      "Verses cannot be about kings"
    ],
    "hint": "Check the table of contents. Is there a Book of Hezekiah?",
    "sol": "Hezekiah was a real king of Judah, and his story is told in 2 Kings, 2 Chronicles and Isaiah. But there is no Book of Hezekiah among the 66 books of the Bible. Duke made up his verse. Pastor Gray invited him to memorize a real one for next year, and Duke surprised everyone by doing it."
  },
  {
    "id": "td34",
    "title": "The Case of the Penny Test",
    "word": [
      "tread",
      "TRED",
      "noun",
      "The grooved part of a tire that grips the road."
    ],
    "story": [
      "Molly's uncle wanted to buy a used pickup truck from a man named Mr. Slade.",
      "\"Runs great,\" said Mr. Slade, slapping the hood. \"And I just put brand-new tires on it last week. That's four hundred dollars of tires, included free.\"",
      "Molly's uncle asked Mr. Dunn to take a look. Mr. Dunn handed Dictionary a penny.",
      "Dictionary slid the penny into the grooves of the front tire with Lincoln's head pointing down. He could see the top of Lincoln's head, every bit of it, sticking up above the rubber.",
      "Mr. Dunn nodded. \"Mr. Slade,\" he said, \"those tires weren't new last week. They weren't new last year.\""
    ],
    "clue": "He could see the top of Lincoln's head, every bit of it",
    "q": "What did the penny test prove?",
    "o": [
      "If you can see all of Lincoln's head, the tread is worn out, so the tires are old",
      "Pennies show how much air is in a tire",
      "New tires have no grooves",
      "Lincoln's head means the tire is brand new"
    ],
    "hint": "Brand-new tires have deep grooves. How deep is a penny to Lincoln's head?",
    "sol": "Put a penny in the tread with Lincoln's head pointing down. If you can see all of his head, the tread is very shallow and worn out, and the tire needs replacing. Brand-new tires have deep tread that would cover part of his head. Mr. Slade's 'new' tires were nearly bald. Molly's uncle bought a different truck."
  },
  {
    "id": "td35",
    "title": "The Case of the Floating Eggs",
    "word": [
      "buoyant",
      "BOY-unt",
      "adjective",
      "Able to float."
    ],
    "story": [
      "At the Hollow Creek farm stand, Rex Sharpe had a new business: FARM-FRESH EGGS, LAID THIS MORNING, $5 A DOZEN.",
      "That was a dollar more than anyone else charged. \"Because they're fresher,\" Rex explained.",
      "Mrs. Kincaid bought a dozen. At home, she did what her grandmother taught her. She set each egg in a bowl of plain, unsalted cold water.",
      "Three of the eggs floated, bobbing at the top of the bowl like little boats, and the rest stood up on one end.",
      "She called Molly. Molly called Dictionary. \"Laid this morning?\" said Dictionary. \"Let's ask for the dated farm records before deciding.\""
    ],
    "clue": "Three of the eggs floated",
    "q": "Why did the floating eggs give a reason to question the freshness claim?",
    "o": [
      "A larger air cell can make older eggs float, so the claim needs checking",
      "Fresh eggs always float",
      "Brown eggs float and white eggs sink",
      "Eggs only float in salt water"
    ],
    "hint": "What happens inside an egg as it gets older?",
    "sol": "As an egg loses moisture, its air cell can enlarge enough to make it float. That can raise a question about freshness, but floating is not an exact laying-date test and does not determine food safety. Dictionary asks for the dated farm records; they show this carton came from an older batch. A clue starts the investigation, and the records confirm it.",
    "refs": [
      [
        "USDA: what a floating egg means",
        "https://ask.fsis.usda.gov/article/What-does-it-mean-when-an-egg-floats-in-water"
      ]
    ]
  }
];
function tdCase(id){return TDCASES.find(function(c){return c.id===id})}
function tdFresh(id){return {id:id,ownerId:db.active,phase:'read',clueMiss:0,ansMiss:0,picked:null,bad:{},hint:false,xp:0,stars:0}}
function tdSave(S){var p=S&&db.profiles.find(function(q){return q.id===S.ownerId});if(!p||!tdCase(S.id))return;p.drafts=p.drafts||{};p.drafts['td:'+S.id]=JSON.parse(JSON.stringify(S));if(S.phase!=='done')p.resume={subj:'detect',kind:'td',id:S.id,title:tdCase(S.id).title};else if(p.resume&&p.resume.kind==='td'&&p.resume.id===S.id)delete p.resume;save()}
function tdOpen(id){var c=tdCase(id),p=me();if(!c||!p)return;var d=p.drafts&&p.drafts['td:'+id];v.td=d&&d.phase!=='done'?Object.assign(tdFresh(id),JSON.parse(JSON.stringify(d)),{id:id,ownerId:db.active,xp:0}):tdFresh(id);var S=v.td;if(!['read','clue','ask'].includes(S.phase))S.phase='read';S.bad=S.bad&&typeof S.bad==='object'?S.bad:{};S.clueMiss=Math.max(0,Number(S.clueMiss)||0);S.ansMiss=Math.max(0,Number(S.ansMiss)||0);v.s='td';v.subj='detect';p.lastSubj='detect';tdSave(S)}
function tdSentences(par){var p=par.replace(/\b(Mr|Mrs|Ms|Dr|St)\./g,'$1\u0001').replace(/(\d)\.(\d)/g,'$1\u0001$2').replace(/\b([AB])\.([CD])\./g,'$1\u0001$2\u0001');return (p.match(/[^.!?]+[.!?]+["”']?\s*|[^.!?]+$/g)||[p]).map(function(s){return s.replace(/\u0001/g,'.')})}
function vTd(){
 var S=v.td;if(!S||S.ownerId!==db.active||!tdCase(S.id))return '<div class="wrap"><p>Open a Trail Detective case.</p></div>';var c=tdCase(S.id),h='<div class="wrap td" style="--c:'+TDC.c+';--cd:'+TDC.cd+'"><div class="pathhead"><button class="back" data-act="back" aria-label="Back">'+ICONS.back+'</button><div><h2>'+esc(c.title)+'</h2><p class="muted" style="font-size:14px;font-weight:600">'+(S.phase==='read'?'Read carefully. Every word matters.':S.phase==='clue'?'Tap the sentence with the clue':S.phase==='ask'?'Now solve it':'Case closed')+'</p></div></div>';
 if(c.word)h+='<div class="tdword"><span class="tdw-l">WORD OF THE DAY</span><div><b>'+esc(c.word[0])+'</b> <i>('+esc(c.word[1])+')</i> <em>'+esc(c.word[2])+'</em>'+(typeof wdCanSpeak==='function'&&wdCanSpeak()?' <button class="wdsay sm" data-act="tdsay" data-id="'+esc(c.word[0])+'" aria-label="Hear the word">🔊</button>':'')+'</div><p>'+esc(c.word[3])+'</p></div>';
 h+='<div class="card tdcase'+(S.phase==='clue'?' tapping':'')+'">';
 c.story.forEach(function(par,pi){h+='<p>';tdSentences(par).forEach(function(s,si){var key=pi+'-'+si,isClue=s.indexOf(c.clue)>=0,cls='tds';if(S.phase!=='read'&&S.phase!=='clue'&&isClue)cls+=' found';if(S.bad[key])cls+=' miss';
  h+=S.phase==='clue'?'<span class="'+cls+'" role="button" tabindex="0" data-act="tdtap" data-id="'+key+'">'+esc(s)+'</span>':'<span class="'+cls+'">'+esc(s)+'</span>'});h+='</p>'});
 h+='</div>';
 if(S.phase==='read')h+='<div class="xnav"><button class="btn" data-act="tdgo">I\'m ready to find the clue</button></div>';
 if(S.phase==='clue'){h+=(S.clueMiss?'<p class="xnote xwarnp">Not that one. Read it again: which detail doesn\'t fit?</p>':'')+'<div class="tdrow"><button class="btn ghost small" data-act="tdhint">'+(S.hint?'Hint: '+esc(c.hint):'Need a hint?')+'</button>'+(S.clueMiss>=2?'<button class="btn ghost small" data-act="tdskip">Show me the clue</button>':'')+'</div>'}
 if(S.phase==='ask'||S.phase==='done'){
  h+='<p class="xq">'+esc(c.q)+'</p><div class="xopts">';
  xShuffle(c.o,c.id.length*7+c.title.length).forEach(function(o){var sel=S.picked===o.i,cls=S.phase==='done'&&o.i===0?' right':(S.bad['o'+o.i]?' wrong':'');h+='<button class="btn ghost xopt'+cls+'" data-act="tdans" data-id="'+o.i+'"'+(S.phase==='done'||S.bad['o'+o.i]?' disabled':'')+'>'+esc(o.x)+'</button>'});
  h+='</div>';
  if(S.phase==='ask'&&S.ansMiss)h+='<p class="xnote xwarnp">Not quite. Look at the clue again.</p>';
 }
 if(S.phase==='done')h+='<div class="card tdsol"><b>Solution</b><p>'+esc(c.sol)+'</p>'+((c.refs||[]).map(function(r){return '<p><a href="'+esc(r[1])+'" target="_blank" rel="noopener">'+esc(r[0])+'</a></p>'}).join(''))+'</div>';
 h+='<div style="height:100px"></div></div>';
 if(S.phase==='done')h+='<div class="foot good"><div class="in"><h3>Case closed! '+'★'.repeat(S.stars)+'☆'.repeat(3-S.stars)+(S.xp?' · +'+S.xp+' XP':'')+'</h3><p>'+(S.stars===3?'Perfect detective work: right clue and right answer on the first try.':'Next time, try to spot the clue on the first try for 3 stars.')+'</p><button class="btn" data-act="tddone">Back to the case files</button></div></div>';
 return h;
}
function tdClick(a,id){
 var S=v.td;if(!S||v.s!=='td'||S.ownerId!==db.active)return false;var c=tdCase(S.id);
 switch(a){
  case 'tdgo':if(S.phase!=='read')return true;S.phase='clue';return true;
  case 'tdsay':wdSay(id,{rate:0.8});return true;
  case 'tdhint':S.hint=true;return true;
  case 'tdskip':if(S.phase!=='clue'||S.clueMiss<2)return true;S.clueMiss=Math.max(S.clueMiss,3);S.phase='ask';return true;
  case 'tdtap':{if(S.phase!=='clue')return true;if(!/^\d+-\d+$/.test(String(id)))return true;var pr=String(id).split('-'),s=tdSentences(c.story[+pr[0]]||'')[+pr[1]]||'';if(!s)return true;if(s.indexOf(c.clue)>=0){S.phase='ask'}else{S.bad[id]=1;S.clueMiss++}return true}
  case 'tdans':{if(S.phase!=='ask')return true;var k=Number(id);if(!Number.isInteger(k)||!c.o[k]||S.bad['o'+k])return true;if(k===0){S.phase='done';S.stars=3-Math.min(1,S.clueMiss)-Math.min(1,S.ansMiss);var p=me();p.tdStars=p.tdStars||{};if(S.stars>(p.tdStars[S.id]||0))p.tdStars[S.id]=S.stars;S.xp=!p.done[S.id]?awardLab(S.id):0;save()}else{S.bad['o'+k]=1;S.ansMiss++}return true}
  case 'tddone':v.s='path';v.subj='detect';return true;
 }
 return false;
}
function vTdHome(){
 var p=me(),s=subj('detect'),st=p.tdStars||{},solved=TDCASES.filter(function(c){return p.done[c.id]}).length;
 var rank=solved>=35?'Master Detective':solved>=25?'Chief Detective':solved>=12?'Senior Detective':solved>=5?'Detective':solved>=1?'Junior Detective':'Rookie';
 var h='<div class="wrap path tdhome" style="--c:'+TDC.c+';--cd:'+TDC.cd+'"><div class="pathhead"><button class="back" data-act="back" aria-label="Back">'+ICONS.back+'</button><div><h2>'+esc(s.name)+'</h2><p class="muted" style="font-size:14px;font-weight:600">'+esc(s.tag)+'</p></div></div>';
 h+='<div class="tdsign"><b>DUNN DETECTIVE AGENCY</b><span>Back room, Dunn\'s Garage, Hollow Creek</span><em>NO CASE TOO SMALL · ONE DOLLAR PER CASE · FREE IF I\'M WRONG</em></div><div class="card tdbadge"><span class="tdrank">YOUR RANK: '+esc(rank.toUpperCase())+'</span><p>Walter "Dictionary" Dunn read the whole dictionary twice. Molly Kincaid can track a fox across a creek. Duke Sharpe and his Sharks are always up to something. You are the newest partner. '+solved+' of '+TDCASES.length+' cases solved.</p><p class="muted" style="font-size:13px;font-weight:600">Every case has one clue hiding in plain sight. Read slowly, then tap the important sentence. These are simplified puzzles; a clue supports a conclusion within the stated facts. Real investigations need corroboration.</p></div><div class="tdfiles">';
 TDCASES.forEach(function(c,i){var n=st[c.id]||0;h+='<button class="tdfile'+(p.done[c.id]?' solved':'')+'" data-act="lesson" data-id="'+c.id+'"><span class="tdno">CASE '+(i+1<10?'0':'')+(i+1)+'</span><b>'+esc(c.title.replace(/^The Case of the /,'The '))+'</b><span class="tdst">'+(n?'★'.repeat(n)+'<i>'+'☆'.repeat(3-n)+'</i>':'UNSOLVED')+'</span></button>'});
 return h+'</div><div style="height:90px"></div></div>'+tabs('home');
}
document.addEventListener('keydown',function(e){if(v.s!=='td'||!v.td||v.td.ownerId!==db.active||!['Enter',' '].includes(e.key))return;var el=e.target.closest&&e.target.closest('[data-act="tdtap"]');if(!el)return;e.preventDefault();tdClick('tdtap',el.dataset.id);render()});
SUBJECTS.push({id:"detect",name:"Trail Detective",tag:"Solve-it-yourself mysteries",c:TDC.c,cd:TDC.cd,icon:"star",lessons:TDCASES.map(function(c){return {id:c.id,title:c.title,unit:"Case files",kind:"td",open:true}})});
BADGE_COLORS.detect=TDC.c;
WORKSHOP_BADGES.push({id:'sleuth',name:'Sharp eye',goal:'Solve 5 mysteries with 3 stars.',target:5,icon:'compass',test:function(p){var s=p.tdStars||{};return TDCASES.filter(function(c){return s[c.id]>=3}).length>=5}});
var tdArtBefore=workshopArt;workshopArt=function(id){
 if(id!=='detect')return tdArtBefore(id);
 var h='<ellipse cx="160" cy="160" rx="130" ry="11" fill="#1b0f3d" opacity=".2"/><rect x="40" y="40" width="130" height="110" rx="6" fill="#e9c98f" stroke="#b79552" stroke-width="2" transform="rotate(-5 105 95)"/><rect x="40" y="30" width="56" height="18" rx="4" fill="#e9c98f" stroke="#b79552" stroke-width="2" transform="rotate(-5 105 95)"/><text x="105" y="102" text-anchor="middle" font-size="16" font-weight="800" fill="#7b2cbf" font-family="ui-monospace,monospace" transform="rotate(-5 105 95)">CASE FILE</text>';
 h+='<circle cx="220" cy="80" r="38" fill="#e5dbff55" stroke="#3b2580" stroke-width="9"/><circle cx="220" cy="80" r="38" fill="none" stroke="#7048e8" stroke-width="4"/><path d="M247 108l38 38" stroke="#3b2580" stroke-width="14" stroke-linecap="round"/><path d="M205 64a20 20 0 0 1 22-6" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>';
 h+='<path d="M200 128c6-4 12 4 18 0s12 4 18 0" stroke="#5e3b17" stroke-width="3" fill="none"/>';
 return '<svg viewBox="0 0 320 180" aria-hidden="true" class="work-art">'+h+'</svg>';
};
var pathBeforeTd=vPath;vPath=function(){if(v.subj==='detect')return vTdHome();return pathBeforeTd()};
var tdClickBeforeSave=tdClick;tdClick=function(a,id){var S=v.td,handled=tdClickBeforeSave(a,id);if(handled&&S&&S.ownerId===db.active)tdSave(S);return handled};
var tdCheckpointBefore=checkpoint;checkpoint=function(){if(v.s==='td'&&v.td&&v.td.ownerId===db.active){tdSave(v.td);return}tdCheckpointBefore()};
var tdResumeBefore=resumeWorkshop;resumeWorkshop=function(){var r=me()&&me().resume;if(r&&r.kind==='td'){tdOpen(r.id);return}tdResumeBefore()};
if(window.ShopLab)Object.assign(window.ShopLab,{tdSave:tdSave,checkpoint:checkpoint,resumeWorkshop:resumeWorkshop,TDCASES:TDCASES,tdOpen:tdOpen,tdClick:tdClick,tdSentences:tdSentences,vPath:vPath});
/* END TRAIL DETECTIVE */
