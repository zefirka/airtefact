/**
  Модуль реализующий выдачу ошибков в компилятор
  @module ss2/errors
*/

var intp  = require('../../../common/utils').interpolate;

/**
  Ошибка несовпадения количество ожидаемых аргументов и реальных
  @public
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
  @public
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
