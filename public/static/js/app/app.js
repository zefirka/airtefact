var socket = require('./modules/socket.js');
var drawer = require('./modules/canvas.js');

var socket = io();

$(function(){

  socket.on('drawElements', function(res) {
    console.log(res);
  })
  $('#summoner').click(function() {
    console.log('emitted');
    socket.emit('create', 'empty')
  }
)
})
