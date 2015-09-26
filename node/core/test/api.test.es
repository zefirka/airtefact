import expect from 'must';
import api from '../api';



describe('core/api', function () {
  let MOCKED = 'no-params-true';
  let testApi = api.bind({
    goto: (a, b, c) => {
      return a ? (a + b + c) : MOCKED;
    },
    throwError: () => { return 'error' }
  })

  it('should find method', function () {
    expect(testApi('goto')).to.be(MOCKED)
  });

  it('should transmit params', function () {
    expect(testApi('goto', 1, 2,3)).to.be(6)
  });

  it('should throw an error if not found', function () {
    expect(testApi('allahu akbar')).to.be('error');
  });
});