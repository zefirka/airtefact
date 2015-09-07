var API = {
  'move-left' : {
    name : 'move',
    params :  { dx : -5, dy : 0 }
  },
  'move-right' : {
    name : 'move',
    params :  { dx : 5, dy : 0 }
  },
  'move-down' : {
    name : 'move',
    params :  { dx : 0, dy : 5 }
  },
  'move-up' : {
    name : 'move',
    params : { dx : 0, dy : -5 }
  },
  'follow' : {
    name : 'follow',
    params : ['%s']
  }
};

module.exports = function(name){
  var method = API[name].name,
      params = API[name].params;

  return this.instance[method].call(this.instance, params);
};
