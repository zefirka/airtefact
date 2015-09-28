function Break(){}

function execPipeline(pipeline, end, value){
  if(value instanceof(Break)){
    return;
  }

  if(pipeline.length){
    return pipeline[0].call(this, value, function(transform){
      return execPipeline.call(this, pipeline.slice(1), end, transform);
    }, function(){
      return new Break();
    });
  }else{
    return end(value);
  }
}

function inherit(from){
  var n = new Cell();
  n.__pipeline = from.__pipeline.slice();
  return n;
}

function Cell(value){
  this.__handlers = [];
  this.__pipeline = [];
  this.__prev = null;

  if(typeof value !== 'undefined'){
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

Cell.prototype.valueOf = function(){
  return this.__value;
};

Cell.prototype.emit = function(value){
  execPipeline(this.__pipeline, function(result){
    this.__value = result;
    this.changed = true;
    this.__handlers.forEach(function(handler){
      handler.call(this, this.__value);
    }.bind(this));
  }.bind(this), value);
};

Cell.prototype.on = function(callback){
  this.__handlers.push(callback);
};

Cell.prototype.filter = function(fn){
  var ncell = inherit(this);
  ncell.pipe(function(value, next, stop){
    return fn(value) === true ? next(value) : stop();
  });
  ncell.value = this.value;
  return ncell;
};

Cell.prototype.map = function(fn){
  var ncell = inherit(this);
  ncell.pipe(function(value, next){
    return next(fn(value));
  });
  ncell.value = this.value;
  return ncell;
};

Cell.prototype.reduce = function(fn, init){
  var ncell = inherit(this);
  ncell.pipe(function(value, next){
    return next(fn(ncell.__prev || init, value));
  });
  ncell.value = this.value;
  return ncell;
};

Cell.prototype.debounce = function(timeout){
  var ncell = inherit(this);
  var timer = null;

  ncell.pipe(function(value, next){
    if(timer){
      clearTimeout(timer);
    }

    timer = setTimeout(function(){
      next(value);
    }, timeout);
  });
  ncell.value = this.value;
  return ncell;
};

Cell.prototype.pipe = function(fn){
  this.__pipeline.push(fn);
};

function cell (cellar, def) {
  if(typeof cellar === 'function'){
    def = new Cell(def);
    cellar(function(value){
      def.value = value;
    });
    return def;
  }else{
    return new Cell(cellar);
  }
}

function formula(deps, func, init ){
  var cell = new Cell(init);

  cell.__value = init;

  deps.forEach(function(dep){
    dep.on(function(){
      cell.value = func.apply(null, deps.map(function(d){
        return d.value;
      }));
    });
  });

  return cell;
}

module.exports = {
  cell : cell,
  formula : formula
};
