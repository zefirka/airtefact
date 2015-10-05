var extend = require('../../common/utils').extend;

var common = require('./common');

var config   = require('../config/config.js'),
    path     = require('path').join,
    lib = path(config.static, 'lib'),
    jsc = path(config.static, 'js'),
    css = path(config.static, 'css');

var data = {
  scripts : common.scripts.concat([
    path(lib, 'codemirror/lib/codemirror.js'),
    path(lib, 'codemirror/addon/edit/closebrackets.js'),
    path(lib, 'codemirror/addon/edit/matchbrackets.js'),
    path(lib, 'codemirror/addon/selection/active-line.js'),
    path(lib, 'codemirror/mode/javascript/javascript.js'),
    path(jsc, 'dsl/ss2.js'),
    path(jsc, 'compiler.js')
  ]),

  styles : common.styles.concat([
    path(lib, 'codemirror/lib/codemirror.css'),
    path(css, 'monokai.ss2.css')
  ]),

  route : 'compier'
};

module.exports = extend({}, common, data);
