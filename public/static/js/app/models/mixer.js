var extend = Warden.Utils.extend;

function mix(fn, mixin){
  function Mixed(){
    return fn.apply(this, arguments);
  }

  extend(Mixed.prototype, mixin);

  return Mixed;
}

function complain(fn, newFn, ctx){
  return function(){
    fn.apply(ctx, arguments);
    return newFn.apply(ctx, arguments);
  };
}

function partial(fn) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function(){
    fn.apply(this, args.concat(Array.prototype.slice.call(arguments)));
  };
}

module.exports.mix = mix;
module.exports.inherit = complain;
module.exports.partial = partial;
