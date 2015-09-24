import expect from 'must';
import file from '../file';

describe('Module: node/utils/file', () => {

  it(':: ext', () => {
    expect(file.ext('test', 'js')).to.be('test.js');
    expect(file.ext('test.with', 'js')).to.be('test.with.js');
    expect(file.ext(0, 0)).to.be('0.0');
  });

  it(':: isFileExist', (done) => {
    file.isFileExist('./file.spec.js', () => {
      expect(true).to.be(true);
      done();
    });
  });
});
