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
      radius :10
    });

    canvas.assign(el).draw(el);

    // по клику ничего не передаю
    // var elements = canvas.objects.map(function(o){
    //   return o.getBase();
    // });

    // var data = {
    //   elements : elements,
    // };
    // socket.emit('addElement', data);
  });

  $('#refresh').click(function() {
    socket.emit('clear');
    canvas.objects = [];
    id = 0;
    paper.project.activeLayer.removeChildren();
  });

  $('#go').click(function() {
    var code = codeMirror.doc.getValue();
    var elements = canvas.objects.map(function(o){
      return o.getBase();
    });
    var data = {
      code : code,
      time : new Date().getTime(),
      instance : instanceId++,
      elements : elements,
      uid : 'my-unique-id'
    };

    socket.emit('add', data);
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

  var canvas = new Canvas(document.getElementById('play'));
  var $cnv  = $(canvas.node);
  var data = {
    width : $cnv.width(),
    height : $cnv.height(),
  };

  socket.emit('status', {
    type : 'start',
    data : data
  });

});
