var Game   = require('./game');


var GameSession = {};
var Core = {
  game : GameSession,
  start : function (data){
    if(!GameSession.inited){
      GameSession = new Game(data);
      this.game = GameSession;
      this.freeze();
    }

    if(GameSession.elements.length){
      this.unfreeze();
    }
    return Core;
  },

  clear : function(){
    GameSession.clear();
  },

  add : function (data){
    GameSession.writeCode(data);
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
