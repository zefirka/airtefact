var jade = require('jade'),
    fs   = require('fs');

var Ctrl = require('./ctrl.js'),
    config = require('./config/config'),
    extend = require('warden.js').Utils.extend;

/**
  Модуль выолняющий логику компоновки событий сокета.
  Все передачи данных и формирование событий должны происходить
  в этом модуле.
  @module router
*/
module.exports = function (app) {

  /* Роут главной страницы */
  app.get('/', function(req, res, next){
    res.render('index.jade', Ctrl('index', req));
  });

  app.all('/*', function(req, res, next){
    var url = req.url;

    console.log(url);

    fs.stat(url, function(err){
     if (err){
       res.render('error404.jade', Ctrl('error404', req));
     }else{
       res.sendFile(url);
     }
     next();
   });
  });

  return app;
};
