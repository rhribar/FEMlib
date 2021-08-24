import css from "./style.css";
import slika from "./slika.png";
require('./style.css');

let nerdamer = require('nerdamer');
// Load additional modules. These are not required.
require('nerdamer/Algebra');
require('nerdamer/Calculus');
require('nerdamer/Solve');
require('nerdamer/Extra');

/**
 * Getting the elements from the DOM.
 */
let ctx = document.getElementById('myChart').getContext('2d');
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

    if(number_el.value <= 8 && number_el.value >= 0 && number_el.value % 2 == 0) {
        calculate(length.value, force_n.value, area.value, force_F.value, number_el.value);
    } else {
        alert("Oops, you went out of bounds for this calculator!")
    }
}

/**
 * Define the variables.
 */
let L_ = 1;
let n1_ = 4000;
let A1_ = 4 * 10 ** -4;
let F_ = 1000;
let elements_ = 4;

calculate(L_, n1_, A1_, F_, elements_);

/**
 * Calculate function.
 */
function calculate(L, n1, A1, F, elements) {
    length.value = L;
    force_n.value = n1;
    area.value = A1;
    force_F.value = F;
    number_el.value = elements;

    let c = document.getElementsByClassName('container__chart')[0].children; 

    let Ej = 200 * 10 ** 9;

    let n = parseInt(elements) + 1;
    let h = L / (elements / 2);

    let Ke = (Ej*A1/h);

    let Ke_matrix = [1, -1, -1, 1];
    Ke_matrix = Ke_matrix.map((value) => value * Ke)

    /**
     * Function for creating matrix with all zeros.
     */
    function zeros(num) {
        let arr = [];
        for(let i = 0; i < num; i++) {
            arr.push(0);
        }
        return arr;
    }

    /**
     * Function for creating 2D matrix.
     */
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

    /**
     * Function for adding one matrix diagonally to another matrix.
     */
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
            /* console.log(Fn); */
        }
    })

    let U = [];

    for(let i = 0; i < n; i++) {
        let j = i + 1;
        U[i] = "u" + j;
    }

    U[0] = 0;
    Ff[0] = "Ra";
    Ff[Ff.length - 1] = -F;
    Ff[elements / 2] = F;

    function addMatrix(a,b) {
        for(let i = 0; i < a.length; i++) {
            a[i] += "+" + b[i]
        }

        return a;
    }
    console.log(Fn);
    let addForces = addMatrix(Ff, Fn);
    console.log(addForces);
    
    /**
     * Function for calculating the dot product between matrix and vector.
     */
    function dotProduct(matrix, vector) {
        let arr = [];
        let equation = "";
        for(let j = 0; j < matrix.length; j++) {
            for(let i = 0; i < vector.length; i++) {
                equation += `(${matrix[i][j]})*${vector[i]}+`;
            }
            equation = equation.slice(0, -1);
            arr[j] = equation;
            equation = "";
        }

        return arr;
    }

    let dottedProduct = dotProduct(K, U);

    let equations=[];
    for(let i = 0; i < dottedProduct.length;i++) {
        equations[i] = dottedProduct[i] + "=" + addForces[i];
    }
    equations.forEach(el => console.log(el));


    let dataSolutions = nerdamer.solveEquations(equations);

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
    solutions = dataSolutions.map((value, index) => value[1])

    Ke_matrix = Ke_matrix.map((value) => value * Ke)

    solutions[0] = 0;
    console.log(solutions);

    /**
     * Function defining chart config.
     */
    const data = {
        labels: xRange,
        datasets: [{
            label: 'u[x] Pomik v odvisnosti od razdalje',
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: solutions,
            tension: 0.0,
        }]
    };

    // </block:setup>
    
    // <block:config:0>
    const config = {
        type: 'line',
        data,
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Pomik u [m]',
                        fontSize: 20,
                    },
                    
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Razdalja nosilca x [m]',
                        fontSize: 20,
                    }
                }]
            }   
        },
    };
    // </block:config>
    let myChart = document.getElementById('myChart');

    let myChart2 = new Chart(myChart, config);
    /* console.log(myChart); */
}

let img = document.createElement("img");
img.src = slika;

let src = document.getElementById("slika");
src.appendChild(img);
