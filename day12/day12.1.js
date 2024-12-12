const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'day12.input'), 'utf8', (err, data) => {
    const map = [];
    let filled = [];
    data.split("\n").forEach((line, index) => {
        line = line.split('');
        map.push(line);
        filled.push((new Array(line.length)).fill(-1));
    });

    let price = 0;
    let color = 0;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (filled[i][j] > -1) { continue; }

            const result = fill(map, [i, j], color, filled);
            filled = result.filled;
            price += result.area * result.perimeter;
            color++;
        }
    }

    console.log(price);
});

function fill(map, pos, color, filled) {
    const queue = [pos];
    const X = map.length;
    const Y = map[0].length;
    let area = 0;
    const neighboringPos = {};

    const directions = {
        north: (x, y) => [x - 1, y],
        east: (x, y) => [x, y + 1],
        south: (x, y) => [x + 1, y],
        west: (x, y) => [x, y - 1],
    };

    while (queue.length > 0) {
        const pos = queue.shift();
        const value = getValue(map, pos);

        Object.keys(directions).forEach((dir) => {
            const step = directions[dir](...pos);
            if (onBoard(step, X, Y)
                && value === getValue(map, step)
                && getValue(filled, pos) !== color
                && getValue(filled, step) !== color
            ) {
                queue.push(step);
            } else if (getValue(filled, pos) !== color && (!onBoard(step, X, Y) || value !== getValue(map, step))) {
                neighboringPos[`${step[0]}:${step[1]}`] = (neighboringPos[`${step[0]}:${step[1]}`] || 0) + 1;
            }
        });

        if (filled[pos[0]][pos[1]] !== color) {
            filled[pos[0]][pos[1]] = color;
            area++;
        }
    }

    return {
        filled,
        area: area,
        perimeter: Object.values(neighboringPos).reduce((sum, entries) => sum + entries, 0),
    };
}

function getValue(map, pos) {
    return map[pos[0]][pos[1]];
}

function onBoard(pos, X, Y) {
    return pos[0] > -1 && pos[0] < X && pos[1] > -1 && pos[1] < Y;
}

function printBoard(map) {
    const toPrint = [];
    for (let i = 0; i < map.length; i++) {
        toPrint.push(map[i].map(element => element.toString().padStart(3)).join(''));
    }
    console.log(toPrint.join('\n'));
    console.log("\n");
}
