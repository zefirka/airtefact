var models = require('./models/models'),
    socket = require('./modules/socket'),
    Canvas = require('./modules/canvas'),
    utils  = require('../../../../common/utils.js');

/* Первоначальная инициализация */
socket.init();
paper.install(window);

$(function() {

  var id         = 0,
      instanceId = 0;

  $('#PlayGround').click(function() {
    $('#PlayPane').css('display', 'block');
    $('#Code').css('display', 'none');
  });

  $('#Console').click(function() {
    $('#PlayPane').css('display', 'none');
    $('#Code').css('display', 'block');
  });

  var canvas = new Canvas(document.getElementById('play'));


  socket.on('tick', function(pkg) {
    /* здесь можно все определить в классе Canvas (../modules/canvas.js) */
    canvas.clear();

    utils.forIn(pkg, function(elem){
      canvas.getElementById(elem.id).update(elem);
    });

    //canvas.redraw();
  });

  $('#summoner').click(function() {
    var el = new models.Raster(id++, {
      src : 'static/img/bin.png',
      x : 20 + (Math.random() * 100 >> 0),
      y : 20 + (Math.random() * 100 >> 0)
    });

    canvas.assign(el).draw(el);
  });

  $('#go').click(function() {

    var code = $('.commandLine').val();
    var elements = canvas.objects.map(function(o){
      return o.getBase();
    });

    var data = {
      code : code,
      width : canvas.node.width,
      height : canvas.node.height,
      elements : elements,
      time : new Date().getTime(),
      instance : instanceId++,
      uid : 'my-unique-id'
    };

    console.log('Sending elements: ', data);
    socket.emit('play', data);

  });

  // socket.on('compile:ready', function(filename){
  //   alert(filename);
  // });
  //
  // $('#SendCode').click(function() {
  //   socket.emit('save');
  // });

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
