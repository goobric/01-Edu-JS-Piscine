// function triangle(character, height) {
//   var triangle = '';
//   for (var i = 1; i <= height; i++) {
//     triangle += character.repeat(i) + '\n';
//   }
//   return triangle;
// }

function triangle(character, height) {
  let result = '';
  for (let i = 1; i <= height; i++) {
    for (let j = 0; j < i; j++) {
      result += character;
    }
    if (i === height) {
      return result;
    } else {
      result += '\n';
    }
  }
  return result;
}

// console.log(triangle('*', 5));
// console.log(triangle('*', 3));
