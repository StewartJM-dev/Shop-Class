/* BEGIN MONEY LAB */
/* Money Lab: budget puzzles using the supplied dated practice-price book. */
var MNC={c:"#2B8A3E",cd:"#1B5E2A"};
/* Supplied package values and source notes are retained as dated practice inputs, not independently verified live prices. */
var MN_SRC={bls:'U.S. average price, Bureau of Labor Statistics, Sep 2026',blsne:'Northeast average, Bureau of Labor Statistics, Sep 2026',wm:'Walmart.com listing, Oct 2026',est:'Estimate: check your local store',aaa:'Pennsylvania average (AAA data via OilPriceAPI), Oct 22 2026',rent:'Bloomsburg PA, Rentometer, Oct 24 2026',ins:'Pennsylvania average, Experian, Oct 13 2026',mint:'Mint Mobile plan price, Oct 2026',isp:'Spectrum Internet Advantage, TheSeniorList, Sep 2026',wage:'Example hourly wage for this exercise'};
var MNP={
 hotdog:{n:'Hot dogs, Ball Park, 16 count',p:5.74,s:'wm'},buns:{n:'Hot dog buns, store brand, 8 count',p:1.58,s:'wm'},
 beef:{n:'Ground beef, 1 lb',p:6.79,s:'bls'},chicken:{n:'Chicken breast, boneless, 1 lb',p:4.20,s:'bls'},eggs:{n:'Eggs, large, 1 dozen',p:2.27,s:'bls'},bacon:{n:'Bacon, 1 lb',p:6.76,s:'bls'},
 pb:{n:'Peanut butter, store brand, 40 oz',p:4.18,s:'wm'},beans:{n:'Dried beans, 1 lb',p:1.67,s:'bls'},
 bread:{n:'White bread, 20 oz loaf',p:2.29,s:'bls'},pasta:{n:'Spaghetti, 1 lb',p:1.38,s:'bls'},rice:{n:'White rice, 1 lb',p:1.12,s:'bls'},
 pancake:{n:'Pancake mix, store brand, 32 oz',p:2.18,s:'wm'},pancake3:{n:'Pancake mix, store brand, 3-pack',p:6.54,s:'wm'},cereal:{n:'Frosted Flakes, family size 21.7 oz',p:4.48,s:'wm'},
 mac:{n:'Mac & cheese, store brand, 1 box',p:0.64,s:'wm'},mac12:{n:'Mac & cheese, store brand, 12-pack',p:7.68,s:'wm'},
 sauce:{n:'Pasta sauce, store brand, 24 oz',p:2.14,s:'wm'},sauce8:{n:'Pasta sauce, store brand, 8-pack',p:17.12,s:'wm'},
 bananas:{n:'Bananas, 1 lb (about 3)',p:0.66,s:'bls'},potatoes:{n:'Potatoes, 1 lb',p:0.99,s:'bls'},oranges:{n:'Navel oranges, 1 lb (about 2)',p:1.72,s:'bls'},strawb:{n:'Strawberries, 12 oz',p:2.84,s:'bls'},tomatoes:{n:'Tomatoes, 1 lb',p:1.99,s:'bls'},lettuce:{n:'Romaine lettuce, 1 lb',p:3.31,s:'bls'},
 milk:{n:'Whole milk, 1 gallon',p:4.11,s:'bls'},cheese:{n:'Cheddar cheese, 1 lb',p:6.13,s:'bls'},amcheese:{n:'American cheese slices, 1 lb',p:4.74,s:'bls'},
 water:{n:'Bottled water, 24 pack',p:3.97,s:'wm'},chips:{n:'Potato chips, 16 oz',p:6.67,s:'bls'},syrup:{n:'Pancake syrup, store brand, 24 oz',p:2.22,s:'wm'},syrup3:{n:'Pancake syrup, store brand, 3-pack',p:7.08,s:'wm'},icecream:{n:'Ice cream, half gallon',p:5.93,s:'bls'},
 mallow:{n:'Marshmallows, store brand, 16 oz',p:1.28,s:'wm'},graham:{n:'Graham crackers, Honey Maid, 14.4 oz',p:4.77,s:'wm'},choc:{n:"Hershey's chocolate bars, 6 pack",p:5.97,s:'wm'},
 propane:{n:'Propane cylinder, Coleman, 16 oz',p:5.47,s:'wm'},charcoal:{n:'Charcoal, Kingsford, 16 lb',p:10.92,s:'wm'},wood:{n:'Firewood bundle',p:8.00,s:'est'},plates:{n:'Paper plates, 100 count',p:5.58,s:'wm'},
 gas:{n:'Regular gasoline, per gallon',p:4.48,s:'aaa'},
 rent1:{n:'1-bedroom apartment, per month',p:1047,s:'rent'},rent2:{n:'2-bedroom apartment, per month',p:1124,s:'rent'},
 kwh:{n:'Electricity, per kWh',p:0.266,s:'blsne'},insmin:{n:'Car insurance, minimum coverage, per month',p:119,s:'ins'},insfull:{n:'Car insurance, full coverage, per month',p:248,s:'ins'},
 mint5:{n:'Phone plan, 5GB, per month (12-month plan)',p:15,s:'mint'},mintu:{n:'Phone plan, unlimited, per month (12-month plan)',p:30,s:'mint'},isp:{n:'Home internet, basic, per month',p:30,s:'isp'},wage:{n:'Starting wage, per hour',p:15,s:'wage'}
};
var MN_KEY='shopclass.prices.v1';
function mnOver(){try{var o=JSON.parse(localStorage.getItem(MN_KEY)||'{}');return o&&typeof o==='object'&&!Array.isArray(o)?o:{}}catch(e){return {}}}
function mnPrice(k){if(!Object.prototype.hasOwnProperty.call(MNP,k))return 0;var o=mnOver(),v=Number(o[k]);return Object.prototype.hasOwnProperty.call(o,k)&&Number.isFinite(v)&&v>=0&&v<=100000&&(k!=='wage'||v>0)?v:MNP[k].p}
function mnMoney(x){var neg=x<0;x=Math.abs(x);var s=x>=1000?x.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}):x.toFixed(2);return (neg?'-$':'$')+s}
/* Shopping items: price key, bucket, servings per package. */
var MNI={
 hotdog:['protein',16],buns:['grain',8],beef:['protein',4],chicken:['protein',4],eggs:['protein',6],bacon:['protein',5],pb:['protein',37],beans:['protein',12],
 bread:['grain',10],pasta:['grain',8],rice:['grain',10],pancake:['grain',8],pancake3:['grain',24],cereal:['grain',15],mac:['grain',3],mac12:['grain',36],
 sauce:['fruitveg',5],sauce8:['fruitveg',40],bananas:['fruitveg',3],potatoes:['fruitveg',3],oranges:['fruitveg',2],strawb:['fruitveg',4],tomatoes:['fruitveg',3],lettuce:['fruitveg',6],
 milk:['dairy',16],cheese:['dairy',16],amcheese:['dairy',16],water:['drink',24],
 chips:['fun',16],syrup:['fun',12],syrup3:['fun',36],icecream:['fun',8],
 mallow:['smore_m',16],graham:['smore_g',13],choc:['smore_c',9],propane:['cook',1],charcoal:['cook',2],wood:['fire',1],plates:['plates',100]
};
var MNB={protein:'Protein',grain:'Grains',fruitveg:'Fruits & vegetables',dairy:'Dairy',drink:'Drinks',fun:'Treats (optional)',smore_m:"S'mores: marshmallows",smore_g:"S'mores: graham crackers",smore_c:"S'mores: chocolate",cook:'Stove fuel (practice units)',fire:'Campfire wood (bundles)',plates:'Plates'};
var MNU={protein:'servings',grain:'servings',fruitveg:'servings',dairy:'servings',drink:'drinks',fun:'servings',smore_m:"s'mores",smore_g:"s'mores",smore_c:"s'mores",cook:'units',fire:'bundles',plates:'plates'};
var MNM=[
 {id:'mn1',type:'shop',title:'Campout cook',sub:'Feed your patrol for a weekend',budget:70,
  story:['You are the patrol cook for an overnight campout. Six Trailmen are coming: Friday dinner, Saturday breakfast and lunch, and s\'mores at the campfire.','You have $70 from the troop. Buy what you need, and try to bring change back.'],
  need:{protein:18,grain:18,fruitveg:12,drink:18,smore_m:6,smore_g:6,smore_c:6,cook:1,fire:2,plates:18},variety:{protein:2,fruitveg:2},
  items:['hotdog','buns','beef','eggs','bacon','pb','bread','pancake','pancake3','cereal','mac','mac12','bananas','potatoes','oranges','water','milk','chips','syrup','syrup3','mallow','graham','choc','propane','charcoal','wood','plates']},
 {id:'mn2',type:'trip',title:'Gas money for the trip',sub:'Pick the cheapest convoy',
  story:['The troop is driving to a state park 90 miles away, so 180 miles there and back. Eight people are going (six Trailmen and two adults), plus 6 loads of gear.','Pick which vehicles to take. Every seat and every gear load has to fit. Gas costs real money, so find the cheapest way.']},
 {id:'mn3',type:'shop',title:'Family groceries',sub:'Three days of meals for a family of four',budget:45,
  story:['Mom asked you to plan three days of meals for a family of four: breakfast, lunch and dinner.','You have $45. A balanced plan has several kinds of protein and plenty of fruit and vegetables. Look at the price per serving, not just the price on the tag.'],
  need:{protein:24,grain:36,fruitveg:36,dairy:12},variety:{protein:3,fruitveg:3},
  items:['chicken','beef','eggs','pb','beans','hotdog','bread','pasta','rice','cereal','mac','mac12','pancake','sauce','sauce8','bananas','potatoes','oranges','strawb','tomatoes','lettuce','milk','cheese','amcheese','chips','icecream']},
 {id:'mn4',type:'month',title:'First month on your own',sub:'Rent, car, phone, food, giving and saving',
  story:['You are 19, with a 40-hour job. This exercise deducts a fixed 16% to estimate take-home pay; actual taxes and deductions vary.','Choose how you will live this month. Startup costs and rent deposits have already been covered in this exercise. Your phone price is a monthly share of a prepaid annual plan, not the amount due at signup.']}
];
var MN_VEH=[{id:'sedan',n:'Sedan',seats:5,cargo:2,mpg:32},{id:'minivan',n:'Minivan',seats:7,cargo:3,mpg:22},{id:'pickup',n:'Pickup truck',seats:5,cargo:6,mpg:17},{id:'van',n:'12-passenger van',seats:12,cargo:6,mpg:13}];
function mnMission(id){return MNM.find(function(m){return m.id===id})}
function mnFresh(id){return {id:id,ownerId:db.active,q:{},veh:{},pick:{},res:null,xp:0,surprise:Math.floor(Math.random()*MN_SURPRISE.length)}}
function mnSave(S){var p=S&&db.profiles.find(function(q){return q.id===S.ownerId});if(!p||!mnMission(S.id))return;p.drafts=p.drafts||{};p.drafts['mn:'+S.id]=JSON.parse(JSON.stringify(S));if(!S.res)p.resume={subj:'money',kind:'mn',id:S.id,title:mnMission(S.id).title};else if(p.resume&&p.resume.kind==='mn'&&p.resume.id===S.id)delete p.resume;save()}
function mnOpen(id){var m=mnMission(id),p=me();if(!m||!p)return;var d=p.drafts&&p.drafts['mn:'+id];v.mn=d&&!d.res?Object.assign(mnFresh(id),JSON.parse(JSON.stringify(d)),{id:id,ownerId:db.active,res:null,xp:0,check:null}):mnFresh(id);var S=v.mn;S.q=S.q&&typeof S.q==='object'?S.q:{};S.veh=S.veh&&typeof S.veh==='object'?S.veh:{};S.pick=S.pick&&typeof S.pick==='object'?S.pick:{};Object.keys(S.q).forEach(function(k){if(!MNI[k])delete S.q[k];else S.q[k]=Math.max(0,Math.min(99,Math.floor(Number(S.q[k])||0)))});MN_VEH.forEach(function(x){S.veh[x.id]=Math.max(0,Math.min(2,Math.floor(Number(S.veh[x.id])||0)))});mnMonthOpts().forEach(function(x){if(S.pick[x.k]!==undefined&&(!Number.isInteger(S.pick[x.k])||!x.o[S.pick[x.k]]))delete S.pick[x.k]});S.surprise=Number.isInteger(S.surprise)&&MN_SURPRISE[S.surprise]?S.surprise:0;v.s='mn';v.subj='money';p.lastSubj='money';mnSave(S)}
function mnShopState(m,S){
 var have={},spent=0,kinds={};
 Object.keys(MNB).forEach(function(b){have[b]=0;kinds[b]=0});
 m.items.forEach(function(k){var n=S.q[k]||0;if(!n)return;var it=MNI[k];have[it[0]]+=n*it[1];kinds[it[0]]++;spent+=n*mnPrice(k)});
 return {have:have,spent:Math.round(spent*100)/100,kinds:kinds};
}
function mnCents(x){return x<1?Math.round(x*100)+'¢':mnMoney(x)}
function mnPerServ(k){return mnPrice(k)/MNI[k][1]}
function mnBest(m,b){var best=null;m.items.forEach(function(k){if(MNI[k][0]===b&&(!best||mnPerServ(k)<mnPerServ(best)))best=k});return best}
function mnCheckShop(m,S){
 var st=mnShopState(m,S),miss=[],tips=[];
 Object.keys(m.need).forEach(function(b){if(st.have[b]<m.need[b])miss.push(MNB[b]+': '+st.have[b]+' of '+m.need[b]+' '+MNU[b])});
 var over=st.spent>m.budget,varOk=true;
 Object.keys(m.variety||{}).forEach(function(b){if(st.kinds[b]<m.variety[b]){varOk=false;tips.push('Add variety: pick at least '+m.variety[b]+' different '+MNB[b].toLowerCase()+' items.')}});
 var left=m.budget-st.spent,stars=0;
 if(!miss.length&&!over){stars=1;if(varOk){stars=2;if(left>=m.budget*0.10)stars=3}}
 Object.keys(m.need).forEach(function(b){var bk=mnBest(m,b);if(!bk||S.q[bk]>0||!st.have[b])return;var cost=0,serv=0;m.items.forEach(function(k){if(MNI[k][0]===b&&S.q[k]){cost+=S.q[k]*mnPrice(k);serv+=S.q[k]*MNI[k][1]}});var mine=cost/serv,bp=mnPerServ(bk);if(bp<=mine*0.8)tips.push('Cheapest '+MNB[b].toLowerCase()+' per serving here: '+MNP[bk].n+' at '+mnCents(bp)+' a '+MNU[b].replace(/s$/,'')+'. Yours cost about '+mnCents(mine)+'.')});
 if(S.q.syrup3>0)tips.push('Look closer: the syrup 3-pack costs '+mnMoney(mnPrice('syrup3')/3)+' a bottle, but one bottle alone is '+mnMoney(mnPrice('syrup'))+'. Bigger packs are not always cheaper.');
 if(S.q.mac12>0&&Math.abs(mnPrice('mac12')/12-mnPrice('mac'))<0.005)tips.push('The mac & cheese 12-pack costs exactly the same per box as single boxes. Only buy the big pack if you need that many.');
 if(st.have.fun>0)tips.push('You bought '+st.have.fun+' servings of treats. That is fine if they fit the budget, but needs come before wants.');
 return {stars:stars,miss:miss,over:over,left:left,spent:st.spent,tips:tips.slice(0,4)};
}
function mnTrip(S){
 var seats=0,cargo=0,cost=0,cars=0,miles=180,gp=mnPrice('gas');
 MN_VEH.forEach(function(x){var n=S.veh[x.id]||0;seats+=n*x.seats;cargo+=n*x.cargo;cars+=n;cost+=n*miles/x.mpg*gp});
 return {seats:seats,cargo:cargo,cars:cars,cost:Math.round(cost*100)/100,ok:seats>=8&&cargo>=6};
}
function mnTripBest(){var best=null;var cnt=[0,1,2];cnt.forEach(function(a){cnt.forEach(function(b){cnt.forEach(function(c){cnt.forEach(function(d){var t=mnTrip({veh:{sedan:a,minivan:b,pickup:c,van:d}});if(t.ok&&(!best||t.cost<best.cost))best={cost:t.cost,v:{sedan:a,minivan:b,pickup:c,van:d}}})})})});return best}
function mnMonthIncome(){var gross=mnPrice('wage')*40*52/12;return {gross:Math.round(gross),net:Math.round(gross*0.84)}}
function mnMonthOpts(){
 var kwh=mnPrice('kwh')*500,gasMo=1000/25*mnPrice('gas'),inc=mnMonthIncome();
 return [
  {k:'home',n:'Where you live',o:[['Share a 2-bedroom with a roommate',mnPrice('rent2')/2,'Half of '+mnMoney(mnPrice('rent2'))],['Your own 1-bedroom',mnPrice('rent1'),'Supplied Bloomsburg example']]},
  {k:'power',n:'Electricity',auto:true,o:[['Split with roommate (500 kWh)',kwh/2,''],['On your own (500 kWh)',kwh,'']]},
  {k:'net',n:'Home internet',o:[['Basic plan (split with roommate if you have one)',mnPrice('isp'),'Use your phone instead and skip it to save'],['No home internet',0,'Use phone data and the library']]},
  {k:'phone',n:'Phone plan',o:[['5GB plan',mnPrice('mint5'),'Prepaid, 12 months up front'],['Unlimited plan',mnPrice('mintu'),'Prepaid, 12 months up front']]},
  {k:'car',n:'Getting to work (1,000 miles a month)',o:[['Paid-off used car, minimum insurance',mnPrice('insmin')+gasMo+50,'Insurance '+mnMoney(mnPrice('insmin'))+' + gas '+mnMoney(gasMo)+' + $50 set aside for repairs'],['Newer car with a $400 loan payment',400+mnPrice('insfull')+gasMo,'Loan $400 + full coverage '+mnMoney(mnPrice('insfull'))+' (modeled with this loan) + gas '+mnMoney(gasMo)]]},
  {k:'food',n:'Food',o:[['Cook at home',250,'Rice, beans, eggs, chicken, pasta. Estimate from this month\'s prices'],['Cook most meals, eat out twice a week',400,'Estimate'],['Eat out most meals',750,'Estimate']]},
  {k:'give',n:'Giving (church and charity)',o:[['10% of your pay',inc.net*0.10,'A tithe'],['5% of your pay',inc.net*0.05,''],['Nothing this month',0,'']]},
  {k:'save',n:'Savings',o:[['Save $500',500,''],['Save $250',250,''],['Save $100',100,''],['Save nothing',0,'']]},
  {k:'fun',n:'Fun money',o:[['$50',50,''],['$150',150,''],['$300',300,'']]}
 ];
}
function mnMonth(S){
 var opts=mnMonthOpts(),inc=mnMonthIncome(),total=0,lines=[];
 var alone=S.pick.home===1;S.pick.power=alone?1:0;
 opts.forEach(function(c){var i=S.pick[c.k];if(i===undefined||!c.o[i])return;var amt=c.o[i][1];if(c.k==='net'&&i===0&&!alone)amt=amt/2;amt=Math.round(amt*100)/100;total+=amt;lines.push([c.n,c.o[i][0],amt])});
 var chosen=opts.every(function(c){return c.auto||!!c.o[S.pick[c.k]]});
 return {inc:inc,total:Math.round(total*100)/100,left:Math.round((inc.net-total)*100)/100,lines:lines,chosen:chosen,save:opts.find(function(c){return c.k==='save'}).o[S.pick.save]?opts.find(function(c){return c.k==='save'}).o[S.pick.save][1]:0};
}
var MN_SURPRISE=[['Your brakes are grinding. New pads and rotors cost $350.',350],['You cracked your phone screen. The repair is $120.',120],['A friend\'s wedding: a gift and gas for the trip cost $90.',90]];
function vMn(){
 var S=v.mn;if(!S||S.ownerId!==db.active||!mnMission(S.id))return '<div class="wrap"><p>Open a Money Lab mission.</p></div>';var m=mnMission(S.id),h='<div class="wrap mn" style="--c:'+MNC.c+';--cd:'+MNC.cd+'"><div class="pathhead"><button class="back" data-act="back" aria-label="Back">'+ICONS.back+'</button><div><h2>'+esc(m.title)+'</h2><p class="muted" style="font-size:14px;font-weight:600">'+esc(m.sub)+'</p></div></div>';
 h+='<div class="card mnstory">'+m.story.map(function(t){return '<p>'+esc(t)+'</p>'}).join('')+'</div>';
 if(m.type==='shop')h+=vMnShop(m,S);else if(m.type==='trip')h+=vMnTrip(m,S);else h+=vMnMonth(m,S);
 h+='<p class="muted mnsrc">Budget puzzle: serving targets are simplified; this is not a complete meal or nutrition plan. The monthly model leaves out many real expenses and is not a personal tax or financial plan. Built-in prices are dated practice values supplied with the package, not live quotes. <button class="linkbtn" data-act="mnbook">See the price book and supplied source notes</button></p><div style="height:90px"></div></div>';
 if(S.res&&S.res.stars)h+='<div class="foot good"><div class="in"><h3>'+'★'.repeat(S.res.stars)+'☆'.repeat(3-S.res.stars)+(S.xp?' · +'+S.xp+' XP':'')+'</h3><p>'+esc(S.res.msg)+'</p><button class="btn" data-act="mndone">Continue</button><button class="btn ghost small" data-act="mnagain" style="margin-top:8px">Try for more stars</button></div></div>';
 return h;
}
function vMnShop(m,S){
 var st=mnShopState(m,S),left=m.budget-st.spent;
 var h='<div class="mnbar'+(left<0?' over':'')+'"><div class="mnbar-t"><span>Spent <b>'+mnMoney(st.spent)+'</b> of '+mnMoney(m.budget)+'</span><span class="mnleft">'+(left<0?'Over by '+mnMoney(-left):mnMoney(left)+' left')+'</span></div><div class="bar"><i style="width:'+Math.min(100,st.spent/m.budget*100)+'%"></i></div><div class="mnneeds">';
 Object.keys(m.need).forEach(function(b){var ok=st.have[b]>=m.need[b];h+='<span class="mnneed'+(ok?' ok':'')+'">'+(ok?'✓ ':'')+esc(MNB[b])+' <b>'+st.have[b]+'/'+m.need[b]+'</b></span>'});
 h+='</div></div>';
 var groups={};m.items.forEach(function(k){var b=MNI[k][0];(groups[b]=groups[b]||[]).push(k)});
 Object.keys(MNB).forEach(function(b){if(!groups[b])return;
  h+='<h3 class="mngrp">'+esc(MNB[b])+(m.need[b]?' <small>need '+m.need[b]+' '+MNU[b]+'</small>':'')+'</h3><div class="mnitems">';
  groups[b].forEach(function(k){var n=S.q[k]||0,ps=mnPerServ(k);
   h+='<div class="mnitem'+(n?' on':'')+'"><div class="mni-t"><b>'+esc(MNP[k].n)+'</b><small>'+mnMoney(mnPrice(k))+' · '+MNI[k][1]+' '+MNU[b]+' · '+mnCents(ps)+' each</small></div><div class="mnstep"><button data-act="mnq" data-id="'+k+':-1" aria-label="One less '+esc(MNP[k].n)+'"'+(n?'':' disabled')+'>−</button><span aria-live="polite">'+n+'</span><button data-act="mnq" data-id="'+k+':1" aria-label="One more '+esc(MNP[k].n)+'">+</button></div></div>'});
  h+='</div>'});
 h+='<div class="xnav"><button class="btn" data-act="mncheck">Check my plan</button></div>';
 if(S.check)h+=mnFeedback(S.check);
 return h;
}
function mnFeedback(c){
 var h='<div class="card mnfb" role="status">';
 if(c.over)h+='<p class="xwarnp"><b>Over budget by '+mnMoney(-c.left)+'.</b> Take something out or switch to a cheaper choice.</p>';
 if(c.miss.length)h+='<p><b>Still missing:</b></p><ul>'+c.miss.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul>';
 if(c.stars)h+='<p class="xgoodp"><b>'+'★'.repeat(c.stars)+'</b> You spent '+mnMoney(c.spent)+' and have '+mnMoney(c.left)+' left.</p>';
 if(c.tips.length)h+='<p><b>Shopper tips</b></p><ul>'+c.tips.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul>';
 return h+'</div>';
}
function vMnTrip(m,S){
 var t=mnTrip(S),gp=mnPrice('gas');
 var h='<div class="mnbar'+(t.ok?'':' warn')+'"><div class="mnbar-t"><span>Gas: <b>'+mnMoney(t.cost)+'</b></span><span class="mnleft">'+mnMoney(gp)+' a gallon</span></div><div class="mnneeds"><span class="mnneed'+(t.seats>=8?' ok':'')+'">Seats <b>'+t.seats+'/8</b></span><span class="mnneed'+(t.cargo>=6?' ok':'')+'">Gear <b>'+t.cargo+'/6</b></span><span class="mnneed">Vehicles <b>'+t.cars+'</b></span></div></div><div class="mnitems">';
 MN_VEH.forEach(function(x){var n=S.veh[x.id]||0,trip=180/x.mpg*gp;
  h+='<div class="mnitem'+(n?' on':'')+'"><div class="mni-t"><b>'+esc(x.n)+'</b><small>'+x.seats+' seats · '+x.cargo+' gear loads · '+x.mpg+' mpg · '+mnMoney(trip)+' in gas for the trip</small></div><div class="mnstep"><button data-act="mnv" data-id="'+x.id+':-1" aria-label="One less '+esc(x.n)+'"'+(n?'':' disabled')+'>−</button><span>'+n+'</span><button data-act="mnv" data-id="'+x.id+':1" aria-label="One more '+esc(x.n)+'"'+(n>=2?' disabled':'')+'>+</button></div></div>'});
 h+='</div><div class="card mnmath"><b>How the math works</b><p>Gallons = miles ÷ mpg. Cost = gallons × price per gallon. Example: a minivan uses 180 ÷ 22 ≈ 8.18 gallons; using the unrounded result × '+mnMoney(gp)+' = '+mnMoney(180/22*gp)+'.</p>'+(t.ok&&t.cars?'<p>Split between 4 families, each pays <b>'+mnMoney(t.cost/4)+'</b>.</p>':'')+'</div>';
 h+='<div class="xnav"><button class="btn" data-act="mncheck">Check my convoy</button></div>';
 if(S.check)h+='<div class="card mnfb" role="status">'+S.check+'</div>';
 return h;
}
function vMnMonth(m,S){
 var r=mnMonth(S),opts=mnMonthOpts();
 var h='<div class="mnbar'+(r.left<0?' over':'')+'"><div class="mnbar-t"><span>Take-home pay <b>'+mnMoney(r.inc.net)+'</b></span><span class="mnleft">'+(r.left<0?'Short '+mnMoney(-r.left):mnMoney(r.left)+' unplanned')+'</span></div><div class="bar"><i style="width:'+Math.min(100,r.total/r.inc.net*100)+'%"></i></div><p class="mnsmall">'+mnMoney(mnPrice('wage'))+'/hr × 40 hrs × 52 weeks ÷ 12 = '+mnMoney(r.inc.gross)+' before taxes.</p></div>';
 opts.forEach(function(c){if(c.auto)return;
  h+='<h3 class="mngrp">'+esc(c.n)+'</h3><div class="mnopts">';
  c.o.forEach(function(o,i){var amt=o[1];if(c.k==='net'&&i===0&&S.pick.home!==1)amt=amt/2;h+='<button class="mnopt'+(S.pick[c.k]===i?' on':'')+'" data-act="mnpick" data-id="'+c.k+':'+i+'"><b>'+esc(o[0])+'</b><span>'+mnMoney(amt)+'</span>'+(o[2]?'<small>'+esc(o[2])+'</small>':'')+'</button>'});
  h+='</div>';
  if(c.k==='home')h+='<p class="mnsmall">Electricity: '+mnMoney(mnPrice('kwh')*500*(S.pick.home===1?1:0.5))+' a month, '+(S.pick.home===1?'all yours':'split with your roommate')+' ('+Math.round(mnPrice('kwh')*1000)/10+'¢ per kWh).</p>';
 });
 h+='<div class="xnav"><button class="btn" data-act="mncheck">Live the month</button></div>';
 if(S.check)h+='<div class="card mnfb" role="status">'+S.check+'</div>';
 return h;
}
function mnFinish(S,stars,msg){
 S.res={stars:stars,msg:msg};
 if(stars){var p=me(),best=(p.mnStars=p.mnStars||{})[S.id]||0;if(stars>best)p.mnStars[S.id]=stars;S.xp=!p.done[S.id]?awardLab(S.id):0;save()}
}
function mnClick(a,id){
 if(a==='mnbook'){v.mnBookOwner=db.active;v.mnBookFrom=v.s;v.s='mnp';return true}
 if(a==='mnpreset'){try{localStorage.removeItem(MN_KEY)}catch(e){}v.notice='';return true}
 if(a==='mnpback'){v.s=v.mnBookFrom==='mn'&&v.mn&&v.mn.ownerId===db.active?'mn':'path';return true}
 var S=v.mn;if(!S||v.s!=='mn'||S.ownerId!==db.active)return false;var m=mnMission(S.id);
 switch(a){
  case 'mnq':{var pr=String(id).split(':'),k=pr[0],d=parseInt(pr[1],10);if(m.type!=='shop'||m.items.indexOf(k)<0||(d!==1&&d!==-1))return true;S.q[k]=Math.max(0,Math.min(99,(S.q[k]||0)+d));S.check=null;return true}
  case 'mnv':{var pv=String(id).split(':');if(m.type!=='trip'||!MN_VEH.some(function(x){return x.id===pv[0]})||!['-1','1'].includes(pv[1]))return true;S.veh[pv[0]]=Math.max(0,Math.min(2,(S.veh[pv[0]]||0)+parseInt(pv[1],10)));S.check=null;return true}
  case 'mnpick':{var pk=String(id).split(':');var option=mnMonthOpts().find(function(x){return x.k===pk[0]&&!x.auto});if(m.type!=='month'||!option||!option.o[Number(pk[1])])return true;S.pick[pk[0]]=parseInt(pk[1],10);S.check=null;return true}
  case 'mndone':v.s='path';v.subj='money';return true;
  case 'mnagain':S.res=null;S.check=null;S.xp=0;return true;
  case 'mncheck':{
   if(m.type==='shop'){var c=mnCheckShop(m,S);S.check=c;if(c.stars)mnFinish(S,c.stars,'You fed everyone for '+mnMoney(c.spent)+' and brought back '+mnMoney(c.left)+'.'+(c.stars<3?(c.stars<2?' Add more variety for another star.':' Bring back at least '+mnMoney(m.budget*0.1)+' for the third star.'):''));return true}
   if(m.type==='trip'){var t=mnTrip(S),best=mnTripBest();
    if(!t.ok){S.check='<p class="xwarnp"><b>That convoy does not work.</b> '+(t.seats<8?'Not enough seats ('+t.seats+' of 8). ':'')+(t.cargo<6?'Not enough room for gear ('+t.cargo+' of 6).':'')+'</p>';return true}
    var stars=t.cost<=best.cost+0.01?3:t.cost<=75?2:1;
    S.check='<p class="xgoodp"><b>'+'★'.repeat(stars)+'</b> Everyone fits, and gas costs '+mnMoney(t.cost)+' ('+mnMoney(t.cost/4)+' per family).</p>'+(stars<3?'<p>There is a cheaper way. Hint: one big vehicle can beat two smaller ones, even with worse mpg.</p>':'<p>That is the cheapest convoy. One vehicle on the road beats two, even when it gets worse gas mileage.</p>');
    mnFinish(S,stars,'Gas for the trip: '+mnMoney(t.cost)+'.');return true}
   var r=mnMonth(S);
   if(!r.chosen){S.check='<p class="xwarnp">Make a choice in every section first.</p>';return true}
   if(r.left<0){S.check='<p class="xwarnp"><b>You are short '+mnMoney(-r.left)+'.</b> Change the plan to fit your pay. Borrowing would add costs based on the loan or card terms; no single rate applies to everyone.</p>';return true}
   var sp=MN_SURPRISE[S.surprise],cushion=r.save+r.left;
   var stars2=1,msg='<p class="xgoodp"><b>Your month balances</b> with '+mnMoney(r.left)+' unplanned.</p>';
   if(r.save>=r.inc.net*0.10)stars2=2;
   msg+='<p><b>Surprise!</b> '+esc(sp[0])+'</p>';
   if(cushion>=sp[1]){if(stars2===2)stars2=3;msg+='<p class="xgoodp">Your savings plus unassigned money covered it. Use unassigned money first; the rest comes from savings.</p>'}else msg+='<p class="xwarnp">You did not have '+mnMoney(sp[1])+' available. Revise the plan or find another way to cover the gap; credit is not the only option.</p>';
   if(stars2<2)msg+='<p>For the second star, save at least 10% of your pay ('+mnMoney(r.inc.net*0.1)+').</p>';
   msg+='<table class="mntab">'+r.lines.map(function(l){return '<tr><td>'+esc(l[0])+'</td><td>'+mnMoney(l[2])+'</td></tr>'}).join('')+'<tr><td><b>Total</b></td><td><b>'+mnMoney(r.total)+'</b></td></tr></table>';
   S.check=msg;mnFinish(S,stars2,'You planned a month on '+mnMoney(r.inc.net)+' take-home pay.');return true}
 }
 return false;
}
function vMnHome(){
 var p=me(),s=subj('money'),stars=p.mnStars||{};
 var h='<div class="wrap path mnhome" style="--c:'+MNC.c+';--cd:'+MNC.cd+'"><div class="pathhead"><button class="back" data-act="back" aria-label="Back">'+ICONS.back+'</button><div><h2>'+esc(s.name)+'</h2><p class="muted" style="font-size:14px;font-weight:600">'+esc(s.tag)+'</p></div></div>';
 h+='<div class="card"><p style="margin:0">Plan with the supplied practice prices, compare unit costs and keep money for surprises. The price book includes the package’s dated source notes; these values have not been independently verified as current local prices.</p></div><div class="mnlist">';
 MNM.forEach(function(m,i){var st=stars[m.id]||0;h+='<button class="mnmis" data-act="lesson" data-id="'+m.id+'"><span class="mnnum">'+(i+1)+'</span><span class="mnmt"><b>'+esc(m.title)+'</b><small>'+esc(m.sub)+'</small></span><span class="mnst" aria-label="'+st+' of 3 stars">'+'★'.repeat(st)+'<i>'+'☆'.repeat(3-st)+'</i></span></button>'});
 h+='</div><button class="btn ghost small" data-act="mnbook">Price book: where each price came from</button><div style="height:90px"></div></div>'+tabs('home');
 return h;
}
function vMnBook(){
 var o=mnOver(),h='<div class="wrap mn" style="--c:'+MNC.c+';--cd:'+MNC.cd+'"><div class="pathhead"><button class="back" data-act="mnpback" aria-label="Back">'+ICONS.back+'</button><div><h2>Price book</h2><p class="muted" style="font-size:14px;font-weight:600">Practice prices and supplied source notes</p></div></div>';
 h+='<div class="card"><p style="margin:0">Prices change every week. A parent can type in today\'s price from your own store. Checking prices at the store is a great job for a Trailman! Entered values are practice settings; check current offers and their terms before real purchases. Changes affect all learners on this device and are separate from progress backups. Edited prices can change whether a puzzle budget is achievable.</p></div><p class="mnsmall"><a href="https://www.bls.gov/cpi/factsheets/average-prices.htm" target="_blank" rel="noopener">BLS: what an average price represents</a> · <a href="https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/" target="_blank" rel="noopener">CFPB: money for unexpected expenses</a></p><div class="mnbook">';
 Object.keys(MNP).forEach(function(k){var x=MNP[k],ov=o[k]!==undefined;
  h+='<label class="mnrow"><span><b>'+esc(x.n)+'</b><small>'+'Supplied source note: '+esc(MN_SRC[x.s])+(ov?' · changed here (was '+mnMoney(x.p)+')':'')+'</small></span><input type="number" inputmode="decimal" step="0.001" min="0" max="100000" data-mnp="'+k+'" value="'+(k==='kwh'?mnPrice(k).toFixed(3):mnPrice(k).toFixed(2))+'" aria-label="Price of '+esc(x.n)+'"></label>'});
 h+='</div><button class="btn ghost small" data-act="mnpreset">Reset to the built-in prices</button><div style="height:90px"></div></div>';
 return h;
}
function mnPriceChanged(){if(v.mn&&v.mn.ownerId===db.active&&v.mnBookFrom==='mn'){v.mn.res=null;v.mn.check=null;v.mn.xp=0;mnSave(v.mn)}}
document.addEventListener('change',function(e){var el=e.target;if(v.s!=='mnp'||v.mnBookOwner!==db.active||!el||!el.dataset||!Object.prototype.hasOwnProperty.call(MNP,el.dataset.mnp))return;var k=el.dataset.mnp,val=Number(el.value),o=mnOver();if(el.value.trim()===''||!Number.isFinite(val)||val<0||val>100000||(k==='wage'&&val===0)){el.value=mnPrice(k);return}if(Math.abs(val-MNP[k].p)>0.0001)o[k]=Math.round(val*1000)/1000;else delete o[k];try{localStorage.setItem(MN_KEY,JSON.stringify(o));mnPriceChanged()}catch(err){el.value=mnPrice(k)}});
var mnClickBeforeSave=mnClick;mnClick=function(a,id){var S=v.mn,from=v.s,handled=mnClickBeforeSave(a,id);if(a==='mnpreset')mnPriceChanged();if(handled&&S&&S.ownerId===db.active&&(from==='mn'||v.s==='mn'))mnSave(S);return handled};
var mnCheckpointBefore=checkpoint;checkpoint=function(){if(v.s==='mn'&&v.mn&&v.mn.ownerId===db.active){mnSave(v.mn);return}mnCheckpointBefore()};
var mnResumeBefore=resumeWorkshop;resumeWorkshop=function(){var r=me()&&me().resume;if(r&&r.kind==='mn'){mnOpen(r.id);return}mnResumeBefore()};
SUBJECTS.push({id:"money",name:"Money Lab",tag:"Budget missions, unit prices and tradeoffs",c:MNC.c,cd:MNC.cd,icon:"star",lessons:MNM.map(function(m){return {id:m.id,title:m.title,unit:"Budget missions",kind:"mn",open:true}})});
BADGE_COLORS.money=MNC.c;
WORKSHOP_BADGES.push({id:'penny',name:'Penny pincher',goal:'Earn 3 stars on every Money Lab mission.',target:4,icon:'star',test:function(p){var s=p.mnStars||{};return MNM.every(function(m){return s[m.id]>=3})}});
var mnArtBefore=workshopArt;workshopArt=function(id){
 if(id!=='money')return mnArtBefore(id);
 var h='<ellipse cx="160" cy="160" rx="130" ry="11" fill="#0b2e16" opacity=".2"/><rect x="40" y="70" width="150" height="80" rx="10" fill="#2f9e44"/><rect x="48" y="78" width="134" height="64" rx="7" fill="none" stroke="#b2f2bb" stroke-width="2"/><circle cx="115" cy="110" r="20" fill="#b2f2bb"/><text x="115" y="118" text-anchor="middle" font-size="24" font-weight="800" fill="#1b5e2a" font-family="Arial,sans-serif">$</text>';
 h+='<rect x="30" y="54" width="150" height="80" rx="10" fill="#40c057" opacity=".55"/>';
 [[226,132],[250,124],[238,108],[262,104],[250,88]].forEach(function(c){h+='<ellipse cx="'+c[0]+'" cy="'+c[1]+'" rx="22" ry="8" fill="#f2b134" stroke="#a07537" stroke-width="2"/>'});
 h+='<rect x="200" y="20" width="76" height="52" rx="6" fill="#fffdf4" stroke="#d8cdb3" stroke-width="2"/><path d="M210 34h40M210 46h56M210 58h30" stroke="#9fb8c8" stroke-width="3" stroke-linecap="round"/>';
 return '<svg viewBox="0 0 320 180" aria-hidden="true" class="work-art">'+h+'</svg>';
};
var pathBeforeMn=vPath;vPath=function(){if(v.subj==='money')return vMnHome();return pathBeforeMn()};
if(window.ShopLab)Object.assign(window.ShopLab,{MN_VEH:MN_VEH,MN_SURPRISE:MN_SURPRISE,mnSave:mnSave,mnMonthOpts:mnMonthOpts,mnShopState:mnShopState,mnMission:mnMission,checkpoint:checkpoint,resumeWorkshop:resumeWorkshop,MNP:MNP,MNM:MNM,mnOpen:mnOpen,mnClick:mnClick,mnCheckShop:mnCheckShop,mnTrip:mnTrip,mnTripBest:mnTripBest,mnMonth:mnMonth,mnPrice:mnPrice,vPath:vPath});
/* END MONEY LAB */
