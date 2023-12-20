// Unicode Technical Report #35: Unicode Locale Data Markup Language (LDML)



// Date Prototype Methods
Date.prototype.month = Date.prototype.getMonth;
Date.prototype.day = Date.prototype.getDay;
Date.prototype.year = Date.prototype.getFullYear;
Date.prototype.date = Date.prototype.getDate;
Date.prototype.hours = Date.prototype.getHours;

function format(date, str) {
  const d = new Date(date);
  const mofYr = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const sM = mofYr.map((m) => m.slice(0, 3));
  const dofWk = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const sD = dofWk.map((d) => d.slice(0, 3));
  // Day
  str = str.replace(/dd/g, ('0' + d.date()).slice(-2));
  str = str.replace(/d/g, d.date());

  // Hour
  str = str.replace(/HH/g, ('0' + d.hours()).slice(-2));
  str = str.replace(/H/g, d.hours());
  str = str.replace(/hh/g, ('0' + (d.hours() % 12 || 12)).slice(-2));
  str = str.replace(/h/g, d.hours() % 12 || 12);

  // Minute
  str = str.replace(/mm/g, ('0' + d.getMinutes()).slice(-2));
  str = str.replace(/m/g, d.getMinutes());

  // Second
  str = str.replace(/ss/g, ('0' + d.getSeconds()).slice(-2));
  str = str.replace(/s/g, d.getSeconds());

  // Era
  str = str.replace(/GGGG/g, d.year() < 0 ? 'Before Christ' : 'Anno Domini');
  str = str.replace(/G/g, d.year() < 0 ? 'BC' : 'AD');

  // Year
  if (d.year() < 0) d.setFullYear(-d.year());
  str = str.replace(/yyyy/g, d.year().toString().padStart(4, '0'));
  str = str.replace(/y/g, d.year().toString().replace(/^0+/, ''));

  // AM/PM
  str = str.replace(/a/g, d.hours() < 12 ? 'AM' : 'PM');

  // Month
  str = str.replace(
    /(?<!M)MM(?!M)/g,
    (d.month() + 1).toString().length < 10
      ? '0' + (d.month() + 1)
      : d.month() + 1
  );
  str = str.replace(/(?<!(M|P|A))M(?!M)/g, d.month() + 1);
  str = str.replace(/MMMM/g, mofYr[d.month()]);
  str = str.replace(/MMM/g, sM[d.month()].slice(0, 3));

  // Day of Week
  str = str.replace(/EEEE/g, dofWk[d.getDay()]);
  str = str.replace(/E/g, sD[d.getDay()].slice(0, 3));

  return str;
}

// example
// const d = new Date('7 January 1985, 3:08:19')
// format(d, 'HH(mm)ss [dd] <MMM>') // -> '03(08)19 [07] <Jan>'
// console.log(format(d, 'HH(mm)ss [dd] <MMM>'));
