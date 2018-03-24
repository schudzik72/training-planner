(function() {
	'use strict';

	angular
		.module('trainingPlanner.summary')
		.controller('SummaryController', SummaryController);

	SummaryController.$inject = ['logger', 'dataService'];

	function SummaryController(logger, dataService) {
		
		let vm = this;

		init();

		function init() {
			vm.loaded = false;
			dataService.getUser()
				.then(response => {
					vm.user = response;
					vm.loaded = true;
					logger.success('Loaded', response);
				});
		}
	}

})();