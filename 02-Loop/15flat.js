function flat(arr, depth = 1) {
  // Use recursion to flatten the array up to the specified depth
  return depth > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? flat(val, depth - 1) : val),
        []
      )
    : arr.slice();
}

// Example usage:
const nestedArray = [1, [2, [3, 4], 5], 6];
const flattenedArray = flat(nestedArray);

console.log(flattenedArray); // Output: [1, 2, [3, 4], 5, 6]

function flat(arr, depth = 0) {
  let returnarr = [];
  let lvl = 0;
  while (arr.length) {
    const next = arr.shift();
    if (Array.isArray(next) && lvl <= depth) {
      arr.push(...next);
      lvl += 1;
    } else {
      returnarr.push(next);
    }
  }
  return returnarr;
}