
/* Podatki: m, N/m, N/m, m2, m2, N/m, Mpa, N */
let L = 1;
let n1 = 4000;
let n2 = 1000;
let A1 = 4 * 10 ** -4;
let A2 = 1 * 10 ** -4;
let k = 5000 * 10 ** 3;
let Ej = 200 * 10 ** 9;
let F = 1000;

let elements = 4;
let n = elements + 1;
let h = L / 2;


let Ke = (Ej*A1/h);

var Ke_matrix = math.ones(2,2);
Ke_matrix.subset(math.index(0,0), 1);
Ke_matrix.subset(math.index(1,1), 1);
Ke_matrix.subset(math.index(1,0), -1);
Ke_matrix.subset(math.index(0,1), -1);

Ke_matrix = Ke_matrix.map(function (value, index, matrix) {
    return value * Ke; 
})

/* console.log(Ke_matrix); */

let K = math.zeros(n, n);
let Ff = math.zeros(n);
let Fn = math.zeros(n);

/* console.log(K, Ff, Fn); */

/* math.add(K, Ke_matrix); */
K.subset(math.index(0,0), -1);

Ke_matrix.forEach(function (value, index, matrix) {
    for(let i = 0; i < elements; i++) {
        K.subset(math.index(0,0), value);
        K.subset(math.index(i, i), 2*value); 
        K.subset(math.index(i+1, i), -value); 
        K.subset(math.index(i, i+1), -value); 
        K.subset(math.index(i+1, i+1), +value);
        K.subset(math.index(elements-1,elements-1), value);

        Fn.subset(math.index(0), n1 * h / 2)
        Fn.subset(math.index(i), 2 * n1 * h / 2);
        Fn.subset(math.index(elements), n1 * h / 2);
    }
}) 

let U = math.ones(n);

for(var i = 0; i < elements+1; i++) {
    U.subset(math.index(i),"u" + i)
}
console.log(U)

U.subset(math.index(0),0);

Ff.subset(math.index(0),"Ra");
Ff.subset(math.index(elements),-F);
Ff.subset(math.index(elements/2),F);

console.log(Ff);

/* console.log(math.multiply(U, K)); */

/* math.evaluate('Ff + Fn = K.U'); */
const res = math.compile('K.U = Ff + Fn');
res.evaluate();