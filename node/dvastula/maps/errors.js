var intp  = require('./warden.js').Utils.interpolate;

function ArityErrorMismatch(a,b,c){
  return intp('Aritye Error: function {{0}} exptect {{1}} arguments but {{2}} recieved.',a,b,c);
}

ArityErrorMismatch.signature = ['name', 'exptected arguments', 'recieved arguments'];

function SyntaxError(a){
  return intp('SyntaxError: {{0}} is not a defined method.', a);
}


module.exports = {
  arity : {
    mismatch : ArityErrorMismatch
  }
};
