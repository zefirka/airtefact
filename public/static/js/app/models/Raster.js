var Point = require('./Point.js');

function Raster(id, options) {
  this.id = id;
  this.src = options.src;
  this.x = options.x;
  this.y = options.y;
}

Raster.prototype = new Point();

Raster.prototype.draw = function(options) {
  this.instance = new paper.Raster(this.src, {
    x : this.x ,
    y : this.y
  });
  return this.instance;
};

Raster.prototype.animate = function() {
  this.instance.rotate(3);
};


module.exports = Raster;
