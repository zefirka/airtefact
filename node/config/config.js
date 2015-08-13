

function config(locale){
	/* Private scope */

	function rooty(path){
		return __DIRNAME + '../../' + path;
	}

	/* End of private scope */

	return {
		root: rooty(''),
		public: rooty('public'),
		views: rooty('public/views') 
		
		meta: {
			favicon: rooty('public/favicon.png'),
		}

		dev: {
			logTime: {
				repl: true,
				file: false,
			},
			logMorgan: {
				repl: false,
				file: true
			}
		}
	}
}


module.exports = config();