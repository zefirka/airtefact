var fs = require('fs');
var phases = require('./phases.js');
module.exports = {
  Execute : function(socket) {
  LetsParseWhatYouWritten();
  ActAll();
  //  Nazmozg(); //not yet implemented
  DrawAll(socket);
},
  Elements :[]
};

function LetsParseWhatYouWritten() {
  var files = fs.readdirSync('node/actionFiles');
  files.forEach(function(item,i) {
    var tmpFile = require('../actionFiles/' + item);
    //phases.Phases.concat(tmpFile());
    var res = tmpFile();
    res.forEach(function(item, i) {
      phases.Phases.push(item);
    });
    fs.unlinkSync('node/actionFiles/' + item  );
  });
}

function ActAll() {
  module.exports.Elements.forEach(function(elem, i) {
    elem.ConsiderAlgorithm();
    elem.DoAction();
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
