const fs=require('fs'),vm=require('vm'),assert=require('assert'),{parseHTML,DOMParser}=require('linkedom');
const html=fs.readFileSync('index.html','utf8'),{window,document}=parseHTML(html),store={};
window.scrollTo=()=>{};window.matchMedia=()=>({matches:false});
const c={window,document,DOMParser,console,Blob,URL,localStorage:{getItem:k=>store[k],setItem:(k,v)=>store[k]=v},setInterval(){},clearInterval(){},setTimeout(){},clearTimeout(){},requestAnimationFrame(){}};vm.createContext(c);vm.runInContext(document.querySelector('script').textContent,c);
const L=window.ShopLab,V=L.state();const profiles=JSON.parse(store['shopclass.v1']).profiles;
function tap(selector){const el=document.querySelector(selector);assert(el,selector);assert(!el.hasAttribute('disabled'));el.dispatchEvent(new window.Event('click',{bubbles:true}));return el}
function act(a,id){return tap('[data-act="'+a+'"]'+(id?'[data-id="'+id+'"]':''))}
function knob(k,n){const el=document.querySelector('[data-cb-control="'+k+'"]');assert(el);el.value=String(n);el.dispatchEvent(new window.Event('input',{bubbles:true}));assert.strictEqual(document.querySelector('[data-cb-control="'+k+'"]'),el,'Slider survives live updates');assert.equal(document.getElementById('cb-'+k+'-value').textContent,n+'%')}
act('pick',profiles[0].id);act('subj','auto');assert(document.querySelector('.workshop-path-cover'));act('cbopen');assert.equal(V.s,'cb');assert(document.querySelector('#cb-diagram svg'));act('cbcheck');assert.equal(V.cb.i,0,'No skip before observing');
act('cbpart','venturi');act('cbcheck');assert.equal(V.cb.i,1);const normal=L.cbModel(V.cb);knob('throttle',80);const high=L.cbModel(V.cb);knob('throttle',20);const low=L.cbModel(V.cb);assert(high.air>low.air);assert(high.fuel>low.fuel);assert.equal(high.mix,'Balanced');act('cbcheck');assert.equal(V.cb.i,2);assert(V.cb.cold);
knob('choke',80);assert.equal(L.cbModel(V.cb).mix,'Rich');assert(L.cbModel(V.cb).coldReady);act('cbcheck');assert.equal(V.cb.i,3);assert(!V.cb.cold);assert.equal(V.cb.choke,80);
act('cbcheck');assert.equal(V.cb.i,3,'Warm-up needs open choke');knob('choke',0);act('cbcheck');assert.equal(V.cb.i,4);assert(!L.cbModel(V.cb).needle);
act('cbdraw');assert.equal(V.cb.level,40);assert(L.cbModel(V.cb).needle);act('cbcheck');assert.equal(V.cb.i,4);act('cbfill');act('cbfill');assert.equal(V.cb.level,65);assert(!L.cbModel(V.cb).needle);act('cbfill');assert.equal(V.cb.level,65,'Needle prevents overfilling');act('cbcheck');assert.equal(V.cb.i,5);
act('cbanswer','fuel');assert(!V.cb.seen.answer);const clean=L.cbModel(V.cb);act('cbjet');const dirty=L.cbModel(V.cb);assert.equal(dirty.mix,'Lean');assert.equal(dirty.air,clean.air,'Jet restriction changes fuel path, not throttle area');assert(dirty.fuel<clean.fuel);act('cbjet');assert.equal(L.cbModel(V.cb).mix,'Balanced');act('cbanswer','spark');assert(!V.cb.seen.answer);act('cbanswer','fuel');assert(V.cb.seen.answer);
act('cbcheck');assert(V.cb.fin);assert.equal(V.cb.xp,25);const earned=JSON.parse(store['shopclass.v1']).profiles[0].xp;act('cbcheck');assert.equal(JSON.parse(store['shopclass.v1']).profiles[0].xp,earned);
// Opening a completed lesson starts a replay, while incomplete work resumes per owner.
if(document.querySelector('[data-act="badgedismiss"]'))act('badgedismiss');act('cbdone');act('lesson','cb1');assert.equal(V.cb.i,0);act('cbpart','venturi');act('cbcheck');knob('throttle',85);const owned=V.cb;
act('back');act('tab','home');act('switch');act('pick',profiles[1].id);act('subj','auto');act('cbopen');assert.equal(V.cb.i,0);assert(!V.cb.seen.high);assert.equal(L.cbClick('cbcheck'),true);L.cbSave(owned);assert.equal(JSON.parse(store['shopclass.v1']).profiles[1].drafts['cb:cb1'].i,0);
act('back');act('tab','home');act('switch');act('pick',profiles[0].id);act('resume');assert.equal(V.s,'cb');assert.equal(V.cb.i,1);assert.equal(V.cb.throttle,85);assert(V.cb.seen.high);
act('cbrestart');assert.equal(V.cb.i,0);assert.deepEqual(Object.keys(V.cb.seen),[]);
// Traverse replay to prove repeat completion awards zero XP.
act('cbpart','venturi');act('cbcheck');knob('throttle',80);knob('throttle',20);act('cbcheck');knob('choke',80);act('cbcheck');knob('choke',0);act('cbcheck');act('cbdraw');act('cbfill');act('cbfill');act('cbcheck');act('cbjet');act('cbjet');act('cbanswer','fuel');act('cbcheck');assert.equal(V.cb.xp,0);assert.equal(JSON.parse(store['shopclass.v1']).profiles[0].xp,earned);
// Idle passage remains available when main jet is restricted; empty bowl supplies no fuel.
const state={throttle:0,choke:0,level:65,cold:false,restricted:true};assert.equal(L.cbModel(state).mix,'Balanced');state.level=0;assert.equal(L.cbModel(state).fuel,0);assert.equal(L.cbModel(state).mix,'No fuel');
act('back');assert.equal(V.s,'path');assert(html.includes(fs.readFileSync('extensions/carburetor.js','utf8').trim()));assert(html.includes(fs.readFileSync('extensions/carburetor.css','utf8').trim()));
if(process.env.CB_PREVIEW_SVG)fs.writeFileSync(process.env.CB_PREVIEW_SVG,L.cbSvg({...V.cb,throttle:55,choke:0,level:65,part:'venturi'}));
console.log('Carburetor: fresh entry, six gated discoveries, live slider DOM stability, choke/throttle/float/jet behavior, owner-bound resume, repeat-XP guard, idle/empty bowl and embedded source checks pass.');
