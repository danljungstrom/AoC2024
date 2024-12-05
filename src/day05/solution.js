const data = require('fs').readFileSync('src/day05/input.txt', 'utf8').trim().replace(/\r\n/g, '\n');
const sections = data.split("\n\n");

const rules = sections[0].split("\n").map(rule => {
  const [x, y] = rule.trim().split('|').map(Number);
  return [x, y];
});

const updates = sections[1].split("\n").map(update => 
  update.trim().split(',').map(Number)
);

let totalMiddleSum = 0;
let invalidUpdates = [];

updates.forEach(update => {
    if (isUpdateValid(update, rules)) {
        totalMiddleSum += findMiddlePage(update);
    } else {
        invalidUpdates.push(update);
    }
});

console.log(`The result for part 1 is: ${totalMiddleSum}`);

invalidUpdatesSum = 0;
for(const update of invalidUpdates){
    invalidUpdatesSum += findMiddlePage(orderInvalidUpdate(update, rules));
}

console.log(`The result for part 2 is: ${invalidUpdatesSum}`);

function isUpdateValid(update, rules) {
    for (const [x, y] of rules) {
        if (update.includes(x) && update.includes(y)) {
            if (update.indexOf(x) > update.indexOf(y)) {
                return false;
            }
        }
    }
    return true;
}

function orderInvalidUpdate(update, rules) {
    while(!isUpdateValid(update, rules)){
        for(const [x, y] of rules){
            if (update.includes(x) && update.includes(y)) {
                if (update.indexOf(x) > update.indexOf(y)) {
                    update[update.indexOf(x)] = y;
                    update[update.indexOf(y)] = x;
                }
            }
        }
    }
    return update;
}

function findMiddlePage(update) {
    return update[Math.floor(update.length / 2)];
}