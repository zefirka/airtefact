var Errors    = require('./maps/errors.js'),
    utils     = require('../../common/utils'),
    toArray   = utils.toArray;



/**
 * @private
 * @param {number|array} want - Ожидамый arity
 * @param {number} get - Реальный arity
 * @return {boolean}
 */
function checkArity(want, get){
  return typeof want == 'number' ? want !== get : !Boolean(~want.indexOf(get));
}

function define(scope, name, fn, arity){
  scope[name] = function (){
    var argv = toArray(arguments),
        argc = argv.length;

    if (arity && checkArity(arity, argc)){
      return Errors.ArityErrorMismatch(name, arity, argc);
    }

    return fn.apply(scope, arguments);
  };
}

function defineLang(api) {
  var scope = {};
  for(var name in api){
    define(scope, name, api[name].fn, api[name].arity);
  }
  return scope;
}

function lang(referenceLanguage){
  var dict = {
    public : {},
    private : {},
    reserved : defineLang(referenceLanguage)
  };

  return {
    set : function(keyset, key, value){
      keyset = keyset || 'public';
      dict[keyset][key] = value;
      return value;
    },
    context : 'g',
    derefAll : function(token){
      return dict.public[token] || dict.reserved[token];
    },
    derefPublic : function(name){
      return dict.public[name];
    },
    derefPrivate : function(token){
      return dict.private[token];
    },
    derefReserved : function(token){
      return dict.reserved[token];
    },
    isFn : function(token){
      return dict.private[token] == 'function';
    }
  };
}

module.exports = lang;
