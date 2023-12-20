function split(str, delimiter) {
  const result = [];

  // Handle the special case for empty delimiter
  if (delimiter === '') {
    for (let i = 0; i < str.length; i++) {
      result.push(str.charAt(i));
    }
    return result;
  }

  // Normal case for non-empty delimiter
  let start = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.substring(i, i + delimiter.length) === delimiter) {
      result.push(str.substring(start, i));
      i += delimiter.length - 1; // Skip the delimiter
      start = i + 1;
    }
  }

  // Adding the last part of the string
  result.push(str.substring(start));

  return result;
}

function join(arr, delimiter) {
  let result = '';

  for (let i = 0; i < arr.length; i++) {
    result += arr[i];
    if (i < arr.length - 1) {
      result += delimiter;
    }
  }

  return result;
}
