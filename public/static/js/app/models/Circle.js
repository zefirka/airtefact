var Point = require('./Point.js');

function Circle(x, y, r){
  this.id = Math.random();
  this.x = x;
  this.y = y;
  this.radius = r;
}

Circle.prototype = new Point();

Circle.prototype.draw = function(options){
  var self = this;
  this.ctx.draw(function(){
    return new paper.Path.Circle({
      center : [self.x, self.y],
      radius : self.radius
    });
  }, options);
};

module.exports = Circle;
