/**
  @module 2Stula/maps/utils
*/

var wrapper = 'function {{fname}}({{context}}){\n\t{{body}}\n};\n\nmodule.exports = function(glob, scope){' +
  '{{fname}}.call(scope, glob); ' +
  '}';
var _throwError = '(function(){throw "Error"})();';

function evalForm(js){
  return 'eval("(function(){ return ' + exprForm(js) + '; }).call(this);");';
}

function funcForm(js, semicolon){
  return '(function(){ return ' + exprForm(js) + '; }).call(this)'  + (semicolon ? ';' : '');
}

function invokeForm(js, semicolon){
  return '(function(){' + js + '}).call(this)' + (semicolon ? ';' : '');
}

function derefForm(js, semicolon){
  return 'this.get("' + js.slice(1) + '")' + (semicolon ? ';' : '');
}

function globalForm(js, semicolon){
  return 'globalScope.get("' + js.slice(1) + '")' + (semicolon ? ';' : '');
}

function exprForm(js){
  return js .slice(1,-1)
            .replace(/(@[a-z\$_][\$_a-z0-9\.]*)/gm, function(a,b){
              return 'this.get("' + a.slice(1)  + '")';
            })
            .replace(/(\$[a-z\$_][\$_a-z0-9\.]*)/gm, function(a,b){
              return 'globalEnv.get("' + a.slice(1)  + '")';
            });
}

module.exports  = {
  functionWrapper : wrapper,
  errorWrapper    : _throwError,
  evalForm        : evalForm,
  derefForm       : derefForm,
  funcForm        : funcForm,
  exprForm        : exprForm,
  globalForm      : globalForm,
  invokeForm      : invokeForm
};
