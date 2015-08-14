var utils = require('../../../../../common/utils.js');
var Base = require('./base.js');

var extend = Warden.Utils.extend;

function Positional(x, y){
  this.x = x;
  this.y = y;
}

Positional.prototype = new Base();

Positional.prototype.move = function(x, y){
  this.x = x;
  this.y = y;
};

module.exports = Base;
