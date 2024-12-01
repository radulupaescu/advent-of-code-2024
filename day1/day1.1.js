const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'day1.input'), 'utf8', (err, data) => {
    let list1 = [];
    let list2 = [];

    data.split("\n").forEach((line, index) => {
        const pair = line.split('   ').map((x) => parseInt(x));
        list1.push(pair[0]);
        list2.push(pair[1]);
    });

    list1 = list1.sort();
    list2 = list2.sort();

    let dist = 0;
    for (let i = 0; i < list1.length; i++) {
        dist += Math.abs(list1[i] - list2[i]);
    }

    console.log(dist);
});