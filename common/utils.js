module.exports = {
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
