// Keep the editable extension and the standalone HTML export identical.
const fs=require('fs');
const file='index.html';let html=fs.readFileSync(file,'utf8');
for(const [start,end,path] of [
 ['/* BEGIN ROBOT BUILDER */','/* END ROBOT BUILDER */','extensions/robot-builder.js'],
 ['/* BEGIN ROBOT BUILDER STYLES */','/* END ROBOT BUILDER STYLES */','extensions/robot-builder.css'],
 ['/* BEGIN BICYCLE WORKSHOP */','/* END BICYCLE WORKSHOP */','extensions/bicycle.js'],
 ['/* BEGIN BICYCLE STYLES */','/* END BICYCLE STYLES */','extensions/bicycle.css'],
 ['/* BEGIN TRAIL DETECTIVE */','/* END TRAIL DETECTIVE */','extensions/trail-detective.js'],
 ['/* BEGIN TRAIL DETECTIVE STYLES */','/* END TRAIL DETECTIVE STYLES */','extensions/trail-detective.css'],
 ['/* BEGIN NEW WORKSHOP COVERS */','/* END NEW WORKSHOP COVERS */','extensions/workshop-covers.js'],
 ['/* BEGIN NEW WORKSHOP COVER STYLES */','/* END NEW WORKSHOP COVER STYLES */','extensions/workshop-covers.css'],
 ['/* BEGIN MONEY LAB */','/* END MONEY LAB */','extensions/money-lab.js'],
 ['/* BEGIN MONEY LAB STYLES */','/* END MONEY LAB STYLES */','extensions/money-lab.css'],
 ['/* BEGIN WRITING TEMPLATES TWO */','/* END WRITING TEMPLATES TWO */','extensions/writing-templates-2.js'],
 ['/* BEGIN FUEL INJECTION LAB */','/* END FUEL INJECTION LAB */','extensions/fuel-injection.js'],
 ['/* BEGIN FUEL INJECTION STYLES */','/* END FUEL INJECTION STYLES */','extensions/fuel-injection.css'],
 ['/* BEGIN CRANK NO START CASE */','/* END CRANK NO START CASE */','extensions/crank-no-start.js'],
 ['/* BEGIN CRANK NO START STYLES */','/* END CRANK NO START STYLES */','extensions/crank-no-start.css'],
 ['/* BEGIN WRITING DESK */','/* END WRITING DESK */','extensions/writing-desk.js'],
 ['/* BEGIN WRITING DESK STYLES */','/* END WRITING DESK STYLES */','extensions/writing-desk.css'],
 ['/* BEGIN CARBURETOR LAB */','/* END CARBURETOR LAB */','extensions/carburetor.js'],
 ['/* BEGIN CARBURETOR STYLES */','/* END CARBURETOR STYLES */','extensions/carburetor.css'],
 ['/* Shop Detective —', '/* END SHOP DETECTIVE */','extensions/shop-detective.js'],
 ['/* Fuel delivery foundations —', '/* END FUEL FOUNDATIONS */','extensions/fuel-foundations.js'],
 ['.nc{max-width:1200px;', '/* END SHOP DETECTIVE STYLES */','extensions/shop-detective.css'],
 ['/* BEGIN TRANSISTOR MOTOR LAB:', '/* END TRANSISTOR MOTOR LAB */','extensions/transistor-motor.js'],
 ['/* BEGIN COMPUTER & ROBOTICS','/* END COMPUTER & ROBOTICS */','extensions/computer-robotics.js'],
 ['/* BEGIN TRANSISTOR MOTOR STYLES */','/* END TRANSISTOR MOTOR STYLES */','extensions/transistor-motor.css'],
 ['/* Computer and robotics instruments */','/* END DISCOVERY STYLES */','extensions/computer-robotics.css']
]){
 const a=html.indexOf(start),b=html.indexOf(end,a);if(a<0||b<0)throw Error('Missing embedded extension markers: '+path);
 const src=fs.readFileSync(path,'utf8').trim();html=html.slice(0,a)+src+html.slice(b+end.length);
}
fs.writeFileSync(file,html);


