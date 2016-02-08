require('babel/register');

'use strict';

var fs = require('fs');
var pkg = require('../package.json');
var deps = pkg.front.dependencies.map(x => 'require(\'node_modules/' + x + '\')').join(';\n') + ';\n';
deps += 'require(\'./static/jsx/main.jsx\');';

fs.writeFile('./entry.js', deps, {encoding : 'utf-8'}, (err) => {
  if(err){
    throw err;
  }
});
