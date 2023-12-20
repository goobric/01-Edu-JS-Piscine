const escapeStr = '`\\/"\'';

const arr = [4, '2'];

const nested = { 
  arr: [4, undefined, '2'],
  obj : { str : "string", num : 37, bool : true }
};

const obj = {
  str: 'string',
  num: 37,
  bool: true,
  undef: undefined
};

Object.freeze(nested);
Object.freeze(obj);
Object.freeze(arr);