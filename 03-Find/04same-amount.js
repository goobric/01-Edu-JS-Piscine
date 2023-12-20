function sameAmount(str, reg1, reg2) {
  // Write code here.
  const regex1 = new RegExp(reg1, 'g');
  const regex2 = new RegExp(reg2, 'g');
  console.log(regex1, regex2);
  const res1 = str.match(regex1);
  const res2 = str.match(regex2);
  console.log(res1, '---', res2);
  if (res1 != null && res2 != null && res1.length === res2.length) {
    return true;
  }
  return false;
};
// if res1 & res2 are not empty, AND res1.length === res2.length, return true
