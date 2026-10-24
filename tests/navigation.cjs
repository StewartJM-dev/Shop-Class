const fs=require('fs'),vm=require('vm'),assert=require('assert'),{parseHTML,DOMParser}=require('linkedom');
const html=fs.readFileSync('index.html','utf8');
for(const kind of ['new','game-object','web-object','numbered-object','unsupported-shape']){
 const {window,document}=parseHTML(html),store={},timers=[];
 const profile={id:'ptest',name:'Alpha',color:'#2467D6',xp:125,streak:3,last:'',done:{e1:3,pl1:3},day:{d:'',xp:0}};
 const project={name:'Kept project',code:'<h1>Kept</h1>',cfg:{},mode:'js'};
 if(kind==='game-object')profile.studio=project;
 if(kind==='web-object')profile.webStudio=project;
 if(kind==='numbered-object')profile.studio={'2':project};
 if(kind==='unsupported-shape')profile.studio='legacy source';
 store['shopclass.v1']=JSON.stringify({schema:2,active:profile.id,profiles:[profile]});
 window.scrollTo=()=>{};window.matchMedia=()=>({matches:false});
 const c={window,document,DOMParser,console,Blob,URL,localStorage:{getItem:k=>store[k],setItem:(k,v)=>store[k]=v},setInterval:(f,ms)=>(timers.push({f,ms}),timers.length),clearInterval(){},setTimeout(){},clearTimeout(){},requestAnimationFrame(){}};
 vm.createContext(c);vm.runInContext(document.querySelector('script').textContent,c);
 const S=window.ShopLab;
 function tap(selector){const el=document.querySelector(selector);assert(el,selector);assert(!el.hasAttribute('disabled'),'enabled: '+selector);el.dispatchEvent(new window.Event('click',{bubbles:true}));}
 for(const s of S.SUBJECTS){tap('[data-act="subj"][data-id="'+s.id+'"]');assert.equal(S.state().s,'path');assert(document.querySelector('.path'));tap('[data-act="tab"][data-id="home"]');assert(document.querySelector('.workbench'));tap('[data-act="tab"][data-id="crew"]');assert.equal(S.state().s,'crew');tap('[data-act="tab"][data-id="home"]');}
 if(kind==='new'){
  tap('[data-act="subj"][data-id="auto"]');
  let unit=document.querySelector('.unitbtn'),name=unit.dataset.id,was=unit.getAttribute('aria-expanded');
  tap('[data-act="unitfold"][data-id="'+name+'"]');
  assert.notEqual(document.querySelector('[data-act="unitfold"][data-id="'+name+'"]').getAttribute('aria-expanded'),was);
  assert.equal(JSON.parse(store['shopclass.v1']).profiles[0].fold['auto|'+name],was==='true');
  assert(document.querySelector('.workshop-path-cover'),'Continue button preserves cover insertion');
  tap('.pathcont [data-act]');assert.equal(S.state().s,'brief');
  tap('[data-act="back"]');tap('[data-act="ncopen"]');assert.equal(S.state().s,'nc');
  tap('[data-act="nckey"]');assert(S.state().nc.key);
  tap('[data-act="back"]');assert.equal(S.state().s,'path');
  tap('[data-act="tab"][data-id="home"]');
 }
 const saved=JSON.parse(store['shopclass.v1']).profiles[0];assert.equal(saved.xp,125);assert.equal(saved.done.e1,3);assert.equal(saved.done.pl1,3);
 if(kind==='game-object'){assert.deepEqual(saved.legacyStudios.studio,project);assert.deepEqual(saved.studio[0],project)}
 if(kind==='web-object'){assert.deepEqual(saved.legacyStudios.webStudio,project);assert.deepEqual(saved.webStudio[0],project)}
 if(kind==='numbered-object'){assert.deepEqual(saved.studio[2],project);assert.equal(saved.studio[0],null)}
 if(kind==='unsupported-shape'){assert.equal(saved.legacyStudios.studio,'legacy source');assert(Array.isArray(saved.studio))}
 // Restore exercises the same compatibility repair without clearing saved progress.
 S.state().restorePending={schema:2,active:null,profiles:[{...profile,webStudio:project}]};
 const action=document.createElement('button');action.dataset.act='restoreconfirm';document.body.appendChild(action);action.dispatchEvent(new window.Event('click',{bubbles:true}));
 const restored=JSON.parse(store['shopclass.v1']).profiles[0];assert(Array.isArray(restored.webStudio));assert.equal(restored.webStudio[0].name,'Kept project');assert.equal(restored.xp,125);
 console.log('Full-document startup, seven workshops, Learn/Crew and preserved progress pass: '+kind);
}


