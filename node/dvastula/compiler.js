/**
  @module 2Stula/compiler
*/

var Errors  = require('./maps/errors'),
    Parser  = require('./s2.js'),
    CUtils  = require('./maps/utils');

var utils       = require('warden.js').Utils,
    toArray     = utils.toArray,
    interpolate = utils.interpolate,
    is          = utils.is;

/* Language reference */
var API = {
  def : {
    fn : function(name, value){
      var res = '';
      value = compile(value);

      /* При попытке переписать зарезервированный идентификатор бросаем эксепшн. */
      if (lang.derefReserved[name]){
        res = interpolate('globalScope.throwError("Trying to rewrite reserved word {{0}}");', name);
        return res;
      }

      if (lang.derefPrivate[name]){
        res += 'globalScope.throWarning("Trying to rewrite local variable");';
      }

      lang.set('private', name, value);

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
      body = compile(body);
      lines = body.split('\n');
      lines[lines.length - 1] =  'return ' + lines[lines.length - 1];
      body = lines.join('\n');

      return interpolate('(function({{params}}){\n\t {{body}} \n\t}).bind(this)', {
        params : params,
        body : body
      });
    },
    arity : 2
  },

  defn : {
    fn : function(name, params, body){
      return API.def.fn.call(this, name, API.lambda.fn.call(this, params, body));
    },
    arity : 3
  }
};



var lang = require('./lang')(API);

/**
  Компилирует строку 2stula в JS
  @public
  @param {string} source код ss2
  @return {string} код на js
*/
function Compiler(source){
  var translatedJs = Parser(source);
  var body = translatedJs.map(compile).join('\n\n');

  console.log(body);
  var res = interpolate(CUtils.functionWrapper, {
    fname : 'comp',
    arg_name : 'globalEnv',
    body : body,
    context : 'globalScope',
    arg_values : 'void 0'
  });

  return res;
}

function compile(js){
  if (is.array(js)){

    var pos = 0;
    while(pos < js.length ){
      var token = js[pos];

      token = lang.derefAll(token);
      if (pos === 0 && !is.fn(token) ){
        return CUtils.errorWrapper;
      }

      if (pos === 0 && is.fn(token)) {
        js = token.apply(null, js.slice(1));
      }else{
        if (is.array(token)){
          token = token.map(compile);
          js[pos] = token;
        }
      }

      pos++;
    }

    return js;

  }else{

    if ( /^\{.+\}$/.test(js) ){
      return CUtils.funcForm(js);
    } else {
      return js;
    }

  }
}

module.exports = Compiler;
