var is = require('./types').is;

module.exports = Translator;

/**
  Транслятор:
  @param {string} source  - Строка кода на языке DVASTULA
  @return {array}         - Массив JS - который исполняет интерпретатор
*/
function Translator(source) {
  var js = toJs(tokeinzer(source));
  return (function() {
    return this.eval(js);
  })();
}

/**
  Превращает код на языке DVASTULA в массив лексем
  @param {string} source
  @return {array}
*/
function tokeinzer(source) {
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
  @param {array} struct
  @return {string}
*/
function toJs(struct) {
  var code = struct.map(typenizer).join('');
  return '[' + code + ']';
}

/**
  Превращает лексему DVASTULA в приемлемый для исполнения JS - тип
  @param {string} token - лексема
  @param {number} index - позиция лексемы в списке
  @param {array} expression - список лексем
  @return {mixed}
*/
function typenizer(token, index, expression) {
  var result = '';

  if (is.global(token)) {
    result = wrap('G', token.slice(1));
  }else
  if (is.refer(token)) {
    result = wrap('D', token.slice(1));
  }else
  if (is.id(token)) {
    result = wrap('I', token);
  }else
  if ( is.expr(token)) {
    result = wrap('E', token.slice(1,-1));
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

/* Служебные функции */
function wrap(keyset, key) {
  return 'function deref(scope){ return scope.$' + keyset + '["' + key + '"]; }';
}

function stringSwipeOn(s) {
  return s.replace(/ /g, '__PROB__')
          .replace(/\n/g, '__NLIN__')
          .replace(/\t/g, '__NTAB__');
}

function stringSwipeOff(e) {
  return e.replace(/__PROB__/g, ' ')
          .replace(/__NLIN__/g, '\n')
          .replace(/__NTAB__/g, '\t');
}
