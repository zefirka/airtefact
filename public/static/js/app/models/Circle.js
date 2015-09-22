var Point = require('./Point.js');
var Text = require('./Text');
/**
 * Зависимость координат
 * @private
 * @param {number} x
 * @param {number} y
 * @return {object}
 */
function textFormula(x, y, r){
  return {
    x : x - 2 *r,
    y : y - 2 *r
  };
}

function Circle(id, options){
  this.id = id;
  this.x = options.x;
  this.y = options.y;
  this.radius = options.radius;
  this.mixins = [];
  this.mix(new Text(this.x, this.y, 'id: ' + String(id)), textFormula);
}

Circle.prototype = new Point();

Circle.prototype.draw = function(options){
  this.instance = new paper.Path.Circle(new Point(this.x, this.y), this.radius);
  this.instance.fillColor = 'black';
  this.mixins.forEach(function(mixin){
    mixin.object.draw();
  });
  return this.instance;
};

Circle.prototype.animate = function(){
  this.instance.fillColor = 'black';
};

Circle.prototype.move = function(x, y){
  this.mixins.forEach(function(mixin){
    mixin.object.move(mixin.formula(this.x, this.y, this.radius));
  }.bind(this));
  this.instance.position.set(x || this.x, y || this.y);
};

module.exports = Circle;
