var extend = require('warden.js').Utils.extend;
var config = require('./config/config.js');

/* Принимает название кейсета и объект HTTP-запроса и возвращает данные контроллера */
function resolveControllerByName(name, req){

  /* Данные по-умолчанию */
  var data = extend({}, config, {url : req.url}),
      ctrlData = {};

  try{
    ctrlData = require('./controllers/' + name);
  }catch(error){
    console.log('Controller: ' +  name +  ' not found!');
    console.trace();
  }finally{
    console.log(ctrlData);
    return extend(data, ctrlData);
  }

}

module.exports = resolveControllerByName;
