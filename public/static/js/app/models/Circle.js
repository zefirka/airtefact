var Point = require('./Point.js');

function Circle(id, options){
  this.id = id;
  this.x = options.x;
  this.y = options.y;
  this.radius = options.radius;
}

Circle.prototype = new Point();

Circle.prototype.draw = function(options){
  this.instance = new paper.Path.Circle(new Point(this.x, this.y), this.radius);
  this.instance.fillColor = 'black';
  return this.instance;
};

Circle.prototype.animate = function(){
    this.instance.fillColor = 'black';
};

module.exports = Circle;
