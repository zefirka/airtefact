function comp(GAME){
	return ( this.store.set("x", 10) )
}

module.exports = function(scope, game){ return comp.call(scope, game); }