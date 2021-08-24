let size = 5;
const testMatrix = new Matrix(size);

/* testMatrix; */

console.log(testMatrix.ones());
/* console.log(testMatrix.ones().toString(0)); */

/* function toString(precision=4) {
    let strings = Array.from(
        this, row => Array.from(row, v => v.toFixed(precision)));
    let colLens = Array.from(
        range(this.n), j => Math.max(...strings.map(row => row[j].length)));
    return strings.map(
        row => '[' + row.map(
            (val, j) => val.padStart(colLens[j], ' ')).join(' ') + ']')
        .join('\n');
}
 */


function print() {
    console.log(testMatrix.ones().toString(0));
}

print();
//Matrix.create([1, 2], [3, 4], [5, 6]).toString(1);
    // "[1.0 2.0]
    //  [3.0 4.0]
    //  [5.0 6.0]"

