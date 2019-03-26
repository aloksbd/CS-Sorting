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
        console.log(self.i,self.j);
        if (self.sorted){
            return;
        }
        if (self.i > self.n-1){
            self.sorted = true;
            return;
        }

        for (j = 0;j<self.n-1;j++)
        // if(self.j < self.n-2)
        {
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
                console.log('swaped');
                self.points[self.j].draw();
                self.points[self.j+1].draw();
            }
            self.j++;
        }
        // else{
            if (!self.swaped){
                self.sorted = true;
            }
            self.j = 0;
            self.i++;
            self.sorting = false;
        // }
    }

    // self.update = function(){
    //     console.log('.......',self.n);
    //     for(i = 0; i < self.n; i++)
    //     {
    //         var swaped = false;
    //         for(j = 0; j < self.n-1; j++){
    //             // console.log(i,j)
    //             if (self.points[j].r < self.points[j+1].r){
    //                 var t = {
    //                     r: self.points[j].r,
    //                     color: self.points[j].color
    //                 }
    //                 self.points[j].r = self.points[j+1].r;
    //                 self.points[j].color = self.points[j+1].color;
    //                 self.points[j+1].r = t.r;
    //                 self.points[j+1].color = t.color;
    //                 swaped = true;
    //                 // console.log('swaped');
    //                 self.points[j].draw();
    //                 self.points[j+1].draw();
    //             }
    //         }
    //         if(!swaped){
    //             break;
    //         }
    //         console.log(i);
    //     }
    //     console.log('.....stopped');
    // }

    return self;
}