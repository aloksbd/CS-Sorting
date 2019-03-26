// import './Player';

// html elememnts
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var nameInputDiv = document.getElementById("nameInputDiv");
var nameInput = document.getElementById("nameInput");
var nameInputButton = document.getElementById("nameInputButton");
var readyButton = document.getElementById("readyButton");

// canvas size
var width = 700;
var aspectRatio = 16/9;
var height = width/aspectRatio;
var leftSpace = 10;
var topSpace = 10;

canvas.width = width;
canvas.height = height;
canvas.style.border = '1px solid #110505';

nameInputDiv.style.position = "absolute";
nameInputDiv.style.left = leftSpace + width/2 - parseInt(nameInputDiv.style.width)/2; 
nameInputDiv.style.top = height/2;
nameInputDiv.style.color = "#ffffff";

readyButton.style.position = "absolute";
readyButton.style.display = "none";
readyButton.style.left = leftSpace + width/2 - parseInt(readyButton.style.width)/2; 
readyButton.style.top = height/2;

setDefaultStyle = function(){
    ctx.fillStyle = "#474747";
}

refresh = function(){
    ctx.fillStyle = "#474747";
    ctx.fillRect(0,0,width,height);
}
refresh();

var name;
var gameeee;
var keyForGame = false;

showInputDiv = function(){
    nameInputDiv.style.display = 'inline-block';
}

hideNameInputDiv = function(){
    nameInputDiv.style.display = 'none';
}

nameInputButton.onclick = function(){
    showFindingOpponent();
    // hideNameInputDiv();
    // name = nameInput.value;
    // gameeee = GameController(name);
    // keyForGame = true;
    // setInterval(function(){
    //     refresh();
    //     gameeee.run();
    // },1000/25);
}

document.onkeydown = function(keyEvent){
    if (keyForGame){
        gameeee.player.keyDown(keyEvent.keyCode);
        socket.emit('keyEvent',{
            keyCode: keyEvent.keyCode,
            event: 'down'
        });
    }
}

document.onkeyup = function(keyEvent){
    if (keyForGame){
        gameeee.player.keyUp(keyEvent.keyCode);
        socket.emit('keyEvent',{
            keyCode: keyEvent.keyCode,
            event: 'up'
        });
    }
}

document.onclick = function(mouse){
    if (keyForGame){
        var mouseX = mouse.clientX - canvas.getBoundingClientRect().left;
        var mouseY = mouse.clientY - canvas.getBoundingClientRect().top;

        gameeee.player.mouseClick(mouseX,mouseY);

        socket.emit('mouseEvent',{
            mouseX: mouseX,
            mouseY: mouseY
        });
    }
}

var limit = 40;
var x = width/2;
var speed = 4;
animateShowFindingOpponent = function(){
    ctx.fillRect(width/2 - 50, height/2 + 20,100,10);
    x = x + speed;
    if(x > width/2 + limit || x < width/2 - limit ){
        speed = -speed;
    }
    ctx.beginPath();
    ctx.arc(x, height/2 + 25, 3, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    setDefaultStyle();
}
var animateLoading;

showFindingOpponent = function(){
    socket.emit('addPlayer',{name: nameInput.value});
    nameInputDiv.style.display = 'none';
    ctx.fillStyle = "#ffffff";
    ctx.font = '20px Arial';
    ctx.textAlign = "center";
    ctx.fillText('Finding Opponent',width/2,height/2);
    
    animateLoading = setInterval(animateShowFindingOpponent,1000/25);
    setDefaultStyle();
}

hideFindingOpponent = function(){
    refresh();
    clearInterval(animateLoading);
}

gameLoop = function(){ 
    refresh();
    gameeee.run();
}
var loopGame;

startGame = function(){
    gameeee = GameController(me,opponent);
    keyForGame = true;
    loopGame = setInterval(gameLoop,1000/25);
}

stopGame = function(){
    clearInterval(loopGame);
    keyForGame = false;
    refresh();
    showInputDiv();
}

var me;
var opponent;
var game;
showPlayersName = function(){
    // ctx.textAlign = "center";
    ctx.fillStyle = me.color;
    ctx.fillText(me.name,width/2,height/2 - 50);
    ctx.fillStyle = opponent.color;
    ctx.fillText(opponent.name,width/2,height/2 - 25);
}

createPlayers = function(_me,_opponent){
    me = Player(_me.name,_me.color,_me.x,_me.y);
    opponent = Player(_opponent.name,_opponent.color,_opponent.x,_opponent.y);
}

var ready = false;
showReadyButton = function(){
    readyButton.style.display = "inline-block";
    readyButton.style.backgroundColor = "#ffffff";
    ready = false;
}

hideReadyButton = function(){
    readyButton.style.display = "none";
}


// socket
var socket = io();



socket.on('ready',function(me,opponent){
    showReadyButton();
    hideFindingOpponent();
    createPlayers(me,opponent);
    showPlayersName();
});

socket.on('startGame',function(){
    hideReadyButton();
    startGame();
});

socket.on('opponentRemoved',function(){
    alert(opponent.name + ' left the game');
    refresh();
    stopGame();
    hideReadyButton();
    showFindingOpponent();
});

readyButton.onclick = function(){
    if(!ready){
        readyButton.style.backgroundColor = "#33ff33";
    }else{
        readyButton.style.backgroundColor = "#ff3333";
    }
    ready = !ready;
    socket.emit('readyStatus',{ready: ready});
}

socket.on('keyEventOpponent',function(data){
    if(data.event == 'down'){
        gameeee.opponent.keyDown(data.keyCode);
    }
    if(data.event == 'up'){
        gameeee.opponent.keyUp(data.keyCode);
    }
});

socket.on('mouseEventOpponent',function(data){
    gameeee.opponent.mouseClick(data.mouseX,data.mouseY);
});

