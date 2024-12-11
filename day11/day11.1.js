const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'day11.input'), 'utf8', (err, data) => {
    const numbers = data.split(' ').map(Number);
    const list = new List();

    numbers.forEach((value) => {
        list.append(value);
    });

    const blinks = 25;
    for (let i = 0; i < blinks; i++) {
        for (const node of list) {
            if (node.value.toString().length % 2 === 0) {
                const splitted = split(node.value);
                node.value = splitted[0];

                const newNode = new Node(splitted[1]);
                newNode.next = node.next;
                node.next = newNode;
            } else {
                node.value *= 2024;
            }

            if (node.value === 0) {
                node.value = 1;
            }
        }
    }

    let count = 0;
    for (const node of list) {
        count++;
    }

    console.log(count);
});

function print(list) {
    const values = [];
    for (const node of list) {
        values.push(node.value);
    }
    console.log(values.join(', '));
}

function split(num) {
    const strNum = num.toString();
    const length = strNum.length;

    const mid = length / 2;
    const firstHalf = parseInt(strNum.slice(0, mid), 10);
    const secondHalf = parseInt(strNum.slice(mid), 10);

    return [firstHalf, secondHalf];
}

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class List {
    constructor() { this.head = null; }

    append(value) {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;

            return;
        }

        let current = this.head;

        while (current.next) {
            current = current.next;
        }

        current.next = newNode;
    }

    [Symbol.iterator]() {
        let current = this.head;

        return {
            next() {
                if (current) {
                    const result = { value: current, done: false };
                    current = current.next;
                    return result;
                }
                return { done: true };
            },
        };
    }
}
