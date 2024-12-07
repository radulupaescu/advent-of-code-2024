const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'day7.input'), 'utf8', (err, data) => {
    let sum = 0;

    data.split("\n").forEach((line, index) => {
        let [ target, list] = line.split(': ');

        target = parseInt(target, 10);
        list = list.split(' ').map(element => parseInt(element, 10));
        const maxMask = 2 ** (list.length - 1);

        for (let i = 0; i < maxMask; i++) {
            if (sultiply(list, i, target) === target) {
                sum += target;

                return;
            }
        }
    });

    console.log(sum);
});

function sultiply(list, mask, limit) {
    let result = (mask & 1) === 0 ? list[0] + list[1] : list[0] * list[1];

    for (let i = 1; i < list.length - 1; i++) {
        const bit = (mask >> i) & 1;

        result = bit === 0 ? result + list[i + 1] : result * list[i + 1];

        if (result > limit) {
            return -1;
        }
    }

    return result;
}
