try {
    const data = require('fs').readFileSync('src/day04/input.txt', 'utf8');
    const lines = data.trim().split('\n').map(line => line.split(''));
    const allDirections = [[1, 1], [1, -1], [-1, -1], [-1, 1], [0, 1], [0, -1], [1, 0], [-1, 0]];
    const parts = [
      {id: 1, char: 'X', word: 'XMAS', foundWords: new Set(), directions: allDirections}, 
      {id: 2, char: 'A', word: 'MAS', foundWords: new Set(), directions: allDirections.slice(0, 4)}];

    const isValid = (x, y) => x >= 0 && x < lines.length && y >= 0 && y < lines[0].length;

    for(const part of parts){
        lines.forEach((line, i) =>
            line.forEach((char, j) => {
                if (char === part.char) {
                    part.directions.forEach(([dx, dy]) => {
                        const word = Array.from({ length: part.word.length }, (_, k) => {
                            const x = i + k * dx;
                            const y = j + k * dy;
                            return isValid(x, y) ? lines[x][y] : '';
                        }).join('');

                        if (word === part.word) {
                          const oppositeDx = -dx;
                          const oppositeDy = -dy;

                          const oppositeWord = Array.from({ length: part.word.length }, (_, k) => {
                              const x = i + k * oppositeDx;
                              const y = j + k * oppositeDy;
                              return isValid(x, y) ? lines[x][y] : '';
                          }).join('');

                          if (oppositeWord === part.word || part.id === 1) {
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