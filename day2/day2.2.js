const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'day2.input'), 'utf8', (err, data) => {
    let safe = 0;
    data.split("\n").forEach((line, index) => {
        const report = line.split(' ').map(x => parseInt(x));

        if (isSafe(report)) {
            safe++;
        } else if (search(report)) {
            safe++;
        }
    });

    console.log(safe);
});

function search(report) {
    for (let i = 0; i < report.length; i++) {
        const clean = [...report];
        clean.splice(i, 1);

        if (isSafe(clean)) {
            return true;
        }
    }

    return false;
}

function isSafe(report) {
    const diff = [];
    for (let i = 0; i < report.length - 1; i++) {
        diff.push(report[i] - report[i + 1]);
    }

    for (let i = 0; i < diff.length; i++) {
        if (Math.abs(diff[i]) > 3 || diff[i] === 0) {
            return false;
        }

        if (i < diff.length - 1 && Math.sign(diff[i]) !== Math.sign(diff[i + 1])) {
            return false;
        }
    }

    return true;
}

