(function() {
	'use strict';

	angular
		.module('trainingPlanner.layout')
		.component('content', {
			templateUrl: 'app/layout/content.html',
			controller: 'ContentController',
			controllerAs: 'vm'
		});
})();