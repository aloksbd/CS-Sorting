MergeSort = function(_points){
    var self = {
        points: _points,
        n: points.length,
        i: 0,
        j: 0,
        swaped: false,
        sorted: false,
        sorting: false,
    }
    self.levels = 0;
    self.lmh = [];

    self.merge = function(low,high){
        var mid;
        mid = parseInt((low + high) / 2);
        if(low < high) {
            self.merge(low, mid);
            self.merge(mid+1, high);
            self.lmh.push({l:low,m:mid,h:high});
        } else { 
        }   
    }

    self.update = function(){
        if (self.sorting){
            return;
        }
        self.sorting = true;
        if (self.sorted){
            return;
        }

        if (self.lmh.length == 0){
            self.merge(0,self.n-1);
        }

        var clmh = self.lmh[self.i];
        var tPoints = [];

        var l = clmh.l;
        var h = clmh.m + 1;

        while (l <= clmh.m && h <= clmh.h){
            if (self.points[l].r > self.points[h].r){
                tPoints.push({r: self.points[l].r, color: self.points[l].color});
                l++;
            }else{
                tPoints.push({r: self.points[h].r, color: self.points[h].color});
                h++;
            }
        }
        
        while (l <= clmh.m){
            tPoints.push({r: self.points[l].r, color: self.points[l].color});
            l++;
        } 
        
        while (h <= clmh.h){
            tPoints.push({r: self.points[h].r, color: self.points[h].color});
            h++;
        }
        l = clmh.l;
        for (i = 0;i < tPoints.length;i++){
            self.points[l].r = tPoints[i].r;
            self.points[l].color = tPoints[i].color;
            self.points[l].draw();
            l++;
        }

        self.i++;
        if(self.i == self.lmh.length){
            self.sorted = true;
        }
        self.sorting = false;
    }

    return self;
}