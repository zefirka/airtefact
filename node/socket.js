/**
  Модуль выолняющий логику компоновки событий сокета.
  Все передачи данных и формирование событий должны происходить
  в этом модуле.
  @module socket
*/

var socket = null;

module.exports = function(_ws_){
  socket = _ws_;
};
