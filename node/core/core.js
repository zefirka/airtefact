var Game   = require('./game');


var GameSession = {};

/**
 * @module Core
 */
var Core = {
  game : null,
  started : false,

  start : function (data) {
    this.game = new Game(data);
    this.started = true;
    this.freeze();

    return this;
  },

  connect : function (data){
    if(this.started){
      this.game.connect(data);
    }

    return this;
  },

  clear : function(){
    if(this.started){
      this.game.clear();
      this.freeze();
    }

    return this;
  },

  add : function (data){
    this.game.writeCode(data);
    return this;
  },

  onSnapshot : function(callback){
    this.game.onFrameEnd = callback;
    return this;
  },

  unfreeze : function(){
    this.game.unlock();
    return this;
  },

  freeze : function(){
    this.game.lock();
    return this;
  },

  state : function(){
    return !this.game.isLocked();
  },

  close : function(){
    this.clear();
    this.game.shutDown();
    this.game = null;

    return this;
  },

  destroy : function(){
    this.game.destroy();
    this.game = null;
    this.started = false;
    Core = null;
  }

};


module.exports = Core;
