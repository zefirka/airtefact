var R       = require('ramda');

var forIn   = require('../../common/utils').forIn,
    utils   = require('warden.js').Utils,
    toArray = utils.toArray,
    extend  = utils.extend;

/**
  Реализует модель Scope, которая инкапсулирует и изолирует данные и может наследовать сама себя
  @module Scope
*/

/**
  @constructor
  @param {object} store ссылка на хранилище (не деструктуризуется)
  @return {Scope}
*/
function Scope(store) {
  this.store = store;
}

/**
  Получает значение перменной в scope
  @param {string} name
  @return {mixed} result from store
*/
Scope.prototype.get = function (name) {
  return this.store.hasOwnProperty(name) ? this.store[name] : null;
};

/**
  Назначает значение переменной
  @param {string} name
  @param {mixed} value
  @param {boolean} safe[false]
  @return {mixed} value
*/
Scope.prototype.set = function(name, value, safe){
  this.store[name] = value;
  return value;
};

/**
 @public
 @param {string} name
 @param {mixed} value
 @return {Array}
 */
Scope.prototype.push = function(name, value){
  var coll = this.store[name] = this.store[name] || [];
  coll.push(value);
  return coll;
};

/**
 @public
 @param {string} name
 @param {number} from
 @param {number} to
 @return {Array}
 */
Scope.prototype.splice = function(name, from, to){
  var coll = this.store[name] || [];
  coll.splice.call(coll, from, to);
  return coll;
};

/**
 @public
 */
Scope.prototype.inherit = function () {
  var ns = new Scope();
  ns.parent = this.store;
  return ns;
};

Scope.prototype.getElement = function (id) {
  return this.store.elements.filter(function(i){
    return i.id == id;
  })[0] || null;
};

module.exports = Scope;
