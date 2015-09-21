var file = require('../file.js'),
    color = require('colors');

describe('Module: node/utils/file'.bold, function() {

  it(':: ext', function() {
    expect(file.ext('test', 'js')).toBe('test.js');
    expect(file.ext('test.with', 'js')).toBe('test.with.js');
    expect(file.ext(0, 0)).toBe('0.0');
  });

  it(':: isFileExist', function (done) {
    file.isFileExist('./file.spec.js', function(){
      expect(true).toBe(true);
      done();
    }, function(){

    });

  });

});
