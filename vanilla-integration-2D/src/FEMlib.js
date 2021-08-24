function Matrix(i, j = i) {
    this.i = i;
    this.j = j;
/*     console.log(i, j); */
}

/* Matrix.prototype.log = function() {

} */

Matrix.prototype.init = function() {
    let arr = [];
        for(let x = 0; x < this.i; x++){
            arr[x] = [];    
            for(let y = 0; y < this.j; y++){ 
                arr[x][y] = 0;
            }
        }
    return arr;
}

Matrix.prototype.zeros = function() {
    let arr = [];
        for(let x = 0; x < this.i; x++){
            arr[x] = [];    
            for(let y = 0; y < this.j; y++){ 
                arr[x][y] = 0;
            }
        }
    return arr;
}

Matrix.prototype.ones = function() {
    let arr = [];
        for(let x = 0; x < this.i; x++){
            arr[x] = [];    
            for(let y = 0; y < this.j; y++){ 
                arr[x][y] = 1;s
            }
        }
    return arr;
}