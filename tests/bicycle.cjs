const fs=require('fs'),vm=require('vm'),assert=require('assert'),{parseHTML,DOMParser}=require('linkedom');
const html=fs.readFileSync('index.html','utf8'),{window,document}=parseHTML(html),store={};
window.scrollTo=()=>{};window.matchMedia=()=>({matches:false});
const c={window,document,DOMParser,console,Blob,URL,localStorage:{getItem:k=>store[k],setItem:(k,v)=>store[k]=v},setInterval(){},clearInterval(){},setTimeout(){},clearTimeout(){},requestAnimationFrame(){}};
vm.createContext(c);vm.runInContext(document.querySelector('script').textContent,c);
const L=window.ShopLab,V=L.state(),data=()=>JSON.parse(store['shopclass.v1']),profiles=data().profiles;
const saved=id=>data().profiles.find(p=>p.id===id),me=()=>saved(data().active);
function act(a,id){const el=document.querySelector('[data-act="'+a+'"]'+(id!==undefined?'[data-id="'+id+'"]':''));assert(el,a+' '+id);assert(!el.hasAttribute('disabled'),'enabled '+a);el.dispatchEvent(new window.Event('click',{bubbles:true}));return el}
function dismiss(){if(document.querySelector('[data-act="badgedismiss"]'))act('badgedismiss')}
function home(){dismiss();if(!document.querySelector('[data-act="tab"][data-id="home"]'))act('back');act('tab','home')}
function pick(id){home();act('switch');act('pick',id)}
function key(k){const e=new window.Event('keydown',{bubbles:true,cancelable:true});Object.defineProperty(e,'key',{value:k});document.body.dispatchEvent(e)}
function clue(caseData){const els=Array.from(document.querySelectorAll('[data-act="tdtap"]'));const matches=els.filter(e=>e.textContent.includes(caseData.clue));assert(matches.length>=1,'Selectable clue survives sentence splitting: '+caseData.id);return matches[0].dataset.id}

act('pick',profiles[0].id);act('subj','bike');assert(document.querySelector('.workshop-path-cover img'));assert(document.body.textContent.includes('My Bicycle'));
const initial=me().xp;
function bench(Ls){let S=V.bike;
 if(['gear','front','index','limit'].includes(Ls.lab)){act('bikegear','front:22');act('bikegear','rear:34');act('bikegear','front:44');act('bikegear','rear:11');act('bikebarrel','-1');act('bikebarrel','-1');act('bikelimit','0');act('biketrylimit');assert(S.msg.includes('blocks'));act('bikelimit','3');act('biketrylimit');assert(S.msg.includes('permits'));}
 if(Ls.lab==='brake'){for(const type of ['side','center','v','disc','coaster']){act('bikebraketype',type);assert(document.querySelector('svg[aria-label]'));act('bikebrake','0');act('bikebrake','100')}}
 if(Ls.lab==='patch'){L.bikeClick('bikepatch','5');assert.equal(S.patch,0);for(let i=0;i<6;i++)act('bikepatch',String(i))}
 if(Ls.lab==='pressure'){assert(!L.bikeLabReady(Ls,S));for(let i=0;i<4;i++)act('bikepsi','-5');assert(L.bikeLabReady(Ls,S));}
}
for(const lesson of L.BIKE_LESSONS){act('lesson',lesson.id);assert.equal(V.s,'bike');let S=V.bike;L.bikeClick('bikefinish');assert(!S.finished,'Cannot bypass work');act('bikeanswer','1');assert(!S.answer);bench(lesson);lesson.steps.forEach((_,i)=>act('bikecheck',String(i)));act('bikeanswer','0');assert(L.bikeReady(lesson,S));act('bikefinish');assert(S.finished);assert.equal(S.xp,25);let xp=me().xp;L.bikeClick('bikefinish');assert.equal(me().xp,xp);dismiss();act('back');assert.equal(V.s,'path');act('lesson',lesson.id);bench(lesson);lesson.steps.forEach((_,i)=>act('bikecheck',String(i)));act('bikeanswer','0');act('bikefinish');assert.equal(V.bike.xp,0,'Replay awards no XP');dismiss();act('back')}
assert.equal(me().xp,initial+24*25);assert.equal(L.bikeGearModel({front:22,rear:34,barrel:0}).ratio,22/34);assert.equal(L.bikeLimits(3,0),0);assert.equal(L.bikeLimits(3,3),3);
act('lesson','bike04');act('bikebarrel','-1');act('bikecheck','0');const owned=V.bike;pick(profiles[1].id);assert(!me().bicycle);L.bikeSave();assert(!(me().drafts||{})['bike:bike04']);act('subj','bike');act('lesson','bike04');assert.equal(V.bike.barrel,2);pick(profiles[0].id);act('resume');assert.equal(V.bike.barrel,1);assert(V.bike.checks[0]);assert.equal(V.bike.ownerId,profiles[0].id);
act('bikerecord');const field=document.querySelector('[data-bike-field="name"]');field.value='<Trail bike>';field.dispatchEvent(new window.Event('input',{bubbles:true}));assert.equal(me().bicycle.name,'<Trail bike>');const note=document.querySelector('#bike-service');note.value='Checked pressure and both brakes';note.dispatchEvent(new window.Event('input',{bubbles:true}));act('bikelog');assert.equal(me().bicycle.log.length,1);assert.equal(me().bicycle.log[0].text,'Checked pressure and both brakes');assert(document.body.textContent.includes('<Trail bike>')===false);pick(profiles[1].id);act('subj','bike');act('bikerecord');assert(!me().bicycle.name);assert.equal(me().bicycle.log.length,0);
const backup=data();V.restorePending=backup;const restore=document.createElement('button');restore.dataset.act='restoreconfirm';document.body.appendChild(restore);restore.dispatchEvent(new window.Event('click',{bubbles:true}));act('pick',profiles[0].id);assert.equal(me().bicycle.log[0].text,'Checked pressure and both brakes');assert.equal(me().done.bike24,3);
assert.equal(L.SUBJECTS.flatMap(s=>s.lessons).length,370);assert.equal(L.SUBJECTS.length,10);assert.equal(L.allWorkshopBadges().length,53);assert.equal(new Set(Object.values(L.WORKSHOP_COVERS)).size,10);assert(L.badgeState(me()).find(x=>x.badge.id==='bikeall').earned);assert(!L.badgeState({done:{fake:3},xp:0}).find(x=>x.badge.id==='bike-first').earned);
for(const f of ['bicycle.js','bicycle.css'])assert(html.includes(fs.readFileSync('extensions/'+f,'utf8').trim()));
console.log('Bicycle: all 24 routes and finishes, gated benches, five brake schematics, patch order, pressure bounds, gear/index/limit models, first/replay XP, profile-owned drafts/resume, service records and backup restore pass.');
