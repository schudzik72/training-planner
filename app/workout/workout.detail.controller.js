(function() {
	'use strict';

	angular
		.module('trainingPlanner.workout')
		.controller('WorkoutDetailController', WorkoutDetailController);

	WorkoutDetailController.$inject = ['logger', '$stateParams', 'workoutService', '$timeout', '$mdDialog'];

	function WorkoutDetailController(logger, $stateParams, workoutService, $timeout, $mdDialog) {
		let vm = this;

		init();

		function init() {
			workoutService.getWorkout($stateParams.id)
				.then((response) => {
					vm.workout = response;
					calculateChartValues();
				});

			function calculateChartValues() {
				vm.chart = {
					labels: [],
					data: [
						[]
					]
				};
				let chartLabels = new Set();
				let chartData = new Map();
				if(vm.workout.exercises) {
					vm.workout.exercises.forEach((exercise) => {
						exercise.bodyPartsEngaged.forEach(bodyPart => {
							chartLabels.add(bodyPart);
							if(!chartData.has(bodyPart)) {
								chartData.set(bodyPart, 1);
							} else {
								let counter = chartData.get(bodyPart);
								chartData.set(bodyPart, counter + 1);
							}
						});
					});
				}
				
				for(const entry of chartData.entries()) {
					vm.chart.labels.push(entry[0]);
					vm.chart.data[0].push(entry[1]);
				}
			}

			vm.showAddExerciseForm = function(event) {
				$mdDialog
					.show({
						controller: 'ExerciseFormController',
						controllerAs: 'vm',
						bindToController: true,
						templateUrl: 'app/workout/exercise.form.html',
						parent: angular.element(document.body),
						targetEvent: event,
						clickOutsideToClose: true,
						fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
				    })
				    .then(function(exercise) {
				    	logger.info(typeof vm.workout.exercises, null);
				    	vm.workout.exercises.push(
				    		new Exercise(
				    			vm.workout.exercises.length + 1,
				    			exercise.name, 
				    			exercise.description, 
				    			exercise.type, 
				    			exercise.bodyPartsEngaged,
				    			exercise.linkToExercise)
				    		)
				    	calculateChartValues();
				    	logger.success('New exercise added', vm.exercise);
				    }, function() {
				    	logger.info('Cancelled', null);
				    });
			};

			vm.showEditExerciseForm = function(event, editedExercise) {
				$mdDialog
					.show({
						controller: 'ExerciseFormController',
						controllerAs: 'vm',
						bindToController: true,
						templateUrl: 'app/workout/exercise.form.html',
						locals: {
							exercise: editedExercise
						},
						parent: angular.element(document.body),
						targetEvent: event,
						clickOutsideToClose: true,
						fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
				    })
				    .then(function(exercise) {
				    	logger.info('Updated', exercise);
				    }, function() {
				    	logger.info('Cancelled', null);
				    });
			};

			vm.removeExercise = function(id) {
				vm.workout.exercises.splice(id, 1);
				calculateChartValues();
				logger.success('Removed exercise', vm.workout.exercises);
			};
		}
	}
})();