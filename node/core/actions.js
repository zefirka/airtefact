// var config = require('../config/config');
// var s2Compiler = require('../dvastula/compiler');
// var fs = require('fs');

var Core = require('./core');

var dicts =

module.exports = [

  function (socket){
    socket.on('play', function(data){
      var commands = data.code.toString().split(',');

      data.elements.forEach(function(element){
        Core.createElement(element);
      });

      commands.forEach(function(command, index) {
        var id = 0,
            action = null;

        if (command.indexOf(':') >= 0) {
          var path = command.split(':');

          action = path.pop();
          id = path.pop();

          Core.setCommand({
            id   : id,
            name : action
          });

        }
      });

      Core.fix();

      setInterval(function(){
        Core.update(socket);
      }, 30);

    });

  },

  function (socket){
    socket.on('create', function(id){
    });
  }

];
