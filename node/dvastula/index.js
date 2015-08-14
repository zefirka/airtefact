

function Dvastula(source){
  var js;
  (function(){
    js = this.eval(source);
  })();
  return js;
}
