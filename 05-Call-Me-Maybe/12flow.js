// Flow

const flow = (funcArr) => {
  return (...elem) => {
    let args = elem.slice();
    funcArr.forEach((element) => {
      if (Array.isArray(args)) {
        args = element(...args);
      } else {
        args = element(args);
      }
    });
    return args;
  };
};

// example
// const square = (nbr) => nbr * nbr
// const add2Numbers = (nbr1, nbr2) => nbr1 + nbr2

// const flowedFunctions = flow([add2Numbers, square])
// flowedFunctions(2, 3) // -> 25
