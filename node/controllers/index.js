var App = require('../client/app');

var extend = require('warden.js').Utils.extend;
var common = require('./common');

var config   = require('../config/config.js'),
    join     = require('path').join;

var jsc = join(config.static, 'js'),
    lib = join(config.static, 'lib'),
    env = process.env.NODE_ENV || config.env || 'dev';

common.scripts = common.scripts.concat([
  join(lib, 'socket.io-client/socket.io.js'),
  join(lib, 'paper/dist/paper-full.js'),
  join(jsc, 'bundle/bundle.js')
]);

module.exports = extend({}, common, {
  route : 'index',
  html : App.render()
});
