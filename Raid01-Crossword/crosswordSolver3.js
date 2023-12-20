// third attempt
// Crossword Solver

function crosswordSolver(puzzle, words) {
  var lines = puzzle.split('\n');
  var wordPositions = [];
  for (var i = 0; i < lines.length; i++) {
    for (var j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === '1') {
        wordPositions.push({ line: i, char: j, direction: 'horizontal' });
      } else if (lines[i][j] === '2') {
        wordPositions.push({ line: i, char: j, direction: 'vertical' });
      }
    }
  }
  wordPositions.sort((a, b) => a.line - b.line || a.char - b.char);
  for (var i = 0; i < wordPositions.length; i++) {
    var position = wordPositions[i];
    var word = words.find((word) => fits(word, position));
    if (!word) {
      return 'Error';
    }
    lines = replace(lines, word, position);
    words = words.filter((w) => w !== word);
  }
  return lines.join('\n');
}

function fits(word, position) {
  // Implement this function to check if a word fits in the puzzle at a given position.
}

function replace(lines, word, position) {
  // Implement this function to replace a word in the puzzle at a given position.
}
