var socket = null;

module.exports = function(_ws_){
  console.log('socket');
  socket = _ws_;

  setTimeout(function(){
    socket.emit('ready');
  }, 1000);
};
