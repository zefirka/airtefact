var expect = require('must');
var Parser = require('../s2');

function parse(token){
  var res = null;
  try{
    res = Parser(token);
  }catch(error){
    res = 'error';
  }finally{
    return res;
  }
}

describe('Module: 2sula/Parser', function (){
  describe('Should parse token', function () {
    var inputs = [
        'x',
        1,
        '\'allahu akbar\'',
        '{ anus boyanus }',
        '{x + y}',
        '12 + 13',
        '[',
        '[]'
    ];
    var outputs = inputs.map(parse);

    it('should parse simple literal', function(){
      expect(outputs[0]).to.eql(['x']);
    });

    it('should parse simple number', function(){
      expect(outputs[1]).to.eql([1]);
    });

    it('should parse simple string', function(){
      expect(outputs[2]).to.eql(['\'allahu akbar\'']);
    });

    it('should parse simple expression', function(){
      expect(outputs[3]).to.eql(['{ anus boyanus }']);
    });

    it('should parse simple literal expression', function(){
      expect(outputs[4]).to.eql(['{x + y}']);
    });

    it('should parse simple unquoted expression', function(){
      expect(outputs[5]).to.eql([12,'+',13]);
    });

    it('should parse simple error', function(){
      expect(outputs[6]).to.eql('error');
    });

    it('should parse simple empty', function(){
      expect(outputs[7]).to.eql([[]]);
    });
  });

  describe('Should parse constructions', function(){
    var constrs = [
      '[def x 10]',
      '[defn inc[x] [+ x 1]]',
      '[list 1 2 [3 4 [5 6]]]',
      '[def x {test-something}]',
      '[def j $global]',
      '[def x 20] [let x 20] [a b c d]'
    ];

    var ans = [
      [['def', 'x', 10]],
      [['defn', 'inc', ['x'], ['+', 'x', 1]]],
      [['list', 1, 2, [3, 4, [5,6]]]],
      [['def', 'x', '{test-something}']],
      [['def', 'j', '$global']],
      [['def', 'x', 20], ['let', 'x', 20], ['a','b','c','d']]
    ];

    var outputs = constrs.map(parse);

    it('Should parse: [def x 10]', function(){
      expect(outputs[0]).to.eql(ans[0]);
    });

    it('Should parse: [defn inc[x] [+ x 1]]', function(){
      expect(outputs[1]).to.eql(ans[1]);
    });

    it('Should parse: [list 1 2 [3 4 [5 6]]]', function(){
      expect(outputs[2]).to.eql(ans[2]);
    });

    it('Should parse: [def x {test-something}]', function(){
      expect(outputs[3]).to.eql(ans[3]);
    });

    it('Should parse: [def j $global]', function(){
      expect(outputs[4]).to.eql(ans[4]);
    });

    it('Should parse: [def x 20] [let x 20] [a b c d]', function(){
      expect(outputs[5]).to.eql(ans[5]);
    });
  });
});
