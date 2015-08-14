var socket = require('./modules/socket.js');
var drawer = require('./modules/canvas.js');

socket.init();

$(function(){
  var $canvas = $('#game');
  drawer.init($canvas);


  socket.transmit(function (diff){
    drawer.put(diff);
  });

});
