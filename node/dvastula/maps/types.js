/**
  Модуль реализующий типизацию языка 2stula
  @module ss2/types
*/

/**
  Является ли лексема ссылкой (если начинается с @)
  @param {string} token
  @return {boolean}
*/
function isReference(token) {
  return token[0] == '@';
}

/**
  Является ли лексема числом
  @param {string} token
  @return {boolean}
*/
function isNumber(token) {
  return /^\d+$/.test(token);
}

/**
  Является ли лексема строкой
  @param {string} tokens
  @return {boolean}
*/
function isString(token) {
  return (token[0] == '"' && token[token.length - 1] == '"') ||
         (token[0] == '\'' && token[token.length - 1] == '\'');
}

/**
  Является ли лексема встроенным выражением
  @param {string} tokens
  @return {boolean}
*/
function isExpression(token) {
  return /^\{.+\}$/.test(token);
}

function isGlobalToken(token) {
  return token[0] == '$';
}

/**
  Является ли лексема разделителем [ ] :
  @param {string} tokens
  @return {boolean}
*/
function isDelim(token) {
  return token == '[' || token == ']' || token == ':';
}

function isId(token) {
  return !isString(token) && !isDelim(token) && !isNumber(token);
}

module.exports = {
  is : {
    number : isNumber,
    string : isString,
    refer  : isReference,
    global : isGlobalToken,
    expr   : isExpression,
    id     : isId,
    delim  : isDelim
  }
};
