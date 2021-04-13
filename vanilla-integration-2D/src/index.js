import css from "./style.css";
import slika from "./slika.png";

 
var nerdamer = require('nerdamer');
// Load additional modules. These are not required.
require('nerdamer/Algebra');
require('nerdamer/Calculus');
require('nerdamer/Solve');
require('nerdamer/Extra');

var ctx = document.getElementById('myChart').getContext('2d');

let length = document.getElementById('length');
let force_n = document.getElementById('force_n');
let area = document.getElementById('area');
let force_F = document.getElementById('force_F');
let number_el = document.getElementById('number_el');

let submit = document.getElementById('submit');

let form = document.getElementById("container__input--form");

form.addEventListener('submit', (e) => handleSubmit(e));

let parameters = [length.value, force_n.value, area.value, force_F.value, number_el.value];

function handleSubmit(e) {
    e.preventDefault();

    console.log(length.value);

    calculate(length.value, force_n.value, area.value, force_F.value, number_el.value);
}


/* Podatki: m, N/m, N/m, m2, m2, N/m, Mpa, N */
/* let L = 1;
let n1 = 4000;
let n2 = 1000;
let A1 = 4 * 10 ** -4;
let A2 = 1 * 10 ** -4;
let k = 5000 * 10 ** 3;
let Ej = 200 * 10 ** 9;
let F = 1000;

let elements = 4; */
let L_ = 1;
let n1_ = 4000;
let A1_ = 4 * 10 ** -4;
let F_ = 1000;
let elements_ = 4;

calculate(L_, n1_, A1_, F_, elements_);

/* length.value = length.value ? length.value = length.value : length.value = L_;
force_n.value = force_n.value ? force_n.value = force_n.value : force_n.value = n1_;
area.value = area.value ? area.value = area.value : area.value = A1_;
force_F.value = force_F.value ? force_F.value = force_F.value : force_F.value = F_;
number_el.value = number_el.value ? number_el.value = number_el.value : number_el.value = elements_;
 */

/* console.log(n1_); */




function calculate(L, n1, A1, F, elements) {

    length.value = L;
    force_n.value = n1;
    area.value = A1;
    force_F.value = F;
    number_el.value = elements;

    /* if(document.getElementById('myChart').firstChild) {
        let parent = document.getElementById('myChart');
        console.log(parent.childNodes);
        parent.childNodes.remove();
        console.log(1);
    } */

    var c = document.getElementsByClassName('container__chart')[0].children; 

    /* if(c.length > 2) {
        
        c[c.length - 1].remove();
        c[c.length - 2].remove();
        

        let parent = document.getElementsByClassName('container__chart')[0];
        var canvas = document.createElement('canvas');

        parent.appendChild(canvas);
        canvas.id = "myChart";
        canvas.width = 400;
        canvas.height = 400;

        
        
    } */

    console.log(c);

        

    let n2 = 1000;
    let A2 = 1 * 10 ** -4;
    let k = 5000 * 10 ** 3;
    let Ej = 200 * 10 ** 9;

    let n = parseInt(elements) + 1;
    let h = L / (elements / 2);


    let Ke = (Ej*A1/h);

    let Ke_matrix = [1, -1, -1, 1];
    Ke_matrix = Ke_matrix.map((value) => value * Ke)

    /* console.log(Ke_matrix); */

    function zeros(num) {
        let arr = [];
        for(let i = 0; i < num; i++) {
            arr.push(0);
        }
        return arr;
    }

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

    let K = [];
    K = create2DMatrix(n);
    let Ff = zeros(n);
    let Fn = zeros(n);

    /* console.log("n:", n);  */
    console.log(Fn);
    Ke_matrix.forEach(function (value) {
        for(let i = 0; i < elements; i++) {
            K[0][0] = value;
            K[i][i] = 2*value;
            K[i+1][i] = -value;
            K[i][i+1] = -value;
            K[i+1][i+1] = value;
            K[elements-1][elements-1] = 2*value;

            Fn[0] =  n1 * h / 2;
            Fn[i] =  2 * n1 * h / 2;
            Fn[elements] =  n1 * h / 2; 
            console.log(Fn);
        }
    })

    let U = [];

    for(let i = 0; i < n; i++) {
        let j = i + 1;
        U[i] = "u" + j;
        /* console.log(U[i]); */
    }

    U[0] = 0;
    Ff[0] = "Ra";
    Ff[Ff.length - 1] = -F;
    Ff[elements / 2] = F;

    /* console.log(K, U, Ff, Fn); */
    /* console.log(K, U, Ff + Fn); */

    function addMatrix(a,b) {
        for(let i = 0; i < a.length; i++) {
            a[i] += "+" + b[i]
        }

        return a;
    }
    console.log(Fn);
    let addForces = addMatrix(Ff, Fn);
    console.log(addForces);
    

    function dotProduct(matrix, vector) {
        let arr = [];
        let equation = "";
        for(let j = 0; j < matrix.length; j++) {
            for(let i = 0; i < vector.length; i++) {
                equation += `(${matrix[i][j]})*${vector[i]}+`;
                /* console.log(equation); */
            }
            equation = equation.slice(0, -1);
            /* console.log(equation); */
            arr[j] = equation;
            equation = "";
        }

        return arr;
    }

    let dottedProduct = dotProduct(K, U);

    /* console.log(dottedProduct); */

    let arr2=[];
    for(let i = 0; i < dottedProduct.length;i++) {
        arr2[i] = dottedProduct[i] + "=" + addForces[i];
    }
    console.log(arr2);

    var sol = nerdamer.solveEquations(arr2);
    /* console.log(sol.toString()); */

    function range(start, end, step) {
        let x = [];
        let j = (end-start) / step;
        for(let i = 0; i<=j; i++) {
            x.push(i*step);
        }
        return x;
    }

    let xRange = range(0, 2* L, h);


    let solutions = [];
    solutions = sol.map((value, index) => value[1])

    Ke_matrix = Ke_matrix.map((value) => value * Ke)
    /* console.log(xRange[1], sol[1][1]); */
    

    solutions[0] = 0;
    console.log(solutions);
/* const labels = [
    xRange 
  ]; */
  const data = {
    labels: xRange,
    datasets: [{
      label: 'u[x] Pomik v odvisnosti od razdalje',
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: solutions,
      tension: 0.0
    }]
  };

  
  // </block:setup>
  
  // <block:config:0>
  const config = {
    type: 'line',
    data,
    options: {},
  };
  // </block:config>

  

  var myChart = new Chart(document.getElementById('myChart'), config);
  /* console.log(myChart); */
}


var img = document.createElement("img");
img.src = slika;

var src = document.getElementById("slika");
src.appendChild(img);



