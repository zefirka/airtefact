

module.exports = {
  Execute : function(socket) {
  ActAll();
  DrawAll(socket);
},
  Elements :[]
}

function ActAll() {
  for(var e in module.exports.Elements) {
    e.DoAction();
  }
}
function DrawAll(socket) {
  var bag = []
  for(var e in module.exports.Elements){
    var obj = {posX : e.position.X, posY : e.position.Y};
    bag.push(obj);
  }
  console.log(bag);
  socket.emit('drawElements',bag);
}
