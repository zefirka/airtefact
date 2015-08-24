/**
  Модуль реализующий комплияцию кода на 2stula в JavaScript
  @module 2Stula/compiler
*/

var Errors  = require('./maps/errors'),
    Parser  = require('./s2.js'),
    CUtils  = require('./maps/utils');

var utils       = require('warden.js').Utils,
    toArray     = utils.toArray,
    interpolate = utils.interpolate,
    is          = utils.is,
    strarr      = CUtils.strarr;

/**
  Language reference
  Здесь описывается сами директивы языка
  @access public
*/
var API = {

  def : {
    fn : function(name, value){
      // добавляем сначала комментарий кода, чтобы не запутаться и для того, чтобы можно было потом сорс-мап написать
      var debug = CUtils.comment('[def {{0}} {{1}}]', name, strarr(value));

      // если следующая директива - определение функции, то храним это значение в приватных данных lang
      if(value[0] == 'lambda'){
        lang.set('private', name, 'function');
      }

      // компилируем значение
      value = compile(value);

      /* При попытке переписать зарезервированный идентификатор бросаем эксепшн. */
      if (lang.derefReserved[name]){
        return interpolate('globalScope.throwError("Trying to rewrite reserved word {{0}}");', name);
      }

      lang.set('public', name, 'this.get("' + name + '")');

      return debug + interpolate('this.set("{{name}}", {{value}})', {
        name : name,
        value : value
      });
    },
    arity :  2
  },


  lambda : {
    fn :  function(params, body){
      var debug = CUtils.comment('[lambda {{0}} {{1}}]', strarr(params), strarr(body));

      params = strarr(params);

      // null null нужны
      // хз зачем
      body = compile(body, null, null);

      lines = body.split('\n');
      lines[lines.length - 1] =  'return ' + lines[lines.length - 1];
      body = lines.join('\n');

      return debug + interpolate('(function({{params}}){\n\t {{body}} \n\t}).bind(this.born())', {
        params : params,
        body : body
      });
    },
    arity : 2
  },

  defn : {
    fn : function(name, params, body){
      var debug = CUtils.comment('[defn {{0}} {{1}} {{2}}]', name, strarr(params), strarr(body));

      lang.set('public', name, function(){
        var myParams = strarr(toArray(arguments));
        return 'this.get("' + name + '").call(this, ' + myParams + ')';
      });

      return debug + API.def.fn.call(this, name, ['lambda', params, body]);
    },
    arity : 3
  },

  'if' : {
    fn : function(cond, then, _else){
      var debug = CUtils.comment('[if {{0}} {{1}} {{2}}]', strarr(cond), strarr(then), _else ? strarr(_else) : '');

      var ar2Statement = 'if ({{condition}}) { return {{then}}}',
          ar3Statement = ar2Statement + ' else {return {{_else}} }',
          str = ar2Statement;

      if (arguments.length == 3){
        str = ar3Statement;
      }

      var res = interpolate(str, {
        condition : compile(cond),
        then : compile(then),
        _else : compile(_else)
      });

      return debug + '(function(){ ' + res + ' }).call(this)';
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

/* MATH MACHT FREI */
(['+', '-', '*', '/', '>', '<', '>=', '<=', '&&', '&', '>>', '<<']).forEach(function(op){
  API[op] = {
    fn : function(){
      var args = toArray(arguments).map(compile).join(', ');
      var debug = CUtils.comment('[' + op + ' ' +  strarr(args) + ']');
      return debug + '(function(){ return Array.prototype.slice.call(arguments).reduce(function(a, b){ return a ' +
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
    var f = '/* FOR DIRECTIVE */\n';
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


/* Вот здесь происходит определение языка на основе вышеизложенного API */
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

function compile(js, indexInParent, parent){
  if (is.array(js)){
    var pos = 0;

    while(pos < js.length ){
      var token = js[pos];

      if (lang.derefPrivate(token)){
        token = token;
      } else {
        token = lang.derefAll(token) || token;
      }

      if (pos === 0 && !( is.fn(token)  || lang.isFn(token) )  ){
        return CUtils.errorWrapper;
      }

      if (pos === 0) {
        if (is.fn(token) ) {
          js = token.apply(null, js.slice(1));
        }else{
          return CUtils.wrapInnerCall(token, js.slice(1).map(compile));
        }
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
      if (lang.derefReserved(js)){
        js = interpolate('globalScope.throwError("Trying to rewrite reserved word {{0}}");', js);
      }else{
        js = lang.derefPublic(js) || js;
      }
      return js;
    }

  }
}

module.exports = Compiler;
