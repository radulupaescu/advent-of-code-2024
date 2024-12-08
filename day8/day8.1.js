const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'day8.input'), 'utf8', (err, data) => {
    let N = 0, M;
    const antennas = {};
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

        for (let i = 0; i < positions.length; i++) {
            for (let j = i + 1; j < positions.length; j++) {
                const d1 = Math.abs(positions[i][0] - positions[j][0]);
                const d2 = Math.abs(positions[i][1] - positions[j][1]);

                if (Math.sign(positions[i][0] - positions[j][0]) === Math.sign(positions[i][1] - positions[j][1])) {
                    if (positions[i][0] - d1 > -1 && positions[i][1] - d2 > -1) {
                        if (!antinodes[`${positions[i][0] - d1}:${positions[i][1] - d2}`]) {
                            antinodes[`${positions[i][0] - d1}:${positions[i][1] - d2}`] = 0;
                        }

                        antinodes[`${positions[i][0] - d1}:${positions[i][1] - d2}`] += 1;
                    }

                    if (positions[j][0] + d1 < N && positions[j][1] + d2 < M) {
                        if (!antinodes[`${positions[j][0] + d1}:${positions[j][1] + d2}`]) {
                            antinodes[`${positions[j][0] + d1}:${positions[j][1] + d2}`] = 0;
                        }

                        antinodes[`${positions[j][0] + d1}:${positions[j][1] + d2}`] += 1;
                    }
                } else {
                    if (positions[i][0] - d1 > -1 && positions[i][1] + d2 < M) {
                        if (!antinodes[`${positions[i][0] - d1}:${positions[i][1] + d2}`]) {
                            antinodes[`${positions[i][0] - d1}:${positions[i][1] + d2}`] = 0;
                        }

                        antinodes[`${positions[i][0] - d1}:${positions[i][1] + d2}`] += 1;
                    }

                    if (positions[j][0] + d1 < M && positions[j][1] - d2 > -1) {
                        if (!antinodes[`${positions[j][0] + d1}:${positions[j][1] - d2}`]) {
                            antinodes[`${positions[j][0] + d1}:${positions[j][1] - d2}`] = 0;
                        }

                        antinodes[`${positions[j][0] + d1}:${positions[j][1] - d2}`] += 1;
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

