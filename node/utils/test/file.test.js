var file = require('../file.js'),
    color = require('colors');

describe('Module: node/utils/file'.red, function() {
  it('ext', function() {
    expect(file.ext('test', 'js')).toBe('test.js');
  });
});
