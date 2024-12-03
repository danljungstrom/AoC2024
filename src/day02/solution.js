try {
  const data = require('fs').readFileSync('src/day02/input.txt', 'utf8');
  const lines = data.trim().split('\n').map(line => line.split(' ').map(Number));
  const parts = [1, 2];

  for (part of parts) {
    const safeReports = lines.filter(line => checkReport(line, part === 2)).length;
    console.log(`Safe reports for part ${part}: ${safeReports}`);
  }
} catch (e) {
  console.error(e);
}

function checkReport(line, dampener) {
  const isIncreasing = line[0] < line[1];

  for (let i = 0; i < line.length - 1; i++) {
    if (!checkSafeStep(line[i], line[i + 1], isIncreasing)) {
      if (dampener) {
        //Recursively check if the report is safe by removing the previous, current and next number in the line.
        return [-1, 0, 1].some(offset => {
          const filteredLine = line.filter((_, index) => index !== i + offset);
          return checkReport(filteredLine, false);
        });
      }
      return false;
    }
  }
  return true;
}

function checkSafeStep(num, nextNum, isIncreasing) {
  const diff = isIncreasing ? nextNum - num : num - nextNum;
  return diff > 0 && diff <= 3;
}