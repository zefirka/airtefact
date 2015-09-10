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

function define(arity, fn){
  return {
    arity : arity,
    fn : fn
  };
}

/**
  Language reference
  Здесь описывается сами директивы языка
  @access public
*/
var API = {};

API.makeAliases = function(o){
  for(var i in o){
    this[o[i]] = this[i];
  }
};


/* Функция def */
API.def = define(2, function(name, value){
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
    return interpolate('this.throwError("Trying to rewrite reserved word {{0}}");', name);
  }

  lang.set('public', name, 'this.store.get("' + name + '")');

  return debug + interpolate('this.store.set("{{name}}", {{value}})', {
    name : name,
    value : value
  });
});


API.lambda = define(2, function(params, body){
  var debug = CUtils.comment('[lambda {{0}} {{1}}]', strarr(params), strarr(body));

  params = params.join(',');

  // null null нужны
  // хз зачем
  body = compile(body, null, null);

  lines = body.split('\n');
  lines[lines.length - 1] =  'return ' + lines[lines.length - 1];
  body = lines.join('\n');

  return debug + interpolate('(function({{params}}){\n\t {{body}} \n\t}).bind(this.store.inherit())', {
    params : params,
    body : body
  });
});

/**
 @name defn
 */
API.defn = define(3, function(name, params, body){
  var debug = CUtils.comment('[defn {{0}} {{1}} {{2}}]', name, strarr(params), strarr(body));

  lang.set('public', name, function(){
    var myParams = strarr(toArray(arguments));
    return 'this.store.get("' + name + '").call(this, ' + myParams + ')';
  });

  return debug + API.def.fn.call(this, name, ['lambda', params, body]);
});

/**
 @name if
 */
API['if'] = define(null, function(cond, then, _else){
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
});

API.list = define(null, function(){
  return '[' + toArray(arguments).join(', ') + ']';
});

/* MATH MACHT FREI */
(['+', '-', '*', '/', '>', '<', '>=', '<=', '&&', '&', '>>', '<<', '||']).forEach(function(op){
  API[op] = {
    fn : function(){
      var args = toArray(arguments).map(compile).join(', ');
      var debug = CUtils.comment('[' + op + ' ' +  strarr(args) + ']');
      return debug + '(function(){ return Array.prototype.slice.call(arguments).reduce(function(a, b){ return a ' +
        op + ' b;}) }).call(null, ' + args +  ')';
    }
  };
});

API.makeAliases({
  '&&' : 'and',
  '||' : 'or',
  '>'  : 'gt',
  '<'  : 'lt',
  '>=' : 'gte',
  '<=' : 'lte'
});

API.eq = define(2, function(a, b){
  return '(function(){ return ' + compile(a) + '==' + compile(b) + '; }).call(this)';
});

API.not = define(1, function(a){
  return '(function(){ return !( ' + compile(a) + ' ); }).call(this)';
});

API['for'] = define(2, function(name, rules){
  var debug = CUtils.comment('[for {{0}} {{1}}]', strarr(name), strarr(rules));

  lang.context = 'e';
  var body = rules.map(compile).join(';\n');
  lang.context = 'g';

  return debug + '(function(){' + body + ' }).call(this.getElement("' +
    name + '"))';
});


API.when = define(2, function(phase, behavior){
  return 'this.when("' + phase + '", function(){' +  behavior.map(compile).join(';\n') + '})';
});

/**
 Фазы
 */
API.phase = define(null, function(name, source){
  var debug = CUtils.comment('[phase {{0}} {{1}}]', name, source ? strarr(source) : '');
  var res = '';

  if(!source){
    if(lang.context == 'g'){
      res = 'this.throwError("You can\'t set phase on global context ")';
    }else{
      res = 'this.phase = ' + compile(name);
    }
  }else{
    lang.context = 'e';
    var phase = '{ "' + name + '" : function(){' + source.map(compile).join(';\n') + '} }';
    res = 'this.phases.push(' +  phase + ');';
    lang.context = 'g';
  }

  return debug + res;

});

API['do'] = define(null, function(name){
  var args = toArray(arguments).slice(1).map(compile).join(', ');
  return 'this.api.call(this, "' + name + '"' + (args ? ', ' + args : '') +')';
});

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
    context : '',
    arg_values : 'void 0'
  });

  return res;
}

// использование Math.round() даст неравномерное распределение!
function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
