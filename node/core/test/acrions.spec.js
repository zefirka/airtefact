// var actions = require('../actions');;
// var EventEmitter = require('events');
// var socket = new EventEmitter();


// describe('core/actions', function () {

//   describe('status action', function () {

//     it(':: ready', function () {
//       var res = actions.status({
//         type: 'ready'
//       });

//       expect(res).toBe('ready');
//     });

//     it(':: error', function () {
//       var res = actions.status({
//         type: 'error'
//       });

//       expect(res).toBe('error');
//     });

//     it(':: start', function (done) {
//       socket.once('tick', function(){
//         expect(true).toBe(true);
//         done();
//       });

//       actions.status({
//         type: 'start',
//         data: {width: 0, height: 0}
//       });

//       actions.add({
//         elements: [1],
//         code: '',
//         uid: 1
//       });
//     });

    
//   });
// });