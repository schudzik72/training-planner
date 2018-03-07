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
			vm.isEdit = vm.parameter !== undefined;
			vm.parameter = vm.parameter === undefined ? {
				name: '',
				value: ''
			} : vm.parameter;
			vm.upsert = function(form) {
				if(form.$valid) {
					$mdDialog.hide({
						toDelete: false,
						parameter: vm.parameter
					});
				} else {
					logger.error('The parameter cannot be ' + (vm.isEdit ? 'updated' : 'added') + '. Please make sure all required fields are filled correctly.', null);
				}
			};
			vm.remove = function() {
				$mdDialog.hide({
					toDelete: true,
					parameter: vm.parameter
				});
			};
		}
	}
})();