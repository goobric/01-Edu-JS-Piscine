function letterSpaceNumber(str) {
  const arr = [];
  const regexWrd = /[a-zA-Z] \d(?![a-zA-Z\d])/g;
  // Use match method to find all matches in the input string
  const matches = str.match(regexWrd);

  // Return the array of matches
  return matches || [];

  // const regexWrd = /[a-zA-Z]\s\d\b/g;
  // const res = str.match(regexWrd);
  // console.log(res);
  // if (res != null) {
  //   for (let i = 0; i < res.length; i++) {
  //     res[i] = res[i].slice(0, res[i].length - 1);
  //   }
  // } else {
  //   const res = [];
  //   return res;
  // }
  // return res;
}

// console.log(letterSpaceNumber('example 1, example 20'))
// output: ['e 1']
// file on gitea was empty!! why??