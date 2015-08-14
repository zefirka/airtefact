var extend = Warden.Utils.extend;

function Mix(fn, mixin){
  function Mixed(){
    return fn.apply(this, arguments);
  }

  extend(Mixed.prototype, mixin);

  return Mixed;
}

module.exports.Mix = Mix;
