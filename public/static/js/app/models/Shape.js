var Point = require('./Point.js');

function Shape(piece, x, y){
  this.center = new Point(x, y);
}

Point.prototype = new Point();

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
