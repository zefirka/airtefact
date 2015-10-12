'use strict';

/**
 * Модуль утилит
 * @module common/collection
 */

var Utils = {};

/**
 * Обработчик fn ходит по массиву, пока не натыкается на выражение
 * preventValue и тогда возвращает его, иначе exceptions (или false)
 * @public
 * @name forWhile
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
    if(typeof preventValue === 'function' ? preventValue(val, arr[i], i) === true : val === preventValue){
      return typeof preventValue === 'function' ? preventValue(val, arr[i], i) : preventValue;
    }
  }
  return exceptions !== undefined ? exceptions : false;
};

/**
 * Возвращает массив сделанный из чего угодно
 * @param {mixed} a
 * @return {array}
 */
Utils.toArray = function(array){
  if (typeof array === 'object'){
    array = Utils.forFilter(array, function(value, key){
      if(key === '0' || Number(key)){
        return true;
      }
    });

    array.length = Object.keys(array).length;
  }

  return Array.prototype.slice.call(array);
};

/**
 * Расширяет первый объект-аргумент следующими
 * @param {object} object - расширяемый объект
 * @param {object} o1
 * @param {object} o2
 * @param {object} ...
 * @param {object} on
 * @return {object}
 */
Utils.extend = function (/* object, o1, o2, ... on */) {
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

/**
 * Reduces collection by function fn(res, value, key)
 *
 * @param {object} hash
 * @param {function} fn
 * @param {mixed} initial
 * @return {mixed}
 */
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

module.exports = Utils;
