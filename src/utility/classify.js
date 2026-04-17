// Age classification
function getAgeGroup(age) {
  if (age <= 12) return "child";
  if (age <= 19) return "teenager";
  if (age <= 59) return "adult";
  return "senior";
}

// Pick highest probability country
function getTopCountry(countries) {
  if (!countries || countries.length === 0) return null;

  return countries.reduce((max, current) =>
    current.probability > max.probability ? current : max
  );
}

module.exports = { 
    getAgeGroup, 
    getTopCountry 
};