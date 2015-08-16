

function Dvastula(source){
  var js;
  (function(){
    js = this.eval(source);
  })();
  return js;
}

function tokeinzer(source){
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


  var seqs = source .replace(/\[/g, ' [ ')
                    .replace(/\]/g, ' ] ')
                    .replace(/\#.+(\n|$)/g, '') //cut of comments
                    .replace(/\'.*?\'/g, stringSwipeOn)
                    .replace(/\{.*?\}/g, stringSwipeOn);

  return seqs.trim().split(/\s+/).map(stringSwipeOff);

}
