(function() {
	'use strict';

	angular
		.module('trainingPlanner.layout')
		.controller('ContentController', ContentController);

	ContentController.$inject = ['$mdSidenav'];

	function ContentController($mdSidenav) {
		let vm = this;
		vm.toggleSidenav = function() {
			$mdSidenav('sidenav').toggle();
		};
	}
	
})();