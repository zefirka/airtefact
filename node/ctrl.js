/**
  Модуль реализующий выбор нужного контроллера для страницы
  @module node/ctrl
  @memberof Node
*/

var extend = require('../common/utils').extend;
var config = require('./config/config.js');

/**
  Принимает название кейсета и объект HTTP-запроса и возвращает данные контроллера
  По-умолчанию возвращает данные из файла config и url запроса.
  @public
  @param {string} name Кейсет
  @param {object} req Объект HTTP-запроса
  @return {object}
*/

function resolveControllerByName(name, req){
  /* Данные по-умолчанию */
  var data = extend({}, config, {url : req.url}),
      ctrlData = {};

  try{
    var ctrl  = __dirname + '/controllers/' + name;
    ctrlData = require(ctrl);
  }catch(error){
    console.log(error);
    console.error('Controller: ' + ctrl + ' not found.');
    ctrlData = require('./controllers/error404');
  }finally{
    return extend(data, ctrlData);
  }

}

module.exports = resolveControllerByName;
