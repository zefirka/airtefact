/**
  @module ss2/utils
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

/**
 * @param {string} js
 * @param {boolean} semicolon
 * @return {string}
 */
function funcForm(js, semicolon){
  return '(function(){ return ' + exprForm(js) + '; }).call(this)'  + (semicolon ? ';' : '');
}

/**
 * @param {string} js
 * @param {boolean} semicolon
 * @return {string}
 */
function invokeForm(js, semicolon){
  return '(function(){' + js + '}).call(this)' + (semicolon ? ';' : '');
}

/**
 * @param {string} js
 * @param {boolean} semicolon
 * @return {string}
 */
function derefForm(js, semicolon){
  return 'this["' + js.slice(1) + '"]' + (semicolon ? ';' : '');
}

/**
 * @param {string} js
 * @param {boolean} semicolon
 * @return {string}
 */
function globalForm(js, semicolon){
  return 'GAME["' + js.slice(1) +  '"]' + (semicolon ? ';' : '');
}


/**
 * Возвращает последний конструкцию с return
 *
 * @param {mixed} list
 * @param {function} processor
 * @return {stirng}
 */
function returnLastValue(list, processor){
  if(Array.isArray(list)){
    list = processor ? list.map(processor) : list;
    list[list.length - 1] = intp('return ({{0}});', list[list.length - 1]);
    return list.join('\n');
  }else{
    return intp('return ({{0}});', processor ? processor(list) : list);
  }
}

/**
 * @param {string} v
 * @return {string}
 */
function call(v, semicolon){
  return '(function(){ ' + returnLastValue(v) + '}).call(this)' + (semicolon ? ',' : '');
}

/**
 * @param {string} js
 * @param {boolean} semicolon
 * @return {string}
 */
function exprForm(js, semicolon){
  return js .slice(1,-1)
            .replace(/(@[a-z\$_][\$_a-z0-9\.]*)/gi, function(a,b){
              return 'this.["' + a.slice(1)  + '"]';
            })
            .replace(/(\$[a-z\$_][\$_a-z0-9\.]*)/gi, function(a,b){
              return 'GAME["' + a.slice(1) + '"]';
            });
}

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
  strarr          : strarr,
  call            : call,
  returnLastValue : returnLastValue
};
