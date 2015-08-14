var models = require('./models/models'),
    socket = require('./modules/socket'),
    Canvas = require('./modules/canvas');

/* Первоначальная инициализация */
socket.init();
paper.install(window);

$(function() {

  var canvas = new Canvas(document.getElementById('play'));


  socket.streamOf('drawElements').listen(createOsama);

  function createOsama(x, y){
    var osama = new models.Raster('Usama', {
      src :'static/img/bin.png',
      x : Math.random() * canvas.node.width >> 0 ,
      y : Math.random() * canvas.node.height >> 0
    });

    osama.attach(canvas).draw();
  }

  $('#summoner').click(function() {
    console.log('emitted');
    socket.emit('create', 'empty');
  });

});
