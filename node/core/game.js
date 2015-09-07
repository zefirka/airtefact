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
  this.scope = new Scope({
    width     : o.width,
    height    : o.height,
    elements  : this.elements,
    api       : api
  });
}

/**
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
      fn(self.scope); // <- лол, точка входа в скомпелдированный код
      self.unlock();

      try{
        console.log('#### GLOBAL SCOPE ####');
        console.log(self.scope.store);
        console.log('#### LOCAL SCOPE OF ID=0 ####');
        console.log(self.scope.store.elements[0].scope.store);
      }catch(error){

      }
    });

  });

  data.elements.forEach(this.addElement.bind(this));

  if(this.inited){
    return ;
  }else{
    setInterval(function(){
      if(!LOCKED){
        self.update();
      }
    }, this.fps);
    this.inited = true;
  }
};

Game.prototype.update = function(callback){
  this.scope.store.elements.forEach(function(elem){
    elem.invoke();
  });

  if(this.onFrameEnd) {
    this.onFrameEnd.call(null, this.takeSnapshot());
  }
};

Game.prototype.takeSnapshot = function(){
  return this.scope.store.elements.map(function(elem){
    return elem.snapshot();
  });
};

Game.prototype.addElement = function(el){
  var element = new Element(el, this.scope.store);

  // TODO добавить проверку на уникальность

  this.elements.push(element);
};

Game.prototype.lock = function() {
  LOCKED = true;
};

Game.prototype.unlock = function() {
  LOCKED = false;
};

module.exports = Game;
