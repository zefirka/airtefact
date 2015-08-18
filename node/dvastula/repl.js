var repl        = require('repl');
var beautify    = require('js-beautify').js_beautify;

var s2      = require('./s2'),
    compile = require('./compiler');

function startRepl(instance){
  repl.start({
    prompt : 'есть два стула...> ',
    input : process.stdin,
    output : process.stdout,
    writer : function(x){
      return x;
    },
    ignoreUndefined : true,
    eval : function(cmd, context, filename, callback) {
      if (cmd !== '(\n)') {

        cmd = cmd.slice(0, -1);

        var res = instance == 'compile' ? beautify(compile(cmd), { indent_size : 2 }) : s2(cmd);
        callback(null, res);
      } else {
        callback(null);
      }
    }
  });
}

var instance = 'interop';
process.argv.forEach(function(arg){
  /* In case if want to use custom port */
  if (arg.indexOf('-c') >= 0){
    instance = 'compile';
  }
});

startRepl(instance);
