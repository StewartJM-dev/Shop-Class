/* BEGIN COMPUTER & ROBOTICS — original teaching models, no external execution.
   Kept together to allow clean merging with transistor/motor-control work.
   This source is embedded in index.html; no runtime fetch is required. */
var C8OPS={NOP:0,LDI:1,LDA:2,STA:3,ADD:4,SUB:5,JMP:6,JZ:7,JNZ:8,JC:9,OUT:10,HLT:11};
function c8Width(op){return ['NOP','OUT','HLT'].indexOf(op)>=0?1:2}
function c8Assemble(src){
 if(typeof src!=='string'||src.length>12000)throw Error('Keep programs under 12,000 characters.');
 var lines=src.split('\n'),labels={},items=[],pc=0,used={},ram=Array(256).fill(0);
 function number(s){if(/^0x[0-9a-f]+$/i.test(s))return parseInt(s,16);if(/^0b[01]+$/i.test(s))return parseInt(s.slice(2),2);if(/^\d+$/.test(s))return Number(s);if(Object.prototype.hasOwnProperty.call(labels,s))return labels[s];throw Error('Unknown number or label: '+s)}
 lines.forEach(function(raw,i){var t=raw.replace(/;.*/,'').trim().toUpperCase(),m=/^([A-Z_]\w*):/.exec(t);if(m){if(Object.prototype.hasOwnProperty.call(labels,m[1]))throw Error('Duplicate label on line '+(i+1));labels[m[1]]=pc;t=t.slice(m[0].length).trim()}if(!t)return;
 var words=t.split(/\s+/),op=words[0],args=words.slice(1);if(op==='.ORG'){if(args.length!==1||! /^(\d+|0X[0-9A-F]+|0B[01]+)$/.test(args[0]))throw Error('Use .ORG with one numeric address.');pc=number(args[0]);if(pc<0||pc>255)throw Error('Address must be 0–255.');return}
 if(op!=='.BYTE'&&!Object.prototype.hasOwnProperty.call(C8OPS,op))throw Error('Unknown instruction on line '+(i+1)+': '+op);
 var width=op==='.BYTE'?1:c8Width(op),want=op==='.BYTE'||width===2?1:0;if(args.length!==want)throw Error('Line '+(i+1)+': '+op+' needs '+want+' operand'+(want===1?'':'s')+'.');
 if(pc+width>256)throw Error('Program runs past address 255.');for(var j=0;j<width;j++){if(used[pc+j])throw Error('Memory overlaps at address '+(pc+j));used[pc+j]=true}items.push({at:pc,op:op,arg:args[0],line:i+1});pc+=width;
 });
 items.forEach(function(i){var n=i.arg===undefined?0:number(i.arg);if(!Number.isInteger(n)||n<0||n>255)throw Error('Line '+i.line+': bytes and addresses must be 0–255.');ram[i.at]=i.op==='.BYTE'?n:C8OPS[i.op];if(i.op!=='.BYTE'&&c8Width(i.op)===2)ram[i.at+1]=n});
 return {ram:ram,labels:labels};
}
function c8New(src){var a=c8Assemble(src);return {ram:a.ram,a:0,b:0,pc:0,mar:0,ir:0,operand:0,out:0,outputs:[],z:false,c:false,phase:'fetch',halt:false,clocks:0,instructions:0,bus:0,route:'Ready: one clock at a time.',trace:[],ops:{},taken:{},alu:null,error:''}}
function c8Clock(M){
 if(M.halt)return M;if(M.clocks>=3600){M.halt=true;M.error='Clock limit reached. Reset or revise the loop.';return M}M.clocks++;
 function bus(value,route){M.bus=value;M.route=route;M.trace.push(route+' = '+value);if(M.trace.length>6)M.trace.shift()}
 if(M.phase==='fetch'){M.mar=M.pc;M.ir=M.ram[M.pc];M.pc=(M.pc+1)&255;var op=Object.keys(C8OPS).find(function(k){return C8OPS[k]===M.ir});if(!op){M.halt=true;M.error='Unknown opcode '+M.ir+' at address '+M.mar;return M}M.op=op;M.phase=c8Width(op)===2?'operand':'execute';bus(M.ir,'RAM['+M.mar+'] → instruction register');return M}
 if(M.phase==='operand'){M.mar=M.pc;M.operand=M.ram[M.pc];M.pc=(M.pc+1)&255;M.phase='execute';bus(M.operand,'RAM['+M.mar+'] → operand latch');return M}
 var x=M.operand,n;M.instructions++;M.ops[M.op]=(M.ops[M.op]||0)+1;M.phase='fetch';
 switch(M.op){
 case 'LDI':M.a=x;bus(x,'Operand → A');break;
 case 'LDA':M.mar=x;M.a=M.ram[x];bus(M.a,'RAM['+x+'] → A');break;
 case 'STA':M.mar=x;M.ram[x]=M.a;bus(M.a,'A → RAM['+x+']');break;
 case 'ADD':M.mar=x;M.b=M.ram[x];n=M.a+M.b;M.alu={a:M.a,b:M.b,sum:n&255,carry:n>255};M.c=n>255;M.a=n&255;M.z=M.a===0;bus(M.a,'ALU: A + RAM['+x+'] → A');break;
 case 'SUB':M.mar=x;M.b=M.ram[x];n=M.a-M.b;M.c=n>=0;M.a=n&255;M.z=M.a===0;bus(M.a,'ALU: A − RAM['+x+'] → A (C = no borrow)');break;
 case 'JMP':M.pc=x;bus(x,'Jump target → PC');break;
 case 'JZ':case 'JNZ':case 'JC':var take=M.op==='JZ'?M.z:M.op==='JNZ'?!M.z:M.c;if(take){M.pc=x;M.taken[M.op]=(M.taken[M.op]||0)+1}bus(M.pc,take?'Condition true → PC':'Condition false: keep PC');break;
 case 'OUT':M.out=M.a;M.outputs.push(M.a);if(M.outputs.length>64)M.outputs.shift();bus(M.a,'A → output register');break;
 case 'HLT':M.halt=true;bus(M.a,'Clock stopped by HLT');break;
 default:bus(M.a,'NOP: no register change');
 }
 return M;
}
var C8MISSIONS=[
 {id:'c8-01',title:'Eight switches, one byte',unit:'8-bit Computer: Bits & registers',kind:'cpu8',open:true,goal:'Set the switches to decimal 42, then latch that byte into A.',learn:'Each switch contributes its labelled weight. A byte holds 0 through 255. The latch copies the eight input bits into register A.',start:'HLT',ok:function(S){return S.latched&&S.m.a===42&&S.input===42}},
 {id:'c8-02',title:'A register remembers',unit:'8-bit Computer: Bits & registers',kind:'cpu8',open:true,goal:'Latch 73 into A, then change the switches to 0 without latching again.',learn:'Input switches and a register are separate. Changing the input does not change a latched value.',start:'HLT',ok:function(S){return S.latched&&S.m.a===73&&S.input===0}},
 {id:'c8-03',title:'Build an addition',unit:'8-bit Computer: ALU & memory',kind:'cpu8',open:true,goal:'Output 12 by adding the byte at address 240 to A. Step through the ALU.',learn:'LDI loads an immediate value. ADD reads a byte from memory. OUT copies A to the output register. Each instruction is fetched before it executes.',start:'LDI 7\nADD 240\nOUT\nHLT\n.ORG 240\n.BYTE 0',solution:'LDI 7\nADD 240\nOUT\nHLT\n.ORG 240\n.BYTE 5',ok:function(S){return S.m.halt&&S.m.out===12&&S.m.alu&&S.m.alu.a===7&&S.m.alu.b===5}},
 {id:'c8-04',title:'Where did 256 go?',unit:'8-bit Computer: ALU & memory',kind:'cpu8',open:true,goal:'Add 10 to 250. Output 4 and set the carry flag.',learn:'The ninth bit does not fit in A. An 8-bit sum wraps modulo 256, and carry records overflow. Z records a zero arithmetic result.',start:'LDI 250\nADD 240\nOUT\nHLT\n.ORG 240\n.BYTE 0',solution:'LDI 250\nADD 240\nOUT\nHLT\n.ORG 240\n.BYTE 10',ok:function(S){return S.m.halt&&S.m.out===4&&S.m.c&&S.m.alu&&S.m.alu.a===250&&S.m.alu.b===10}},
 {id:'c8-05',title:'Put it in RAM',unit:'8-bit Computer: ALU & memory',kind:'cpu8',open:true,goal:'Store 42 at address 240, clear A, reload the saved byte and output it.',learn:'STA writes A to memory. LDA reads memory into A. RAM holds both instructions and data in this teaching computer.',start:'LDI 0\nSTA 240\nLDI 0\nLDA 240\nOUT\nHLT',solution:'LDI 42\nSTA 240\nLDI 0\nLDA 240\nOUT\nHLT',ok:function(S){return S.m.halt&&S.m.ram[240]===42&&S.m.out===42&&S.m.instructions>=6&&S.m.ops.STA&&S.m.ops.LDA}},
 {id:'c8-06',title:'Count down with a loop',unit:'8-bit Computer: Programs & decisions',kind:'cpu8',open:true,goal:'Output 3, 2, 1, 0, then halt. Fix the subtraction data byte.',learn:'SUB updates Z. JNZ jumps while Z is false. Labels name memory addresses; a branch changes the program counter.',start:'LDI 3\nLOOP: OUT\nSUB 240\nJNZ LOOP\nOUT\nHLT\n.ORG 240\n.BYTE 0',solution:'LDI 3\nLOOP: OUT\nSUB 240\nJNZ LOOP\nOUT\nHLT\n.ORG 240\n.BYTE 1',ok:function(S){return S.m.halt&&S.m.outputs.join(',')==='3,2,1,0'&&S.m.ops.SUB>=3&&S.m.taken.JNZ>=2}},
 {id:'c8-07',title:'Make a decision',unit:'8-bit Computer: Programs & decisions',kind:'cpu8',open:true,goal:'Make the subtraction result zero so JZ takes the YES branch and outputs 99.',learn:'This machine updates Z and C only on ADD and SUB. LDI, LDA and OUT leave the flags alone. SUB sets C when no borrow is needed.',start:'LDI 9\nSUB 240\nJZ YES\nLDI 0\nOUT\nHLT\nYES: LDI 99\nOUT\nHLT\n.ORG 240\n.BYTE 0',solution:'LDI 9\nSUB 240\nJZ YES\nLDI 0\nOUT\nHLT\nYES: LDI 99\nOUT\nHLT\n.ORG 240\n.BYTE 9',ok:function(S){return S.m.halt&&S.m.out===99&&S.m.z&&S.m.taken.JZ}}
];
// Plain-language teaching layer: IDs and mission checks stay unchanged.
var DISCOVERY_GUIDES={
 "c8-01": {
  "goal": "Make the computer remember the number 42.",
  "intro": "A switch can be off (0) or on (1). Its small number tells you how much it adds. Register A is a little box that remembers one number.",
  "steps": [
   "Find the eight switches below the computer. Turn off any switches that are on.",
   "Turn on 32, 8 and 2. The Input number should now be 42.",
   "Press Copy switches into A. Look at the large number in A."
  ],
  "notice": "32 + 8 + 2 = 42. You used three switches to make one number.",
  "hint": "Leave 128, 64, 16, 4 and 1 off. You do not need the program editor for this mission.",
  "words": [
   [
    "Bit",
    "One off/on value: 0 or 1."
   ],
   [
    "Byte",
    "A group of eight bits. It can hold a whole number from 0 to 255."
   ],
   [
    "Register",
    "A small storage box inside a computer. This one is named A."
   ]
  ]
 },
 "c8-02": {
  "goal": "Remember 73, even after the switches change.",
  "intro": "Copying a number into A makes it stay there. The switches can then change without changing the saved number.",
  "steps": [
   "Start with all switches off. Turn on 64, 8 and 1. Input should show 73.",
   "Press Copy switches into A. Check that A shows 73.",
   "Turn those three switches off again. Input should show 0. Do not press Copy again."
  ],
  "notice": "The switches show 0, but A still remembers 73. The copy button is what changes A.",
  "hint": "64 + 8 + 1 = 73. If A also becomes 0, start again: copy 73 once, then only change the switches.",
  "words": [
   [
    "Latch",
    "Copy an input value into a register so it stays there."
   ]
  ]
 },
 "c8-03": {
  "goal": "Get the computer to add 7 + 5 and show 12.",
  "intro": "A program is a list of instructions. This one already puts 7 in A. You will give it the missing number to add.",
  "steps": [
   "Find the Program box. At the bottom, change .BYTE 0 to .BYTE 5. Keep the other lines.",
   "Press Load program & reset. This puts your instructions and number into memory.",
   "Press Run one instruction a few times. Watch A become 7, then 12.",
   "Keep stepping until the computer shows HALTED. OUT should show 12."
  ],
  "notice": "ADD 240 means “add the number kept in memory box 240.” It does not mean add 240.",
  "hint": "The last two lines put 5 in memory box 240: .ORG 240 followed by .BYTE 5. OUT copies the answer from A to the lights.",
  "words": [
   [
    "RAM",
    "Numbered memory boxes holding instructions and numbers."
   ],
   [
    "ALU",
    "The part that does arithmetic, such as adding."
   ],
   [
    "OUT",
    "The output box: the number the computer shows you."
   ]
  ]
 },
 "c8-04": {
  "goal": "Find out what happens when an answer is too big.",
  "intro": "One byte can hold only 0 through 255. Adding 250 + 10 makes 260. The extra 256 goes into a carry signal, leaving 4 in A.",
  "steps": [
   "In the Program box, change the last line from .BYTE 0 to .BYTE 10.",
   "Press Load program & reset, then Run one instruction. A should become 250.",
   "Step again to add 10. Look for A = 4 and CARRY = 1.",
   "Keep stepping through OUT and HLT. The output should be 4."
  ],
  "notice": "The answer was not lost: 260 = 256 + 4. Carry tells you the sum went past 255.",
  "hint": "Open Inside the adder after the addition. The extra carry leaves the highest bit. Leave LDI 250 unchanged.",
  "words": [
   [
    "Carry",
    "An extra bit showing that an addition went past the largest byte value."
   ],
   [
    "Flag",
    "A small signal that records something about the last arithmetic result."
   ]
  ]
 },
 "c8-05": {
  "goal": "Save 42 in memory, clear A, then get 42 back.",
  "intro": "A is a work box. RAM gives you more numbered boxes for keeping things until you need them again.",
  "steps": [
   "Change the first line of the program to LDI 42. Leave the later LDI 0 in place.",
   "Press Load program & reset. Use Run one instruction to put 42 in A.",
   "Step through STA 240. It saves A in memory box 240.",
   "Step through LDI 0, then LDA 240. Watch A go to 0 and back to 42.",
   "Keep stepping until HALTED. The output should show 42."
  ],
  "notice": "Clearing A did not erase memory box 240. LDA brought the saved number back.",
  "hint": "STA means store A. LDA means load A. The first LDI line should say 42; the second should still say 0.",
  "words": [
   [
    "Address",
    "The number of a memory box, such as 240."
   ],
   [
    "Store / load",
    "Store saves a number; load brings it into a register."
   ]
  ]
 },
 "c8-06": {
  "goal": "Make a countdown: 3, 2, 1, 0.",
  "intro": "A loop repeats part of a program. This countdown should subtract 1 each time and stop when it reaches zero.",
  "steps": [
   "Find the last line, .BYTE 0. Change it to .BYTE 1.",
   "Press Load program & reset, then Run.",
   "Watch Output history grow: 3 → 2 → 1 → 0. The computer should then halt.",
   "For a closer look, load the program again and use Run one instruction. Watch the PC address jump back to LOOP."
  ],
  "notice": "JNZ LOOP repeats while the subtraction result is not zero. When it reaches zero, the computer continues to the last OUT and HLT.",
  "hint": "Subtracting 0 never counts down. The number in memory box 240 must be 1.",
  "words": [
   [
    "Loop",
    "A part of a program that runs again."
   ],
   [
    "PC",
    "Program counter: the address of the next instruction byte."
   ],
   [
    "JNZ",
    "Jump if not zero: go to another address when the zero flag is off."
   ]
  ]
 },
 "c8-07": {
  "goal": "Choose the path that shows 99.",
  "intro": "A computer can make a decision. This program takes the YES path only when a subtraction makes zero.",
  "steps": [
   "Read the first line: LDI 9 puts 9 in A. What number must you subtract to get 0?",
   "Change the final .BYTE 0 to the number you chose.",
   "Press Load program & reset, then Run one instruction twice. Check ZERO.",
   "Keep stepping. If the YES path was chosen, the output will become 99 and the computer will halt."
  ],
  "notice": "JZ YES checks the zero flag. It changes which instruction runs next.",
  "hint": "9 − 9 = 0. Set the last line to .BYTE 9. YES: is a name for the start of one path, not a special yes/no value.",
  "words": [
   [
    "Branch",
    "Choose which part of a program runs next."
   ],
   [
    "JZ",
    "Jump if zero: take the named path when the zero flag is on."
   ]
  ]
 },
 "rb-01": {
  "goal": "Drive into the green circle and stop.",
  "intro": "Your rover has two powered wheels. If both wheels go forward at the same speed, it drives straight.",
  "steps": [
   "Under Manual wheel controls, set Left wheel to 60 and Right wheel to 60.",
   "Press Run. Watch the arrow on the rover: it points forward.",
   "When the rover reaches the green DOCK circle, press Pause.",
   "Press Stop wheels. Both wheel values should show 0."
  ],
  "notice": "Equal wheel speeds make a straight path. Pause freezes the experiment; Stop wheels changes both wheel speeds to zero.",
  "hint": "If you miss the circle, press Reset arena and try again. Advance 0.5 s lets you move in smaller chunks near the dock.",
  "words": [
   [
    "Wheel speed",
    "Positive numbers drive forward; negative numbers reverse; 0 stops."
   ]
  ]
 },
 "rb-02": {
  "goal": "Turn roughly a quarter-turn to the right, then stop.",
  "intro": "A quarter-turn is about 90 degrees. Running the wheels in opposite directions lets the rover turn without driving away.",
  "steps": [
   "Set Left wheel to 20 and Right wheel to −20.",
   "Press Advance 0.5 s three times. The rover should turn about a quarter-turn clockwise.",
   "Press Stop wheels. The rover should still be near where it started."
  ],
  "notice": "One wheel moves forward and the other backward. Together they turn the rover on the spot.",
  "hint": "Clockwise means the same direction as clock hands. The rover starts pointing right; after this turn it should point nearly down.",
  "words": [
   [
    "Degrees (°)",
    "A way to measure a turn. A full turn is 360°; a quarter-turn is 90°."
   ]
  ]
 },
 "rb-03": {
  "goal": "Let the rover stop itself before the crate.",
  "intro": "The distance sensor measures how much clear space is directly in front of the rover. A rule can use that measurement to stop the wheels.",
  "steps": [
   "Find Choose the controller. Set Control mode to Sensor rules.",
   "In Rule blocks, choose IF front is close → STOP; ELSE drive.",
   "Set Close means less than to 40 cm.",
   "Press Run. Let the rover stop by itself. Watch FRONT as it approaches the crate."
  ],
  "notice": "The rover keeps checking the distance. When it drops below 40 cm, the rule stops both wheels.",
  "hint": "Use the STOP rule, not the turn rule. If the rover hit something earlier, press Reset arena before trying again.",
  "words": [
   [
    "Sensor",
    "A part that measures something around a robot."
   ],
   [
    "Rule",
    "An instruction like “if something is close, stop.”"
   ]
  ]
 },
 "rb-04": {
  "goal": "Patrol for 15 seconds without bumping anything.",
  "intro": "The rover can use the same sensor to choose when to turn. It checks again and again as it travels.",
  "steps": [
   "Set Control mode to Sensor rules.",
   "Choose IF front is close → turn left 90°; ELSE drive.",
   "Set the close distance to 40 cm. Press Reset arena if you already bumped something.",
   "Press Run. Watch it drive, turn, and check the distance again.",
   "Reach 15 simulated seconds with CONTACTS still at 0. The mission also needs at least 180 cm of travel."
  ],
  "notice": "The walls count as obstacles too. The rover finishes its turn before checking whether to drive forward again.",
  "hint": "A very small close distance gives the rover less space. Start with 40 cm. The TIME display counts time inside the experiment.",
  "words": [
   [
    "Feedback",
    "Use a fresh sensor reading to decide what to do next."
   ],
   [
    "Control loop",
    "Keep measuring, deciding and acting."
   ]
  ]
 },
 "rb-05": {
  "goal": "Follow the black trail to the far green dock.",
  "intro": "Two small floor sensors sit near the rover’s nose. They tell it whether the black trail is on its left or right.",
  "steps": [
   "Set Control mode to Sensor rules.",
   "Choose IF left/right sees trail → steer; ELSE search.",
   "Press Run. Watch the two small sensor lights on the rover.",
   "Let it follow the curve until it reaches the far green dock."
  ],
  "notice": "If only the left sensor sees black, the rover steers left. If only the right sees black, it steers right. The wheel speeds keep changing.",
  "hint": "Use the trail rule, not the front-distance rules. Press Reset arena if the rover has already left the trail.",
  "words": [
   [
    "Line sensor",
    "A floor-facing sensor that tells black trail from lighter floor."
   ],
   [
    "Steering",
    "Change the wheel speeds to change direction."
   ]
  ]
 },
 "rb-06": {
  "goal": "Visit pads 1, 2, 3 and 4, then stop at home.",
  "intro": "Write a route for the rover to follow. It needs four short straight drives with a right turn between them.",
  "steps": [
   "In Program a route, start with DRIVE 60 60, then WAIT 2. This drives one side of the square.",
   "Add TURN RIGHT 90. Add another DRIVE 60 60 and WAIT 2 for the next side.",
   "Continue until you have four drives and three right turns. Put STOP at the very end.",
   "Press Load program & reset, then Run. Watch the numbered pads change colour in order."
  ],
  "notice": "DRIVE chooses the speeds. WAIT tells the rover how long to keep them. TURN turns on the spot. The order of your lines creates the route.",
  "hint": "Use the + Drive, + Wait and + Turn blocks to add lines, or type them. Every straight side needs its own DRIVE and WAIT. Keep the total to four sides, not five.",
  "words": [
   [
    "Sequence",
    "Instructions followed in order."
   ],
   [
    "Program",
    "Your complete list of instructions. Rover commands here are not Python."
   ]
  ]
 }
};

function discoveryGuide(S){var g=S.mission&&DISCOVERY_GUIDES[S.id];if(!g)return '<section class="ds-howto"><h2>Try a small experiment</h2><p>'+(S.kind==='cpu8'?'Change a number in the program, press Load program &amp; reset, then use Run one instruction. Watch which box changes.':'Start with the two wheel sliders, then try Sensor rules or add a few Rover command blocks.')+'</p><p>For a guided first try, go back to Circuit Lab and choose a numbered mission.</p></section>';
 return '<section class="ds-howto" aria-labelledby="ds-steps-title"><h2 id="ds-steps-title">Try this</h2><ol>'+g.steps.map(function(t){return '<li>'+esc(t)+'</li>'}).join('')+'</ol><div class="ds-notice"><b>What to notice</b><p>'+esc(g.notice)+'</p></div><details><summary>Need a hint?</summary><p>'+esc(g.hint)+'</p></details><details><summary>New words, explained</summary><dl>'+g.words.map(function(w){return '<dt>'+esc(w[0])+'</dt><dd>'+esc(w[1])+'</dd>'}).join('')+'</dl></details></section>';
}
function discoveryOwner(S){return S&&db.profiles.find(function(p){return p.id===S.ownerId})}
function discoverySave(S){var p=discoveryOwner(S);if(!p)return;p.discovery=p.discovery||{};p.discovery[S.kind+':'+S.id]={code:S.code,input:S.input||0,mode:S.mode||'manual',threshold:S.threshold||40,rule:S.rule||'avoid'};save()}
function discoveryOpen(kind,id){checkpoint();var p=me();if(!p)return;var list=kind==='cpu8'?C8MISSIONS:RBMISSIONS,mission=list.find(function(m){return m.id===id});if(id!=='free'&&!mission)return;var saved=p.discovery&&p.discovery[kind+':'+id];
 var S={kind:kind,id:id,ownerId:p.id,mission:mission,code:saved&&typeof saved.code==='string'?saved.code:(mission?mission.start:kind==='cpu8'?'LDI 1\nLOOP: OUT\nADD 240\nJMP LOOP\n.ORG 240\n.BYTE 1':'DRIVE 60 60\nWAIT 2\nSTOP'),input:saved?Number(saved.input)&255:0,mode:saved&&['manual','rules','program'].includes(saved.mode)?saved.mode:'manual',threshold:saved?Math.max(15,Math.min(100,Number(saved.threshold)||40)):40,running:false,won:!!p.done[id],note:'',latched:false,selected:0};
 if(kind==='cpu8'){try{S.m=c8New(S.code)}catch(e){S.m=c8New('HLT');S.note=e.message}}else{S.robot=rbNew(id);S.queue=[];S.qi=0;S.wait=0;S.rule=saved&&['stop','avoid','line'].includes(saved.rule)?saved.rule:mission&&mission.rule||'avoid';if(id==='free'&&S.rule==='line')S.robot=rbNew('rb-05')}v.discovery=S;v.s=kind;v.subj='lab';p.lastSubj='lab';discoverySave(S);
}
function discoveryCheck(S){if(!S.mission||S.won||S.ownerId!==db.active)return false;if(S.mission.ok(S)){S.won=true;S.running=false;S.xp=awardLab(S.id);S.note='Mission complete! +'+S.xp+' XP. Try another experiment or return to Circuit Lab.';discoverySave(S);return true}return false}
function discoveryButton(act,text,id,extra){return '<button class="btn small '+(extra||'')+'" data-act="'+act+'"'+(id!==undefined?' data-id="'+id+'"':'')+'>'+text+'</button>'}
function discoveryHeader(S,title){return '<div class="wrap discovery"><div class="pathhead"><button class="back" data-act="dsback" aria-label="Back to Circuit Lab">'+ICONS.back+'</button><span class="tag">CIRCUIT LAB / '+(S.kind==='cpu8'?'COMPUTER':'ROBOTICS')+'</span></div><h1>'+esc(S.mission?S.mission.title:title)+'</h1><p class="discovery-intro">'+esc(S.mission?S.mission.learn:S.kind==='cpu8'?'Program a tiny machine. Follow every byte from RAM to the registers and output.':'Build a rover routine. Watch the wheels, sensors and path change together.')+'</p>'+(S.mission?'<section class="ds-goal"><b>Your mission</b><p>'+esc(S.mission.goal)+'</p></section>':'')+discoveryGuide(S)+'<p class="ds-status" role="status">'+esc(S.note|| (S.won?'Previously completed. Explore again.':'Programs are saved in this browser. Reopening a lab resets its experiment.'))+'</p>'}
function c8Bits(n){return (n&255).toString(2).padStart(8,'0')}
function c8View(){var S=v.discovery,M=S.m,h=discoveryHeader(S,'8-bit Computer sandbox');if(['c8-01','c8-02'].includes(S.id))h=h.replace('wrap discovery','wrap discovery ds-beginner');
 h+='<div class="ds-grid"><div><section class="ds-machine"><div class="ds-machine-head"><span>SC-8 • TEACHING COMPUTER</span><span class="ds-led '+(S.running?'live':'')+'">'+(S.running?'CLOCK RUNNING':M.halt?'HALTED':'CLOCK PAUSED')+'</span></div><div class="ds-registers">';
 [['A',M.a],['OUT',M.out],['PC',M.pc],['MAR',M.mar],['IR',M.ir],['B',M.b]].forEach(function(r){h+='<div class="ds-register"><span>'+r[0]+'</span><small>'+({A:'Working number',OUT:'Shown answer',PC:'Next address',MAR:'Memory address',IR:'Instruction number',B:'Number to add / subtract'})[r[0]]+'</small><b>'+r[1]+'</b><code>'+c8Bits(r[1])+'</code></div>'});
 h+='</div><div class="ds-bus"><span>8-BIT DATA BUS</span><code>'+c8Bits(M.bus)+'</code><strong>'+esc(M.route)+'</strong></div><div class="ds-chips"><span>ZERO <b>'+Number(M.z)+'</b></span><span>CARRY <b>'+Number(M.c)+'</b></span><span>NEXT <b>'+M.phase.toUpperCase()+'</b></span><span>CLOCKS <b>'+M.clocks+'</b></span></div><div class="ds-output" aria-label="Output register">'+Array.from(c8Bits(M.out)).map(function(b){return '<i class="'+(b==='1'?'on':'')+'"></i>'}).join('')+'<strong>'+M.out+'</strong></div><p>Output history: '+(M.outputs.length?M.outputs.join(' → '):'Waiting for OUT')+'</p></section>';
 h+='<section class="card"><h2>Front panel</h2><p>Input: <b>'+S.input+'</b> · Tap a switch to turn its number on or off. The ON numbers add up to Input. Press the copy button to put that number in A.</p><div class="ds-switches">';for(var i=7;i>=0;i--)h+=discoveryButton('c8bit',(((S.input>>i)&1)?'ON':'OFF')+'<small>'+Math.pow(2,i)+'</small>',i,((S.input>>i)&1)?'ds-bit-on':'ghost');
 h+='</div>'+discoveryButton('c8latch','Copy switches into A')+'<p class="muted">Use these switches in the first two missions or the sandbox. Later missions change A with program instructions.</p></section>';
 if(M.alu){h+='<section class="card"><h2>Inside the adder</h2><p>'+M.alu.a+' + '+M.alu.b+' = '+(M.alu.a+M.alu.b)+' → byte '+M.alu.sum+'; carry '+Number(M.alu.carry)+'. Carry flows from bit 0 toward bit 7.</p><div class="ds-carry">';var carry=0;for(var bit=0;bit<8;bit++){var a=(M.alu.a>>bit)&1,b=(M.alu.b>>bit)&1,total=a+b+carry;h+='<div><b>Bit '+bit+'</b><code>'+a+' + '+b+' + '+carry+'</code><span>sum '+(total&1)+' / carry '+(total>1?1:0)+'</span></div>';carry=total>1?1:0}h+='</div></section>'}
 h+='<details class="card"><summary>RAM: 256 addresses · inspect a byte</summary><p>Address '+S.selected+' = '+M.ram[S.selected]+' (binary '+c8Bits(M.ram[S.selected])+'). Highlighted address: MAR.</p><div class="ds-memory">';for(var k=0;k<256;k++)h+='<button data-act="c8mem" data-id="'+k+'" class="'+(k===M.mar?'active':'')+'" aria-label="Address '+k+', byte '+M.ram[k]+'">'+M.ram[k].toString(16).padStart(2,'0').toUpperCase()+'</button>';h+='</div></details></div><div><section class="card"><h2>Program</h2><label for="c8code">SC-8 assembly</label><textarea id="c8code" class="ds-editor" spellcheck="false" maxlength="12000">'+esc(S.code)+'</textarea><div class="ds-actions">'+discoveryButton('c8assemble','Load program & reset')+discoveryButton('c8clock','Next tiny step',undefined,'ghost')+discoveryButton('c8instruction','Run one instruction',undefined,'ghost')+discoveryButton('dsrun',S.running?'Pause':'Run')+'</div><p>'+esc(M.error||'After editing, press Load program & reset. Run one instruction follows one whole command; Next tiny step shows its smaller parts.')+'</p></section><details class="card"><summary>More help: computer commands & technical details</summary><p>LDI n: A ← n<br>LDA addr: A ← RAM[addr]<br>STA addr: RAM[addr] ← A<br>ADD / SUB addr: arithmetic using RAM[addr]<br>JMP addr: jump; JZ / JNZ / JC: conditional jump<br>OUT: output A · HLT: stop · NOP: no change</p><p>.ORG n selects a memory address. .BYTE n stores data. Labels end with a colon. Numbers may be decimal, 0x hex, or 0b binary. Comments start with ;.</p><p>A, B and RAM are 8-bit. PC and MAR address 256 bytes. Instructions take one opcode byte plus an operand byte when needed. ADD/SUB update Z and C; SUB uses C = no borrow.</p></details><section class="card"><h2>Clock trace</h2><ol>'+M.trace.map(function(t){return '<li>'+esc(t)+'</li>'}).join('')+'</ol></section><p class="muted">Original educational architecture, not a 6502 or a physical transistor-level simulation. RAM accesses and ALU transfers are grouped into readable teaching clock stages.</p></div></div>'+tabs('home');return h}
/* Differential drive model: cm, seconds, radians; screen y increases downward.
   v=(vL+vR)/2, clockwise angular speed=(vL-vR)/trackWidth. */
var RBMISSIONS=[
 {id:'rb-01',title:'Two wheels, one direction',unit:'Robot Lab: Motion',kind:'robot',open:true,goal:'Drive into the green dock and stop both wheels.',learn:'Equal wheel speeds drive straight. Move both sliders together; zero stops a wheel. The route you travel stays on the floor.',start:'DRIVE 60 60\nWAIT 10\nSTOP',ok:function(S){var R=S.robot;return R.docked&&R.distance>200&&R.left===0&&R.right===0&&!R.collisions}},
 {id:'rb-02',title:'Turn on the spot',unit:'Robot Lab: Motion',kind:'robot',open:true,goal:'Turn about 90° clockwise without travelling more than 15 cm from the start, then stop.',learn:'Opposite wheel directions rotate around the rover centre. The left wheel forward and right wheel backward turn clockwise in this top view.',start:'TURN RIGHT 90\nSTOP',ok:function(S){var R=S.robot;return Math.abs(rbAngle(R.theta)-Math.PI/2)<.12&&Math.hypot(R.x-R.startX,R.y-R.startY)<15&&R.left===0&&R.right===0&&R.time>.2}},
 {id:'rb-03',title:'Sense, then stop',unit:'Robot Lab: Sensors & feedback',kind:'robot',open:true,rule:'stop',goal:'Use the front-distance rule to stop 20–50 cm before the crate, without touching it.',learn:'The front sensor casts a ray from the rover bumper. A feedback rule can stop the wheels when the measured distance is below a threshold.',start:'DRIVE 50 50\nWAIT 1\nSTOP',ok:function(S){var R=S.robot;return S.mode==='rules'&&S.rule==='stop'&&R.usedSensor&&R.distance>40&&R.sensor>=20&&R.sensor<=50&&R.left===0&&R.right===0&&!R.collisions}},
 {id:'rb-04',title:'Obstacle patrol',unit:'Robot Lab: Sensors & feedback',kind:'robot',open:true,rule:'avoid',goal:'Use obstacle-avoidance rules for 15 simulated seconds, travel at least 180 cm and avoid collisions.',learn:'Repeated sensing makes a control loop. The rover turns left about 90° when something is close, then reads the sensor again before moving forward. Arena walls are obstacles too.',start:'DRIVE 40 40\nWAIT 1\nSTOP',ok:function(S){var R=S.robot;return S.mode==='rules'&&S.rule==='avoid'&&R.time>=15&&R.distance>=180&&R.sensorTurns>5&&!R.collisions}},
 {id:'rb-05',title:'Follow the trail',unit:'Robot Lab: Sensors & feedback',kind:'robot',open:true,rule:'line',goal:'Follow the curved black trail to the far green dock using the line sensors.',learn:'Two floor sensors see the trail. If only the left sensor sees it, steer left; if only the right sees it, steer right. Both on the trail means drive ahead.',start:'DRIVE 40 40\nWAIT 1\nSTOP',ok:function(S){var R=S.robot;return S.mode==='rules'&&S.rule==='line'&&R.x>410&&R.lineGood>5&&R.sensorTurns>3&&!R.collisions}},
 {id:'rb-06',title:'Program a delivery route',unit:'Robot Lab: Programs',kind:'robot',open:true,goal:'Use a program to visit the four numbered pads in order and stop back at home.',learn:'A sequence is an ordered set of instructions. DRIVE sets speeds, WAIT keeps them for a duration, and TURN makes a measured turn. These Rover commands are a small teaching language, not Python.',start:'DRIVE 60 60\nWAIT 2\nTURN RIGHT 90\nSTOP',solution:'DRIVE 60 60\nWAIT 2\nTURN RIGHT 90\nDRIVE 60 60\nWAIT 2\nTURN RIGHT 90\nDRIVE 60 60\nWAIT 2\nTURN RIGHT 90\nDRIVE 60 60\nWAIT 2\nSTOP',ok:function(S){var R=S.robot;return S.mode==='program'&&R.pads===4&&R.left===0&&R.right===0&&!R.collisions}}
];
function rbAngle(a){return Math.atan2(Math.sin(a),Math.cos(a))}
function rbLineY(x){return 180+55*Math.sin((x-60)/80)}
function rbNew(id){var line=id==='rb-05',delivery=id==='rb-06',x=delivery?100:60,y=delivery?100:line?180:160;
 return {x:x,y:y,startX:x,startY:y,theta:line?Math.atan(55/80):0,left:0,right:0,time:0,distance:0,collisions:0,sensor:0,leftLine:false,rightLine:false,lineGood:0,sensorTurns:0,usedSensor:false,pads:0,trail:[[x,y]],line:line,delivery:delivery,obstacles:id==='rb-03'?[{x:280,y:100,w:30,h:120}]:id==='rb-04'||id==='free'?[{x:210,y:100,w:45,h:90},{x:340,y:200,w:35,h:50}]:[],dock:{x:420,y:line?rbLineY(420):160}};
}
function rbHit(R,x,y){if(x<12||y<12||x>468||y>308)return true;return R.obstacles.some(function(o){var px=Math.max(o.x,Math.min(o.x+o.w,x)),py=Math.max(o.y,Math.min(o.y+o.h,y));return Math.hypot(x-px,y-py)<12})}
function rbSense(R){var co=Math.cos(R.theta),si=Math.sin(R.theta),ox=R.x+12*co,oy=R.y+12*si;R.sensor=200;
 for(var d=0;d<=200;d+=1){var x=ox+d*co,y=oy+d*si;if(x<=0||y<=0||x>=480||y>=320||R.obstacles.some(function(o){return x>=o.x&&x<=o.x+o.w&&y>=o.y&&y<=o.y+o.h})){R.sensor=d;break}}
 function sees(side){var x=R.x+14*co-side*6*si,y=R.y+14*si+side*6*co;return R.line&&Math.abs(y-rbLineY(x))<7}
 R.leftLine=sees(-1);R.rightLine=sees(1);R.docked=Math.hypot(R.x-R.dock.x,R.y-R.dock.y)<24;return R;
}
function rbStep(R,dt){dt=Math.min(.05,Math.max(0,dt));var l=R.left*.5,r=R.right*.5,w=(l-r)/18,vv=(l+r)/2,theta=R.theta+w*dt,mid=R.theta+w*dt/2,x=R.x+vv*Math.cos(mid)*dt,y=R.y+vv*Math.sin(mid)*dt;
 R.time+=dt;if(rbHit(R,x,y)){R.collisions++;R.left=0;R.right=0;rbSense(R);return R}R.theta=theta;R.distance+=Math.hypot(x-R.x,y-R.y);R.x=x;R.y=y;rbSense(R);
 if(R.line&&Math.abs(R.y-rbLineY(R.x))<18)R.lineGood+=dt;
 if(R.delivery){var pads=[[160,100],[160,160],[100,160],[100,100]];if(R.pads<4&&Math.hypot(R.x-pads[R.pads][0],R.y-pads[R.pads][1])<12)R.pads++}
 if(R.trail.length===0||Math.hypot(x-R.trail[R.trail.length-1][0],y-R.trail[R.trail.length-1][1])>2){R.trail.push([x,y]);if(R.trail.length>1500)R.trail.shift()}return R;
}
function rbRules(R,rule,threshold){rbSense(R);R.usedSensor=true;if(rule==='line'){if(R.leftLine&&!R.rightLine){R.left=20;R.right=65;R.sensorTurns++}else if(R.rightLine&&!R.leftLine){R.left=65;R.right=20;R.sensorTurns++}else if(R.leftLine&&R.rightLine){R.left=55;R.right=55}else{R.left=-15;R.right=25;R.sensorTurns++}}
 else if(rule==='avoid'&&(R.avoidTurn>0||R.sensor<threshold)){if(!(R.avoidTurn>0))R.avoidTurn=Math.PI/2/(40/18);R.avoidTurn=Math.max(0,R.avoidTurn-.05);R.left=-40;R.right=40;R.sensorTurns++}else if(rule==='stop'&&R.sensor<threshold){R.left=0;R.right=0}else{R.left=55;R.right=55}}
function rbCompile(src){if(typeof src!=='string'||src.length>6000)throw Error('Keep Rover programs under 6,000 characters.');var q=[];src.split('\n').forEach(function(raw,i){var t=raw.replace(/#.*/,'').trim().toUpperCase();if(!t)return;var a=t.split(/\s+/),op=a.shift(),v=a.map(Number);if(op==='DRIVE'&&a.length===2&&v.every(function(n){return Number.isFinite(n)&&Math.abs(n)<=100}))q.push({op:op,l:v[0],r:v[1]});else if(op==='WAIT'&&a.length===1&&Number.isFinite(v[0])&&v[0]>0&&v[0]<=30)q.push({op:op,t:v[0]});else if(op==='TURN'&&a.length===2&&['LEFT','RIGHT'].includes(a[0])&&Number.isFinite(Number(a[1]))&&Number(a[1])>0&&Number(a[1])<=360)q.push({op:op,t:Number(a[1])*Math.PI/180/(40/18),dir:a[0]==='RIGHT'?1:-1});else if(op==='STOP'&&!a.length)q.push({op:op});else throw Error('Line '+(i+1)+': use DRIVE left right, WAIT seconds, TURN LEFT/RIGHT degrees, or STOP.')});if(q.length>100)throw Error('Use at most 100 instructions.');return q}
function rbTick(S){var R=S.robot;
 if(S.mode==='rules'){rbRules(R,S.rule,S.threshold);rbStep(R,.05)}
 else if(S.mode==='program'){
  var remaining=.05,budget=0;
  while(remaining>1e-8&&budget++<110){
   if(S.wait<=1e-8){if(S.turning){R.left=0;R.right=0;S.turning=false}
    if(S.qi>=S.queue.length){R.left=0;R.right=0;S.running=false;break}
    var q=S.queue[S.qi++];
    if(q.op==='DRIVE'){R.left=q.l;R.right=q.r;continue}
    if(q.op==='STOP'){R.left=0;R.right=0;continue}
    S.wait=q.t;if(q.op==='TURN'){R.left=40*q.dir;R.right=-40*q.dir;S.turning=true}
   }
   var dt=Math.min(remaining,S.wait);rbStep(R,dt);S.wait=Math.max(0,S.wait-dt);remaining-=dt;if(R.collisions)break;
  }
 }else rbStep(R,.05);
 if(R.collisions){S.running=false;S.note='Bumper contact. Reset and revise the route or sensor rule.'}
 if(R.time>=90){S.running=false;R.left=0;R.right=0;S.note='90-second experiment limit reached. Reset for another run.'}discoveryCheck(S);
}
function rbSvg(R){rbSense(R);var pts=R.trail.map(function(p){return p.map(function(n){return n.toFixed(1)}).join(',')}).join(' '),h='<svg class="ds-arena" viewBox="0 0 480 320" role="img" aria-label="Robot arena with rover, obstacles, sensors and travelled path"><defs><pattern id="rbGrid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#b9cec2" stroke-width=".5"/></pattern></defs><rect width="480" height="320" rx="12" fill="#e9efe2"/><rect x="1" y="1" width="478" height="318" rx="12" fill="url(#rbGrid)" stroke="#527665" stroke-width="2"/>';
 if(R.line){var d='';for(var x=40;x<=450;x+=4)d+=(x===40?'M':'L')+x+' '+rbLineY(x).toFixed(1)+' ';h+='<path d="'+d+'" stroke="#203c36" stroke-width="14" fill="none"/>'}
 h+='<circle cx="'+R.dock.x+'" cy="'+R.dock.y+'" r="24" fill="#8fc79b" fill-opacity=".65" stroke="#176955" stroke-dasharray="4 3"/><text x="'+R.dock.x+'" y="'+(R.dock.y+4)+'" text-anchor="middle" font-size="10" fill="#123b30">DOCK</text>';
 if(R.delivery)[[160,100],[160,160],[100,160],[100,100]].forEach(function(p,i){h+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="12" fill="'+(i<R.pads?'#59bd85':'#f4d68e')+'" stroke="#756039"/><text x="'+p[0]+'" y="'+(p[1]+4)+'" text-anchor="middle" font-size="12">'+(i+1)+'</text>'});
 R.obstacles.forEach(function(o){h+='<rect x="'+o.x+'" y="'+o.y+'" width="'+o.w+'" height="'+o.h+'" rx="4" fill="#b4814c" stroke="#74502f" stroke-width="2"/><path d="M'+o.x+' '+o.y+'l'+o.w+' '+o.h+'m0 -'+o.h+'l-'+o.w+' '+o.h+'" stroke="#deb98b" stroke-width="2"/>'});
 h+='<polyline points="'+pts+'" fill="none" stroke="#d88b28" stroke-width="2" stroke-dasharray="3 2"/><g transform="translate('+R.x.toFixed(2)+' '+R.y.toFixed(2)+') rotate('+(R.theta*180/Math.PI).toFixed(2)+')"><path d="M12 0h'+R.sensor+'" stroke="#db6c36" stroke-width="1.5" stroke-dasharray="3 3"/><rect x="-10" y="-14" width="20" height="7" rx="2" fill="#193a42"/><rect x="-10" y="7" width="20" height="7" rx="2" fill="#193a42"/><rect x="-12" y="-10" width="26" height="20" rx="7" fill="#287e90" stroke="#103f4c"/><rect x="-6" y="-6" width="10" height="12" rx="2" fill="#e9ba56"/><path d="m5 -4 6 4-6 4" fill="none" stroke="#fff3bd" stroke-width="2"/><circle cx="14" cy="-6" r="2.5" fill="'+(R.leftLine?'#f6b52f':'#f7faf5')+'"/><circle cx="14" cy="6" r="2.5" fill="'+(R.rightLine?'#f6b52f':'#f7faf5')+'"/></g><text x="14" y="307" font-size="10" fill="#385f50">480 × 320 cm • grid = 20 cm • arrow = forward</text></svg>';return h}
function rbView(){var S=v.discovery,R=S.robot,h=discoveryHeader(S,'Robot Lab sandbox');h+='<div class="ds-grid"><div><section class="ds-machine"><div class="ds-machine-head"><span>TRAIL ROVER / ROBOT DASHBOARD</span><span class="ds-led '+(S.running?'live':'')+'">'+(S.running?'RUNNING':'PAUSED')+'</span></div><div id="rbscene">'+rbSvg(R)+'</div><div id="rbtelemetry">'+rbTelemetry(R)+'</div></section><section class="card"><h2>Manual wheel controls</h2><p>−100 = reverse · 0 = stopped · +100 = forward. Press Run or advance one step.</p>';['left','right'].forEach(function(w){h+='<label for="rb'+w+'">'+(w==='left'?'Left':'Right')+' wheel <output id="rb'+w+'value">'+R[w]+'</output>%</label><input id="rb'+w+'" type="range" min="-100" max="100" step="5" value="'+R[w]+'">'});h+='<div class="ds-actions">'+discoveryButton('dsrun',S.running?'Pause':'Run')+discoveryButton('rbstep','Advance 0.5 s',undefined,'ghost')+discoveryButton('rbstop','Stop wheels',undefined,'ghost')+discoveryButton('rbreset','Reset arena',undefined,'ghost')+'</div></section><p class="muted">Ideal differential drive: 18 cm wheel spacing, maximum wheel speed 50 cm/s. No slip, acceleration, motor electronics or sensor noise. Distance is a single forward ray, not a wide ultrasonic cone.</p></div><div><section class="card"><h2>Choose the controller</h2><label for="rbmode">Control mode</label><select id="rbmode">'+['manual','rules','program'].map(function(x){return '<option value="'+x+'"'+(S.mode===x?' selected':'')+'>'+({manual:'Manual wheels',rules:'Sensor rules',program:'Rover program'})[x]+'</option>'}).join('')+'</select><label for="rbrule">Rule blocks</label><select id="rbrule">'+[['stop','IF front is close → STOP; ELSE drive'],['avoid','IF front is close → turn left 90°; ELSE drive'],['line','IF left/right sees trail → steer; ELSE search']].map(function(x){return '<option value="'+x[0]+'"'+(S.rule===x[0]?' selected':'')+'>'+x[1]+'</option>'}).join('')+'</select><label for="rbthreshold">Close means less than <output id="rbthresholdvalue">'+S.threshold+'</output> cm</label><input id="rbthreshold" type="range" min="15" max="100" value="'+S.threshold+'"><p>Rules re-read sensors every 0.05 simulated seconds. Straight: 55% / 55%. Line rules: left only → 20% / 65%; right only → 65% / 20%; both → straight; neither → search left. Run to see the loop in action.</p></section><section class="card"><h2>Program a route</h2><label for="rbcode">Rover commands</label><textarea id="rbcode" class="ds-editor" spellcheck="false" maxlength="6000">'+esc(S.code)+'</textarea><div class="ds-actions">'+discoveryButton('rbprogram','Load program & reset')+discoveryButton('rbappend','+ Drive block','DRIVE 60 60','ghost')+discoveryButton('rbappend','+ Wait block','WAIT 2','ghost')+discoveryButton('rbappend','+ Turn block','TURN RIGHT 90','ghost')+discoveryButton('rbappend','+ Stop block','STOP','ghost')+'</div><p>DRIVE left% right% sets wheel speeds.<br>WAIT seconds holds the current wheel speeds.<br>TURN LEFT/RIGHT degrees rotates in place.<br>STOP stops both wheels. # starts a comment.</p><p>This is Rover command language, not Python. Sensor rules and route programs are separate control modes.</p></section></div></div>'+tabs('home');return h}
function rbTelemetry(R){return '<div class="ds-chips"><span>FRONT <b>'+R.sensor.toFixed(0)+' cm</b></span><span>TRAIL LEFT / RIGHT <b>'+(R.leftLine?'black':'floor')+' / '+(R.rightLine?'black':'floor')+'</b></span><span>TIME <b>'+R.time.toFixed(1)+' s</b></span><span>TRAVEL <b>'+R.distance.toFixed(0)+' cm</b></span><span>HEADING <b>'+Math.round(rbAngle(R.theta)*180/Math.PI)+'°</b></span><span>CONTACTS <b>'+R.collisions+'</b></span></div>'}
function rbPaint(){var S=v.discovery;if(!S||v.s!=='robot')return;var scene=document.getElementById('rbscene'),tel=document.getElementById('rbtelemetry');if(scene)scene.innerHTML=rbSvg(S.robot);if(tel)tel.innerHTML=rbTelemetry(S.robot);var note=document.querySelector('.ds-status');if(note)note.textContent=S.note;['left','right'].forEach(function(w){var el=document.getElementById('rb'+w+'value'),range=document.getElementById('rb'+w);if(el)el.textContent=S.robot[w];if(range)range.value=S.robot[w]});var run=document.querySelector('[data-act="dsrun"]');if(run)run.textContent=S.running?'Pause':'Run'}
function discoveryClick(a,id){var S=v.discovery;if(a==='c8free'||a==='rbfree'){discoveryOpen(a==='c8free'?'cpu8':'robot','free');return true}if(!S||S.ownerId!==db.active||!['cpu8','robot'].includes(v.s))return false;
 if(a==='dsback'){S.running=false;discoverySave(S);v.s='path';return true}
 if(a==='dsrun'){if(S.kind==='cpu8'&&S.m.error){S.note=S.m.error;return true}if(S.kind==='robot'&&S.mode==='program'&&!S.queue.length){S.note='Load a Rover program first.';return true}S.running=!S.running;return true}
 if(a==='c8bit'){S.running=false;S.input^=1<<Number(id)}
 else if(a==='c8latch'){if(!S.mission||['c8-01','c8-02'].includes(S.id)){S.running=false;S.m.a=S.input;S.m.bus=S.input;S.m.route='Front panel → A';S.latched=true}else S.note='For this mission, change A using the Program box. Follow the steps above.'}
 else if(a==='c8mem')S.selected=Number(id)&255;
 else if(a==='c8assemble'){S.running=false;try{S.m=c8New(S.code);S.latched=false;S.note='Program loaded. Press Run one instruction to follow a command, or Run to watch it go.'}catch(e){S.note=e.message;S.m.error=e.message}}
 else if(a==='c8clock'||a==='c8instruction'){S.running=false;var before=S.m.instructions;do{c8Clock(S.m)}while(a==='c8instruction'&&!S.m.halt&&S.m.instructions===before);if(S.m.error)S.note=S.m.error}
 else if(a==='rbstop'){S.robot.left=0;S.robot.right=0;S.running=false}
 else if(a==='rbreset'){S.robot=rbNew(S.id);S.running=false;S.queue=[];S.qi=0;S.wait=0;S.turning=false;S.note='Arena reset. Your program is kept.'}
 else if(a==='rbprogram'){S.running=false;try{S.queue=rbCompile(S.code);S.robot=rbNew(S.id);S.mode='program';S.qi=0;S.wait=0;S.turning=false;S.note='Program loaded. Press Run.'}catch(e){S.queue=[];S.note=e.message}}
 else if(a==='rbappend'){S.code+='\n'+id;S.running=false;S.queue=[]}
 else if(a==='rbstep'){S.running=false;var alreadyWon=S.won;for(var t=0;t<10;t++){rbTick(S);if(S.robot.collisions||(!alreadyWon&&S.won))break}}
 else if(a!=='dsrun'&&a!=='dsback')return false;
 discoveryCheck(S);discoverySave(S);return true;
}
function discoveryInput(el){var S=v.discovery;if(!S||S.ownerId!==db.active||!['cpu8','robot'].includes(v.s))return;S.running=false;
 if(el.id==='c8code'||el.id==='rbcode'){S.code=el.value;S.queue=[];if(S.kind==='cpu8'){S.m.error='You changed the program. Press Load program & reset before running it.';S.m.halt=true}}
 else if(el.id==='rbleft'||el.id==='rbright'){S.mode='manual';S.robot[el.id==='rbleft'?'left':'right']=Number(el.value);var mode=document.getElementById('rbmode');if(mode)mode.value='manual';rbPaint()}
 else if(el.id==='rbmode'){S.mode=el.value;S.robot.left=0;S.robot.right=0;rbPaint()}
 else if(el.id==='rbrule'){S.rule=el.value;if(S.id==='free'&&S.rule==='line'&&!S.robot.line)S.robot=rbNew('rb-05');S.mode='rules';var mode=document.getElementById('rbmode');if(mode)mode.value='rules'}
 else if(el.id==='rbthreshold'){S.threshold=Number(el.value);var o=document.getElementById('rbthresholdvalue');if(o)o.textContent=S.threshold}
 discoverySave(S);
}
C8MISSIONS.concat(RBMISSIONS).forEach(function(m){var g=DISCOVERY_GUIDES[m.id];m.goal=g.goal;m.learn=g.intro});
// Attach the two labs to Circuit Lab without adding another top-level workshop.
SUBJECTS.find(function(s){return s.id==='lab'}).lessons.push.apply(SUBJECTS.find(function(s){return s.id==='lab'}).lessons,C8MISSIONS.concat(RBMISSIONS));
var discoveryPath=vPath;vPath=function(){var h=discoveryPath();if(v.subj!=='lab')return h;var entry='<section class="ds-portals" aria-label="Computer and robotics labs"><button data-act="c8free"><span class="ds-portal-icon">'+ICONS.chip+'</span><span><small>FOLLOW EVERY BIT</small><b>8-bit Computer</b><em>Registers · RAM · assembly</em></span><span>→</span></button><button data-act="rbfree"><span class="ds-portal-icon">'+ICONS.rocket+'</span><span><small>MAKE IT MOVE</small><b>Robot Lab</b><em>Wheels · sensors · programs</em></span><span>→</span></button></section>';return h.replace('<div class="path">',entry+'<div class="path">')};
var discoveryCheckpoint=checkpoint;checkpoint=function(){var S=v.discovery;if(S&&S.ownerId===db.active&&v.s===S.kind){discoverySave(S);var p=me();p.resume={subj:'lab',kind:S.kind,id:S.id,title:S.mission?S.mission.title:S.kind==='cpu8'?'8-bit Computer':'Robot Lab'};save();return}discoveryCheckpoint()};
var discoveryResume=resumeWorkshop;resumeWorkshop=function(){var p=me(),r=p&&p.resume;if(r&&['cpu8','robot'].includes(r.kind)){discoveryOpen(r.kind,r.id);return}discoveryResume()};
setInterval(function(){var S=v.discovery;if(!S||!S.running||S.ownerId!==db.active||v.s!==S.kind||document.hidden)return;if(S.kind==='cpu8'){S.clockDivider=(S.clockDivider||0)+1;if(S.clockDivider%6)return;c8Clock(S.m);discoveryCheck(S);if(S.m.halt)S.running=false;render()}else{var was=S.running;rbTick(S);if(was&&!S.running)render();else rbPaint()}},50);
document.addEventListener('visibilitychange',function(){if(document.hidden&&v.discovery)v.discovery.running=false});
if(window.ShopLab)Object.assign(window.ShopLab,{DISCOVERY_GUIDES:DISCOVERY_GUIDES,discoveryGuide:discoveryGuide,C8MISSIONS:C8MISSIONS,RBMISSIONS:RBMISSIONS,c8Assemble:c8Assemble,c8New:c8New,c8Clock:c8Clock,rbNew:rbNew,rbStep:rbStep,rbSense:rbSense,rbRules:rbRules,rbCompile:rbCompile,rbTick:rbTick,rbAngle:rbAngle,discoveryOpen:discoveryOpen,discoveryCheck:discoveryCheck,discoveryClick:discoveryClick,discoverySave:discoverySave,discoveryInput:discoveryInput,rbSvg:rbSvg,c8View:c8View,rbView:rbView,vPath:vPath,checkpoint:checkpoint,resumeWorkshop:resumeWorkshop});
/* END COMPUTER & ROBOTICS */
