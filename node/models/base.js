var R       = require('ramda'),
    Warden  = require('warden.js'),
    utils   = Warden.Utils,
    extend  = utils.extend,
    Scope   = require('./scope.js');

/**
  @constructor
  @param {object} data
  @param {object} game
*/
function Base(data, parent){
  var store = extend({}, data, {
    game : parent,
    instance : this
  });

  this.scope = new Scope(store);
}


Base.prototype.getScope = function(){
  return this.scope;
};

Base.prototype.data = function(param){
  if (!param) {
    return this.scope.store;
  }else{
    return this.scope.store[param];
  }
};

Base.prototype.snapshot = function(keys) {
  var store = this.data();

  return keys.reduce(function(sum, key){
    sum[key] = store[key];
    return sum;
  }, {});
};

module.exports = Base;
