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

Base.prototype.attach = function attach(ctx) {
  this.ctx = ctx;
  ctx.addObject(this);
  this.emit('attach');
  return this;
};

module.exports = Warden(Base);
