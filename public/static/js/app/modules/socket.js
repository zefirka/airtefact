var socket = io.connect('http://127.0.0.1:7778/compiler');
module.exports = {
  init : function () {
    socket.on('ready', function(msg){
      console.log('Socker is ready!');
    });
  },
  transmit : function (pipe, ctx) {
    socket.on('data', function(diff){
      pipe.call(ctx, diff);
    });
  },
  on : function(){
    socket.on.apply(socket, arguments);
  },
  emit : function(){
    socket.emit.apply(socket, arguments);
  }
};
