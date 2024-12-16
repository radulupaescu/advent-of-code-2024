const fs = require('fs');
const path = require('path');

const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];
const rotPenalty = [0, 1000, 2000, 1000];

let X, Y, start, end;

fs.readFile(path.join(__dirname, 'day16.input.ex2'), 'utf8', async (err, data) => {
    const arena = [];
    data.split("\n").forEach((line, index) => {
        arena.push(line.split(''));
    });
    X = arena.length;
    Y = arena[0].length;
    start = {x: X - 2, y: 1};
    end = {x: 1, y: Y - 2};

    arena[start.x][start.y] = '.';
    arena[end.x][end.y] = '.';

    const costs = [];
    for (let d = 0; d < 4; d++) {
        const rows = [];
        for (let i = 0; i < X; i++) {
            rows.push([]);
            for (let j = 0; j < Y; j++) {
                rows[i].push(99999999);
            }
        }
        costs[d] = rows;
    }

    costs[0][start.x][start.y] = 0;

    const paths = {};

    const queue = [{pos: start, dir: 0, path: [start]}];
    while (queue.length > 0) {
        const {pos, dir, path} = queue.shift();

        if (pos.x === end.x && pos.y === end.y) {
            if (!paths[`${costs[dir][pos.x][pos.y]}`]) {
                paths[`${costs[dir][pos.x][pos.y]}`] = [];
            }

            paths[`${costs[dir][pos.x][pos.y]}`].push(path);

            continue;
        }

        const nextPos = {
            x: pos.x + directions[dir][0],
            y: pos.y + directions[dir][1],
        };

        if (arena[nextPos.x][nextPos.y] !== '#'
            && costs[dir][nextPos.x][nextPos.y] >= costs[dir][pos.x][pos.y] + 1
        ) {
            costs[dir][nextPos.x][nextPos.y] = costs[dir][pos.x][pos.y] + 1;
            queue.push({
                pos: nextPos,
                dir: dir,
                path: [...path, nextPos],
            });
        }

        for (let i = 1; i < 4; i++) {
            const newDir = (dir + i) % 4;
            if (costs[newDir][pos.x][pos.y] >= costs[dir][pos.x][pos.y] + rotPenalty[i]) {
                costs[newDir][pos.x][pos.y] = costs[dir][pos.x][pos.y] + rotPenalty[i];
                queue.push({
                    pos: {x: pos.x, y: pos.y,},
                    dir: newDir,
                    path: [...path],
                });
            }
        }
    }

    let min = costs[0][end.x][end.y];
    for (let i = 0; i < 4; i++) {
        if (min > costs[i][end.x][end.y]) {
            min = costs[i][end.x][end.y];
        }
    }

    const uniquePoints = paths[`${min}`].flat().filter((point, index, self) =>
        index === self.findIndex(p => p.x === point.x && p.y === point.y)
    );

    console.log(uniquePoints.length);

    // printBoard(arena, start, end, paths[`${min}`].flat());
});

function printBoard(map, start, end, path) {
    const toPrint = [];
    for (let i = 0; i < map.length; i++) {
        let line = map[i].join('');
        if (i === start.x) { line = line.replaceAt(start.y, 'S'); }
        if (i === end.x) { line = line.replaceAt(end.y, 'E'); }

        toPrint.push(line);
    }

    path.forEach((point) => {
        toPrint[point.x] = toPrint[point.x].replaceAt(point.y, 'O');
    });

    console.clear();
    console.log(toPrint.join('\n'));
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
