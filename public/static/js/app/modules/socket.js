var socket = io();

module.exports = {
  socket : socket,

  init : function () {
    socket.on('ready', function(msg){
      console.log('Socker is ready!');
    });
  },

  streamOf : function (event){
    return Warden.Stream(function(fire){
      socket.on(event, fire);
    });
  },

  transmit : function (pipe, ctx) {
    socket.on('data', function(diff){
      pipe.call(ctx, diff);
    });
  }
};
