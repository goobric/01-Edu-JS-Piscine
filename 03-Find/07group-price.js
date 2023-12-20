// Create a function named groupPrice, that can find prices in a given string.
// Your function will return 2D array with the full price breakdown.
// If there is no match, your function should return an empty array.

function groupPrice(str) {
  // your code here
  let prices = str.match(/(([A-Z]{3})|\$)([0-9]+\.[0-9]+)/g);
  let result = [];
  if (prices === null) return result;
  prices.forEach((price, i) => {
    result.push([price]);
    result[i].push(price.match(/[0-9]+/g)[0]);
    result[i].push(price.match(/[0-9]+/g)[1]);
  });

  return result;
}
