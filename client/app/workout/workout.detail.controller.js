(function() {
	'use strict';

	angular
		.module('trainingPlanner.workout')
		.controller('WorkoutDetailController', WorkoutDetailController);

	WorkoutDetailController.$inject = ['logger', '$stateParams', 'dataService', '$timeout', '$mdDialog'];

	function WorkoutDetailController(logger, $stateParams, dataService, $timeout, $mdDialog) {
		let vm = this;

		init();

		function init() {
			vm.loaded = false;
			vm.workout = {
				name: '',
				description: '',
			};
			vm.parameters = [];
			vm.exercises = [];
			vm.editWorkoutName = false;
			dataService.getWorkout($stateParams.id)
				.then(response => {
					if(response.status === 'success') {
						vm.workout = response.data;
						vm.updatedWorkout = angular.copy(vm.workout);
						return dataService.getWorkoutParameters(vm.workout.id);
					} else if(response.status === 'fail') {
						logger.warn(response.message, null);
					} else {
						logger.error(response.message, null);
					}
				}).then(response => {
					if(response.status === 'success') {
						vm.parameters = response.data;
						return dataService.getWorkoutExercises(vm.workout.id);
					} else {
						logger.error(response.message, null);
					}
				}).then(response => {
					if(response.status === 'success') {
						vm.exercises = response.data;
						vm.exercises.forEach(exercise => {
							exercise.bodyPartsEngaged = exercise.bodyPartsEngaged.split(',');
							exercise.showOptions = false;
						});
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
						templateUrl: 'app/exercise/exercise.form.html',
						parent: angular.element(document.body),
						targetEvent: event,
						clickOutsideToClose: true,
						fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
				    })
				    .then(function(exercise) {
				    	dataService.insertExercise(exercise)
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

			vm.updateWorkout = function() {
				dataService.updateWorkout(vm.updatedWorkout)
					.then(response => {
						if(response.status === 'success') {
							vm.workout = angular.copy(vm.updatedWorkout);
							logger.success('Workout updated successfuly', response);
							vm.editWorkoutName = false;
							vm.editWorkoutDescription = false;
						} else {
							logger.error(response.message, response);
						}
					}).catch(error => logger.error('Error occurred', error));
			};

			vm.cancelWorkoutUpdate = function() {
				vm.updatedWorkout = angular.copy(vm.workout);
				vm.editWorkoutName = false;
				vm.editWorkoutDescription = false;
			};

			vm.showEditExerciseForm = function(event, index) {
				$mdDialog
					.show({
						controller: 'ExerciseFormController',
						controllerAs: 'vm',
						bindToController: true,
						templateUrl: 'app/exercise/exercise.form.html',
						locals: {
							exercise: vm.exercises[index]
						},
						parent: angular.element(document.body),
						targetEvent: event,
						clickOutsideToClose: true,
						fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
				    })
				    .then(exercise => {
				    	dataService.updateExercise(exercise)
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
				    	vm.exercises[index].showOptions = false;
				    });
			};

			vm.removeExercise = function(index) {
				let id = vm.exercises[index].id;
				dataService.removeExercise(id)
					.then(response => {
						if(response.status === 'success') {
							vm.exercises.splice(index, 1);
							calculateChartValues();
							logger.success('Removed exercise', response);
						} else {
							logger.error(response.message);
						}
					}).catch(error => logger.error('Error occurred', error));
			};

			vm.showParameterForm = function(event) {
				$mdDialog
					.show({
						controller: 'ParameterFormController',
						controllerAs: 'vm',
						bindToController: true,
						templateUrl: 'app/parameter/parameter.form.html',
						parent: angular.element(document.body),
						targetEvent: event,
						clickOutsideToClose: true,
						fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
				    })
				    .then(data => {
				    	let parameter = data.parameter;
				    	dataService.insertParameter(vm.workout.id, parameter)
				    		.then(response => {
			    				if(response.status === 'success') {
					    			vm.parameters.push(parameter);
							    	logger.success('New parameter added', response);
							    } else {
							    	logger.error(response.message, null);
							    }
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
						templateUrl: 'app/parameter/parameter.form.html',
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
					    	dataService.removeParameter(parameter.id)
					    		.then(response => {
					    			if(response.status === 'success') {
						    			vm.parameters.splice(index, 1);
						    			logger.success('Parameter removed', response);
						    		} else {
						    			logger.error(response.message, null);
						    		}
					    		}).catch(error => logger.error('Error occurred', error));
					    } else {
					    	dataService.updateParameter(parameter)
					    		.then(response => {
					    			if(response.status === 'success') {
						    			vm.parameters[index] = parameter;
								    	logger.success('Parameter updated', response);
								    } else {
						    			logger.error(response.message, null);
								    }
					    		}).catch(error => logger.error('Error occurred', error));
					    }
				    }, () => {
				    	logger.info('Cancelled', null);
				    });
			};

		}
	}
})();