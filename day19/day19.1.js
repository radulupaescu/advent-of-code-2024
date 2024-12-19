const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'day19.input'), 'utf8', (err, data) => {
    const [designs, patterns] = data.split("\n\n").map((raw, index) => {
        if (index === 0) {
            return raw.split(', ');
        } else {
            return raw.split("\n");
        }
    });

    let count = 0;
    patterns.forEach((pattern) => {
        if (canArrange(designs, pattern)) {
            count++;
        }
    });

    console.log(count);
});

function canArrange(designs, pattern) {
    const n = pattern.length;
    const dp = Array(n + 1).fill(false);
    dp[0] = true;

    for (let i = 1; i <= n; i++) {
        for (const design of designs) {
            if (i >= design.length && pattern.slice(i - design.length, i) === design) {
                dp[i] = dp[i] || dp[i - design.length];
            }
        }
    }

    return dp[n];
}
