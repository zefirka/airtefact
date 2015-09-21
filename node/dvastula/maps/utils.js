/**
  @module 2Stula/maps/utils
*/

var utils = require('../../../common/utils'),
    toArray = utils.toArray,
    intp = utils.interpolate;

var wrapper = 'function {{fname}}(GAME){\n\t{{body}}\n}\n\nmodule.exports = function(scope, game){' +
  ' return {{fname}}.call(scope, game); }';

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
  return 'this["' + js.slice(1) + '"]' + (semicolon ? ';' : '');
}

function globalForm(js, semicolon){
  return 'GAME["' + js.slice(1) +  '"]' + (semicolon ? ';' : '');
}

function exprForm(js){
  return js .slice(1,-1)
            .replace(/(@[a-z\$_][\$_a-z0-9\.]*)/gi, function(a,b){
              return 'this.["' + a.slice(1)  + '"]';
            })
            .replace(/(\$[a-z\$_][\$_a-z0-9\.]*)/gi, function(a,b){
              return 'GAME["' + a.slice(1) + '"]';
            });
}
/**


  */
function comment(){
  return process.env.DEBUG == 'true' ?  intp('\n/*  {{0}}  */\n', intp.apply(null, toArray(arguments))) : '';
}

function wrapInnerCall(fn, params){
  return 'this.store.get("' + fn + '").call(this' + (params.length ? ',' + params.join(', ') : '') + ')';
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
