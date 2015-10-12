'use strict';

const fs = require('fs');
const pkg = require('../package.json');
const deps = pkg.front.dependencies.map(x => 'node_modules/' + x).join('\n') + '\n';

fs.writeFile('deps', deps, {encoding : 'utf-8'}, (err) => {
  if(err){
    throw err;
  }
});
