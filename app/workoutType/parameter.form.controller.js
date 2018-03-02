(function() {
	'use strict';

	angular
		.module('trainingPlanner.workout')
		.controller('ParameterFormController', ParameterFormController);

	ParameterFormController.$inject = ['logger', '$mdDialog'];

	function ParameterFormController(logger, $mdDialog) {
		let vm = this;

		init();

		function init() {
			vm.parameter = {
				name: '',
				value: ''
			};
			vm.add = function(form) {
				if(form.$valid) {
					$mdDialog.hide(vm.parameter);
				} else {
					logger.error('The parameter cannot be added. Please make sure all required fields are filled correctly.', null);
				}
			};
		}
	}
})();