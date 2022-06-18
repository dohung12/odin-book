function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const getRandomArrayMember = (array) => {
  const index = getRandomArbitrary(0, array.length);
  return array[index];
};

const getRandomManyArrayMember = (array) => {
  // length of return array
  const n = getRandomArbitrary(0, array.length);
  // Shuffle array
  const shuffled = array.sort(() => 0.5 - Math.random());
  // Get sub-array of first n elements after shuffled
  let selected = shuffled.slice(0, n);
  return selected;
};
module.exports = {
  getRandomArrayMember,
  getRandomArbitrary,
  getRandomManyArrayMember,
};
