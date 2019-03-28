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
        // console.log(low,high);
        var mid;
        mid = parseInt((low + high) / 2);
        if(low < high) {
            // console.log(mid);
            self.merge(low, mid);
            self.merge(mid+1, high);
            self.lmh.push({l:low,m:mid,h:high});
        } else { 
            // self.lmh.push({l:low,m:mid,h:high});
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
        // console.log(self.lmh);

        var clmh = self.lmh[self.i];
        var tPoints = [];
        // console.log(self.lmh[self.i]);

        var l = clmh.l;
        var h = clmh.m + 1;
        // var h = clmh.h;

        while (l <= clmh.m && h <= clmh.h){
            // console.log(l,self.points[l].r,'   ',h,self.points[h].r);
            if (self.points[l].r > self.points[h].r){
                // console.log('l',l,self.points[l]);
                tPoints.push({r: self.points[l].r, color: self.points[l].color});
                l++;
            }else{
                // console.log('h',h,self.points[h]);
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
        // console.log(tPoints);
        for (i = 0;i < tPoints.length;i++){
            self.points[l].r = tPoints[i].r;
            self.points[l].color = tPoints[i].color;
            self.points[l].draw();
            // console.log('.......',self.points[l].r);
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

// Step 1 − if it is only one element in the list it is already sorted, return.
// Step 2 − divide the list recursively into two halves until it can no more be divided.
// Step 3 − merge the smaller lists into new list in sorted order.