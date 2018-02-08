(function() {
	'use strict';

	angular
		.module('trainingPlanner.layout')
		.component('shell', {
			templateUrl: 'app/layout/shell.html',
			controller: 'ShellController',
			controllerAs: 'vm'
		});
})();