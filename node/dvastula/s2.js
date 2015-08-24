/**
  Модуль реализующий парсинг кода на языке 2stula и возвращающий массив js - символов,
  которые компилятор превратит в js - код
  @module 2stula/Parser
*/

var is = require('./maps/types').is;

module.exports = Translator;

/**
  Транслятор
  @access public
  @param {string} source  - Строка кода на 2stula
  @return {array}         - Массив JS - который получает компилятор
*/
function Translator(source) {
  var js = toJs(tokeinzer(source));
  return (function() {
    return this.eval(js);
  })();
}

/**
  Превращает код на языке DVASTULA в массив лексем
  @access public
  @param {string} source
  @return {array}
*/
function tokeinzer(source) {
  source = source.toString();
  var seqs = source .replace(/\[/g, ' [ ')
                    .replace(/\]/g, ' ] ')
                    .replace(/\#.+(\n|$)/g, '') //cut of comments
                    .replace(/\".*?\"/g, stringSwipeOn)
                    .replace(/\'.*?\'/g, stringSwipeOn)
                    .replace(/\{.*?\}/g, stringSwipeOn);

  var lexems = seqs.trim().split(/\s+/).map(stringSwipeOff);
  return lexems;
}

/**
  Превращает список лексем языка DVASTULA в строку,
  которая распарситься в массив типов js
  @access public
  @param {array} struct
  @return {string}
*/
function toJs(struct) {
  var code = struct.map(typenizer).join('');
  return '[' + code + ']';
}

/**
  Превращает лексему DVASTULA в приемлемый для исполнения JS - тип
  @access public
  @param {string} token - лексема
  @param {number} index - позиция лексемы в списке
  @param {array} expression - список лексем
  @return {mixed}
*/
function typenizer(token, index, expression) {
  var result = '';
  if (is.string(token)){
    result = wrap(token);
  }else
  if (is.expr(token)) {
    result = wrap(token);
  }else
  if (is.id(token)) {
    result = wrap(token);
  }else {
    result = token;
  }

  /* Проверяем где расставлять запятые */
  if (token == '[' || expression[index +1] == ']' || index == (expression.length - 1)) {
    if (token[token.length -1] == '"' && expression[index + 1] !== ']') {
      result += ',';
    }
  }else {
    result += ',';
  }

  return result;
}

/**
  Возвращает строковое представление ключа.
  @param {mixed} key - значение
  @return {string} значение представленное в виде строки
*/
function wrap(key) {
  if (Array.isArray(key)){
    key = key.join(' ');
  }

  return '"' + key + '"';
}

/**
  Заменяет все пробельные символы на алиасы, чтобы не потерять их при парсинге
  @private
  @param {string} s строка
  @return {string} строка с метками
*/
function stringSwipeOn(s) {
  return s.replace(/ /g, '__PROB__')
          .replace(/\n/g, '__NLIN__')
          .replace(/\t/g, '__NTAB__');
}

/**
  Заменяет все алиасы пробельных символов на их оригинал
  @private
  @param {string} s строка
  @return {string}

*/
function stringSwipeOff(e) {
  return e.replace(/__PROB__/g, ' ')
          .replace(/__NLIN__/g, '\n')
          .replace(/__NTAB__/g, '\t');
}
