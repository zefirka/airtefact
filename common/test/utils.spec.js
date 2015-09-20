require('colors');
var utils = require('../utils');

describe('Module: Common/utils'.bold, function (){
  var forIn = utils.forIn,
      forMap = utils.forMap,
      forReduce = utils.forReduce;

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

  describe(':: forReduce', function (){
      var ins = { a: 1, b: 2, c: 3 };

      vals = forReduce(ins, function(res, val, key){
        res.push(key + val);
        return res;
      }, []);

      it('should transform values', function(){
        expect(vals).toEqual(['a1','b2','c3']);
      });

  });

  describe(':: camelCase', function () {
    var inps = [
      'allahu-akbar',
      'allahu_akbar',
      '-allahu-akbar-',
      '_allahu_akbar_'
    ]

    it('should transform lisp-case', function(){
      expect(utils.camelCase(inps[0])).toEqual('allahuAkbar');
    })

    it('should not transform underscore-case', function(){
      expect(utils.camelCase(inps[1])).toEqual('allahu_akbar');
      expect(utils.camelCase(inps[3])).toEqual('_allahu_akbar_');
    });

    it('should transform first case', function () {
      expect(utils.camelCase(inps[2])).toEqual('AllahuAkbar-');
    });
  });

  describe(':: forWhile', function () {
    var arr = [1,2,3,4,5,6,7,8,9,10];

    var forWhile = utils.forWhile;

    it('should return value', function () {
      var res = [];
      forWhile(arr, function(value){
        res.push(value);
        return value;
      }, 5);
      expect(res).toEqual([1,2,3,4,5]);
    });

    it('should return exception value', function () {
      var res = forWhile(arr, function(value){
        return value;
      }, 0, 'test');
      expect(res).toBe('test');
    });

    it('should work with functions', function () {
      var res = []
      forWhile(arr, function(value){
        res.push(value);

        if (value == 5){
          return 10;
        }
        return value;
      }, function(fnValue, value, index){
        return value !== fnValue;
      });
      expect(res).toEqual([1,2,3,4,5]);
    });



  });

});
