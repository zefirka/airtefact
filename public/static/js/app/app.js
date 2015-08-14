var socket = require('./modules/socket.js');
var Canvas = require('./modules/canvas.js');

socket.init();

$(function(){

  var canvas = new Canvas(document.getElementById('play'));

  canvas.draw();

  socket.transmit(function (diff){
    canvas.put(diff);
  });

});
