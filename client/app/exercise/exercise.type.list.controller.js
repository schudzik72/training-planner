(function() {
	'use strict';

	angular
		.module('trainingPlanner.exercise')
		.controller('ExerciseTypeListController', ExerciseTypeListController);

	ExerciseTypeListController.$inject = ['logger', 'dataService', '$mdDialog'];

	function ExerciseTypeListController(logger, dataService, $mdDialog) {
		let vm = this;

		vm.loaded = false;
		dataService.getExerciseTypes()
			.then(response => {
				if(response.status === 'success') {
					vm.exerciseTypes = response.data;
					logger.success('Loaded', response);
					vm.loaded = true;
				} else if(response.status === 'fail') {
					logger.warn(response.message, response);
				} else {
					logger.error(response.message, response);
				}
			}).catch(error => logger.error('Error occurred', error));

		vm.showAddExerciseTypeForm = function(event) {
			$mdDialog.show({
				controller: 'ExerciseTypeFormController',
				controllerAs: 'vm',
				bindToController: true,
				templateUrl: 'app/exercise/exercise.type.form.html',
				parent: angular.element(document.body),
				targetEvent: event,
				clickOutsideToClose: true,
				fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
		    })
		    .then(function(exerciseType) {
		    	dataService.insertExerciseType(exerciseType)
		    		.then(response => {
		    			if(response.status === 'success') {
			    			exerciseType.id = response.data.id;
			    			vm.exerciseTypes.push(exerciseType);
							logger.success('New exercise type added', response);
						} else if(response.status === 'fail') {
							logger.error(error.message, response);
			    		} else {
			    			logger.error(error.message, response);
			    		}
		    		}).catch(error => logger.error('Error occurred', error));
		    }, function() {
		    	logger.info('Cancelled', null);
		    });
		};

		vm.removeExerciseType = function(index) {
			dataService.removeExerciseType(vm.exerciseTypes[index].id)
				.then(response => {
					if(response.status === 'success') {
						vm.exerciseTypes.splice(index, 1);
						logger.success('Removed', response);
					} else {
						logger.error(response.message, response);
					}
				}).catch(error => logger.error('Error occurred', error));
		};

	}
})();