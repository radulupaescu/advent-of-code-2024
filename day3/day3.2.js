const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'day3.input'), 'utf8', (err, data) => {
    let sum = 0;

    const regex = /mul\((\d+),(\d+)\)|don't\(\)|do\(\)/g;

    let match;
    let enabled = true;
    do {
        match = regex.exec(data);

        if (match && match[0] === 'do()') {
            enabled = true;
        } else if (match && match[0] === 'don\'t()') {
            enabled = false;
        } else if (match && enabled) {
            sum += parseInt(match[1], 10) * parseInt(match[2], 10);
        }
    } while (match);

    console.log(sum);
});
