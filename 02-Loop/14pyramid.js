function pyramid(character, depth) {
  let result = '';
  const charLength = character.length;
  const maxWidth = charLength * (2 * depth - 1);

  for (let i = 0; i < depth; i++) {
    // Calculate the number of character blocks needed in the current row
    let charBlocks = 2 * i + 1;

    // Construct the complete character string for the row
    let rowChars = character.repeat(charBlocks);

    // Trim the row character string to fit the pyramid width
    rowChars = rowChars.substring(0, Math.min(rowChars.length, maxWidth));

    // Calculate the number of spaces on the left side
    let spaceCount = (maxWidth - rowChars.length) / 2;

    // Construct the row with spaces on the left and characters
    result += ' '.repeat(spaceCount) + rowChars;

    // Add a new line if not the last row
    if (i < depth - 1) {
      result += '\n';
    }
  }

  return result;
}

// console.log(pyramid('*', 8));
// console.log(pyramid('*', 12));
