var socket = require('./modules/socket.js');
var drawer = require('./modules/canvas.js');

socket = io();

$(function(){
  var $canvas = $('#game');
  drawer.init($canvas);

  socket.on('appendInterface', function() {
    var list = $('.b-players');
    var length = list.children().length;
    var id = "element" + length;
    list.append(' <li class="b-player ' +id +'"><span>' + length +
    ': </span><i class="glyphicon glyphicon-arrow-left ' +
    id +'"/><i class="glyphicon glyphicon-arrow-right ' +
    id +'"/></li>');
    $('.glyphicon-arrow-left.' + id).click(function() {
      socket.emit('MoveLeft', {ID : length});
      $('.b-player.' + id).append('MoveLeft ');
    });
    $('.glyphicon-arrow-right.' + id).click(function() {
      socket.emit('MoveRight', {ID : length});
      $('.b-player.' + id).append('MoveRight ');
    });
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
    socket.emit('play','empty');
  });


});
