var core;
var MOCK = {
  width: 100,
  height: 100
};

var EMOCK = function(i){
  return {
    elements: [{x: 0, y: 0}],
    code: '',
    uid: i
  };
}

describe('node/core', function () {
  beforeEach(function() {
    core = require('../core');  
  });

  afterEach(function(){
    core.started && core.destroy();
  });

  it('should start empty game session', function () {
    core.start(MOCK);
    expect(core.game.inited).toBe(true);
    expect(core.started).toBe(true);
    expect(core.state()).toBe(false);
  });

  it('should throw error on empty start info', function () {
    var state = false;
    try{
      core.start();
    }catch(error){
      state = error;
    }finally{
      expect(state).not.toBe(false);
    }
  });


  it('should instance game with elements', function (done) {
    core.
      start(MOCK)
      .onSnapshot(function(){
        expect(true).toBe(true);
        done();
      })
      .add(EMOCK(1));
  });

  it('should freeze game', function () {
    core.start(MOCK).add(EMOCK(2)).freeze();
    expect(core.state()).toBe(false);
  });

  // it('should unfreeze game', function () {
  //   core.start(MOCK).add(EMOCK(3)).freeze().unfreeze();
  //   expect(core.state()).toBe(true);
  // });

});