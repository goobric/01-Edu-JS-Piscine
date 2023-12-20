function get(src, path) {
  var keys = path.split('.');
  var result = src;
  for (var i = 0; i < keys.length; i++) {
    if (result[keys[i]] === undefined) {
      return undefined;
    } else {
      result = result[keys[i]];
    }
  }
  return result;
}
