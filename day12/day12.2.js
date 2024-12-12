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
            price += result.area * result.edges;
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
    const neighboringTiles = {};

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
                if (!neighboringTiles[`${step[0]}:${step[1]}`]) {
                    neighboringTiles[`${step[0]}:${step[1]}`] = [];
                }

                neighboringTiles[`${step[0]}:${step[1]}`].push(dir[0]);
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
        perimeter: Object.values(neighboringTiles).reduce((sum, entries) => sum + entries.length, 0),
        edges: Object.keys(findEdges(neighboringTiles)).length,
    };
}

function findEdges(neighboringTiles) {
    const edges = {};
    Object.keys(neighboringTiles).forEach((key) => {
        const pos = key.split(':').map(Number);
        for(const dir of neighboringTiles[key]) {
            if (dir === 'n' || dir === 's') {
                // horizontal edge
                // search most west
                let delta = 0;
                while (
                    Object.keys(neighboringTiles).includes(`${pos[0]}:${pos[1] + delta}`) &&
                    neighboringTiles[`${pos[0]}:${pos[1] + delta}`].includes(dir)
                    ) {
                    delta -= 1;
                }

                const leftmost = [pos[0], pos[1] + delta + 1];

                edges[`${dir}:${leftmost[0]}:${leftmost[1]}`] = (edges[`${dir}:${leftmost[0]}:${leftmost[1]}`] || 0)  + 1;
            } else {
                // vertical edge
                // search most north
                let delta = 0;
                while (
                    Object.keys(neighboringTiles).includes(`${pos[0] + delta}:${pos[1]}`) &&
                    neighboringTiles[`${pos[0] + delta}:${pos[1]}`].includes(dir)
                    ) {
                    delta -= 1;
                }

                const topmost = [pos[0] + delta + 1, pos[1]];

                edges[`${dir}:${topmost[0]}:${topmost[1]}`] = (edges[`${dir}:${topmost[0]}:${topmost[1]}`] || 0) + 1;
            }
        }
    });

    return edges;
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
