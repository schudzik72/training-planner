(function() {
	'use strict';

	angular
		.module('trainingPlanner.exercise')
		.controller('ExerciseFormController', ExerciseFormController);

	ExerciseFormController.$inject = ['logger', 'dataService', '$mdDialog'];

	function ExerciseFormController(logger, dataService, $mdDialog) {
		let vm = this;

		init();

		function init() {
			vm.isEdit = vm.exercise !== undefined;
			vm.exercise = vm.isEdit === false ? 
				{
					name: '',
					exerciseTypeId: '',
					description: '',
					bodyPartsEngaged: [],
					linkToExercise: '',
					workoutId: vm.workoutId,
				} :
				vm.exercise;
			dataService.getExerciseTypes()
				.then(response => {
					if(response.status === 'success') {
						vm.types = response.data
					} else {
						logger.error(response.message, null);
					}
				})
			dataService.getBodyParts()
				.then(response => {
					if(response.status === 'success') {
						vm.bodyParts = response.data;
					} else {
						logger.error(response.message, null);
					}
				});

			vm.upsert = function(form) {
				if(form.$valid) {
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