var socket = require('./modules/socket.js');
var drawer = require('./modules/canvas.js');

socket = io();

$(function(){
  var $canvas = $('#game');
  drawer.init($canvas);

  socket.on('appendInterface', function() {
    var list = $('.b-players');
    var id = list.children().length + 1;
    $('ul.b-players').append('<li class="b-player">' +id +'</li>');
  });
  socket.on('drawElements', function(bag) {
    //console.log(bag);
    var c = $('#play')[0];
    var ctx  = c.getContext('2d');
    $('.actionList').text('');
    ctx.clearRect(0, 0, c.width, c.height);
    for(var i = 0; i < bag.length; i++) {
      ctx.fillRect(bag[i].posX, bag[i].posY, 20,20);
    }
  });
  $('#summoner').click(function() {
    socket.emit('create','empty');
  });
  $('#Go').click(function() {
    socket.emit('play',$('.commandLine').val());
  });


});
