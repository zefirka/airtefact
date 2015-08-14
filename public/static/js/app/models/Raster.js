var Point = require('./Point.js');

function Raster(name, options) {
  this.name = name;
  this.src = options.src;
  this.x = options.x;
  this.y = options.y;
}

Raster.prototype = new Point();

Raster.prototype.draw = function(options) {
  var self = this;
  this.ctx.draw(function() {
    self.present = new paper.Raster(self.src, {
       x : self.x , y : self.y }
    );
    return self.present;
  }, options);
};

Raster.prototype.animate = function() {
  this.present.rotate(3);
};

module.exports = Raster;
