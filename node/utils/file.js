module.exports = {
	ext : function(file, ext){
		return file + '.' + ext;
	},

	path : function(){
		return Array.prototype.slice.call(arguments).join('/');
	}
}
