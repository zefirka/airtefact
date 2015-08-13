var config = require('./config/config');
var express = require('./app');

var App = express.init();


process.argv.forEach(function(arg){
  /* In case if want to use custom port */
  if(arg.indexOf("-p")>=0){
    config.port = parseInt(arg.split('=').pop())
  }

  if(arg.indexOf("-d")>=0){
    config.currentTemplate = arg.split('=').pop();
  }
});

var server = App.listen(config.port, function () {
  var host = server.address().address,
      port = server.address().port;

    console.log('App listening at http://127.0.0.1:%s', port);
});
