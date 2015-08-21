var Errors    = require('./maps/errors.js'),
    utils     = require('warden.js').Utils,
    toArray   = utils.toArray;

function wrapCall(v){
  return '(function(){\n\t\treturn ' + v + ';\n\t}).call(this);';
}

function define(scope, name, fn, arity){
  scope[name] = function (){
    var argv = toArray(arguments),
        argc = argv.length;

    if (arity && arity !== argc){
      return wrapCall(Errors.ArityErrorMismatch(name, arity, argc));
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
    derefAll : function(token){
      return dict.public[token] || dict.private[token] || dict.reserved[token];
    },
    derefPublic : function(name){
      return dict.public[name];
    },
    derefPrivate : function(token){
      return dict.private[token];
    },
    derefReserved : function(token){
      return dict.private[token];
    }
  };
}

module.exports = lang;
