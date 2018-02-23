(function() {
	'use strict';

	angular
		.module('trainingPlanner.workout')
		.controller('ExerciseFormController', ExerciseFormController);

	ExerciseFormController.$inject = ['logger', 'workoutService', '$mdDialog'];

	function ExerciseFormController(logger, workoutService, $mdDialog, exercise) {
		let vm = this;

		init();

		function init() {
			vm.isEdit = exercise !== undefined;
			vm.exercise = vm.isEdit === undefined ? 
				{
					name: '',
					type: '',
					bodyPartsEngaged: []
				} :
				exercise;
			workoutService.getExerciseTypes()
				.then(types => vm.types = types)
				.then(() => workoutService.getBodyParts())
				.then(bodyParts => vm.bodyParts = bodyParts);

			vm.upsert = function(form) {
				if(form.$valid) {
					$mdDialog.hide(vm.exercise);
				} else {
					logger.error('The exercise cannot be added. Please make sure all required fields are filled correctly.', null);
				}
			};

		}
	}
})();