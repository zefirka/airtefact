var socket = require('./modules/socket.js');
var drawer = require('./modules/canvas.js');

socket = io();

$(function(){
  var $canvas = $('#game');
  drawer.init($canvas);

  socket.on('drawElements', function(bag) {
    //console.log(bag);
    var c = $('#play')[0];
    var ctx  = c.getContext('2d');
    for(var i = 0; i < bag.length; i++) {
      ctx.fillRect(bag[i].posX, bag[i].posY, 20,20);
    }
  });
  $('#summoner').click(function() {
    socket.emit('create','empty');
  });


});
