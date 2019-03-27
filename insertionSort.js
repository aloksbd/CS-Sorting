InsertionSort = function(_points){
    var self = {
        points: _points,
        n: points.length,
        i: 1,
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
        var j = self.i;
        while (j > 0){
            if (self.points[j].r > self.points[j - 1].r){
                var t = {
                    r: self.points[j].r,
                    color: self.points[j].color
                }
                self.points[j].r = self.points[j-1].r;
                self.points[j].color = self.points[j-1].color;
                self.points[j-1].r = t.r;
                self.points[j-1].color = t.color;
                self.swaped = true;
                self.points[j].draw();
                self.points[j-1].draw();
            }else{
                break;
            }
            j--;
        }
        self.i++;
        self.sorting = false;
    }
            
    return self
}