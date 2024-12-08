import fs from 'fs';

function fetchLines(day) {
    if(day < 10) day = `0${day}`;
    const data = fs.readFileSync(`src/day${day}/input.txt`, 'utf8');
    const lines = data.trim().split('\n').map(line => line.split(''));

    return lines;
}

export { fetchLines };