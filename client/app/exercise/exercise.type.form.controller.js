(function() {
	'use strict';

	angular
		.module('trainingPlanner.exercise')
		.controller('ExerciseTypeFormController', ExerciseTypeFormController);

	ExerciseTypeFormController.$inject = ['logger', '$mdDialog'];

	function ExerciseTypeFormController(logger, $mdDialog) {
		let vm = this;

		init();

		function init() {
			vm.exerciseType = {
				type: ''
			};
			vm.insert = function(form) {
				if(form.$valid) {
					$mdDialog.hide(vm.exerciseType);
				} else {
					logger.error('The exercise type cannot be added. Please make sure all required fields are filled correctly.', null);
				}
			};
		}
	}
})();