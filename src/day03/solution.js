try {
  const data = require('fs').readFileSync('src/day03/input.txt', 'utf8');
  const parts = [1, 2];

  for (part of parts) {
    let isEnabled = true;
    let sum = 0;

    data.replace(/mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g, (match, a, b) => {
      if (match === 'do()' && part === 2) isEnabled = true;
      else if (match === "don't()" && part === 2) isEnabled = false;
      else if (isEnabled && Number(a) && Number(b)) sum += Number(a) * Number(b);
    });
        
    console.log(`The result for part ${part} is: ${sum}`);
  }
} catch (e) {
  console.error(e);
}