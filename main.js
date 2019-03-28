// html elememnts
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var mergeButton = document.getElementById("mergeButton");
var selectionButton = document.getElementById("selectionButton");
var insertionButton = document.getElementById("insertionButton");
var bubbleButton = document.getElementById("bubbleButton");

var width = 1000;
var height = 500;

canvas.width = width;
canvas.height = height;
canvas.style.border = '1px solid #110505';

var points = [];

for(i = 0; i < width; i+=4){
    for(j = 0; j < height; j+=4){
        var r = Math.floor(Math.random() * (+255 - +0)) + +0;
        var p = Points(i,j,r);
        points.push(p)
    }
}

for(i = 0; i < points.length; i++){
    points[i].draw();
}

mergeButton.onclick = function(){
    var mer = MergeSort(points);
    setInterval(function(){
        mer.update();
    },1000/120);
}

selectionButton.onclick = function(){
    console.log('start');
    var sel = SelectionSort(points);
    setInterval(function(){
        sel.update();
    },1000/120);
}

insertionButton.onclick = function(){
    console.log('start');
    var ins = InsertionSort(points);
    setInterval(function(){
        ins.update();
    },1000/120);
}

bubbleButton.onclick = function(){
    console.log('start');
    var bub = BubbleSort(points);
    setInterval(function(){
        bub.update();
    },1000/120);
}

