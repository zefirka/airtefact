var socket = io();

module.exports = {
  init : function () {
    socket.on('getElement', function(msg){
      debugger
      $('.g-content').append(msg);
    });
  }
}
