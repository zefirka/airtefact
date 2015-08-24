var utils = require('warden.js').Utils;

function Scope() {
  this.store = {};
}

Scope.prototype.get = function (name) {
  return this.store[name] || undefined;
};

Scope.prototype.set = function(name, value){
  this.store[name] = value;
  return value;
};

Scope.prototype.born = function () {
  var ns = new Scope();
  utils.extend(ns.store, this.store);
  return ns;
};

Scope.prototype.resolve = function (name){
  return  this.store[name] || (function(store){
    for(var i in store){
      if(store[i] instanceof Scope){
        return store[i].resolve(name);
      }
    }
  })(this.store);
};
