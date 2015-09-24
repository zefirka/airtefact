var expect = require('must');
var socketModule = require('../socket');
var EventEmitter = require('events');

describe('Module: node/socket'.bold.underline, function () {
  var socket = new EventEmitter(),
      io     = new EventEmitter();

  it('should emit connection  exist', function (done) {
    io.on('status', function(data){
      expect(data).to.be('ready');
      done();
    });
    socketModule(socket);
    socket.emit('connection', io);
  });
});
