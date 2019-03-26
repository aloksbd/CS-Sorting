Points = function(_x,_y,_r){
    var self = {
        x: _x,
        y: _y,
        r: _r,
        color: "rgba(" + r + "," + r + "," + r  + ",1)"
    }

    self.draw = function(){
        ctx.fillStyle = self.color;
        ctx.fillRect(self.x,self.y,4,4);
    }

    return self;
}