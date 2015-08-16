var express         = require('express'),
    ws              = require('socket.io'),
    cookieParser    = require('cookie-parser'),
    url             = require('url'),
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




module.exports = {
  init : function(router){
    router = router || InitRoutes;
    router(app);
    return app;
  },
  initWebSocket : function(server){
    var io = ws(server);
    io.sockets.on('connection', function (socket) {
      socket.on('play', function(res) {
        var commands = res.toString().split(',');
        commands.forEach(function(elem,index) {
          var ID = elem.split(':')[0];
          var ActionName =  elem.split(':')[1];
          var Action = actionsDict[ActionName].Action;
          var Params =  actionsDict[ActionName].Params;
          factory.GetElementsById(ID).map(function(a) {
            a.AddAction(Action, Params);
          });
        });
      });
      socket.on('create', function() {
        console.log("create ");
        var el = new factory.Element();
        logics.Elements.push(el);
        socket.emit('appendInterface', {});
        logics.Execute(io.sockets);
      });
      WebSocketMaster(socket);
      setInterval(function() {
        logics.Execute(io.sockets);
      },1000);
    });

    //setInterval(function() {
    //
    //}, 2000);
  },
  destruct : function(){
    console.log('should destruct app');
  }
};
