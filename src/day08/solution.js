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
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      const char = lines[y][x];

      if (char !== '.') {
        if (!antennas[char]) {
          antennas[char] = [];
        }
        antennas[char].push({ x, y });
      }
    }
  }
  return antennas;
}

function findAntinodes(lines, antennas, distanceRule = false) {
  const gridSize = { x: lines[0].length, y: lines.length };
  const antinodes = new Set();

  for (const antenna in antennas) {
    let antinodesForAntenna = findAntinodesForAntennas(antennas[antenna], gridSize, distanceRule);

    for (const antinode of antinodesForAntenna) {
      antinodes.add(`${antinode.x},${antinode.y}`);
    }
  }
  return antinodes;
}

function findAntinodesForAntennas(antenna, gridSize, distanceRule = false) {
  const antennaAntinodes = [];

  const isValid = (x, y) => x >= 0 && x < gridSize.x && y >= 0 && y < gridSize.y;

  for (let i = 0; i < antenna.length - 1; i++) {
    for (let j = i + 1; j < antenna.length; j++) {
      let xd = antenna[i].x - antenna[j].x;
      let yd = antenna[i].y - antenna[j].y;

      if (distanceRule) {
        if (isValid(antenna[i].x + xd, antenna[i].y + yd))
          antennaAntinodes.push({ x: antenna[i].x + xd, y: antenna[i].y + yd });

        if (isValid(antenna[j].x - xd, antenna[j].y - yd))
          antennaAntinodes.push({ x: antenna[j].x - xd, y: antenna[j].y - yd });
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
    } else if (grid[y] && grid[y][x] === '#') {
      grid[y][x] = '@';
    }
  }

  console.log(grid.map(row => row.join('')).join('\n'));
}
