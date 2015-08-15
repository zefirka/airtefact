

module.exports = {
  Execute : function(socket) {
  ActAll();
  DrawAll(socket);
},
  Elements :[]
};

function ActAll() {
  for(var i = 0; i < module.exports.Elements.length; i++) {
    module.exports.Elements[i].DoAction();
  }
}
function DrawAll(socket) {
  var bag = [];
  for(var i = 0; i < module.exports.Elements.length; i++){
    var el =   module.exports.Elements[i];
    var obj = {posX : el.position.X, posY : el.position.Y};
    bag.push(obj);
  }
  socket.emit('drawElements',bag);
}
