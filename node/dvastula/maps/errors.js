/**
  Модуль реализующий выдачу ошибков в компилятор
  @module ss2/errors
*/

var intp  = require('../../../common/utils').interpolate;

var utils = require('./utils'),
    call  = utils.call;

/**
  Ошибка несовпадения количество ожидаемых аргументов и реальных
  @public
  @param {string} fname - название функции
  @param {string} expArity - ожидамое количество аргументов
  @param {string} realArity - реальное количество аргументов
  @return {string}
*/
function ArityErrorMismatch(fname, expArity, realArity){
  var error = 'Arity Error: function {{0}} exptects {{1}} arguments, but {{2}} was recieved.';
  error = intp(error, fname, expArity, realArity);
  return throwError(error);
}

/**
 * Создает конструкцию, которая викидывает ошибку
 *
 * @param {string} error
 * @return {string}
 */
function throwError(error){
  var t = intp('this.throwError("{{0}}")', error);
  return call(t);
}

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
