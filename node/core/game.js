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
  this.fps = 500;
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
  this.startInterval(config.env);
}

/**
 Запускает инстанс игры
 @public
 @param {object} data - Конфигурационные данные
*/
Game.prototype.writeCode = function(data){
  var self = this;

  var code = data.code;
  var js = S2(code);
  var pathName = join(config.files, data.uid.toString());
  var fileName = [data.instance, data.time , 'js'].join('.');
  var filePathName = join(pathName, fileName);

  mkdirp(pathName, function(err) {
    fs.writeFile(filePathName, beautify(js, {indent_size : 2}));
  });
};

function getUpdates(self) {
  var directories = fs.readdirSync(config.files);
  directories.forEach(function(dirName) {
    var tmpFiles = fs.readdirSync(config.files + '/' + dirName);
    tmpFiles.forEach(function(item) {
      var tmpFile = require(config.files + '/' + dirName + '/' + item);
      try {
          var res = tmpFile(self);
      } catch (e) {
          console.log('error compiling ' + item + " " + e);
      } finally {
          fs.unlinkSync(config.files + '/' + dirName + '/' + item);
      }
    });
  });
}

Game.prototype.startInterval = function(env){
  var self = this;
  setInterval(function(){
    console.log('Updating');
    getUpdates(self);
    self.update();
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
