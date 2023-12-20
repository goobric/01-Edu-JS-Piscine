function getAcceleration(obj) {
  // Check if the necessary properties are present
  if (obj.hasOwnProperty('f') && obj.hasOwnProperty('m')) {
    // Formula: a = F/m
    return obj.f / obj.m;
  } else if (obj.hasOwnProperty('Δv') && obj.hasOwnProperty('Δt')) {
    // Formula: a = Δv/Δt
    return obj.Δv / obj.Δt;
  } else if (obj.hasOwnProperty('d') && obj.hasOwnProperty('t')) {
    // Formula: a = 2d/t^2
    return 2 * obj.d / Math.pow(obj.t, 2);
  } else {
    // If the necessary properties are not present, return "impossible"
    return "impossible";
  }
};


// {
//   f: 10,
//   m: 5,
//   Δv: 100,
//   Δt: 50,
//   t:1,
//   d: 10
// }
// console.log(result); // Output: 2 (calculated using the first formula a = F/m)
// a = F/m
// a = Δv/Δt
// a = 2d/t^2

// a = acceleration
// m = mass
// F = force
// Δv = final velocity - initial velocity
// Δt = final time - initial time
// d = distance
// t = time