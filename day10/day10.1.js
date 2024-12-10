const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'day10.input'), 'utf8', (err, data) => {
    const map = [];
    const queue = [];
    data.split("\n").forEach((line, r) => {
        const row = line.split('').map(Number);
        map.push(row);

        row.forEach((value, c) => {
            if (value === 0) {
                queue.push({ pos: [r, c], trail: [[r, c]] });
            }
        });
    });

    const X = map.length;
    const Y = map[0].length;

    let trails = {};

    while (queue.length > 0) {
        const { pos, trail } = queue.shift();
        const value = getValue(map, pos);

        if (value === 9) {
            if(!trails[`${trail[0][0]}:${trail[0][1]}`]) {
                trails[`${trail[0][0]}:${trail[0][1]}`] = [];
            }

            if (!trails[`${trail[0][0]}:${trail[0][1]}`].includes(`${trail[9][0]}:${trail[9][1]}`)) {
                trails[`${trail[0][0]}:${trail[0][1]}`].push(`${trail[9][0]}:${trail[9][1]}`);
            }

            continue;
        }

        const north = getNorth(...pos);
        if (onBoard(north, X, Y) && value === getValue(map, north) - 1) {
            queue.push({ pos: north, trail: [...trail, north] });
        }

        const east = getEast(...pos);
        if (onBoard(east, X, Y) && value === getValue(map, east) - 1) {
            queue.push({ pos: east, trail: [...trail, east] });
        }

        const south = getSouth(...pos);
        if (onBoard(south, X, Y) && value === getValue(map, south) - 1) {
            queue.push({ pos: south, trail: [...trail, south] });
        }

        const west = getWest(...pos);
        if (onBoard(west, X, Y) && value === getValue(map, west) - 1) {
            queue.push({ pos: west, trail: [...trail, west] });
        }
    }

    const score = Object.keys(trails).map(head => trails[head].length).reduce((sum, count) => sum += count, 0);

    console.log(score);
});

function printTrail(trail) {
    return trail.map((pos) => `(${pos[0]}:${pos[1]})`).join(' ');
}

function getValue(map, pos) {
    return map[pos[0]][pos[1]];
}

function getNorth(x, y) { return [x - 1, y]; }

function getEast(x, y) { return [x, y + 1]; }

function getSouth(x, y) { return [x + 1, y]; }

function getWest(x, y) { return [x, y - 1]; }

function onBoard(pos, X, Y) {
    return pos[0] > -1 && pos[0] < X && pos[1] > -1 && pos[1] < Y;
}

function printBoard(map) {
    const toPrint = [];
    for (let i = 0; i < map.length; i++) {
        toPrint.push(map[i].join(''));
    }
    console.log(toPrint.join('\n'));
    console.log("\n\n");
}

function printPosition(map, pos, dir) {
    for (let r = 0; r < map.length; r++) {
        const rowCopy = [ ...map[r] ];
        if (r === pos.x) {
            rowCopy[pos.y] = 'o';
        }

        console.log(rowCopy.join(''));
    }
    console.log("\n\n");
}
