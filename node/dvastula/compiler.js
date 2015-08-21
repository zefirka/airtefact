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

      lang.set('public', name, value);

      res += interpolate('this.set("{{name}}", {{value}})', {
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

      body =  compile(body, false, false, true);
      lines = body.split('\n');
      lines[lines.length - 1] =  'return ' + lines[lines.length - 1];
      body = lines.join('\n');

      return interpolate('(function({{params}}){\n\t {{body}} \n\t}).bind(this.bornScope())', {
        params : params,
        body : body
      });
    },
    arity : 2
  },

  defn : {
    fn : function(name, params, body){

      lang.set('public', name, function(){
        var myParams = toArray(arguments).join(', ');
        return 'this.get("' + name + '").call(this, ' + myParams + ')';
      });

      return API.def.fn.call(this, name, API.lambda.fn.call(this, params, body));
    },
    arity : 3
  },

  'if' : {
    fn : function(cond, then, _else){
      var ar2Statement = 'if ({{condition}}) { return {{then}}}';
      var ar3Statement = ar2Statement + ' else {return {{_else}} }';
      var str = ar2Statement;
      if (arguments.length == 3){
        str = ar3Statement;
      }

      var res = interpolate(str, {
        condition : compile(cond),
        then : compile(then),
        _else : compile(_else)
      });

      return '(function(){ ' + res + ' }).call(this)';
    }
  },
  'do' : {
    fn : function(){
      var comps = toArray(arguments);
      comps = comps.map(compile);
      return '(function(){' + comps.join('') +  '}).call(this)';
    }
  },
  list : {
    fn : function(){
      return '[' + toArray(arguments).map(compile).join(', ') + ']';
    }
  },
  '$goto' : {
    fn : function(arg){
      return '(function(arg){ return globalEng.call("goTo", arg);}).call(null, ' + compile(arg) + ')';
    },
    arity : 1
  }
};

/* MATH MACH FREI */
(['+', '-', '*', '/']).forEach(function(op){
  API[op] = {
    fn : function(){
      var args = toArray(arguments).map(compile).join(', ');
      return '(function(){ return Array.prototype.slice.call(arguments).reduce(function(a, b){ return a ' +
        op + ' b;}) }).call(null, ' + args +  ')';
    }
  };
});

API['for'] = {
  fn : function(name, rules){
    var res = '';
    var obj = compile(name);
    rules = '[' + rules.map(compile).map(function(rule){
      return CUtils.invokeForm(rule, false);
    }).join(',') + ']';
    var f = '/* FOR DIRECTIVE */';
    f += '(function(){' + rules + '.forEach(this.setRule.bind(this));}).call(globalScope.getObject("' +
      obj + '").getScope());';
    return f;
  },
  arity : 2
};

API['->'] = {
  fn : function(){
    var args = '[' + toArray(arguments).map(compile).join(', ') + '].';
    return '(function(){' + args +
               'reduce(function(result, current){ ' +
               'return typeof current == "function" ? current.call(result || null) : current;' +
               '}); }).call(this)';
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
  var body = translatedJs.map(compile);
  if (body[body.length - 1 ].slice(0, 6) !== 'return'){
    body[body.length - 1 ] = 'return ( ' + body[body.length - 1] + ' )';
  }
  body = body.join('\n\n');
  var res = interpolate(CUtils.functionWrapper, {
    fname : 'comp',
    arg_name : 'globalEnv',
    body : body,
    context : 'globalScope',
    arg_values : 'void 0'
  });

  return res;
}

function compile(js, _, _2, scope){
  if (is.array(js)){

    var pos = 0;
    while(pos < js.length ){
      var token = js[pos];

      if(!scope){
        token = lang.derefAll(token);
      }

      if (pos === 0 && !is.fn(token) ){
        console.log(token);
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
    } else
    if (/^\$.+$/.test(js) ){
      return CUtils.globalForm(js);
    } else
    if (/^\@.+$/.test(js)) {
      return CUtils.derefForm(js);
    }else{
      if(!scope){
        js = lang.derefPublic(js) || js;
      }
      return js;
    }

  }
}

module.exports = Compiler;
