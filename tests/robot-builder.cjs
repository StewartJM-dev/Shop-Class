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

act('pick',profiles[0].id);act('subj','lab');assert(document.querySelector('[data-act="rbbopen"]'),'Fresh Circuit Lab portal');act('rbbopen');assert.equal(V.s,'rbb');assert.equal(document.querySelectorAll('[data-act="rbbtest"]').length,9);const start=me().xp;
for(const ch of L.RBB_CH){act('rbbtest',ch.id);assert(!V.rbb.res.ok,ch.id+' default should fail');assert.equal(me().xp,start)}
for(const value of ['body:round','move:treads','power:liion','tool:claw','sensors:distance','sensors:line','sensors:camera'])act('rbbpart',value);
act('rbbpart','sensors:light');assert.equal(V.rbb.d.sensors.length,3);assert(V.rbb.d.sensors.includes('distance'),'Fourth selection does not silently remove a sensor');
act('rbbcolor','red');let input=document.getElementById('rbbname');input.value='Trail Bot';input.dispatchEvent(new window.Event('input',{bubbles:true}));act('rbbsave');assert.equal(me().robot.name,'Trail Bot');assert.equal(me().robot.color,'red');
for(const ch of L.RBB_CH){act('rbbtest',ch.id);assert(V.rbb.res.ok,ch.id);assert.equal(V.rbb.res.xp,25);const xp=me().xp;act('rbbtest',ch.id);assert.equal(V.rbb.res.xp,0);assert.equal(me().xp,xp);dismiss()}
assert.equal(me().xp,start+225);assert(L.badgeState(me()).find(x=>x.badge.id==='engineer').earned);
act('rbbpart','tool:magnet');act('rbbtest','rbb5');assert(!V.rbb.res.ok);act('rbbpart','tool:claw');act('rbbsave');pick(profiles[1].id);L.rbbSave();assert(!me().robot);L.rbbDraft();assert(!(me().drafts||{}).rbb);act('subj','lab');act('rbbopen');assert.equal(V.rbb.d.name,'Rover');pick(profiles[0].id);act('resume');assert.equal(V.s,'rbb');assert.equal(V.rbb.d.name,'Trail Bot');
act('back');act('tab','home');act('subj','game');act('gmfree');assert.equal(document.querySelectorAll('[data-act="gmlook"]').length,5);
const {createCanvas}=require('@napi-rs/canvas'),hash=require('crypto').createHash;const images=[];
for(const look of L.GMLOOKS){act('gmlook',look);assert.equal(V.gm.cfg.look,look);assert.equal(V.gm.G.player.look,look);assert.equal(me().gmLook,look);const canvas=createCanvas(320,320);L.gmDraw(canvas.getContext('2d'),V.gm.G);images.push(hash('sha256').update(canvas.toBuffer('image/png')).digest('hex'))}
assert.equal(new Set(images).size,5,'The final detailed painter renders all five heroes distinctly');assert.equal(V.gm.G.player.robot.tool,'claw');assert.equal(V.gm.G.player.robot.color,'red');assert.equal(me().studio[0].cfg.look,'kitten');
act('gmlook','robot');const old=V.gm;pick(profiles[1].id);assert(!me().gmLook);L.gmClick('gmlook','dinosaur');assert(!me().gmLook,'Stale hero actions cannot write another learner');act('subj','game');act('gmfree');assert.equal(V.gm.cfg.look,'person');pick(profiles[0].id);act('resume');assert.equal(V.gm.cfg.look,'robot');
const cfg={look:'puppy',robot:{color:'red',tool:'claw',sensors:['light']}};const workerMessages=[];const w={self:{postMessage:m=>workerMessages.push(m)},console};vm.createContext(w);vm.runInContext(L.gameWorkerSource(),w);w.self.onmessage({data:{type:'init',seq:1,cfg,src:'function setup(){player.look="dinosaur";}',bot:false}});assert.equal(workerMessages.at(-1).G.player.look,'dinosaur');assert.equal(workerMessages.at(-1).G.player.robot.color,'red');
const generated=L.gbGen({setup:[{t:'set',v:['player.look','puppy']}],update:[],onCollect:[],onHit:[]});assert(generated.includes('player.look = "puppy"'));assert.equal(L.gbValFor('player.look'),'puppy');
const backup=data();V.restorePending=backup;const restore=document.createElement('button');restore.dataset.act='restoreconfirm';document.body.appendChild(restore);restore.dispatchEvent(new window.Event('click',{bubbles:true}));act('pick',profiles[0].id);assert.equal(me().robot.name,'Trail Bot');assert.equal(me().done.rbb9,3);assert.equal(me().gmLook,'robot');
assert.equal(L.SUBJECTS.flatMap(s=>s.lessons).length,370);assert.equal(L.allWorkshopBadges().length,53);assert.equal(L.SUBJECTS.find(s=>s.id==='bike').lessons.length,24);for(const f of ['robot-builder.js','robot-builder.css'])assert(html.includes(fs.readFileSync('extensions/'+f,'utf8').trim()));
console.log('Robot/heroes: all nine fail/pass/replay paths, sensor cap, current-owner saves/drafts/resume/backup, all five final canvas drawings, hero preferences/slots, stale actions, block code and serialized-worker look values pass.');
