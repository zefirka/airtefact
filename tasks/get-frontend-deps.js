var fs = require('fs');
var pkg = require('../package.json');

var deps = pkg.front.dependencies.map(function(dep){
  return 'node_modules/' + dep;
}).join('\n') + '\n';

fs.writeFile('deps', deps, {encoding : 'utf-8'}, function(err, data){
  if(err){
    throw err;
  }
});
