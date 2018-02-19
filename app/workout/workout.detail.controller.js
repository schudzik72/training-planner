(function() {
	'use strict';

	angular
		.module('trainingPlanner.workout')
		.controller('WorkoutDetailController', WorkoutDetailController);

	WorkoutDetailController.$inject = ['logger', '$stateParams', 'workoutService', '$timeout'];

	function WorkoutDetailController(logger, $stateParams, workoutService, $timeout) {
		let vm = this;

		init();

		function init() {
			vm.isFabToolbarOpen = false;
			vm.loaded = false;
			workoutService.getWorkout($stateParams.id)
				.then((response) => {
					vm.workout = response;
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
								chartData.get(exerciseName)++;
							}
						});
					}
					console.log(chartLabels);
					console.log(chartData);
					vm.loaded = true;
				});
		}
	}
})();