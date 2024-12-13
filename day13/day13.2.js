const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'day13.input'), 'utf8', (err, data) => {
    let tokens = 0;

    data.split("\n\n").forEach((group, index) => {
        const lines = group.split("\n");

        const buttonA = lines[0].split(': ')[1].split(', ').map((v) => v.split('+')[1]).map(Number);
        const buttonB = lines[1].split(': ')[1].split(', ').map((v) => v.split('+')[1]).map(Number);
        const prize = lines[2].split(': ')[1].split(', ').map((v) => v.split('=')[1]).map(Number);

        tokens += strategy(buttonA, buttonB, prize.map(c => c + 10000000000000));
    });

    console.log(tokens);
});

// Cramer's rule https://en.wikipedia.org/wiki/Cramer%27s_rule
function strategy(buttonA, buttonB, prize) {
    const delta = buttonA[0] * buttonB[1] - buttonB[0] * buttonA[1];
    const deltaX = prize[0] * buttonB[1] - prize[1] * buttonB[0];
    const deltaY = prize[1] * buttonA[0] - prize[0] * buttonA[1];

    if (delta !== 0) {
        const aPushes = deltaX / delta;
        const bPushes = deltaY / delta;

        if (Math.floor(aPushes) === aPushes && Math.floor(bPushes) === bPushes) {
            return aPushes * 3 + bPushes;
        }
    }

    return 0;
}
