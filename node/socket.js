/**
  Модуль выолняющий логику компоновки событий сокета.
  Все передачи данных и формирование событий должны происходить
  в этом модуле.
  @module node/socket
*/

var forIn = require('../common/utils').forIn;
var actions = require('./core/actions');
/**
  Возвращает веб-сокет (по идее должен его конфигурировать)
  @public
  @param {object} sockets - объект socket.io
  @return {object}
*/
module.exports = function(sockets){
  sockets.on('connection', function(socket){
    forIn(actions, function(callback, action){
      socket.on(action, function(data){
        callback(data, socket);
      });
    });

    socket.emit('status', 'ready');
  });

  return sockets;
};
