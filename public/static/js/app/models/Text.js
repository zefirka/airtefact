var Base = require('./Base.js');

/**
 * Модель для текста
 * @constructor
 * @param {number} x
 * @param {number} y
 * @param {stirng} content
 * @return {Text}
 */
function Text(x, y, content){
  this.x = x;
  this.y = y;
  this.content = content;
}

Text.prototype = new Base();
Text.prototype.constructor = Text;

Text.prototype.draw = function(content){
  this.instance = new paper.PointText({
    point : [this.x, this.y],
    justification : 'center',
    fontSize : 14,
    fillColor : 'black',
    content : this.content || content
  });
  return this.instance;
};

/**
 * @public
 * @param {object} coors
 * @param {object} coors.x
 * @param {object} coors.y
 */
Text.prototype.move = function(coors){
  this.instance.position.set(coors.x || this.x, coors.y || this.y);
};

module.exports = Text;
