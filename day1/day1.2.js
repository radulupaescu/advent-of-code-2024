const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'day1.input'), 'utf8', (err, data) => {
    let list = [];
    const freq = {};

    data.split("\n").forEach((line, index) => {
        const pair = line.split('   ').map((x) => parseInt(x));
        list.push(pair[0]);
        freq[pair[1]] = freq[pair[1]] !== undefined ? freq[pair[1]] + 1 : 1;
    });

    list = list.map((x) => freq[x] !== undefined ? x * freq[x] : 0 );

    console.log(list.reduce((prod, sum) => sum += prod, 0));
});