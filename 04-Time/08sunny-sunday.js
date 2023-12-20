// Sunny Sunday
// Create a function called sunnySunday that takes a Date as an argument and returns the weekday as a string.

const week = {
  0 : 'Saturday',
  1 : 'Monday',
  2 : 'Tuesday',
  3 : 'Wednesday',
  4 : 'Thursday',
  5 : 'Friday',
  6 : 'Saturday',
}

const firstDay = new Date('0001-01-01');
const day = 1000 * 60 * 60 * 24;

const sunnySunday = (date) => {
  let index = Math.round(Math.abs((new Date(date) - firstDay) / day + 1));
  if (index > 6) index = Math.round(index % 6)
  return week[index]
}

// function sunnySunday(inputDate) {
//   const daysOfWeek = [
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//   ];

//   // Get the day index of the input date (0 for Sunday, 1 for Monday, and so on)
//   const dayIndex = inputDate.getDay();

//   // Adjust the index to eliminate Sundays (1 is added to skip Sunday)
//   const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;

//   // Return the corresponding day of the week
//   return daysOfWeek[adjustedIndex];
// }
// // Example usage:
// const dateExample = new Date('0001-01-01');
// console.log(sunnySunday(dateExample)); // Output: Monday

// function sunnySunday(date) {
//   let day = date.getDay();
//   let wdays = [
//     'Sunday',
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//   ]; // 7 days in a week
//   const msDay = 1000 * 60 * 60 * 24; // milliseconds in a day
//   const daysElapsed = Math.floor(
//     (date.getTime() - new Date('0001-01-01').getTime()) / msDay
//   );
//   const weekdayIndex = daysElapsed % wdays.length;
//   return wdays[weekdayIndex];
// }
