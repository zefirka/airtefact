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

  (function(){
    var $pg = $('#PlayGround'),
        $console = $('#Console'),
        $pp = $('#PlayPane'),
        $code = $('#Code');

    function toggle(){
      $pp.toggle();
      $code.toggle();
    }

    $pg.click(toggle);
    $console.click(toggle);

  })();

  var canvas = new Canvas(document.getElementById('play'));
  var $cnv  = $(canvas.node);
  var data = {
    width : $cnv.width(),
    height : $cnv.height(),
    time : new Date().getTime(),
    instance : instanceId++,
    uid : 'my-unique-id'
  };

  socket.emit('play', data);

  socket.on('tick', function(pkg) {
    /* здесь можно все определить в классе Canvas (../modules/canvas.js) */
    canvas.clear();
    utils.forIn(pkg, function(elem){
      canvas.getElementById(elem.id).update(elem);
    });

    if (window.ENV == 'debug') {
      socket.emit('ready', true);
    }
  });

  $('#summoner').click(function() {
    var el = new models.Circle(id++, {
      x : 20 + (Math.random() * 100 >> 0),
      y : 20 + (Math.random() * 100 >> 0),
      radius:10
    });

    canvas.assign(el).draw(el);
    var elements = canvas.objects.map(function(o){
      return o.getBase();
    });
    var data = {
      elements : elements,
    };
    socket.emit('addElement', data);
  });
  $('#refresh').click(function() {
    socket.emit('clear');
  })
  $('#go').click(function() {
    var code = codeMirror.doc.getValue();

    var data = {
      code : code,
      width : $cnv.width(),
      height : $cnv.height(),
      time : new Date().getTime(),
      instance : instanceId++,
      uid : 'my-unique-id'
    };

    socket.emit('writeCode', data);
  });

  var codeMirror = CodeMirror.fromTextArea(document.getElementById('code'), {
    lineNumbers : true,
    theme : 'monokai',
    mode : 'ss2',
    styleActiveLine : true,
    matchBrackets : true,
    autoCloseBrackets : true
  });

  $('#SendVal').click(function() {
    var code = $('#input').val();
    socket.emit('save', code);
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
