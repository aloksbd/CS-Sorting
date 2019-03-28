// html elememnts
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var readyButton = document.getElementById("readyButton");

var width = 400;
var height = 200;

canvas.width = width;
canvas.height = height;
canvas.style.border = '1px solid #110505';

// refresh = function(){
//     ctx.fillStyle = "#474747";
//     ctx.fillRect(0,0,width,height);
// }
// refresh();

var points = [];

for(i = 0; i < width; i+=4){
    for(j = 0; j < height; j+=4){
        var r = Math.floor(Math.random() * (+255 - +0)) + +0;
        var p = Points(i,j,r);
        // ctx.fillStyle = "rgba(" + r + "," + r + "," + r  + ", 1)";
        // ctx.fillStyle = 'rgb(255, 165, 0)';
        // ctx.fillRect(i,j,1,1);
        points.push(p)
    }
}

for(i = 0; i < points.length; i++){
    points[i].draw();
    console.log(points[i].r,points[i].color);
}

readyButton.onclick = function(){
    console.log('start');
    // var bub = BubbleSort(points);
    // var ins = InsertionSort(points);
    // var sel = SelectionSort(points);
    var mer = MergeSort(points);
    setInterval(function(){
        // bub.update();
        // ins.update();
        // sel.update();
        mer.update();
    },1000/120);
}

