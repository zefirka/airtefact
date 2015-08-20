var Parser = require('../s2');

var colors = require('colors');

describe('Module: 2sula/Parser'.bold, function (){
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
        var outputs = inputs.map(function(token){
                          var res = null;
                          try{
                              res = Parser(token);
                          }catch(error){
                              res = 'error';
                          }finally{
                              return res;
                          }
                      });

        it('should parse simple literal', function(){
           expect(outputs[0]).toEqual(['x']);
        });

        it('should parse simple number', function(){
            expect(outputs[1]).toEqual([1]);
        });

        it('should parse simple string', function(){
            expect(outputs[2]).toEqual(['\'allahu akbar\'']);
        });

        it('should parse simple expression', function(){
            expect(outputs[3]).toEqual(['{ anus boyanus }']);
        });

        it('should parse simple literal expression', function(){
            expect(outputs[4]).toEqual(['{x + y}']);
        });

        it('should parse simple unquoted expression', function(){
            expect(outputs[5]).toEqual([12,'+',13]);
        });

        it('should parse simple error', function(){
            expect(outputs[6]).toEqual('error');
        });

        it('should parse simple empty', function(){
            expect(outputs[7]).toEqual([[]]);
        });

    });
});
