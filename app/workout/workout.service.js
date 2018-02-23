(function() {
	'use strict';

	angular
		.module('trainingPlanner.workout')
		.factory('workoutService', workoutService);

	workoutService.$inject = ['$q', 'exception', 'logger'];

	let massWorkoutTypeParameters = [
		new Parameter('Repetitions', '8-12'),
		new Parameter('Series', '3-4'),
		new Parameter('Break', '90-120s'),
	];

	let enduranceWorkoutTypeParameters = [
		new Parameter('Repetitions', 'MAX'),
		new Parameter('Series', 'MAX'),
		new Parameter('Break', '60s'),
	];

	let performanceWorkoutTypeParameters = [
		new Parameter('Repetitions', '12-16'),
		new Parameter('Series', '3-4'),
		new Parameter('Break', '60s'),
	];

	let workoutTypes = [
		new Type('0', 'Mass', massWorkoutTypeParameters),
		new Type('1', 'Endurance', enduranceWorkoutTypeParameters),
		new Type('2', 'Performance', performanceWorkoutTypeParameters),
	];

	let exerciseTypes = ['PUSH', 'PULL', 'BREAK', 'N/A'];

	let bodyParts = ['ABS', 'CHEST', 'UPPER BACK', 'LOWER BACK', 'SHOULDERS', 'BICEPS', 'TRICEPS', 'LEGS'];

	let workouts = [
		new Workout('0', 'Mass Training Phase 1', 'Phase 1 mass training', angular.copy(workoutTypes[0]), new Array()),
		new Workout('0', 'Endurance Training', 'Test exercises for endurance', angular.copy(workoutTypes[1]), new Array()),
		new Workout('0', 'Performance', 'Exercises focusing on increasing body performance', angular.copy(workoutTypes[2]), new Array()),
	];
	
	function workoutService($q) {
		let service = {
			getWorkout: getWorkout,
			getWorkouts: getWorkouts,
			insertWorkout: insertWorkout,
			removeWorkout: removeWorkout,
			getWorkoutTypes: getWorkoutTypes,
			getExerciseTypes: getExerciseTypes,
			insertExercise: insertExercise,
			getBodyParts: getBodyParts,
		};

		return service;
		///////////////

		function getWorkout(id) {
			let deferred = $q.defer();
			deferred.resolve(workouts[id]);
			return deferred.promise;
		}

		function insertWorkout(workout) {
			let deferred = $q.defer();
			workouts.push(workout);
			deferred.resolve(workouts);
			return deferred.promise;
		}

		function removeWorkout(id) {
			let deferred = $q.defer();
			workouts.splice(id, 1);
			deferred.resolve(workouts);
			return deferred.promise;
		}

		function getWorkouts() {
			let deferred = $q.defer();
			deferred.resolve(workouts);
			return deferred.promise;
		}

		function getWorkoutTypes() {
			let deferred = $q.defer();
			deferred.resolve(workoutTypes);
			return deferred.promise;
		}

		function getExerciseTypes() {
			let deferred = $q.defer();
			deferred.resolve(exerciseTypes);
			return deferred.promise;
		}

		function insertExercise(exercise) {
			let deferred = $q.defer();
			exercises.push(exercise);
			deferred.resolve(exercises);
			return deferred.promise;
		}

		function getBodyParts() {
			let deferred = $q.defer();
			deferred.resolve(bodyParts);
			return deferred.promise;
		}
	}
})();