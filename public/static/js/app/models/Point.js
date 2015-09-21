var Base = require('./Base.js');

function Point(x, y){
  this.x = x;
  this.y = y;
}

Point.prototype = new Base();

Point.prototype.move = function(x, y){
  this.instance.position.set(this.x, this.y);
};



module.exports = Point;
