var Game   = require('./game');
//
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
