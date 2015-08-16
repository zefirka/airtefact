
function isReference(token) {
  return token[0] == '@';
}

function isNumber(token) {
  return /^\d+$/.test(token);
}

function isString(token) {
  return (token[0] == '"' && token[token.length - 1] == '"') ||
          (token[0] == '\'' && token[token.length - 1] == '\'');
}

function isExpression(token) {
  return /^\{.+\}$/.test(token);
}

function isGlobalToken(token) {
  return token[0] == '$';
}

function isDelim(token) {
  return token == ']' || token == ']' || token == ':';
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
