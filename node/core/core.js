var Element   = require('../models/element.js'),
    Executer  = require('../models/executer.js');

var ACTIONS = {
  'move-left' : {
    name : 'move',
    params :  { dx : -5, dy : 0 }
  },
  'move-rigth' : {
    name : 'move',
    params :  { dx : 5, dy : 0 }
  },
  'move-down' : {
    name : 'move',
    params :  { dx : 0, dy : 5 }
  },
  'move-up' : {
    name : 'move',
    params : { dx : 0, dy : -5 }
  }
};

var RULES = {
  FollowCursor : {Rule : 'followCursor'},
  FollowObject : {Rule : 'followObject'}
};


var Elements = {};
var Core;

function createElement(props){
  var element = new Element(props);
  Elements[props.id] = element;
}

function fix(){
  Core = new Executer(Elements);
  console.log(Core);
}

function update(socket){
  console.log('UPDATE');
  var snapshot = Core.exec().getPackage();
  socket.emit('tick', snapshot);
}

function setCommand(props){
  var el = Elements[props.id];
  var action = ACTIONS[props.name];
  el.addAction(action.name, action.params);
  return el;
}

module.exports = {
  createElement : createElement,
  setCommand : setCommand,
  update : update,
  fix : fix
};
