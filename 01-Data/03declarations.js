const escapeStr = '`\\/"\'';

const arr = Object.freeze([4, '2']);
const obj = Object.freeze({
    str: 'Hello, World!',    // a string value
    num: 42,                 // a number value
    bool: true,              // a boolean value
    undef: undefined         // an undefined value
});
const nested = Object.freeze({
    arr: Object.freeze([4, undefined, '2']),
    obj: Object.freeze({
        str: 'Nested String',   // a string value
        num: 123,               // a number value
        bool: true              // a boolean value
    })
});