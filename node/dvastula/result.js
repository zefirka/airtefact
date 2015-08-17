// (function comp(globalEnv) {
//   this.set('x', 10);
//
//   this.set('y', 20);
//
//   this.set('z', (function() {
//     return this.get('x') + this.get('y');
//   }).call(this));
//
//   globalScope.throWarning("Trying to rewrite local variable");
//   this.set('x', 20);
//
//   globalScope.throWarning("Trying to rewrite local variable");
//   this.set('x', 12);
//
//   this.set('be-red', (function(param1, param2) {
//     globalScope.throWarning("Trying to rewrite local variable");
//     return this.set('x', 20);
//   }).bind(this));
//
//   (function() {
//     throw 'Error'
//   })()
// }).call(globalScope, void 0);
