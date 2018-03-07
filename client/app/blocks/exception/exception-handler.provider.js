(function() {
	'use strict';

	angular
		.module('blocks.exception')
		.provider('exceptionHandler', exceptionHandlerProvider)
		.config(config);

	function exceptionHandlerProvider() {
		this.config = {
			appErrorPrefix: undefined
		};

		this.configure = function(appErrorPrefix) {
			this.config.appErrorPrefix = appErrorPrefix;
		};

		this.$get = function() {
			return {
				config: this.config
			};
		};
	}

	config.$inject = ['$provide'];

	/**
    * Configure by setting an optional string value for appErrorPrefix.
   	* Accessible via config.appErrorPrefix (via config value).
   	* @param  {Object} $provide
   	*/
	function config($provide) {
		$provide.decorator('$exceptionHandler', extendExceptionHandler);
	}

	extendExceptionHandler.$inject = ['$delegate', 'exceptionHandler', 'logger'];

	function extendExceptionHandler($delegate, exceptionHandler, logger) {
		return function(exception, cause) {
			let appErrorPrefix = exceptionHandler.config.appErrorPrefix || '';
			let errorData = { exception: exception, cause: cause };
			exception.message = appErrorPrefix + exception.message;

			logger.error(exception.message, errorData);

			$delegate(exception, cause);
		};
	}
})();