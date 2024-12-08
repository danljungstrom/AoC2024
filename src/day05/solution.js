const data = require('fs').readFileSync('src/day05/input.txt', 'utf8').trim().replace(/\r\n/g, '\n');
const [rulesSection, updatesSection] = data.split("\n\n");

const rules = rulesSection.split("\n").map(line => line.split('|').map(Number));
const updates = updatesSection.split("\n").map(line => line.split(',').map(Number));

let totalMiddleSum = 0;
let fixedUpdates = [];

updates.forEach(update => {
  updateRules = fetchUpdateRules(update, rules);

  if (isUpdateValid(update, updateRules)) {
    totalMiddleSum += findMiddlePage(update);
  } else {
    fixedUpdates.push(fixInvalidUpdate(update, updateRules));
  }
});

console.log(`The result for part 1 is: ${totalMiddleSum}`);

const fixedUpdatesSum = fixedUpdates.reduce(
  (sum, update) => sum + findMiddlePage(update), 0
);

console.log(`The result for part 2 is: ${fixedUpdatesSum}`);

function isUpdateValid(update, rules) {
  for (const [x, y] of rules) {
    if (checkRuleBreak(update, x, y)) {
      return false;
    }
  }
  return true;
}

function fixInvalidUpdate(invalidUpdate, rules) {
  const update = [...invalidUpdate];

  while (!isUpdateValid(update, rules)) {
    for (const [x, y] of rules) {
      if (checkRuleBreak(update, x, y)) {
        update[update.indexOf(x)] = y;
        update[update.indexOf(y)] = x;
      }
    }
  }
  return update;
}

function fetchUpdateRules(update, rules) {
  return rules.filter(([x, y]) => update.includes(x) || update.includes(y));
}

function checkRuleBreak(update, x, y) {
  if (update.includes(x) && update.includes(y)) {
    if (update.indexOf(x) > update.indexOf(y)) {
      return true;
    }
  }
  return false;
}

function findMiddlePage(update) {
  return update[Math.floor(update.length / 2)];
}
