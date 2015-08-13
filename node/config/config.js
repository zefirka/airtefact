

function config(locale){
	/* Private scope */

	function rooty(path){
		return __DIRNAME + '../../' + path;
	}

	/* End of private scope */

	return {
		public: rooty('public'),
		views: rooty('public/views')

		defaultLocale: 'ru',
	}
}


module.exports = config();