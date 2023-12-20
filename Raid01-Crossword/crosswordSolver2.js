// Third attempt at a crossword solver raid.
function fits(word, position) {
  var { line, char, direction } = position;
  if (direction === 'horizontal') {
    if (char + word.length > lines[line].length) {
      return false;
    }
    for (var i = 0; i < word.length; i++) {
      if (lines[line][char + i] !== '.') {
        return false;
      }
    }
  } else {
    // direction === 'vertical'
    if (line + word.length > lines.length) {
      return false;
    }
    for (var i = 0; i < word.length; i++) {
      if (lines[line + i][char] !== '.') {
        return false;
      }
    }
  }
  return true;
}

function replace(lines, word, position) {
  var { line, char, direction } = position;
  if (direction === 'horizontal') {
    lines[line] =
      lines[line].substring(0, char) +
      word +
      lines[line].substring(char + word.length);
  } else {
    // direction === 'vertical'
    for (var i = 0; i < word.length; i++) {
      lines[line + i] =
        lines[line + i].substring(0, char) +
        word[i] +
        lines[line + i].substring(char + 1);
    }
  }
  return lines;
}

function crosswordSolver(puzzle, words, index = 0) {
  var lines = puzzle.split('\n');
  var wordPositions = getWordPositions(lines);
  if (index === wordPositions.length) {
    return words.length === 0 ? lines.join('\n') : null;
  }
  var position = wordPositions[index];
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    if (fits(word, position, lines)) {
      var newLines = replace([...lines], word, position);
      var result = crosswordSolver(
        newLines.join('\n'),
        words.filter((_, j) => j !== i),
        index + 1
      );
      if (result !== null) {
        return result;
      }
    }
  }
  return null;
}

// Call the function
var result = crosswordSolver(emptyPuzzle, words);
if (result !== null) {
  console.log(result);
} else {
  console.log('Error');
}

// Helper functions
function getWordPositions(lines) {
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
  return wordPositions;
}

// Compare this snippet from crosswordSolver1.js:
// function encodeString(s) {
//   var result = '';
//   var count = 1;
//   for (var i = 1; i <= s.length; i++) {
//     if (s[i] === s[i - 1]) {
//       count++;
//     } else {
//       result += count + s[i - 1];
//       count = 1;
//     }
//   }
//   return result;
// }
//
// function decodeString(s) {
//   // Implement this function to decode a string.
// }
function decodeString(s) {
  var result = '';
  var count = '';
  for (var i = 0; i < s.length; i++) {
    if (isDigit(s[i])) {
      count += s[i];
    } else {
      result += s[i].repeat(count || 1);
      count = '';
    }
  }
  return result;
}
