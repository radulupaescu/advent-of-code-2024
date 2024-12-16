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

fs.readFile(path.join(__dirname, 'day16.input'), 'utf8', (err, data) => {
    const arena = [];
    data.split("\n").forEach((line, index) => {
        arena.push(line.split(''));
    });
    X = arena.length;
    Y = arena[0].length;
    start = { x: X - 2, y: 1 };
    end = { x: 1, y: Y - 2 };

    arena[start.x][start.y] = '.';
    arena[end.x][end.y] = '.';

    const costs = [];
    for (let d = 0; d < 4; d++) {
        const rows = [];
        for (let i = 0; i < X; i++) {
            rows.push([]);
            for (let j = 0; j < Y; j++){
                rows[i].push(99999999);
            }
        }
        costs[d] = rows;
    }

    costs[0][start.x][start.y] = 0;

    const queue = [ { pos: start, dir: 0 }];
    while (queue.length > 0) {
        const { pos, dir } = queue.shift();

        if (arena[pos.x + directions[dir][0]][pos.y  + directions[dir][1]] !== '#'
            && costs[dir][pos.x + directions[dir][0]][pos.y  + directions[dir][1]] > costs[dir][pos.x][pos.y] + 1
        ){
            costs[dir][pos.x + directions[dir][0]][pos.y  + directions[dir][1]] = costs[dir][pos.x][pos.y] + 1;
            queue.push({
                pos: {
                    x: pos.x + directions[dir][0],
                    y: pos.y + directions[dir][1],
                },
                dir: dir,
            });
        }

        for (let i = 1; i < 4; i++) {
            const newDir = (dir + i) % 4;
            if (costs[newDir][pos.x][pos.y] > costs[dir][pos.x][pos.y] + rotPenalty[i]) {
                costs[newDir][pos.x][pos.y] = costs[dir][pos.x][pos.y] + rotPenalty[i];
                queue.push({
                    pos: { x: pos.x, y: pos.y },
                    dir: newDir,
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

    console.log(min);
    // printBoard(arena, start, end);
});

function printBoard(map, start, end) {
    const toPrint = [];
    for (let i = 0; i < map.length; i++) {
        let line = map[i].join('');
        if (i === start.x) { line = line.replaceAt(start.y, 'S'); }
        if (i === end.x) { line = line.replaceAt(end.y, 'E'); }

        toPrint.push(line);
    }
    console.log(toPrint.join('\n'));
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}
