(function() {
	'use strict';

	angular
		.module('trainingPlanner.layout')
		.component('sidenav', {
			templateUrl: 'app/layout/sidenav.html',
			controller: 'SidenavController',
			controllerAs: 'vm'
		});
})();