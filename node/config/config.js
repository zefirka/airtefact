function config(locale){
  /* Private scope */

  function rooty(path){
    return __dirname + '/../../' + path;
  }

  /* End of private scope */

  return {
    root : rooty(''),
    public : rooty('public'),
    views : rooty('public/view'),
    static : 'static',
    port : 7778,

    meta : {
      favicon : rooty('public/favicon.png'),
    },

    dev : {
      logTime : {
        repl : true,
        file : false,
      },
      logMorgan : {
        repl : false,
        file : true
      }
    }
  };
}


module.exports = config();
