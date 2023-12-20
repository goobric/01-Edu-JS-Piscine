// Count Leap Years

function countLeapYears(date) {
  let years = 0;
  for (let yr = 1; yr < date.getFullYear(); yr++) {
    if (yr % 4 === 0 && (yr % 100 !== 0 || yr % 400 === 0)) {
      years++;
    }
  }
  return years;
}

// function isLeapYr(num) {
//   const year = num;
//   let yp = false;
//   if (year % 4 === 0) {
//     yp = true;
//   }
//   if (year % 100 === 0) {
//     yp = false;
//   }
//   if (year % 400 === 0) {
//     yp = true;
//   }
// };

// function countLeapYears(Date) {
//   let count = 0;
//   const year = Date.getFullYear();
//   for (let i = year; i > 4; i--) {
//     if (isLeapYr(Date[i])) count--;
//   }
//   return count;
// }
