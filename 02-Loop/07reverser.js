function reverse(input) {
  var isString = typeof input === 'string';
  var arr = isString ? input.split('') : input;
  var result = [];
  for (var i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return isString ? result.join('') : result;
}
