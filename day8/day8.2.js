const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'day8.input'), 'utf8', (err, data) => {
    let N = 0, M;
    const antennas = {};
    let antennaCount = 0;
    data.split("\n").forEach((line, index) => {
        if (!M) {
            M = line.length;
        }

        line.split('').forEach((value, index) => {
            if (value === '.') { return; }
            if (!antennas[value]) { antennas[value] = []; }

            antennas[value].push([N, index]);
        });

        N++;
    });

    const antinodes = {};

    Object.keys(antennas).forEach((type) => {
        const positions = antennas[type];

        antennaCount += positions.length;

        for (let i = 0; i < positions.length; i++) {
            for (let j = i + 1; j < positions.length; j++) {
                const x1 = positions[i][0], y1 = positions[i][1];
                const x2 = positions[j][0], y2 = positions[j][1];

                if (!antinodes[`${x1}:${y1}`]) { antinodes[`${x1}:${y1}`] = 1; }
                if (!antinodes[`${x2}:${y2}`]) { antinodes[`${x2}:${y2}`] = 1; }

                const d1 = Math.abs(x1 - x2);
                const d2 = Math.abs(y1 - y2);
                let ax, ay;

                if (Math.sign(x1 - x2) === Math.sign(y1 - y2)) {
                    ax = x1 - d1;
                    ay = y1 - d2;
                    while (ax > -1 && ay > -1) {
                        if (!antinodes[`${ax}:${ay}`]) {
                            antinodes[`${ax}:${ay}`] = 0;
                        }

                        antinodes[`${ax}:${ay}`] += 1;
                        ax -= d1;
                        ay -= d2;
                    }

                    ax = x2 + d1;
                    ay = y2 + d2;
                    while (ax < N && ay < M) {
                        if (!antinodes[`${ax}:${ay}`]) {
                            antinodes[`${ax}:${ay}`] = 0;
                        }

                        antinodes[`${ax}:${ay}`] += 1;
                        ax += d1;
                        ay += d2;
                    }
                } else {
                    ax = x1 - d1;
                    ay = y1 + d2;
                    while (ax > -1 && ay < M) {
                        if (!antinodes[`${ax}:${ay}`]) {
                            antinodes[`${ax}:${ay}`] = 0;
                        }

                        antinodes[`${ax}:${ay}`] += 1;
                        ax -= d1;
                        ay += d2;
                    }

                    ax = x2 + d1;
                    ay = y2 - d2;
                    while (ax < N && ay > -1) {
                        if (!antinodes[`${ax}:${ay}`]) {
                            antinodes[`${ax}:${ay}`] = 0;
                        }

                        antinodes[`${ax}:${ay}`] += 1;
                        ax += d1;
                        ay -= d2;
                    }
                }
            }
        }
    });

    console.log(Object.keys(antinodes).length);
});

function see(N, M, antennas, antinodes) {
    const matrix = [];
    for (let i = 0; i < N; i++) {
        const row = [];
        for (let j = 0; j < M; j++) {
            row.push('.');
        }
        matrix.push(row);
    }

    Object.keys(antennas).forEach((type) => {
        antennas[type].forEach(pos => {
            matrix[pos[0]][pos[1]] = type;
        })
    });

    Object.keys(antinodes).forEach((anode) => {
        const [x, y] = anode.split(':').map(Number);
        matrix[x][y] = '#';
    });

    printBoard(matrix);
}

function printBoard(map) {
    const toPrint = [];
    for (let i = 0; i < map.length; i++) {
        toPrint.push(map[i].join(''));
    }
    console.log(toPrint.join('\n'));
    console.log("\n\n");
}

