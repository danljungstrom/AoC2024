try {
  const data = require('fs').readFileSync('src/day04/input.txt', 'utf8');
  const lines = data.trim().split('\n').map(line => line.split(''));
  const allDirections = [[1, 1], [1, -1], [-1, -1], [-1, 1]]; // Diagonal directions only
  const parts = [
      { id: 1, char: 'X', charOffset: 0, word: 'XMAS', directions: allDirections, foundWords: new Set() },
      { id: 2, char: 'A', charOffset: 1, word: 'MAS', directions: allDirections, foundWords: new Set() }
  ];

  const isValid = (x, y) => x >= 0 && x < lines.length && y >= 0 && y < lines[0].length;

  for (const part of parts) {
      let totalPatterns = 0;

      lines.forEach((line, i) =>
          line.forEach((char, j) => {
              if (char === part.char) {
                  part.directions.forEach(([dx, dy], d1) => {
                      // Calculate starting position based on offset
                      const startX = i - part.charOffset * dx;
                      const startY = j - part.charOffset * dy;

                      // Check the word in the primary direction
                      const word = Array.from({ length: part.word.length }, (_, k) => {
                          const x = startX + k * dx;
                          const y = startY + k * dy;
                          return isValid(x, y) ? lines[x][y] : '';
                      }).join('');

                      if (word === part.word) {
                          if (part.id === 2) {
                              // For part 2, check all other diagonals
                              part.directions.forEach(([dx2, dy2], d2) => {
                                  if (d1 === d2) return; // Skip the same diagonal

                                  // Check second diagonal
                                  const secondWord = Array.from({ length: part.word.length }, (_, k) => {
                                      const x = startX + k * dx2;
                                      const y = startY + k * dy2;
                                      return isValid(x, y) ? lines[x][y] : '';
                                  }).join('');

                                  if (secondWord === part.word) {
                                      if(!part.foundWords.has(`${i},${j}`)){
                                      part.foundWords.add(`${i},${j}`);

                                      // Print the relevant X-MAS pattern (3x3 grid)
                                      console.log(`X-MAS found at center (${i}, ${j}):`);
                                      for (let x = i - 1; x <= i + 1; x++) {
                                          let row = '';
                                          for (let y = j - 1; y <= j + 1; y++) {
                                              row += isValid(x, y) ? lines[x][y] : '.';
                                          }
                                          console.log(row);
                                      }
                                      console.log('');
                                    }
                                  }
                              });
                          } else {
                              // For part 1, just count the word
                              part.foundWords.add(`${i},${j},${dx},${dy}`);
                          }
                      }
                  });
              }
          })
      );

      console.log(`The result for part ${part.id} is: ${part.foundWords.size}`);
  }
} catch (e) {
  console.error(e);
}