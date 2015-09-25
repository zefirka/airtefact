import expect from 'must';
import ctrl from '../ctrl';

describe('Module: node/ctrl', () =>  {
  let indexController = ctrl('index', {url: '/'});
  let commonController = ctrl('common', {url: '/'});
  let unexistController = ctrl('nope', {url: '/nope'});

  it('should return controller, if it exist', () =>  {
    expect(indexController).not.to.be(undefined);
    expect(indexController.route).to.be('index');
  });

  it('should return common', () =>  {
    expect(commonController).not.to.be(undefined);
    expect(commonController.route).to.be('common');
  });

  it('should not affect on other routes', () =>  {
    expect(commonController.route).not.to.be(indexController.route);
    expect(unexistController.route).not.to.be(indexController.route);
  });

  it('should return 404 if not found', () =>  {
    expect(unexistController.route).to.be('404');
    expect(unexistController.url).to.be('/nope');
  });

});