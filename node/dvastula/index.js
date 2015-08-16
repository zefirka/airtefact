

function Dvastula(source){
  var js;
  (function(){
    js = this.eval(source);
  })();
  return js;
}

function tokeinzer(source){
  var seqs = source .replace(/\[/g, ' [ ')
                    .replace(/\]/g, ' ] ')
                    .replace(/\#.+(\n|$)/g, ''); //cut of comments

}


function tokenize(expr){
  function stringSwipeOn(string){
    return string
      .replace(/ /g, '__PROB__')
      .replace(/\n/g, '__NLIN__')
      .replace(/\t/g, '__NTAB__');
  }

  function stringSwipeOff(e){
    return e.replace(/__PROB__/g, ' ')
        .replace(/__NLIN__/g, '\n')
        .replace(/__NTAB__/g, '\t');
  }

  var sequences = expr
    .replace(/'\(.*?\)/g, function(e){
      return '(quote ' + e.slice(1) + ' )';
    })
    .replace(/\~\(.*?\)/g, function(e){
      return '(eval ' + e.slice(1) + ' )';
    })
    .replace(/\(/g, ' [ ')
    .replace(/\)/g, ' ] ')
    .replace(/\;.+(\n|$)/g, '')
    .replace(/\'.*?\'/g, stringSwipeOn)
    .replace(/\{.*?\}/g, stringSwipeOn);

  return sequences.trim().split(/\s+/).map(stringSwipeOff);
}
