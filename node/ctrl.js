/**
  Модуль реализующий выбор нужного контроллера для страницы
  @module node/ctrl
  @memberof Node
*/

var extend = require('warden.js').Utils.extend;
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
    console.log('Controller: ' +  name +  ' not found!');
    console.trace();
  }finally{
    console.log(ctrlData);
    return extend(data, ctrlData);
  }

}

module.exports = resolveControllerByName;
