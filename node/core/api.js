var API = {
  'move-left' : {
    name : 'move',
    params :  { dx : -5, dy : 0 }
  },
  'move-rigth' : {
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
  }
};

module.exports = API;
