function multiply(a, b) {
  let result = 0;
  for (let i = 0; i < Math.abs(b); i++) {
    result += a;
  }
  return b < 0 ? -result : result;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('can not divide by zero');
  }
  let count = 0;
  let remainder = Math.abs(a);
  while (remainder >= Math.abs(b)) {
    remainder -= Math.abs(b);
    count++;
  }
  return (a < 0 && b > 0) || (a > 0 && b < 0) ? -count : count;
}

function modulo(a, b) {
  if (b === 0) {
    throw new Error('can modulo by zero');
  }
  let remainder = Math.abs(a);
  while (remainder >= Math.abs(b)) {
    remainder -= Math.abs(b);
  }
  return a < 0 ? -remainder : remainder;
}
