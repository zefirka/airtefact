/**
  @module 2Stula/maps/errors
*/

var intp  = require('warden.js').Utils.interpolate;

function ArityErrorMismatch(a,b,c){
  return intp('(function(){ throw(\"Arity Error: function {{0}} exptects {{1}} ' +
  'arguments, but {{2}} was recieved.\")})();', a, b, c);
}

ArityErrorMismatch.signature = ['name', 'exptected arguments', 'recieved arguments'];

function SyntaxError(a){
  return intp('SyntaxError: {{0}} is not a defined method.', a);
}


module.exports = {
  ArityErrorMismatch : ArityErrorMismatch
};
