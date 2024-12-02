const fs = require('fs');

try{
    const data = fs.readFileSync('src/day02/input.txt', 'utf8');
    const lines = data.trim().split('\n').map(line => line.split(' ').map(Number));

    var safeReports = 0;

    lines.forEach(line => {
        if(checkReport(line, 0)){
            safeReports++;
        }
    });

    console.log("Safe reports: ", safeReports);
} catch(e) {
    console.error(e);
}

function checkReport(line, unsafeSteps) {
    let isIncreasing = getDirection(line[0], line[1]);
    
    if (unsafeSteps > 1) return false;

    for (let i = 0; i < line.length - 1; i++) {
        if (!checkSafeStep(line[i], line[i + 1], isIncreasing)) {
            unsafeSteps++;

            //Recursively check if the report is safe by removing the previous, current and next number in the line.
            for (let j = i - 1; j <= i + 1; j++) {
                if (checkReport(line.filter((_, index) => index !== j), unsafeSteps)) {
                    return true;
                }
            }
            return false;
        }
    }
    return true;
}

function getDirection(num, nextNum) {
    return num < nextNum;
}

function checkSafeStep(num, nextNum, isIncreasing) {
    const diff = isIncreasing ? nextNum - num : num - nextNum;
    return diff > 0 && diff <= 3;
}