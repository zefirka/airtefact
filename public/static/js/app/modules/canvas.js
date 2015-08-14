var Queue = require('../../utils/queue.js');
var sequence = new Queue();

function Canvas(node){
  this.ctx = node.getContext('2d');
  this.node = node;
  this.objects = [];
  paper.setup(node);
}

Canvas.prototype.draw = function(drawning, options){
  var obj = drawning();
  obj.strokeColor = '#ff0000';
  obj.fillColor = 'blue';

  paper.view.draw();
};

Canvas.prototype.addObject = function(object){
  this.objects.push(object);
};

Canvas.prototype.removeObject = function(object){
  this.objects = this.objects.filter(function(o){
    return o.id !== object.id;
  }).slice();
};

function init(canvas){
  return new Canvas(canvas);
}

function put(state){
  sequence.push(state);
}

module.exports = Canvas;
