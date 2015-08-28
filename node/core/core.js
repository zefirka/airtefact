var Game   = require('./game');
//
// var ACTIONS = {
//   'move-left' : {
//     name : 'move',
//     params :  { dx : -5, dy : 0 }
//   },
//   'move-rigth' : {
//     name : 'move',
//     params :  { dx : 5, dy : 0 }
//   },
//   'move-down' : {
//     name : 'move',
//     params :  { dx : 0, dy : 5 }
//   },
//   'move-up' : {
//     name : 'move',
//     params : { dx : 0, dy : -5 }
//   }
// };
//
// var RULES = {
//   FollowCursor : {Rule : 'followCursor'},
//   FollowObject : {Rule : 'followObject'}
// };


var GameSession = {};

var Core = {
  game : GameSession,
  play : function (data){
    if (!GameSession.inited){
      GameSession = new Game(data);
    }
    GameSession.start(data);
    return Core;
  },
  onSnapshot : function(callback){
    GameSession.onFrameEnd = callback;
  }

};


module.exports = Core;
