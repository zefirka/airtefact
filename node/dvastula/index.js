/**
  Модуль для парсинга и компиляции кода на языке dvastula
  @module 2stula
  */

var beautify    = require('js-beautify').js_beautify;

var Parser    = require('./s2.js'),
    Compiler  = require('./compiler');

var Dvastula =  {
  /**
    Парсер ss2
    @function parse
    @public
    @param {string} dvastula Код на языке 2stula
    @return {array}
  */
  parse : function (dvastula){
    return Parser(dvastula);
  },
  /**
    Компилятор ss2. Пока читает не из инпута, а файл test/test.ss2 в той же дирректории и пишет в файл test/result.js
    @public
    @method compile
    @param {string} source Код на языке 2stula
    @return {string} Код на языке JavaScript
  */
  compile : function (/* source */){
    // на время разработки мы компилируем файл test.ss2

    var source = require('fs').readFileSync('./test/test.ss2', {encoding : 'utf-8'});

    var js = Compiler(source);
    console.log(js);
    require('fs').writeFileSync('./test/result.js', beautify(js, { indent_size : 2 }));
    return js;
  },
  /**
    По-идее должен проводить настройку, но увы...
  */
  setup : function (config){

  }
};

module.exports = Dvastula;

Dvastula.compile();
