import utils  from '../utils';
import expect from 'must';

describe('Module: Common/utils'.bold, () => {
  var forIn = utils.forIn,
      forMap = utils.forMap,
      forReduce = utils.forReduce;

  describe(':: forIn', () => {
      var ins = { a: 1, b: 2, c: 3 };
      var vals = [];
      var keys = [];

      forIn(ins, function(val, key){
        vals.push(val);
        keys.push(key);
      });

      it('should iterate by values', () => {
        expect(vals).to.eql([1,2,3]);
      });

      it('should iterate by keys', () => {
        expect(keys).to.eql(['a','b','c']);
      });
  });

  describe(':: forMap', () => {
      var ins = { a: 1, b: 2, c: 3 };
      var vals = [];
      var keys = [];

      vals = forMap(ins, function(val, key){
        return val + key;
      });

      it('should transform values', () => {
        expect(vals).to.eql({a:'1a',b : '2b', c: '3c'});
      });

  });

  describe(':: forReduce', () => {
      var ins = { a: 1, b: 2, c: 3 };

      var vals = forReduce(ins, function(res, val, key){
        res.push(key + val);
        return res;
      }, []);

      it('should transform values', () => {
        expect(vals).to.eql(['a1','b2','c3']);
      });

  });

  describe(':: camelCase', () => {
    var inps = [
      'allahu-akbar',
      'allahu_akbar',
      '-allahu-akbar-',
      '_allahu_akbar_'
    ]

    it('should transform lisp-case', () => {
      expect(utils.camelCase(inps[0])).to.eql('allahuAkbar');
    })

    it('should not transform underscore-case', () => {
      expect(utils.camelCase(inps[1])).to.eql('allahu_akbar');
      expect(utils.camelCase(inps[3])).to.eql('_allahu_akbar_');
    });

    it('should transform first case', () => {
      expect(utils.camelCase(inps[2])).to.eql('AllahuAkbar-');
    });
  });

  describe(':: forWhile', () => {
    var arr = [1,2,3,4,5,6,7,8,9,10];

    var forWhile = utils.forWhile;

    it('should return value', () => {
      var res = [];
      forWhile(arr, function(value){
        res.push(value);
        return value;
      }, 5);
      expect(res).to.eql([1,2,3,4,5]);
    });

    it('should return exception value', () => {
      var res = forWhile(arr, function(value){
        return value;
      }, 0, 'test');
      expect(res).to.be('test');
    });

    it('should work with functions', () => {
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
      expect(res).to.eql([1,2,3,4,5]);
    });

  });

  describe(':: is', () => {
    var is = utils.is;
    var str = 'string',
        num = 10,
        obj = {x:20},
        array = [20],
        fn = function name(){},
        bool = true,
        nil = null,
        undef;
    
    describe('Datatype Checkings', () => {
      it('string', () => {
        expect(is.str(str)).to.be(true);
        expect(is.num(str)).to.be(false);
        expect(is.bool(str)).to.be(false);
        expect(is.fn(str)).to.be(false);
        expect(is.array(str)).to.be(false);
        expect(is.obj(str)).to.be(false);
      });

      it('number', () => {
        expect(is.str(num)).to.be(false);
        expect(is.num(num)).to.be(true);
        expect(is.bool(num)).to.be(false);
        expect(is.fn(num)).to.be(false);
        expect(is.array(num)).to.be(false);
        expect(is.obj(num)).to.be(false);
      });

      it('boolean', () => {
        expect(is.str(bool)).to.be(false);
        expect(is.num(bool)).to.be(false);
        expect(is.bool(bool)).to.be(true);
        expect(is.fn(bool)).to.be(false);
        expect(is.array(bool)).to.be(false);
        expect(is.obj(bool)).to.be(false);
      });

      it('function', () => {
        expect(is.str(fn)).to.be(false);
        expect(is.num(fn)).to.be(false);
        expect(is.bool(fn)).to.be(false);
        expect(is.fn(fn)).to.be(true);
        expect(is.array(fn)).to.be(false);
        expect(is.obj(fn)).to.be(false);
      });

      it('array', () => {
        expect(is.str(array)).to.be(false);
        expect(is.num(array)).to.be(false);
        expect(is.bool(array)).to.be(false);
        expect(is.fn(array)).to.be(false);
        expect(is.array(array)).to.be(true);
        expect(is.obj(array)).to.be(false);
      });

      it('object', () => {
        expect(is.str(obj)).to.be(false);
        expect(is.num(obj)).to.be(false);
        expect(is.bool(obj)).to.be(false);
        expect(is.fn(obj)).to.be(false);
        expect(is.array(obj)).to.be(false);
        expect(is.obj(obj)).to.be(true);
      });
    });
    
    describe('Logical Chekings', () => {
      it('existance', () => {
        expect(is.exist(false)).to.be(true);
        expect(is.exist()).to.be(false);
        expect(is.exist(array[1])).to.be(false);
        expect(is.exist(null)).to.be(false);
        expect(is.exist(1)).to.be(true);
      });

      it('.not()', () => {
        var nexist = utils.not(is.exist);
        expect(nexist(false)).to.be(false);
        expect(nexist()).to.be(true);
        expect(nexist(1)).to.be(false);
        expect(nexist(null)).to.be(true);
      });
    });
  });

  describe(':: toArray', () => {
    var toArray = utils.toArray;

    it('should make array from arguments', () => {
      var args = (function(){ return toArray(arguments)})(1, 2, 3);
      expect(args).to.eql([1,2,3])
    });

    it('should transorm correct hash', () => {
      var args = toArray({0: 1, 1: 2, 2: 3, length: 3});
      expect(args).to.eql([1,2,3])
    });

    it('should transorm hash without length', () => {
      var args = toArray({0: 1, 1: 2, 2: 3});
      expect(args).to.eql([1,2,3])
    });

    it('should transorm only digit-keys in hash', () => {
      var args = toArray({0: 1, 1: 2, 2: 3, j:20, k:30});
      expect(args).to.eql([1,2,3])
    });

    it('should work with string', () => {
      var args = toArray('123');
      expect(args).to.eql(['1','2','3'])
    });

    it('should work with arrays', () => {
      var args = toArray([1,2,3]);
      expect(args).to.eql([1,2,3])
    });

  });

  describe(':: interpolate', () => {
    var intp = utils.interpolate;
    
  });

  describe(':: clone', () => {
    var clone = utils.clone;  

    it('should clone empty', () => {
      var empty = {};
      var cEmpty = clone(empty);
      expect(empty === cEmpty).to.be(false)
      expect(empty).to.eql(cEmpty);
    });

    it('should clone non-empty', () => {
      var o = {a: 20};
      var c = clone(o);
      expect(o === c).to.be(false)
      expect(o).to.eql(c);
    });

    it('should clone arrays', () => {
      var o = [1,2,3];
      var c = clone(o);
      expect(o === c).to.be(false)
      expect(o).to.eql(c);
    });

  });
});
