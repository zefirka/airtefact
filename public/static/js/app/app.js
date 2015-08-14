var models = require('./models/models'),
    socket = require('./modules/socket'),
    Canvas = require('./modules/canvas');

/* Первоначальная инициализация */
socket.init();
paper.install(window);

$(function() {

  var canvas = new Canvas(document.getElementById('play'));

  var testShape = new models.Circle(40, 40, 15);
  testShape.attach(canvas).draw();

  var osama = new models.Raster('Usama', {
    src :'static/img/bin.png',
    x : 200,
    y : 150
  });

  osama.attach(canvas).draw();

  socket.transmit(function(diff) {
    canvas.put(diff);
  });

});
