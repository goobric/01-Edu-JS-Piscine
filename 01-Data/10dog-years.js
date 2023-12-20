const OP = {
  earth: 1.0,
  mercury: 0.2408467,
  venus: 0.61519726,
  mars: 1.8808158,
  jupiter: 11.862615,
  saturn: 29.447498,
  uranus: 84.016846,
  neptune: 164.79132,
};

function dogYears(planet, seconds) {
  const earthYears = seconds / 31557600; // Convert seconds to Earth years
  const planetYears = earthYears / OP[planet]; // Convert Earth years to planet years
  const dogYears = planetYears * 7; // Convert planet years to dog years
  return Number(dogYears.toFixed(2)); // Round to two decimal places and return
}

console.log(dogYears("mars", 30000000));

// earth: orbital period 1.0 Earth years, 365.25 Earth days, or 31,557,600 seconds.
// mercury: orbital period 0.2408467 Earth years.
// venus: orbital period 0.61519726 Earth years.
// mars: orbital period 1.8808158 Earth years.
// jupiter: orbital period 11.862615 Earth years.
// saturn: orbital period 29.447498 Earth years.
// uranus: orbital period 84.016846 Earth years.
// neptune: orbital period 164.79132 Earth years.
