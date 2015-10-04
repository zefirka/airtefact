var Collection = require('./collection');
var is = require('./is');
/**
 * Модуль утилит
 * @module common/utils
 */

var Utils = {};

/**
 * @public
 * @class uid
 */
Utils.uid = function(){
  var store = {};

  return {
    set : function(key, value){
      store[key] = value;
      return value;
    },

    setIfNotSet : function(key, value){
      if (this.get(key) !== undefined){
        this.set(key, value);
      }else{
        return false;
      }
    },

    setOnce : function(key, value){
      Object.defineProperty(store, key, {
        value : value,
        writable : false,
        enumerable : true,
        configurable : false
      });
    },

    get : function(key){
      return store[key];
    }
  };
};

/**
 * Возвращает обратный предикат
 * @param {function} fn
 * @return {function}
 */
Utils.not = function(predicate){
  return function(value){
    return !predicate(value);
  };
};

/**
 * @param {string}
 * @param {object}
 * @return {string}
 */
Utils.interpolate = function(str, object){
  var data = {},
      argc = arguments.length,
      argv = Utils.toArray(arguments),
      reg = /{{\s*[\w\.\/\[\]]+\s*}}/g;

  if(argc ==2 && is.obj(argv[1])){
    data = argv[1];
  }else{
    argv.slice(1, argc).forEach(function(e, i){
      data[i] = e;
    });
  }

  return str.replace(reg, function(i){
    var res = Utils.resolve(data, i.slice(2,-2)),
        arg = is.exist(res) ? res : i;
    if(is.obj(arg)){
      arg =JSON.stringify(arg);
    }
    return arg;
  });
};

Utils.resolve = function(data, s){
  if(!is.obj(data)){
    return data;
  }

  s.split('/').forEach(function(elem){
    if(!is.exist(data)){
      return data;
    }

    var cand;

    if(elem[0] =='[' && elem[elem.length -1] ==']'){
      cand = elem.slice(1,-1);
      if(is.exist(cand)){
        if(is.num(parseInt(cand))){
          elem = parseInt(cand);
        }else{
          throw 'Wrong syntax';
        }
      }
    }else{
      if(!is.exist(data[elem])){
        data = {};
      }
    }

    data = data[elem];

  });
  return data;
};

Utils.genId = function(symbols, length){
  return new Array(length || 3).join('.').split('.').map(function(){
    var res = (Math.random() * Math.pow(10, symbols) >> 0).toString();
    return res.length < symbols ? '0' + res  : res;
  }).join('-');
};

/**
 * Трансформирует строку в camelCase
 *
 * @public
 * @param {string} input
 * @return {string}
 */
Utils.camelCase = function (input) {
  return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
    return group1.toUpperCase();
  });
};

/**
 * Клонирует объект
 *
 * @param {object} obj
 * @return {object}
 */
Utils.clone = function(obj) {
  return Utils.extend(Array.isArray(obj) ? [] : {}, obj);
};

/**
 * Создает айдишник длиной в n
 *
 * @param {number} length
 * @return {string}
 */
Utils.guid = function(length){
  return new Array(length + 1).join('.').split('.').map(function(){
    return Math.random() * 10 >> 0;
  }).join('');
};

module.exports = Collection.extend({},
  Collection,
  Utils,
  { is : is }
);
