var R = require('ramda');


var GlobalCtx = {
  game : {
    width : function (context){
      return context.width;
    },
    height : function (context){
      return context.height;
    },
    ocount : function (context){
      return context.objects.length;
    },
    objects : function (context){
      return context.objects;
    }
  },
  fps : function (fpsConter){
    return fpsCounter();
  },
  referenceError : function(prop, scope){
    return {
      type : 'error',
      message : 'Reference Error: ' + prop + ' not found' + (scope ? ' in scope ' + scope : '') + '.'
    };
  }
};

module.exports = {
  global : function(token){
    var picker = R.prop(token);
    var result = objectPicker(GlobalCtx);

    if (result.length){
      return (function(){
        return this.eval('GlobalCtx.' + prop);
      })();
    }else{
      var o = picker(GLOBAL_PROTPERTIES.game.objects);

      if (o.length){
        return o;
      }	else {
        return GlobalCtx.referenceError(token, 'global');
      }
    }
  }
};
