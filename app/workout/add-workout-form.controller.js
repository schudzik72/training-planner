(function() {
	'use strict';

	angular
		.module('trainingPlanner.workout')
		.controller('AddWorkoutFormController', AddWorkoutFormController);

	AddWorkoutFormController.$inject = ['logger', '$mdDialog', 'workoutService'];

	function AddWorkoutFormController(logger, $mdDialog, workoutService) {
		let vm = this;

		workoutService.getWorkoutTypes()
			.then(response => vm.types = response);

		vm.workout = {
			name: '',
			type: {},
		};
		vm.add = function(workoutForm) {
			if(workoutForm.$valid) {
				$mdDialog.hide(vm.workout);
			} else {
				logger.error('The workout cannot be added. Please make sure all required fields are filled correctly.', null);
			}
		};
	}
})();