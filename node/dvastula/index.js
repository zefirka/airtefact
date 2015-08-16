var utils = require('warden.js').Utils,
    toArray   = utils.toArray,
    intp      = utils.interpolate,
    is        = utils.is;


function ArityError(a,b,c){
  return intp('Aritye Error: function {{0}} exptect {{1}} arguments but {{2}} recieved.',a,b,c);
}

function SyntaxError(a){
  return intp('SyntaxError: {{0}} is not a defined method.', a);
}

var deref = require('./deref.js'),
    s2    = require('./s2.js');

var res =  {
  parse : function (dvastula){
    return s2(dvastula);
  },
  invoke : function (js){
    return Interpreter(js, true);
  },
  compile : function (source){

  },
  setup : function (config){

  }
};

function Interpreter(struct, fromParent){
  var CurrentScope = D2Scope;

  if (!struct.length){
    return '';
  }

  function invoke(js){
    console.log('Invoking: ', js);


    var position = 0;
    while(position < js.length){
      var instance = js[position];

      if (instance.name == 'deref'){
        instance = instance(CurrentScope);
      }

      if (is.array(instance)){
        instance = invoke(instance);
      }

      if (!is.fn(instance)){
        throw SyntaxError(instance);
      }else{
        console.log('here');
        js = instance.apply(CurrentScope, js.slice(1));
      }
    }
    console.log(js);
    return js;
  }

  return struct.map(invoke);
}

function define(scope, name, fn, arity){
  scope[name] = function (){
    var argv = toArray(arguments),
        argc = argv.length;

    if (arity && arity !== argc){
      console.trace();
      throw intp(ArityError, name, arity, argc);
    }

    return fn.apply(scope, arguments);
  };
}

function Scope(elems){
  if (elems){
    utils.extend(this, elems);
  }
}

Scope.prototype.set = function (name, value) {
  this.name = value;
};

var ReservedScope = new Scope();

var D2Scope = {
  $I : ReservedScope,
  $D : {}

};

define(ReservedScope, 'def', function(name, value){
  console.log(this);
  this.set(name, value);
  return value;
}, 2);

res.invoke(res.parse('[def x 10]'));
