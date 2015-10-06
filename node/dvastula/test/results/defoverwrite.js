function comp(GAME){
	this.store.set("x", 10)

return ( this.store.set("x", 20) )
}

module.exports = function(scope, game){ return comp.call(scope, game); }