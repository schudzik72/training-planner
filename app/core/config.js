(function() {
	'use strict';

	let core = angular.module('app.core');

	core.config(toastrConfig);

	toastrConfig.$inject = ['toastr'];

	function toastrConfig(toastr) {
		toastr.options.timeOut = 4000;
    	toastr.options.positionClass = 'toast-bottom-right';
	}

	let config = {
		appErrorPrefix: '[trainingPlanner Error]',
		appTitle: 'trainingPlanner',
	};

	core.value('config', config);

	core.config(configure);

	configure.$inject = ['$logProvider', 'exceptionHandlerProvider'];

	function configure($logProvider, exceptionHandlerProvider) {
		if($logProvider.debugEnabled) {
			$logProvider.debugEnabled(true);
		}

		exceptionHandlerProvider.configure(config.appErrorPrefix);
	    // routerHelperProvider.configure({ docTitle: config.appTitle + ': ' });
	}

})();