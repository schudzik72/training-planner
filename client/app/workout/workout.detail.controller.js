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
			vm.loaded = false;
			vm.workout = {};
			vm.parameters = [];
			vm.exercises = [];
			workoutService.getWorkout($stateParams.id)
				.then(response => {
					if(response.status === 'success') {
						vm.workout = response.data;
						return workoutService.getWorkoutParameters(vm.workout.id);
					} else {
						logger.error(response.message, null);
					}
				}).then(response => {
					if(response.status === 'success') {
						vm.parameters = response.data;
						return workoutService.getWorkoutExercises(vm.workout.id);
					} else {
						logger.error(response.message, null);
					}
				}).then(response => {
					if(response.status === 'success') {
						vm.exercises = response.data;
						vm.exercises.forEach(exercise => exercise.bodyPartsEngaged = exercise.bodyPartsEngaged.split(','));
						calculateChartValues();
						vm.loaded = true;
					} else {
						logger.error(response.message, null);
					}
				}).catch(error => logger.error('Error occurred', error));

			function calculateChartValues() {
				vm.chart = {
					labels: [],
					data: [
						[]
					]
				};
				let chartLabels = new Set();
				let chartData = new Map();
				if(vm.exercises) {
					vm.exercises.forEach((exercise) => {
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
				console.log(vm.chart);
			}

			vm.showAddExerciseForm = function(event) {
				$mdDialog
					.show({
						controller: 'ExerciseFormController',
						controllerAs: 'vm',
						bindToController: true,
						locals: {
							workoutId: vm.workout.id
						},
						templateUrl: 'app/workout/exercise.form.html',
						parent: angular.element(document.body),
						targetEvent: event,
						clickOutsideToClose: true,
						fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
				    })
				    .then(function(exercise) {
				    	workoutService.insertExercise(exercise)
				    		.then(response => {
				    			if(response.status === 'success') {
				    				exercise.id = response.data.id;
					    			vm.exercises.push(exercise);
							    	calculateChartValues();
				    				logger.success('New exercise added', response);
				    			} else {
				    				logger.error(response.message, null);
				    			}
				    		}).catch(error => logger.error('Error occurred', error));
				    }, function() {
				    	logger.info('Cancelled', null);
				    });
			};

			vm.showEditExerciseForm = function(event, index) {
				$mdDialog
					.show({
						controller: 'ExerciseFormController',
						controllerAs: 'vm',
						bindToController: true,
						templateUrl: 'app/workout/exercise.form.html',
						locals: {
							exercise: vm.exercises[index]
						},
						parent: angular.element(document.body),
						targetEvent: event,
						clickOutsideToClose: true,
						fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
				    })
				    .then(exercise => {
				    	workoutService.updateExercise(exercise)
				    		.then(response => {
			    				if(response.status === 'success') {
			    					vm.exercises[index] = exercise;
						    		calculateChartValues();
			    					logger.success('Updated successfuly', response);
			    				} else {
			    					logger.error(response.message, null);
			    				}
				    		}).catch(error => logger.error('Error occurred', error));
				    }, () => {
				    	logger.info('Cancelled', null);
				    });
			};

			vm.removeExercise = function(index) {
				let id = vm.exercises[index].id;
				workoutService.removeExercise(id)
					.then(response => {
						vm.exercises.splice(index, 1);
						calculateChartValues();
						logger.success('Removed exercise', response);
					}).catch(error => logger.error('Error occurred', error));
			};

			vm.showParameterForm = function(event) {
				$mdDialog
					.show({
						controller: 'ParameterFormController',
						controllerAs: 'vm',
						bindToController: true,
						templateUrl: 'app/workout/parameter.form.html',
						parent: angular.element(document.body),
						targetEvent: event,
						clickOutsideToClose: true,
						fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
				    })
				    .then(data => {
				    	let parameter = data.parameter;
				    	workoutService.insertParameter(vm.workout.id, parameter)
				    		.then(response => {
				    			vm.parameters.push(parameter);
						    	logger.success('New parameter added', response);
				    		}).catch(error => logger.error('Error occurred', error));
				    }, () => {
				    	logger.info('Cancelled', null);
				    });
			};

			vm.showEditParameterForm = function(event, index) {
				$mdDialog
					.show({
						controller: 'ParameterFormController',
						controllerAs: 'vm',
						bindToController: true,
						templateUrl: 'app/workout/parameter.form.html',
						locals: {
							parameter: vm.parameters[index]
						},
						parent: angular.element(document.body),
						targetEvent: event,
						clickOutsideToClose: true,
						fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
				    })
				    .then(data => {
				    	let parameter = data.parameter;
				    	if(data.toDelete) {
					    	workoutService.removeParameter(parameter.id)
					    		.then(response => {
					    			vm.parameters.splice(index, 1);
					    			logger.success('Parameter removed', response);
					    		}).catch(error => logger.error('Error occurred', error));
					    } else {
					    	workoutService.updateParameter(parameter)
					    		.then(response => {
					    			vm.parameters[index] = parameter;
							    	logger.success('Parameter updated', response);
					    		}).catch(error => logger.error('Error occurred', error));
					    }
				    }, () => {
				    	logger.info('Cancelled', null);
				    });
			};

		}
	}
})();