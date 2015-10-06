var Point = require('./Point.js');
var Text = require('./Text');

/**
 * Зависимость координат
 * @private
 * @param {number} x
 * @param {number} y
 * @return {object}
 */
function textFormula(x, y){
  return {
    x : x - 25,
    y : y - 25
  };
}

function Raster(id, options) {
  this.id = id;
  this.src = options.src;
  this.x = options.x;
  this.y = options.y;
  this.mix(new Text(this.x, this.y, 'id: ' + String(id)), textFormula);
}

Raster.prototype = new Point();

Raster.prototype.draw = function(options) {
  this.mixins.forEach(function(mixin){
    mixin.object.draw();
  });

  this.instance = new paper.Raster(this.src, {
    x : this.x ,
    y : this.y
  });
  return this.instance;
};

Raster.prototype.animate = function() {
  this.instance.rotate(3);
};

/**
 *
 */
Raster.prototype.move = function(x, y){
  this.mixins.forEach(function(mixin){
    mixin.object.move(mixin.formula(this.x, this.y));
  }.bind(this));
  this.instance.position.set(x || this.x, y || this.y);
};

module.exports = Raster;
