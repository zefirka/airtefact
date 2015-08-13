var express         = require('express'),
    favicon         = require('serve-favicon'),
    bodyParser      = require('body-parser'),
    morgan          = require('morgan'),
    jade            = require('jade'),
    cookieParser    = require('cookie-parser'),
    url             = require('url'),
    fs              = require('fs'),
    color;          // inited only in dev mode

var config          = require('./config/config.js'),
    expressUtils    = require('./utils/exrepss');


var InitMiddlewares     = require('./middlewares.js'),
    InitRoutes          = require('./router.js');

var app = express();

/* Enviroment [dev, test]*/ 
var env = process.env.NODE_ENV || config.env || 'dev';

InitMiddlewares(app);

/* configuration for development */
if(env == 'dev'){
  colors = require('colors');

  /* Configure morgan */
  if(config.dev.logMorgan){
    app.use(morgan('dev'));
  }

  /* Proxy configuration */
  app.set('trust proxy', 'loopback, 127.0.0.1');

}

/* Useragent enviroment configuration */
app.use(favicon(config.meta.favicon));
app.use(express.static(config.public));


/* Main route */
app.get('/', function (req, res) {
  res.render('index.jade', utils.getCtrl('index'));
});



module.exports = {
  init: function(router){
    router = router || InitRoutes;
    return router(app);
  },
  destruct: function(){
    console.log('should destruct app')
  }
}

