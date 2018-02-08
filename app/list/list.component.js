(function() {
	'use strict';

	angular
		.module('trainingPlanner.list')
		.component('list', {
			templateUrl: 'app/list/list.html',
			controller: 'ListController',
			controllerAs: 'vm'
		});
})();