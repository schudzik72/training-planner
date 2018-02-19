(function() {
	'use strict';

	angular
		.module('trainingPlanner.workout')
		.run(appRun);

	appRun.$inject = ['routerHelper'];

	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());
	}

	function getStates() {
		return [
			{
				state: 'workout',
				config: {
					abstract: true,
					url: '/workouts',
					templateUrl: 'app/workout/workout.html',
				}
			},
			{
				state: 'workout.list',
				config: {
					url: '/list',
					templateUrl: 'app/workout/workout.list.html',
					controller: 'WorkoutListController',
					controllerAs: 'vm',
					title: 'Workouts',
					settings: {
						nav: 2,
						content: 'Workouts'
					}
				}
			},
			{
				state: 'workout.detail',
				config: {
					url: '/detail/:id',
					templateUrl: 'app/workout/workout.detail.html',
					controller: 'WorkoutDetailController',
					controllerAs: 'vm',
					title: 'Workout'
				}
			}
		];
	}
})();