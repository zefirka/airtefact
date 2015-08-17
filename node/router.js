var jade = require('jade'),
    fs   = require('fs');

var Ctrl = require('./ctrl.js'),
    config = require('./config/config'),
    extend = require('warden.js').Utils.extend;

/**
  Модуль выполняющий логику роутинга веб-приложения.
  Все роуты, должны быть описанны в этом модуле или подключаться сюда.
  @module node/router
*/

/**
  Проверяет существует ли данный файл.

  @todo Выделить в отдельный util, чтобы потом можно было пользоваться

  @param {string} url Адрес файла в fs
  @param {function} yes Коллбэк, вызывается, если файл найден
  @param {function} no Коллбэк, вызывается, если файл не найден
*/
function isFileExist(url, yes, no){
  return fs.stat(url, function(err){
    return err ? yes() : no();
  });
}

/**
  Принимает объект приложения и задает ему роутинги.
  @public
  @param {object} app Express.js приложение
  @return {object} конфигурированное Express.js приложение с готовым роутингом
*/
function router(app) {
  app.get('/', function(req, res, next){
    res.render('index.jade', Ctrl('index', req));
  });

  app.all('/*', function(req, res, next){
    var url = req.url;

    isFileExist(url,
      function(){
        res.sendFile(url);
        next();
      },
      function(){
        res.render('error404.jade', Ctrl('error404', req));
        next();
      }
    );
  });

  return app;
}

module.exports = router;
