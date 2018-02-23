(function() {
	'use strict';

	angular
		.module('trainingPlanner.workout')
		.controller('WorkoutListController', WorkoutListController);

	WorkoutListController.$inject = ['logger', '$mdDialog', 'workoutService'];

	function WorkoutListController(logger, $mdDialog, workoutService) {
		let vm = this;

		init();

		function init() {
			vm.loaded = false;
			workoutService.getWorkouts()
				.then((response) => {
					vm.workouts = response;
					console.log(response);
				});
			
			vm.showAddWorkoutForm = function(event) {
				$mdDialog.show({
					controller: 'WorkoutFormController',
					controllerAs: 'vm',
					bindToController: true,
					templateUrl: 'app/workout/workout.form.html',
					parent: angular.element(document.body),
					targetEvent: event,
					clickOutsideToClose: true,
					fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
			    })
			    .then(function(workout) {
			    	vm.workouts.push(new Workout(vm.workouts.length, workout.name, workout.description, workout.type, []));
					logger.success('New workout added', vm.workouts);
			    }, function() {
			    	logger.info('Cancelled', null);
			    });
			};

			vm.remove = function(index) {
				vm.workouts.splice(index, 1);
			};
		}
	}
})();