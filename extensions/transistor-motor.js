/* BEGIN TRANSISTOR MOTOR LAB: transistors and motor control (teaching models only) ===== */
var XTM=(function(){
 var K={vlogic:3.3,vbe:0.7,vsat:0.2,beta:100,icmax:0.5,vcemax:40,ledVf:2.0,rc:330,vled:5,vm:6,rm:10};
 var out={K:K};
 /* LED switch (5 V rail, 3.3 V signal) */
 out.led=function(o){
  var icsat=(K.vled-K.ledVf-K.vsat)/K.rc,r={ib:0,ic:0,icsat:icsat,bright:0,state:"OFF",note:"No base current, so no collector current. The LED is dark.",fault:null};
  if(!o.sig)return r;
  if(o.open==="emitter"){r.state="NO PATH";r.note="The emitter is not connected to ground, so no current can flow through the transistor.";r.fault="open";return r}
  if(!o.rb){r.state="OVERDRIVEN";r.bright=1;r.fault="nobase";r.note="Nothing limits the base current except the signal pin itself. Real pins and transistors can be damaged.";return r}
  r.ib=(K.vlogic-K.vbe)/o.rb;
  var beta=o.swapped?2:K.beta;
  r.ic=Math.min(beta*r.ib,icsat);
  r.bright=r.ic/icsat;
  if(o.swapped){r.state="WEAK (leads swapped)";r.fault="swap";r.note="A transistor wired backwards still passes a little current, but with very poor gain.";return r}
  if(beta*r.ib>=icsat){r.state="SATURATED (fully on)";r.note="In this fixed-gain teaching model, the transistor reaches its on-state limit and the LED resistor sets the current. Real saturation must be checked from a datasheet."}
  else{r.state="ACTIVE (partly on)";r.note="The base current is small, so the transistor only lets about "+Math.round(beta)+" times that through. The LED is dim."}
  return r;
 };
 /* motor low-side switch, 6 V supply */
 out.load={free:{i:0.12,spin:1,label:"Free spinning"},loaded:{i:0.25,spin:0.6,label:"Working hard"},stalled:{i:K.vm/K.rm,spin:0,label:"Stalled (blocked)"}};
 out.motor=function(o){
  var ld=out.load[o.load||"free"],r={ib:0,i:0,spin:0,state:"OFF",ok:true,note:"Signal is LOW, so the transistor is off and the motor is not powered.",fault:null,hot:false,over:false};
  if(!o.sig)return r;
  if(!o.ground){r.state="NO RETURN PATH";r.ok=false;r.fault="ground";r.note="The signal and the motor supply do not share a ground, so the base current has no way back and the transistor cannot turn on.";return r}
  if(!o.rb){r.state="OVERDRIVEN";r.ok=false;r.fault="nobase";r.note="No base resistor: the signal pin has to supply a huge current.";return r}
  if(o.diode==="wrong"){r.state="DIODE SHORTS SUPPLY";r.ok=false;r.fault="diode";r.note="The diode is backwards, so it conducts while the motor runs and shorts the supply.";return r}
  r.ib=(K.vlogic-K.vbe)/o.rb;
  var t=o.t||{beta:K.beta,icmax:K.icmax};
  r.i=ld.i;r.spin=ld.spin;
  r.over=ld.i>t.icmax;
  r.hot=t.beta*r.ib<ld.i;
  if(r.over){r.state="OVER RATING";r.ok=false;r.fault="over";r.note="This current is above what the teaching transistor is rated for ("+Math.round(t.icmax*1000)+" mA). Stalls and start-ups can draw this much."}
  else if(r.hot){r.state="NOT FULLY ON (hot)";r.ok=false;r.fault="hot";r.note="The base current is too small to keep the transistor fully on at this load, so it wastes power as heat."}
  else{r.state="ON";r.note="The transistor is fully on. The motor gets nearly all of the supply voltage."}
  return r;
 };
 /* switch-off spike (illustrative) */
 out.spike=function(diode){return diode==="good"?{peak:K.vm+0.7,clamped:true}:{peak:48,clamped:false}};
 out.spikeAt=function(diode,t){return diode==="good"?K.vm+0.7*Math.exp(-t/1.5):K.vm+42*Math.exp(-t/0.25)};
 /* PWM */
 out.pwm=function(duty){var avg=K.vm*duty/100,sp=Math.max(0,Math.min(1,(avg-1)/(K.vm-1)));return {avg:avg,speed:sp,on:duty>0}};
 /* H-bridge */
 out.bridge=function(s){
  if((s.ul&&s.ll)||(s.ur&&s.lr))return {state:"shoot",label:"BLOCKED: SHORT REQUEST",dir:0};
  if(s.ul&&s.lr)return {state:"fwd",label:"Forward",dir:1};
  if(s.ur&&s.ll)return {state:"rev",label:"Reverse",dir:-1};
  if((s.ll&&s.lr)||(s.ul&&s.ur))return {state:"brake",label:"Brake",dir:0};
  return {state:"coast",label:"Coast (off)",dir:0};
 };
 out.driver=function(d){
  if(!d.en)return {ul:0,ll:0,ur:0,lr:0};
  return d.dir==="fwd"?{ul:1,ll:0,ur:0,lr:1}:{ul:0,ll:1,ur:1,lr:0};
 };
 /* final challenge */
 out.TR={T1:{name:"T1",beta:100,icmax:0.5,desc:"small, 500 mA rating"},T2:{name:"T2",beta:60,icmax:3,desc:"power part, 3 A rating"}};
 out.final=function(c){
  var t=out.TR[c.t],stall=K.vm/K.rm,res=[],ib=c.rb?(K.vlogic-K.vbe)/c.rb:0,pw=out.pwm(c.duty);
  res.push({ok:!!c.ground,name:"Common ground",good:"The signal and the motor supply share a ground.",bad:"No common ground: the transistor cannot switch the motor."});
  res.push({ok:c.rb>0&&t.beta*ib>=stall,name:"Base resistor",good:"The base current passes this simplified model. A real circuit still needs saturation and pin-current checks from its datasheets.",bad:c.rb?"The base current is too small to hold the transistor fully on at stall current.":"No base resistor: the signal pin is overloaded."});
  res.push({ok:c.diode==="good",name:"Flyback diode",good:"The diode is reverse-biased while running and catches the switch-off spike.",bad:c.diode==="wrong"?"The diode is backwards: it conducts while running and shorts the supply.":"No flyback diode: every switch-off sends a spike into the transistor."});
  res.push({ok:t.icmax>=stall,name:"Transistor rating",good:t.name+" passes the model current-rating check at "+Math.round(stall*1000)+" mA. Real parts also need thermal and safe-operating-area checks.",bad:t.name+" is rated "+Math.round(t.icmax*1000)+" mA, but a stalled motor draws "+Math.round(stall*1000)+" mA."});
  res.push({ok:pw.speed>=0.3&&pw.speed<=0.6,name:"About half speed",good:"The motor speed is about "+Math.round(pw.speed*100)+"%.",bad:"The motor speed would be about "+Math.round(pw.speed*100)+"%. The target is 30 to 60%."});
  return res;
 };
 return out;
})();

/* ---------- drawing helpers ---------- */
function xW(d,on,cls){return '<path d="'+d+'" class="xw'+(on?' on':'')+(cls?' '+cls:'')+'"/>'}
function xT(x,y,s,anchor,cls){return '<text x="'+x+'" y="'+y+'" text-anchor="'+(anchor||'start')+'" class="xtx'+(cls?' '+cls:'')+'">'+s+'</text>'}
function xRes(x,y,w,label,vert){
 if(vert)return '<rect x="'+(x-6)+'" y="'+(y-w/2)+'" width="12" height="'+w+'" rx="3" class="xpart"/>'+xT(x+11,y+4,label);
 return '<rect x="'+(x-w/2)+'" y="'+(y-6)+'" width="'+w+'" height="12" rx="3" class="xpart"/>'+xT(x,y-10,label,'middle');
}
function xNpn(x,y,o){
 o=o||{};
 var g='<circle cx="'+x+'" cy="'+y+'" r="27" class="xpart xcirc'+(o.on?' xon':'')+'"/>';
 g+='<path d="M'+(x-40)+' '+y+'H'+(x-9)+'M'+(x-9)+' '+(y-15)+'V'+(y+15)+'M'+(x-9)+' '+(y-6)+'L'+(x+14)+' '+(y-20)+'V'+(y-40)+'M'+(x-9)+' '+(y+6)+'L'+(x+14)+' '+(y+20)+'V'+(y+40)+'" class="xsym"/>';
 g+='<path d="M'+(x+14)+' '+(y+20)+'L'+(x+4.3)+' '+(y+18.6)+'L'+(x+8.5)+' '+(y+11.8)+'Z" class="xarrow"/>';
 if(o.flip)g='<g transform="translate(0 '+(2*y)+') scale(1 -1)">'+g+'</g>';
 var top=o.flip?"E":"C",bot=o.flip?"C":"E";
 if(o.labels!==false)g+=xT(x-44,y-6,'B','end','xlead')+xT(x+19,y-34,top,'start','xlead')+xT(x+19,y+46,bot,'start','xlead');
 return g;
}
function xLed(x,y,b){
 return '<circle cx="'+x+'" cy="'+y+'" r="24" fill="#ffd43b" opacity="'+(0.9*b).toFixed(2)+'"/><path d="M'+(x-11)+' '+(y-10)+'H'+(x+11)+'L'+x+' '+(y+10)+'Z" class="xpart'+(b>0.05?' xledon':'')+'"/><path d="M'+(x-11)+' '+(y+11)+'H'+(x+11)+'" class="xsym"/>'+xT(x+16,y+4,'LED');
}
function xMotor(x,y,spin){
 var dur=spin>0?(1.1/spin).toFixed(2):0;
 return '<circle cx="'+x+'" cy="'+y+'" r="19" class="xpart"/><g class="xspinbox'+(spin>0?' xspin':'')+'" style="transform-origin:'+x+'px '+y+'px;'+(spin>0?'animation-duration:'+dur+'s':'')+'"><path d="M'+(x-13)+' '+y+'h26M'+x+' '+(y-13)+'v26" class="xsym"/></g><circle cx="'+x+'" cy="'+y+'" r="5" class="xhub"/>'+xT(x-26,y+4,'Motor','end');
}
function xDiode(x,y,cls){
 return '<path d="M'+(x-9)+' '+(y+9)+'H'+(x+9)+'L'+x+' '+(y-9)+'Z" class="xpart'+(cls?' '+cls:'')+'"/><path d="M'+(x-10)+' '+(y-10)+'H'+(x+10)+'" class="xsym"/>';
}
function xGnd(x,y){return '<path d="M'+(x-10)+' '+y+'H'+(x+10)+'M'+(x-6)+' '+(y+4)+'H'+(x+6)+'M'+(x-2)+' '+(y+8)+'H'+(x+2)+'" class="xsym"/>'}
function xSvg(inner,label){return '<svg class="xsvg" viewBox="0 0 320 230" role="img" aria-label="'+esc(label)+'">'+inner+'</svg>'}
function xChip(label,val,cls){return '<span class="xchip'+(cls?' '+cls:'')+'"><i>'+label+'</i><b>'+val+'</b></span>'}
function xBtn(act,id,label,on,extra){return '<button class="btn small ghost xb'+(on?' xsel':'')+'" data-act="'+act+'"'+(id!==undefined&&id!==null?' data-id="'+id+'"':'')+(extra||'')+' aria-pressed="'+(on?"true":"false")+'">'+label+'</button>'}
function xmA(a){return a<1?(a*1000).toFixed(a<0.01?2:1).replace(/\.0+$/,"")+" mA":a.toFixed(2)+" A"}
function xmAx(a){return (a*1000).toFixed(a<0.01?2:(a<0.1?1:0))+" mA"}
function xRbLabel(r){return r>=1e6?(r/1e6)+" MΩ":r>=1000?(r/1000)+" kΩ":r+" Ω"}
function xShuffle(a,seed){
 var arr=a.map(function(x,i){return {x:x,i:i}}),s=seed||1;
 function rnd(){s=(s*9301+49297)%233280;return s/233280}
 for(var i=arr.length-1;i>0;i--){var j=Math.floor(rnd()*(i+1)),t=arr[i];arr[i]=arr[j];arr[j]=t}
 return arr;
}

/* ---------- widgets ---------- */
/* shared transistor + load schematic: kind 'led' or 'motor' */
function xCircuit(o){
 var kind=o.kind,tx=216,ty=165,on=o.on;
 var s='';
 var r=o.res||{};
 // rail
 s+=xW('M150 22H300',false,'xrail')+xT(300,15,kind==="led"?'+5 V':'+6 V','end','xrailt');
 s+=xW('M230 22V'+(kind==="led"?34:51),on&&!o.open);
 if(kind==="led"){
  s+=xRes(230,50,30,'330Ω',true)+xW('M230 65V75',on)+xLed(230,95,r.bright||0)+xW('M230 106V125',on);
 }else{
  s+=xMotor(230,70,r.spin||0)+xW('M230 89V125',on);
  var dx=282;
  if(o.diode==="none"){s+=xT(dx,60,'no diode','middle','xwarn')}
  else{
   s+=xW('M230 22H'+dx,false)+xW('M'+dx+' 22V62')+(o.diode==='wrong'?'<g transform="rotate(180 '+dx+' 72)">'+xDiode(dx,72,'xbad')+'</g>':xDiode(dx,72,'xdio'))+xW('M'+dx+' 82V125H230');
   if(o.diode==="wrong")s+=xT(dx,142,'backwards!','middle','xwarn');
  }
 }
 // transistor
 s+=xNpn(tx,ty,{on:on&&!o.open,flip:o.flip});
 // collector/emitter wire ends
 var cy=ty-40,ey=ty+40; // Physical top/bottom wires stay fixed when the symbol is reversed.
 // base network
 if(o.rb===0)s+=xW('M30 '+ty+'H'+(tx-40),on&&(r.fault!=="nobase"||true),r.fault==="nobase"?'xbadw':'');
 else s+=xW('M30 '+ty+'H93',on)+xRes(112,ty,38,xRbLabel(o.rb),false)+xW('M131 '+ty+'H'+(tx-40),on);
 s+=xT(14,ty-18,'SIGNAL','start','xsig')+xT(14,ty-6,o.sig?'HIGH 3.3 V':'LOW 0 V','start',o.sig?'xhi':'xlo');
 // emitter to ground
 var gy=210;
 if(o.open==="emitter"){
  s+=xW('M230 '+ey+'V190',false)+xT(236,200,'✕ open','start','xwarn')+xGnd(230,gy);
 }else{
  s+=xW('M230 '+ey+'V'+gy,on)+xGnd(230,gy);
 }
 // common ground (motor)
 if(kind==="motor"){
  if(o.ground){s+=xW('M30 '+gy+'H230',on)+xGnd(30,gy)+xT(130,gy-6,'common ground','middle','xtx')}
  else{s+=xGnd(30,gy)+xW('M30 '+gy+'H88',false)+xW('M168 '+gy+'H230',false)+xT(128,gy+3,'✕ no link','middle','xwarn')}
 }
 return s;
}
function xRead(rows){return '<div class="xread">'+rows.join("")+'</div>'}

/* LED switch widget */
function wLed(ws,fault){
 var o={sig:ws.sig,rb:ws.rb,open:fault&&fault.open,swapped:fault&&fault.swapped};
 var r=XTM.led(o),on=r.ic>0||r.state==="OVERDRIVEN";
 var svg=xSvg(xCircuit({kind:"led",on:on,sig:ws.sig,rb:o.rb,res:r,flip:!!o.swapped,open:o.open}),"Transistor switching an LED");
 var chips=xRead([xChip("Signal",ws.sig?"HIGH":"LOW"),xChip("Base current",o.rb&&ws.sig?xmAx(r.ib):(ws.sig&&!o.rb?"unlimited":"0")),xChip("LED current",xmAx(r.ic)),xChip("Transistor",r.state,r.fault?"bad":(r.state.indexOf("SATURATED")===0?"good":""))]);
 return svg+chips+'<p class="xnote">'+esc(r.note)+'</p>';
}
function wLedCtl(ws){
 var h='<div class="xrow"><span>Signal</span>'+xBtn("xtsig",1,"HIGH (on)",ws.sig)+xBtn("xtsig",0,"LOW (off)",!ws.sig)+'</div>';
 h+='<div class="xrow"><span>Base resistor</span>';
 [1000,10000,100000,1000000].forEach(function(r){h+=xBtn("xtrb",r,xRbLabel(r),ws.rb===r)});
 return h+'</div>';
}

/* motor widget */
function wMotor(ws){
 var o={sig:ws.sig,rb:220,ground:ws.ground,diode:"good",load:ws.load,t:XTM.TR.T1};
 var r=XTM.motor(o),on=r.ok&&ws.sig;
 var svg=xSvg(xCircuit({kind:"motor",on:on,sig:ws.sig,rb:220,res:r,ground:ws.ground,diode:"good",open:null}),"Transistor switching a motor");
 var chips=xRead([xChip("Base current",ws.sig&&ws.ground?xmAx(r.ib):"0"),xChip("Motor current",xmAx(r.i)),xChip("Rating (T1)","500 mA"),xChip("Transistor",r.state,r.ok?(ws.sig?"good":""):"bad")]);
 var warn=r.over?'<p class="xnote xwarnp">Stall current is about '+xmAx(r.i)+'. A motor draws the most current at start-up and when it is blocked, which can be several times its running current.</p>':'<p class="xnote">'+esc(r.note)+'</p>';
 return svg+chips+warn;
}
function wMotorCtl(ws){
 var h='<div class="xrow"><span>Signal</span>'+xBtn("xtsig",1,"HIGH (on)",ws.sig)+xBtn("xtsig",0,"LOW (off)",!ws.sig)+'</div>';
 h+='<div class="xrow"><span>Ground link</span>'+xBtn("xtgnd",1,"Connected",ws.ground)+xBtn("xtgnd",0,"Not connected",!ws.ground)+'</div>';
 h+='<div class="xrow"><span>Motor load</span>';
 ["free","loaded","stalled"].forEach(function(k){h+=xBtn("xtload",k,XTM.load[k].label,ws.load===k)});
 return h+'</div>';
}

/* flyback plot */
function wSpike(ws){
 var W=320,H=230,x0=40,y0=190,xs=50,ys=3.2; // t in ms, volts
 function px(t){return x0+(t+0.6)*xs*0.9}
 function py(v){return y0-v*ys}
 var s='';
 s+='<path d="M'+x0+' '+y0+'H300M'+x0+' '+y0+'V20" class="xsym"/>';
 s+=xT(x0-4,py(0)+3,'0 V','end')+xT(x0-4,py(6)+3,'6 V','end')+xT(x0-4,py(40)+3,'40 V','end');
 s+='<path d="M'+x0+' '+py(40)+'H300" class="xlimit"/>'+xT(298,py(40)-4,'transistor limit','end','xwarn');
 s+='<path d="M'+x0+' '+py(6)+'H300" class="xgrid"/>';
 s+=xT(px(-0.3),y0+16,'on','middle')+xT(px(0),y0+16,'OFF ▸','start','xlead');
 var d=ws.diode,hasRun=ws.ran&&ws.ran[d];
 var pts=[],t;
 pts.push([px(-0.6),py(0.2)]);pts.push([px(0),py(0.2)]);
 for(t=0;t<=4.01;t+=0.1)pts.push([px(t),py(Math.min(XTM.spikeAt(d,t),55))]);
 var path="M"+pts.map(function(p){return p[0].toFixed(1)+" "+p[1].toFixed(1)}).join("L");
 if(ws.show===d)s+='<path d="'+path+'" class="xtrace '+(d==="good"?"xtgood":"xtbad")+'" pathLength="1"/>';
 if(ws.show===d){
  var pk=XTM.spike(d);
  s+=xT(px(0.15),py(Math.min(pk.peak,50))-6,d==="good"?'≈6.7 V (clamped)':'≈48 V spike (illustrative)','start',d==="good"?'xhi':'xwarn');
 }else s+=xT(160,100,'Tap “Switch OFF”','middle','xlead');
 var svg='<svg class="xsvg" viewBox="0 0 320 230" role="img" aria-label="Voltage at the transistor collector when the motor switches off">'+s+'</svg>';
 var msg=!ws.show?'':(d==="good"?'With the diode the voltage stays near the supply and the motor current fades safely.':'Without the diode the voltage jumps far above the supply and past what the transistor can take.');
 return svg+'<p class="xnote">'+esc(msg)+'</p><p class="xnote xsmall">Shapes and the spike height are illustrative. Real spikes depend on the motor, the wiring and how fast you switch.</p>';
}
function wSpikeCtl(ws){
 return '<div class="xrow"><span>Flyback diode</span>'+xBtn("xtdio","none","None",ws.diode==="none")+xBtn("xtdio","good","Across the motor",ws.diode==="good")+'</div><div class="xrow">'+'<button class="btn small" data-act="xtoff">Switch OFF</button></div>';
}

/* PWM */
function wPwm(ws){
 var d=ws.duty,m=XTM.pwm(d),s='',x=30,pw=62,per=4,hi=50,lo=100;
 s+=xT(14,hi+4,'5 V','start')+xT(14,lo+4,'0 V','start')+'<path d="M'+x+' '+lo+'H'+(x+per*pw)+'" class="xgrid"/>';
 var p='M'+x+' '+lo;
 for(var i=0;i<per;i++){
  var a=x+i*pw,onw=pw*d/100;
  if(d>=100){p+=(i===0?'V'+hi:'')+'H'+(a+pw);continue}
  if(d<=0){p+='H'+(a+pw);continue}
  p+='H'+a+'V'+hi+'H'+(a+onw)+'V'+lo+'H'+(a+pw);
 }
 s+='<path d="'+p+'" class="xpulse"/>';
 s+='<path d="M'+x+' '+(lo-(lo-hi)*d/100)+'H'+(x+per*pw)+'" class="xavg"/>'+xT(x+per*pw,lo-(lo-hi)*d/100-5,'average','end','xhi');
 s+=xT(x,125,'one period = 1 ms (1 kHz)','start','xsmall');
 s+=xMotor(250,175,m.speed);
 s+=xT(40,165,'Duty: '+d+'%','start','xbig')+xT(40,184,'Average: '+m.avg.toFixed(1)+' V','start')+xT(40,200,'Speed: about '+Math.round(m.speed*100)+'%','start');
 var msg=d===0?"0% duty: always off.":(d===100?"100% duty: always on, full speed.":(m.speed===0?"The pulses are on only "+d+"% of the time. The average is too low to overcome friction, so the motor does not start.":"The motor sees pulses of the full 6 V. The average is lower because the pulses are on only "+d+"% of each period."));
 return xSvg(s,"PWM pulses and motor speed")+'<p class="xnote">'+esc(msg)+'</p><p class="xnote xsmall">Approximate. Real motors need a minimum average voltage to start, and they behave differently under load.</p>';
}
function wPwmCtl(ws){
 var h='<label class="xrow xcol"><span>Duty cycle (how long the signal is on): <b id="xtdv">'+ws.duty+'%</b></span><input type="range" id="xtduty" min="0" max="100" step="5" value="'+ws.duty+'" aria-label="Duty cycle percent"></label><div class="xrow">';
 [0,25,50,75,100].forEach(function(v){h+=xBtn("xtdset",v,v+"%",ws.duty===v)});
 return h+'</div>';
}

/* H-bridge */
function wBridge(ws){
 var sw=ws.mode==="driver"?XTM.driver(ws.drv):ws.sw,st=XTM.bridge(sw),s='';
 var L=90,R=230,top=24,bot=206,uy=62,ly=152,my=107;
 function seg(id,d,active,red){return '<path d="'+d+'" class="xw'+(active?(red?' xbadw':' on'):'')+'"/>'}
 var shoot=st.state==="shoot",fw=st.state==="fwd",rv=st.state==="rev";
 s+=seg('r','M'+L+' '+top+'H'+R,false)+xT(R+8,top+4,'+6 V','start','xrailt');
 s+=seg('ul','M'+L+' '+top+'V'+(uy-14),sw.ul,shoot)+seg('ul2','M'+L+' '+(uy+14)+'V'+my,sw.ul,shoot);
 s+=seg('ur','M'+R+' '+top+'V'+(uy-14),sw.ur,shoot)+seg('ur2','M'+R+' '+(uy+14)+'V'+my,sw.ur,shoot);
 s+=seg('ll','M'+L+' '+my+'V'+(ly-14),sw.ll,shoot||rv)+seg('ll2','M'+L+' '+(ly+14)+'V'+bot,sw.ll,shoot||rv);
 s+=seg('lr','M'+R+' '+my+'V'+(ly-14),sw.lr,shoot)+seg('lr2','M'+R+' '+(ly+14)+'V'+bot,sw.lr,shoot);
 s+=seg('m','M'+L+' '+my+'H'+(160-22)+'M'+(160+22)+' '+my+'H'+R,fw||rv);
 s+=seg('g','M'+L+' '+bot+'H'+R,false)+xGnd(160,bot+2);
 function box(x,y,on,lab){return '<rect x="'+(x-13)+'" y="'+(y-14)+'" width="26" height="28" rx="6" class="xpart '+(on?'xswon':'')+'"/>'+xT(x,y+4,lab,'middle','xbold')}
 s+=box(L,uy,sw.ul,'S1')+box(R,uy,sw.ur,'S3')+box(L,ly,sw.ll,'S2')+box(R,ly,sw.lr,'S4');
 var motorDrawing=xMotor(160,my,fw||rv?0.6:0);if(rv)motorDrawing=motorDrawing.replace('animation-duration:','animation-direction:reverse;animation-duration:');s+=motorDrawing.replace(/<text[^>]*>Motor<\/text>/,'');
 s+=xT(160,my-26,'Motor','middle');
 // motor direction arrow
 if(fw)s+='<path d="M132 '+(my+30)+'H188l-8-6m8 6l-8 6" class="xdir"/>'+xT(160,my+46,'turns one way','middle','xhi');
 if(rv)s+='<path d="M188 '+(my+30)+'H132l8-6m-8 6l8 6" class="xdir"/>'+xT(160,my+46,'turns the other way','middle','xhi');
 if(shoot)s+=xT(160,my+36,'BLOCKED: would short!','middle','xwarn xbig');
 var svg=xSvg(s,"H-bridge motor driver");
 var cls=shoot?"bad":(fw||rv?"good":"");
 var note={fwd:"Current runs left to right through the motor.",rev:"Current runs right to left through the motor, so it spins the other way.",brake:"Both motor leads are tied to the same side, so the motor is shorted and slows down quickly.",coast:"No path for current. The motor coasts to a stop.",shoot:"Two switches on the same side are on. The interlock blocks this request. Without it, current would rush straight from the supply to ground, skipping the motor."}[st.state];
 return svg+xRead([xChip("State",st.label,cls)])+'<p class="xnote'+(shoot?' xwarnp':'')+'">'+esc(note)+'</p>';
}
function wBridgeCtl(ws){
 var h='<div class="xrow"><span>Control</span>'+xBtn("xtmode","manual","Request switches by hand",ws.mode!=="driver")+xBtn("xtmode","driver","Driver module",ws.mode==="driver")+'</div>';
 if(ws.mode==="driver"){
  h+='<div class="xrow"><span>Direction</span>'+xBtn("xtdir","fwd","Forward",ws.drv.dir==="fwd")+xBtn("xtdir","rev","Reverse",ws.drv.dir==="rev")+'</div>';
  h+='<div class="xrow"><span>Enable</span>'+xBtn("xten",1,"ON",ws.drv.en)+xBtn("xten",0,"OFF",!ws.drv.en)+'</div>';
  h+='<p class="xnote xsmall">This teaching driver includes a same-side interlock and flyback protection. Real drivers differ; check their datasheets.</p>';
 }else{
  h+='<div class="xgrid2">'+[["ul","S1 top-left"],["ur","S3 top-right"],["ll","S2 bottom-left"],["lr","S4 bottom-right"]].map(function(k){return xBtn("xtsw",k[0],k[1]+(ws.sw[k[0]]?" · ON":" · off"),ws.sw[k[0]])}).join("")+'</div>';
 }
 return h;
}

/* final challenge board */
function wFinal(ws){
 var c=ws,tr=XTM.TR[c.t],stall=XTM.K.vm/XTM.K.rm;
 var r=XTM.motor({sig:true,rb:c.rb,ground:c.ground,diode:c.diode,load:"loaded",t:tr});
 var pw=XTM.pwm(c.duty),spin=r.ok?pw.speed:0;
 var svg=xSvg(xCircuit({kind:"motor",on:r.ok,sig:true,rb:c.rb,res:{spin:spin},ground:c.ground,diode:c.diode,open:null}),"Motor control board to repair");
 var h=svg;
 if(ws.results){
  h+='<div class="card xres"><b>Test results</b>';
  ws.results.forEach(function(x){h+='<p class="xrowr '+(x.ok?"ok":"bad")+'"><span>'+(x.ok?ICONS.check:"✗")+'</span><span><b>'+esc(x.name)+'.</b> '+esc(x.ok?x.good:x.bad)+'</span></p>'});
  h+='</div>';
 }
 return h;
}
function wFinalCtl(ws){
 var h='<p class="xnote"><b>Spec:</b> the motor must run when the signal is HIGH, survive switching off, handle a stall, and run at about half speed using PWM.</p>';
 h+='<div class="xrow"><span>Transistor</span>'+["T1","T2"].map(function(k){return xBtn("xttr",k,k+": "+XTM.TR[k].desc,ws.t===k)}).join("")+'</div>';
 h+='<div class="xrow"><span>Base resistor</span>'+[0,220,1000,47000].map(function(r){return xBtn("xtrb",r,r?xRbLabel(r):"None",ws.rb===r)}).join("")+'</div>';
 h+='<div class="xrow"><span>Flyback diode</span>'+[["none","None"],["wrong","Cathode to ground"],["good","Cathode to +6 V"]].map(function(k){return xBtn("xtdio",k[0],k[1],ws.diode===k[0])}).join("")+'</div>';
 h+='<div class="xrow"><span>Ground link</span>'+xBtn("xtgnd",1,"Connected",ws.ground)+xBtn("xtgnd",0,"Not connected",!ws.ground)+'</div>';
 h+='<label class="xrow xcol"><span>PWM duty: <b id="xtdv">'+ws.duty+'%</b></span><input type="range" id="xtduty" min="0" max="100" step="5" value="'+ws.duty+'" aria-label="PWM duty percent"></label>';
 h+='<div class="xrow"><button class="btn" data-act="xttest">Test the circuit</button><button class="btn ghost small" data-act="xtreset">Reset board</button></div>';
 return h;
}

/* pin quiz (lesson 1) */
function wPin(ws){
 var tasks=ws.order,cur=ws.n<3?tasks[ws.n]:null,names={b:"BASE",c:"COLLECTOR",e:"EMITTER"};
 var x=170,y=120,s='<circle cx="'+x+'" cy="'+y+'" r="27" class="xpart xcirc"/>';
 s+='<path d="M'+(x-40)+' '+y+'H'+(x-9)+'M'+(x-9)+' '+(y-15)+'V'+(y+15)+'M'+(x-9)+' '+(y-6)+'L'+(x+14)+' '+(y-20)+'V'+(y-40)+'M'+(x-9)+' '+(y+6)+'L'+(x+14)+' '+(y+20)+'V'+(y+40)+'" class="xsym"/>';
 s+='<path d="M'+(x+14)+' '+(y+20)+'L'+(x+4.3)+' '+(y+18.6)+'L'+(x+8.5)+' '+(y+11.8)+'Z" class="xarrow"/>';
 var pts={b:[x-40,y],c:[x+14,y-40],e:[x+14,y+40]};
 ["b","c","e"].forEach(function(k){
  var done=ws.got[k],p=pts[k];
  s+='<g role="button" tabindex="0" aria-label="'+({b:'Left lead',c:'Upper lead',e:'Lower lead'})[k]+'" class="xpin'+(done?' xdone':'')+'" data-act="xtpin" data-id="'+k+'"><circle cx="'+p[0]+'" cy="'+p[1]+'" r="22" class="xhit"/><circle cx="'+p[0]+'" cy="'+p[1]+'" r="6" class="xdot"/>'+(done?xT(p[0]+(k==="b"?-12:12),p[1]+(k==="b"?-14:(k==="c"?-8:16)),names[k],k==="b"?"end":"start","xhi"):"")+'</g>';
 });
 s+=xT(14,30,cur?'Tap the '+names[cur]+' lead':'All three found!','start','xbig');
 if(ws.wrong)s+=xT(14,50,'Not that one. Try again.','start','xwarn');
 return xSvg(s,"NPN transistor symbol: tap the lead")+'<p class="xnote">The symbol shows what each lead does. A real part in a black plastic package has three legs in an order that depends on the part.</p>';
}

/* fault finder (lesson 3) */
var XFAULTS=[
 {id:"nobase",title:"Fault 1: the LED flashes brightly, then the signal pin gets hot",o:{sig:true,rb:0},
  meter:"Meter: base voltage 0.7 V. The signal source is trying to push a very large current.",
  diag:["The signal goes straight to the base with no resistor","The LED is wired backwards","The supply voltage is too low"],dright:0,
  fix:["Put a base resistor (about 1 kΩ) in series with the base","Remove the LED resistor","Use a bigger battery"],fright:0,
  why:"A transistor base behaves like a diode. Nothing but the signal pin limits its current, so a series base resistor is needed."},
 {id:"open",title:"Fault 2: the signal is HIGH but the LED never lights",o:{sig:true,rb:1000,open:"emitter"},
  meter:"Meter: collector voltage 5.0 V (no current in the LED or its resistor). The emitter lead is floating.",
  diag:["The emitter has no connection to ground","The base resistor is too small","The LED resistor is too big"],dright:0,
  fix:["Connect the emitter to ground","Remove the base resistor","Swap the LED for a different one"],fright:0,
  why:"Current needs a complete loop: supply, LED, collector, emitter, ground. An open emitter breaks the loop."},
 {id:"swap",title:"Fault 3: the LED is weak and does not get bright",o:{sig:true,rb:1000,swapped:true},
  meter:"Meter: LED current about 5 mA instead of the expected 8.5 mA.",
  diag:["Collector and emitter are swapped","The signal voltage is too high","The LED resistor is missing"],dright:0,
  fix:["Rewire so the LED side goes to the collector and the grounded side to the emitter","Add a second LED","Make the base resistor 10 Ω"],fright:0,
  why:"The transistor is not symmetrical. Used backwards it passes some current but with very low gain."}
];
function wFault(ws){
 var f=XFAULTS[ws.n],fixed=ws.stage==="fixed";
 var o=fixed?{sig:true,rb:f.id==="nobase"?1000:1000}:f.o;
 var r=XTM.led(o);
 var on=r.ic>0||r.state==="OVERDRIVEN";
 var svg=xSvg(xCircuit({kind:"led",on:on,sig:true,rb:o.rb,res:r,flip:!!o.swapped,open:o.open}),"Faulty transistor circuit");
 var h='<p class="xnote"><b>'+esc(fixed?"Repaired circuit":f.title)+'</b></p>'+svg;
 if(!fixed)h+='<p class="xnote">'+esc(f.meter)+'</p>';
 if(ws.msg)h+='<p class="xnote '+(ws.msgBad?"xwarnp":"xgoodp")+'">'+esc(ws.msg)+'</p>';
 if(fixed)h+='<p class="xnote xgoodp">'+esc(f.why)+'</p><button class="btn" data-act="xtfnext">'+(ws.n<2?"Next fault":"Finish repairs")+'</button>';
 else{
  var list=ws.stage==="diag"?f.diag:f.fix,right=ws.stage==="diag"?f.dright:f.fright;
  h+='<p class="xq">'+(ws.stage==="diag"?"What is wrong?":"How do you repair it?")+'</p><div class="xopts">';
  xShuffle(list,ws.n*7+(ws.stage==="diag"?1:2)).forEach(function(it){h+='<button class="btn ghost xopt" data-act="xtfopt" data-id="'+it.i+'">'+esc(it.x)+'</button>'});
  h+='</div>';
 }
 return h;
}

/* ---------- lessons ---------- */
function xtPic1(){
 var x=170,y=110,s='<circle cx="'+x+'" cy="'+y+'" r="27" class="xpart xcirc"/>';
 s+='<path d="M'+(x-60)+' '+y+'H'+(x-9)+'M'+(x-9)+' '+(y-15)+'V'+(y+15)+'M'+(x-9)+' '+(y-6)+'L'+(x+14)+' '+(y-20)+'V'+(y-60)+'M'+(x-9)+' '+(y+6)+'L'+(x+14)+' '+(y+20)+'V'+(y+60)+'" class="xsym"/>';
 s+='<path d="M'+(x+14)+' '+(y+20)+'L'+(x+4.3)+' '+(y+18.6)+'L'+(x+8.5)+' '+(y+11.8)+'Z" class="xarrow"/>';
 s+=xT(x-64,y-6,'BASE','end','xlead')+xT(x-64,y+10,'small control','end','xsmall')+xT(x+20,y-54,'COLLECTOR','start','xlead')+xT(x+20,y-42,'big current in','start','xsmall')+xT(x+20,y+66,'EMITTER','start','xlead')+xT(x+20,y+78,'big current out','start','xsmall');
 s+='<path d="M'+(x+34)+' '+(y-28)+'V'+(y+28)+'" class="xdir" opacity=".0"/>';
 return xSvg(s,"NPN transistor symbol with base, collector and emitter");
}
function mkA(q,right,wrong,why){return {k:"ask",q:q,opts:[right].concat(wrong),why:why}}
var XLES=[
 {id:"xt1",title:"Meet the transistor",learn:"An NPN transistor is a switch controlled by a small current into its base. Current can then flow from collector to emitter. Which leg is which depends on the part, so check the datasheet.",steps:[
  {k:"read",t:"A switch worked by electricity",p:["A transistor lets a small electrical signal control a much bigger flow of current. That is how one tiny chip pin can start a motor.","An NPN transistor has three leads. The BASE is the control lead. The COLLECTOR is where the big current comes in. The EMITTER is where it leaves, usually toward ground.","A small current into the base lets a much larger current flow from collector to emitter. No base current means no collector current."],pic:xtPic1},
  {k:"bench",w:"pin",task:function(ws){return [{done:ws.n>0,text:"Find the "+(ws.n>0?"first":"first")+" lead"},{done:ws.n>1,text:"Find the second lead"},{done:ws.n>2,text:"Find the third lead"}]},
   init:function(){return {order:xShuffle(["b","c","e"],5).map(function(o){return o.x}),n:0,got:{},wrong:false}},ok:function(ws){return ws.n>=3}},
  mkA("Which lead do you connect the small control signal to?","The base",["The collector","The emitter"],"The base is the control lead."),
  mkA("A real transistor is a tiny black package with three legs. How do you know which leg is which?","Check the part's datasheet",["They are always base, collector, emitter from left to right","The color of the plastic tells you"],"Pin order is different from part to part. The symbol shows the roles, not the physical order."),
  mkA("With no current flowing into the base, an NPN transistor...","Blocks the collector current (off)",["Lets the full current through","Makes its own current"],"No base current, no collector current.")
 ]},
 {id:"xt2",title:"Switch an LED",learn:"A base resistor limits base current. Enough base current turns the transistor fully on. Too little leaves it partly on. The LED has its own resistor to limit LED current.",steps:[
  {k:"read",t:"Two resistors, two jobs",p:["Here a 3.3 V signal switches an LED on a 5 V supply. The base resistor limits how much current goes into the base. The 330 Ω resistor by the LED limits how much current goes through the LED.","When the signal is HIGH, current flows into the base and the transistor turns on, letting the LED current flow. When the signal is LOW, nothing flows and the LED goes dark.","Teaching model: the transistor has a gain of about 100 and drops about 0.7 V between base and emitter. Real parts vary."]},
  {k:"bench",w:"led",task:function(ws){var s=ws.seen||{};return [{done:!!s.full,text:"Turn the signal HIGH with a 1 kΩ base resistor and see the LED shine"},{done:!!s.dim,text:"Pick a much larger base resistor and find a setting where the LED is dim"},{done:!!s.off,text:"Turn the signal LOW and watch the LED go dark"}]},
   init:function(){return {sig:false,rb:1000,seen:{}}},ok:function(ws){return ws.seen.full&&ws.seen.dim&&ws.seen.off}},
  mkA("What happens to the LED if you choose a 1 MΩ base resistor?","It is very dim or off, because the base current is tiny",["It is extra bright","It burns out","Nothing changes"],"The collector current can only be about 100 times the base current. A tiny base current limits the LED."),
  mkA("What does the base resistor protect?","It limits the base current",["It makes the LED brighter","It stores energy","It reverses the signal"],"The base is like a diode. Without a series resistor it would try to draw far too much current."),
  mkA("What does the resistor next to the LED do?","Limits the LED's current",["Switches the transistor","Gives the signal more voltage","Nothing"],"An LED has almost no resistance of its own, so a resistor sets its current.")
 ]},
 {id:"xt3",title:"Diagnose a transistor circuit",learn:"Think about the loop: a base resistor to limit base current, a complete path from collector through emitter to ground, and the transistor the right way round.",steps:[
  {k:"read",t:"Be a circuit detective",p:["Three LED circuits have been built wrong. For each one, read the symptom and the meter reading, then pick the real fault, then pick the repair.","Remember the checklist: a base resistor, a complete path to ground, and the collector and emitter on the correct sides."]},
  {k:"bench",w:"fault",task:function(ws){return [{done:ws.n>0,text:"Fault 1"},{done:ws.n>1,text:"Fault 2"},{done:ws.n>2,text:"Fault 3"}]},
   init:function(){return {n:0,stage:"diag",msg:"",msgBad:false}},ok:function(ws){return ws.n>=3}},
  mkA("Which of these always stops a transistor switch from working?","A broken path from the emitter to ground",["A 1 kΩ base resistor","An LED resistor","A 3.3 V signal"],"The collector-to-emitter current needs a complete loop back to the supply's ground.")
 ]},
 {id:"xt4",title:"Control a motor",learn:"A pin controls a transistor and the transistor switches the motor's own supply. The grounds must be shared, the base resistor sets base current, the diode waits across the motor, and stall current can be several times running current.",steps:[
  {k:"read",t:"Let the transistor do the heavy work",p:["A motor needs far more current than a chip pin can give. So the pin controls a transistor, and the transistor switches the motor's own power supply.","Here the transistor sits between the motor and ground (a low-side switch). The motor connects to +6 V and the transistor completes the path to ground.","The signal and the motor supply must share a ground. That common ground gives the base current a path home.","In this simplified model, 220 Ω gives about 12 mA of base current and turns the motor on. In real hardware, ordinary current gain does not guarantee a fully-on switch. Check the datasheet saturation test currents and the control pin rating; a driver stage may be needed.","The diode across the motor is a flyback diode. Its bar (cathode) faces +6 V, so while the motor runs it is reverse-biased and does nothing. The next lesson shows why it is there.","Motors draw the most current when they start or are blocked (a stall). Here that is about 600 mA, more than this small transistor is rated for."]},
  {k:"bench",w:"motor",task:function(ws){var s=ws.seen||{};return [{done:!!s.spin,text:"Make the motor spin. If nothing happens, find out why"},{done:!!s.stall,text:"Set the load to Stalled and read the current"}]},
   init:function(){return {sig:false,ground:false,load:"free",seen:{}}},ok:function(ws){return ws.seen.spin&&ws.seen.stall}},
  mkA("Why must the signal's ground and the motor supply's ground be connected?","So the base current has a complete path and the transistor can turn on",["So the motor gets more voltage","Only to make the wiring neat"],"Voltages are measured against a shared ground. Without it the base current has no way home."),
  mkA("Why not connect the motor straight to the chip pin?","A pin can only supply a few milliamps, but a motor needs hundreds",["Motors only work on 3.3 V","The pin would make the motor spin backwards"],"The transistor lets a small pin current control a much larger motor current."),
  mkA("When does a motor draw the most current?","When starting up or when it is blocked (stalled)",["When it spins freely","When it is switched off"],"A spinning motor generates a back voltage that reduces its current. A blocked one does not."),
  mkA("While the motor is running normally, the flyback diode...","Is reverse-biased and does nothing",["Carries most of the motor current","Reverses the motor"],"Its cathode faces +6 V, so it blocks current until the motor is switched off.")
 ]},
 {id:"xt5",title:"Discover the flyback diode",learn:"A motor is a coil. When its current is cut suddenly, the coil forces the current to keep flowing and the voltage spikes. A diode across the motor gives that current a safe loop.",steps:[
  {k:"read",t:"The spike",p:["A motor contains coils of wire. A coil resists any sudden change in its current. When the transistor switches off, the coil pushes to keep the current going, and the voltage at the transistor jumps.","Without protection that spike can be many times the supply voltage and can destroy the transistor. A flyback diode gives the current a loop to circulate and fade."]},
  {k:"bench",w:"spike",task:function(ws){var r=ws.ran||{};return [{done:!!r.none,text:"Switch OFF with no diode and watch the voltage"},{done:!!r.good,text:"Switch OFF with the diode across the motor"}]},
   init:function(){return {diode:"none",show:null,ran:{}}},ok:function(ws){return ws.ran.none&&ws.ran.good}},
  mkA("Why does the voltage spike when the motor is switched off?","The motor's coil keeps pushing current when it is suddenly cut off",["The battery gets stronger","The transistor makes extra voltage"],"A coil's magnetic field collapses and drives the current onward."),
  mkA("Which way does the flyback diode point?","Bar (cathode) toward +supply, so it is reverse-biased while running",["Bar toward ground","It does not matter"],"If it is backwards it conducts during normal running and shorts the supply."),
  mkA("What does the diode do at the moment of switch-off?","Gives the motor current a safe loop to flow around",["Stops the current instantly","Boosts the motor voltage"],"The current circulates through the motor and diode and slowly fades.")
 ]},
 {id:"xt6",title:"Change motor speed with PWM",learn:"PWM switches the motor fully on and off very fast. Duty cycle is the fraction of each period the signal is on. The pulses stay full height; the average changes.",steps:[
  {k:"read",t:"Fast on, fast off",p:["To change speed, switch the transistor fully on and fully off many times per second. This is PWM, pulse width modulation.","Duty cycle is the percentage of each period that the signal is ON. At 25% duty the motor is powered a quarter of the time.","The pulses are still the full supply voltage. PWM changes how long they last, not how tall they are. The motor responds roughly to the average."]},
  {k:"bench",w:"pwm",task:function(ws){var s=ws.seen||{};return [{done:!!s.zero,text:"Set the duty to 0% (always off)"},{done:!!s.full,text:"Set the duty to 100% (always on)"},{done:!!s.mid,text:"Find a duty between 25% and 75% and watch the speed"}]},
   init:function(){return {duty:50,seen:{}}},ok:function(ws){return ws.seen.zero&&ws.seen.full&&ws.seen.mid}},
  mkA("What does PWM change?","How long the signal is on in each period",["The voltage of each pulse","The color of the wires"],"The pulses stay the same height. Duty cycle changes their width."),
  mkA("At 50% duty from a 6 V supply, the average voltage is about...","3 V",["6 V","12 V"],"Half the time at 6 V, half at 0 V, averages to about 3 V."),
  mkA("Why is PWM better than slowing a motor with a resistor?","The transistor is either fully on or fully off, so little power is wasted as heat",["Resistors cannot slow motors","PWM makes motors stronger"],"A resistor in series burns away the extra power as heat.")
 ]},
 {id:"xt7",title:"Reverse direction",learn:"A single low-side transistor can start and stop a motor but cannot reverse it. An H-bridge swaps which motor lead goes to + and which to ground. Never turn on both switches on one side.",steps:[
  {k:"read",t:"Swap the current path",p:["A single low-side transistor only sends current one way: from +supply, through the motor, to ground. It can start and stop the motor but it cannot reverse it.","To reverse, swap which motor lead connects to + and which connects to ground. An H-bridge does this with four switches around the motor.","Forward: S1 and S4 on. Reverse: S3 and S2 on. If both switches on the same side are on (S1 with S2, or S3 with S4), the supply is shorted through them. That is called shoot-through.","A suitable motor driver handles the switches and may include protection and an interlock. This teaching driver includes both. Real modules differ; check their datasheets."]},
  {k:"bench",w:"bridge",task:function(ws){var s=ws.seen||{};return [{done:!!s.fwd,text:"By hand: make the motor go forward (S1 and S4)"},{done:!!s.rev,text:"By hand: make it reverse (S3 and S2)"},{done:!!s.shoot,text:"Request S1 and S2 together and see the interlock block the short"},{done:!!(s.dfwd&&s.drev),text:"Driver module: run it forward and then reverse"}]},
   init:function(){return {mode:"manual",sw:{ul:0,ll:0,ur:0,lr:0},drv:{dir:"fwd",en:false},seen:{}}},ok:function(ws){return ws.seen.fwd&&ws.seen.rev&&ws.seen.shoot&&ws.seen.dfwd&&ws.seen.drev}},
  mkA("Why can't one low-side transistor reverse a motor?","Current can only flow one way through the motor",["Transistors are too weak","The motor would melt"],"Reversing needs the + and ground connections swapped, which an H-bridge can do."),
  mkA("What is shoot-through?","Both switches on one side are on, shorting the supply to ground",["A motor spinning too fast","A very fast PWM signal"],"Current goes straight through the two switches and skips the motor."),
  mkA("What does our teaching motor driver add?","The four switches, protection and an interlock that stops shoot-through",["A bigger battery","A faster motor"],"The interlock in this teaching driver blocks both switches on one side from conducting together.")
 ]},
 {id:"xt8",title:"Final challenge: protect the motor",learn:"A good motor circuit has a shared ground, a base resistor that keeps the transistor fully on, a flyback diode, a transistor and driver checked for stall current and heating, and PWM for speed. Real designs also depend on datasheets.",steps:[
  {k:"read",t:"Repair the board",p:["A motor control board has been built with several mistakes. Repair it so it meets the spec. Press Test the circuit to see which checks pass and why.","Use what you learned: common ground, base resistor, flyback diode direction, transistor rating versus stall current, and PWM for speed."]},
  {k:"bench",w:"final",task:function(ws){return [{done:!!ws.passed,text:"Pass all five checks"}]},
   init:function(){return {t:"T1",rb:0,diode:"none",ground:false,duty:100,results:null,passed:false}},ok:function(ws){return ws.passed}},
  {k:"read",t:"What this model leaves out",p:["These are teaching models with simple numbers. Real transistor gain changes with current and temperature. Real motors differ, and wires and PWM speed change what the spikes look like.","Transistors also get hot, and big motors need bigger parts. Never choose parts from these numbers. Always read the datasheet for the real part and ask a leader before building with real power."]}
 ]}
];

/* ---------- engine ---------- */
function xtOpen(id){
 var L=XLES.find(function(l){return l.id===id}),p=me();
 if(!L||!p)return;
 if(v.s==="xt"&&v.xt)xtSaveFor(v.xt);
 v.xt={id:id,L:L,i:0,ws:[],ans:null,fin:false,xp:0,ownerId:db.active,wasDone:!!(p&&p.done&&p.done[id]),cleared:{}};
 v.s="xt";v.subj="lab";p.lastSubj="lab";xtEnter(0);
 var d=p.drafts&&p.drafts['xt:'+id];
 if(d&&!d.finished&&Array.isArray(d.ws)&&d.ws.length<=L.steps.length){
  v.xt.ws=L.steps.map(function(st,i){return st.k==='bench'?xtClean(st,d.ws[i]):null});
  v.xt.i=Math.max(0,Math.min(L.steps.length-1,Number.isInteger(d.i)?d.i:0));
  v.xt.cleared=d.cleared&&typeof d.cleared==='object'?d.cleared:{};
 }
 save();
}
function xtStep(S){return S.L.steps[S.i]}
function xtEnter(i){
 var S=v.xt;S.i=i;S.ans=null;
 var st=xtStep(S);
 if(st.k==="bench"&&!S.ws[i]){S.ws[i]=st.init()}
}
function xtOk(S){
 var st=xtStep(S);
 if(st.k==="read")return true;
 if(st.k==="ask")return !!(S.ans&&S.ans.right);
 return !!st.ok(S.ws[S.i]);
}
function xtSeen(ws,w){
 var s=ws.seen;if(!s)return;
 if(w==="led"){
  var r=XTM.led({sig:ws.sig,rb:ws.rb});
  if(ws.sig&&r.state.indexOf("SATURATED")===0&&ws.rb===1000)s.full=true;
  if(ws.sig&&r.ic>0&&r.bright<0.6)s.dim=true;
  if(!ws.sig&&(s.full||s.dim))s.off=true;
 }else if(w==="motor"){
  var m=XTM.motor({sig:ws.sig,rb:220,ground:ws.ground,diode:"good",load:ws.load,t:XTM.TR.T1});
  if(ws.sig&&ws.ground&&ws.load==="free"&&m.ok)s.spin=true;
  if(ws.sig&&ws.ground&&ws.load==="stalled")s.stall=true;
 }else if(w==="pwm"){
  if(ws.duty===0)s.zero=true;
  if(ws.duty===100)s.full=true;
  if(ws.duty>=25&&ws.duty<=75)s.mid=true;
 }else if(w==="bridge"){
  if(ws.mode==="driver"){
   if(ws.drv.en&&ws.drv.dir==="fwd")s.dfwd=true;
   if(ws.drv.en&&ws.drv.dir==="rev")s.drev=true;
  }else{
   var b=XTM.bridge(ws.sw);
   if(b.state==="fwd")s.fwd=true;if(b.state==="rev")s.rev=true;if(b.state==="shoot")s.shoot=true;
  }
 }
}
function xtWidget(S){
 var st=xtStep(S),ws=S.ws[S.i],w=st.w;
 if(w==="pin")return {ctl:"",disp:wPin(ws)};
 if(w==="led")return {ctl:wLedCtl(ws),disp:wLed(ws)};
 if(w==="fault")return {ctl:"",disp:ws.n>=3?'<p class="xnote xgoodp">All three circuits repaired.</p>':wFault(ws)};
 if(w==="motor")return {ctl:wMotorCtl(ws),disp:wMotor(ws)};
 if(w==="spike")return {ctl:wSpikeCtl(ws),disp:wSpike(ws)};
 if(w==="pwm")return {ctl:wPwmCtl(ws),disp:wPwm(ws)};
 if(w==="bridge")return {ctl:wBridgeCtl(ws),disp:wBridge(ws)};
 if(w==="final")return {ctl:wFinalCtl(ws),disp:wFinal(ws)};
 return {ctl:"",disp:""};
}
function xtTaskHtml(S){
 var st=xtStep(S),ws=S.ws[S.i],h='<ul class="xtask" id="xttask">';
 st.task(ws).forEach(function(t){h+='<li><span>'+(t.done?ICONS.check:"○")+'</span>'+esc(t.text)+'</li>'});
 return h+'</ul>';
}
function vXt(){
 var S=v.xt,L=S.L,st=xtStep(S),n=L.steps.length;
 var h='<div class="wrap xt" style="--c:#0E7C86;--cd:#095159"><div class="pathhead"><button class="back" data-act="back" aria-label="Back">'+ICONS.back+'</button><div><h2>'+esc(L.title)+'</h2><p class="muted" style="font-size:14px;font-weight:600">Transistor Lab · step '+(S.i+1)+' of '+n+'</p></div></div>';
 h+='<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="'+n+'" aria-valuenow="'+S.i+'"><i style="width:'+(S.i/n*100)+'%"></i></div>';
 if(st.k==="read"){
  h+='<div class="card"><h3 style="margin:0 0 8px">'+esc(st.t)+'</h3>';
  st.p.forEach(function(p){h+='<p>'+esc(p)+'</p>'});
  if(st.pic)h+=st.pic();
  h+='</div>';
 }else if(st.k==="ask"){
  h+='<p class="xq">'+esc(st.q)+'</p><div class="xopts">';
  xShuffle(st.opts,S.i*13+S.L.id.length+5).forEach(function(o){
   var sel=S.ans&&S.ans.i===o.i,cls=sel?(S.ans.right?" right":" wrong"):"";
   h+='<button class="btn ghost xopt'+cls+'" data-act="xtans" data-id="'+o.i+'"'+(S.ans&&S.ans.right?' disabled':'')+'>'+esc(o.x)+'</button>';
  });
  h+='</div>';
  if(S.ans)h+='<p class="xnote '+(S.ans.right?"xgoodp":"xwarnp")+'">'+(S.ans.right?"Right. "+esc(st.why):"Not quite. Think about it and try another answer.")+'</p>';
 }else{
  var W=xtWidget(S);
  h+='<div class="card"><b>Your task</b>'+xtTaskHtml(S)+'</div>'+W.ctl+'<div id="xtd">'+W.disp+'</div>';
 }
 var last=S.i===n-1;
 h+='<div class="xnav">'+(S.i>0?'<button class="btn ghost" data-act="xtprev">Back</button>':'')+'<button class="btn" id="xtnext" data-act="xtnext"'+(xtOk(S)?'':' disabled')+'>'+(last?'Finish':'Next')+'</button></div>';
 h+='<button class="btn ghost small" data-act="xtrestart">Start this lesson over</button>';
 h+='<p class="muted" style="font-size:12px;font-weight:600;margin:0 0 90px">Teaching models with simple numbers. Not for choosing real parts. Check datasheets.</p></div>';
 if(S.fin)h+='<div class="foot good"><div class="in"><h3>Lesson complete'+(S.xp?" · +"+S.xp+" XP":"")+'</h3><p>'+esc(L.learn)+'</p><button class="btn" data-act="xtdone">Continue</button></div></div>';
 return h;
}
function xtRefresh(){
 var S=v.xt;if(!S)return;
 var st=xtStep(S);
 if(st.k==="bench"){
  var W=xtWidget(S),d=document.getElementById("xtd");
  if(d)d.innerHTML=W.disp;
  var t=document.getElementById("xttask");if(t)t.outerHTML=xtTaskHtml(S);
  var nx=document.getElementById("xtnext");if(nx)nx.disabled=!xtOk(S);
 }
}
function xtInput(el){
 var S=v.xt;if(!S||S.ownerId!==db.active||v.s!=="xt")return;
 var st=xtStep(S),ws=S.ws[S.i];
 if(el.id!=="xtduty"||!ws||ws.duty===undefined)return;
 ws.duty=parseInt(el.value,10);
 var dv=document.getElementById("xtdv");if(dv)dv.textContent=ws.duty+"%";
 if(st.w==="final"){ws.results=null;ws.passed=false}
 xtSeen(ws,st.w);xtSaveFor(S);xtRefresh();
}
function xtClick(a,id,el){
 var S=v.xt;if(!S||v.s!=="xt"||S.ownerId!==db.active)return false;
 var st=xtStep(S),ws=S.ws[S.i],w=st.w;
 switch(a){
  case "xtrestart":{var p=me();if(p&&p.drafts)delete p.drafts['xt:'+S.id];var restart=S.id;v.xt=null;xtOpen(restart);return true}
  case "xtnext":
   if(S.fin||!xtOk(S))return true;
   S.cleared[S.i]=true;
   if(S.i===S.L.steps.length-1){
    var p=me();if(!S.L.steps.every(function(st,i){return !!S.cleared[i]}))return true;S.xp=p&&!p.done[S.id]?awardLab(S.id):0;S.fin=true;xtSaveFor(S);
   }else xtEnter(S.i+1);
   return true;
  case "xtprev":if(S.i>0)xtEnter(S.i-1);return true;
  case "xtdone":v.s="path";return true;
  case "xtans":
   if(S.ans&&S.ans.right)return true;
   var k=parseInt(id,10);S.ans={i:k,right:k===0};return true;
 }
 if(!ws)return false;
 switch(a){
  case "xtpin":
   if(ws.n<3){if(id===ws.order[ws.n]){ws.got[id]=1;ws.n++;ws.wrong=false}else ws.wrong=true}
   return true;
  case "xtsig":ws.sig=id==="1";break;
  case "xtrb":ws.rb=parseInt(id,10);break;
  case "xtgnd":ws.ground=id==="1";break;
  case "xtload":ws.load=id;break;
  case "xtdio":ws.diode=id;if(w==="spike")ws.show=null;break;
  case "xtoff":ws.show=ws.diode;ws.ran[ws.diode]=true;break;
  case "xtdset":ws.duty=parseInt(id,10);break;
  case "xttr":ws.t=id;break;
  case "xtmode":ws.mode=id;break;
  case "xtdir":ws.drv.dir=id;break;
  case "xten":ws.drv.en=id==="1";break;
  case "xtsw":ws.sw[id]=ws.sw[id]?0:1;break;
  case "xtreset":ws.t="T1";ws.rb=0;ws.diode="none";ws.ground=false;ws.duty=100;ws.results=null;ws.passed=false;return true;
  case "xttest":
   ws.results=XTM.final(ws);ws.passed=ws.results.every(function(r){return r.ok});return true;
  case "xtfopt":{
   var f=XFAULTS[ws.n],k2=parseInt(id,10);
   if(ws.stage==="diag"){
    if(k2===f.dright){ws.stage="fix";ws.msg="Yes. Now choose the repair.";ws.msgBad=false}else{ws.msg="Not that one. Look at the symptom and the meter reading again.";ws.msgBad=true}
   }else if(ws.stage==="fix"){
    if(k2===f.fright){ws.stage="fixed";ws.msg="Repaired. The circuit now works.";ws.msgBad=false}else{ws.msg="That would not fix it. Think about what the circuit is missing.";ws.msgBad=true}
   }
   return true}
  case "xtfnext":ws.n++;ws.stage="diag";ws.msg="";return true;
  default:return false;
 }
 if(w==="final"){ws.results=null;ws.passed=false}
 if(w==="pwm"||w==="led"||w==="motor"||w==="bridge")xtSeen(ws,w);
 return true;
}
(function(){
 var ls=SUBJECTS.find(function(s){return s.id==="lab"});
 if(!ls)return;
 XLES.forEach(function(l){ls.lessons.push({id:l.id,title:l.title,unit:"Transistors and motors",kind:"xt",open:true})});
})();

/* This achievement joins the existing unified cabinet. */
WORKSHOP_BADGES.push({id:'transistor',name:'Transistor tamer',goal:'Complete all eight Transistor Lab lessons.',target:8,icon:'bolt',ids:XLES.map(function(l){return l.id})});
if(window.ShopLab)Object.assign(window.ShopLab,{XTM:XTM,XLES:XLES,xtOpen:xtOpen,xtClick:xtClick,xtInput:xtInput,vXt:vXt,XFAULTS:XFAULTS});
function xtClean(st,raw){var d=st.init();if(!raw||typeof raw!=='object')return d;
 ['sig','ground','wrong'].forEach(function(k){if(typeof raw[k]==='boolean'&&k in d)d[k]=raw[k]});
 if('rb' in d&&[0,220,1000,10000,47000,100000,1000000].includes(raw.rb))d.rb=raw.rb;
 if('duty' in d&&Number.isFinite(raw.duty))d.duty=Math.max(0,Math.min(100,raw.duty));
 if('t' in d&&['T1','T2'].includes(raw.t))d.t=raw.t;
 if('diode' in d&&['none','good','wrong'].includes(raw.diode))d.diode=raw.diode;
 if('load' in d&&['free','loaded','stalled'].includes(raw.load))d.load=raw.load;
 ['seen','ran','got'].forEach(function(k){if(d[k]&&raw[k]&&typeof raw[k]==='object')Object.keys(raw[k]).filter(function(x){return /^[a-z]+$/i.test(x)&&x.length<20}).forEach(function(x){d[k][x]=!!raw[k][x]})});
 if('n' in d&&Number.isInteger(raw.n))d.n=Math.max(0,Math.min(3,raw.n));
 if('stage' in d&&['diag','fix','fixed'].includes(raw.stage))d.stage=raw.stage;
 if('mode' in d&&['manual','driver'].includes(raw.mode))d.mode=raw.mode;
 if(d.sw&&raw.sw)['ul','ll','ur','lr'].forEach(function(k){d.sw[k]=raw.sw[k]?1:0});
 if(d.drv&&raw.drv)d.drv={dir:raw.drv.dir==='rev'?'rev':'fwd',en:!!raw.drv.en};
 // Recompute the final test; never trust a saved pass flag or results object.
 if(st.w==='final'){d.results=null;d.passed=false}
 return d;
}
function xtSaveFor(S){var p=S&&db.profiles.find(function(p){return p.id===S.ownerId});if(!p)return;p.drafts=p.drafts||{};p.drafts['xt:'+S.id]=JSON.parse(JSON.stringify({i:S.i,ws:S.ws,cleared:S.cleared,finished:!!S.fin}));save()}
var checkpointBeforeTransistor=checkpoint;checkpoint=function(){if(v.s==='xt'&&v.xt&&v.xt.ownerId===db.active){xtSaveFor(v.xt);var p=me();p.resume={subj:'lab',kind:'xt',id:v.xt.id,title:v.xt.L.title};save();return}checkpointBeforeTransistor()};
var resumeBeforeTransistor=resumeWorkshop;resumeWorkshop=function(){var r=me()&&me().resume;if(r&&r.kind==='xt'){xtOpen(r.id);return}resumeBeforeTransistor()};
var renderBeforeTransistor=render;render=function(){if(v.s==='xt'&&v.xt&&v.xt.ownerId===db.active)xtSaveFor(v.xt);renderBeforeTransistor()};
if(window.ShopLab)Object.assign(window.ShopLab,{xtSaveFor:xtSaveFor,xtClean:xtClean,checkpoint:checkpoint,resumeWorkshop:resumeWorkshop,xtOk:xtOk});
document.addEventListener('keydown',function(e){if(v.s!=='xt'||!['Enter',' '].includes(e.key))return;var el=e.target.closest&&e.target.closest('[data-act="xtpin"]');if(!el)return;e.preventDefault();xtClick('xtpin',el.dataset.id,el);render()});
var pathBeforeTransistor=vPath;vPath=function(){var h=pathBeforeTransistor();if(v.subj!=='lab')return h;return h.replace('</section><div class="path">','<button data-act="lesson" data-id="xt1"><span class="ds-portal-icon">'+ICONS.bolt+'</span><span><small>SMALL SIGNAL, BIG JOB</small><b>Transistors &amp; motors</b><em>Eight guided lessons · start here</em></span><span>→</span></button></section><div class="path">')};
if(window.ShopLab)Object.assign(window.ShopLab,{vPath:vPath});
/* END TRANSISTOR MOTOR LAB */
