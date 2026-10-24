const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync('index.html','utf8');const code=html.match(/<script\b[^>]*>([\s\S]*?)<\/script\s*>/i)[1];new vm.Script(code);
const events={};const mem={};const app={innerHTML:''};
const ctx={console,Date,Math,JSON,Map,Set,Uint8Array,Uint8ClampedArray,Float32Array,ArrayBuffer,TextEncoder,TextDecoder,URL,Blob,performance:{now:()=>0},localStorage:{getItem:k=>mem[k]||null,setItem:(k,v)=>mem[k]=v},setTimeout:()=>0,setInterval:()=>0,clearTimeout(){},clearInterval(){},requestAnimationFrame:()=>0,cancelAnimationFrame(){},navigator:{},location:{protocol:'file:',search:'',href:'file:///test.html'},document:{getElementById:id=>id==='app'?app:(id==='scgate'||id==='scgatechip')?{hidden:true,querySelector:()=>({}),querySelectorAll:()=>[]}:null,addEventListener:(k,f)=>(events[k]||(events[k]=[])).push(f),querySelectorAll:()=>[],querySelector:()=>null,createElement:()=>({getContext:()=>null,style:{},addEventListener(){}})},addEventListener(){},scrollTo(){},matchMedia:()=>({matches:false,addEventListener(){}})};ctx.window=ctx;ctx.self=ctx;
vm.createContext(ctx);vm.runInContext(code,ctx,{timeout:10000});
const L=ctx.ShopLab,V=L.state();const db=JSON.parse(mem['shopclass.v1']||'null');
function click(act,id){const el={dataset:{act,id},closest(){return this},tagName:'BUTTON'};for(const f of events.click||[])f({target:el,preventDefault(){}})}
// Pick a real seeded profile through the application navigation.
const profile=app.innerHTML.match(/data-act="pick" data-id="([^"]+)"/);assert(profile,'Profile picker rendered');click('pick',profile[1]);click('subj','auto');assert(app.innerHTML.includes('Open Case 01'));
click('ncopen');assert.equal(V.s,'nc');assert(app.innerHTML.includes('DC VOLTS'));
click('ncdiag','fuse');assert(!V.nc.diagnosed,'Cannot skip evidence');
click('ncrepair');assert(!V.nc.fixed);
const S=V.nc;S.red='b';click('ncmeasure');assert.equal(S.reading,12.6);
S.red='s';click('ncmeasure');assert(!S.seen.s,'OFF measurement cannot satisfy START evidence');
click('nckey');for(const k of ['s','fi','fo']){S.red=k;click('ncmeasure')}
assert.equal(S.reading,0);assert(L.ncReady(S));click('ncdiag','starter');assert(!S.diagnosed);click('ncdiag','fuse');assert(S.diagnosed);
click('ncrepair');assert(!S.fixed,'Repair blocked while key START');click('nckey');click('ncrepair');assert(S.fixed);assert.equal(L.ncVolt(S,'fo'),12.6);assert.equal(L.ncVolt(S,'s'),0);
click('ncexplain','voltage');assert(!S.fin,'Cannot finish before verification');click('nckey');assert(S.verified);S.red='s';click('ncmeasure');assert.equal(S.reading,12.6);
S.black='b';S.red='g';click('ncmeasure');assert.equal(S.reading,-12.6,'Probe reversal');
click('ncexplain','lights');assert(!S.fin);click('ncexplain','voltage');assert(S.fin);assert.equal(S.xp,25);click('ncexplain','voltage');assert.equal(S.xp,25);
click('ncrestart');assert.equal(V.nc.fixed,false);assert.equal(V.nc.log.length,0);
click('back');assert.equal(V.s,'path');
for(const id of ['fuel1','fuel2','fuel3','fuel4']){click('lesson',id);assert.equal(V.s,'brief');assert(app.innerHTML.includes('Learning reference'));click('start');assert.equal(V.s,'quiz');assert.equal(V.queue.length,4)}
// Lesson IDs stay unique across the entire curriculum.
const ids=L.SUBJECTS.flatMap(s=>s.lessons.map(l=>l.id));assert.equal(ids.length,new Set(ids).size);
console.log('PASS: full app initialization, Auto entry, delegated lesson controls, evidence gates, wrong diagnoses, safe repair order, voltage polarity, verification, XP guard, reset/back, four fuel lesson quizzes and unique IDs.');
// Existing workshop buttons still route to their original lessons.
for(const subject of ['elec','lab','auto','game','faith','code']){if(!L.SUBJECTS.some(s=>s.id===subject))continue;click('subj',subject);assert.equal(V.s,'path');assert(app.innerHTML.includes('pathhead'))}

click('subj','lab');click('lesson','sp1');assert.equal(V.s,'sp');assert(app.innerHTML.includes('Spot the part'));click('back');assert.equal(V.s,'path');
for(const l of L.SUBJECTS.find(s=>s.id==='code').lessons.filter(l=>/^pl(1[89]|2\d|3[01])$/.test(l.id)))assert.equal(l.kind,'py');
assert.equal(L.PYC.length,31);assert.equal(L.allWorkshopBadges().length,42);
console.log('Parts drill entry, 31 Python challenges and 42 badges verified.');

