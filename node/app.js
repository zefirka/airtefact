var express         = require('express'),
    ws              = require('socket.io'),
    fs              = require('fs'),
    morgan,         // inited only in dev mode
    colors;          // inited only in dev mode

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
    var infoCollector = [];
    io.sockets.on('connection', function (socket) {
      socket.on('play', function(res) {
        var commands = res.toString().split(',');
        commands.forEach(function(elem,index) {
          var ID = 0;
          var Params = 0;
          if (elem.indexOf(':') > -1) {
            ID = elem.split(':')[0];
            var ActionName =  elem.split(':')[1];
            var Action = actionsDict[ActionName].Action;
            Params =  actionsDict[ActionName].Params;
            factory.GetElementsById(ID).map(function(a) {
              a.AddAction(Action, Params);
            });
          } else if (elem.indexOf(':') > -1) {
            ID = elem.split(';')[0];
            var RuleName =  elem.split(';')[1];
            var RuleObj = RuleName.split('|')[1];
            if (RuleObj !== '')  {
              RuleObj = factory.GetElementsById(RuleObj);
            }
            RuleName = RuleName.split('|')[0];
            var Rule = RulesDict[RuleName].Rule;
            factory.GetElementsById(ID).map(function(a) {
              a.AddRule(Rule, RuleObj, RuleName);
            });
          }
        });
      });
      socket.on('create', function() {
        console.log('create ');
        var el = new factory.Element();
        logics.Elements.push(el);
        socket.emit('appendInterface', {});
        logics.Execute(io.sockets);
      });
      socket.on('ping', function(info) {
        infoCollector.push(info);
      });
      WebSocketMaster(socket);
      setInterval(function() {
        factory.UpdateInfo(infoCollector);
        infoCollector = [];
        logics.Execute(io.sockets);
      },30);
    });

    //setInterval(function() {
    //
    //}, 2000);
  },
  destruct : function(){
    console.log('should destruct app');
  }
};
