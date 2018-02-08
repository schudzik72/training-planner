(function() {
	'use strict';

	angular
		.module('trainingPlanner.list')
		.run(appRun);

	appRun.$inject = ['routerHelper'];

	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());
	}

	function getStates() {
		return [
			{
				state: 'list',
				config: {
					url: '/',
					templateUrl: 'app/list/list.html',
					controller: 'ListController',
					controllerAs: 'vm',
					title: 'Workout List',
					settings: {
						nav: 2,
						content: 'Workout List'
					}
				}
			}
		];
	}
})();