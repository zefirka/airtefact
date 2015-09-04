var fs            = require('fs');
var beautify      = require('js-beautify').js_beautify;

var config        = require('../config/config'),
    s2Compiler    = require('../dvastula/compiler'),
    Core          = require('./core');



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

/**
 Сохраняет скомпилированный код
 @access public
 @param {string} code
 @param {object} socket
 */
Actions.save = function(code, socket){
  var js = s2Compiler(code);
  js = beautify(js);
  var timestamp = new Date().getTime().toString().slice(3),
      filename = config.files + '/myId.' + timestamp;

  console.log('writing file ', filename);
  fs.writeFile(filename + '.js', js, function(err, data){
    if(err){
      throw 'Fuck me plz';
    }

    socket.emit('compile:ready', filename);

  });
};

module.exports = Actions;
