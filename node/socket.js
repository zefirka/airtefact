/**
  Модуль выолняющий логику компоновки событий сокета.
  Все передачи данных и формирование событий должны происходить
  в этом модуле.
  @module node/socket
*/

var socket = null;
var routes = require('./core/actions.js');
/**
  Возвращает веб-сокет (по идее должен его конфигурировать)
  @public
  @param {object} _ws_ - объект socket.io
  @return {object}
*/
module.exports = function(_ws_){
  socket = _ws_;
  console.log('GOVNO');
  routes.forEach(function(route){
    console.log(routes);
    route(socket);
  });
  return socket;
};
