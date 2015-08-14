var Queue = require('../../utils/queue.js');
var sequence = new Queue();

function Canvas(node){
  this.ctx = node.getContext('2d');
  this.node = node;
  paper.setup(node);
}

Canvas.prototype.draw = function(){
  var path = new paper.Path();
  path.strokeColor = 'black';
  path.add(new paper.Point(30, 75));
  path.add(new paper.Point(30, 25));
  path.add(new paper.Point(80, 25));
  path.add(new paper.Point(80, 75));
  path.closed = true;

  // Select the path, so we can see its handles:
  path.fullySelected = true;

  // Create a copy of the path and move it 100pt to the right:
  var copy = path.clone();
  copy.fullySelected = true;
  copy.position.x += 100;

  // Smooth the segments of the copy:
  copy.smooth();
};

function init(canvas){
  return new Canvas(canvas);
}

function put(state){
  sequence.push(state);
}

module.exports = Canvas;
