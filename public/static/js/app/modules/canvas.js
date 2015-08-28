var Queue = require('../../utils/queue.js');
var sequence = new Queue();

function getMousePosition(o) {
  var x = o.x - this.rect.left,
      y = o.y - this.rect.top;

  return {
    x : x > 0 ? x : 0,
    y : y > 0 ? y : 0
  };
}

var mouseMap = {
  x : '.clientX',
  y : '.clientY'
};


function Canvas(node) {
  this.ctx = node.getContext('2d');
  this.node = Warden(node);
  this.rect = this.node.getBoundingClientRect();
  this.mouse = this.node
                    .stream('mousemove', this)
                    .grep(mouseMap)
                    .map(getMousePosition).watch();

  this.objects = [];

  paper.setup(node);

  var self = this;



  paper.view.onFrame = function() {
    self.objects.forEach(function(o) {
      o.animate();
    });
  };


}

Canvas.prototype.redraw = function(){
  var self = this;
  this.objects.forEach(this.draw.bind(this));
  //
  // function(obj){
  //   self.draw(obj);
  // });
};

Canvas.prototype.draw = function(object) {
  object.draw();
  paper.view.draw();
};

Canvas.prototype.clear = function(){
  this.ctx.clearRect(0, 0, this.node.width, this.node.height);
};

Canvas.prototype.getElementById = function(id){
  return this.objects.filter(function(i){
    return i.id == id;
  })[0];
};

Canvas.prototype.assign = function(drawing, options) {
  this.objects.push(drawing);
  return this;
};

Canvas.prototype.addObject = function(object) {
  this.objects.push(object);
};

Canvas.prototype.removeObject = function(object) {
  this.objects = this.objects.filter(function(o) {
    return o.id !== object.id;
  }).slice();
};

function init(canvas) {
  return new Canvas(canvas);
}

function put(state) {
  sequence.push(state);
}

module.exports = Canvas;
