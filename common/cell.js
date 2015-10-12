'use strict';

require('babel/register');

var Iterable = require('immutable').Iterable;
var extend = require('./utils').extend;

function Break(){
  return null;
}

function execPipeline(pipeline, end, value){
  if(value instanceof(Break)){
    return;
  }

  if(pipeline && pipeline.size){
    /*jshint validthis:true */
    return pipeline.get(0).call(this, value,
      (transform) => execPipeline.call(this, pipeline.slice(1), end, transform),
      () => new Break()
    );
    /*jshint validthis:false */
  }else{
    return end(value);
  }
}

function Cell(value){
  function bindValue(value, root){
    if(typeof value === 'object'){
      for(let prop in value){
        value[prop] = bindValue(value[prop], root, prop);
      }
    }else{
      /*Что-то очень странное */
      value = new Cell(value);
      value.on(() => {
        root.__handlers.forEach(handler =>handler.call(root, root.__value));
        root.emit(root.value);
      });
    }

    return value;
  }

  this.__handlers = [];
  this.__pipeline = new Iterable();
  this.__prev = null;
  this.__value = null;

  if(typeof value !== 'undefined'){

    if(typeof value === 'object'){
      value = bindValue(value, this);
    }

    this.__value  = value;
    this.value = value;
  }

  this.changed = false;
}

Object.defineProperty(Cell.prototype, 'value', {
  get : function(){
    this.changed = false;
    return this.__value;
  },
  set : function(value){
    this.__prev = this.__value;
    this.emit(value);
  }
});

extend(Cell.prototype, {

  emit (value) {
    execPipeline(this.__pipeline, function(result){
      this.__value = result;
      this.changed = true;
      this.__handlers.forEach(function(handler){
        handler.call(this, this.__value);
      }.bind(this));
    }.bind(this), value);
  },

  on (callback){
    this.__handlers.push(callback);
    return this;
  },

  inherit (fn){
    let n = new Cell();
    n.__pipeline = this.__pipeline.concat(fn.bind(n));
    n.value = this.value;
    return n;
  },

  log (){
    this.on(console.log.bind.apply(console.log, [console].concat([].slice.call(arguments))));
  },

  valueOf () {
    this.changed = false;
    return this.__value;
  },

  filter (fn){
    return this.inherit((value, next, stop) => fn(value) === true ? next(value) : stop());
  },

  map (fn) {
    return this.inherit((value, next) => next(fn(value)));
  },

  reduce (fn, init){
    return this.inherit((value, next) => next(fn(this.__prev || init, value)));
  },

  pipe (fn){
    this.__pipeline = this.__pipeline.concat(fn);
    return this;
  },

  merge (c){
    let n = new Cell();
    let set = x => n.value = x;
    this.on(set);
    c.on(set);
    return n;
  },

  sync (c){
    let synced = new Cell();
    let vals = [];
    this.on(x => {
      vals[0] = x;
      if(vals[1] !== undefined){
        synced.value = [vals[0], vals[1]];
      }
    });
    c.on(x => {
      vals[1] = x;
      if(vals[0] !== undefined){
        synced.value = [vals[0], vals[1]];
      }
    });
    return synced;
  },

  sample (c, fn){
    var nc = new Cell();
    var self = this;

    function sample(){
      nc.value = fn(self.__value, c.__value);
    }

    this.on(sample);
    c.on(sample);
    sample();
    return nc;
  },

  or (a){
    return this.sample(a, (x, y) => x || y);
  },

  and (a){
    return this.sample(a, (x, y) => x && y);
  },

  debounce (timeout){
    var timer = null;
    return this.inherit((value, next) => {
      timer = timer ? clearTimeout(timer) : setTimeout(() => next(value), timeout);
    });
  }
});

function cell (cellar, def) {
  if(typeof cellar === 'function'){
    def = new Cell(def);
    cellar(value => def.value = value);
    return def;
  }else{
    return new Cell(cellar);
  }
}

function formula(deps, func, init ){
  var cell = new Cell(init);

  cell.__value = init;

  deps.forEach((dep) => {
    dep.on(() => {
      cell.value = func.apply(null, deps.map(d => d.value));
    });
  });

  return cell;
}

module.exports = {
  cell : cell,
  formula : formula
};
