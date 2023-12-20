// JS-Piscine Raid01 Crossword Solver

function crosswordSolver(crossword, words) {
  if (
    typeof crossword !== 'string' ||
    !Array.isArray(words) ||
    words.some((word) => typeof word !== 'string')
  ) {
    console.log('Error not valid input');
    return 'Error not valid input';
  }
  // Check if crossword is valid
  if (!/^[.\n012]+$/.test(crossword)) {
    console.log('Error not valid crossword');
    return 'Error not valid crossword';
  }
  const puzzleNumbers = crossword
    .trim()
    .split('\n')
    .map((row) =>
      row.split('').map((cell) => (cell === '.' ? -1 : parseInt(cell)))
    );
  const wordsBeginnings = puzzleNumbers
    .map((row, rowIndex) =>
      row.map((cell, colIndex) => ({ row: rowIndex, col: colIndex }))
    )
    .flat()
    .filter((cell) => puzzleNumbers[cell.row][cell.col] > 0);
  if (
    wordsBeginnings.reduce(
      (acc, cell) => acc + puzzleNumbers[cell.row][cell.col],
      0
    ) !== words.length
  ) {
    console.log('Error not enough words');
    return 'Error not enough words';
  }
  const puzzleWidth = puzzleNumbers[0].length;
  if (puzzleNumbers.some((row) => row.length !== puzzleWidth)) {
    console.log('Error width not valid');
    return 'Error width not valid';
  }
  if (new Set(words).size !== words.length) {
    console.log('Error words not unique');
    return 'Error words not unique';
  }
  words.sort((a, b) => b.length - a.length);
  const puzzleWords = puzzleNumbers.map((row) =>
    row.map((cell) => (cell === -1 ? '.' : ''))
  );
  const canAddWord = (word, row, col, direction) => {
    var aw;
    if (
      direction === 'horizontal' &&
      col + word.length > puzzleNumbers[row].length
    ) {
      return false;
    }
    if (direction === 'vertical' && row + word.length > puzzleNumbers.length) {
      return false;
    }
    for (let i = 0; i < word.length; i++) {
      if (puzzleWords[row][col] !== '') {
        if (puzzleWords[row][col] !== word[i]) {
          return false;
        }
      }
      direction === 'horizontal' ? col++ : row++;
    }
    const afterWordCell =
      (aw = puzzleNumbers[row]) === null || aw === void 0 ? void 0 : aw[col];
    return afterWordCell === -1 || afterWordCell === undefined;
  };
  // Recursive function to add words to the puzzle
  const addWords = (words) => {
    if (words.length === 0) {
      return true;
    }
    for (const word of words) {
      for (const cell of wordsBeginnings) {
        if (puzzleNumbers[cell.row][cell.col] === 0) continue;
        if (canAddWord(word, cell.row, cell.col, 'horizontal')) {
          const backupRow = puzzleWords[cell.row].slice();
          for (let j = 0; j < word.length; j++) {
            puzzleWords[cell.row][cell.col + j] = word[j];
          }
          puzzleNumbers[cell.row][cell.col]--;
          if (addWords(words.filter((w) => w !== word))) {
            return true;
          }
          puzzleWords[cell.row][cell.col]++;
          puzzleWords[cell.row] = backupRow;
        }
        if (canAddWord(word, cell.row, cell.col, 'vertical')) {
          const backupCol = puzzleWords.map((row) => row[cell.col]);
          for (let j = 0; j < word.length; j++) {
            puzzleWords[cell.row + j][cell.col] = word[j];
          }
          puzzleNumbers[cell.row][cell.col]--;
          if (addWords(words.filter((w) => w !== word))) {
            return true;
          }
          puzzleWords[cell.row][cell.col]++;
          puzzleWords.map((row, index) => (row[cell.col] = backupCol[index]));
        }
      }
    }
    return false;
  };
  if (!addWords(words)) {
    console.log('Error no solution');
    return 'Error no solution';
  }
  const result = puzzleWords.map((row) => row.join('')).join('\n');
  console.log(result);
  return result;
}

// Test cases
const testCases = require('./testcases');

testCases.forEach(testCase => {
    console.log('Running test case:', testCase);
    crosswordSolver(testCase.puzzle, testCase.words);
});

// Example
// const emptyPuzzle = `2001
// 0..0
// 1000
// 0..0`;

// const words = ['casa', 'alan', 'ciao', 'anta'];
// crosswordSolver(emptyPuzzle, words);

