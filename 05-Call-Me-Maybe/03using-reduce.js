// Redue
// example
// sumOrMul([1,2,3,5,8], 5) // (((((5+1)*2)+3)+5)*8) -> 160

const adder = (arr, initial) => {
  if (isNaN(initial)) initial = 0;
  return arr.reduce((prev, curr) => prev + curr, initial);
};

function sumOrMul(arr, initial) {
  if (isNaN(initial)) initial = 0;

  return arr.reduce((prev, curr) => {
    if ((curr % 2) == 0){
      prev *= curr;
    } else {
      prev += curr;
    }
    return prev;
  }, initial);
};

function funcExec(arr, initial){
  if (isNaN(initial)) initial = 0;

  return arr.reduce((prev, curr) => {
    return curr(prev);
  }, initial);
};