var testModule = require('./modules/test.js');

console.log(testModule.test);


$(function(){
  var socketModule = require('./modules/socket.js');

  socketModule.init();
})
