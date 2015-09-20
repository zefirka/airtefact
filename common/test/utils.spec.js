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
  describe(':: is', function () {
    var is = utils.is;
    var str = 'string',
        num = 10,
        obj = {x:20},
        array = [20],
        fn = function name(){},
        bool = true,
        nil = null,
        undef;
    
    describe('Datatype Checkings', function(){
      it('::string', function(){
        expect(is.str(str)).toBe(true);
        expect(is.num(str)).toBe(false);
        expect(is.bool(str)).toBe(false);
        expect(is.fn(str)).toBe(false);
        expect(is.array(str)).toBe(false);
        expect(is.obj(str)).toBe(false);
      });

      it('::number', function(){
        expect(is.str(num)).toBe(false);
        expect(is.num(num)).toBe(true);
        expect(is.bool(num)).toBe(false);
        expect(is.fn(num)).toBe(false);
        expect(is.array(num)).toBe(false);
        expect(is.obj(num)).toBe(false);
      });

      it('::boolean', function(){
        expect(is.str(bool)).toBe(false);
        expect(is.num(bool)).toBe(false);
        expect(is.bool(bool)).toBe(true);
        expect(is.fn(bool)).toBe(false);
        expect(is.array(bool)).toBe(false);
        expect(is.obj(bool)).toBe(false);
      });

      it('::function', function(){
        expect(is.str(fn)).toBe(false);
        expect(is.num(fn)).toBe(false);
        expect(is.bool(fn)).toBe(false);
        expect(is.fn(fn)).toBe(true);
        expect(is.array(fn)).toBe(false);
        expect(is.obj(fn)).toBe(false);
      });

      it('::array', function(){
        expect(is.str(array)).toBe(false);
        expect(is.num(array)).toBe(false);
        expect(is.bool(array)).toBe(false);
        expect(is.fn(array)).toBe(false);
        expect(is.array(array)).toBe(true);
        expect(is.obj(array)).toBe(false);
      });

      it('::object', function(){
        expect(is.str(obj)).toBe(false);
        expect(is.num(obj)).toBe(false);
        expect(is.bool(obj)).toBe(false);
        expect(is.fn(obj)).toBe(false);
        expect(is.array(obj)).toBe(false);
        expect(is.obj(obj)).toBe(true);
      });
    });
    
    describe('Logical Chekings', function(){
      it('existance', function(){
        expect(is.exist(false)).toBe(true);
        expect(is.exist()).toBe(false);
        expect(is.exist(array[1])).toBe(false);
        expect(is.exist(null)).toBe(false);
        expect(is.exist(1)).toBe(true);
      });

      it('.not()', function(){
        var nexist = utils.not(is.exist);
        expect(nexist(false)).toBe(false);
        expect(nexist()).toBe(true);
        expect(nexist(1)).toBe(false);
        expect(nexist(null)).toBe(true);
      });
    });
  });

});
