var utils = require('../../common/utils');
var forIn = utils.forIn;
var forMap = utils.forMap;

function Executer(elements){
  this.elements = elements || {};
}

Executer.prototype.exec = function(){
  forIn(this.elements, function(elem, i){
    elem.invoke();
  });
  return this;
};

Executer.prototype.getPackage = function(){
  return forMap(this.elements, function(elem){
    return {
      id : elem.id,
      x  : elem.x,
      y  : elem.y
    };
  });
};

module.exports = Executer;
