var Scope     = require('../models/scope'),
    S2        = require('../dvastula/compiler'),
    Element   = require('../models/element'),
    api       = require('./api'),
    config    = require('../config/config');

var fs    = require('fs'),
    R     = require('ramda'),
    join  = require('path').join,
    mkdirp = require('mkdirp'),
    beautify = require('js-beautify');



var LOCKED = false;

/**
  Инстанс игры
  @public
  @param {object} o - начальный объект игры (канвас и прочее)
*/
function Game(o){
  this.fps = 60 / 28;
  this.inited = false;
  this.elements = [];
  this.api = api;
  this.phases = [];

  // хрень какая-то
  var props = {
    width : o.width,
    height : o.height
  };

  this.game = props;
  this.width = o.width;
  this.height = o.heigth;

  this.store = new Scope();
}

/**
 Запускает инстанс игры
 @public
 @param {object} data - Конфигурационные данные
*/
Game.prototype.start = function(data){
  var self = this;

  var code = data.code;
  var js = S2(code);
  var pathName = join(config.files, data.uid.toString());
  var fileName = [data.instance, data.time , 'js'].join('.');
  var filePathName = join(pathName, fileName);

  this.lock();

  mkdirp(pathName, function(err) {
    if(err){
      console.trace();
      throw err;
    }

    console.log('Writing file:', pathName,  fileName);
    fs.writeFile(filePathName, beautify(js, {indent_size : 2}), function(err, data){
      var fn = require(filePathName);
      fn(self); // <- лол, точка входа в скомпелдированный код
      self.unlock(self.startInterval);
    });

  });

  data.elements.forEach(this.addElement.bind(this));

  return !this.inited && this.startInterval(config.env);
};

Game.prototype.startInterval = function(env){
  var self = this;
  setInterval(function(){
    if(!LOCKED){
      console.log('Updating');
      self.update();
    }
  }, this.fps);

  this.inited = true;
};

/**
 @public
 @param {function} callback
 */
Game.prototype.update = function(callback){
  this.elements.forEach(function(elem){
    elem.invoke();
  });

  if(this.onFrameEnd) {
    this.onFrameEnd.call(null, this.takeSnapshot());
  }

  if (callback) {
    callback.call(this);
  }
};

Game.prototype.getElement = function(id){
  return R.filter(R.propEq('id', id), this.elements)[0] || null;
};

Game.prototype.takeSnapshot = function(){
  return this.elements.map(function(elem){
    return elem.snapshot(['x', 'y', 'id']);
  });
};

Game.prototype.addElement = function(el){
  var element = new Element(el, this);

  // TODO добавить проверку на уникальность

  this.elements.push(element);
};

Game.prototype.lock = function() {
  LOCKED = true;
};

Game.prototype.unlock = function(callback) {
  LOCKED = false;

  if (callback) {
    callback.call(this);
  }
};

module.exports = Game;
