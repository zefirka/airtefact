var favicon         = require('serve-favicon'),
    bodyParser      = require('body-parser'),
    morgan          = require('morgan'),
    jade            = require('jade'),
    cookieParser    = require('cookie-parser'),
    url             = require('url'),
    fs              = require('fs'),
    color;          // inited only in dev mode

var config          = require('./config/config');

module.exports = function(app){
  /* Configure middlewares */

  app.use(bodyParser.urlencoded({
    extended : true
  }));

  /* Body parser and cookie parser */
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use(favicon(config.meta.favicon));


  /* Jade configuration */
  app.set('views', config.views);
  app.set('view engine', 'jade');
  app.engine('jade', jade.__express);

};

function uiDetect () {
  return {};
}
