function isValid(Date) {
  if (isNaN(Date) || Date == 0) {
    return false;
  } else {
    return true;
  }
}

function isAfter(Date1, Date2) {
  let res = Date1 - Date2;
  if (res > 0) {
    return true;
  } else {
    return false;
  }
}

function isBefore(Date1, Date2) {
  let res = Date1 - Date2;
  if (res < 0) {
    return true;
  } else {
    return false;
  }
}

function isFuture(Date1) {
  let Date2 = new Date();
  let res = Date1 - Date2;
  if (res > 0) {
    return true;
  } else {
    return false;
  }
}

function isPast(Date1) {
  if (!isValid(Date1)) {
    return false;
  }
  let Date2 = new Date();
  let res = Date1 - Date2;
  if (res < 0) {
    return true;
  } else {
    return false;
  }
}
