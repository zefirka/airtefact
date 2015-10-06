'use strict';

$(function(){
  var output = $('#output'),
      debugMode = $('#debug');

  var inputCodeMirror = CodeMirror.fromTextArea(document.getElementById('input'), {
    lineNumbers : true,
    theme : 'monokai',
    mode : 'ss2',
    styleActiveLine : true,
    matchBrackets : true,
    autoCloseBrackets : true
  });

  var outputCodeMittos = CodeMirror.fromTextArea(document.getElementById('output'), {
    theme : 'monokai',
    mode : 'javascript',
    readOnly : true,
  });

  var inputs = Warden.Stream(function(fire){
    inputCodeMirror.on('change', function(event){
      fire(event, inputCodeMirror);
    });
  });


  var checkBoxSwitches = debugMode.stream('change');

  var isDebug = checkBoxSwitches.grep('@prop("checked")').watch();

  function trigger(emit){
    return function(value){
      $.post('/compile', {
        data : value,
        debug : isDebug.value
      }).then(emit);
    };
  }

  function update(value){
    outputCodeMittos.setValue(value);
  }

  var call = null;

  var result = Warden.Stream(function(fire){
    call = trigger(fire);
  }).listen(update);

  inputs
        .debounce(500)
        .map(function(cm){
          return cm.getValue();
        })
        .diff()
        .listen(call);

  isDebug.listen(function(){
    call(inputCodeMirror.getValue());
  });

});
