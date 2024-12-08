try {
  const data = require('fs').readFileSync('src/day08/input.txt', 'utf8');
  const lines = data.trim().split('\n').map(line => line.split(''));
  const antennaLists = findAntennas(lines);
  const parts = [1, 2];

  for(const part of parts) {
    const antinodes = findAntinodes(lines, antennaLists, part === 1);
    console.log(`The result for part ${part} is: ${antinodes.size}`);
    //printGrid(lines, antinodes);
  }
} catch (e) {
  console.error(e);
}

function findAntennas(lines) {
  const antennas = {};
  lines.forEach((line, y) => {
    line.forEach((char, x) => {
      if (char !== '.') {
        antennas[char] = antennas[char] || [];
        antennas[char].push({ x, y });
      }
    });
  });
  return antennas;
}

function findAntinodes(lines, antennas, distanceRule = false) {
  const gridSize = { x: lines[0].length, y: lines.length };
  const antinodes = new Set();

  for (const antenna in antennas) {
    let antinodesForAntenna = findAntinodesForAntenna(antennas[antenna], gridSize, distanceRule);

    for (const antinode of antinodesForAntenna) {
      antinodes.add(`${antinode.x},${antinode.y}`);
    }
  }
  return antinodes;
}

function findAntinodesForAntenna(antenna, gridSize, distanceRule = false) {
  const antennaAntinodes = [];

  const isValid = (x, y) => x >= 0 && x < gridSize.x && y >= 0 && y < gridSize.y;

  for (let i = 0; i < antenna.length - 1; i++) {
    for (let j = i + 1; j < antenna.length; j++) {
      let xd = antenna[i].x - antenna[j].x;
      let yd = antenna[i].y - antenna[j].y;

      if (distanceRule) {
        let a1x = antenna[i].x + xd;
        let a1y = antenna[i].y + yd;
        if (isValid(a1x, a1y))
          antennaAntinodes.push({ x: a1x, y: a1y });

        let a2x = antenna[j].x - xd;
        let a2y = antenna[j].y - yd;
        if (isValid(a2x, a2y))
          antennaAntinodes.push({ x: a2x, y: a2y });
      } else {
          for (let k = -gridSize.x; k <= gridSize.x; k++) {
            let newX = (antenna[i].x + xd * k);
            let newY = (antenna[i].y + yd * k);

            if (isValid(newX, newY)) {
              antennaAntinodes.push({ x: newX, y: newY });
            }
          }
        }
    }
  }
  return antennaAntinodes;
}

function printGrid(lines, antinodes) {
  const grid = lines.map(row => [...row]);

  for (const antinode of antinodes) {
    const [x, y] = antinode.split(',').map(Number);
    if (grid[y] && grid[y][x] === '.') {
      grid[y][x] = '#';
    }
  }
  console.log(grid.map(row => row.join('')).join('\n'));
}
