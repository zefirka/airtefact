var models = require('./models/models'),
    socket = require('./modules/socket'),
    Canvas = require('./modules/canvas');

/* Первоначальная инициализация */
socket.init();
paper.install(window);
var InfoBag = {};

$(function() {
  $('#PlayGround').click(function() {
    $('#PlayPane').css('display', 'block');
    $('#Code').css('display', 'none');
  });
  $('#Console').click(function() {
    $('#PlayPane').css('display', 'none');
    $('#Code').css('display', 'block');
  });

  var canvas = new Canvas(document.getElementById('play'));
  var mousePos;
  canvas.node.addEventListener('mousemove', function(evt) {
    mousePos = getMousePos(canvas, evt);
    InfoBag.MousePos = mousePos;
  }, false);
  function getMousePos(canvas, evt) {
          var rect = canvas.node.getBoundingClientRect();
          return {
            X : evt.clientX - rect.left,
            Y : evt.clientY - rect.top
          };
        }
  socket.on('appendInterface', function() {
    var list = $('.b-players');
    var id = list.children().length + 1;
    $('ul.b-players').append('<li class="b-player">' +id +'</li>');
  });

  socket.on('drawElements', function(bag) {
    //console.log(bag);
    $('.actionList').text('');

    /* здесь можно все определить в классе Canvas (../modules/canvas.js) */
    canvas.ctx.clearRect(0, 0, canvas.node.width, canvas.node.height);
    for(var i = 0; i < bag.length; i++) {
      var fig = bag[i];
      canvas.ctx.fillRect(bag[i].X, bag[i].Y, 20,20);
    }
  });

  $('#summoner').click(function() {
    socket.emit('create','empty');
  });

  $('#Go').click(function() {
    socket.emit('play',$('.commandLine').val());

  });
  $('#SendCode').click(function() {
    socket.emit('save');
  });
  setInterval(function() {
    socket.emit('ping', InfoBag);
  }, 500);

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
