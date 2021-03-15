'use strict';
const items=['bag', 'banana', 'bathroom','breakfast','boots','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep',
  'scissors','shark','unicorn','usb','water-can','wine-glass'];
const extensions=['jpg','gif'];
const catalogeSection=document.getElementById('catalogeSection');
const leftImage=document.getElementById('leftImage');
const rightImage=document.getElementById('rightImage');
const centerImage=document.getElementById('centerImage');
function Stats(item,extension){
  this.extension=extension;
  this.item=item;
  this.selection=0;
  this.views=0;
  this.path=`./img/${item}.${extension}`;
  Stats.all.push(this);
}
Stats.all=[ ];
for(let i=0;i<items.length;i++){
  if(items[i]!=='usb'){
    new Stats(items[i],extensions[0]);
  }else{
    new Stats(items[i],extensions[1]);
  }
}
let button=document.getElementById('button');
button.addEventListener('click',buttonHandler);
function buttonHandler(){
  alert('you clicked the button// check the console \n to see the results');
}
function render(){
  const leftIndex=intRandomGen(0,Stats.all.length-1);
  const leftItem=Stats.all[leftIndex];
  leftImage.src=leftItem.path;
  leftImage.title=leftItem.item;
  leftImage.alt=leftItem.item;
  const rightIndex=intRandomGen(0,Stats.all.length-1);
  const rightItem=Stats.all[rightIndex];
  rightImage.src=rightItem.path;
  rightImage.title=rightItem.item;
  rightImage.alt=rightItem.item;
  const centerIndex=intRandomGen(0,Stats.all.length-1);
  const centerItem=Stats.all[centerIndex];
  centerImage.src=centerItem.path;
  centerImage.title=centerItem.item;
  centerImage.alt=centerItem.item;
}
function intRandomGen(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}
catalogeSection.addEventListener('click',clickHandler);
function clickHandler(event){
  for(let i=0;i<Stats.all.length;i++){
    if(rightImage.title===Stats.all[i].item || leftImage.title===Stats.all[i].item ||centerImage.title===Stats.all[i].item){
      Stats.all[i].views++;
      if(event.target.title===Stats.all[i].item && event.target.id==='leftImage'){ //|| event.target.id==='rightImage'){
        Stats.all[i].selection++;
      }
      if(event.target.title===Stats.all[i].item && event.target.id==='rightImage'){
        Stats.all[i].selection++;
      }
    }
  }
  console.table(Stats.all);
  render();
}
render();
