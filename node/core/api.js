var API = {
  'move-left' : {
    name : 'move',
    params :  { dx : -1, dy : 0 },
    paramName : 'speed'
  },
  'move-right' : {
    name : 'move',
    params :  { dx : 1, dy : 0 },
    paramName : 'speed'
  },
  'move-down' : {
    name : 'move',
    params :  { dx : 0, dy : 1 },
    paramName : 'speed'
  },
  'move-up' : {
    name : 'move',
    params : { dx : 0, dy : -1 },
    paramName : 'speed'
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
  var method = API[name] && API[name].name,
      params = method && (API[name].params ? [API[name].params] : []).concat(args);

  return method ? this[method].apply(this, params) : this.throwError.apply(this, params);
};
