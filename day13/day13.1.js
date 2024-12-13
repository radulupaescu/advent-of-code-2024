const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'day13.input'), 'utf8', (err, data) => {
    let tokens = 0;

    data.split("\n\n").forEach((group, index) => {
        const lines = group.split("\n");

        const buttonA = lines[0].split(': ')[1].split(', ').map((v) => v.split('+')[1]).map(Number);
        const buttonB = lines[1].split(': ')[1].split(', ').map((v) => v.split('+')[1]).map(Number);
        const prize = lines[2].split(': ')[1].split(', ').map((v) => v.split('=')[1]).map(Number);

        tokens += strategy(buttonA, buttonB, prize);
    });

    console.log(tokens);
});

function strategy(buttonA, buttonB, prize) {
    const combinations = [];

    for (let aPushes = 1; aPushes <= 100; aPushes++) {
        const bBushes = (prize[0] - aPushes * buttonA[0]) / buttonB[0];
        if (Math.floor(bBushes) === bBushes
            && (bBushes * buttonB[1]) + (aPushes * buttonA[1]) === prize[1]
        ) {
            combinations.push([aPushes, bBushes]);
        }
    }

    if (combinations.length === 0) {
        return 0;
    }

    let minTokens = 9999999999999;
    combinations.forEach((pair) => {
        const cost = pair[0] * 3 + pair[1];
        if (cost < minTokens) {
            minTokens = cost;
        }
    });

    return minTokens;
}
