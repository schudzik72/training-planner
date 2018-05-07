(function() {
	'use strict';

	angular
		.module('trainingPlanner.exercise')
		.run(appRun);

	appRun.$inject = ['routerHelper'];

	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());
	}

	function getStates() {
		return [
			{
				state: 'exercisetype',
				config: {
					abstract: true,
					url: '/exercisetype',
					templateUrl: 'app/exercise/exercise.type.html',
				}
			},
			{
				state: 'exercisetype.list',
				config: {
					url: '/exercisetype/list',
					templateUrl: 'app/exercise/exercise.type.list.html',
					controller: 'ExerciseTypeListController',
					controllerAs: 'vm',
					title: 'Exercise Types',
					settings: {
						nav: 3,
						content: 'Exercise Types'
					}
				}
			}
		];
	}
})();