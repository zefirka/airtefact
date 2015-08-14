var socket = require('./modules/socket.js');
var Canvas = require('./modules/canvas.js');

socket.init();

$(function(){

  Canvas.init(document.getElementById('game'));


  socket.transmit(function (diff){
    Canvas.put(diff);
  });

});
