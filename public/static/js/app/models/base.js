var utils = require('../../../../../common/utils.js');

function Base(){

}

Base.prototype.registerAttacher = function (fn) {
  this.attacher = fn;
};

Base.prototype.attach = function attach(ctx) {
  this.ctx = ctx;
};

module.exports = Base;
