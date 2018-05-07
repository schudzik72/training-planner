(function() {
	'use strict';

	angular
		.module('trainingPlanner.workout')
		.controller('WorkoutListController', WorkoutListController);

	WorkoutListController.$inject = ['logger', '$mdDialog', 'dataService'];

	function WorkoutListController(logger, $mdDialog, dataService) {
		let vm = this;

		vm.workouts = [];
		vm.loaded = false;

		dataService.getWorkouts()
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
 				clickOutsideToClose: true,
				fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
		    })
		    .then(function(workout) {
		    	dataService.insertWorkout(workout)
		    		.then(response => {
		    			if(response.status === 'success') {
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
			dataService.removeWorkout(id)
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
})();