import 'mathjs';

/* Podatki: m, N/m, N/m, m2, m2, N/m, Mpa, N */
let L = 1;
let n1 = 4000;
let n2 = 1000;
let A1 = 4 * 10 ** -4;
let A2 = 1 * 10 ** -4;
let k = 5000 * 10 ** 3;
let Ej = 200 * 10 ** 9;
let F = 1000;

let elements = 5;
let n = elements + 1;
let h = L / 2;

/* let arr = []; */

function create2DMatrix(i, j = i) {
    let arr = [];
    for(let x = 0; x < i; x++){
        arr[x] = [];    
        for(let y = 0; y < j; y++){ 
            arr[x][y] = 0;
        }
    }
    return arr;
}

function create1DMatrix(i) {
    let arr = [];
    for(let x = 0; x < i; x++){
        arr[x] = 0;    
    }
    return arr;
}

let Ke = (Ej*A1/h);
var Ke_matrix = create2DMatrix(2);

Ke_matrix[0][0] = Ke_matrix[1][1] = 1;
Ke_matrix[1][0] = Ke_matrix[0][1] = -1;

for(let i = 0; i < Ke_matrix.length; i++) {
    for(let j = 0; j < Ke_matrix[i].length; j++) {
        Ke_matrix[i][j] *= Ke;
    }
}

/* console.log(Ke_matrix); */
let K = create2DMatrix(n);
let Ff = create1DMatrix(n);
let Fn = create1DMatrix(n);

console.log(Ke_matrix);











/* console.log(Ke_matrix);
console.log(Ff);
console.log(Fn); */

/* console.log(K); */

/* for(i = 0; i <= elements; i++) {
    for(j = 0; j <= 3; j++) {
        K[i][j] += Ke_matrix[i][j];

        /* K[i+1][j+1] += Ke_matrix[i][j]; */
        /* K[i+1][j+1] += Ke_matrix[i][j+1]; */
   /*  }
}*/ 
/* console.log(Ke_matrix); */
/* let count = 0;
while(count < elements) {
    for(i = 0; i <= elements; i++) {
        if(i < Ke_matrix.length) {
            for(j = 0; j < Ke_matrix.length; j++) {
                K[i][j] += Ke_matrix[i][j]; 
                console.log(Ke_matrix[i][j]);
                console.log(i, j);
            }   
        } else {
            i = i % 2;
            console.log(i)
        }
    }
    count++;
} */


console.log(K);
