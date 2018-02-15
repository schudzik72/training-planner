(function() {
	'use strict';

	angular
		.module('trainingPlanner.list')
		.controller('ListController', ListController);

	ListController.$inject = ['logger', '$mdDialog'];

	function ListController(logger, $mdDialog) {
		let vm = this;
		
		vm.workouts = [];

		vm.showAddWorkoutForm = function(event) {
			$mdDialog.show({
				controller: 'AddWorkoutFormController',
				controllerAs: 'vm',
				bindToController: true,
				templateUrl: 'app/list/add-workout-form.html',
				parent: angular.element(document.body),
				targetEvent: event,
				clickOutsideToClose:true,
				fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
		    })
		    .then(function(workout) {
		    	vm.workouts.push(workout);
				logger.success('New workout added', vm.workouts);
		    }, function() {
		    	logger.info('Cancelled', null);
		    });
		};

		vm.remove = function(index) {
			vm.workouts.splice(index, 1);
		};
	}
})();