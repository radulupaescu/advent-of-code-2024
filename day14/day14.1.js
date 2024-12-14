const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'day14.input'), 'utf8', (err, data) => {
    const positions = [];
    const X = 101;
    const Y = 103;

    const midX = Math.floor(X / 2);
    const midY = Math.floor(Y / 2);
    const seconds = 100;

    data.split("\n").forEach((line, index) => {
        const [p, v] = line.split(' ')
            .map((e) => e.split('=')[1])
            .map((e) => e.split(',').map(Number))
        ;

        let x = (p[0] + seconds * v[0]) % X;
        let y = (p[1] + seconds * v[1]) % Y;

        x = x < 0 ? X + x : x;
        y = y < 0 ? Y + y : y;

        positions.push([x, y]);
    });

    const quadrants = [0, 0, 0, 0];
    positions.forEach((pos) => {
        if (pos[0] < midX && pos[1] < midY) { quadrants[0]++; }
        if (pos[0] > midX && pos[1] < midY) { quadrants[1]++; }
        if (pos[0] < midX && pos[1] > midY) { quadrants[2]++; }
        if (pos[0] > midX && pos[1] > midY) { quadrants[3]++; }
    });

    console.log(quadrants.reduce((prod, v) => prod * v, 1));
});
