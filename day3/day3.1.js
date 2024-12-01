const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'day3.input'), 'utf8', (err, data) => {
    let sum = 0;

    const regex = /mul\((\d+),(\d+)\)/g;

    let match;
    do {
        match = regex.exec(data);

        if (match) {
            sum += parseInt(match[1], 10) * parseInt(match[2], 10);
        }
    } while (match);

    console.log(sum);
});
