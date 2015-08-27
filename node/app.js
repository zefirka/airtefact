var express         = require('express'),
    ws              = require('socket.io'),
    fs              = require('fs'),
    morgan,         // inited only in dev mode
    color;          // inited only in dev mode

var config          = require('./config/config.js'),
    expressUtils    = require('./utils/express.js');


var InitMiddlewares     = require('./middlewares.js'),
    InitRoutes          = require('./router.js'),
    WebSocketMaster     = require('./socket.js');

var factory = require('./classes/element.js');
var logics = require('./classes/executer.js');

var app = express();


/* Enviroment [dev, test]*/
var env = process.env.NODE_ENV || config.env || 'dev';

InitMiddlewares(app);

/* configuration for development */
if (env == 'dev'){
  colors = require('colors');

  /* Configure morgan */
  if (config.dev.logMorgan){
    morgan = require('morgan');
    app.use(morgan('dev'));
  }

  /* Proxy configuration */
  app.set('trust proxy', 'loopback, 127.0.0.1');

}

/* Useragent enviroment configuration */
app.use(express.static(config.public));

var actionsDict = {MoveLeft : {Action : factory.Move, Params :  {posX : -5, posY : 0}},
  MoveRight : {Action : factory.Move, Params :  {posX : 5, posY : 0}},
  MoveDown : {Action : factory.Move, Params :  {posX : 0, posY : 5}},
  MoveUp : {Action : factory.Move, Params :  {posX : 0, posY : -5}}
};

var RulesDict = {FollowCursor : {Rule : factory.FollowCursor},
                  FollowObject : {Rule : factory.FollowObject}};

module.exports = {
  init : function(router){
    router = router || InitRoutes;
    router(app);
    return app;
  },
  initWebSocket : function(server){
    var io = ws(server);
    io.sockets.on('connection', WebSocketMaster);
  },
  destruct : function(){
    console.log('should destruct app');
  }
};
