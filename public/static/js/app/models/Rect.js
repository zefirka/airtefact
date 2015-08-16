var Point = require('./Point.js');

function Rect(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Rect.prototype = new Point();

Rect.prototype.draw = function(options){
  var self = this;
  this.ctx.draw(function(){
    self.present = new paper.Rectangle(self.x, self.y, self.width, self.height);
    return self.present;
  }, options);
};

module.exports = Rect;
