import React from 'react';
import Container from '../../../app/components/container';

//var models = require('./models/models'),
//    socket = require('./modules/socket'),
//    Canvas = require('./modules/canvas'),
//    UI     = require('./ui/app.jsx');

// socket.init();
paper.install(window);

React.render(<Container />, document.querySelector('.g-content'));

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
