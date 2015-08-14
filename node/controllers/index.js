var config   = require('../config/config.js'),
    path     = require('../utils/file.js').path;

var scripts = [];

var jsc = path(config.static, 'js'),
    env = process.env.NODE_ENV || config.env || 'dev';

if (env == 'prod') {
  scripts = [path(jsc, 'bundle/app.min.js')];
}else{
  sciprts = [
    path(jsc, 'lib/jquery/jquery.min.js'),
    path(jsc, 'lib/socket.io.js'),
    path(jsc, 'lib/warden.min.js'),
    path(jsc, 'app.js')
  ];
}

module.exports = {

  scripts : scripts,

  styles : [
    'static/css/main.css'
  ]

};
