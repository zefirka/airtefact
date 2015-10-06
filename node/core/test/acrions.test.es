import expect from 'must'
import EventEmitter from 'events';

import actions from '../actions';

describe('core/actions', () => {
  let socket = new EventEmitter();

  describe('status action', () => {

    it(':: ready', () => { expect(actions.status({ type: 'ready' })).to.be('ready'); });
    it(':: error', () => { expect(actions.status({ type: 'error' })).to.be('error'); });

    it(':: start', (done) => {
      socket.once('tick', () => {
        expect(true).to.be(true);
        done();
      });

      actions.status({
        type: 'start',
        data: {width: 0, height: 0}
      }, socket);

      actions.add({
        elements: [1],
        code: '',
        uid: 1
      });
    });

    
  });
});