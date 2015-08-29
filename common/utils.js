var Utils = {};


Utils.uid = function(){
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
};


Utils.genId = function(symbols, length){
  return new Array(length || 3).join('.').split('.').map(function(){
    var res = (Math.random() * Math.pow(10, symbols) >> 0).toString();
    return res.length < symbols ? '0' + res  : res;
  }).join('-');
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

Utils.forReduce = function (hash, fn, initial){
  var res = initial || null;

  Object.keys(hash).forEach(function(key){
    var value = hash[key];

    if(res === null){
      res = value;
    }else{
      res = fn(res, value, key);
    }

  });

  return res;
};

module.exports = Utils;
