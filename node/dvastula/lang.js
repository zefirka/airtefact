var beautify = require('js-beautify').js_beautify,
    utils = require('warden.js').Utils,
    toArray   = utils.toArray,
    interpolate = utils.interpolate,
    is = utils.is;

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

var translate = null;
var Priv = {};

var Language = {

  def : {
    fn : function(name, value){
      var res = '';

      value = translate(value);

      /*
        При попытке переписать зарезервированный идентификатор бросаем эксепшн
      */
      if (Language[name]){
        res = interpolate('globalScope.throwError("Trying to rewrite reserved word {{0}}");\n', name);
        return res;
      }

      if (Priv[name]){
        res += 'globalScope.throWarning("Trying to rewrite local variable");\n';
      }

      Priv[name] = value;

      res += interpolate('this.set("{{name}}", {{value}});', {
        name : name,
        value : value
      });

      return res;

    },
    arity :  2
  },

  lambda : {
    fn :  function(params, body){
      params = params.join(', ');
      body = translate(body);
      lines = body.split('\n');
      lines[lines.length - 1] =  'return ' + lines[lines.length - 1];
      body = lines.join('\n');
      return interpolate('(function({{params}}){\n\t {{body}} \n\t}).bind(this)', {
        params : params,
        body : body
      });
    },
    arity : 2
  }
};

module.exports = function(lang, t, p){
  translate = t;
  Priv = p;
  for(var definition in Language){
    define(lang, definition, Language[definition].fn, Language[definition.arity]);
  }
  return lang;
};
