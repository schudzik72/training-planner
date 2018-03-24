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
			/* 
			 * Fixes problem with html5mode on when we have root url 
			 * and when later on state is changed from navigation
			 * back to it but has attached /#!/ suffix so when we refresh ui-router
			 * does not load proper state
			 * Does not work when added to core.route.js
			 */
			{
				state: 'default',
				config: {
					url: '',
					templateUrl: 'app/summary/summary.html',
					controller: 'SummaryController',
					controllerAs: 'vm',
					title: 'Summary',
				}
			},
			{
				state: 'summary',
				config: {
					url: '/summary',
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