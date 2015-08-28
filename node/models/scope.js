var utils = require('warden.js').Utils;

/**
  Реализует модель Scope, которая инкапсулирует и изолирует данные и может наследовать сама себя
  @module Scope
*/

/**
  @constructor
  @param {object} store хранилище
  @return {object} экземлпяр Scope
*/
function Scope(store) {
  this.store = utils.extend({}, store || {});
}

/**
  @access public
  @param {string} name
  @return {mixed} result from store
*/
Scope.prototype.get = function (name) {
  return this.store[name] || undefined;
};

Scope.prototype.set = function(name, value){
  this.store[name] = value;
  return value;
};

Scope.prototype.born = function () {
  var ns = new Scope(this.store);
  return ns;
};

Scope.prototype.resolve = function (name){
  return this.store[name] || (function(store){
    for(var i in store){
      if(store[i] instanceof Scope){
        return store[i].resolve(name);
      }
    }
  })(this.store);
};

module.exports = Scope;
