(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var testModule = require('./modules/test.js');

console.log(testModule.test);


$(function(){
  var socketModule = require('./modules/socket.js');

  socketModule.init();
})

},{"./modules/socket.js":2,"./modules/test.js":3}],2:[function(require,module,exports){
var socket = io();

var $field = $('.field');

function addToField(){
  var $rows = $field.find('.row');
  var $cells = $rows.last().find('.cell');

  if($cells.length < 10 ){
    $rows.last().append('<div class="cell">x</div>');
  }else{
    $rows.last().after('<div class="row"><div class="cell">x</div></div>');
  }
}

module.exports = {
  init : function () {
    socket.on('hello', function(msg){
      addToField();
    });

    setInterval(function(){
      socket.emit('test', 1);
    }, 1000);
  }
}

},{}],3:[function(require,module,exports){
module.exports = {
  test: 'Hello world!'
}

},{}]},{},[1])