var Core = require('./core');

/* Список экшнов сокета */

module.exports = {
  play : function(data, socket){
    Core.play(data).onSnapshot(function(pkg){
      socket.emit('tick', pkg);
    });
  },

  away : function(data, socket){
    var time  = data.timestamp,
        uid   = data.uid;

  }
};
