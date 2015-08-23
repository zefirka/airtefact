var config   = require('../config/config.js'),
    path     = require('../utils/file.js').path;

var scripts = [];

var jsc = path(config.static, 'js'),
    lib = path(config.static, 'lib'),
    env = process.env.NODE_ENV || config.env || 'dev';

if (env == 'prod') {
  scripts = [path(jsc, 'bundle/app.min.js')];
}else{
  scripts = [
    path(lib, 'jquery/dist/jquery.min.js'),
    path(lib, 'bootstrap/dist/js/bootstrap.min.js'),
    path(lib, 'warden.js/dist/warden.min.js'),
    path(lib, 'socket.io-client/socket.io.js'),
    path(lib, 'paper/dist/paper-full.js'),
    path(jsc, 'app.js')
  ];
}

module.exports = {
  scripts : scripts,
  styles : [
    path(lib, 'bootstrap/dist/css/bootstrap.min.css'),
    'static/css/main.css'
  ]

};
