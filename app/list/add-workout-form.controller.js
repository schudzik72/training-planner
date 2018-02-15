(function() {
	'use strict';

	angular
		.module('trainingPlanner.list')
		.controller('AddWorkoutFormController', AddWorkoutFormController);

	AddWorkoutFormController.$inject = ['logger', '$mdDialog'];

	function AddWorkoutFormController(logger, $mdDialog) {
		let vm = this;
		vm.types = [
			{
				name: 'Mass',
				repetitions: '8-12',
				break: '90-120s',
				series: '3-4'
			},
			{
				name: 'Performance',
				repetitions: '12-16',
				break: '60s',
				series: '3-4'
			},
			{
				name: 'Endurance',
				repetitions: 'max',
				break: '60s',
				series: '3-4'
			}
		];
		vm.workout = {
			name: '',
			type: {},
		};
		vm.add = function(workoutForm) {
			if(workoutForm.$valid) {
				$mdDialog.hide(vm.workout);
			} else {
				logger.error('The workout cannot be added. Please make sure everything is filled correctly.', null);
			}
		};

		vm.open = function(workout) {

		};
	}
})();