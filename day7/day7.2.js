const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'day7.input'), 'utf8', (err, data) => {
    let sum = 0;

    data.split("\n").forEach((line, index) => {
        let [ target, list] = line.split(': ');

        target = parseInt(target, 10);
        list = list.split(' ').map(element => parseInt(element, 10));
        const maxMask = 3 ** (list.length - 1);

        for (let i = 0; i < maxMask; i++) {
            if (sultipate(list, i, target) === target) {
                sum += target;

                return;
            }
        }
    });

    console.log(sum);
});

// yes, sum & multiply & concatenate...
function sultipate(list, mask, limit) {
    const operation = mask % 3;
    let result;
    if (operation === 0) {
        result = list[0] + list[1];
    } else if (operation === 1) {
        result = list[0] * list[1];
    } else {
        result = parseInt(`${list[0]}${list[1]}`);
    }

    for (let i = 1; i < list.length - 1; i++) {
        const operation = Math.floor(mask / Math.pow(3, i)) % 3;
        if (operation === 0) {
            result += list[i + 1];
        } else if (operation === 1) {
            result *= list[i + 1];
        } else {
            result = parseInt(`${result}${list[i + 1]}`);
        }
    }

    return result;
}
