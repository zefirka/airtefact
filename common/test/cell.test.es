import {cell, formula}  from '../cell';
import expect from 'must';

describe('Module common/cell', function () {
  describe('cell', function () {
    
    it('should create cell', function () {
      var c = cell(0);
      expect(c).not.to.be(undefined);
    });

    it('should get cells value', function () {
      var c = cell(10);
      expect(c.value).to.be(10);
    });

    it('should get cells value by value of', function () {
      var a = cell(10);
      var b = cell(20);

      expect(a + b).to.be(30);
    });
  });
});
