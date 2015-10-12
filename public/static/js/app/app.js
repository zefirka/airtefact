'use strict';

import React from 'react';
import Container from '../../../app/components/container';

paper.install(window);

/* jshint ignore:start */
React.render(<Container />, document.querySelector('.g-content'));
/* jshint ignore:end */


// var models = require('./models/models'),
//     socket = require('./modules/socket'),
//     Canvas = require('./modules/canvas'),
//     utils  = require('../../../../common/utils.js'),
//     User   = require('./modules/user');

// /* Первоначальная инициализация */
// socket.init();
// User.init();
// paper.install(window);

// $(function() {

//   var id         = 0,
//       instanceId = 0;

//   socket.on('tick', function(pkg) {
//     /* здесь можно все определить в классе Canvas (../modules/canvas.js) */
//     canvas.clear();
//     utils.forIn(pkg, function(elem){
//       canvas.getElementById(elem.id).update(elem);
//     });

//     if (window.ENV === 'debug') {
//       socket.emit('ready', true);
//     }
//   });

//   $('#summoner').click(function() {
//     var el = new models.Circle(id++, {
//       x : 20 + (Math.random() * 120 >> 0),
//       y : 20 + (Math.random() * 120 >> 0),
//       radius :10
//     });

//     canvas.assign(el).draw(el);
//   });

//   $('#refresh').click(function() {
//     socket.emit('clear');
//     canvas.objects = [];
//     id = 0;
//     paper.project.activeLayer.removeChildren();
//   });

//   $('#go').click(function() {
//     var code = codeMirror.doc.getValue();
//     var elements = canvas.objects.map(function(o){
//       return o.getBase();
//     });
//     var data = {
//       code : code,
//       time : new Date().getTime(),
//       instance : instanceId++,
//       elements : elements,
//       uid : 'my-unique-id'
//     };

//     socket.emit('add', data);
//   });

//   var codeMirror = CodeMirror.fromTextArea(document.getElementById('code'), {
//     lineNumbers : true,
//     theme : 'monokai',
//     mode : 'ss2',
//     styleActiveLine : true,
//     matchBrackets : true,
//     autoCloseBrackets : true
//   });

//   $('#SendVal').click(function() {
//     var code = $('#input').val();
//     socket.emit('save', code);
//   });

//   var canvas = new Canvas(document.getElementById('play'));
//   var $cnv  = $(canvas.node);
//   var data = {
//     width : $cnv.width(),
//     height : $cnv.height(),
//     user : {
//       id : 0
//     }
//   };

//   socket.emit('status', {
//     type : 'start',
//     data : data
//   });
//   socket.emit('connect', data);

// });
// =======



//var models = require('./models/models'),
//    socket = require('./modules/socket'),
//    Canvas = require('./modules/canvas'),
//    UI     = require('./ui/app.jsx');

// socket.init();
/* Первоначальная инициализация */
//$(function() {
//  React.render(React.createElement(UI), document.getElementById('appjs'));
  //
  //
  // var canvas = new Canvas(document.getElementById('play'));
  // var mousePos;
  // canvas.node.addEventListener('mousemove', function(evt) {
  //   mousePos = getMousePos(canvas, evt);
  //   InfoBag.MousePos = mousePos;
  // }, false);
  // function getMousePos(canvas, evt) {
  //         var rect = canvas.node.getBoundingClientRect();
  //         return {
  //           X : evt.clientX - rect.left,
  //           Y : evt.clientY - rect.top
  //         };
  //       }
  // socket.on('appendInterface', function() {
  //   var list = $('.b-players');
  //   var id = list.children().length + 1;
  //   $('ul.b-players').append('<li class="b-player">' +id +'</li>');
  // });
  //
  // socket.on('drawElements', function(bag) {
  //   //console.log(bag);
  //   $('.actionList').text('');
  //
  //   /* здесь можно все определить в классе Canvas (../modules/canvas.js) */
  //   canvas.ctx.clearRect(0, 0, canvas.node.width, canvas.node.height);
  //   for(var i = 0; i < bag.length; i++) {
  //     var fig = bag[i];
  //     canvas.ctx.fillRect(bag[i].X, bag[i].Y, 20,20);
  //   }
  // });
  //
  // $('#summoner').click(function() {
  //   socket.emit('create','empty');
  // });
  //
  // $('#Go').click(function() {
  //   socket.emit('play',$('.commandLine').val());
  //
  // });
  // setInterval(function() {
  //   socket.emit('ping', InfoBag);
  // }, 500);
//});
// =======
// var models = require('./models/models'),
//     socket = require('./modules/socket'),
//     Canvas = require('./modules/canvas'),
//     utils  = require('../../../../common/utils.js');

// /* Первоначальная инициализация */
// socket.init();
// paper.install(window);

// $(function() {

//   var id         = 0,
//       instanceId = 0;

//   socket.on('tick', function(pkg) {
//     /* здесь можно все определить в классе Canvas (../modules/canvas.js) */
//     canvas.clear();
//     utils.forIn(pkg, function(elem){
//       canvas.getElementById(elem.id).update(elem);
//     });

//     if (window.ENV == 'debug') {
//       socket.emit('ready', true);
//     }
//   });

//   $('#summoner').click(function() {
//     var el = new models.Circle(id++, {
//       x : 20 + (Math.random() * 120 >> 0),
//       y : 20 + (Math.random() * 120 >> 0),
//       radius :10
//     });

//     canvas.assign(el).draw(el);
//   });

//   $('#refresh').click(function() {
//     socket.emit('clear');
//     canvas.objects = [];
//     id = 0;
//     paper.project.activeLayer.removeChildren();
//   });

//   $('#go').click(function() {
//     var code = codeMirror.doc.getValue();
//     var elements = canvas.objects.map(function(o){
//       return o.getBase();
//     });
//     var data = {
//       code : code,
//       time : new Date().getTime(),
//       instance : instanceId++,
//       elements : elements,
//       uid : 'my-unique-id'
//     };

//     socket.emit('add', data);
//   });

//   var codeMirror = CodeMirror.fromTextArea(document.getElementById('code'), {
//     lineNumbers : true,
//     theme : 'monokai',
//     mode : 'ss2',
//     styleActiveLine : true,
//     matchBrackets : true,
//     autoCloseBrackets : true
//   });

//   $('#SendVal').click(function() {
//     var code = $('#input').val();
//     socket.emit('save', code);
//   });

//   var canvas = new Canvas(document.getElementById('play'));
//   var $cnv  = $(canvas.node);
//   var data = {
//     width : $cnv.width(),
//     height : $cnv.height(),
//     user : {
//       id : 0
//     }
//   };

//   socket.emit('status', {
//     type : 'start',
//     data : data
//   });
//   socket.emit('connect', data);

// });
