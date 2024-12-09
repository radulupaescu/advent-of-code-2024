const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'day9.input'), 'utf8', (err, data) => {
    const disk = data.split('').map(Number);
    let lastFileId = Math.floor(disk.length / 2);
    let lastIndex = disk.length % 2 === 1 ? disk.length - 1 : disk.length - 2;
    let crrIndex = 0;
    let checksum = 0;

    let start = 0;
    let fileId = 0;
    while (crrIndex <= lastIndex) {
        let blockLen = disk[crrIndex];
        if (crrIndex % 2 === 0) { // crr index on file
            checksum += blockFileSum(start, start + blockLen - 1,  fileId);
            fileId++;
            start += blockLen;
        } else { // crr index on space
            let remainingBlockLen = blockLen;
            do {
                if (remainingBlockLen >= disk[lastIndex]) {
                    checksum += blockFileSum(start, start + disk[lastIndex] - 1, lastFileId);

                    remainingBlockLen -= disk[lastIndex];
                    start += disk[lastIndex];

                    lastFileId -= 1;
                    lastIndex -= 2;
                } else {
                    checksum += blockFileSum(start, start + remainingBlockLen - 1, lastFileId);
                    start += remainingBlockLen;

                    disk[lastIndex] -= remainingBlockLen;
                    remainingBlockLen = 0;
                }
            } while (remainingBlockLen > 0)
        }

        crrIndex++;
    }

    console.log(checksum);
});

function blockFileSum(startIndex, stopIndex, fileId) {
    return fileId * 0.5 * ((stopIndex * (stopIndex + 1)) - startIndex * (startIndex - 1));
}
