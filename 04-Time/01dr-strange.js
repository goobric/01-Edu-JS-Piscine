function addWeek(date) {
  const epoch = new Date('0001-01-01');
  const diff = date.getTime() - epoch.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const weekday = days % 14;
  if (weekday === 0) {
    return 'Monday';
  } else if (weekday === 1) {
    return 'Tuesday';
  } else if (weekday === 2) {
    return 'Wednesday';
  } else if (weekday === 3) {
    return 'Thursday';
  } else if (weekday === 4) {
    return 'Friday';
  } else if (weekday === 5) {
    return 'Saturday';
  } else if (weekday === 6) {
    return 'Sunday';
  } else if (weekday === 7) {
    return 'secondMonday';
  } else if (weekday === 8) {
    return 'secondTuesday';
  } else if (weekday === 9) {
    return 'secondWednesday';
  } else if (weekday === 10) {
    return 'secondThursday';
  } else if (weekday === 11) {
    return 'secondFriday';
  } else if (weekday === 12) {
    return 'secondSaturday';
  } else if (weekday === 13) {
    return 'secondSunday';
  }
}
// Modify the date object using the hour, minute, and second arguments
function timeTravel({ date, hour, minute, second }) {
  date.setHours(hour);
  date.setMinutes(minute);
  date.setSeconds(second);
  return date;
}
