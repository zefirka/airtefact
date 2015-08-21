var Base = require('./Base.js');

function Point(x, y){
  this.x = x;
  this.y = y;
}

Point.prototype = new Base();

Point.prototype.move = function(x, y){
  var oldX = this.x, oldY = this.y;

  this.x = x;
  this.y = y;
  this.emit('change:move', [
    {
      x : oldX,
      y : oldY
    },
    {
      x : x,
      y : y
    }]);
};



module.exports = Point;
