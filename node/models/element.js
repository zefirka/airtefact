var R       = require('ramda'),
    Warden  = require('warden.js'),
    utils   = Warden.utils,
    Scope   = require('./scope.js');

function getRandomArbitary(min, max){
  return Math.random() * (max - min) + min;
}

function dist(a,b) {
  return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

function len(vector) {
  return (Math.sqrt(vector.dx * vector.dx + vector.dy * vector.dy));
}

function idle(){}


var Pkg = {
  mousePos : {x :0, y :0}
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

/**
  @constructor
  @param {object} o
  @param {object} glob
*/
function Element(o, glob){
  this.position = {
    x : o.x || 0,
    y : o.y || 0
  };

  this.x = o.x || 0;
  this.y = o.y || 0;
  this.id = o.id || 0;

  this.action  = 0;
  this.actions = [];
  this.itemsInMind = {};
  this.speed = 2;
  this.phase = null;
  this.game = glob;

  this.scope = new Scope({
    x : this.x,
    y : this.y,
    phase : Warden(0).watch(),
    game : glob
  });

  this.scope.store.phase.listen(function(phase){
    this.phase = this.scope.resolve(phase);
  }.bind(this));
}

/**

*/
Element.prototype.considerAlgorithm = function () {
  if (this.phase === 0) {
    this.addAction(idle);
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

/**
  Выполняет алгоритм изменения для конкретного элемента
  @public
*/
Element.prototype.invoke = function () {
  // if (this.actions.length) {
  //   this.addAction(idle);
  // }

  /* waterfall async */
  var self = this;
  //var action = this.actions[0];//.shift();
  this.actions.forEach(function(action){
    self[action.action].call(self, action.params);
  });
  return this;
};

Element.prototype.abortActive = function() {
  this.action.act = idle;
};

Element.prototype.setAction = function(act, params) {
  this.action.act = act;
  this.action.params = params;
};

Element.prototype.addAction = function(action, params) {
  this.actions.push({
    action : action,
    params : params
  });
};

Element.prototype.getElementsById = function(id) {
  return R.filter(R.eqProps(id, 'id'), this.elements);
};

Element.prototype.updateInfo = function(infoCollection) {
  infoCollection.forEach(R.partial(utils.extend(Pkg)));
};

/**
  Перемещает объект по вектору
  @public
  @param {object} vector
  @param {number} vector[dx]
  @param {number} vector[dy]
  @return {object} instance
*/
Element.prototype.move = function(vector) {
  var x = vector.dx / len(vector) * this.speed;
  var y = vector.dy / len(vector) * this.speed;
  this.x += x;
  this.y += y;
  return this;
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

Element.prototype.getScope = function(){
  return this.scope;
};

module.exports = Element;
