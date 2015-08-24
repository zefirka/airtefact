var extend = require('warden.js').Utils.extend;
var common = require('./common');

var config   = require('../config/config.js'),
    path     = require('../utils/file.js').path;

var jsc = path(config.static, 'js'),
    lib = path(config.static, 'lib'),
    env = process.env.NODE_ENV || config.env || 'dev';

common.scripts = common.scripts.concat([
  path(lib, 'socket.io-client/socket.io.js'),
  path(lib, 'paper/dist/paper-full.js'),
  path(jsc, 'app.js')
]);

module.exports = extend({}, common, {
  route : 'index'
});
