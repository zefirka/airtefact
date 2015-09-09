/**
  Модуль реализующий выдачу ошибков в компилятор
  @module 2Stula/maps/errors
*/

var intp  = require('warden.js').Utils.interpolate;

/**
  Ошибка несовпадения количество ожидаемых аргументов и реальных
  @param {string} fname - название функции
  @param {string} expArity - ожидамое количество аргументов
  @param {string} realArity - реальное количество аргументов
  @return {string}
*/
function ArityErrorMismatch(fname, expArity, realArity){
  return intp('(function(){ this.throwError(\"Arity Error: function {{0}} exptects {{1}} ' +
  'arguments, but {{2}} was recieved.\")})();', fname, expArity, realArity);
}

ArityErrorMismatch.signature = ['name', 'exptected arguments', 'recieved arguments'];

/**
  Синтаксическая ошибка
  @param {string} errorMessage - текст ошибки
  @return {string}
*/
function SyntaxError(errorMessage){
  return intp('SyntaxError: {{0}}.', errorMessage);
}


module.exports = {
  ArityErrorMismatch  : ArityErrorMismatch,
  SyntaxError         : SyntaxError
};
