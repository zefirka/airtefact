var Utils = {
  uid : function(){
    var store = {};

    return {
      set : function(key, value){
        store[key] = value;
        return value;
      },

      setIfNotSet : function(key, value){
        if (this.get(key) !== undefined){
          this.set(key, value);
        }else{
          return false;
        }
      },

      setOnce : function(key, value){
        Object.defineProperty(store, key, {
          value : value,
          writable : false,
          enumerable : true,
          configurable : false
        });
      },

      get : function(key){
        return store[key];
      }
    };
  },

  guid : function (length) {
    return length;
  }
};

Utils.forIn = function (hash, fn){
  return Object.keys(hash).forEach(function(key){
    fn(hash[key], key);
  });
};

Utils.forMap = function (hash, fn){
  var res = {};
  Object.keys(hash).forEach(function(key){
    res[key] = fn(hash[key], key);
  });
  return res;
};

module.exports = Utils;
