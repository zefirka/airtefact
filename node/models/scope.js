var R       = require('ramda');

var forIn   = require('../../common/utils').forIn,
    utils   = require('warden.js').Utils,
    toArray = utils.toArray,
    extend  = utils.extend;

/**
 Реализует модель Scope, которая инкапсулирует и изолирует данные и может наследовать сама себя
 @constructor
 @param {object} store
 @return {Scope}
*/
function Scope(store) {
  this.store = {};
  forIn(store, function(value, key){
    if (store.hasOwnProperty(key)){
      this.store[key] = value;
    }
  }.bind(this));
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
Scope.prototype.setVal = function(name, value, safe){
  if(safe && this.get(name)){
    throw 'Error: ' + name + ' is a static property';
  }

  this.store[name] = value;
  return value;
};

/**
  Назначает значение переменной, если name - строка,
  или ходит по объекту и назначает переменные по способу
  Scope.setVal(ключ, значение)
  @param {string|object} name [или object]
  @param {mixed|boolen} value [или sage]
  @param {boolean|undefined} safe[false]
  @return {mixed} value
*/
Scope.prototype.set = function(name, value, safe){
  if(typeof name == 'object'){
    var names = name;
    var last = null;
    for(var prop in names){
      last = this.setVal(name, names[prop], safe);
    }
    return last;
  }else{
    return this.setVal(name, value, safe);
  }
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
Scope.prototype.inherit = function (c) {
  var ns = new Scope();
  ns.parent = this.store;
  return ns;
};

Scope.prototype.getElement = function (id) {
  return R.filter(R.eqProps(id, 'id'), this.store.elements)[0] || null;
};

module.exports = Scope;
