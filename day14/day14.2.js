const fs = require('fs');
const path = require('path');
const readline = require('readline');

const X = 101;
const Y = 103;
const bots = [];
let currentFrame = 0;

fs.readFile(path.join(__dirname, 'day14.input'), 'utf8', (err, data) => {
    data.split("\n").forEach((line, index) => {
        const [p, v] = line.split(' ')
            .map((e) => e.split('=')[1])
            .map((e) => e.split(',').map(Number))
        ;

        bots.push([p, v]);
    });
});

function posAtSecond(position, velocity, second) {
    let x = (position[0] + second * velocity[0]) % X;
    let y = (position[1] + second * velocity[1]) % Y;

    x = x < 0 ? X + x : x;
    y = y < 0 ? Y + y : y;

    return [x, y];
}

function initializeMap() {
    const map = [];
    for (let i = 0; i < Y; i++) {
        map.push((new Array(X)).fill('.'));
    }

    return map;
}

function placeRobots(positions, map) {
    positions.forEach((pos) => {
        map[pos[1]][pos[0]] = '#';
    });

    return map;
}

function printBoard(map) {
    const toPrint = [];
    for (let i = 0; i < map.length; i++) {
        toPrint.push(map[i].join(''));
    }
    console.log(toPrint.join('\n'));
}

function renderFrame(second) {
    console.clear();
    console.log(`Frame: ${second}`);

    let positions = bots.map((bot) => posAtSecond(bot[0], bot[1], second));
    printBoard(placeRobots(positions, initializeMap()));
}

function handleKeyPress(str, key) {
    if (key.name === 'right') {
        currentFrame += 1;
    } else if (key.name === 'left') {
        currentFrame = currentFrame - 1 < 0 ? 0 : currentFrame - 1;
    } else if (key.name === 'q') {
        process.exit();
    }

    renderFrame(currentFrame);
}

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', handleKeyPress);
