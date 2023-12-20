function slice(input, start, end = input.length) {
  let result = Array.isArray(input) ? [] : '';

  // Adjust negative start index
  start =
    start < 0
      ? Math.max(input.length + start, 0)
      : Math.min(start, input.length);

  // Adjust negative end index
  end = end < 0 ? Math.max(input.length + end, 0) : Math.min(end, input.length);

  for (let i = start; i < end; i++) {
    if (Array.isArray(input)) {
      result.push(input[i]);
    } else {
      result += input.charAt(i);
    }
  }

  return result;
}

console.log(slice([1, 2, 3, 4, 5], 1, 3)); // Outputs: [2, 3]
console.log(slice('Hello, world!', 7)); // Outputs: 'world!'
console.log(slice('abcdef', -2)); // Outputs: 'ef'
