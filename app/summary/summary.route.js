(function() {
	'use strict';

	angular
		.module('trainingPlanner.summary')
		.run(appRun);

	appRun.$inject = ['routerHelper'];

	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());
	}

	function getStates() {
		return [
			{
				state: 'summary',
				config: {
					url: '/',
					templateUrl: 'app/summary/summary.html',
					controller: 'SummaryController',
					controllerAs: 'vm',
					title: 'Summary',
					settings: {
						nav: 1,
						content: 'Summary'
					}
				}
			}
		];
	}
})();