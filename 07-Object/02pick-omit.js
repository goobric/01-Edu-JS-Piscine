// JSP: Object: Pick Omit
function pick(obj, keys) {
  if (typeof keys === 'string') {
    keys = [keys];
  }
  const result = {};

  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

function omit(obj, keys) {
  if (typeof keys === 'string') {
    keys = [keys];
  }
  const result = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && !keys.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
