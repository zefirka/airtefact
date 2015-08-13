var extend = require('warden.js').Utils.extend;
var config = require('./config/config.js');

module.exports = function(name, req){
  try{
    var data = require('./controllers/' + name);
  }catch(error){
    console.trace();
    throw error;
  }finally{
    return extend({}, config, data, req);
  }
}
