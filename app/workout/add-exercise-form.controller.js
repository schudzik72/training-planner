(function() {
	'use strict';

	angular
		.module('trainingPlanner.workout')
		.controller('AddExerciseFormController', AddExerciseFormController);

	AddExerciseFormController.$inject = ['logger', 'workoutService', '$mdDialog'];

	function AddExerciseFormController(logger, workoutService, $mdDialog) {
		let vm = this;

		init();

		function init() {
			vm.exercise = {
				name: '',
				type: '',
				bodyPartsEngaged: []
			};
			workoutService.getExerciseTypes()
				.then(types => vm.types = types)
				.then(() => workoutService.getBodyParts())
				.then(bodyParts => vm.bodyParts = bodyParts);

			vm.add = function(form) {
				if(form.$valid) {
					$mdDialog.hide(vm.exercise);
				} else {
					logger.error('The exercise cannot be added. Please make sure all required fields are filled correctly.', null);
				}
			};

		}
	}
})();