function ionOut(str) {
  // Write code here.
  const regT = /(\w*)(?=tion)/g;
  // match word with 'tion' at the end
  const regS = str.match(regT);
  let res = [];
  // if regS is null, return empty array
  if (regS === null) {
    return res;
  }
  for (let i = 0; i < regS.length; i++) {
    if (i%2 === 0) {
      regS[i] = regS[i] + 't'
      res.push(regS[i]);
    }
  };
  return res;
};
