function Base(id){
  if (id) {
    this.id = id;
  }
}

Base.prototype.remove = function (fn) {
  this.ctx = null;
  ctx.removeObject(this);
  this.emit('remove');
};

Base.prototype.getBase = function(){
  var res = {};
  for(var propName in this){
    if(this.isRequiredProperty(propName)){
      res[propName] = this[propName];
    }
  }
  return res;
};

Base.prototype.isRequiredProperty = function(prop){
  /* Поля, которые потом будут вырезаться, т.к. не нужны на бекенде */
  var internalFields = [
    'instance', 'src'
  ];
  return this.hasOwnProperty(prop) && !~internalFields.indexOf(prop);
};

Base.prototype.update = function(elem){
  for(var propName in elem){
    if(this.hasOwnProperty(propName)){
      this[propName] = elem[propName];
    }
  }
};

Base.prototype.redraw = function(elem){
  this.instance.remove();
  this.draw();
};

Base.prototype.attach = function attach(ctx) {
  this.ctx = ctx;
  ctx.addObject(this);
  this.emit('attach');
  return this;
};

module.exports = Warden(Base);
