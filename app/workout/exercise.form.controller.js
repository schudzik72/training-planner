(function() {
	'use strict';

	angular
		.module('trainingPlanner.workout')
		.controller('ExerciseFormController', ExerciseFormController);

	ExerciseFormController.$inject = ['logger', 'workoutService', '$mdDialog'];

	function ExerciseFormController(logger, workoutService, $mdDialog) {
		let vm = this;

		init();

		function init() {
			vm.isEdit = vm.exercise !== undefined;
			vm.exercise = vm.isEdit === undefined ? 
				{
					name: '',
					type: '',
					description: '',
					bodyPartsEngaged: [],
					linkToExercise: ''
				} :
				vm.exercise;
			workoutService.getExerciseTypes()
				.then(types => vm.types = types)
				.then(() => workoutService.getBodyParts())
				.then(bodyParts => vm.bodyParts = bodyParts);

			vm.upsert = function(form) {
				if(form.$valid) {
					logger.info(typeof vm.exercise.linkToExercise);
					let startingUrl = "http://";
    				let httpsStartingUrl = "https://";
					if(vm.exercise.linkToExercise && !(vm.exercise.linkToExercise.startsWith(startingUrl) || vm.exercise.linkToExercise.startsWith(httpsStartingUrl))) {
						vm.exercise.linkToExercise = startingUrl + vm.exercise.linkToExercise;
					}
					$mdDialog.hide(vm.exercise);
				} else {
					logger.error('The exercise cannot be added. Please make sure all required fields are filled correctly.', null);
				}
			};

		}
	}
})();