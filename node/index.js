var fs = require('fs');

var App = require('./app');

process.argv.forEach(function(arg){
  /* In case if want to use custom port */
  if(arg.indexOf("-p")>=0){
    config.port = parseInt(arg.split('=').pop())
  }

  if(arg.indexOf("-d")>=0){
    config.currentTemplate = arg.split('=').pop();
  }
});

var server = app.listen(config.port, function () {
  var host = server.address().address,
      port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});