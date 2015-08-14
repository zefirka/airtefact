var Quere = require('../../utils/Queue.js');
var sequence = new Queue();

function Canvas(node){
  this.ctx = node.getContext('2d');
  this.node = node;

}

function init(canvas){
  return new Canvas(canvas);
}

function put(state){
  sequence.push(state);
}

module.exports = {
  init : init,
  put : put
};
