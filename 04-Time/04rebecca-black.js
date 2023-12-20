// Rebecca Black
function isFriday(date) {
  return new Date(date).getDay() === 5;
}

function isWeekend(date) {
  let day = new Date(date).getDay();
  return day === 0 || day === 6;
}

function isLeapYear(date) {
  let year = new Date(date).getFullYear();
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function isLastDayOfMonth(date) {
  let d = new Date(date);
  return (
    new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate() === d.getDate()
  );
}
