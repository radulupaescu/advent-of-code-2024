const fs = require('fs');
const path = require('path');

let A = 0n, B = 0n, C = 0n, outConsole = [], program = [], p = 0;

fs.readFile(path.join(__dirname, 'day17.input'), 'utf8', (err, data) => {
    program = data.split("\n\n")[1].split(':')[1].split(',').map(Number);

    console.log(`${search(1, 0n)}`);
});

function getTail(k) {
    return program.slice(-1 * k).join(',');
}

function search(step, found) {
    for (let i = 0n; i < 8n; i++) {
        let next = found * 8n + i;
        let result = run(next, B, C);

        if (result === getTail(step)) {
            if (step === program.length) {
                return next;
            }

            let returnable = search(step + 1, next);

            if (returnable !== -1) {
                return returnable;
            }
        }
    }

    return -1;
}


function run(v1, v2, v3) {
    A = BigInt(v1);
    B = BigInt(v2);
    C = BigInt(v3);
    p = 0;

    while (p < program.length) {
        const opcode = program[p];
        const operand = BigInt(program[p + 1]);

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

    const returnable = outConsole.join(',');
    outConsole = [];

    A = 0;
    B = 0;
    C = 0;

    return returnable;
}

function adv(val) {
    if (val < 4n) {
        A = A / (2n ** val);
    } else if (val === 4n) {
        A = A / (2n ** A);
    } else if (val === 5n) {
        A = A / (2n ** B);
    } else if (val === 6n) {
        A = A / (2n ** C);
    }
}

function bxl(val) {
    B = B ^ val;
}

function bst(val) {
    if (val < 4n) {
        B = val % 8n;
    } else if (val === 4n) {
        B = A % 8n;
    } else if (val === 5n) {
        B = B % 8n;
    } else if (val === 6n) {
        B = C % 8n;
    }
}

function jnz(val) {
    if (A > 0n) {
        return Number(val) - 2;
    }

    return p;
}

function bxc() {
    B = B ^ C;
}

function out(val) {
    if (val < 4n) {
        outConsole.push(Number(val % 8n));
    } else if (val === 4n) {
        outConsole.push(Number(A % 8n));
    } else if (val === 5n) {
        outConsole.push(Number(B % 8n));
    } else if (val === 6n) {
        outConsole.push(Number(C % 8n));
    }
}

function bdv(val) {
    if (val < 4n) {
        B = A / (2n ** val);
    } else if (val === 4n) {
        B = A / (2n ** A);
    } else if (val === 5n) {
        B = A / (2n ** B);
    } else if (val === 6n) {
        B = A / (2n ** C);
    }
}

function cdv(val) {
    if (val < 4n) {
        C = A / (2n ** val);
    } else if (val === 4n) {
        C = A / (2n ** A);
    } else if (val === 5n) {
        C = A / (2n ** B);
    } else if (val === 6n) {
        C = A / (2n ** C);
    }
}
