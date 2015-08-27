var R     = require('ramda'),
    utils = require('warden.js').utils;

var logics = require('./executer.js');

function getRandomArbitary(min, max)
{
  return Math.random() * (max - min) + min;
}


function dist(a,b) {
  return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}
function len(vector) {
  return (Math.sqrt(vector.x * vector.x + vector.y * vector.y));
}
function Idle(){}


var Pkg = {
  mousePos : {X :0, Y :0}
};


var Phases = [
  {
    name : 'goToPhase',
    blocks : [
      {
        condition : function(params) {
          return this.speed !== undefined && dist(this, params[0]) >= 10;
        },
        action : 'moveToPosition',
        nextPhase : 'goToPhase'
      },
      {
        condition : function(params) {
          return this.speed !== undefined && dist(this, params[0]) < 10;
        },
        action : idle,
        nextPhase : 'testPhase'
      }],
    params : 0
  }
];

function Element(x, y){
  this.position = {
    x : x || 0,
    y : y || 0
  };

  this.id = logics.elements.length + 1;
  this.action  = 0;
  this.actions = [];
  this.phase = 0;
  this.itemsInMind = {};
  this.speed = 2;
}

Element.prototype.ConsiderAlgorithm = function () {
  if (this.phase === 0) {
    this.addAction(Idle);
  } else if (this.phase.blocks !== undefined) {
    this.phase.blocks.forEach(function(item, i) {
      if(item.condition()) {
        this.addAction(this[item.Action]);
        this.phase = Phases[item.nextPhase];
      }
    });
  }
};

Element.prototype.setPhase = function (name){
  this.phase = Phases[name];
};

Element.prototype.invoke = function () {
  if (this.actions.length === 0) {
    this.addAction(Idle);
  }
  this.action = this.actions[0];
  this.action.call(this);
  this.actions.shift();
};

Element.prototype.AbortActive = function() {
  this.action.act = idle;
};

Element.prototype.SetAction = function(act, params) {
  this.action.act = act;
  this.action.params = params;
};

Element.prototype.AddAction = function(Act) {
  this.actions.push(Act);
};


Element.prototype.getElementsById = function(id) {
  return R.filter(R.eqProps(id, 'id'), logics.elements);
};

Element.prototype.updateInfo = function(infoCollection) {
  infoCollection.forEach(R.partial(utils.extend(Pkg)));
};

Element.prototype.move = function(vector) {
  var x = vector.x /len(vector) * this.Speed;
  var y = vector.y /len(vector) * this.Speed;
  this.position.x += x;
  this.position.y += y;
};

Element.prototype.goto = function() {
  var pos = this.itemsInMind.position;

  this.move({
    x : pos.x - this.position.x,
    y : pos.y - this.position.y
  });

  if (dist(pos, this.position) > 10) {
    this.addAction(this.goto);
  }
};

Element.prototype.followCursor = function() {
  this.addAction(this.move, {
    x : Pkg.mousePos.x - this.position.x,
    y : Pkg.mousePos.y - this.position.y
  });
};

Element.prototype.moveToPosition = function() {
  var pos = this.itemsInMind.position;

  this.addAction(this.Move, {
    x : pos.x - this.position.x,
    y : pos.y - this.position.y
  });
};

Element.prototype.followObject = function() {
  var obj = this.itemsInMind.follow;

  this.addAction(this.Move, {
    x : obj.position.x - this.position.x,
    y : obj.position.y - this.position.y
  });
};

Element.prototype.moveRandomly = function() {
  this.itemsInMind.position = {
    x : getRandomArbitary(0, 300),
    y : getRandomArbitary(0,300)
  };

  this.addAction(this.goto);
};


module.exports = new Element();
