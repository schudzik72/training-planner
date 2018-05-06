(function() {
	'use strict';

	angular
		.module('trainingPlanner.layout')
		.controller('SidenavController', SidenavController);

	SidenavController.$inject = ['$state', 'routerHelper'];

	function SidenavController($state, routerHelper) {
		let vm = this;
		let states = routerHelper.getStates();
		vm.isCurrent = isCurrent;

		activate();

		function activate() {
			getNavRoutes();
		}

		function getNavRoutes() {
			vm.navRoutes = states
				.filter(r => r.settings && r.settings.nav)
				.sort((r1, r2) => r1.settings.nav - r2.settings.nav);
		}

		function isCurrent(route) {
			if(!route.title || !$state.current || !$state.current.title) {
				return '';
			}
			let menuName = route.title;
			return (menuName.includes($state.current.title) || $state.current.title.substr(0, menuName.length) === menuName) ? 'current' : '';
		}
	}

})();