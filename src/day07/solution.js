let matchFound = false;

try {
  const data = require('fs').readFileSync('src/day07/input.txt', 'utf8');
  const lines = data.trim().split('\n').map(line => line.replace(/[:\r]/g, '').split(' ').map(Number));
  const parts = [1, 2];

  for (part of parts) {
    let sum = 0;
    for (const line of lines) {
      if (checkCombinations(false, part === 2, line[0], line.slice(1))) {
        sum += line[0];
      }
      matchFound = false;
    }
    console.log(`The result for part ${part} is: ${sum}`);
  }
} catch (e) {
  console.error(e);
}

function checkCombinations(
  debug = false,
  concat = true,
  target,
  numbers,
  currentIndex = 0,
  currentResult = null,
  expression = ""
) {
  if (matchFound) return false;

  if (currentIndex === numbers.length) {
    if (currentResult === target) {
      if (debug) {
        console.log(`Match found: ${expression} = ${currentResult}`);
      }
      matchFound = true;
    } else if (debug) {
      console.log(`Tested: ${expression} = ${currentResult} != ${target}`);
    }
    return currentResult === target;
  }

  const currentNumber = numbers[currentIndex];

  if (currentResult === null) {
    return checkCombinations(
      debug,
      concat,
      target,
      numbers,
      currentIndex + 1,
      currentNumber,
      `${currentNumber}`
    );
  }

  const operations = [
    { operator: "+", func: (a, b) => a + b },
    { operator: "*", func: (a, b) => a * b },
  ];

  if (concat) {
    operations.push({ operator: "||", func: (a, b) => parseInt(`${a}${b}`, 10) });
  }

  for (const { operator, func } of operations) {
    const newResult = func(currentResult, currentNumber);

    if (debug && operator === "||") {
      console.log(`Concatenated: ${expression} || ${currentNumber} = ${newResult}`);
    }

    if (
      checkCombinations(
        debug,
        concat,
        target,
        numbers,
        currentIndex + 1,
        newResult,
        `${expression} ${operator} ${currentNumber}`
      )
    ) {
      return true;
    }
  }

  return false;
}