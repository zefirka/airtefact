var config = require('../config/config');
var beautify    = require('js-beautify').js_beautify;
var s2Compiler = require('../dvastula/compiler');

var fs = require('fs');

module.exports = [
  function (socket){
    console.log('hui');
    socket.on('save', function(code){
      console.log(code);
      var js = s2Compiler(code);
      js = beautify(js);
      var timestamp = new Date().getTime().toString().slice(3),
          filename = config.files + '/myId.' + timestamp;

      console.log('writing file ', filename);
      fs.writeFile(filename + '.js', js, function(err, data){
        if(err){
          throw 'Fuck me plz';
        }

        socket.emit('compile:ready', filename);

      });
    });
  }
];
