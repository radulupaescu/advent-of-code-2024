const fs = require('fs');
const path = require('path');

let A = 0, B = 0, C = 0, p = 0;
let outConsole = [];

fs.readFile(path.join(__dirname, 'day17.input'), 'utf8', (err, data) => {
    const [regData, programData] = data.split("\n\n");
    const [v1, v2, v3] = regData.split("\n").map(reg => reg.split(': ')[1]).map(Number);
    const program = programData.split(':')[1].split(',').map(Number);

    run(v1, v2, v3, program);
});

function run(v1, v2, v3, program) {
    A = v1;
    B = v2;
    C = v3;
    p = 0;

    while (p < program.length) {
        const opcode = program[p];
        const operand = program[p + 1];

        switch (opcode) {
            case 0:
                adv(operand);
                break;
            case 1:
                bxl(operand);
                break;
            case 2:
                bst(operand);
                break;
            case 3:
                p = jnz(operand);
                break;
            case 4:
                bxc();
                break;
            case 5:
                out(operand);
                break;
            case 6:
                bdv(operand);
                break;
            case 7:
                cdv(operand);
                break;
        }

        p += 2;
    }

    console.log(outConsole.join(','));
    outConsole = [];
}

function adv(val) {
    if (val < 4) {
        A = Math.floor(A / 2 ** val);
    } else if (val === 4) {
        A = Math.floor(A / 2 ** A);
    } else if (val === 5) {
        A = Math.floor(A / 2 ** B);
    } else if (val === 6) {
        A = Math.floor(A / 2 ** C);
    }
}

function bxl(val) {
    B = B ^ val;
}

function bst(val) {
    if (val < 4) {
        B = val % 8;
    } else if (val === 4) {
        B = A % 8;
    } else if (val === 5) {
        B = B % 8;
    } else if (val === 6) {
        B = C % 8;
    }
}

function jnz(val) {
    if (A > 0) {
        return val - 2;
    }

    return p;
}

function bxc() {
    B = B ^ C;
}

function out(val) {
    if (val < 4) {
        outConsole.push(val % 8);
    } else if (val === 4) {
        outConsole.push(A % 8);
    } else if (val === 5) {
        outConsole.push(B % 8);
    } else if (val === 6) {
        outConsole.push(C % 8);
    }
}

function bdv(val) {
    if (val < 4) {
        B = Math.floor(A / 2 ** val);
    } else if (val === 4) {
        B = Math.floor(A / 2 ** A);
    } else if (val === 5) {
        B = Math.floor(A / 2 ** B);
    } else if (val === 6) {
        B = Math.floor(A / 2 ** C);
    }
}

function cdv(val) {
    if (val < 4) {
        C = Math.floor(A / 2 ** val);
    } else if (val === 4) {
        C = Math.floor(A / 2 ** A);
    } else if (val === 5) {
        C = Math.floor(A / 2 ** B);
    } else if (val === 6) {
        C = Math.floor(A / 2 ** C);
    }
}
