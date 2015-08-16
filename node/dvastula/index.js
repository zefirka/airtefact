var deref = require('./deref.js'),
    s2Pkg = require('./s2.js');

function S2(source){
  var js = s2Pkg(source);

  return Eval(js);
}

function Eval(js){

}

module.exports = S2;
