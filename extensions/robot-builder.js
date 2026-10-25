/* BEGIN ROBOT BUILDER */
var GM_LOOK_EMOJI={person:'🙂',puppy:'🐶',dinosaur:'🦖',robot:'🤖',kitten:'🐱'};
var GM_LOOK_NATURAL={puppy:'#C8894B',dinosaur:'#3FA34D',robot:'#9AA5B1',kitten:'#F08A24'};
function gmBodyColor(P,look){
 var col=GMCOL[P.color]||(/^#[0-9a-f]{3,6}$/i.test(P.color)?P.color:null);
 if(look!=='person'&&(!col||P.color==='blue')){
  if(look==='robot'){var rb=P.robot;if(rb&&rb.color&&GMCOL[rb.color])return GMCOL[rb.color]}
  return GM_LOOK_NATURAL[look];
 }
 return col||GMCOL.blue;
}
function gmBody(c,P){
 var look=GMLOOKS.indexOf(P.look)>=0?P.look:'person',x=P.x,y=P.y,r=P.r,col=gmBodyColor(P,look),dark='rgba(0,0,0,.45)';
 function eyes(dx,dy,s){c.fillStyle='#fff';c.beginPath();c.arc(x-dx,y+dy,2.6*s,0,6.3);c.arc(x+dx,y+dy,2.6*s,0,6.3);c.fill();c.fillStyle='#111';c.beginPath();c.arc(x-dx,y+dy,1.2*s,0,6.3);c.arc(x+dx,y+dy,1.2*s,0,6.3);c.fill()}
 c.lineWidth=2;c.strokeStyle=dark;
 if(look==='person'){c.fillStyle=col;c.beginPath();c.arc(x,y,r,0,6.3);c.fill();c.stroke();eyes(4,-1,1);return}
 if(look==='puppy'){
  c.fillStyle='rgba(0,0,0,.35)';c.beginPath();c.ellipse(x-r+1,y-1,3.6,7,0.35,0,6.3);c.ellipse(x+r-1,y-1,3.6,7,-0.35,0,6.3);c.fill();
  c.fillStyle=col;c.beginPath();c.arc(x,y,r,0,6.3);c.fill();c.stroke();
  c.fillStyle='rgba(0,0,0,.28)';c.beginPath();c.ellipse(x-r+1.5,y,3.2,6.5,0.35,0,6.3);c.ellipse(x+r-1.5,y,3.2,6.5,-0.35,0,6.3);c.fill();
  c.fillStyle='#F5E6D3';c.beginPath();c.ellipse(x,y+4,5.5,4,0,0,6.3);c.fill();
  c.fillStyle='#E8586B';c.beginPath();c.ellipse(x+1,y+8.2,1.8,2.2,0,0,6.3);c.fill();
  c.fillStyle='#111';c.beginPath();c.ellipse(x,y+2.2,2.2,1.6,0,0,6.3);c.fill();
  eyes(4,-3,1);return}
 if(look==='kitten'){
  c.fillStyle=col;c.beginPath();c.moveTo(x-r+1,y-3);c.lineTo(x-r+2,y-r-5);c.lineTo(x-3,y-r+1);c.closePath();c.moveTo(x+r-1,y-3);c.lineTo(x+r-2,y-r-5);c.lineTo(x+3,y-r+1);c.closePath();c.fill();c.stroke();
  c.beginPath();c.arc(x,y,r,0,6.3);c.fill();c.stroke();
  c.fillStyle='#F7A8B8';c.beginPath();c.moveTo(x-1.6,y+2);c.lineTo(x+1.6,y+2);c.lineTo(x,y+3.6);c.closePath();c.fill();
  c.strokeStyle='rgba(255,255,255,.85)';c.lineWidth=1;c.beginPath();c.moveTo(x-3,y+3);c.lineTo(x-10,y+1.5);c.moveTo(x-3,y+4);c.lineTo(x-10,y+5);c.moveTo(x+3,y+3);c.lineTo(x+10,y+1.5);c.moveTo(x+3,y+4);c.lineTo(x+10,y+5);c.stroke();
  eyes(4,-2,1);return}
 if(look==='dinosaur'){
  c.fillStyle='#E9C46A';for(var i=-2;i<=2;i++){c.beginPath();var sx=x+i*4.2,sy=y-r+Math.abs(i)*1.3;c.moveTo(sx-2.6,sy+2.5);c.lineTo(sx,sy-4.5);c.lineTo(sx+2.6,sy+2.5);c.closePath();c.fill()}
  c.fillStyle=col;c.beginPath();c.moveTo(x+r-2,y+3);c.quadraticCurveTo(x+r+9,y+7,x+r+11,y+1);c.quadraticCurveTo(x+r+6,y+9,x+r-3,y+8);c.closePath();c.fill();c.stroke();
  c.beginPath();c.ellipse(x,y,r+1.5,r,0,0,6.3);c.fill();c.stroke();
  c.fillStyle='rgba(255,255,255,.25)';c.beginPath();c.ellipse(x-1,y+4,6,3.5,0,0,6.3);c.fill();
  c.strokeStyle='#1d3b1f';c.lineWidth=1.5;c.beginPath();c.moveTo(x-6,y+5);c.quadraticCurveTo(x,y+8.5,x+6,y+5);c.stroke();
  c.fillStyle='#fff';c.beginPath();c.moveTo(x-3.5,y+6.2);c.lineTo(x-2.5,y+8.2);c.lineTo(x-1.5,y+6.6);c.moveTo(x+1.5,y+6.6);c.lineTo(x+2.5,y+8.2);c.lineTo(x+3.5,y+6.2);c.fill();
  c.fillStyle='#1d3b1f';c.beginPath();c.arc(x-3,y+1.5,0.9,0,6.3);c.arc(x+3,y+1.5,0.9,0,6.3);c.fill();
  eyes(4.5,-3,1.15);return}
 if(look==='robot'){
  var d=P.robot||{},hx=x-r,hy=y-r;
  c.strokeStyle='#4C535C';c.lineWidth=1.5;c.beginPath();c.moveTo(x,hy);c.lineTo(x,hy-6);c.stroke();
  c.fillStyle=(d.sensors||[]).indexOf('light')>=0?'#FFD43B':'#E8586B';c.beginPath();c.arc(x,hy-7,2.2,0,6.3);c.fill();
  c.fillStyle=col;c.strokeStyle=dark;c.lineWidth=2;c.beginPath();if(c.roundRect)c.roundRect(hx,hy,r*2,r*2,4);else c.rect(hx,hy,r*2,r*2);c.fill();c.stroke();
  c.fillStyle='#13202E';c.fillRect(x-r+3,y-4,r*2-6,6);
  c.fillStyle='#7CFFB2';c.fillRect(x-6,y-3,3.5,4);c.fillRect(x+2.5,y-3,3.5,4);
  c.fillStyle='rgba(0,0,0,.35)';[[-r+2.5,-r+2.5],[r-2.5,-r+2.5],[-r+2.5,r-2.5],[r-2.5,r-2.5]].forEach(function(o){c.beginPath();c.arc(x+o[0],y+o[1],1,0,6.3);c.fill()});
  c.fillStyle='rgba(0,0,0,.35)';c.fillRect(x-4,y+5,8,1.6);
  if(d.tool==='claw'){c.strokeStyle='#4C535C';c.lineWidth=2;c.beginPath();c.moveTo(x+r,y+2);c.lineTo(x+r+5,y+2);c.moveTo(x+r+5,y-1);c.lineTo(x+r+8,y-2);c.moveTo(x+r+5,y+5);c.lineTo(x+r+8,y+6);c.stroke()}
  else if(d.tool==='magnet'){c.fillStyle='#D9463B';c.fillRect(x+r,y,5,4)}
  return}
}
/* ---- Robot Builder ---- */
var RBB_PARTS={
 body:{n:'Body',pick:1,o:[['box','Box frame','Strong, easy to build, and lots of room for parts.'],['round','Round shell','Slides off walls and corners instead of getting stuck.'],['tall','Tall tower','A higher view may clear obstacles, but a high center of mass can reduce stability.']]},
 move:{n:'Moves with',pick:1,o:[['wheels2','Two wheels and a caster','Like the Robot Lab rover. Quick on smooth floors and turns on the spot.'],['wheels4','Four wheels','Fast and steady. Handles bumpy dirt and gravel better than two wheels.'],['treads','Tank treads','Slow, but the long treads grip mud and crawl over small logs.'],['legs','Six legs','The slowest of all, but legs can step over rocks and logs, like a beetle.']]},
 power:{n:'Power',pick:1,o:[['aa','AA battery pack','Cheap and easy to swap. Model endurance: short patrol. Real runtime depends on capacity and load.'],['liion','Rechargeable lithium battery','Light and strong. Model endurance: longer patrol. Real runtime depends on capacity and load.'],['solar','Solar panel and small battery','Model: sunlight replenishes a small battery; low reserve. Stored energy can work at night, but this pack is undersized for the night mission.']]},
 sensors:{n:'Sensors (pick up to 3)',pick:3,o:[['distance','Distance sensor','Sends out a sound pulse and times the echo, like a bat, to measure how far away things are.'],['line','Line sensors','Point down at the floor to see a dark line and follow it.'],['bump','Bump switch','A button that clicks when the robot touches something.'],['light','Light sensor','This simple single-channel sensor measures brightness. Color sensors also exist.'],['camera','Camera','Sees colors and shapes, so the robot can recognize things.']]},
 tool:{n:'Tool',pick:1,o:[['none','No tool','Lighter and faster.'],['claw','Claw gripper','Two fingers that close to grab and carry objects.'],['magnet','Electromagnet','Attracts suitable ferromagnetic materials, including iron and many steels. It will not lift this aluminum can.'],['scoop','Scoop','Pushes and carries loose things like balls, dirt or pinecones.']]}
};
var RBB_DEF={name:'Rover',color:'orange',body:'box',move:'wheels2',power:'aa',sensors:[],tool:'none'};
function rbbDesign(){var p=me();if(!p||!p.robot||typeof p.robot!=='object'||Array.isArray(p.robot))return null;return rbbNormalize(p.robot)}
function rbbNormalize(d){d=d||{};function part(k){return RBB_PARTS[k].o.some(function(x){return x[0]===d[k]})?d[k]:RBB_DEF[k]}return {name:String(d.name||'Rover').slice(0,14),color:GMCOLORS.includes(d.color)?d.color:'orange',body:part("body"),move:part("move"),power:part("power"),sensors:Array.isArray(d.sensors)?d.sensors.filter(function(s){return RBB_PARTS.sensors.o.some(function(o){return o[0]===s})}).slice(0,3):[],tool:part("tool")}}
function rbbHas(d,s){return d.sensors.indexOf(s)>=0}
function rbbStats(d){
 var sp={wheels2:4,wheels4:4,treads:2,legs:1}[d.move]||2,rough={wheels2:1,wheels4:2,treads:4,legs:4}[d.move]||1;
 if(d.tool!=='none')sp=Math.max(1,sp-(d.tool==='scoop'?0:0));
 var bat={aa:1,liion:4,solar:3}[d.power]||1,smart=Math.min(4,d.sensors.length+(rbbHas(d,'camera')?1:0)),stab=({box:3,round:3,tall:1}[d.body]||2)+(d.move==='wheels4'||d.move==='treads'||d.move==='legs'?1:0);
 return [['Speed',sp],['Rough ground',rough],['Battery',bat],['Smarts',smart],['Stability',Math.min(4,stab)]];
}
var RBB_CH=[
 {id:'rbb1',t:'Hallway patrol',story:'Drive up and down the hallway all afternoon without crashing into walls.',test:function(d){return (rbbHas(d,'distance')||rbbHas(d,'bump'))?[true,'Your robot can sense the wall and turn before (or right when) it touches. The distance sensor works like a bat\'s echo.']:[false,'Your robot has no way to tell a wall is there, so it drives straight into it. Add a distance sensor or a bump switch.']}},
 {id:'rbb2',t:'Follow the trail',story:'A dark tape line leads across the floor to the ranger station. Follow it.',test:function(d){return rbbHas(d,'line')?[true,'Line sensors look down at the floor. When the left one sees the dark tape, the robot steers left, and the same on the right.']:[false,'Without sensors pointing at the floor, your robot cannot see the line at all. Add line sensors.']}},
 {id:'rbb3',t:'Cross the gravel lot',story:'Drive across the bumpy gravel parking lot to the troop trailer.',test:function(d){return d.move!=='wheels2'?[true,(d.move==='wheels4'?'Four wheels spread the weight and roll over the stones.':d.move==='treads'?'Treads spread the weight over a big area, so they do not sink.':'Legs step from stone to stone.')+' Your robot made it.']:[false,'The little caster wheel digs into the gravel and your robot gets stuck. Try four wheels, treads or legs.']}},
 {id:'rbb4',t:'Fetch the steel wrench',story:'Someone dropped a steel wrench under the workbench. Bring it back.',test:function(d){return d.tool==='claw'||d.tool==='magnet'?[true,d.tool==='magnet'?'This example wrench is magnetic steel, so the model electromagnet grabs it. Some steel alloys are not strongly attracted.':'The claw closes around the handle and carries it out.']:[false,d.tool==='scoop'?'The wrench keeps sliding off the scoop. Try a claw or a magnet.':'Your robot has no way to pick anything up. Give it a tool.']}},
 {id:'rbb5',t:'Recycle the soda can',story:'Pick up an empty aluminum soda can and bring it to the recycling bin.',test:function(d){return d.tool==='claw'||d.tool==='scoop'?[true,'Your '+(d.tool==='claw'?'claw grabs':'scoop carries')+' the can to the bin.']:[false,d.tool==='magnet'?'The magnet does nothing! Aluminum is not magnetic, just like gold in Dictionary Dunn\'s Magnet Treasure case. Try a claw or a scoop.':'Your robot needs a tool to carry the can.']}},
 {id:'rbb6',t:'Guard the campsite all day',story:'Patrol the campsite from breakfast to supper on a sunny Saturday.',test:function(d){return d.power!=='aa'?[true,d.power==='solar'?'The model assumes enough sunlight to maintain the small battery during this patrol.':'This model assumes the larger rechargeable pack plus a lunch recharge meets the patrol energy budget.']:[false,'This model assigns the AA pack too little energy for this patrol. Actual AA and lithium runtime depends on capacity and load.']}},
 {id:'rbb7',t:'Over the log',story:'A fallen log blocks the trail. Get over it without help.',test:function(d){return d.move==='legs'||d.move==='treads'?[true,d.move==='legs'?'Your robot lifts its legs and steps right over.':'The long treads tip up onto the log and crawl over it.']:[false,'Wheels bump into the log and spin. Treads or legs can climb it.']}},
 {id:'rbb8',t:'Sort the blocks',story:'Put the red blocks in one box and the blue blocks in the other.',test:function(d){var ok=rbbHas(d,'camera')&&(d.tool==='claw'||d.tool==='scoop');return ok?[true,'With suitable lighting and programmed recognition, the camera tells red from blue, and the '+d.tool+' moves each block to the right box.']:[false,!rbbHas(d,'camera')?(rbbHas(d,'light')?'This selected brightness sensor does not distinguish the block colors. In this model, choose a camera.':'Your robot needs a camera to see colors.'):'It can see the colors, but it needs a claw or scoop to move the blocks.']}},
 {id:'rbb9',t:'Night rescue',story:'Final challenge. Retrieve a backpack at a known waypoint on a floodlit woodland path after sunset.',test:function(d){
  var miss=[];if(d.move!=='treads'&&d.move!=='legs'&&d.move!=='wheels4')miss.push('rough-ground wheels, treads or legs for the woods');
  if(d.power!=='liion')miss.push(d.power==='solar'?'more stored energy for the night (the panel cannot replenish this small pack in darkness)':'a pack with enough modeled energy reserve');
  if(!rbbHas(d,'distance')&&!rbbHas(d,'camera'))miss.push('a distance sensor or camera to find the backpack and dodge trees');
  if(d.tool!=='claw')miss.push('a claw to grab the backpack straps');
  if(d.body==='tall'&&d.move!=='treads')miss.push('a lower body so it does not tip over on the bumpy ground');
  return miss.length?[false,'Not yet. Your robot still needs: '+miss.join('; ')+'.']:[true,'Your robot rolls through the dark woods, spots the backpack, grabs the straps and brings it home. A real rescue robot also needs suitable programming, terrain and payload testing, and a safe search plan.']}}
];
function rbbSvg(d){
 d=d||RBB_DEF;var col=GMCOL[d.color]||GMCOL.orange,s='<svg class="rbb-svg" viewBox="0 0 245 240" role="img" aria-label="Your robot">';
 s+='<ellipse cx="110" cy="214" rx="78" ry="9" fill="#0003"/>';
 var top=d.body==='tall'?58:84,bot=d.body==='tall'?170:166;
 if(d.power==='solar')s+='<path d="M110 40V'+(top+4)+'" stroke="#4C535C" stroke-width="4"/><g transform="rotate(-8 110 30)"><rect x="62" y="22" width="96" height="22" rx="3" fill="#1c3f8f" stroke="#0b1f4d" stroke-width="2"/><path d="M86 22v22M110 22v22M134 22v22M62 33h96" stroke="#5c8be0" stroke-width="1.5"/></g>';
 /* movement */
 if(d.move==='treads')s+='<rect x="34" y="'+(bot-6)+'" width="152" height="44" rx="22" fill="#2b2f36"/><rect x="40" y="'+bot+'" width="140" height="32" rx="16" fill="#3d434c"/>'+[58,90,130,162].map(function(cx){return '<circle cx="'+cx+'" cy="'+(bot+16)+'" r="11" fill="#868e96" stroke="#2b2f36" stroke-width="3"/>'}).join('');
 else if(d.move==='legs'){var L='';[[60,-1],[110,0],[160,1]].forEach(function(l){var x0=l[0];L+='<path d="M'+x0+' '+(bot-4)+' l'+(l[1]*14-16)+' 22 l-6 26" stroke="#4C535C" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M'+x0+' '+(bot-4)+' l'+(l[1]*14+16)+' 22 l6 26" stroke="#4C535C" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'});s+=L}
 else if(d.move==='wheels4')s+='<circle cx="52" cy="'+(bot+20)+'" r="22" fill="#2b2f36"/><circle cx="168" cy="'+(bot+20)+'" r="22" fill="#2b2f36"/><circle cx="80" cy="'+(bot+16)+'" r="17" fill="#1d2025"/><circle cx="140" cy="'+(bot+16)+'" r="17" fill="#1d2025"/>'+[52,168].map(function(cx){return '<circle cx="'+cx+'" cy="'+(bot+20)+'" r="9" fill="#adb5bd"/>'}).join('');
 else s+='<circle cx="48" cy="'+(bot+18)+'" r="24" fill="#2b2f36"/><circle cx="172" cy="'+(bot+18)+'" r="24" fill="#2b2f36"/><circle cx="48" cy="'+(bot+18)+'" r="10" fill="#adb5bd"/><circle cx="172" cy="'+(bot+18)+'" r="10" fill="#adb5bd"/><circle cx="110" cy="'+(bot+32)+'" r="8" fill="#495057"/>';
 /* body */
 if(d.body==='round')s+='<ellipse cx="110" cy="'+((top+bot)/2)+'" rx="70" ry="'+((bot-top)/2+4)+'" fill="'+col+'" stroke="#0005" stroke-width="3"/>';
 else if(d.body==='tall')s+='<rect x="66" y="'+top+'" width="88" height="'+(bot-top)+'" rx="10" fill="'+col+'" stroke="#0005" stroke-width="3"/>';
 else s+='<rect x="42" y="'+top+'" width="136" height="'+(bot-top)+'" rx="10" fill="'+col+'" stroke="#0005" stroke-width="3"/>';
 /* face / screen */
 var cy=top+28;
 s+='<rect x="80" y="'+(cy-14)+'" width="60" height="28" rx="6" fill="#13202E"/>';
 if(rbbHas(d,'distance'))s+='<circle cx="94" cy="'+cy+'" r="10" fill="#dee2e6" stroke="#495057" stroke-width="3"/><circle cx="126" cy="'+cy+'" r="10" fill="#dee2e6" stroke="#495057" stroke-width="3"/><circle cx="94" cy="'+cy+'" r="4" fill="#495057"/><circle cx="126" cy="'+cy+'" r="4" fill="#495057"/>';
 else s+='<rect x="90" y="'+(cy-5)+'" width="10" height="10" rx="2" fill="#7CFFB2"/><rect x="120" y="'+(cy-5)+'" width="10" height="10" rx="2" fill="#7CFFB2"/>';
 if(rbbHas(d,'camera'))s+='<rect x="96" y="'+(top-14)+'" width="28" height="16" rx="4" fill="#343a40"/><circle cx="110" cy="'+(top-6)+'" r="6" fill="#1971c2" stroke="#dee2e6" stroke-width="2"/>';
 if(rbbHas(d,'light'))s+='<path d="M'+(d.body==='tall'?140:160)+' '+top+' v-16" stroke="#4C535C" stroke-width="3"/><circle cx="'+(d.body==='tall'?140:160)+'" cy="'+(top-20)+'" r="6" fill="#FFD43B" stroke="#e67700" stroke-width="2"/>';
 if(rbbHas(d,'bump'))s+='<rect x="'+(d.body==='tall'?58:36)+'" y="'+(bot-14)+'" width="'+(d.body==='tall'?104:148)+'" height="10" rx="5" fill="#343a40"/>';
 if(rbbHas(d,'line'))s+='<circle cx="98" cy="'+(bot+2)+'" r="3.5" fill="#E8586B"/><circle cx="110" cy="'+(bot+2)+'" r="3.5" fill="#E8586B"/><circle cx="122" cy="'+(bot+2)+'" r="3.5" fill="#E8586B"/>';
 if(d.power==='aa')s+='<rect x="'+(d.body==='tall'?78:58)+'" y="'+(bot-40)+'" width="34" height="20" rx="3" fill="#343a40"/><rect x="'+(d.body==='tall'?82:62)+'" y="'+(bot-36)+'" width="12" height="12" fill="#f08c00"/><rect x="'+(d.body==='tall'?96:76)+'" y="'+(bot-36)+'" width="12" height="12" fill="#f08c00"/>';
 if(d.power==='liion')s+='<rect x="'+(d.body==='tall'?78:58)+'" y="'+(bot-38)+'" width="40" height="16" rx="3" fill="#2b8a3e"/><path d="M'+(d.body==='tall'?96:76)+' '+(bot-35)+'l-4 6h5l-3 6" stroke="#fff" stroke-width="2" fill="none"/>';
 /* tool on the right arm */
 var ax=d.body==='tall'?154:178,ay=top+50;
 if(d.tool!=='none')s+='<path d="M'+ax+' '+ay+' h22" stroke="#4C535C" stroke-width="8" stroke-linecap="round"/>';
 if(d.tool==='claw')s+='<path d="M'+(ax+22)+' '+(ay-2)+' l12 -12 l8 6 M'+(ax+22)+' '+(ay+2)+' l12 12 l8 -6" stroke="#4C535C" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
 if(d.tool==='magnet')s+='<path d="M'+(ax+24)+' '+(ay-14)+' h10 a14 14 0 0 1 0 28 h-10" stroke="#D9463B" stroke-width="10" fill="none"/><rect x="'+(ax+20)+'" y="'+(ay-19)+'" width="8" height="10" fill="#dee2e6"/><rect x="'+(ax+20)+'" y="'+(ay+9)+'" width="8" height="10" fill="#dee2e6"/>';
 if(d.tool==='scoop')s+='<path d="M'+(ax+18)+' '+(ay-6)+' l18 0 l4 26 l-26 0 z" fill="#ced4da" stroke="#495057" stroke-width="3" stroke-linejoin="round"/>';
 s+='<text x="110" y="226" text-anchor="middle" font-size="14" font-weight="800" fill="currentColor" font-family="ui-monospace,Menlo,monospace">'+esc(d.name||'Rover')+'</text>';
 return s+'</svg>';
}
function rbbOpen(ch){var p=me();if(!p||(ch&&!RBB_CH.some(function(c){return c.id===ch})))return;var d=rbbDesign()||JSON.parse(JSON.stringify(RBB_DEF));var dr=p.drafts&&p.drafts['rbb'];if(dr&&dr.d)d=rbbNormalize(dr.d);v.rbb={ownerId:db.active,d:d,ch:ch||null,res:null,saved:!!p.robot};v.s='rbb';v.subj='lab';p.lastSubj='lab';save()}
function rbbSave(){var p=me();if(!p||v.s!=='rbb'||!v.rbb||v.rbb.ownerId!==db.active)return;p.robot=JSON.parse(JSON.stringify(v.rbb.d));v.rbb.saved=true;save()}
function vRbb(){
 var S=v.rbb,d=S.d,p=me(),done=RBB_CH.filter(function(c){return p.done[c.id]}).length;
 var h='<div class="wrap rbb" style="--c:#C2410C;--cd:#7C2D12"><div class="pathhead"><button class="back" data-act="back" aria-label="Back">'+ICONS.back+'</button><div><h2>Robot Builder</h2><p class="muted" style="font-size:14px;font-weight:600">Design it, then test it. '+done+' of '+RBB_CH.length+' challenges passed.</p></div></div>';
 h+='<div class="rbb-top"><div class="rbb-view">'+rbbSvg(d)+'</div><div class="rbb-stats">';
 rbbStats(d).forEach(function(st){h+='<div class="rbb-stat"><span>'+st[0]+'</span><i>'+'<b class="on"></b>'.repeat(st[1])+'<b></b>'.repeat(4-st[1])+'</i></div>'});
 h+='<label class="rbb-name">Name <input id="rbbname" maxlength="14" value="'+esc(d.name)+'" autocomplete="off"></label><div class="rbb-colors">'+GMCOLORS.map(function(c){return '<button class="rbb-col'+(d.color===c?' on':'')+'" style="background:'+GMCOL[c]+'" data-act="rbbcolor" data-id="'+c+'" aria-label="'+c+'"></button>'}).join('')+'</div>';
 h+='<button class="btn small" data-act="rbbsave">'+(S.saved?'Saved ✓':'Save my robot')+'</button></div></div>';
 h+='<p class="card">Design-rule simulation: stat bars and mission results illustrate tradeoffs; they are not measured performance. Tests assume suitable control software, routes and lighting for camera recognition.</p>';if(S.note)h+='<p role="status">'+esc(S.note)+'</p>';
 if(S.res){var c0=RBB_CH.find(function(c){return c.id===S.res.id});h+='<div class="card rbb-res '+(S.res.ok?'ok':'no')+'" role="status"><b>'+(S.res.ok?'✓ Challenge passed: ':'✗ Not yet: ')+esc(c0.t)+'</b><p>'+esc(S.res.msg)+'</p>'+(S.res.xp?'<p class="xgoodp"><b>+'+S.res.xp+' XP</b></p>':'')+'</div>'}
 Object.keys(RBB_PARTS).forEach(function(k){var g=RBB_PARTS[k];
  h+='<h3 class="mngrp">'+esc(g.n)+'</h3><div class="rbb-parts">';
  g.o.forEach(function(o){var on=k==='sensors'?rbbHas(d,o[0]):d[k]===o[0];h+='<button class="rbb-part'+(on?' on':'')+'" data-act="rbbpart" data-id="'+k+':'+o[0]+'" aria-pressed="'+on+'"><b>'+esc(o[1])+'</b><small>'+esc(o[2])+'</small></button>'});
  h+='</div>'});
 h+='<h3 class="mngrp">Challenges</h3><p class="muted" style="font-size:13px;font-weight:600;margin:0 0 6px">Change parts, then test. A real engineer tries, learns why it failed, and tries again.</p><div class="rbb-chs">';
 RBB_CH.forEach(function(c,i){h+='<div class="rbb-ch'+(p.done[c.id]?' done':'')+'"><div><b>'+(i+1)+'. '+esc(c.t)+(p.done[c.id]?' ✓':'')+'</b><small>'+esc(c.story)+'</small></div><button class="btn small" data-act="rbbtest" data-id="'+c.id+'">Test</button></div>'});
 h+='</div><p class="muted" style="font-size:13px;font-weight:600;margin-top:12px">Your saved robot also shows up as the robot hero in Game Lab.</p><div style="height:90px"></div></div>';
 return h;
}
function rbbClick(a,id){
 if(a==='rbbopen'){rbbOpen();return true}
 var S=v.rbb;if(!S||v.s!=='rbb'||S.ownerId!==db.active)return false;var d=S.d;
 switch(a){
  case 'rbbpart':{var pr=String(id).split(':'),k=pr[0],val=pr[1],g=RBB_PARTS[k];if(!g||!Array.isArray(g.o)||!g.o.some(function(o){return o[0]===val}))return true;
   if(k==='sensors'){var i=d.sensors.indexOf(val);if(i>=0)d.sensors.splice(i,1);else{if(d.sensors.length>=3){S.note='Remove a sensor before adding another (maximum three).';return true}d.sensors.push(val)}}else d[k]=val;
   S.saved=false;S.res=null;return true}
  case 'rbbcolor':if(GMCOL[id]){d.color=id;S.saved=false}return true;
  case 'rbbsave':rbbSave();return true;
  case 'rbbtest':{var c=RBB_CH.find(function(x){return x.id===id});if(!c)return true;var r=c.test(d),p=me(),xp=0;if(r[0]){rbbSave();if(!p.done[c.id])xp=awardLab(c.id)}S.res={id:id,ok:r[0],msg:r[1],xp:xp};window.scrollTo&&window.scrollTo({top:0,behavior:'smooth'});return true}
 }
 return false;
}
document.addEventListener('input',function(e){if(v.s==='rbb'&&v.rbb&&v.rbb.ownerId===db.active&&e.target&&e.target.id==='rbbname'){v.rbb.d.name=e.target.value.slice(0,14);v.rbb.saved=false;var b=document.querySelector('[data-act="rbbsave"]');if(b)b.textContent='Save my robot';var t=document.querySelector('.rbb-view text');if(t)t.textContent=v.rbb.d.name||'Rover'}});
(function(){var ls=SUBJECTS.find(function(s){return s.id==='lab'});if(!ls)return;var at=ls.lessons.findIndex(function(l){return /^rb-/.test(l.id)});var add=RBB_CH.map(function(c){return {id:c.id,title:c.t,unit:'Robot Builder',kind:'rbb',open:true}});if(at<0)at=ls.lessons.length;ls.lessons.splice.apply(ls.lessons,[at,0].concat(add))})();
WORKSHOP_BADGES.push({id:'engineer',name:'Robot engineer',goal:'Pass all nine Robot Builder challenges.',target:9,icon:'wrench',ids:RBB_CH.map(function(c){return c.id})});
var pathBeforeRbb=vPath;vPath=function(){var h=pathBeforeRbb();if(v.subj!=='lab')return h;return h.replace('</section><div class="path">','<button data-act="rbbopen"><span class="ds-portal-icon">'+ICONS.chip+'</span><span><small>DESIGN AND TEST</small><b>Build a robot</b><em>Pick parts, pass nine challenges</em></span><span>→</span></button></section><div class="path">')};

function rbbDraft(){var S=v.rbb,p=me();if(!p||v.s!=='rbb'||!S||S.ownerId!==db.active)return;p.drafts=p.drafts||{};p.drafts.rbb={d:JSON.parse(JSON.stringify(S.d)),ch:S.ch};p.resume={subj:'lab',kind:'rbb',id:S.ch||'rbb1',title:'Robot Builder'};save()}
var rbbClickRaw=rbbClick;rbbClick=function(a,id){var ok=rbbClickRaw(a,id);if(ok)rbbDraft();return ok};
var rbbCheckpointBefore=checkpoint;checkpoint=function(){if(v.s==='rbb'){rbbDraft();return}rbbCheckpointBefore()};
var rbbResumeBefore=resumeWorkshop;resumeWorkshop=function(){var r=me()&&me().resume;if(r&&r.kind==='rbb'){rbbOpen(r.id);return}rbbResumeBefore()};
document.addEventListener('input',function(e){if(e.target&&e.target.id==='rbbname')rbbDraft()});
if(window.ShopLab)Object.assign(window.ShopLab,{rbbOpen:rbbOpen,rbbClick:rbbClick,RBB_CH:RBB_CH,RBB_PARTS:RBB_PARTS,rbbDesign:rbbDesign,rbbSave:rbbSave,rbbStats:rbbStats,rbbDraft:rbbDraft,GMLOOKS:GMLOOKS,gbGen:gbGen,gbValFor:gbValFor,gameWorkerSource:gameWorkerSource,rbbSvg:rbbSvg,gmBody:gmBody,vPath:vPath});
/* END ROBOT BUILDER */
