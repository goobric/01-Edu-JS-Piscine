//create vowels variable
const vowels = /[aeiouAEIOU]/g;

function vowelDots(str) {
  // Write code here.
  const res = str.match(vowels);
  let rtn = '';
  let j = 0;
  if (res === null) {
    return str;
  }
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== res[j]) {
      rtn += str[i];
    }
    if (str[i] === res[j]) {
      rtn += str[i] + '.';
      j++;
    }
    if (j === res.length) {
      rtn += str.slice(i + 1);
      return rtn;
    }
  }
  return rtn;
}
console.log(vowelDots('a'));
