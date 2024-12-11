const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'day11.input'), 'utf8', (err, data) => {
    const numbers = data.split(' ').map(Number);

    let map = {};
    numbers.forEach((value) => {
        map[`${value}`] = (map[`${value}`] || 0) + 1;
    });

    const blinks = 75;
    for (let i = 0; i < blinks; i++) {
        const nextMap = {};
        Object.entries(map).forEach(([ number, count ]) => {
            if (number === '0') {
                nextMap[1] = (nextMap[1] || 0) + count;
            } else if (number.length % 2 === 0) {
                const splitted = split(number);
                nextMap[splitted[0]] = (nextMap[splitted[0]] || 0) + count;
                nextMap[splitted[1]] = (nextMap[splitted[1]] || 0) + count;
            } else {
                nextMap[parseInt(number, 10) * 2024] = (nextMap[parseInt(number, 10) * 2024] || 0) + count;
            }
        });

        map = nextMap;
    }

    console.log(Object.values(map).reduce((sum, val) => sum + val, 0));
});

function split(strNum) {
    const length = strNum.length;

    const mid = length / 2;
    const firstHalf = parseInt(strNum.slice(0, mid), 10);
    const secondHalf = parseInt(strNum.slice(mid), 10);

    return [firstHalf, secondHalf];
}
