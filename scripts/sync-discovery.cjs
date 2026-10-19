// Keep the editable extension and the standalone HTML export identical.
const fs=require('fs');
const file='index.html';let html=fs.readFileSync(file,'utf8');
for(const [start,end,path] of [
 ['/* BEGIN COMPUTER & ROBOTICS','/* END COMPUTER & ROBOTICS */','extensions/computer-robotics.js'],
 ['/* Computer and robotics instruments */','/* END DISCOVERY STYLES */','extensions/computer-robotics.css']
]){
 const a=html.indexOf(start),b=html.indexOf(end,a);if(a<0||b<0)throw Error('Missing embedded extension markers: '+path);
 const src=fs.readFileSync(path,'utf8').trim();html=html.slice(0,a)+src+html.slice(b+end.length);
}
fs.writeFileSync(file,html);
