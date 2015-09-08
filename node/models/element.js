var R       = require('ramda'),
    Warden  = require('warden.js'),
    Scope   = require('./scope'),
    Base    = require('./base'),
    api     = require('../core/api'),
    utils   = Warden.Utils,
    extend  = utils.extend,
    math    = require('../utils/math');

/**
  @constructor
  @param {object} o
  @param {object} game
*/
function Element(o, game){
  this.x = o.x || 0;
  this.y = o.y || 0;
  this.id = o.id || 0;

  this.speed = 1;
  this.phases = [];
  this.phase = null;

  this.game = game;
  this.api = api;
  this.scope = new Scope();
}

extend(Element.prototype, new Base());
Element.prototype.constructor = Element;

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

  if(!this.scope.store.phase){
    return;
  }

  var store = this.scope.store;

  var phases =  store.phases.length ?
                store.phases :
                store.game.phases;

  var phaseName = store.phase;

  phases.filter(function(phase){
    return typeof phase[phaseName] == 'function';
  }).forEach(function(phase){
    phase[phaseName].call(this.scope);
  }.bind(this));

  return this;
};

Element.prototype.getElementsById = function(id) {
  return R.filter(R.eqProps(id, 'id'), this.elements);
};

Element.prototype.updateInfo = function(info) {
  info.forEach(R.partial(utils.extend(Pkg)));
};

/**
  Перемещает объект по вектору
  @public
  @param {object} vector
  @param {number} vector.dx
  @param {number} vector.dy
  @return {object} instance
*/
Element.prototype.move = function(vector) {
  var x = vector.dx / math.len(vector) * this.speed;
  var y = vector.dy / math.len(vector) * this.speed;

  this.x += x;
  this.y += y;
  return this;
};

Element.prototype.goto = function(pos) {
  this.move({
    x : pos.x - this.x,
    y : pos.y - this.y
  });

  return math.dist(pos, this.position()) > 10;
};

/**
 Возвращает {x, y} элемента
 @return {object} position
 @return {number} position.x
 @return {number} position.y
 */
Element.prototype.position = function(){
  return {
    x : this.x,
    y : this.y
  };
};

/**
 Действие преследования
 @param {object} elem - {x, y} координата
 @param {number} elem.x
 @param {number} elem.y
 @return {boolena}
 */
Element.prototype.follow = function(elem) {
  return this.goto({
    x : elem.x,
    y : elem.y
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


// Element.prototype.__base = Base.prototype

module.exports = Element;
