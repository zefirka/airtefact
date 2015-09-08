function getRandomArbitary(min, max){
  return Math.random() * (max - min) + min;
}

function dist(a, b) {
  return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

function len(vector) {
  return (Math.sqrt(vector.dx * vector.dx + vector.dy * vector.dy));
}

module.exports = {
  len : len,
  dist : dist,
  getRandomArbitary : getRandomArbitary
};
