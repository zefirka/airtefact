var repl = require('repl');
// var S2 = require("./index");
//
// S2.setup({
//   stdin : process.stdin,
//   stdout : process.stdout,
//   env: 'dev'
// });

var s2 = require('./s2');

function startRepl(){
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

        cmd = cmd.slice(1, -2);

        var res = s2(cmd);

        callback(null, res);
      } else {
        callback(null);
      }
    }
  });
}
//
// if(process.argv.length == 3){
//   var filename = process.argv.pop();
//   require('fs').readFile(filename, {encoding: 'utf-8'}, function(err, data){
//     if(err){
//       if(filename == "-r"){
//         startRepl();
//       }else{
//         throw err;
//       }
//     }else{
//       Jisp.Eval(data);
//     }
//   })
// }

startRepl();
