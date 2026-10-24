const fs=require('fs'),vm=require('vm'),assert=require('assert');const {DOMParser,parseHTML}=require('linkedom');
const {document:doc}=parseHTML('<html><body><div id="app"></div></body></html>');const listeners={},winListeners={},store={},timers=[];let clock=10000;
const document={getElementById:id=>doc.getElementById(id),querySelector:s=>doc.querySelector(s),querySelectorAll:s=>doc.querySelectorAll(s),body:doc.body,hidden:false,createElement:t=>doc.createElement(t),addEventListener:(k,f,c)=>(listeners[k]??=[]).push({f,c})};
const window={addEventListener:(k,f)=>(winListeners[k]??=[]).push(f),scrollTo(){},matchMedia:()=>({matches:false})};
const c={document,window,DOMParser,console,Date:class extends Date{constructor(...x){super(...(x.length?x:[clock]))}static now(){return clock}},localStorage:{getItem:k=>store[k]||null,setItem:(k,v)=>store[k]=v},setInterval:(f,ms)=>(timers.push({f,ms}),timers.length),clearInterval(){},setTimeout(){},clearTimeout(){},requestAnimationFrame(){},Blob,URL};vm.createContext(c);vm.runInContext(fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1],c);const S=window.ShopLab;
function click(act,extra={}){const el={dataset:{act,...extra}};listeners.click.find(l=>!l.c).f({target:{closest:()=>el}})}
const profiles=JSON.parse(store['shopclass.v1']).profiles;click('pick',{id:profiles[0].id});


assert.equal(S.XLES.length,8);
assert.equal(S.XTM.led({sig:false,rb:1000}).ic,0);
const bright=S.XTM.led({sig:true,rb:1000}),dim=S.XTM.led({sig:true,rb:100000});assert(bright.bright>dim.bright);assert(bright.bright===1);assert(S.XTM.led({sig:true,rb:0}).fault);assert.equal(S.XTM.led({sig:true,rb:1000,open:'emitter'}).ic,0);
const motor={sig:true,rb:220,ground:true,diode:'good',load:'free',t:S.XTM.TR.T1};assert(S.XTM.motor(motor).ok);assert(!S.XTM.motor({...motor,ground:false}).ok);assert(!S.XTM.motor({...motor,load:'stalled'}).ok);assert(!S.XTM.motor({...motor,diode:'wrong'}).ok);
assert(S.XTM.spike('good').peak<S.XTM.spike('none').peak);
for(const [d,a] of [[0,0],[50,3],[100,6]])assert.equal(S.XTM.pwm(d).avg,a);
assert.equal(S.XTM.bridge({ul:1,ll:1,ur:0,lr:0}).state,'shoot');
for(const dir of ['fwd','rev'])for(const en of [false,true]){const sw=S.XTM.driver({dir,en});assert(!(sw.ul&&sw.ll));assert(!(sw.ur&&sw.lr));if(en)assert.equal(S.XTM.bridge(sw).state,dir)}
assert(S.XTM.final({t:'T2',rb:220,diode:'good',ground:true,duty:50}).every(r=>r.ok));assert(!S.XTM.final({t:'T1',rb:0,diode:'none',ground:false,duty:100}).every(r=>r.ok));
function action(a,id){click(a,{id:String(id)})}
for(const L of S.XLES){click('subj',{id:'lab'});action('lesson',L.id);assert.equal(S.state().s,'xt');assert(doc.querySelector('.xt'));let budget=0;while(!S.state().xt.fin&&budget++<30){let T=S.state().xt,st=T.L.steps[T.i];if(st.k==='ask'){action('xtans',1);assert(!S.xtOk(T));action('xtans',0)}else if(st.k==='bench'){
 assert(!S.xtOk(T),L.id+' bench needs learner work');
 if(st.w==='pin'){for(const k of T.ws[T.i].order)action('xtpin',k)}
 if(st.w==='led'){action('xtsig',1);action('xtrb',1000);action('xtrb',100000);action('xtsig',0)}
 if(st.w==='fault'){for(let i=0;i<3;i++){action('xtfopt',S.XFAULTS[i].dright);action('xtfopt',S.XFAULTS[i].fright);action('xtfnext','')}}
 if(st.w==='motor'){action('xtgnd',1);action('xtsig',1);action('xtload','stalled')}
 if(st.w==='spike'){action('xtdio','none');action('xtoff','');action('xtdio','good');action('xtoff','')}
 if(st.w==='pwm'){for(const d of [0,100,50])action('xtdset',d)}
 if(st.w==='bridge'){action('xtsw','ul');action('xtsw','lr');action('xtsw','ul');action('xtsw','lr');action('xtsw','ur');action('xtsw','ll');action('xtsw','ur');action('xtsw','ul');action('xtmode','driver');action('xten',1);action('xtdir','rev')}
 if(st.w==='final'){action('xttr','T2');action('xtrb',220);action('xtdio','good');action('xtgnd',1);action('xtdset',50);action('xttest','')}
 assert(S.xtOk(T),L.id+' bench requirements');
 }action('xtnext','')}
 assert(S.state().xt.fin,L.id+' completes through actual actions');let p=JSON.parse(store['shopclass.v1']).profiles[0];assert.equal(p.done[L.id],3);let xp=p.xp;action('xtnext','');assert.equal(JSON.parse(store['shopclass.v1']).profiles[0].xp,xp);console.log(L.id+' complete; duplicate Finish does not award XP');
}
// Replaying a completed lesson cannot farm XP.
click('subj',{id:'lab'});action('lesson','xt1');let before=JSON.parse(store['shopclass.v1']).profiles[0].xp;for(let i=0;i<12&&!S.state().xt.fin;i++){const T=S.state().xt,st=T.L.steps[T.i];if(st.k==='ask')action('xtans',0);if(st.k==='bench')for(const k of T.ws[T.i].order)action('xtpin',k);action('xtnext','')}assert.equal(JSON.parse(store['shopclass.v1']).profiles[0].xp,before);
// Drafts reopen at the right bench with the owner's work.
click('subj',{id:'lab'});action('lesson','xt2');action('xtnext','');action('xtrb',1000000);action('xtsig',1);S.checkpoint();const old=S.state().xt;click('pick',{id:profiles[1].id});S.xtSaveFor(old);assert(!JSON.parse(store['shopclass.v1']).profiles[1].drafts);action('lesson','xt2');assert.equal(S.state().xt.i,0);click('pick',{id:profiles[0].id});click('resume');assert.equal(S.state().s,'xt');assert.equal(S.state().xt.i,1);assert.equal(S.state().xt.ws[1].rb,1000000);
const stale=S.state().xt;click('pick',{id:profiles[1].id});stale.i=stale.L.steps.length-1;S.state().xt=stale;assert.equal(S.xtClick('xtnext',''),false);assert(!JSON.parse(store['shopclass.v1']).profiles[1].done.xt2);
// Preserve newer labs, unified badges and fresh studio entry fixes.
assert.equal(S.allWorkshopBadges().length,42);assert.equal(S.C8MISSIONS.length,7);assert.equal(S.RBMISSIONS.length,6);click('subj',{id:'game'});action('gmfree','free');assert.equal(S.state().s,'game');click('subj',{id:'code'});action('wbfree','free');assert.equal(S.state().s,'web');
const file=fs.readFileSync('index.html','utf8');assert(file.includes(fs.readFileSync('extensions/transistor-motor.js','utf8').trim()));assert(file.includes(fs.readFileSync('extensions/transistor-motor.css','utf8').trim()));
console.log('All eight transistor lessons, model checks, finish/replay guards, draft ownership and merged-feature preservation pass');


