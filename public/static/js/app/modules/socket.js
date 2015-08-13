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
