var file = require('../file.js'),
    color = require('colors');

describe('Module: node/utils/file'.bold, function() {

  it(':: ext', function() {
    expect(file.ext('test', 'js')).toBe('test.js');
    expect(file.ext('test.with', 'js')).toBe('test.with.js');
    expect(file.ext(0, 0)).toBe('0.0');
  });

  it(':: path', function(){
    expect(file.path('a', 'b', 'c')).toBe('a/b/c');
    expect(file.path('/a/', '/b/', '/c/')).toBe('/a///b///c/');
    expect(file.path('a', 1, 2)).toBe('a/1/2');
  });

});
