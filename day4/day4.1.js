const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'day4.input'), 'utf8', (err, data) => {
    const mat = [];
    data.split("\n").forEach((line, index) => {
        mat.push(line.split(''));
    });

    let count = 0;
    for (let r = 0; r < mat.length; r++) {
        for (let c = 0; c < mat[r].length; c++) {
            if (mat[r][c] === 'X') {
                count += countXMAS(mat, r, c);
            }
        }
    }

    console.log(count);
});

function countXMAS(mat, r, c) {
    const maxR = mat.length;
    const maxC = mat[0].length;

    let count = 0;

    const directions = [
        [[0, 0], [-1, 0], [-2, 0], [-3, 0]], // N
        [[0, 0], [-1, 1], [-2, 2], [-3, 3]], // NE
        [[0, 0], [ 0, 1], [ 0, 2], [ 0, 3]], // E
        [[0, 0], [ 1, 1], [ 2, 2], [ 3, 3]], // SE
        [[0, 0], [ 1, 0], [ 2, 0], [ 3, 0]], // S
        [[0, 0], [ 1,-1], [ 2,-2], [ 3,-3]], // SW
        [[0, 0], [ 0,-1], [ 0,-2], [ 0,-3]], // W
        [[0, 0], [-1,-1], [-2,-2], [-3,-3]], // NW
    ];

    directions.forEach(direction => {
        const pos = direction.map(coords => {
            const x = coords[0] + r;
            const y = coords[1] + c;

            if (x < maxR && x > -1 && y < maxC && y > -1) {
                return mat[x][y];
            }

            return '.';
        });

        const text = pos.join('');
        if (text === 'XMAS') {
            count++;
        }
    });

    return count;
}
