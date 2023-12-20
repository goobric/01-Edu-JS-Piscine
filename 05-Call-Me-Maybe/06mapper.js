// Mapper

function map(arr, func) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    res.push(func(arr[i], i, arr));
  }
  return res;
}

const flatMap = (array, func) => {
  let temp = map(array, func);

  let res = [];

  for (let i = 0; i < temp.length; i++) {
    if (Array.isArray(temp[i])) {
      for (let j = 0; j < temp[i].length; j++) {
        res.push(temp[i][j]);
      }
    } else {
      res.push(temp[i]);
    }
  }
  return res;
};
