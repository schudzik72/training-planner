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
					logger.success('Loaded', response);
					vm.workouts = response;
					vm.loaded = true;
				}).catch(e => logger.error('Error occurred while loading workouts', e));
			
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
			    			console.log(response);
			    			workout.id = response.id;
			    			vm.workouts.push(workout);
			    		}).catch(error => logger.error('Error occurred', error));
					logger.success('New workout added', vm.workouts);
			    }, function() {
			    	logger.info('Cancelled', null);
			    });
			};

			vm.remove = function(index) {
				let id = vm.workouts[index].id;
				workoutService.removeWorkout(id)
					.then(response => {
						vm.workouts.splice(index, 1);
					}).catch(error => logger.error('Error occurred', error));
			};
		}
	}
})();