const fs = require('fs');
const path = require('path');

const directions = [
    [-1, 0], // N
    [0, 1],  // E
    [1, 0],  // S
    [0, -1], // W
];

const X = 71;
const Y = 71;

fs.readFile(path.join(__dirname, 'day18.input'), 'utf8', (err, data) => {
    const bytes = [];
    data.split("\n").forEach((line, index) => {
        bytes.push(line.split(',').map(Number));
    });

    const search = binaryIndicesGenerator(bytes.length);
    let direction;

    while (true) {
        const { value: pixel, done} = search.next(direction);

        if (done) {
            break;
        }

        const map = makeMap(bytes.slice(0, pixel));
        const distance = bfs(map);

        console.log(pixel, bytes[pixel], distance);

        direction = distance > 0 ? 1 : 0;
    }
});

function* binaryIndicesGenerator(length) {
    let low = 0;
    let high = length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const direction = yield mid;

        if (direction === 0) {
            high = mid - 1;
        } else if (direction === 1) {
            low = mid + 1;
        }
    }

    return -1;
}

function makeMap(bytes) {
    const map = [];
    for (let i = 0; i < Y; i ++) {
        map.push(new Array(X).fill('.'));
    }

    while (bytes.length > 0) {
        const [x, y] = bytes.shift();
        map[y][x] = '#';
    }

    return map;
}

function onBoard(x, y) {
    return x >= 0 && x < Y && y >= 0 && y < X;
}

function bfs(map) {
    const queue = [[0, 0, 0]];
    const visited = new Set();
    visited.add('0,0');

    while (queue.length > 0) {
        const [x, y, distance] = queue.shift();

        if (x === Y - 1 && y === X - 1) {
            return distance;
        }

        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;

            if (onBoard(newX, newY) && map[x][y] === '.' && !visited.has(`${newX},${newY}`)) {
                queue.push([newX, newY, distance + 1]);
                visited.add(`${newX},${newY}`);
            }
        }
    }

    return -1;
}

function printBoard(map) {
    const toPrint = [];
    for (let i = 0; i < map.length; i++) {
        toPrint.push(map[i].join(''));
    }
    console.log(toPrint.join("\n"));
    console.log("\n");
}
