const fs = require('fs');

try {
  const data = fs.readFileSync('src/day01/input.txt', 'utf8');
  const lines = data.trim().split('\n');
  const list1 = [];
  const list2 = [];

  lines.forEach(line => {
    const [col1, col2] = line.split('   ').map(val => parseInt(val));

    list1.push(col1);
    list2.push(col2);
  });

  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  const totalDistance = list1.reduce((sum, num, index) => {
    return sum + Math.abs(num - list2[index]);
  }, 0);

  console.log(`The total distance is: ${totalDistance}`);

  similarityScore = 0;

  list1.forEach(num => {
    let appearances = list2.filter(num2 => num2 === num).length;
    similarityScore += appearances * num;
  });

  console.log(`The similarity score is: ${similarityScore}`);
} catch (e) {
  console.error(e);
}