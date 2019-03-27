BubbleSort = function(_points){
    var self = {
        points: _points,
        n: points.length,
        i: 0,
        j: 0,
        swaped: false,
        sorted: false,
        sorting: false
    }

    self.update = function(){
        if (self.sorting){
            return;
        }
        self.sorting = true;
        if (self.sorted){
            return;
        }
        if (self.i > self.n-1){
            self.sorted = true;
            return;
        }

        for (j = 0;j<self.n-1;j++){
            if (self.points[self.j].r < self.points[self.j+1].r){
                var t = {
                    r: self.points[self.j].r,
                    color: self.points[self.j].color
                }
                self.points[self.j].r = self.points[self.j+1].r;
                self.points[self.j].color = self.points[self.j+1].color;
                self.points[self.j+1].r = t.r;
                self.points[self.j+1].color = t.color;
                self.swaped = true;
                self.points[self.j].draw();
                self.points[self.j+1].draw();
            }
            self.j++;
        }
        
        if (!self.swaped){
            self.sorted = true;
        }
        self.j = 0;
        self.i++;
        self.sorting = false;
    }

    return self;
}