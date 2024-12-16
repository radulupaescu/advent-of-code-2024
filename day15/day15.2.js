const fs = require('fs');
const path = require('path');

const directions = {
    '^': [-1, 0],
    '>': [0, 1],
    'v': [1, 0],
    '<': [0, -1],
};

fs.readFile(path.join(__dirname, 'day15.input'), 'utf8', (err, data) => {
    const [rawBoard, rawMovements] = data.split("\n\n");
    const movements = rawMovements.replaceAll("\n", '').split('');
    let board = [];
    let bot = { x: -1, y: -1 };

    rawBoard.split("\n").forEach((line, index) => {
        board.push(line.split(''));
        if (line.indexOf('@') > -1) {
            bot.x = index;
            bot.y = line.indexOf('@');
            board[bot.x][bot.y] = '.';
        }
    });

    const X = board.length;
    const Y = board[0].length;

    movements.forEach((step) => {
        let returned = processStep(board, bot, step);
        bot = returned.bot;
        board = returned.board;
    });

    let sum = 0;
    for (let i = 0; i < X; i++) {
        for (let j = 0; j < Y; j++) {
            if (board[i][j] === 'O') {
                sum += 100 * i + j;
            }
        }
    }

    // printBoard(board, bot);

    console.log(sum);
});

function processStep(board, bot, step) {
    const X = board.length;
    const Y = board[0].length;
    const newBotPos = {
        x: bot.x + directions[`${step}`][0],
        y: bot.y + directions[`${step}`][1],
    };

    switch (board[newBotPos.x][newBotPos.y]) {
        case '.':
            return { board: board, bot: newBotPos };
        case '#':
            return { board: board, bot: bot };
        case 'O':
            if (canPush(board, newBotPos, step)) {
                return {
                    board: push(board, newBotPos, step),
                    bot: newBotPos,
                }
            }
    }

    return { board: board, bot: bot };
}

function push(board, pos, dir) {
    const end = { ...pos };
    while (board[end.x][end.y] !== '.') {
        end.x = end.x + directions[`${dir}`][0];
        end.y = end.y + directions[`${dir}`][1];
    }

    board[end.x][end.y] = 'O';
    board[pos.x][pos.y] = '.';

    return board;
}

function canPush(board, pos, dir) {
    if (board[pos.x][pos.y] === 'O') {
        return canPush(
            board,
            {
                x: pos.x + directions[`${dir}`][0],
                y: pos.y + directions[`${dir}`][1],
            },
            dir,
        );
    }

    if (board[pos.x][pos.y] === '.') {
        return true;
    }

    if (board[pos.x][pos.y] === '#') {
        return false;
    }
}

function printBoard(map, bot) {
    const toPrint = [];
    for (let i = 0; i < map.length; i++) {
        let line = map[i].join('');
        if (i === bot.x) {
            line = line.replaceAt(bot.y, '@');
        }
        toPrint.push(line);
    }
    console.log(toPrint.join('\n'));
    console.log("\n");
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}
