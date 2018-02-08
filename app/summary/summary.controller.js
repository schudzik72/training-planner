(function() {
	'use strict';

	angular
		.module('trainingPlanner.summary')
		.controller('SummaryController', SummaryController);

	function SummaryController() {
		let vm = this;
		vm.title = 'Summary';
	}

})();