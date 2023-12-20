let arrToSet = (arr) => {
  let set = new Set;
  for (let i = 0; i < arr.length; i++) {
    set.add(arr[i])
  };
  return set
};
let arrToStr = (arr) => {
  return arr.join("");
};
let setToArr = (set) => {
  let arr = [];
  for (const item of set) {
    arr.push(item)
  };
  return arr
};
let setToStr = (set) => {
  return arrToStr(setToArr(set))
};
let strToArr = (s) => {
  return s.split("")
};
let strToSet = (s) => {
  return arrToSet(strToArr(s))
};
function mapToObj(map) {
  let obj = {};
  for (let key of map.keys()) {
    obj[key] = map.get(key);
  };
  return obj;
};
let objToArr = (obj) => {
  let arr = [];
  for (let key in obj) {
    arr.push(obj[key]);
  }
  return arr;
};
let objToMap = (obj) => {
  let map = new Map
  for (let key in obj) {
    map.set(key, obj[key]);
  };
  return map;
};
let arrToObj = (arr) => {
  let obj = {}
  for (let i = 0; i < arr.length; i++) {
    obj[i] = arr[i]
  };
  return obj
}

let strToObj = (s) => {
  return arrToObj(strToArr(s))
};

let superTypeOf = (arg) => {
  switch (typeof arg) {
    case "number": return "Number";
    case "string": return "String";
    case "boolean": return "Boolean";
    case "undefined": return "undefined";
    case "object":
      if (arg instanceof Array) {
        return "Array";
      }
      if (arg instanceof Set) {
        return "Set";
      }
      if (arg instanceof Map) {
        return "Map";
      }
      if (arg === null) {
        return "null";
      }
      return "Object";
    case "function":
      return "Function";
    default:
      return typeof arg;
  }
}


// function arrToStr() { };
// function setToArr() { };
// function setToStr() { };
// function strToArr() { };
// function strToSet() { };
// function mapToObj() { };
// function objToArr() { };
// function objToMap() { };
// function arrToObj() { };
// function strToObj() { };
// function superTypeOf() { };

// const str = 'hello'
// const arr = [1, 2, 1, 3]
// const obj = { x: 45, y: 75, radius: 24 }
// const set = new Set()
// const map = new Map()
// set.add(1)
// set.add(2)
// set.add(1)
// set.add(3)
// map.set('a', 1)
// map.set('b', 2)
// map.set(3, 'c')
// map.set(4, 'd')

// arrToSet(arr) // -> Set { 1, 2, 3 }
// arrToStr(arr) // -> '1213'
// setToArr(set) // -> [1, 2, 3]
// setToStr(set) // -> '123'
// strToArr(str) // -> ['h', 'e', 'l', 'l', 'o']
// strToSet(str) // -> Set { 'h', 'e', 'l', 'o' }
// mapToObj(map) // -> { a: 1, b: 2, '3': 'c', '4': 'd' }
// objToArr(obj) // -> [45, 75, 24]
// objToMap(obj) // -> Map { 'x' => 45, 'y' => 75, 'radius' => 24 }
// arrToObj(arr) // -> { '0': 1, '1': 2, '2': 1, '3': 3 }
// strToObj(str) // -> { '0': 'h', '1': 'e', '2': 'l', '3': 'l', '4': 'o' }

// superTypeOf(map) //         -> 'Map'
// superTypeOf(set) //         -> 'Set'
// superTypeOf(obj) //         -> 'Object'
// superTypeOf(str) //         -> 'String'
// superTypeOf(666) //         -> 'Number'
// superTypeOf(NaN) //         -> 'Number'
// superTypeOf(arr) //         -> 'Array'
// superTypeOf(null) //        -> 'null'
// superTypeOf(undefined) //   -> 'undefined'
// superTypeOf(superTypeOf) // -> 'Function'