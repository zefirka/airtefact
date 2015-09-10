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
  },
  'dist-to' : {
    name : 'dist'
  },
  'goto' : {
    name : 'goto'
  }
};

module.exports = function(name){
  var args = [].slice.call(arguments, 1);
  var method = API[name].name,
      params = (API[name].params ? [API[name].params] : []).concat(args);

  return this[method].apply(this, params);
};
