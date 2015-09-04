var Core = require('./core');

/* Список экшнов сокета */

/**
  Список событий сокета, организует порядок работы в с веб-сокетом разных клиентов.
  Все коллбэки получают последним аргументом объект сокет-сервера
  @module Core/Actions
*/
var Actions = {};

/**
  Конфигурирует игру для текущего клиента (добавляет объекты или создает сессию, если объектов нет)
  @access public
  @param {object} data
*/
Actions.play = function(data, socket){
  Core.play(data).onSnapshot(function(pkg){
    socket.emit('tick', pkg);
  });
};

/**
  Сообщеает о том, что клиент ушел в оффлайн
  @access public
  @param {object} data
*/
Actions.away = function(data, socket){
  var time  = data.timestamp,
      uid   = data.uid;
};

module.exports = Actions;
