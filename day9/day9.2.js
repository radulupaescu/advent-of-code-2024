const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'day9.input'), 'utf8', (err, data) => {
    const disk = data.split('').map(Number);
    let checksum = 0;
    let fileId = 0;

    const fs = [];
    for (let i = 0; i < disk.length; i++) {
        if (i % 2 === 0) {
            fs.push({ id: fileId, size: disk[i] });
            fileId++;
        } else {
            fs.push({ id: -1, size: disk[i] });
        }
    }

    const defragged = [];
    for (let i = 0; i < fs.length; i++) {
        if (fs[i].id === -1) {
            let element = fs.length - 1;

            while (fs[i].size > 0 && element > i) {
                if (fs[element].id !== -1 && fs[element].size <= fs[i].size) {
                    defragged.push({ ...fs[element] });
                    fs[i].size -= fs[element].size;
                    fs[element].id = -1;
                }

                element--;
            }

            if (fs[i].size > 0) {
                defragged.push(fs[i]);
            }
        } else if (fs[i].size !== 0) {
            defragged.push(fs[i]);
        }
    }

    let start = 0;
    while (defragged.length > 0) {
        let element = defragged.shift();
        if (element.id !== -1) {
            checksum += blockFileSum(start, start + element.size - 1, element.id);
        }

        start += element.size;
    }

    console.log(checksum);
});

function blockFileSum(startIndex, stopIndex, fileId) {
    return fileId * 0.5 * ((stopIndex * (stopIndex + 1)) - startIndex * (startIndex - 1));
}

