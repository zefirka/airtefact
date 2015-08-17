/**
  * Модуль реализует компилятор dvastula
  *
  */
var beautify = require('js-beautify').js_beautify,
    utils = require('warden.js').Utils,
    toArray   = utils.toArray,
    interpolate = utils.interpolate,
    is = utils.is;

var Errors  = require('./maps/errors.js'),
    s2      = require('./s2.js'),
    lang    = require('./lang');

var Dvastula =  {
  parse : function (dvastula){
    return s2(dvastula);
  },
  invoke : function (js){
    return Interpreter(js, true);
  },
  compile : function (){
    var source = require('fs').readFileSync('test.ss2', {encoding : 'utf-8'});
    var res = interpolate(wrapper, {
      fname : 'comp',
      arg_name : 'globalEnv',
      body : Compiler(s2(source)),
      context : 'globalScope',
      arg_values : 'void 0'
    });

    require('fs').writeFileSync('result.js', beautify(res, { indent_size : 2 }));
    return res;
  },
  setup : function (config){

  }
};

var wrapper = '(function {{fname}}({{arg_name}}){\n\t{{body}}\n}).call({{context}},{{arg_values}});';
var _throwError = '(function(){throw "Error"})()';
function evalForm(js){
  return 'eval("(function(){ return ' + exprForm(js) + '; }).call(this);");';
}

function funcForm(js){
  return '(function(){ return ' + exprForm(js) + '; }).call(this)';
}

function exprForm(js){
  return js .slice(1,-1)
            .replace(/(@[a-z\$_][\$_a-z0-9\.]*)/gm, function(a,b){
              return 'this.get("' + a.slice(1)  + '")';
            })
            .replace(/(\$[a-z\$_][\$_a-z0-9\.]*)/gm, function(a,b){
              return 'global.get("' + a.slice(1)  + '")';
            });
}

function Compiler(source){
  return source.map(translate).join('\n\n\t');
}

/* Транслитерация объектов JS - в директивы */
function translate(js){
  if (is.array(js)){

    var pos = 0;
    while(pos < js.length ){
      var statement = js[pos];

      /*
        Trying to deref statement
       */
      if (Lang.public[statement]) {
        statement = Lang.public[statement];
      }else
      if (Lang.private[statement]) {
        statement = Lang.public[statement];
      }


      if (pos === 0 && !is.fn(statement) ){
        return _throwError;
      }

      if (pos === 0 && is.fn(statement)) {
        js = statement.apply(null, js.slice(1));
      }else{
        if (is.array(statement)){
          statement = statement.map(translate);
          js[pos] = statement;
        }
      }

      pos++;
    }
    return js;

  }else{

    if ( /^\{.+\}$/.test(js) ){
      return funcForm(js);
    } else {
      return js;
    }

  }
}

var Lang = {
  public : {

  },
  private : {

  }
};

lang(Lang.public, translate, Lang.private);

module.exports = Dvastula;

Dvastula.compile();
