function Queue(){
  this.data = [];
}

Queue.prototype.push = function(value){
  this.data.push(value);
};

Queue.prototype.pop = function(){
  return this.data.shift(0);
};

var sequence = new Queue();

module.exports = {
  init : function($canvasObject){
    /* Тута делаем рисование и все такое */
    console.log('Hey! Canvas is ready!');
  },
  put : function(state){
    sequence.push(state);
  }
};
