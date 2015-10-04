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

module.exports = is;
