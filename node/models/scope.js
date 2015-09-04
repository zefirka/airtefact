var utils = require('warden.js').Utils,
    extend = utils.extend;

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
  Получает значение перменной в scope
  @access public
  @param {string} name
  @return {mixed} result from store
*/
Scope.prototype.get = function (name) {
  return this.store[name] || undefined;
};

/**

  */
Scope.prototype.set = function(name, value){
  this.store[name] = value;
  return value;
};

Scope.prototype.born = function () {
  var ns = new Scope(this.store);
  return ns;
};

Scope.prototype.getElement = function (id) {
  return this.store.elements.filter(function(i){
    return i.id == id;
  })[0] || null;
};

Scope.prototype.switchPhase = function (phaseName){
  this.store.phase.value = this.phases ? this.phases[phaseName] :
    ( this.game.phases ? this.game.phases[phaseName] : null );
};

Scope.prototype.register = function(domain, name, value){
  var o = {};
  o[name] = value;
  this.set(domain, extend( {}, this.get(domain), o ));
  console.log(this);
};

module.exports = Scope;
