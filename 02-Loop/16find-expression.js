// const add4 = '+4';
// const mul2 = '*2';

// check if n is odd
// if so, check if n - 1 is divisible by 4
function findExpression(n) {
  let res = '1';
  if (n % 2 != 0) {
    if ((n - 1) % 4 != 0) {
      return undefined;
    }
    for (let i = 0; i < (n - 1) / 4; i++) {
      res += ' ';
      res += add4;
    }
    return res;
  }
  let pow = Math.floor(Math.log2(n));
  while (pow > 0) {
    let rem = n - Math.pow(2, pow);
    if (rem % 4 == 0) {
      for (let i = 0; i < pow; i++) {
        res += ' ';
        res += mul2;
      }
      for (let i = 0; i < rem / 4; i++) {
        res += ' ';
        res += add4;
      }
      break;
    }
    pow--;
  }

  return res;
}
