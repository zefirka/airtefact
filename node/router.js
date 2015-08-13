var Ctrl = require('./ctrl.js');

var jade = require('jade'),
    config = require('./config/config'),
    extend = require('warden.js').Utils.extend;


module.exports = function (app) {
  app.get('/', function(req, res, next){
    // отправляю отрендеренный jade

    res.render('index.jade', extend({}, config, Ctrl()));
  })

  return app;
}
