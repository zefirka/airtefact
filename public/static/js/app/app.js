var models = require('./models/models'),
    socket = require('./modules/socket'),
    Canvas = require('./modules/canvas');

/* Первоначальная инициализация */
socket.init();
paper.install(window);

$(function() {
  var canvas = new Canvas(document.getElementById('play'));

  socket.on('appendInterface', function() {
    var list = $('.b-players');
    var id = list.children().length + 1;
    $('ul.b-players').append('<li class="b-player">' +id +'</li>');
  });

  socket.on('drawElements', function(bag) {
    //console.log(bag);
    $('.actionList').text('');

    /* здесь можно все определить в классе Canvas (../modules/canvas.js) */
    canvas.ctx.clearRect(0, 0, c.width, c.height);
    for(var i = 0; i < bag.length; i++) {
      canvas.ctx.fillRect(bag[i].posX, bag[i].posY, 20,20);
    }
  });

  $('#summoner').click(function() {
    socket.emit('create','empty');
  });

  $('#Go').click(function() {
    socket.emit('play',$('.commandLine').val());
  });

  /* Вот так я работаю с моделями на фронтенде */
  // var testShape = new models.Circle(40, 40, 15);
  // testShape.attach(canvas).draw();
  //
  // var osama = new models.Raster('Usama', {
  //   src :'static/img/bin.png',
  //   x : 200,
  //   y : 150
  // });
  //
  // osama.attach(canvas).draw();

});
