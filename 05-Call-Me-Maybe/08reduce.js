// Reduce

function fold(arr, func, acc) {
  let res = acc;
  for (let i = 0; i < arr.length; i++) {
    res = func(res, arr[i], i, arr);
  }
  return res;
}

function foldRight(arr, func, acc) {
  let newArr = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    newArr.push(arr[i]);
  }
  return fold(newArr, func, acc);
}

function reduce(arr, func) {
  let res = arr[0];
  arr.slice(1).map((elem) => {
    res = func(res, elem);
  });
  return res;
}

function reduceRight(arr, func) {
  let newArr = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    newArr.push(arr[i]);
  }
  let res = newArr[0];

  newArr.slice(1).map((elem) => {
    res = func(res, elem);
  });
  return res;
}
