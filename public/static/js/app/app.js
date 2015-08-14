var models = require('./models/models'),
    socket = require('./modules/socket'),
    Canvas = require('./modules/canvas');

socket.init();

$(function(){

  var canvas = new Canvas(document.getElementById('play'));

  var testShape = new models.Circle(40, 40, 15);
  testShape.attach(canvas).draw();


  socket.transmit(function (diff){
    canvas.put(diff);
  });

});
