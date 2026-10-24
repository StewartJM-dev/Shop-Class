/* BEGIN FUEL INJECTION LAB */
var IJ_STEPS=[
 {title:'Change the pulse width',task:'Move pulse width to 2 ms or less, then to 6 ms or more. Watch the command bar and the fuel-per-event estimate.',why:'Pulse width is how long the ECU commands an injector on. With this same healthy injector and pressure, a longer effective opening delivers more fuel.'},
 {title:'Open, then close',task:'Press Start one pulse, then End the pulse. Watch the needle lift and seat. The spray stops when the needle closes.',why:'The command, injector movement and fuel supply are different parts of delivery. This slow demonstration shows one event; it is not real engine speed.'},
 {title:'Port or direct?',task:'Select Port, then Direct. Find the highlighted injector and choose where a direct injector delivers fuel.',why:'Port injection sprays into the intake port, before the intake valve. Direct injection sprays into the cylinder and uses a separate high-pressure fuel stage.'},
 {title:'Speed is not pulse width',task:'Set engine speed to 900 RPM or less, then 3000 RPM or more. Keep pulse width at 3 ms. Which quantity changes?',why:'This model commands one pulse per cylinder every four-stroke cycle. Higher RPM means more events per second; it does not automatically lengthen each pulse.'},
 {title:'Command without fuel',task:'Switch Fuel supply to Empty rail, start a pulse, then restore the supply and end the pulse. Compare delivery with the same command.',why:'A scan-tool command or electrical pulse alone does not prove fuel reaches the cylinder. Pressure, the injector and its circuit also matter.'},
 {title:'Same command, different delivery',task:'Restrict the nozzle and start a pulse. Clear the restriction and end the pulse. Choose the explanation supported by that comparison.',why:'A flow restriction can reduce delivery even when the ECU command is unchanged. Real diagnosis needs evidence; this model is not an injector flow test.'}
];
function ijClamp(n,a,b,f){n=Number(n);return Number.isFinite(n)?Math.max(a,Math.min(b,n)):f}
function ijFresh(){return {ownerId:db.active,i:0,type:'port',pw:3,rpm:1200,pressure:100,supply:true,command:true,restricted:false,open:false,seen:{},fin:false,xp:0,msg:''}}
function ijModel(S){
 var pw=ijClamp(S.pw,0,10,3),rpm=ijClamp(S.rpm,600,6000,1200),cycle=120000/rpm,cmd=!!S.command&&pw>0,effective=cmd?Math.max(0,Math.min(pw,cycle)-.6):0;
 var pressure=S.supply?ijClamp(S.pressure,0,100,100):0,fuel=effective/2.4*Math.sqrt(pressure/100)*(S.restricted?.25:1),spray=!!S.open&&fuel>0;
 return {pw:pw,rpm:rpm,cycle:cycle,events:rpm/120,duty:cmd?Math.min(pw,cycle)/cycle*100:0,fuel:fuel,total:fuel*rpm/120,pressure:pressure,command:cmd,needle:!!S.open&&effective>0,spray:spray};
}
function ijSave(S){var p=S&&db.profiles.find(function(q){return q.id===S.ownerId});if(!p)return;p.drafts=p.drafts||{};p.drafts['inj:inj1']=JSON.parse(JSON.stringify(S));if(!S.fin)p.resume={subj:'auto',kind:'inj',id:'inj1',title:'Fuel Injection Lab: pulse & spray'};else if(p.resume&&p.resume.kind==='inj')delete p.resume;save()}
function ijOpen(){
 var p=me();if(!p)return;var d=p.drafts&&p.drafts['inj:inj1'];v.ij=d&&!d.fin?Object.assign(ijFresh(),JSON.parse(JSON.stringify(d)),{ownerId:db.active,open:false}):ijFresh();var S=v.ij;
 S.i=Math.floor(ijClamp(S.i,0,IJ_STEPS.length-1,0));S.pw=ijClamp(S.pw,0,10,3);S.rpm=ijClamp(S.rpm,600,6000,1200);S.pressure=ijClamp(S.pressure,0,100,100);S.type=S.type==='direct'?'direct':'port';S.seen=S.seen&&typeof S.seen==='object'?S.seen:{};
 ['supply','command'].forEach(function(k){S[k]=S[k]!==false});S.restricted=!!S.restricted;v.s='inj';v.subj='auto';p.lastSubj='auto';ijSave(S);
}
function ijObserve(S){
 var M=ijModel(S);
 if(S.i===0&&S.command&&S.supply&&!S.restricted&&S.pressure===100){if(S.pw<=2)S.seen.short=true;if(S.pw>=6)S.seen.long=true}
 if(S.i===1){if(M.needle&&M.spray)S.seen.open=true;if(!S.open&&S.seen.open)S.seen.closed=true}
 if(S.i===2)S.seen[S.type]=true;
 if(S.i===3&&S.pw===3){if(S.rpm<=900)S.seen.slow=true;if(S.rpm>=3000)S.seen.fast=true}
 if(S.i===4&&M.command){if(!S.supply&&S.open&&M.fuel===0)S.seen.empty=true;if(S.supply&&S.open&&S.seen.empty&&M.spray)S.seen.supplied=true}
 if(S.i===5&&M.command&&S.supply){if(S.restricted&&M.spray)S.seen.restricted=true;if(!S.restricted&&S.open&&S.seen.restricted&&M.spray)S.seen.cleared=true}
}
function ijReady(S){var a=S.seen;return [a.short&&a.long,a.open&&a.closed,a.port&&a.direct&&a.location,a.slow&&a.fast&&a.speed,a.empty&&a.supplied&&a.proof&&!S.open&&S.supply,a.restricted&&a.cleared&&a.flow&&!S.open&&!S.restricted][S.i]}
function ijPrepare(S){S.pw=3;S.rpm=1200;S.pressure=100;S.type='port';S.supply=true;S.command=true;S.restricted=false;S.open=false;S.msg='';ijObserve(S)}
function ijBtn(a,label,id,disabled){return '<button class="btn small" data-act="ij'+a+'"'+(id?' data-id="'+id+'"':'')+(disabled?' disabled':'')+'>'+label+'</button>'}
function ijSvg(S){
 var M=ijModel(S),direct=S.type==='direct',needle=M.needle,ix=direct?540:218,iy=direct?142:125;
 function text(x,y,s,n,col){return '<text x="'+x+'" y="'+y+'" fill="'+(col||'#d3e7e1')+'" font-family="system-ui" font-size="'+(n||14)+'">'+s+'</text>'}
 var h='<svg viewBox="0 0 800 510" role="img" aria-label="'+(direct?'Direct injector sprays inside the cylinder. A low-pressure supply feeds a high-pressure pump and rail.':'Port injector sprays into the intake port before the intake valve.')+' '+(needle?'Needle lifted.':'Needle seated.')+' '+(M.spray?'Fuel spray present.':'No spray.')+'"><defs><linearGradient id="ijSteel" x2="0" y2="1"><stop stop-color="#c5d9dc"/><stop offset="1" stop-color="#5e8088"/></linearGradient><linearGradient id="ijBrass"><stop stop-color="#f9da88"/><stop offset="1" stop-color="#a0793f"/></linearGradient></defs><rect width="800" height="510" rx="20" fill="#102e37"/>';
 h+=text(28,32,'FUEL LAB / '+(direct?'DIRECT INJECTION':'PORT INJECTION'),12,'#e2c488')+text(28,64,direct?'Fuel goes into the cylinder.':'Fuel meets air before the valve.',25,'#fff0c9');
 // Fixed engine geometry. Fuel location changes; pressure scales are separately normalized.
 h+='<path d="M35 187 H279 Q309 187 348 230" fill="none" stroke="#4a7480" stroke-width="76"/><path d="M35 187 H279 Q309 187 348 230" fill="none" stroke="#183d48" stroke-width="58"/>';
 h+='<path d="M38 187 H176" stroke="#77d8e6" stroke-width="3" stroke-dasharray="10 8" class="ij-air"/><path d="m170 180 13 7-13 7" fill="none" stroke="#77d8e6" stroke-width="3"/>';
 h+='<path d="M334 218 V419 H660 V218 L603 160 H390 Z" fill="#1c4550" stroke="url(#ijSteel)" stroke-width="14"/><rect x="345" y="338" width="304" height="65" rx="6" fill="url(#ijSteel)"/><path d="M349 350 H645 M349 362 H645" stroke="#23464d" stroke-width="4"/><rect x="481" y="403" width="35" height="39" fill="#87a5a8"/>';
 h+='<path d="M382 169 L358 215 M344 207 L374 224" stroke="#d4dfd5" stroke-width="9" stroke-linecap="round"/><path d="M615 181 L634 218 M619 228 L649 209" stroke="#8aa5a9" stroke-width="8" stroke-linecap="round"/>';
 h+=text(45,248,'AIR IN',12,'#7ddae7')+text(294,285,'Intake valve',12)+text(462,320,'CYLINDER',13)+text(469,389,'PISTON',13,'#15343c');
 // Tank, high pressure stage and rail are schematic, not a service routing diagram.
 h+='<rect x="37" y="106" width="90" height="39" rx="9" fill="#275b5e" stroke="#c4a56a"/>'+text(49,131,'Tank pump',12);
 if(direct){h+='<path d="M127 125 H308 M392 125 H540 V142" fill="none" stroke="#edbd67" stroke-width="5"/><rect x="308" y="105" width="84" height="40" rx="8" fill="#705c3d" stroke="#edbd67"/>'+text(313,130,'HP pump',12,'#fff1c9')+text(419,111,'High-pressure rail',11,'#f1d48e')}
 else h+='<path d="M127 125 H218" fill="none" stroke="#edbd67" stroke-width="5"/>'+text(148,111,'Fuel rail',12,'#f1d48e');
 h+='<g transform="translate('+ix+' '+iy+') rotate('+(direct?18:-28)+')"><rect x="-16" y="-7" width="32" height="60" rx="7" fill="url(#ijBrass)" stroke="#e6e9c9"/><path d="M-11 42 H11 L7 60 H-7 Z" fill="#91aeb3"/><path d="M0 6 V'+(needle?'42':'57')+'" stroke="#ffe9b0" stroke-width="5"/><circle cx="0" cy="55" r="4" fill="'+(needle?'#6cdbc2':'#876b45')+'"/>';
 if(M.spray)h+='<path d="'+(direct?'M0 62 L-28 110 M0 62 L-10 117 M0 62 L11 111 M0 62 L27 103':'M0 62 L-28 92 M0 62 L-10 97 M0 62 L11 91 M0 62 L27 83')+'" stroke="#ffd474" stroke-width="3" stroke-dasharray="3 5" class="ij-spray"/>';
 h+='</g>'+text(direct?581:190,direct?157:284,direct?'Injector':'Port injector',13,'#ffe3a0');
 h+='<rect x="37" y="318" width="225" height="113" rx="13" fill="#153c42" stroke="#537b80"/>'+text(53,343,'COMMAND / DELIVERY',11,'#e2c488')+text(53,370,'ECU: '+(M.command?'pulse available':'no pulse'),15)+text(53,394,'Needle: '+(needle?'lifted':'seated'),15)+text(53,417,'Spray: '+(M.spray?'present':'none'),15,M.spray?'#ffdc86':'#adc6bd');
 h+=text(330,466,direct?'Compare location, not equal pressure or injector size.':'Fuel passes the open intake valve with the air.',12)+text(29,491,'SLOW EVENT DEMONSTRATION · illustrative geometry and flow',11,'#9fbbb7');
 return h+'</svg>';
}
function ijPulseSvg(S){var M=ijModel(S),start=90,end=90+M.pw*24,w=M.command?end:start;
 return '<svg viewBox="0 0 400 112" role="img" aria-label="ECU command, '+(M.command?M.pw+' millisecond pulse':'no pulse')+'. This is an on-off timing bar, not measured injector voltage."><rect width="400" height="112" rx="10" fill="#102e37"/><text x="16" y="23" fill="#c8dfd6" font-size="11" font-family="system-ui">ECU COMMAND / NOT A VOLTAGE TRACE</text><path d="M35 85 H365" stroke="#51777e"/><path d="M35 78 H'+start+(M.command?' V42 H'+w+' V78':'')+' H365" fill="none" stroke="#f5cf7e" stroke-width="3"/><text x="91" y="102" fill="#d8e9dc" font-size="11" font-family="system-ui">'+(M.command?M.pw.toFixed(1)+' ms commanded ON':'Command off')+'</text></svg>';
}
function ijStats(S){var M=ijModel(S);return '<div class="ij-readouts"><div><span>Fuel / event</span><b>'+M.fuel.toFixed(2)+'</b><small>relative units</small></div><div><span>Events / second</span><b>'+M.events.toFixed(1)+'</b><small>one cylinder</small></div><div><span>Command duty</span><b>'+M.duty.toFixed(1)+'%</b><small>one pulse / cycle</small></div></div><p class="ij-mini">At this setting: '+M.total.toFixed(1)+' relative fuel units / second per cylinder. Fuel / event is an estimate for a full event, even while the demonstration needle is closed.</p><p class="ij-status">'+(M.needle?(M.spray?'Needle open · spray present.':'Needle open · no fuel pressure, so no spray.'):S.open&&M.command?'Command too short to open the needle in this model.':'Needle closed · no spray now.')+'</p>'}
function ijAnswers(S){
 if(S.i===2)return '<p>Where does direct injection spray?</p>'+ijBtn('answer','Inside the cylinder','cylinder')+ijBtn('answer','Before the intake valve','port');
 if(S.i===3)return '<p>At the same 3 ms pulse, what did higher RPM change?</p>'+ijBtn('answer','More events each second; same fuel per event','events')+ijBtn('answer','A longer pulse every time','duration');
 if(S.i===4)return '<p>What does a pulse command prove?</p>'+ijBtn('answer','A command exists; delivery needs more evidence','evidence')+ijBtn('answer','Fuel must be reaching the cylinder','guarantee');
 if(S.i===5)return '<p>Why did the restricted nozzle deliver less?</p>'+ijBtn('answer','The fuel path changed while the command stayed the same','restriction')+ijBtn('answer','Every lean condition means a failed injector','guess');return '';
}
function vIj(){var S=v.ij;if(!S||S.ownerId!==db.active)return '<div class="wrap"><p>Open Fuel Injection Lab from Auto Mechanics.</p></div>';var step=IJ_STEPS[S.i];
 var h='<div class="wrap ij"><div class="pathhead"><button class="back" data-act="back" aria-label="Back to Auto Mechanics">'+ICONS.back+'</button><div><h1>Fuel Injection Lab</h1><p>Pulse. Needle. Pressure. Follow the fuel.</p></div></div><section class="ij-guide"><span class="eyebrow">'+(S.fin?'DISCOVERIES COMPLETE':'DISCOVERY '+(S.i+1)+' / '+IJ_STEPS.length)+'</span><h2>'+esc(step.title)+'</h2><p>'+esc(step.task)+'</p><small>'+esc(step.why)+'</small></section><div class="ij-grid"><section><div id="ij-diagram">'+ijSvg(S)+'</div><div class="ij-type" role="group" aria-label="Injection system">'+ijBtn('type','Port injection','port')+ijBtn('type','Direct injection','direct')+'</div><p id="ij-location" class="ij-note">'+(S.type==='direct'?'DIRECT: injector opens into the cylinder. The high-pressure pump raises rail pressure above the tank-pump supply.':'PORT: injector sprays before the intake valve. Fuel and air enter through the valve.')+'</p><div id="ij-wave">'+ijPulseSvg(S)+'</div><div class="ij-event">'+ijBtn('pulse',S.open?'End the pulse':'Start one pulse')+'<small>Manual slow motion. Change pulse width above zero to open the needle.</small></div></section><section class="ij-console"><h2>Experiment controls</h2>';
 [['pw','Pulse width',0,10,.5,'ms'],['rpm','Engine speed',600,6000,300,'RPM'],['pressure','Fuel-pressure reference',0,100,5,'%']].forEach(function(x){h+='<label for="ij-'+x[0]+'">'+x[1]+'<output id="ij-'+x[0]+'-value">'+S[x[0]]+' '+x[5]+'</output></label><input id="ij-'+x[0]+'" type="range" data-ij-control="'+x[0]+'" min="'+x[2]+'" max="'+x[3]+'" step="'+x[4]+'" value="'+S[x[0]]+'">'});
 h+='<p class="ij-mini">100% is each system’s own reference pressure. Port and direct pressures are not equal. These controls do not tune a real engine.</p><div id="ij-stats">'+ijStats(S)+'</div><div class="ij-switches">'+ijBtn('supply','Fuel supply: '+(S.supply?'normal':'empty rail'))+ijBtn('command','ECU command: '+(S.command?'on':'off'))+ijBtn('restrict',S.restricted?'Clear nozzle restriction':'Restrict the nozzle')+'</div></section></div><section class="ij-reflect">'+ijAnswers(S)+'<p id="ij-message" role="status" aria-live="polite">'+esc(S.msg)+'</p>'+ijBtn('next',S.i===IJ_STEPS.length-1?'Finish discoveries':'Next discovery',null,S.fin)+'</section>';
 if(S.fin)h+='<section class="ij-complete"><h2>Fuel lab complete · '+S.xp+' XP</h2><p>You separated the command from delivery. Use that reasoning on a no-start case.</p><button class="btn" data-act="nsopen">Open Case 02 →</button> '+ijBtn('done','Back to Auto Mechanics')+'</section>';
 h+='<details class="ij-notes"><summary>What this model leaves out</summary><p>This is a gasoline teaching model with one injection event per cylinder every 720 crank degrees. Real strategies can use multiple events. Flow scales use a fixed 0.6 ms illustrative opening delay and pressure relation; they are not calibrated injector data, air/fuel ratios, fuel trims, voltage waveforms or real engine predictions. Temperature, driver electronics, changing cylinder pressure and valve timing are not simulated.</p><p><a href="https://www.bosch-mobility.com/en/solutions/powertrain/gasoline/gasoline-port-fuel-injection/" target="_blank" rel="noopener">Bosch · port injection</a> · <a href="https://www.bosch-mobility.com/en/solutions/powertrain/gasoline/gasoline-direct-injection/" target="_blank" rel="noopener">Bosch · direct injection</a> · <a href="https://www.snapon.com/EN/US/Diagnostics/News-Center/Technical-Focus-Archive/Fuel-Injector-Current-and-Voltage-Tests" target="_blank" rel="noopener">Snap-on · injector commands and movement</a></p></details><p>'+ijBtn('restart','Restart discoveries')+'</p></div>';return h;
}
function ijRefresh(){var S=v.ij;if(v.s!=='inj'||!S||S.ownerId!==db.active)return;['pw','rpm','pressure'].forEach(function(k){var el=document.getElementById('ij-'+k+'-value');if(el)el.textContent=S[k]+(k==='pw'?' ms':k==='rpm'?' RPM':' %')});[['ij-diagram',ijSvg(S)],['ij-wave',ijPulseSvg(S)],['ij-stats',ijStats(S)]].forEach(function(a){var e=document.getElementById(a[0]);if(e)e.innerHTML=a[1]});var msg=document.getElementById('ij-message');if(msg)msg.textContent=S.msg}
function ijClick(a,id){
 if(a==='ijopen'){ijOpen();return true}var S=v.ij;if(!S||v.s!=='inj'||S.ownerId!==db.active)return false;
 if(a==='ijtype'&&(id==='port'||id==='direct')){S.type=id;S.open=false}
 else if(a==='ijpulse')S.open=!S.open;
 else if(a==='ijsupply')S.supply=!S.supply;
 else if(a==='ijcommand'){S.command=!S.command;S.open=false}
 else if(a==='ijrestrict')S.restricted=!S.restricted;
 else if(a==='ijanswer'){
  if(S.i===2&&S.seen.port&&S.seen.direct&&id==='cylinder')S.seen.location=true;
  else if(S.i===3&&S.seen.slow&&S.seen.fast&&id==='events')S.seen.speed=true;
  else if(S.i===4&&S.seen.empty&&S.seen.supplied&&id==='evidence')S.seen.proof=true;
  else if(S.i===5&&S.seen.restricted&&S.seen.cleared&&id==='restriction')S.seen.flow=true;
  else S.msg='Try the comparison first, then choose the explanation that matches what changed.';
 }
 else if(a==='ijnext'&&!S.fin){if(!ijReady(S))S.msg='Keep exploring: '+IJ_STEPS[S.i].task;else if(S.i===IJ_STEPS.length-1){S.fin=true;S.xp=me().done.inj1?0:awardLab('inj1');S.msg='You followed the evidence from command to fuel delivery.'}else{S.i++;ijPrepare(S)}}
 else if(a==='ijrestart'){v.ij=ijFresh();ijSave(v.ij);return true}
 else if(a==='ijdone')v.s='path';
 ijObserve(S);ijSave(S);return true;
}
document.addEventListener('input',function(e){var el=e.target,key=el.getAttribute&&el.getAttribute('data-ij-control'),S=v.ij;if(v.s!=='inj'||!S||S.ownerId!==db.active||['pw','rpm','pressure'].indexOf(key)<0||!Number.isFinite(Number(el.value)))return;S[key]=key==='pw'?ijClamp(el.value,0,10,3):key==='rpm'?ijClamp(el.value,600,6000,1200):ijClamp(el.value,0,100,100);S.msg='';ijObserve(S);ijSave(S);ijRefresh()});
var ijCheckpointBefore=checkpoint;checkpoint=function(){if(v.s==='inj'&&v.ij&&v.ij.ownerId===db.active){ijSave(v.ij);return}ijCheckpointBefore()};
var ijResumeBefore=resumeWorkshop;resumeWorkshop=function(){var r=me()&&me().resume;if(r&&r.kind==='inj'){ijOpen();return}ijResumeBefore()};
var ijAuto=SUBJECTS.find(function(s){return s.id==='auto'});ijAuto.lessons.splice(ijAuto.lessons.findIndex(function(l){return l.id==='fuel3'})+1,0,{id:'inj1',title:'Fuel Injection Lab: pulse & spray',unit:'Carburetors and fuel injection',kind:'inj',open:true});
if(window.ShopLab)Object.assign(window.ShopLab,{ijOpen:ijOpen,ijFresh:ijFresh,ijModel:ijModel,ijClick:ijClick,ijSave:ijSave,ijReady:ijReady,ijObserve:ijObserve,ijSvg:ijSvg,ijPulseSvg:ijPulseSvg,IJ_STEPS:IJ_STEPS,vIj:vIj,checkpoint:checkpoint,resumeWorkshop:resumeWorkshop});
/* END FUEL INJECTION LAB */
