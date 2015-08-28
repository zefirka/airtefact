require('colors');
var utils = require('../utils');

describe('Module: Common/utils'.bold, function (){
  var forIn = utils.forIn,
      forMap = utils.forMap;

  describe(':: forIn', function (){
      var ins = { a: 1, b: 2, c: 3 };
      var vals = [];
      var keys = [];

      forIn(ins, function(val, key){
        vals.push(val);
        keys.push(key);
      });

      it('should iterate by values', function(){
        expect(vals).toEqual([1,2,3]);
      });

      it('should iterate by keys', function(){
        expect(keys).toEqual(['a','b','c']);
      });
  });

  describe(':: forMap', function (){
      var ins = { a: 1, b: 2, c: 3 };
      var vals = [];
      var keys = [];

      vals = forMap(ins, function(val, key){
        return val + key;
      });

      it('should transform values', function(){
        expect(vals).toEqual({a:'1a',b : '2b', c: '3c'});
      });

  });

});
