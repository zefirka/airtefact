/**
  Список событий сокета, организует порядок работы в с веб-сокетом разных клиентов.
  Все коллбэки получают последним аргументом объект сокет-сервера
  @namespace {object} Actions
  @mamberof node
*/
var Actions = {};

var fs            = require('fs');
var beautify      = require('js-beautify').js_beautify;

var config        = require('../config/config'),
    s2Compiler    = require('../dvastula/compiler'),
    Core          = require('./core');

/**
  * Конфигурирует игру для текущего клиента (добавляет объекты или создает сессию, если объектов нет)
  * @public
  * @param {object} status
  * @param {string} status.type
  * @param {object} status.data
  * @return {undefined}
*/
Actions.status = function (status, socket){
  if(status.type == 'ready'){
    return 'ready';
  }

  if(status.type == 'error'){
    return 'error';
  }

  if(status.type == 'start'){
    Core.start(status.data)
        .onSnapshot(function(pkg){
          if(config.env == 'debug') {
            Core.freeze();
          }
          socket.emit('tick', pkg);
        });
  }
};

/**
 * События, когда пользователь подключается к сессии
 * @param {object} data
 * @param {object} data.user
 */
Actions.connect = function(data, socket){
  Core.connect(data);
};

/**
 * Добавляет новые данные в инстанс игры
 * @param {object} data
 * @param {object} data.elements
 */
Actions.add = function (data, socket){
  Core
    .freeze()
    .add(data)
    .unfreeze();
};

/**
 * Обновляет стейт игры полностью
 * @param {string} csrf
 */
Actions.refresh = function(csrf, socket) {
  if(Core.csrf(csrf)){
    Core.refresh();
  }else{
    socket.emit('status', {
      type : 'error',
      code : 300,
      message : 'You have no rights to refresh'
    });
  }
};

/**
 *
 */
Actions.clear = function(csrf, socket) {
  if(Core.csrf(csrf)){
    Core.clear();
  }else{
    socket.emit('status', {
      type : 'error',
      code : 301,
      message : 'You have no rights to clear'
    });
  }
};

/**
 * Дебажное событие, говорящее о том, что клиент обработал пакет и готов получить следущий
 */
Actions.ready = function(){
  Core.unfreeze();
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
