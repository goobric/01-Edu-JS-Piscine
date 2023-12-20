// Filter

function filter(arr, func) {
  let res = [];
  arr.map((elem, i, arr) => {
    if (func(elem, i, arr)) {
      res.push(elem);
    }
  });
  return res;
}

function reject(arr, func) {
  let res = [];
  arr.map((elem, i, arr) => {
    if (!func(elem, i, arr)) {
      res.push(elem);
    }
  });
  return res;
}

function partition(arr, func) {
  return [filter(arr, func), reject(arr, func)];
}
