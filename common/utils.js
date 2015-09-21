/**
 * Модуль утилит
 * @namespace Utils
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
 * Обработчик fn ходит по массиву, пока не натыкается на выражение
 * preventValue и тогда возвращает его, иначе exceptions (или false)
 * @public
 * @param {array} arr
 * @param {function} fn
 * @param {mixed} preventValue
 * @param {mixed} exceptions
 * @return {boolean|mixed}
 */
Utils.forWhile = function(arr, fn, preventValue, exceptions){
  preventValue = preventValue || false;
  var val;
  for(var i =0, l =arr.length; i <l;i++){
    val = fn(arr[i], i);
    if(typeof preventValue == 'function' ? preventValue(val, arr[i], i) === true : val === preventValue){
      return typeof preventValue == 'function' ? preventValue(val, arr[i], i) : preventValue;
    }
  }
  return exceptions !== undefined ? exceptions : false;
};

/**
 * Проверка типов данных fn, num, str, obj, array, exist, bool, equals
 * @public
 */
var is = (function(){
  /**
   * @private
   * @param {string}
   * @return {function}
   */
  function typeIs(n){
    return function(x){
      return typeof x === n;
    };
  }

  var _FUN = 'function',
      _NUM = 'number',
      _STR = 'string',
      _OBJ = 'object',
      _ARR = 'array',
      _BOOL = 'boolean',
      _UND = 'undefined';

  var is = {
    /**
     * @public
     * @param {mixed} x
     * @return {boolean}
     */
    exist : function(x){
      return typeof x != _UND && x !== null;
    },

    /**
     * @public
     * @param {mixed} x
     * @return {boolean}
     */
    array : function(x){
      return Array.isArray(x);
    },

    /**
     * @public
     * @param {mixed} x
     * @return {boolean}
     */
    fn : typeIs(_FUN),

    /**
     * @public
     * @param {mixed} x
     * @return {boolean}
     */
    num : typeIs(_NUM),

    /**
     * @public
     * @param {mixed} x
     * @return {boolean}
     */
    str : typeIs(_STR),

    /**
     * @public
     * @param {mixed} x
     * @return {boolean}
     */
    bool : typeIs(_BOOL),

    /**
     * @public
     * @param {mixed} x
     * @return {function}
     */
    equals : function(x){
      return function(y){
        return x === y;
      };
    }
  };

  is.obj = function(x){
    return typeIs(_OBJ)(x) && !is.array(x);
  };

  return is;
})();

Utils.is = is;

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
 * Возвращает массив сделанный из чего угодно
 * @param {mixed} a
 * @return {array}
 */
Utils.toArray = function(array){
  if (typeof array == 'object'){
    array = Utils.forFilter(array, function(value, key){
      if(key === '0' || Number(key)){
        return true;
      }
    });

    array.length = Object.keys(array).length;
  }

  return Array.prototype.slice.call(array);
};


Utils.extend = function () {
  function _extend(origin, add) {
    if (!add || typeof add !== 'object') {
      return origin;
    }
    var keys = Object.keys(add), i = keys.length;

    while(i--) {
      origin[keys[i]] = add[keys[i]];
    }
    return origin;
  }

  return Utils.toArray(arguments).reduce(function(dest, src) {
    return _extend(dest, src);
  });
};

Utils.interpolate = function(str){
  var data = {},
      argc = arguments.length,
      argv = Utils.toArray(arguments),
      reg = /{{\s*[\w\.\/\[\]]+\s*}}/g;

  if(argc ==2 && is.obj(argv[1])){
    data = argv[1];
  }else{
    each(argv.slice(1, argc), function(e, i){
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


Utils.forIn = function (hash, fn){
  return Object.keys(hash).forEach(function(key){
    fn(hash[key], key);
  });
};

Utils.forFilter = function (hash, fn){
  var res = {};
  Object.keys(hash).forEach(function(key){
    if (fn(hash[key], key) === true){
      res[key] = hash[key];
    }
  });
  return res;
};

Utils.forMap = function (hash, fn){
  var res = {};
  Object.keys(hash).forEach(function(key){
    res[key] = fn(hash[key], key);
  });
  return res;
};

Utils.forReduce = function (hash, fn, initial){
  var res = initial || null;

  Object.keys(hash).forEach(function(key){
    var value = hash[key];

    if(res === null){
      res = value;
    }else{
      res = fn(res, value, key);
    }

  });

  return res;
};

Utils.camelCase = function camelCase(input) {
  return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
    return group1.toUpperCase();
  });
};

Utils.clone = function(obj) {
  return require('warden.js').Utils.extend({}, obj);
};

module.exports = Utils;
