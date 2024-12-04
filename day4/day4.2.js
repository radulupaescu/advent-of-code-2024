const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'day4.input'), 'utf8', (err, data) => {
    const mat = [];
    data.split("\n").forEach((line, index) => {
        mat.push(line.split(''));
    });

    let count = 0;
    for (let r = 1; r < mat.length - 1; r++) {
        for (let c = 1; c < mat[r].length - 1; c++) {
            if (mat[r][c] === 'A') {
                count += countXMAS(mat, r, c);
            }
        }
    }

    console.log(count);
});

function countXMAS(mat, r, c) {
    const diag1 = mat[r - 1][c - 1] + mat[r][c] + mat[r + 1][c + 1];
    const diag2 = mat[r + 1][c - 1] + mat[r][c] + mat[r - 1][c + 1];

    if ((diag1 === 'MAS' || diag1 === 'SAM') && (diag2 === 'MAS' || diag2 === 'SAM')) {
        return 1;
    }

    return 0;
}
