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
					labels: [
						'Abs', 
						'Chest', 
						'Upper Back', 
						'Lower Back', 
						'Shoulders', 
						'Biceps', 
						'Triceps'
					],
					data: [
						[65, 59, 90, 81, 56, 55, 40]
					]
				};
				// TODO
				let chartLabels = new Set();
				let chartData = new Map();
				if(vm.workout.exercises) {
					vm.workout.exercises.forEach((exercise) => {
						let exerciseName = exercise.name;
						chartLabels.add(exerciseName);
						if(!chartData.has(exerciseName)) {
							chartData.set(exerciseName, 1);
						} else {
							let counter = chartData.get(exerciseName);
							chartData.set(exerciseName, counter + 1);
						}
					});
				}
				console.log(chartLabels);
				console.log(chartData);
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
				logger.info('TODO Editing', editedExercise);
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
				    	logger.info('Updated')
				    }, function() {
				    	logger.info('Cancelled', null);
				    });
			};

			vm.removeExercise = function(id) {
				vm.workout.exercises.splice(id, 1);
				calculateChartValues();
				logger.success('Removed exercise', vm.workout.exercises);
			};

			vm.openUrl = function(url) {
				$window.open(url);
			}
		}
	}
})();