$(function(){
  var input = $('#input'),
      output = $('#output'),
      debugMode = $('#debug');

  var checkBoxSwitches = debugMode.stream('change');

  var isDebug = checkBoxSwitches.grep('@prop("checked")').watch();

  function highlight(){
    hljs.initHighlightingOnLoad();
    $('pre').each(function(i, block) {
       hljs.highlightBlock(block);
     });
  }
  function trigger(emit){
    return function(value){
      $.post('/compile', {
        data : value,
        debug : isDebug.value
      }).then(emit);
    };
  }

  function update(value){
    output.html(value);
    highlight();
  }

  var call = null;

  var result = Warden.Stream(function(fire){
    call = trigger(fire);
  }).listen(update);

  input .stream('keyup')
        .debounce(500)
        .diff()
        .grep('@val()')
        .listen(call);

  isDebug.listen(function(){
    call(input.val());
  });

});
