'use strict';
const goods = ['bag', 'banana', 'bathroom','breakfast','boots','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep',
  'scissors','shark','unicorn','usb','water-can','wine-glass'];
const imageSection=document.getElementById('imagesSection');
const leftImage=document.getElementById('leftImage');
const centerImage=document.getElementById('centerImage');
const rightImage=document.getElementById('rightImage');
const extension=['jpg','gif'];
let leftIndex;
let centerIndex;
let rightIndex;
function Stats(item,extension){
  this.item=item;
  this.extension;
  this.views=0;
  this.selections=0;
  this.path=`./img/${item}.${extension}`;
  Stats.all.push(this);
}
Stats.all=[];
for(let i=0;i<goods.length;i++){
  if(goods[i]!=='usb'){
    new Stats(goods[i],extension[0]);
  }else{
    new Stats(goods[i],extension[1]);
  }
}
console.table(Stats.all);
function render(){
  do{
    leftIndex=randomNumber(0,Stats.all.length-1);
    centerIndex=randomNumber(0,Stats.all.length-1);
    rightIndex=randomNumber(0,Stats.all.length-1);
  }while(leftIndex===centerIndex||leftIndex===rightIndex||centerIndex===rightIndex);
  const leftRandomStats=Stats.all[leftIndex];
  const centerRandomStats=Stats.all[centerIndex];
  const rightRandomStats=Stats.all[rightIndex];
  leftImage.src=leftRandomStats.path;
  leftImage.title=leftRandomStats.item;
  leftImage.alt=leftRandomStats.item;
  centerImage.src=centerRandomStats.path;
  centerImage.title=centerRandomStats.item;
  centerImage.alt=centerRandomStats.item;
  rightImage.src=rightRandomStats.path;
  rightImage.title=rightRandomStats.item;
  rightImage.alt=rightRandomStats.item;
  
}
imageSection.addEventListener('click',clickHandler);
let maxTrials=5;
function clickHandler(event){
  maxTrials-=1;
  if (event.target.id === 'leftImage' || event.target.id === 'rightImage' ||event.target.id==='centerImage'){
    for(let i=0;i<Stats.all.length;i++){
      if(rightImage.title===Stats.all[i].item || leftImage.title===Stats.all[i].item ||centerImage.title===Stats.all[i].item){
        Stats.all[i].views++;}
      if (Stats.all[i].item === event.target.title){
        Stats.all[i].selections++;
        console.table(Stats.all[i]);
      }
    }
    render();
  }
  if(maxTrials===0){
    imageSection.removeEventListener('click',clickHandler);
    createChart();
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function createChart(){
  let context = document.getElementById('myChart').getContext('2d');
  let getStatssgoods=[];
  let getStatssselections=[];
  let getStatssViews=[];

  for(let i=0;i<Stats.all.length;i++){
    getStatssgoods.push(Stats.all[i].item);

  }
  for(let i=0;i<Stats.all.length;i++){
    getStatssViews.push(Stats.all[i].views);
    getStatssselections.push(Stats.all[i].selections);
  }
  let chartObject={
    // The type of chart we want to create
    type: 'horizontalBar',
    // The data for our dataset
    data: {
      labels:getStatssgoods,
      datasets: [{
        label: ['market voted'],
        backgroundColor: '#595775',
        borderColor: 'rgb(100, 20, 70)',
        data: getStatssselections,
      },
      {
        label: ['market views'],
        backgroundColor: '#ABA6BF',
        borderColor: 'rgb(100, 20, 70)',
        data: getStatssViews,

      }
      ]
    },
    options: {
      scales: {
        xAxes: [{
          barPercentage: 0.7,
        }]
      }
    }
  };
  let chart = new Chart(context,chartObject);
}
render();
