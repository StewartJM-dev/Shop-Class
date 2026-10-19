const fs=require('fs'),vm=require('vm'),assert=require('assert');const {DOMParser,parseHTML}=require('linkedom');
const {document:doc}=parseHTML('<html><body><div id="app"></div></body></html>');const listeners={},winListeners={},store={},timers=[];let clock=10000;
const document={getElementById:id=>doc.getElementById(id),querySelector:s=>doc.querySelector(s),querySelectorAll:s=>doc.querySelectorAll(s),body:doc.body,hidden:false,createElement:t=>doc.createElement(t),addEventListener:(k,f,c)=>(listeners[k]??=[]).push({f,c})};
const window={addEventListener:(k,f)=>(winListeners[k]??=[]).push(f),scrollTo(){},matchMedia:()=>({matches:false})};
const c={document,window,DOMParser,console,Date:class extends Date{constructor(...x){super(...(x.length?x:[clock]))}static now(){return clock}},localStorage:{getItem:k=>store[k]||null,setItem:(k,v)=>store[k]=v},setInterval:(f,ms)=>(timers.push({f,ms}),timers.length),clearInterval(){},setTimeout(){},clearTimeout(){},requestAnimationFrame(){},Blob,URL};vm.createContext(c);vm.runInContext(fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1],c);const S=window.ShopLab;
function click(act,extra={}){const el={dataset:{act,...extra}};listeners.click.find(l=>!l.c).f({target:{closest:()=>el}})}
const profiles=JSON.parse(store['shopclass.v1']).profiles;click('pick',{id:profiles[0].id});


function runCpu(src){const m=S.c8New(src);for(let i=0;i<4000&&!m.halt;i++)S.c8Clock(m);return m}
for(const mission of S.C8MISSIONS){if(mission.solution){let m=runCpu(mission.solution);assert(!m.error,mission.id+': '+m.error);assert(mission.ok({m}),mission.id);assert(!mission.ok({m:runCpu(mission.start)}),mission.id+' starter must require work');console.log(mission.id,m.outputs.join(','),m.clocks)}}
for(const id of ['rb-03','rb-04','rb-05']){const mission=S.RBMISSIONS.find(m=>m.id===id);const session={robot:S.rbNew(id),kind:'robot',id,mode:'rules',rule:mission.rule,threshold:40,running:true};for(let i=0;i<1800;i++){S.rbTick(session);if(mission.ok(session)||session.robot.collisions)break}assert(mission.ok(session),id+' feedback mission');console.log(id,JSON.stringify({x:session.robot.x,y:session.robot.y,t:session.robot.time,d:session.robot.distance,contact:session.robot.collisions,turns:session.robot.sensorTurns,front:session.robot.sensor,line:session.robot.lineGood,ok:!!mission.ok(session)}))}
const mission=S.RBMISSIONS.find(m=>m.id==='rb-06'),session={robot:S.rbNew(mission.id),mode:'program',queue:S.rbCompile(mission.solution),qi:0,wait:0,running:true};for(let i=0;i<1000&&session.running;i++)S.rbTick(session);assert(mission.ok(session),'delivery route');console.log('delivery',JSON.stringify({x:session.robot.x,y:session.robot.y,pads:session.robot.pads,theta:session.robot.theta,ok:!!mission.ok(session)}));

for(let a=0;a<256;a+=17)for(let b=0;b<256;b+=13){
 let m=runCpu(`LDI ${a}\nADD 240\nHLT\n.ORG 240\n.BYTE ${b}`);
 assert.equal(m.a,(a+b)%256);assert.equal(m.c,a+b>255);assert.equal(m.z,m.a===0);
 m=runCpu(`LDI ${a}\nSUB 240\nHLT\n.ORG 240\n.BYTE ${b}`);
 assert.equal(m.a,(a-b+256)%256);assert.equal(m.c,a>=b);assert.equal(m.z,a===b);
}
for(const bad of ['fetch(1)','LDI 256','LDI -1','JMP missing','HLT 1','.ORG 255\nLDI 1','.ORG 0\n.BYTE 3\n.ORG 0\nHLT'])assert.throws(()=>S.c8Assemble(bad));
let wrap=runCpu('.ORG 0\nHLT\n.ORG 254\nLDI 73');wrap=S.c8New('.ORG 0\nHLT\n.ORG 254\nLDI 73');wrap.pc=254;for(let i=0;i<3;i++)S.c8Clock(wrap);assert.equal(wrap.a,73);assert.equal(wrap.pc,0);
assert(runCpu('LOOP: JMP LOOP').error.includes('Clock limit'));
for(const bad of ['fetch(1)','DRIVE 101 0','WAIT -1','WAIT Infinity','TURN RIGHT NaN','TURN UP 90','STOP 1'])assert.throws(()=>S.rbCompile(bad));
let straight=S.rbNew('rb-01');straight.left=straight.right=50;for(let i=0;i<40;i++)S.rbStep(straight,.05);assert(Math.abs(straight.x-110)<1e-8);assert.equal(straight.y,160);assert.equal(straight.theta,0);
let turn=S.rbNew('rb-02');turn.left=40;turn.right=-40;for(let i=0;i<20;i++)S.rbStep(turn,.05);assert.equal(turn.x,60);assert.equal(turn.y,160);assert(Math.abs(turn.theta-40/18)<1e-9);
let contact=S.rbNew('rb-03');contact.left=contact.right=100;for(let i=0;i<200&&!contact.collisions;i++)S.rbStep(contact,.05);assert(contact.collisions);assert(contact.x<=268);assert.equal(contact.left,0);
let fresh=S.rbNew('rb-03');S.rbSense(fresh);assert.equal(fresh.sensor,200);fresh.x=200;S.rbSense(fresh);assert.equal(fresh.sensor,68);
// Fresh-profile entry uses the actual delegated UI click path.
click('c8free');assert.equal(S.state().s,'cpu8');assert(doc.querySelector('#c8code'));assert(!S.state().discovery.mission);click('dsback');assert.equal(S.state().s,'path');
click('rbfree');assert.equal(S.state().s,'robot');assert(doc.querySelector('.ds-arena'));assert(doc.querySelector('#rbcode'));
click('subj',{id:'lab'});for(const m of [...S.C8MISSIONS,...S.RBMISSIONS]){click('lesson',{id:m.id});assert.equal(S.state().s,m.kind);assert(!JSON.parse(store['shopclass.v1']).profiles[0].done[m.id]);}
// Binary switch and latch missions require the intended state, not entry clicks.
click('lesson',{id:'c8-01'});for(const i of ['5','3','1'])click('c8bit',{id:i});assert(!S.state().discovery.won);click('c8latch');assert(S.state().discovery.won);assert.equal(JSON.parse(store['shopclass.v1']).profiles[0].done['c8-01'],3);let xp=JSON.parse(store['shopclass.v1']).profiles[0].xp;click('c8latch');assert.equal(JSON.parse(store['shopclass.v1']).profiles[0].xp,xp);
click('lesson',{id:'c8-02'});for(const i of ['6','3','0'])click('c8bit',{id:i});click('c8latch');assert(!S.state().discovery.won);for(const i of ['6','3','0'])click('c8bit',{id:i});assert(S.state().discovery.won);
// Exact owner is retained for delayed saves and awards after a profile switch.
click('c8free');let owned=S.state().discovery;owned.code='LDI 81\nOUT\nHLT';S.discoverySave(owned);owned.running=true;click('pick',{id:profiles[1].id});S.discoverySave(owned);owned.id='c8-03';owned.mission=S.C8MISSIONS[2];owned.m=runCpu(owned.mission.solution);assert.equal(S.discoveryCheck(owned),false);assert(!JSON.parse(store['shopclass.v1']).profiles[1].discovery);
click('c8free');assert.notEqual(S.state().discovery.code,'LDI 81\nOUT\nHLT');click('pick',{id:profiles[0].id});click('c8free');assert.equal(S.state().discovery.code,'LDI 81\nOUT\nHLT');S.checkpoint();click('tab',{id:'home'});click('resume');assert.equal(S.state().s,'cpu8');assert.equal(S.state().discovery.code,'LDI 81\nOUT\nHLT');
// Running while another surface is active never moves the saved machine.
const active=S.state().discovery;active.running=true;const ticks=active.m.clocks;click('tab',{id:'home'});timers.filter(t=>t.ms===50).forEach(t=>t.f());assert.equal(active.m.clocks,ticks);
const backup=JSON.parse(store['shopclass.v1']);assert.equal(backup.schema,2);assert.equal(backup.profiles[0].discovery['cpu8:free'].code,'LDI 81\nOUT\nHLT');
console.log('Computer arithmetic, assembler rejection, memory wrap, execution cap, rover kinematics, sensor rules, delivery, fresh entry, award ownership and resume checks pass');

let dock=S.rbNew('rb-01');dock.left=dock.right=60;for(let i=0;i<240;i++)S.rbStep(dock,.05);dock.left=dock.right=0;assert(S.RBMISSIONS[0].ok({robot:dock}));
let spin={robot:S.rbNew('rb-02'),mode:'program',queue:S.rbCompile('TURN RIGHT 90\nSTOP'),qi:0,wait:0,running:true};for(let i=0;i<100&&spin.running;i++)S.rbTick(spin);assert(S.RBMISSIONS[1].ok(spin));
const embedded=fs.readFileSync('index.html','utf8');assert(embedded.includes(fs.readFileSync('extensions/computer-robotics.js','utf8').trim()));assert(embedded.includes(fs.readFileSync('extensions/computer-robotics.css','utf8').trim()));
console.log('All 13 new mission objectives and embedded extension consistency pass');

for(const mission of [...S.C8MISSIONS,...S.RBMISSIONS]){click('subj',{id:'lab'});click('lesson',{id:mission.id});const guide=doc.querySelector('.ds-howto');assert(guide,mission.id);assert(guide.querySelectorAll('li').length>=3);assert(guide.textContent.includes('What to notice'));assert(guide.textContent.includes('Need a hint?'));assert(guide.textContent.includes('New words, explained'));assert.equal(guide.querySelector('details').hasAttribute('open'),false);}
click('subj',{id:'lab'});click('lesson',{id:'c8-01'});assert(doc.querySelector('.ds-beginner'));assert(doc.querySelector('[data-act="c8latch"]').textContent.includes('Copy switches into A'));
click('lesson',{id:'c8-03'});assert(doc.querySelector('[data-act="c8assemble"]').textContent.includes('Load program & reset'));assert(doc.querySelector('[data-act="c8instruction"]').textContent.includes('Run one instruction'));
console.log('All 13 missions have numbered beginner steps, observations, collapsed hints and vocabulary help; plain control labels render');
