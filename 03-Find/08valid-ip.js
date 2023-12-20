// Create a function named findIP, that returns an array of valid IP addresses from a given string. These addresses may or may not have a port.
// For the IP part, the syntax will be as follows, where x is a number from 0-255. Values with leading zeros are not valid:
// x.x.x.x
// Don't forget to learn about the syntax of ports. But remember, the maximum TCP port number is 65,535.


function findIP(str) {
  // your code here
  const ipAddressRegex = /(?!(((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}):(?!(?![7-9]\d\d\d\d)(?!6[6-9]\d\d\d)(?!65[6-9]\d\d)(?!655[4-9]\d)(?!6553[6-9])(?!0+)(\d{1,5})))((((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4})(?::(?![7-9]\d\d\d\d)(?!6[6-9]\d\d\d)(?!65[6-9]\d\d)(?!655[4-9]\d)(?!6553[6-9])(?!0+)(\d{1,5}))?)/g;
    return str.match(ipAddressRegex);
};