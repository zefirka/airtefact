'use strict';

var fs = require('fs');
var pkg = require('../package.json');
var deps = pkg.front.dependencies.map( (dep) => 'node_modules/' + dep ).join('\n') + '\n';

fs.writeFile('deps', deps, {encoding : 'utf-8'}, (err) => {
  if(err){
    throw err;
  }
});
