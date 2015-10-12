import {cell, formula}  from '../cell';
import expect from 'must';

describe('Module common/cell', () => {
  describe('cell', () => {
    
    it('should create cell', () => expect(cell(0)).not.to.be(undefined));
    it('should get cells value', () => expect(cell(10).value).to.be(10));
    it('should get cells value by value of', () => expect(cell(10) + cell(20)).to.be(30));

  });

  describe('methods', () => {
    
  });
});
