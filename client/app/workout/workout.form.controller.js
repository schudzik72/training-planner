(function() {
	'use strict';

	angular
		.module('trainingPlanner.workout')
		.controller('WorkoutFormController', WorkoutFormController);

	WorkoutFormController.$inject = ['logger', '$mdDialog'];

	function WorkoutFormController(logger, $mdDialog) {
		let vm = this;

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