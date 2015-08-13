var testModule = require('./modules/test.js');

console.log(testModule.test);

var socketModule = require('./modules/socket.js');

socketModule.init();
