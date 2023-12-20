function indexOf(arr, value, start = 0) {
  for (let i = start; i < arr.length; i++) {
    if (arr[i] === value) {
      return i;
    }
  }
  return -1;
}

function lastIndexOf(arr, value, start = arr.length - 1) {
  for (let i = start; i >= 0; i--) {
    if (arr[i] === value) {
      return i;
    }
  }
  return -1;
}

function includes(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return true;
    }
  }
  return false;
}

// Array.prototype.indexOf = undefined
// Array.prototype.lastIndexOf = undefined
// Array.prototype.includes = undefined
