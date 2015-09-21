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
    GameSession = new Game(data);
    this.game = GameSession;
    return Core;
  },
  onSnapshot : function(callback){
    GameSession.onFrameEnd = callback;
  },
  unfreeze : function(){
    GameSession.unlock();
    GameSession.update();
  },
  freeze : function(){
    GameSession.lock();
  }

};


module.exports = Core;
