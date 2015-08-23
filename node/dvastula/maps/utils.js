/**
  @module 2Stula/maps/utils
*/

var utils = require('warden.js').Utils,
    toArray = utils.toArray,
    intp = utils.interpolate;

var wrapper = 'function {{fname}}({{context}}){\n\t{{body}}\n}\n\nmodule.exports = function(glob, scope){' +
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
              return 'globalScope.get("' + a.slice(1)  + '")';
            });
}
/**


  */
function comment(){
  return process.env.DEBUG == 'true' ?  intp('/*  {{0}}  */\n', intp.apply(null, toArray(arguments))) : '';
}

function wrapInnerCall(fn, params){
  return 'this.get("' + fn + '").call(this, ' + params.join(', ') + ')';
}

function strarr(arr){
  if(Array.isArray(arr)){
    var str = arr.map(function(item){
      if(Array.isArray(item)){
        return strarr(item);
      }else{
        return item;
      }
    }).join(' ');

    return '[' + str + ']';

  }else{
    return arr;
  }
}

module.exports  = {
  functionWrapper : wrapper,
  errorWrapper    : _throwError,
  evalForm        : evalForm,
  derefForm       : derefForm,
  funcForm        : funcForm,
  exprForm        : exprForm,
  globalForm      : globalForm,
  invokeForm      : invokeForm,
  comment         : comment,
  wrapInnerCall   : wrapInnerCall,
  strarr          : strarr
};
