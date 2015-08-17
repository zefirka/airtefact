

module.exports = {
  Execute : function(socket) {
  ActAll();
  //  Nazmozg(); //not yet implemented
  DrawAll(socket);
},
  Elements :[]
};

function ActAll() {
  module.exports.Elements.forEach(function(elem, i) {
    elem.DoAction();
    elem.Rules.forEach(function(rule,i) {
      rule.call(elem);
    });
  });
}
function DrawAll(socket) {
  var bag = [];
  for(var i = 0; i < module.exports.Elements.length; i++){
    var el =   module.exports.Elements[i];
    var obj = {X : el.position.X, Y : el.position.Y};
    bag.push(obj);
  }
  socket.emit('drawElements',bag);
}
