var colors = require('colors');
var ctrl = require('../ctrl');

describe('Module: node/ctrl'.bold.underline, function () {
  var indexController = ctrl('index', {url: '/'});
  var commonController = ctrl('common', {url: '/'});
  var unexistController = ctrl('nope', {url: '/nope'});

  it('should return controller, if it exist', function () {
    expect(indexController).not.toBe(undefined);
    expect(indexController.route).toBe('index');
  });

  it('should return common', function () {
    expect(commonController).not.toBe(undefined);
    expect(commonController.route).toBe('common');
  });

  it('should not affect on other routes', function () {
    expect(commonController.route).not.toBe(indexController.route);
    expect(unexistController.route).not.toBe(indexController.route);
  });

  it('should return 404 if not found', function () {
    expect(unexistController.route).toBe('404');
    expect(unexistController.url).toBe('/nope');
  });

});