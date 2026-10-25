const fs=require('fs'),vm=require('vm'),assert=require('assert'),{parseHTML,DOMParser}=require('linkedom');
const html=fs.readFileSync('index.html','utf8'),{window,document}=parseHTML(html),store={},timers=[];
window.scrollTo=()=>{};window.matchMedia=()=>({matches:false});
const c={window,document,DOMParser,console,Blob,URL,localStorage:{getItem:k=>store[k],setItem:(k,v)=>store[k]=v},setInterval(){},clearInterval(){},setTimeout:(f)=>(timers.push(f),timers.length),clearTimeout(){},requestAnimationFrame(){}};
vm.createContext(c);vm.runInContext(document.querySelector('script').textContent,c);
const L=window.ShopLab,V=L.state(),data=()=>JSON.parse(store['shopclass.v1']),profiles=data().profiles;
const profile=()=>data().profiles.find(p=>p.id===data().active);
function act(a,id){const el=document.querySelector('[data-act="'+a+'"]'+(id!==undefined?'[data-id="'+id+'"]':''));assert(el,a+' '+id);assert(!el.hasAttribute('disabled'));el.dispatchEvent(new window.Event('click',{bubbles:true}))}
function input(id,value){const el=document.getElementById(id);assert(el,id);el.value=value;el.dispatchEvent(new window.Event('input',{bubbles:true}))}
function flush(){timers.splice(0).forEach(f=>f())}
function dismiss(){if(document.querySelector('[data-act="badgedismiss"]'))act('badgedismiss')}
function home(){dismiss();if(!document.querySelector('[data-act="tab"][data-id="home"]'))act('back');act('tab','home')}
act('pick',profiles[0].id);act('subj','write');assert.equal(document.querySelectorAll('.wdtpl').length,17);
assert.equal(L.wde().check('I have a freind.').filter(x=>x.k==='spell').length,1);
assert(L.wde().suggest('freind').includes('friend'));
act('wdnew','blank');const firstId=V.wd.id;
input('wdtitle','My <story>');input('wdtext','I have a freind.');assert.equal(profile().docs[0].text,'I have a freind.','Writing survives before delayed refresh');flush();
act('wdnext');const issue=V.wd.issues.find(x=>x.k==='spell');assert(issue);const fixes=L.wde().suggest(issue.w),idx=fixes.indexOf('friend');assert(idx>=0);act('wdfix',String(idx));
assert.equal(profile().docs[0].text,'I have a friend.');assert.equal(profile().sq.words.friend.miss,1);assert(profile().sq.words.friend.ctx.includes('___'));
const xp=profile().xp;act('wdfinish');assert(profile().docs[0].fin);assert.equal(profile().xp,xp+10);dismiss();act('wdfinok');act('wdfinish');assert.equal(profile().xp,xp+10,'Same document cannot earn repeated XP');dismiss();act('wdfinok');
input('wdtext','A story saved before leaving.');const old=V.wd;home();act('switch');act('pick',profiles[1].id);act('subj','write');assert.equal((profile().docs||[]).length,0);flush();assert.equal((profile().docs||[]).length,0,'Delayed refresh cannot copy writing');
act('wdnew','blank');const own2=V.wd;V.wd=old;input('wdtext','Wrong owner');flush();assert.equal(profile().docs[0].text,'');V.wd=own2;
home();act('switch');act('pick',profiles[0].id);act('resume');assert.equal(V.s,'wd');assert.equal(V.wd.id,firstId);assert.equal(document.getElementById('wdtext').value,'A story saved before leaving.');
act('back');act('wdnew','wt3');input('wdtext','Dear Dawn,\n\nThank you for the book. I love it. I will read it today.\n\nSincerely,\nJohn');flush();assert.equal(L.wdIssues(profile().docs[0]).filter(x=>x.k==='spell'||x.k==='cap').length,0);const before=profile().xp;act('wdfinish');assert.equal(profile().xp,before+25);assert.equal(profile().done.wt3,3);dismiss();act('wdhome');
act('wdnew','wt3');input('wdtext','Dear Dawn,\n\nThank you for the book. I love it. I will read it today.\n\nSincerely,\nJohn');flush();act('wdfinish');assert.equal(profile().xp,before+30,'New piece of same template earns 5 XP');dismiss();assert(L.badgeState(profile()).find(x=>x.badge.id==='writer').earned);act('wdhome');
function solve(){const S=V.sq,it=S.list[S.i];if(S.phase==='look')act('sqkey','ENTER');
 if(S.cur==='fix')act('sqpick',String(S.opts.indexOf(it.w)));
 else if(S.cur==='miss')S.blanks.map(i=>it.w[i].toLowerCase()).forEach(ch=>act('sqkey',ch));
 else if(S.cur==='scr'){for(const ch of it.w.toLowerCase()){const i=S.tiles.findIndex((v,i)=>v===ch&&!S.used.includes(i));act('sqtile',String(i))}}
 else if(S.cur==='fire')Array.from(new Set(it.w.toLowerCase().replace(/[^a-z]/g,''))).forEach(ch=>act('sqkey',ch));
 else{for(const ch of it.w.toLowerCase())act('sqkey',ch);act('sqkey','ENTER')}
 assert.equal(S.phase,'right',S.cur+' '+it.w);act('sqkey','ENTER');dismiss();}
act('sqopen');const roundXP=profile().xp;
for(const mode of ['fix','miss','scr','fire','spell','quest']){act('sqmode',mode);let guard=0;while(V.sq.phase!=='end'){assert(++guard<12);solve()}assert.equal(V.sq.res.length,V.sq.list.length);assert(V.sq.res.every(x=>x.ok));if(mode!=='quest')act('sqmenu')}
assert.equal(profile().sq.rounds,6);assert.equal(profile().xp,roundXP+30,'Quest XP capped at 30 per day');assert(L.badgeState(profile()).find(x=>x.badge.id==='questor').earned);
assert.equal(profile().sq.words.friend.box,1,'Repeated same-day practice advances a word only once');
const endXP=profile().xp;L.sqClick('sqkey','ENTER');assert.equal(profile().xp,endXP);
act('back');assert.equal(V.s,'path');act('back');assert.equal(V.s,'home');act('subj','auto');act('cbopen');assert(document.querySelector('#cb-diagram svg'),'Carburetor retained alongside writing');
for(const ext of ['writing-desk.js','writing-desk.css'])assert(html.includes(fs.readFileSync('extensions/'+ext,'utf8').trim()));
assert(!html.includes('<<<<<<<'));assert.equal(L.SUBJECTS.length,10);assert.equal(L.allWorkshopBadges().length,53);
// Restore keeps new writing/spelling data, established XP and large writing collections.
const backup=data(),restored=backup.profiles[0],savedXP=restored.xp;
while(restored.docs.length<301)restored.docs.push({id:'kept'+restored.docs.length,tpl:'blank',title:'Kept',text:'A kept page.',created:1,updated:1,fin:false,ign:{}});
V.restorePending=backup;const restore=document.createElement('button');restore.dataset.act='restoreconfirm';document.body.appendChild(restore);restore.dispatchEvent(new window.Event('click',{bubbles:true}));
act('pick',restored.id);act('subj','write');assert.equal(profile().xp,savedXP);assert.equal(profile().sq.rounds,6);act('wdnew','blank');assert.equal(profile().docs.length,302,'New writing never silently discards older documents');
console.log('Writing Desk: delegated entry/edit/fix, immediate saves, profile ownership/resume, template and document XP guards, writing/spelling badges, all six quest choices, same-day repetition/XP cap, carburetor coexistence and embedded sources pass.');
