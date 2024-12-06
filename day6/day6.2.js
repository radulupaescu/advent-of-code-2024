const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'day6.input'), 'utf8', (err, data) => {
    const map = [];
    const start = { x: -1, y: -1 };
    const dir = { x: -1, y: 0 };

    data.split("\n").forEach((line, index) => {
        map.push(line.split(''));

        if (line.indexOf('^') > -1) {
            start.x = index;
            start.y = line.indexOf('^');
            map[start.x][start.y] = '.';
        }
    });

    let options = 0;

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] === '#' || (i === start.x && j === start.y)) {
                continue;
            }

            if (search(map, start, dir, { x: i, y: j })) {
                options++;
            }
        }
    }

    console.log(options);
});

function search(originalMap, coords, dir, obstacle) {
    const map = clone(originalMap);
    map[obstacle.x][obstacle.y] = '#';

    const visited = {};
    visited[`${coords.x}:${coords.y}:${dir.x}:${dir.y}`] = 1;

    let ret = step(map, coords, dir);
    let loop = false;
    while (ret.status === true && !loop) {
        if (visited[`${ret.coords.x}:${ret.coords.y}:${ret.dir.x}:${ret.dir.y}`] === 1) {
            loop = true;
        }

        visited[`${ret.coords.x}:${ret.coords.y}:${ret.dir.x}:${ret.dir.y}`] = 1

        ret = step(map, ret.coords, ret.dir);
    }

    return loop;
}

function step(map, coords, dir) {
    let newDir = dir;
    let newCoords = {
        x: coords.x + newDir.x,
        y: coords.y + newDir.y,
    }

    while (stillOnBoard(newCoords, map.length, map[0].length) && map[newCoords.x][newCoords.y] === '#') {
        newDir = nextDirection(newDir);
        newCoords = {
            x: coords.x + newDir.x,
            y: coords.y + newDir.y,
        }
    }

    if (stillOnBoard(newCoords, map.length, map[0].length) && map[newCoords.x][newCoords.y] === '.') {
        return {
            status: true,
            coords: newCoords,
            dir: newDir,
        };
    }

    return {
        status: false,
        coords: newCoords,
        dir: newDir
    };
}

function clone(map) {
    const newMap = [];
    for (let i = 0; i < map.length; i++) {
        newMap.push([...map[i]]);
    }

    return newMap;
}

function stillOnBoard(coords, maxX, maxY) {
    return coords.x < maxX && coords.x > -1 && coords.y < maxY && coords.y > -1;
}

function nextDirection(dir) {
    const dirs = [{x: -1, y: 0}, {x: 0, y: 1}, {x: 1, y: 0}, {x: 0, y: -1}];
    const idx = dirs.findIndex(
        (ndir) => ndir.x === dir.x && ndir.y === dir.y
    );

    return dirs[(idx + 1) % dirs.length];
}

function printBoard(map) {
    const toPrint = [];
    for (let i = 0; i < map.length; i++) {
        toPrint.push(map[i].join(''));
    }
    console.log(toPrint.join('\n'));
    console.log('---------');
}

function printPosition(map, pos, dir) {
    for (let r = 0; r < map.length; r++) {
        const rowCopy = [ ...map[r] ];
        if (r === pos.x) {
            rowCopy[pos.y] = 'o';
        }

        console.log(rowCopy.join(''));
    }
    console.log('------------------');
}
