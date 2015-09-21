var extend = require('../../common/utils').extend;
var common = require('./common');

var config   = require('../config/config.js'),
    path     = require('path').join;

var jsc = path(config.static, 'js'),
    lib = path(config.static, 'lib'),
    env = process.env.NODE_ENV || config.env || 'dev';

common.scripts = common.scripts.concat([
  path(lib, 'socket.io-client/socket.io.js'),
  path(lib, 'paper/dist/paper-full.js'),
  path(lib, 'highlightjs/highlight.pack.min.js'),
  path(lib, 'codemirror/lib/codemirror.js'),
  path(lib, 'codemirror/addon/edit/closebrackets.js'),
  path(lib, 'codemirror/addon/edit/matchbrackets.js'),
  path(lib, 'codemirror/addon/selection/active-line.js'),
  path(jsc, 'dsl/ss2.js'),
  path(jsc, 'app.js'),
  path(jsc, 'compiler.js')
]);

common.styles = common.styles.concat([
  path(lib, 'highlightjs/styles/github.css'),
  path(lib, 'codemirror/lib/codemirror.css'),
  path(lib, 'codemirror/theme/monokai.css')
]);

module.exports = extend({}, common, {
  route : 'index'
});
