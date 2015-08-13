var Ctrl = require('./ctrl.js');

var jade = require('jade'),
    config = require('./config/config'),
    extend = require('warden.js').Utils.extend;


module.exports = function (app) {

  /* Роут главной страницы */
  app.get('/', function(req, res, next){
    res.render('index.jade', Ctrl('index'));
  });

  // app.get('/', function(req, res, next){
  //   res.render('error404.jade', Ctrl('error404', req))
  // });

  return app;
}
