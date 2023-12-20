// Create the function currify that will curry any functions put as argument.

function currify(fnct) {
  return function curried(...args) {
    if (args.length >= fnct.length) {
      return fnct(...args);
    } else {
      return function (...nextArgs) {
        return curried(...args, ...nextArgs);
      };
    }
  };
}
