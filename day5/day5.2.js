const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'day5.input'), 'utf8', (err, data) => {
    const rules = [];
    const updates = [];
    let rulesDone = false;

    data.split("\n").forEach((line, index) => {
        if (line === '') {
            rulesDone = true;
            return;
        }

        if (!rulesDone) {
            rules.push(line.split('|').map(page => parseInt(page, 10)));
        } else {
            updates.push(line.split(',').map(page => parseInt(page, 10)));
        }
    });

    const rulesMap = new Map();
    for (const [before, after] of rules) {
        if (!rulesMap.has(after)) {
            rulesMap.set(after, new Set());
        }

        rulesMap.get(after).add(before);
    }

    let sum = 0;
    updates.forEach(update => {
        if (!updateInOrder(rules, update)) {
            const sorted = update.sort((a, b) => {
                if (rulesMap.get(a)?.has(b)) {
                    return 1;
                }

                if (rulesMap.get(b)?.has(a)) {
                    return -1;
                }

                return 0;
            });

            sum += sorted[(sorted.length - 1) / 2];
        }
    });

    console.log(sum);
});

function updateInOrder(rules, update) {
    for (const [before, after] of rules) {
        const beforeIndex = update.indexOf(before);
        const afterIndex = update.indexOf(after);

        if (beforeIndex !== -1 && afterIndex !== -1 && beforeIndex > afterIndex) {
            return false;
        }
    }
    return true;
}
