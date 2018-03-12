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
				.then(response => {
					if(response.status === 'success') {
						logger.success('Loaded', response);
						vm.workouts = response.data;
						vm.loaded = true;
					} else {
						logger.error(response.message, null);
					}
				}).catch(error => logger.error('Unexpected error occurred', error));
			
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
			    	workoutService.insertWorkout(workout)
			    		.then(response => {
			    			if(response.status) {
				    			workout.id = response.data.id;
				    			vm.workouts.push(workout);
								logger.success('New workout added', workout);
				    		} else {
				    			logger.error(error.message, null);
				    		}
			    		}).catch(error => logger.error('Unexpected error occurred', error));
			    }, function() {
			    	logger.info('Cancelled', null);
			    });
			};

			vm.removeWorkout = function(index) {
				let id = vm.workouts[index].id;
				workoutService.removeWorkout(id)
					.then(response => {
						if(response.status === 'success') {
							logger.success('Workout removed');
							vm.workouts.splice(index, 1);
						} else {
							logger.error(response.message, null);
						}
					}).catch(error => logger.error('Unexpected error occurred', error));
			};
		}
	}
})();