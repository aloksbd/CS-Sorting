SelectionSort = function(_points){
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

        var min = self.points[self.i].r;
        var pos = self.i;
        for (j = self.i;j<self.n;j++){
            if (self.points[j].r > min){
                min = self.points[j].r
                pos = j;   
            }
        }
        if (self.i != pos){
            var t = {
                r: self.points[self.i].r,
                color: self.points[self.i].color
            }
            self.points[self.i].r = self.points[pos].r;
            self.points[self.i].color = self.points[pos].color;
            self.points[pos].r = t.r;
            self.points[pos].color = t.color;
            self.swaped = true;
            self.points[self.i].draw();
            self.points[pos].draw();
        }
        self.i++;
        self.sorting = false;
    }

    return self;
}

// Step 1 − Set MIN to location 0
// Step 2 − Search the minimum element in the list
// Step 3 − Swap with value at location MIN
// Step 4 − Increment MIN to point to next element
// Step 5 − Repeat until list is sorted