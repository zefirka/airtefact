var config = require('../config/config');

var s2Compiler = require('../dvastula/compiler');

var fs = require('fs');

module.exports = [

  function (socket){
    socket.on('play', function(code){
      var js = s2Compiler(code);
      var timestamp = new Date().getTime().toString().slice(3),
          filename = config.files + '/myId.' + timestamp;

      fs.writeFile(filename + '.js', js, function(err, data){

        if(err){
          console.log(err);
          console.error('cant write file');
        }

        socket.emit('compile:ready', filename);
      });
    });
  }

];
