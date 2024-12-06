try {
  const data = require('fs').readFileSync('src/day06/input.txt', 'utf8');
  const lines = data.trim().split('\n').map(line => line.split(''));

  const guardDirections = [
      {char: '^', dx: 0, dy: -1},
      {char: '>', dx: 1, dy: 0},
      {char: 'v', dx: 0, dy: 1},
      {char: '<', dx: -1, dy: 0}];
  var startPos = findGuard(lines, guardDirections);

  var {path, turns} = simulatePatrol(lines, startPos, guardDirections);

  console.log(`The result for part 1 is: ${path.size}`);

  possibleObstructions = testPossibleObstructions(lines, startPos, guardDirections, path);

  console.log(`The result for part 2 is: ${possibleObstructions}`);
} catch (e) {
  console.error(e);
}

function findGuard(lines, directions){
  for(let [index, line] of lines.entries()){
      for(let direction of directions){
          if(line.indexOf(direction.char) !== -1){

              return {direction: directions.indexOf(direction), x: line.indexOf(direction.char), y: index};
          }
      }
  }
}

function turn(currentPos, directions){
  turnKey = `${currentPos.x},${currentPos.y},${currentPos.direction}`;
  currentPos.direction = (currentPos.direction + 1) % directions.length;
  return turnKey;
}

function move(currentPos, directions){
  return {
      direction: currentPos.direction,
      x: currentPos.x + directions[currentPos.direction].dx,
      y: currentPos.y + directions[currentPos.direction].dy,
  };
}

function testPossibleObstructions(lines, startPos, guardDirections, path){
  let loops = 0;
  for(const pos of path){
      const [x, y] = pos.split(',').map(Number);
      const linesCopy = lines.map(row => [...row]);

      if (linesCopy[y][x] === '.') {
          linesCopy[y][x] = 'O';
      const { isLoop } = simulatePatrol(linesCopy, startPos, guardDirections);
      if(isLoop){
          loops++;
      }
    }
  }
  return loops;
}

function simulatePatrol(lines, startPos, guardDirections, obs=false){
  let currentPos = {...startPos};
  const path = new Set();
  const turns = new Map();
  var isLoop = false;

  while(true){
    posKey = `${currentPos.x},${currentPos.y}`;
    path.add(posKey);

    let nextPos = move(currentPos, guardDirections);
    if(nextPos.x < 0 || nextPos.x >= lines[0].length || nextPos.y < 0 || nextPos.y >= lines.length){
      break;
    }

    if(lines[nextPos.y][nextPos.x] === '#' || lines[nextPos.y][nextPos.x] === 'O'){
      turnKey = turn(currentPos, guardDirections);
      direction = currentPos.direction;
      if (!turns.has(direction)) {
          turns.set(direction, []);
      }

      const turnList = turns.get(direction);
      if (turnList.some(t => t.x === currentPos.x && t.y === currentPos.y)) {
        isLoop = true;
        break;
      } else {
        turnList.push({ x: currentPos.x, y: currentPos.y });
      }
    } else {
        currentPos = nextPos;
    }
  }

  return {path, turns, isLoop};
}